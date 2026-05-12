import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const { leadId, status } = req.body ?? {};
  const validStatuses = ['new', 'contacted', 'converted', 'closed'];

  if (!leadId || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Valid leadId and status required' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from('audit_leads')
    .update({ status })
    .eq('id', leadId);

  if (error) {
    console.error('[audit-update-status] error:', error);
    return res.status(500).json({ error: 'Failed to update status' });
  }

  return res.status(200).json({ success: true });
}
