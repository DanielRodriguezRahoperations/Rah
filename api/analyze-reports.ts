// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS original_creditor text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS account_number_equifax text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS account_number_experian text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS account_number_transunion text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS duplicate_flag boolean DEFAULT false;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS duplicate_note text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS balance_inconsistency boolean DEFAULT false;
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS balance_inconsistency_note text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS dispute_priority text DEFAULT 'medium';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS furnisher_address text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS estimated_removal text DEFAULT '';
// ALTER TABLE dispute_accounts ADD COLUMN IF NOT EXISTS dispute_tag text;
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS positive_accounts jsonb DEFAULT '[]';
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS personal_info_errors jsonb;
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS inquiries jsonb;
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS strategy_notes text;
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

const CREDIT_ANALYSIS_SYSTEM_PROMPT = `You are an expert credit report analyst reading three bureau credit reports. Extract all information following these exact rules.

BUREAU ASSIGNMENT — CRITICAL:
The user message contains three labeled sections. Only assign a bureau to an account if that account explicitly appears in that bureau's section.
- Only add "equifax" if the account appears between === EQUIFAX REPORT === and === END EQUIFAX ===
- Only add "experian" if it appears between === EXPERIAN REPORT === and === END EXPERIAN ===
- Only add "transunion" if it appears between === TRANSUNION REPORT === and === END TRANSUNION ===
- Never assign all three by default. An account on only 1 or 2 bureaus is completely normal.
- Each bureau formats reports differently — read carefully.

ACCOUNT NUMBERS:
Extract the account number exactly as shown on each bureau's report separately. They will often differ.

PERSONAL INFO ERRORS:
Extract name variations, addresses, and phone numbers that appear INCORRECT or FRAUDULENT on the reports. Do NOT extract the client's own current correct information. For each item record which bureau(s) reported it.

INQUIRIES:
Only extract HARD inquiries — actual credit applications. Exclude ALL soft inquiries (promotional, pre-approval, account review, employer, insurance, monitoring). For each hard inquiry record the creditor, date, bureau, and whether it appears potentially unauthorized based on the creditor type.

DUPLICATE DETECTION:
If the same underlying debt appears as both an installment account AND a collection account flag both with duplicate_flag: true and explain in duplicate_note. Student loans transferred to collections are a common example.

BALANCE INCONSISTENCY:
If the same account shows different balances across bureaus set balance_inconsistency: true and note the exact amounts.

PRIORITY:
- critical: charge-off or collection $5k+ on 2+ bureaus, or duplicate reporting
- high: collection or charge-off on 2+ bureaus
- medium: single bureau negative item
- low: inquiry or minor item

Return ONLY valid JSON. No markdown. No explanation. Start with { and end with }.`;

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

  // === POST: analyze extracted texts with Claude ===
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

    // DEBUG — remove after testing
    console.log('[analyze-reports] equifax text (first 500):', (texts.equifax || '').slice(0, 500));
    console.log('[analyze-reports] experian text (first 500):', (texts.experian || '').slice(0, 500));
    console.log('[analyze-reports] transunion text (first 500):', (texts.transunion || '').slice(0, 500));

    const userMsg = `=== EQUIFAX REPORT ===
${texts.equifax || '[not provided]'}
=== END EQUIFAX ===

=== EXPERIAN REPORT ===
${texts.experian || '[not provided]'}
=== END EXPERIAN ===

=== TRANSUNION REPORT ===
${texts.transunion || '[not provided]'}
=== END TRANSUNION ===

Return a JSON object in exactly this shape:
{
  "negative_accounts": [
    {
      "creditor_name": "string — collection agency name if in collections",
      "original_creditor": "string — original creditor if different, empty string if same",
      "account_type": "string",
      "account_status": "string — why it is negative e.g. Collection, Charge-Off, 120 Days Late",
      "balance": "string",
      "date_opened": "string MM/YYYY",
      "bureaus": ["equifax", "experian", "transunion"],
      "equifax_account_number": "string — exact number from Equifax, empty if not on Equifax",
      "experian_account_number": "string — exact number from Experian, empty if not on Experian",
      "transunion_account_number": "string — exact number from TransUnion, empty if not on TransUnion",
      "estimated_removal": "string — estimated removal date if shown, empty if not",
      "duplicate_flag": false,
      "duplicate_note": "string",
      "balance_inconsistency": false,
      "balance_inconsistency_note": "string",
      "dispute_priority": "critical | high | medium | low",
      "furnisher_address": "string — mailing address of furnisher if shown in report, empty if not"
    }
  ],
  "positive_accounts": [
    {
      "creditor_name": "string",
      "account_type": "string",
      "account_status": "string",
      "balance": "string",
      "date_opened": "string",
      "bureaus": ["equifax"]
    }
  ],
  "personal_info_errors": {
    "name_variations": { "WRONG NAME HERE": ["equifax", "experian"] },
    "unknown_addresses": { "123 Wrong St Phoenix AZ": ["equifax"] },
    "unknown_phone_numbers": { "555-1234": ["transunion"] }
  },
  "inquiries": [
    {
      "creditor": "string",
      "date": "string",
      "bureau": "string",
      "inquiry_type": "hard",
      "potentially_unauthorized": false,
      "reason": "string — brief explanation of why flagged or not"
    }
  ],
  "overall_case_type": "identity_theft | standard",
  "overall_strategy": "string — 2-3 sentence plain English summary of the recommended dispute approach for this client"
}`;

    let parsed: {
      negative_accounts: Array<Record<string, unknown>>;
      positive_accounts: Array<Record<string, unknown>>;
      personal_info_errors: {
        name_variations: Record<string, string[]>;
        unknown_addresses: Record<string, string[]>;
        unknown_phone_numbers: Record<string, string[]>;
      };
      inquiries: Array<Record<string, unknown>>;
      overall_case_type: string;
      overall_strategy: string;
    };

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 8192,
        system: CREDIT_ANALYSIS_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMsg }],
      });

      const textBlock = response.content.find((b) => b.type === 'text');
      const raw = textBlock && textBlock.type === 'text' ? textBlock.text : '';
      console.log('[analyze] raw response length:', raw.length);
      console.log('[analyze] raw start:', raw.slice(0, 300));

      let cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
      const si = cleaned.indexOf('{');
      const ei = cleaned.lastIndexOf('}');
      if (si >= 0 && ei > si) cleaned = cleaned.slice(si, ei + 1);

      parsed = JSON.parse(cleaned);

      if (!Array.isArray(parsed.negative_accounts)) {
        throw new Error('Missing negative_accounts array in response');
      }
    } catch (err) {
      console.error('[analyze] Claude error:', err);
      return res.status(500).json({ error: 'Failed to analyze reports', detail: (err as Error).message });
    }

    // Delete existing accounts and insert new ones
    await supabase.from('dispute_accounts').delete().eq('client_id', clientId);

    const rows = (parsed.negative_accounts ?? []).map((a) => ({
      client_id: clientId,
      creditor_name: String(a.creditor_name ?? ''),
      original_creditor: String(a.original_creditor ?? ''),
      account_number: String(a.equifax_account_number || a.experian_account_number || a.transunion_account_number || ''),
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
      estimated_removal: String(a.estimated_removal ?? ''),
      selected: true,
      dispute_types: [],
      dispute_tag: null,
      notes: '',
    }));

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

    // Save enriched data to client record
    const { error: clientUpdErr } = await supabase
      .from('credit_repair_clients')
      .update({
        status: 'analyzing',
        case_type: String(parsed.overall_case_type ?? 'identity_theft'),
        strategy_notes: String(parsed.overall_strategy ?? ''),
        positive_accounts: parsed.positive_accounts ?? [],
        personal_info_errors: parsed.personal_info_errors ?? {},
        inquiries: (parsed.inquiries ?? []).filter(
          (q) => String(q.inquiry_type) === 'hard'
        ),
      })
      .eq('id', clientId);

    if (clientUpdErr) {
      console.error('[analyze] client update error:', clientUpdErr);
    }

    return res.status(200).json({ accounts: inserted, count: inserted.length });
  }

  // === PATCH: Update dispute_types for a single account ===
  if (req.method === 'PATCH') {
    const { accountId, disputeTypes } = req.body ?? {};
    if (typeof accountId !== 'string' || !accountId || !Array.isArray(disputeTypes)) {
      return res.status(400).json({ error: 'Missing accountId or disputeTypes' });
    }

    const { error: updErr } = await supabase
      .from('dispute_accounts')
      .update({ dispute_types: disputeTypes })
      .eq('id', accountId);

    if (updErr) {
      console.error('[analyze-reports] dispute_types update error:', updErr);
      return res.status(500).json({ error: 'Failed to update dispute type' });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
