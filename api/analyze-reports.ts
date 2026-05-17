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

  // === POST: analyze extracted texts with a single Claude call ===
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

    // Step 2 — Single Claude call across all three bureau texts
    let response: Anthropic.Message;
    try {
      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        system: `You are an expert credit repair analyst and FCRA attorney. Analyze these credit reports and extract ALL negative items and personal information errors.

Return ONLY a valid JSON object. No markdown. No explanation. Start with { and end with }.

JSON shape:
{
  "accounts": [
    {
      "creditor_name": "string",
      "original_creditor": "string",
      "account_number": "string",
      "balance": "string",
      "date_opened": "string",
      "account_type": "string",
      "account_status": "string",
      "bureaus": ["equifax","experian","transunion"],
      "is_negative": true,
      "duplicate_flag": false,
      "duplicate_note": "string",
      "balance_inconsistency": false,
      "balance_inconsistency_note": "string",
      "dispute_priority": "critical",
      "equifax_account_number": "string",
      "experian_account_number": "string",
      "transunion_account_number": "string",
      "furnisher_address": "string"
    }
  ],
  "positive_accounts": [
    {
      "creditor_name": "string",
      "account_number": "string",
      "balance": "string",
      "date_opened": "string",
      "status": "string",
      "bureaus": []
    }
  ],
  "personal_info_errors": {
    "name_variations": { "NAME": ["equifax","experian"] },
    "unknown_addresses": { "123 Main St": ["equifax"] },
    "unknown_phone_numbers": { "555-1234": ["transunion"] }
  },
  "inquiries": [
    {
      "creditor": "string",
      "date": "string",
      "bureau": "string",
      "inquiry_type": "hard",
      "potentially_unauthorized": true,
      "reason": "string"
    }
  ],
  "overall_case_type": "identity_theft",
  "overall_strategy": "string"
}

RULES:
- Match accounts across bureaus — one record per unique debt
- Only assign a bureau if that bureau explicitly reports it
- bureaus array = which bureaus report this account
- equifax_account_number = account number as shown on Equifax (empty string if not reported)
- experian_account_number = account number as shown on Experian (empty string if not reported)
- transunion_account_number = account number as shown on TransUnion (empty string if not reported)
- Soft inquiries: inquiry_type "soft", potentially_unauthorized false
- Hard inquiries: inquiry_type "hard", flag if potentially unauthorized
- Personal info errors: track which bureau reported each item
- Student loans appearing as both installment AND collection = duplicate_flag true
- Balance differs across bureaus = balance_inconsistency true
- dispute_priority critical = $5k+ or all-bureau or duplicate; high = 2+ bureau collection/charge-off; medium = single bureau; low = minor/inquiry
- overall_strategy = 2-3 sentence plain English dispute plan`,
        messages: [{
          role: 'user',
          content: `Analyze these three credit reports:

=== EQUIFAX ===
${texts.equifax || '[not provided]'}

=== EXPERIAN ===
${texts.experian || '[not provided]'}

=== TRANSUNION ===
${texts.transunion || '[not provided]'}

Return the JSON object.`,
        }],
      });
    } catch (err) {
      console.error('[analyze] Claude API error:', err);
      return res.status(500).json({ error: 'Claude API request failed', detail: err instanceof Error ? err.message : String(err) });
    }

    // Step 3 — Parse response with markdown fence stripping
    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock?.type === 'text' ? textBlock.text : '';
    console.log('[analyze] raw length:', raw.length);
    let cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    const si = cleaned.indexOf('{');
    const ei = cleaned.lastIndexOf('}');
    if (si >= 0 && ei > si) cleaned = cleaned.slice(si, ei + 1);

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error('[analyze] JSON parse error:', err instanceof Error ? err.message : err, 'raw:', raw.slice(0, 500));
      return res.status(500).json({
        error: 'JSON parse failed',
        detail: err instanceof Error ? err.message : String(err),
        rawLength: raw.length,
        rawStart: raw.slice(0, 500),
        rawEnd: raw.slice(-500),
      });
    }

    // Step 4 — Determine FCRA sections server-side
    const getFCRASections = (account: Record<string, unknown>, caseType: string): string[] => {
      const sections: string[] = [];
      const isCollection = String(account.account_type ?? '').toLowerCase().includes('collect');
      if (caseType === 'identity_theft') {
        sections.push('605B', '623');
        if (isCollection) sections.push('809');
      } else {
        sections.push('611', '623');
        if (isCollection) sections.push('809');
      }
      return sections;
    };

    // Step 5 — Build rows for dispute_accounts insert
    const caseType = String(parsed.overall_case_type ?? 'identity_theft');
    const parsedAccounts = Array.isArray(parsed.accounts) ? parsed.accounts as Record<string, unknown>[] : [];
    const rows = parsedAccounts
      .filter((a) => Boolean(a.is_negative))
      .map((a) => ({
        client_id: clientId,
        creditor_name: String(a.creditor_name ?? ''),
        original_creditor: String(a.original_creditor ?? ''),
        account_number: String(a.account_number ?? ''),
        account_number_equifax: String(a.equifax_account_number ?? ''),
        account_number_experian: String(a.experian_account_number ?? ''),
        account_number_transunion: String(a.transunion_account_number ?? ''),
        balance: String(a.balance ?? ''),
        date_opened: String(a.date_opened ?? ''),
        account_type: String(a.account_type ?? ''),
        account_status: String(a.account_status ?? ''),
        bureaus: Array.isArray(a.bureaus) ? a.bureaus : [],
        duplicate_flag: Boolean(a.duplicate_flag),
        duplicate_note: String(a.duplicate_note ?? ''),
        balance_inconsistency: Boolean(a.balance_inconsistency),
        balance_inconsistency_note: String(a.balance_inconsistency_note ?? ''),
        dispute_priority: String(a.dispute_priority ?? 'medium'),
        furnisher_address: String(a.furnisher_address ?? ''),
        selected: true,
        dispute_types: getFCRASections(a, caseType),
        recommended_fcra_sections: getFCRASections(a, caseType),
        phone_numbers: [],
        name_variations: [],
        addresses: [],
        notes: '',
      }));

    const parsedInquiries = (Array.isArray(parsed.inquiries) ? parsed.inquiries as Record<string, unknown>[] : [])
      .filter((i) => i.inquiry_type === 'hard');
    const parsedPersonalInfoErrors: Record<string, unknown> =
      (parsed.personal_info_errors && typeof parsed.personal_info_errors === 'object')
        ? parsed.personal_info_errors as Record<string, unknown> : {};
    const parsedPositiveAccounts = Array.isArray(parsed.positive_accounts) ? parsed.positive_accounts : [];
    const overallStrategy = String(parsed.overall_strategy ?? '');

    console.log(`[analyze] parsed: ${rows.length} negative accounts, ${parsedPositiveAccounts.length} positive, ${parsedInquiries.length} hard inquiries`);

    // Step 6 — Save to Supabase (delete then insert)
    await supabase.from('dispute_accounts').delete().eq('client_id', clientId);

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

    // Step 7 — Build dispute_selections from saved rows and save everything
    const autoDisputeSelections = buildAutoDisputeSelections(inserted, parsedPersonalInfoErrors, parsedInquiries);

    console.log('[analyze] positive_accounts to save:', JSON.stringify(parsedPositiveAccounts?.slice(0, 2)));

    await supabase
      .from('credit_repair_clients')
      .update({
        status: 'analyzing',
        case_type: caseType,
        strategy_notes: overallStrategy,
        positive_accounts: parsedPositiveAccounts,
        personal_info_errors: parsedPersonalInfoErrors,
        inquiries: parsedInquiries,
        dispute_selections: autoDisputeSelections,
      })
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
