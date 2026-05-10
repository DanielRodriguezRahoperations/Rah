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
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const clientId = await validatePortalSession(supabase, req.headers.authorization);
  if (!clientId) return res.status(401).json({ error: 'Unauthorized' });

  const nowIso = new Date().toISOString();

  const [clientRes, projectsRes, assetsRes, scheduleRes, invoicesRes] = await Promise.all([
    supabase
      .from('marketing_clients')
      .select('id, name, email, business_name, business_type, services_requested, budget, goals, status, website_url')
      .eq('id', clientId)
      .single(),
    supabase
      .from('marketing_projects')
      .select('id, project_type, status, start_date, due_date')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false }),
    supabase
      .from('generated_assets')
      .select('id, asset_type, content_text, file_url, platform, approved, rejected, rejection_notes, created_at')
      .eq('client_id', clientId)
      .eq('approved', false)
      .eq('rejected', false)
      .order('created_at', { ascending: false }),
    supabase
      .from('post_schedule')
      .select('id, scheduled_at, platform, posted, post_url, asset_id')
      .eq('client_id', clientId)
      .eq('posted', false)
      .gt('scheduled_at', nowIso)
      .order('scheduled_at', { ascending: true })
      .limit(10),
    supabase
      .from('invoices')
      .select('id, amount, type, status, description, due_date, created_at')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false }),
  ]);

  if (clientRes.error || !clientRes.data) {
    return res.status(404).json({ error: 'Client not found' });
  }

  return res.status(200).json({
    client: clientRes.data,
    projects: projectsRes.data ?? [],
    pendingAssets: assetsRes.data ?? [],
    upcomingPosts: scheduleRes.data ?? [],
    invoices: invoicesRes.data ?? [],
  });
}
