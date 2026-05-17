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

const CALL1_SYSTEM_PROMPT = `You are a credit report data extraction specialist. Your ONLY job is to extract raw data from three bureau credit reports. Do not determine legal strategy here — only extract facts.

EXTRACTION RULES:

NEGATIVE ACCOUNTS (charge-offs, collections, late payments, bankruptcies, judgments):
- ONE record per unique underlying debt, matched across bureaus by creditor name similarity AND account number overlap
- Never create duplicate records for the same debt
- Only include a bureau data object if that bureau's text EXPLICITLY lists that account — never infer cross-bureau presence
- For each bureau reporting the account, extract: account_number, balance, date_opened, account_status, estimated_removal, addresses[], phone_numbers[], name_variations[], and furnisher_address (the FCRA compliance/dispute mailing address for that creditor found in that bureau's text — use "" if not found)

HARD INQUIRIES ONLY:
- INCLUDE: Hard inquiries made for lending decisions, credit applications, account openings
- EXCLUDE ALL soft inquiries: promotional, pre-approval, account review, employer checks, insurance, monitoring services, credit score pulls
- For each hard inquiry: creditor, date, bureau, inquiry_type: "hard", reason (stated purpose if available, else ""), potentially_unauthorized: boolean

PERSONAL INFORMATION ERRORS:
- Extract ONLY items that appear incorrect, unknown, or fraudulent — not the client's verified current info
- For each item, record which bureau(s) reported it

POSITIVE ACCOUNTS (all accounts in good standing — current, on-time, paid as agreed):
- Extract all of them for reference

Return ONLY valid JSON (no markdown, no explanation):
{
  "accounts": [
    {
      "creditor_name": "string",
      "original_creditor": "string",
      "account_type": "string",
      "equifax": {
        "account_number": "string", "balance": "string", "date_opened": "string",
        "account_status": "string", "estimated_removal": "string",
        "addresses": [], "phone_numbers": [], "name_variations": [],
        "furnisher_address": ""
      },
      "experian": null,
      "transunion": null
    }
  ],
  "personal_info_errors": {
    "name_variations": { "John R Smith": ["equifax", "experian"] },
    "unknown_addresses": { "123 Fake St, City ST 12345": ["equifax"] },
    "unknown_phone_numbers": { "555-000-0000": ["transunion"] }
  },
  "inquiries": [
    {
      "creditor": "string", "date": "string", "bureau": "string",
      "inquiry_type": "hard", "reason": "string", "potentially_unauthorized": true
    }
  ],
  "positive_accounts": [
    { "creditor_name": "string", "account_number": "string", "balance": "string", "date_opened": "string", "status": "string", "bureaus": [] }
  ]
}

CRITICAL: Your response must be valid JSON only. No markdown. No backticks. No explanation. Start with { and end with }. Keep bureau data objects concise if needed.`;

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

  // === POST: analyze extracted texts with Claude (3 sequential calls) ===
  if (req.method === 'POST') {
    const { clientId, texts } = req.body ?? {};
    if (!clientId || !texts || typeof texts !== 'object') {
      return res.status(400).json({ error: 'Missing clientId or texts' });
    }

    const claudeKey = process.env.CLAUDE_API_KEY;
    if (!claudeKey) {
      return res.status(500).json({ error: 'Claude API not configured' });
    }

    const anthropic = new Anthropic({ apiKey: claudeKey });

    const reportText = `=== SOURCE 1: EQUIFAX REPORT ===
${texts.equifax || '[NOT PROVIDED — do not assign any accounts to Equifax]'}

=== SOURCE 2: EXPERIAN REPORT ===
${texts.experian || '[NOT PROVIDED — do not assign any accounts to Experian]'}

=== SOURCE 3: TRANSUNION REPORT ===
${texts.transunion || '[NOT PROVIDED — do not assign any accounts to TransUnion]'}`;

    console.log('[analyze-reports] Starting Call 1: Account Extraction');

    // --- CALL 1: Account Extraction ---
    type RawAccount = {
      creditor_name: unknown; original_creditor: unknown; account_type: unknown;
      equifax: unknown; experian: unknown; transunion: unknown;
    };

    let extractedAccounts: RawAccount[] = [];
    let parsedPersonalInfoErrors: Record<string, unknown> = {};
    let allInquiries: unknown[] = [];
    let parsedPositiveAccounts: unknown[] = [];

    let r1: Anthropic.Message;
    try {
      r1 = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        system: CALL1_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Analyze these three credit reports and extract all account, inquiry, and personal information data:\n\n${reportText}\n\nReturn ONLY the JSON object.`,
        }],
      });
    } catch (err) {
      console.error('[analyze-reports] Call 1 API error:', err);
      return res.status(500).json({ error: 'Call 1 API request failed', detail: err instanceof Error ? err.message : String(err) });
    }

    console.log('[analyze-reports] Call 1 API complete, parsing response...');
    const call1TextBlock = r1.content.find((b) => b.type === 'text');
    const raw1 = call1TextBlock?.type === 'text' ? call1TextBlock.text : '';
    console.log('[analyze] Call 1 raw length:', raw1.length);
    console.log('[analyze] Call 1 raw start:', raw1.slice(0, 200));
    console.log('[analyze] Call 1 raw end:', raw1.slice(-200));
    let cleaned1 = raw1.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    const s1 = cleaned1.indexOf('{');
    const e1 = cleaned1.lastIndexOf('}');
    if (s1 >= 0 && e1 > s1) cleaned1 = cleaned1.slice(s1, e1 + 1);
    console.log('[analyze] Call 1 cleaned length:', cleaned1.length);
    try {
      const extractedData = JSON.parse(cleaned1);
      if (!Array.isArray(extractedData?.accounts)) throw new Error('Missing accounts array in Call 1 response');
      extractedAccounts = extractedData.accounts as RawAccount[];
      parsedPersonalInfoErrors = (extractedData.personal_info_errors && typeof extractedData.personal_info_errors === 'object')
        ? extractedData.personal_info_errors as Record<string, unknown> : {};
      allInquiries = Array.isArray(extractedData.inquiries) ? extractedData.inquiries : [];
      parsedPositiveAccounts = Array.isArray(extractedData.positive_accounts) ? extractedData.positive_accounts : [];
      console.log(`[analyze-reports] Call 1 parsed: ${extractedAccounts.length} accounts, ${allInquiries.length} inquiries (pre-filter), personal_info_errors: ${JSON.stringify(parsedPersonalInfoErrors)}`);
    } catch (err) {
      console.error('[analyze] Call 1 full raw:', raw1);
      return res.status(500).json({
        error: 'Call 1 JSON parse failed',
        detail: err instanceof Error ? err.message : String(err),
        rawLength: raw1.length,
        rawStart: raw1.slice(0, 500),
        rawEnd: raw1.slice(-500),
      });
    }

    // Filter to hard inquiries only (Call 1 should only return hard inquiries, this is a safety filter)
    const parsedInquiries = allInquiries.filter((q: unknown) => {
      const inq = q as Record<string, unknown>;
      return inq.inquiry_type === 'hard';
    });

    console.log(`[analyze-reports] Call 1: ${extractedAccounts.length} accounts, ${parsedInquiries.length} hard inquiries`);

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

    // Build and insert dispute_accounts rows, merging Call 2 strategies
    await supabase.from('dispute_accounts').delete().eq('client_id', clientId);

    const rows = extractedAccounts.map((a) => {
      const eq = safeBureau(a.equifax);
      const ex = safeBureau(a.experian);
      const tu = safeBureau(a.transunion);
      const bureaus = [eq ? 'equifax' : null, ex ? 'experian' : null, tu ? 'transunion' : null].filter(Boolean) as string[];
      const primary = eq ?? ex ?? tu;

      const creditorKey = String(a.creditor_name ?? '').toLowerCase().trim();
      const strategy = strategyMap[creditorKey] ?? null;

      const recommendedSections = strategy?.recommended_fcra_sections?.map(String) ?? [];

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
        duplicate_flag: Boolean(strategy?.duplicate_flag ?? false),
        duplicate_note: String(strategy?.duplicate_note ?? ''),
        balance_inconsistency: Boolean(strategy?.balance_inconsistency ?? false),
        balance_inconsistency_note: String(strategy?.balance_inconsistency_note ?? ''),
        dispute_priority: String(strategy?.dispute_priority ?? 'medium'),
        recommended_fcra_sections: recommendedSections,
        letter_targets: (strategy?.letter_targets && typeof strategy.letter_targets === 'object') ? strategy.letter_targets : {},
        strategy_notes: String(strategy?.strategy_notes ?? ''),
        selected: true,
        dispute_types: recommendedSections,
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
        console.error('[analyze-reports] insert error:', insErr);
        return res.status(500).json({ error: 'Failed to save accounts' });
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
