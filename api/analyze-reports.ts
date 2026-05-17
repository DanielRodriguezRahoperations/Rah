// SQL Migration — run once in Supabase SQL Editor to add new columns:
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS original_creditor text;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS phone_numbers text[];
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS name_variations text[];
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS addresses text[];
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS account_number_equifax text;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS account_number_experian text;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS account_number_transunion text;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS equifax_data jsonb;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS experian_data jsonb;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS transunion_data jsonb;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS duplicate_flag boolean DEFAULT false;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS duplicate_note text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS balance_inconsistency boolean DEFAULT false;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS balance_inconsistency_note text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS dispute_priority text DEFAULT 'medium';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS recommended_fcra_sections text[] DEFAULT '{}';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS letter_targets jsonb DEFAULT '{}';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS strategy_notes text;
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS personal_info_errors jsonb;
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS inquiries jsonb;
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS ftc_report_numbers text[] DEFAULT '{}';
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS dispute_selections jsonb DEFAULT '{}';
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS case_type text DEFAULT 'identity_theft';
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS positive_accounts jsonb DEFAULT '[]';
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS strategy_notes text;
// CREATE TABLE IF NOT EXISTS furnisher_addresses (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   creditor_name text NOT NULL,
//   aka text[] DEFAULT '{}',
//   address text NOT NULL,
//   fcra_dept text DEFAULT 'FCRA Compliance Department',
//   notes text,
//   created_at timestamptz DEFAULT now()
// );

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

export const config = { maxDuration: 60 };

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

const BUREAU_FIELD: Record<string, string> = {
  equifax: 'doc_cr_equifax',
  experian: 'doc_cr_experian',
  transunion: 'doc_cr_transunion',
};

const BUREAU_EXTRACTION_SYSTEM_PROMPT = `You are a credit report analyst. Extract all accounts from this single bureau credit report.

Return ONLY valid JSON starting with { and ending with }:
{
  "accounts": [{
    "creditor_name": "string",
    "original_creditor": "string",
    "account_type": "string",
    "account_number": "string",
    "balance": "string",
    "date_opened": "string",
    "account_status": "string",
    "estimated_removal": "string",
    "furnisher_address": "string",
    "is_negative": true,
    "addresses": [],
    "phone_numbers": [],
    "name_variations": []
  }],
  "inquiries": [{
    "creditor": "string",
    "date": "string",
    "inquiry_type": "hard",
    "potentially_unauthorized": true,
    "reason": "string"
  }],
  "personal_info_errors": {
    "name_variations": [],
    "unknown_addresses": [],
    "unknown_phone_numbers": []
  }
}

RULES:
- is_negative: true for charge-offs, collections, late payments, bankruptcies, judgments — false for accounts in good standing
- inquiries: include ALL inquiries you see; set inquiry_type to "hard" or "soft" based on how they appear
- personal_info_errors: only items that appear incorrect, unknown, or fraudulent
- No markdown. No backticks. No explanation. Start with { and end with }.`;

