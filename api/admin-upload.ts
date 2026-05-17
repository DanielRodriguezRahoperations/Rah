import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function verifyAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

const ALLOWED_DOC_TYPES = new Set(['ftc-report', 'police-report', 'misc']);
const DOC_COLUMN: Record<string, string> = {
  'ftc-report': 'doc_ftc_report',
  'police-report': 'doc_police_report',
};
const SIGNED_URL_TTL = 7 * 24 * 60 * 60;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: 'Server configuration error' });
  if (!verifyAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const supabase = createClient(supabaseUrl, serviceKey);

  // GET — return a signed upload URL
  if (req.method === 'GET') {
    const { clientId, docType, ext } = req.query;
    if (
      typeof clientId !== 'string' || !clientId ||
      typeof docType !== 'string' || !ALLOWED_DOC_TYPES.has(docType) ||
      typeof ext !== 'string' || !ext
    ) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const safeName =
      docType === 'misc' ? `misc-${Date.now()}` :
      docType === 'ftc-report' ? `ftc-report-${Date.now()}` :
      docType;
    const path = `${clientId}/${safeName}.${ext.toLowerCase()}`;

    const { data, error } = await supabase.storage
      .from('intake-documents')
      .createSignedUploadUrl(path, { upsert: true });

    if (error || !data) return res.status(500).json({ error: error?.message ?? 'Failed to create upload URL' });
    return res.status(200).json({ signedUrl: data.signedUrl, path });
  }

  // PATCH — record the completed upload in the DB
  if (req.method === 'PATCH') {
    const { clientId, docType, path, filename } = req.body ?? {};
    if (!clientId || !docType || !path) return res.status(400).json({ error: 'Missing required fields' });

    if (docType === 'misc' || docType === 'ftc-report') {
      const arrayColumn = docType === 'ftc-report' ? 'doc_ftc_reports' : 'doc_misc_files';
      const { data: existing } = await supabase
        .from('credit_repair_clients')
        .select(arrayColumn)
        .eq('id', clientId)
        .maybeSingle();
      const arr = (((existing as Record<string, unknown> | null)?.[arrayColumn]) ?? []) as Array<Record<string, unknown>>;
      console.log(`[admin-upload] ${arrayColumn} before append (${arr.length} items):`, JSON.stringify(arr));
      arr.push({ path, filename: filename || (path as string).split('/').pop(), uploaded_at: new Date().toISOString() });
      console.log(`[admin-upload] ${arrayColumn} after append (${arr.length} items):`, JSON.stringify(arr));
      const { error } = await supabase
        .from('credit_repair_clients')
        .update({ [arrayColumn]: arr })
        .eq('id', clientId);
      if (error) return res.status(500).json({ error: error.message });
    } else {
      const column = DOC_COLUMN[docType as string];
      if (!column) return res.status(400).json({ error: 'Unknown docType' });
      const { error } = await supabase
        .from('credit_repair_clients')
        .update({ [column]: path })
        .eq('id', clientId);
      if (error) return res.status(500).json({ error: error.message });
    }

    const { data: signed } = await supabase.storage
      .from('intake-documents')
      .createSignedUrl(path as string, SIGNED_URL_TTL);

    return res.status(200).json({ ok: true, signedUrl: signed?.signedUrl ?? null });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
