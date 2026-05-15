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

const CREDIT_ANALYSIS_SYSTEM_PROMPT = `You are an expert at reading credit reports and extracting negative account information.
Extract EVERY negative item from the provided credit reports: collections, late payments, charge-offs, judgments, incorrect addresses, unauthorized inquiries.
For each item extract: creditor_name, account_number (partial ok), balance, date_opened, account_type, account_status, bureaus (array of 'equifax'|'experian'|'transunion').
Return ONLY a JSON array of account objects. No explanation. No markdown.`;

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
      // @ts-ignore — pdf-parse has CJS-style default export
      const pdfParse = (await import('pdf-parse')).default;
      const result = await pdfParse(buf);
      return res.status(200).json({ text: result.text ?? '', bureau });
    } catch (err) {
      console.error('[analyze-reports] pdf-parse error:', err);
      return res.status(200).json({ text: '', bureau, fallback: true });
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

    const userMsg = `Extract every negative account from these credit reports and return them as a JSON array.

EQUIFAX REPORT TEXT:
${texts.equifax || '[not provided]'}

EXPERIAN REPORT TEXT:
${texts.experian || '[not provided]'}

TRANSUNION REPORT TEXT:
${texts.transunion || '[not provided]'}

Return ONLY a JSON array. Each item shape:
{ "creditor_name": string, "account_number": string, "balance": string, "date_opened": string, "account_type": string, "account_status": string, "bureaus": string[] }`;

    let accounts: Array<Record<string, unknown>> = [];
    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        system: CREDIT_ANALYSIS_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMsg }],
      });

      const textBlock = response.content.find((b) => b.type === 'text');
      const raw = textBlock && textBlock.type === 'text' ? textBlock.text : '';
      // DEBUG — remove after testing
      console.log('[analyze-reports] Claude raw response:', raw);
      // Strip markdown fences if present
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
      const startIdx = cleaned.indexOf('[');
      const endIdx = cleaned.lastIndexOf(']');
      const jsonStr = startIdx >= 0 && endIdx > startIdx ? cleaned.slice(startIdx, endIdx + 1) : cleaned;
      accounts = JSON.parse(jsonStr);
      if (!Array.isArray(accounts)) {
        throw new Error('Claude did not return an array');
      }
    } catch (err) {
      console.error('[analyze-reports] Claude error:', err);
      return res.status(500).json({ error: 'Failed to analyze reports' });
    }

    // Replace existing accounts
    await supabase.from('dispute_accounts').delete().eq('client_id', clientId);

    const rows = accounts.map((a) => ({
      client_id: clientId,
      creditor_name: String(a.creditor_name ?? ''),
      account_number: String(a.account_number ?? ''),
      balance: String(a.balance ?? ''),
      date_opened: String(a.date_opened ?? ''),
      account_type: String(a.account_type ?? ''),
      account_status: String(a.account_status ?? ''),
      bureaus: Array.isArray(a.bureaus) ? a.bureaus : [],
      selected: true,
      dispute_types: [],
      notes: '',
    }));

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

    await supabase
      .from('credit_repair_clients')
      .update({ status: 'analyzing' })
      .eq('id', clientId);

    return res.status(200).json({ accounts: inserted, count: inserted.length });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
