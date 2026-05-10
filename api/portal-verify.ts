import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, code } = req.body ?? {};
  if (typeof email !== 'string' || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing email or code' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const nowIso = new Date().toISOString();
  const { data: session, error } = await supabase
    .from('portal_sessions')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .gt('code_expires_at', nowIso)
    .maybeSingle();

  if (error || !session) {
    return res.status(401).json({ error: 'Invalid or expired code.' });
  }

  const sessionToken = crypto.randomUUID();
  const sessionExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { error: updErr } = await supabase
    .from('portal_sessions')
    .update({ session_token: sessionToken, session_expires_at: sessionExpires })
    .eq('id', session.id);

  if (updErr) {
    console.error('[portal-verify] update error:', updErr);
    return res.status(500).json({ error: 'Failed to create session' });
  }

  return res.status(200).json({ token: sessionToken, clientId: session.client_id });
}
