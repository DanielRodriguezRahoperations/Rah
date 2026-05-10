import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

async function validatePortalSession(
  supabase: ReturnType<typeof createClient>,
  authHeader: string | undefined
): Promise<string | null> {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  const nowIso = new Date().toISOString();
  const { data } = await supabase
    .from('marketing_portal_sessions')
    .select('client_id')
    .eq('session_token', token)
    .gt('session_expires_at', nowIso)
    .maybeSingle();
  return data?.client_id ?? null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const clientId = await validatePortalSession(supabase, req.headers.authorization);
  if (!clientId) return res.status(401).json({ error: 'Unauthorized' });

  const { assetId, approved, rejectionNotes } = req.body ?? {};
  if (!assetId || typeof approved !== 'boolean') {
    return res.status(400).json({ error: 'assetId and approved required' });
  }

  // Verify the asset belongs to this client
  const { data: asset } = await supabase
    .from('generated_assets')
    .select('client_id')
    .eq('id', assetId)
    .maybeSingle();

  if (!asset || asset.client_id !== clientId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const updateData = approved
    ? { approved: true, rejected: false }
    : { approved: false, rejected: true, rejection_notes: rejectionNotes || null };

  const { error } = await supabase
    .from('generated_assets')
    .update(updateData)
    .eq('id', assetId);

  if (error) {
    console.error('[marketing-portal-approve] error:', error);
    return res.status(500).json({ error: 'Failed to update asset' });
  }

  return res.status(200).json({ success: true });
}