const CALL2_SYSTEM_PROMPT = `You are an FCRA/FDCPA attorney reviewing extracted credit report accounts and determining optimal legal dispute strategy for each account and for the case overall.

FCRA SECTION RULES — FOLLOW EXACTLY:
- Fraudulent account (identity theft, opened without consent): §605B (PRIMARY) + §623
- Collection account on fraudulent debt: §605B + §623 + §809
- Duplicate reporting (same debt appears twice — e.g. original + collection): §611 CRITICAL priority
- Balance inconsistency across bureaus: §611
- Standard inaccuracy, outdated info (no fraud): §611 + §623
- Unauthorized hard inquiry: §611
- CRITICAL: §809 applies ONLY to third-party debt collectors — NEVER to original creditors, credit unions, banks, or credit bureaus

DISPUTE PRIORITY:
- critical: confirmed identity theft, duplicate reporting, or charge-off/collection $5,000+
- high: collection or charge-off on 2+ bureaus, any amount
- medium: single bureau negative, balance inconsistency
- low: single late payment, minor error, inquiry

Return ONLY valid JSON (no markdown, no explanation):
{
  "overall_case_type": "identity_theft | standard_dispute",
  "overall_strategy": "Detailed paragraph explaining the overall legal strategy — what makes this case strong, which laws apply, what outcome is achievable, and recommended approach",
  "account_strategies": [
    {
      "creditor_name": "must exactly match creditor_name from input accounts",
      "dispute_priority": "critical|high|medium|low",
      "recommended_fcra_sections": ["605B", "623"],
      "duplicate_flag": false,
      "duplicate_note": "",
      "balance_inconsistency": false,
      "balance_inconsistency_note": "",
      "letter_targets": { "bureaus": ["equifax"], "furnishers": ["creditor name"] },
      "strategy_notes": "One sentence: specific legal angle and why it applies to this account"
    }
  ]
}`;

type BureauData = {
  account_number: string;
  balance: string;
  date_opened: string;
  account_status: string;
  estimated_removal: string;
  addresses: string[];
  phone_numbers: string[];
  name_variations: string[];
  furnisher_address: string;
};

const safeBureau = (d: unknown): BureauData | null => {
  if (!d || typeof d !== 'object') return null;
  const o = d as Record<string, unknown>;
  return {
    account_number: String(o.account_number ?? ''),
    balance: String(o.balance ?? ''),
    date_opened: String(o.date_opened ?? ''),
    account_status: String(o.account_status ?? ''),
    estimated_removal: String(o.estimated_removal ?? ''),
    addresses: Array.isArray(o.addresses) ? o.addresses.map(String) : [],
    phone_numbers: Array.isArray(o.phone_numbers) ? o.phone_numbers.map(String) : [],
    name_variations: Array.isArray(o.name_variations) ? o.name_variations.map(String) : [],
    furnisher_address: String(o.furnisher_address ?? ''),
  };
};

type AutoItemSelection = {
  bureaus: { equifax: boolean; experian: boolean; transunion: boolean };
  fcra_sections: string[];
};

function buildAutoDisputeSelections(
  insertedAccounts: Array<Record<string, unknown>>,
  personalInfoErrors: Record<string, unknown>,
  inquiries: unknown[],
): Record<string, unknown> {
  const accounts: Record<string, AutoItemSelection> = {};
  for (const acct of insertedAccounts) {
    const id = String(acct.id);
    accounts[id] = {
      bureaus: {
        equifax: acct.equifax_data != null,
        experian: acct.experian_data != null,
        transunion: acct.transunion_data != null,
      },
      fcra_sections: Array.isArray(acct.recommended_fcra_sections)
        ? (acct.recommended_fcra_sections as string[])
        : [],
    };
  }

  const pie = personalInfoErrors as {
    name_variations?: Record<string, unknown>;
    unknown_addresses?: Record<string, unknown>;
    unknown_phone_numbers?: Record<string, unknown>;
  };

  const buildCategory = (
    map: Record<string, unknown> | undefined,
    defaultSections: string[],
  ): Record<string, AutoItemSelection> => {
    const result: Record<string, AutoItemSelection> = {};
    for (const [item, bureauData] of Object.entries(map ?? {})) {
      const bureauArr = Array.isArray(bureauData) ? bureauData.map(String) : [];
      result[item] = {
        bureaus: {
          equifax: bureauArr.includes('equifax'),
          experian: bureauArr.includes('experian'),
          transunion: bureauArr.includes('transunion'),
        },
        fcra_sections: defaultSections,
      };
    }
    return result;
  };

  type InqRow = { creditor: string; date: string; bureau: string; potentially_unauthorized: boolean; inquiry_type?: string };
  const inquiriesMap: Record<string, AutoItemSelection> = {};
  for (const inq of (inquiries as InqRow[])) {
    // Only include hard inquiries that are potentially unauthorized
    if (inq.potentially_unauthorized && inq.inquiry_type === 'hard') {
      const key = `${inq.creditor}:${inq.bureau}:${inq.date}`;
      const b = (inq.bureau ?? '').toLowerCase();
      inquiriesMap[key] = {
        bureaus: { equifax: b === 'equifax', experian: b === 'experian', transunion: b === 'transunion' },
        fcra_sections: ['611'],
      };
    }
  }

  return {
    accounts,
    names: buildCategory(pie.name_variations, ['605B', '611']),
    addresses: buildCategory(pie.unknown_addresses, ['605B']),
    phones: buildCategory(pie.unknown_phone_numbers, ['605B']),
    inquiries: inquiriesMap,
  };
}

