import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('audit_leads')
    .select('id, domain, name, email, phone, audit_score, audit_results, status, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[audit-leads] fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch audit leads' });
  }

  return res.status(200).json({ leads: data ?? [] });
}
