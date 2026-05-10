import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

async function validateSession(
  supabase: ReturnType<typeof createClient>,
  token: string | undefined,
): Promise<string | null> {
  if (!token) return null;
  const { data } = await supabase
    .from('portal_sessions')
    .select('client_id, session_expires_at')
    .eq('session_token', token)
    .gt('session_expires_at', new Date().toISOString())
    .maybeSingle();
  if (!data) return null;
  return (data as { client_id: string }).client_id;
}

const ALLOWED_DOC_TYPES = new Set(['ftc-report', 'police-report', 'misc']);
const DOC_COLUMN: Record<string, string> = {
  'ftc-report': 'doc_ftc_report',
  'police-report': 'doc_police_report',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: 'Server configuration error' });

  const supabase = createClient(supabaseUrl, serviceKey);
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : undefined;
  const clientId = await validateSession(supabase, token);
  if (!clientId) return res.status(401).json({ error: 'Unauthorized' });

  // GET — return a signed upload URL
  if (req.method === 'GET') {
    const { kind, docType, ext } = req.query;

    if (kind === 'response') {
      if (typeof ext !== 'string' || !ext) return res.status(400).json({ error: 'Missing ext' });
      const path = `${clientId}/response-${Date.now()}.${ext.toLowerCase()}`;
      const { data, error } = await supabase.storage
        .from('intake-documents')
        .createSignedUploadUrl(path, { upsert: true });
      if (error || !data) return res.status(500).json({ error: error?.message ?? 'Failed' });
      return res.status(200).json({ signedUrl: data.signedUrl, path });
    }

    // kind = 'doc' (missing document)
    if (typeof docType !== 'string' || !ALLOWED_DOC_TYPES.has(docType) || typeof ext !== 'string' || !ext) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    const safeName = docType === 'misc' ? `misc-${Date.now()}` : docType;
    const path = `${clientId}/${safeName}.${ext.toLowerCase()}`;
    const { data, error } = await supabase.storage
      .from('intake-documents')
      .createSignedUploadUrl(path, { upsert: true });
    if (error || !data) return res.status(500).json({ error: error?.message ?? 'Failed' });
    return res.status(200).json({ signedUrl: data.signedUrl, path });
  }

  // POST — record the upload in the DB
  if (req.method === 'POST') {
    const { kind, docType, path, filename, bureau, receivedAt } = req.body ?? {};

    if (kind === 'response') {
      const { error } = await supabase.from('bureau_responses').insert({
        client_id: clientId,
        bureau: bureau || 'Unknown',
        response_type: 'letter_response',
        summary: null,
        received_at: receivedAt || null,
        file_path: path,
      });
      if (error) return res.status(500).json({ error: error.message });

      // Notify admin — fire and forget
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        (async () => {
          try {
            const { data: cl } = await supabase
              .from('credit_repair_clients')
              .select('full_name, email')
              .eq('id', clientId)
              .maybeSingle();
            const { data: signed } = await supabase.storage
              .from('intake-documents')
              .createSignedUrl(path as string, 3600);
            const fileLink = signed?.signedUrl ?? '#';
            const clientName = (cl as Record<string, unknown> | null)?.full_name ?? clientId;
            const resend = new Resend(resendKey);
            await resend.emails.send({
              from: 'noreply@rahoperations.com',
              to: 'daniel@rahoperations.com',
              subject: `[RAH] Bureau Response Uploaded — ${clientName}`,
              html: `<div style="font-family:sans-serif;max-width:600px;padding:20px">
                <h2 style="color:#7a1c1c;margin-bottom:16px">Bureau Response Received</h2>
                <p style="color:#333;margin-bottom:16px">A client uploaded a response from a bureau or furnisher.</p>
                <table style="width:100%;font-size:14px">
                  <tr><td style="padding:6px 0;color:#666;width:130px">Client</td><td style="padding:6px 0">${clientName}</td></tr>
                  <tr><td style="padding:6px 0;color:#666">From</td><td style="padding:6px 0">${bureau || 'Not specified'}</td></tr>
                  <tr><td style="padding:6px 0;color:#666">Date Received</td><td style="padding:6px 0">${receivedAt || 'Not specified'}</td></tr>
                  <tr><td style="padding:6px 0;color:#666">Document</td><td style="padding:6px 0"><a href="${fileLink}" style="color:#7a1c1c">View file ↗ (1 hr)</a></td></tr>
                </table>
                <p style="margin-top:24px">
                  <a href="https://www.rahoperations.com/admin/clients/${clientId}"
                     style="background:#7a1c1c;color:white;padding:10px 20px;text-decoration:none;display:inline-block;border-radius:2px">
                    Open Client Record →
                  </a>
                </p>
              </div>`,
            });
          } catch { /* non-critical */ }
        })();
      }
      return res.status(200).json({ ok: true });
    }

    // kind = 'doc'
    const column = DOC_COLUMN[docType as string];
    if (column) {
      const { error } = await supabase
        .from('credit_repair_clients')
        .update({ [column]: path })
        .eq('id', clientId);
      if (error) return res.status(500).json({ error: error.message });
    } else if (docType === 'misc') {
      const { data: existing } = await supabase
        .from('credit_repair_clients')
        .select('doc_misc_files')
        .eq('id', clientId)
        .maybeSingle();
      const arr = (((existing as Record<string, unknown> | null)?.doc_misc_files) ?? []) as Array<Record<string, unknown>>;
      arr.push({ path, filename: filename || (path as string).split('/').pop(), uploaded_at: new Date().toISOString() });
      const { error } = await supabase
        .from('credit_repair_clients')
        .update({ doc_misc_files: arr })
        .eq('id', clientId);
      if (error) return res.status(500).json({ error: error.message });
    } else {
      return res.status(400).json({ error: 'Unknown docType' });
    }

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
