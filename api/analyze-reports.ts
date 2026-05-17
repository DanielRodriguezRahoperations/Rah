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
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS personal_info_errors jsonb;
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS inquiries jsonb;
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS ftc_report_numbers text[] DEFAULT '{}';
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS dispute_selections jsonb DEFAULT '{}';
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS case_type text DEFAULT 'identity_theft';
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS positive_accounts jsonb DEFAULT '[]';

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

const BUREAU_FIELD: Record<string, string> = {
  equifax: 'doc_cr_equifax',
  experian: 'doc_cr_experian',
  transunion: 'doc_cr_transunion',
};

const CREDIT_ANALYSIS_SYSTEM_PROMPT = `You are an expert credit repair analyst and FCRA attorney with 20 years of experience. When analyzing credit reports you do the following:

1. CROSS-BUREAU MATCHING
   Match accounts across all three bureaus by creditor name similarity and account number overlap. One creditor = one account record with per-bureau data. Never create duplicate records for the same debt.

2. DUPLICATE/DOUBLE REPORTING DETECTION
   Flag any account where the same underlying debt appears to be reporting more than once. Common patterns:
   - Original installment account + a new collection account for the same debt (e.g. Aidvantage student loans transferred to DOE collections — same loan appearing twice)
   - Two accounts with identical account numbers at the same creditor
   - A charge-off AND a collection for the same original creditor
   Set duplicate_flag: true and explain in duplicate_note.

3. BALANCE INCONSISTENCY DETECTION
   If the same account shows different balances across bureaus, flag it. Set balance_inconsistency: true. This is a dispute angle under §611.

4. DISPUTE PRIORITY SCORING
   Rate each negative account: "critical", "high", "medium", or "low"
   - critical: charge-off or collection $5,000+, or duplicate reporting
   - high: collection or charge-off any amount on 2+ bureaus
   - medium: single bureau negative, or minor inconsistency
   - low: single late payment, inquiry dispute

5. RECOMMENDED FCRA SECTIONS per account (use these exact keys: "611", "623", "605B", "609", "809"):
   - Collection account → ["611","623"]
   - Charge-off → ["611","623"]
   - Identity theft account → ["605B","611"]
   - Duplicate reporting → ["611"]
   - Balance inconsistency → ["611"]
   - Unauthorized inquiry → ["611"]
   - Furnisher dispute needed → ["623"]
   - Debt validation needed → ["809"]

6. LETTER TARGETING
   For each account, list which bureaus and furnishers/creditors need letters. Only target bureaus that actually report that account.

7. PERSONAL INFORMATION ERRORS
   Extract any variations of the client's name, unknown addresses, and unknown phone numbers found anywhere across all three reports.
   For each item, record which bureau(s) reported it as an array of bureau names.
   Use exactly these bureau identifiers: "equifax", "experian", "transunion".

Return ONLY a valid JSON object — no markdown, no explanation:

{
  "accounts": [
    {
      "creditor_name": "string",
      "original_creditor": "string",
      "account_type": "string",
      "dispute_priority": "critical|high|medium|low",
      "recommended_fcra_sections": ["611","623"],
      "duplicate_flag": false,
      "duplicate_note": "string",
      "balance_inconsistency": false,
      "balance_inconsistency_note": "string",
      "letter_targets": { "bureaus": ["equifax"], "furnishers": ["creditor name"] },
      "equifax": { "account_number": "string", "balance": "string", "date_opened": "string", "account_status": "string", "estimated_removal": "string", "addresses": [], "phone_numbers": [], "name_variations": [] },
      "experian": { "same shape as equifax" } or null,
      "transunion": { "same shape as equifax" } or null
    }
  ],
  "personal_info_errors": {
    "name_variations":       { "John R Smith": ["equifax", "experian"], "J. Smith": ["transunion"] },
    "unknown_addresses":     { "123 Unknown St, City, ST 12345": ["equifax"] },
    "unknown_phone_numbers": { "555-123-4567": ["experian", "transunion"] }
  },
  "inquiries": [
    { "creditor": "string", "date": "string", "bureau": "string", "potentially_unauthorized": false }
  ],
  "positive_accounts": [
    { "creditor_name": "string", "account_number": "string", "balance": "string", "date_opened": "string", "status": "string", "bureaus": [] }
  ]
}

Never guess bureau assignment — only include a bureau data object if that bureau's report text explicitly contains that account. Set that bureau to null otherwise.`;

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

  type InqRow = { creditor: string; date: string; bureau: string; potentially_unauthorized: boolean };
  const inquiriesMap: Record<string, AutoItemSelection> = {};
  for (const inq of (inquiries as InqRow[])) {
    if (inq.potentially_unauthorized) {
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

  // === POST: analyze extracted texts with Claude (per-bureau structure) ===
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

    console.log('[analyze-reports] equifax text (first 500):', (texts.equifax || '').slice(0, 500));
    console.log('[analyze-reports] experian text (first 500):', (texts.experian || '').slice(0, 500));
    console.log('[analyze-reports] transunion text (first 500):', (texts.transunion || '').slice(0, 500));

    const userMsg = `You are analyzing THREE SEPARATE credit report source documents. Treat each bureau's text as an independent source. Match accounts across them by creditor name and account number similarity.

=== SOURCE 1: EQUIFAX REPORT ===
${texts.equifax || '[NOT PROVIDED — do not assign any accounts to Equifax]'}

=== SOURCE 2: EXPERIAN REPORT ===
${texts.experian || '[NOT PROVIDED — do not assign any accounts to Experian]'}

=== SOURCE 3: TRANSUNION REPORT ===
${texts.transunion || '[NOT PROVIDED — do not assign any accounts to TransUnion]'}

=== END OF SOURCE DOCUMENTS ===

Now apply your full analysis: cross-bureau matching, duplicate detection, balance inconsistency detection, priority scoring, FCRA section recommendations, letter targeting, and personal info error extraction.

Return ONLY the JSON object described in the system prompt. No markdown. No explanation.`;

    type BureauData = {
      account_number: string;
      balance: string;
      date_opened: string;
      account_status: string;
      estimated_removal: string;
      addresses: string[];
      phone_numbers: string[];
      name_variations: string[];
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
      };
    };

    let extractedAccounts: Array<{
      creditor_name: unknown; original_creditor: unknown; account_type: unknown;
      dispute_priority: unknown; recommended_fcra_sections: unknown;
      duplicate_flag: unknown; duplicate_note: unknown;
      balance_inconsistency: unknown; balance_inconsistency_note: unknown;
      letter_targets: unknown;
      equifax: unknown; experian: unknown; transunion: unknown;
    }> = [];
    let parsedPersonalInfoErrors: Record<string, unknown> = {};
    let parsedInquiries: unknown[] = [];
    let parsedPositiveAccounts: unknown[] = [];

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 6000,
        system: CREDIT_ANALYSIS_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMsg }],
      });

      const textBlock = response.content.find((b) => b.type === 'text');
      const raw = textBlock && textBlock.type === 'text' ? textBlock.text : '';
      console.log('[analyze-reports] Claude raw response (first 1000):', raw.slice(0, 1000));
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
      const startIdx = cleaned.indexOf('{');
      const endIdx = cleaned.lastIndexOf('}');
      const jsonStr = startIdx >= 0 && endIdx > startIdx ? cleaned.slice(startIdx, endIdx + 1) : cleaned;
      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed?.accounts)) throw new Error('Missing accounts array');
      extractedAccounts = parsed.accounts;
      parsedPersonalInfoErrors = (parsed.personal_info_errors && typeof parsed.personal_info_errors === 'object') ? parsed.personal_info_errors as Record<string, unknown> : {};
      parsedInquiries = Array.isArray(parsed.inquiries) ? parsed.inquiries : [];
      parsedPositiveAccounts = Array.isArray(parsed.positive_accounts) ? parsed.positive_accounts : [];
    } catch (err) {
      console.error('[analyze-reports] Claude error:', err);
      return res.status(500).json({ error: 'Failed to analyze reports' });
    }

    await supabase.from('dispute_accounts').delete().eq('client_id', clientId);

    const rows = extractedAccounts.map((a) => {
      const eq = safeBureau(a.equifax);
      const ex = safeBureau(a.experian);
      const tu = safeBureau(a.transunion);
      const bureaus = [eq ? 'equifax' : null, ex ? 'experian' : null, tu ? 'transunion' : null].filter(Boolean) as string[];
      const primary = eq ?? ex ?? tu;
      const recommendedSections = Array.isArray(a.recommended_fcra_sections)
        ? (a.recommended_fcra_sections as unknown[]).map(String)
        : [];
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
        duplicate_flag: Boolean(a.duplicate_flag),
        duplicate_note: String(a.duplicate_note ?? ''),
        balance_inconsistency: Boolean(a.balance_inconsistency),
        balance_inconsistency_note: String(a.balance_inconsistency_note ?? ''),
        dispute_priority: String(a.dispute_priority ?? 'medium'),
        recommended_fcra_sections: recommendedSections,
        letter_targets: (a.letter_targets && typeof a.letter_targets === 'object') ? a.letter_targets : {},
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

    await supabase
      .from('credit_repair_clients')
      .update({
        status: 'analyzing',
        personal_info_errors: parsedPersonalInfoErrors,
        inquiries: parsedInquiries,
        positive_accounts: parsedPositiveAccounts,
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
