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

  const { clientId, disputeSelections } = req.body ?? {};
  if (!clientId || disputeSelections === undefined) {
    return res.status(400).json({ error: 'Missing clientId or disputeSelections' });
  }

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { error } = await supabase
    .from('credit_repair_clients')
    .update({ dispute_selections: disputeSelections })
    .eq('id', clientId);

  if (error) {
    console.error('[update-dispute-selections] error:', error);
    return res.status(500).json({ error: 'Failed to update dispute selections' });
  }

  return res.status(200).json({ success: true });
}
