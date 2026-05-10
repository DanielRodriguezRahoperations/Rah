import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const clientId = req.query.clientId as string;
  if (!clientId) return res.status(400).json({ error: 'clientId required' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [clientRes, projectsRes, assetsRes, scheduleRes, invoicesRes] = await Promise.all([
    supabase.from('marketing_clients').select('*').eq('id', clientId).single(),
    supabase.from('marketing_projects').select('*').eq('client_id', clientId).order('created_at', { ascending: false }),
    supabase.from('generated_assets').select('*').eq('client_id', clientId).order('created_at', { ascending: false }),
    supabase.from('post_schedule').select('*').eq('client_id', clientId).order('scheduled_at', { ascending: true }),
    supabase.from('invoices').select('*').eq('client_id', clientId).order('created_at', { ascending: false }),
  ]);

  if (clientRes.error || !clientRes.data) {
    return res.status(404).json({ error: 'Client not found' });
  }

  return res.status(200).json({
    client: clientRes.data,
    projects: projectsRes.data ?? [],
    assets: assetsRes.data ?? [],
    schedule: scheduleRes.data ?? [],
    invoices: invoicesRes.data ?? [],
  });
}
