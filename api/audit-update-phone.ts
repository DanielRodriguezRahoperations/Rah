import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { leadId, phone } = req.body ?? {};
  if (!leadId || !phone) {
    return res.status(400).json({ error: 'leadId and phone are required' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from('audit_leads')
    .update({ phone })
    .eq('id', leadId);

  if (error) {
    console.error('[audit-update-phone] error:', error);
    return res.status(500).json({ error: 'Failed to update phone' });
  }

  return res.status(200).json({ success: true });
}
