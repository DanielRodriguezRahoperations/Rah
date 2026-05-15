import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { clientId, status, dispute_round, round_notes } = req.body ?? {};

  if (!clientId) {
    return res.status(400).json({ error: 'Missing clientId' });
  }

  const update: Record<string, unknown> = {};
  if (typeof status === 'string') update.status = status;
  if (dispute_round !== undefined) update.dispute_round = Number(dispute_round);
  if (round_notes !== undefined) update.round_notes = round_notes;

  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { error } = await supabase
    .from('credit_repair_clients')
    .update(update)
    .eq('id', clientId);

  if (error) {
    console.error('[update-status] error:', error);
    return res.status(500).json({ error: 'Failed to update' });
  }

  return res.status(200).json({ success: true });
}
