import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const { assetId, approved, rejectionNotes } = req.body ?? {};
  if (!assetId || typeof approved !== 'boolean') {
    return res.status(400).json({ error: 'assetId and approved (boolean) required' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const updateData = approved
    ? { approved: true, rejected: false, rejection_notes: null }
    : { approved: false, rejected: true, rejection_notes: rejectionNotes || null };

  const { error } = await supabase
    .from('generated_assets')
    .update(updateData)
    .eq('id', assetId);

  if (error) {
    console.error('[marketing-approve] error:', error);
    return res.status(500).json({ error: 'Failed to update asset' });
  }

  return res.status(200).json({ success: true });
}
