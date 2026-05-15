import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { letterId, signedName, sessionToken } = req.body ?? {};
  if (!letterId || !signedName || !sessionToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate portal session using existing schema (session_token, session_expires_at)
  const { data: session } = await supabase
    .from('portal_sessions')
    .select('client_id, session_expires_at')
    .eq('session_token', sessionToken)
    .gt('session_expires_at', new Date().toISOString())
    .maybeSingle();

  if (!session) return res.status(401).json({ error: 'Invalid or expired session' });

  const clientId = (session as Record<string, unknown>).client_id as string;

  // Verify this letter belongs to this client
  const { data: letter } = await supabase
    .from('dispute_letters')
    .select('id, client_id, signed_at')
    .eq('id', letterId)
    .eq('client_id', clientId)
    .maybeSingle();

  if (!letter) return res.status(404).json({ error: 'Letter not found' });
  if ((letter as Record<string, unknown>).signed_at) {
    return res.status(400).json({ error: 'Letter already signed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ?? 'unknown';

  await supabase
    .from('dispute_letters')
    .update({
      signed_by: signedName,
      signed_at: new Date().toISOString(),
      signature_ip: ip,
    })
    .eq('id', letterId);

  return res.status(200).json({ success: true, signedAt: new Date().toISOString() });
}