const parseClaudeJson = (response: Anthropic.Message): Record<string, unknown> => {
  const textBlock = response.content.find((b) => b.type === 'text');
  const raw = textBlock && textBlock.type === 'text' ? textBlock.text : '';
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  const startIdx = cleaned.indexOf('{');
  const endIdx = cleaned.lastIndexOf('}');
  const jsonStr = startIdx >= 0 && endIdx > startIdx ? cleaned.slice(startIdx, endIdx + 1) : cleaned;
  return JSON.parse(jsonStr);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }
  const supabase = createClient(supabaseUrl, serviceKey);

  // === GET: Extract text from a single bureau PDF ===
  if (req.method === 'GET') {
    const { action, bureau, clientId } = req.query;
    if (action !== 'extract' || typeof bureau !== 'string' || typeof clientId !== 'string') {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    const field = BUREAU_FIELD[bureau];
    if (!field) {
      return res.status(400).json({ error: 'Invalid bureau' });
    }

    const { data: client, error: cErr } = await supabase
      .from('credit_repair_clients')
      .select(field)
      .eq('id', clientId)
      .maybeSingle();

    if (cErr || !client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const path = (client as unknown as Record<string, unknown>)[field];
    if (typeof path !== 'string' || !path) {
      return res.status(404).json({ error: `No ${bureau} report uploaded` });
    }

    const { data: fileData, error: dlErr } = await supabase.storage
      .from('intake-documents')
      .download(path);

    if (dlErr || !fileData) {
      console.error('[analyze-reports] download error:', dlErr);
      return res.status(500).json({ error: 'Failed to download report' });
    }

    try {
      const buf = Buffer.from(await fileData.arrayBuffer());
      const { extractText } = await import('unpdf');
      const { text } = await extractText(new Uint8Array(buf), { mergePages: true });

      if (text.length < 50) {
        return res.status(422).json({
          error: `PDF text extraction failed for ${bureau} — may be scanned/image-based`,
          bureau,
          extractedLength: text.length,
        });
      }
      console.log(`[analyze-reports] ${bureau} extracted ${text.length} characters`);
      return res.status(200).json({ text, bureau });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('[analyze-reports] unpdf error full:', errMsg);
      return res.status(500).json({ error: `Failed to parse ${bureau} PDF`, bureau, detail: errMsg });
    }
  }

  // === POST: analyze extracted texts with Claude (3 parallel bureau calls + 1 strategy call) ===
  if (req.method === 'POST') {
    const { clientId, texts } = req.body ?? {};
    if (!clientId || !texts || typeof texts !== 'object') {
      return res.status(400).json({ error: 'Missing clientId or texts' });
    }

    const claudeKey = process.env.CLAUDE_API_KEY ?? process.env.ANTHROPIC_API_KEY;
    console.log('[analyze] API key present:', !!claudeKey, '| CLAUDE_API_KEY:', !!process.env.CLAUDE_API_KEY, '| ANTHROPIC_API_KEY:', !!process.env.ANTHROPIC_API_KEY);
    if (!claudeKey) {
      return res.status(500).json({ error: 'Claude API not configured — set CLAUDE_API_KEY or ANTHROPIC_API_KEY' });
    }

    const anthropic = new Anthropic({ apiKey: claudeKey });

    // --- TYPES ---
    type BureauExtractedAccount = {
      creditor_name: string;
      original_creditor: string;
      account_type: string;
      account_number: string;
      balance: string;
      date_opened: string;
      account_status: string;
      estimated_removal: string;
      furnisher_address: string;
      is_negative: boolean;
      addresses: string[];
      phone_numbers: string[];
      name_variations: string[];
    };
    type BureauExtractionResult = {
      accounts: BureauExtractedAccount[];
      inquiries: Array<{ creditor: string; date: string; inquiry_type: string; potentially_unauthorized: boolean; reason: string }>;
      personal_info_errors: { name_variations: string[]; unknown_addresses: string[]; unknown_phone_numbers: string[] };
    };
    type MergedAccount = {
      creditor_name: string;
      original_creditor: string;
      account_type: string;
      is_negative: boolean;
      equifax: BureauExtractedAccount | null;
      experian: BureauExtractedAccount | null;
      transunion: BureauExtractedAccount | null;
    };

    // Helper: call Claude for a single bureau's text
    const extractBureau = async (bureau: string, text: string): Promise<BureauExtractionResult | null> => {
      let r: Anthropic.Message;
      try {
        r = await anthropic.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 6000,
          system: BUREAU_EXTRACTION_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: `Analyze this ${bureau} credit report:\n\n${text}\n\nReturn ONLY the JSON object.` }],
        });
      } catch (err) {
        const e = err as Record<string, unknown>;
        console.error(`[analyze] ${bureau} extraction error:`, {
          name: e?.name,
          message: e?.message,
          status: e?.status,
          stack: typeof e?.stack === 'string' ? e.stack.slice(0, 300) : undefined,
        });
        return null;
      }
      const tb = r.content.find((b) => b.type === 'text');
      const raw = tb?.type === 'text' ? tb.text : '';
      console.log(`[analyze] ${bureau} raw length: ${raw.length}, start: ${raw.slice(0, 100)}`);
      let cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
      const si = cleaned.indexOf('{');
      const ei = cleaned.lastIndexOf('}');
      if (si >= 0 && ei > si) cleaned = cleaned.slice(si, ei + 1);
      try {
        return JSON.parse(cleaned) as BureauExtractionResult;
      } catch (err) {
        console.error(`[analyze] ${bureau} parse error:`, err instanceof Error ? err.message : err, 'raw:', raw.slice(0, 300));
        return null;
      }
    };

    console.log('[analyze-reports] Starting parallel bureau extraction...');

    // Run all three bureau extractions in parallel
    const [equifaxResult, experianResult, transunionResult] = await Promise.all([
      texts.equifax ? extractBureau('equifax', String(texts.equifax)) : Promise.resolve(null),
      texts.experian ? extractBureau('experian', String(texts.experian)) : Promise.resolve(null),
      texts.transunion ? extractBureau('transunion', String(texts.transunion)) : Promise.resolve(null),
    ]);

    console.log(`[analyze] bureau results: EQ=${equifaxResult?.accounts?.length ?? 'null'} EX=${experianResult?.accounts?.length ?? 'null'} TU=${transunionResult?.accounts?.length ?? 'null'}`);

    // Log which bureaus failed but continue as long as at least one succeeded
    const failedBureaus = [
      texts.equifax && !equifaxResult ? 'equifax' : null,
      texts.experian && !experianResult ? 'experian' : null,
      texts.transunion && !transunionResult ? 'transunion' : null,
    ].filter(Boolean);
    if (failedBureaus.length > 0) {
      console.error('[analyze] extraction failed for bureaus:', failedBureaus, '— continuing with available data');
    }
    if (!equifaxResult && !experianResult && !transunionResult) {
      return res.status(500).json({ error: 'All bureau extractions failed — check server logs for details' });
    }

    // --- SERVER-SIDE MERGE ---
    const normName = (s: string) =>
      s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();

    const findMatch = (merged: MergedAccount[], name: string): MergedAccount | undefined => {
      const norm = normName(name);
      return merged.find((a) => {
        const an = normName(a.creditor_name);
        if (an === norm) return true;
        const shorter = an.length <= norm.length ? an : norm;
        const longer = an.length <= norm.length ? norm : an;
        return shorter.length >= 5 && longer.startsWith(shorter);
      });
    };

    const bureauPairs = [
      ['equifax', equifaxResult],
      ['experian', experianResult],
      ['transunion', transunionResult],
    ] as [string, BureauExtractionResult | null][];

    // Merge accounts across bureaus
    const allMerged: MergedAccount[] = [];
    for (const [bureau, result] of bureauPairs) {
      if (!result?.accounts) continue;
      for (const acct of result.accounts) {
        const existing = findMatch(allMerged, acct.creditor_name);
        if (existing) {
          (existing as Record<string, unknown>)[bureau] = acct;
        } else {
          allMerged.push({
            creditor_name: acct.creditor_name,
            original_creditor: acct.original_creditor,
            account_type: acct.account_type,
            is_negative: acct.is_negative,
            equifax: bureau === 'equifax' ? acct : null,
            experian: bureau === 'experian' ? acct : null,
            transunion: bureau === 'transunion' ? acct : null,
          });
        }
      }
    }

    // Separate negative (dispute) accounts from positive accounts
    const extractedAccounts = allMerged.filter((a) => a.is_negative);
    const parsedPositiveAccounts = allMerged
      .filter((a) => !a.is_negative)
      .map((a) => {
        const primary = a.equifax ?? a.experian ?? a.transunion;
        return {
          creditor_name: a.creditor_name,
          account_number: primary?.account_number ?? '',
          balance: primary?.balance ?? '',
          date_opened: primary?.date_opened ?? '',
          status: primary?.account_status ?? '',
          bureaus: [a.equifax ? 'equifax' : null, a.experian ? 'experian' : null, a.transunion ? 'transunion' : null].filter(Boolean),
        };
      });

    // Merge personal_info_errors (track bureau per item)
    const pieMap: { name_variations: Record<string, string[]>; unknown_addresses: Record<string, string[]>; unknown_phone_numbers: Record<string, string[]> } = {
      name_variations: {},
      unknown_addresses: {},
      unknown_phone_numbers: {},
    };
    for (const [bureau, result] of bureauPairs) {
      if (!result?.personal_info_errors) continue;
      const pie = result.personal_info_errors;
      for (const item of pie.name_variations ?? []) { (pieMap.name_variations[item] ??= []).push(bureau); }
      for (const item of pie.unknown_addresses ?? []) { (pieMap.unknown_addresses[item] ??= []).push(bureau); }
      for (const item of pie.unknown_phone_numbers ?? []) { (pieMap.unknown_phone_numbers[item] ??= []).push(bureau); }
    }
    const parsedPersonalInfoErrors: Record<string, unknown> = pieMap;

    // Merge inquiries (add bureau, deduplicate by creditor+date+bureau)
    const seenInq = new Set<string>();
    const allInquiriesRaw: unknown[] = [];
    for (const [bureau, result] of bureauPairs) {
      if (!result?.inquiries) continue;
      for (const inq of result.inquiries) {
        const key = `${inq.creditor}:${inq.date}:${bureau}`;
        if (!seenInq.has(key)) {
          seenInq.add(key);
          allInquiriesRaw.push({ ...inq, bureau });
        }
      }
    }

    // Filter to hard inquiries only
    const parsedInquiries = allInquiriesRaw.filter((q: unknown) => {
      const inq = q as Record<string, unknown>;
      return inq.inquiry_type === 'hard';
    });

    console.log(`[analyze-reports] Merge complete: ${extractedAccounts.length} negative, ${parsedPositiveAccounts.length} positive, ${parsedInquiries.length} hard inquiries`);

    // --- CALL 2: Legal Strategy ---
    type AccountStrategy = {
      creditor_name: string;
      dispute_priority: string;
      recommended_fcra_sections: string[];
      duplicate_flag: boolean;
      duplicate_note: string;
      balance_inconsistency: boolean;
      balance_inconsistency_note: string;
      letter_targets: Record<string, unknown>;
      strategy_notes: string;
    };

    let overallCaseType = 'identity_theft';
    let overallStrategy = '';
    const strategyMap: Record<string, AccountStrategy> = {};

    try {
      const accountSummary = extractedAccounts.map((a) => ({
        creditor_name: a.creditor_name,
        original_creditor: a.original_creditor,
        account_type: a.account_type,
        bureaus_reporting: [
          a.equifax ? 'equifax' : null,
          a.experian ? 'experian' : null,
          a.transunion ? 'transunion' : null,
        ].filter(Boolean),
        balance_equifax: (a.equifax as Record<string, unknown> | null)?.balance,
        balance_experian: (a.experian as Record<string, unknown> | null)?.balance,
        balance_transunion: (a.transunion as Record<string, unknown> | null)?.balance,
        status_equifax: (a.equifax as Record<string, unknown> | null)?.account_status,
        status_experian: (a.experian as Record<string, unknown> | null)?.account_status,
        status_transunion: (a.transunion as Record<string, unknown> | null)?.account_status,
      }));

      const r2 = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: CALL2_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Determine legal dispute strategy for these ${accountSummary.length} extracted accounts:\n\n${JSON.stringify(accountSummary, null, 2)}\n\nReturn ONLY the strategy JSON.`,
        }],
      });

      console.log('[analyze-reports] Call 2 API complete, parsing response...');
      const call2TextBlock = r2.content.find((b) => b.type === 'text');
      const call2Raw = call2TextBlock && call2TextBlock.type === 'text' ? call2TextBlock.text : '';
      let parsed2: Record<string, unknown>;
      try {
        parsed2 = parseClaudeJson(r2);
      } catch (parseErr) {
        console.error('[analyze-reports] Call 2 parse error (non-fatal):', parseErr, 'raw:', call2Raw.slice(0, 500));
        throw parseErr;
      }
      overallCaseType = String(parsed2?.overall_case_type ?? 'identity_theft');
      overallStrategy = String(parsed2?.overall_strategy ?? '');
      const strategies = Array.isArray(parsed2?.account_strategies) ? parsed2.account_strategies as AccountStrategy[] : [];
      for (const s of strategies) {
        const key = String(s.creditor_name ?? '').toLowerCase().trim();
        if (key) strategyMap[key] = s;
      }
      console.log(`[analyze-reports] Call 2 parsed: case_type=${overallCaseType}, ${strategies.length} strategies`);
    } catch (err) {
      console.error('[analyze-reports] Call 2 error (non-fatal, using defaults):', err);
    }

    console.log(`[analyze-reports] Call 2 result: case_type=${overallCaseType}, strategies in map=${Object.keys(strategyMap).length}`);

    // Delete existing rows only now — after all extractions succeeded — to avoid wiping data on failure
    await supabase.from('dispute_accounts').delete().eq('client_id', clientId);

    const rows = extractedAccounts.map((a) => {
      const eq = safeBureau(a.equifax);
      const ex = safeBureau(a.experian);
      const tu = safeBureau(a.transunion);
      const bureaus = [eq ? 'equifax' : null, ex ? 'experian' : null, tu ? 'transunion' : null].filter(Boolean) as string[];
      const primary = eq ?? ex ?? tu;

      return {
        client_id: clientId,
        creditor_name: String(a.creditor_name ?? ''),
        original_creditor: String(a.original_creditor ?? ''),
        account_type: String(a.account_type ?? ''),
        account_number: primary?.account_number ?? '',
        account_number_equifax: eq?.account_number ?? '',
        account_number_experian: ex?.account_number ?? '',
        account_number_transunion: tu?.account_number ?? '',
        balance: primary?.balance ?? '',
        date_opened: primary?.date_opened ?? '',
        account_status: primary?.account_status ?? '',
        equifax_data: eq,
        experian_data: ex,
        transunion_data: tu,
        bureaus,
        phone_numbers: primary?.phone_numbers ?? [],
        name_variations: primary?.name_variations ?? [],
        addresses: primary?.addresses ?? [],
        selected: true,
        dispute_types: [],
        notes: '',
      };
    });

    let inserted: Array<Record<string, unknown>> = [];
    if (rows.length > 0) {
      const { data, error: insErr } = await supabase
        .from('dispute_accounts')
        .insert(rows)
        .select('*');
      if (insErr) {
        console.error('[analyze] insert error:', insErr);
        return res.status(500).json({ error: 'Failed to save accounts', detail: insErr.message });
      }
      inserted = data ?? [];
    }

    const autoDisputeSelections = buildAutoDisputeSelections(inserted, parsedPersonalInfoErrors, parsedInquiries);

    console.log('[analyze] positive_accounts to save:', JSON.stringify(parsedPositiveAccounts?.slice(0, 2)));

    const clientUpdate: Record<string, unknown> = {
      status: 'analyzing',
      personal_info_errors: parsedPersonalInfoErrors,
      inquiries: parsedInquiries,
      positive_accounts: parsedPositiveAccounts,
      dispute_selections: autoDisputeSelections,
      case_type: overallCaseType,
    };
    if (overallStrategy) clientUpdate.strategy_notes = overallStrategy;

    await supabase
      .from('credit_repair_clients')
      .update(clientUpdate)
      .eq('id', clientId);

    return res.status(200).json({ accounts: inserted, count: inserted.length });
  }

  // === PATCH: Update any field(s) on a single dispute_accounts row ===
  if (req.method === 'PATCH') {
    const { accountId, ...patchFields } = req.body ?? {};
    if (typeof accountId !== 'string' || !accountId) {
      return res.status(400).json({ error: 'Missing accountId' });
    }

    const ALLOWED = new Set([
      'dispute_types', 'bureaus',
      'creditor_name', 'original_creditor',
      'balance', 'date_opened', 'account_type', 'account_status',
      'phone_numbers', 'name_variations', 'addresses', 'notes',
      'account_number', 'account_number_equifax', 'account_number_experian', 'account_number_transunion',
      'equifax_data', 'experian_data', 'transunion_data',
      'duplicate_flag', 'duplicate_note',
      'balance_inconsistency', 'balance_inconsistency_note',
      'dispute_priority', 'recommended_fcra_sections', 'letter_targets',
      'strategy_notes',
    ]);

    const updateData: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(patchFields)) {
      if (ALLOWED.has(k)) updateData[k] = v;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const { error: updErr } = await supabase
      .from('dispute_accounts')
      .update(updateData)
      .eq('id', accountId);

    if (updErr) {
      console.error('[analyze-reports] update error:', updErr);
      return res.status(500).json({ error: 'Failed to update account' });
    }

    return res.status(200).json({ success: true });
  }

  // === DELETE: Remove a single dispute_accounts row ===
  if (req.method === 'DELETE') {
    const { accountId } = req.body ?? {};
    if (typeof accountId !== 'string' || !accountId) {
      return res.status(400).json({ error: 'Missing accountId' });
    }

    const { error: delErr } = await supabase
      .from('dispute_accounts')
      .delete()
      .eq('id', accountId);

    if (delErr) {
      console.error('[analyze-reports] delete error:', delErr);
      return res.status(500).json({ error: 'Failed to delete account' });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
