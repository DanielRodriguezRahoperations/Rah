import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function validateSession(supabase: any, token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('portal_sessions')
    .select('client_id, session_expires_at')
    .eq('session_token', token)
    .gt('session_expires_at', nowIso)
    .maybeSingle();
  if (error || !data) return null;
  return (data as { client_id: string }).client_id;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : undefined;
  const clientId = await validateSession(supabase, token);

  if (!clientId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Fetch client
  const { data: client } = await supabase
    .from('credit_repair_clients')
    .select('id, full_name, email, phone, address, city, state, zip, status, created_at, goals, timeline, doc_ftc_report, doc_police_report')
    .eq('id', clientId)
    .maybeSingle();

  if (!client) {
    return res.status(404).json({ error: 'Client record not found' });
  }

  // Convert doc paths to booleans for the portal view
  const clientOut = {
    ...(client as Record<string, unknown>),
    doc_ftc_report: !!((client as Record<string, unknown>).doc_ftc_report),
    doc_police_report: !!((client as Record<string, unknown>).doc_police_report),
  };

  // Letters with tracking
  const { data: letters } = await supabase
    .from('dispute_letters')
    .select('id, recipient_name, letter_type, created_at, signed_at, signed_by, lob_tracking_number, mailed_at, mail_status, tracking_log(*)')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  // Bureau responses with signed download URLs for uploaded files
  const { data: responses } = await supabase
    .from('bureau_responses')
    .select('id, bureau, response_type, summary, received_at, created_at, file_path')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  const responsesWithUrls = await Promise.all(
    (responses ?? []).map(async (r) => {
      const filePath = (r as Record<string, unknown>).file_path as string | null;
      if (!filePath) return { ...r, signedUrl: null };
      const { data: signed } = await supabase.storage
        .from('intake-documents')
        .createSignedUrl(filePath, 24 * 60 * 60);
      return { ...r, signedUrl: signed?.signedUrl ?? null };
    })
  );

  return res.status(200).json({
    client: clientOut,
    letters: letters ?? [],
    responses: responsesWithUrls,
  });
}
