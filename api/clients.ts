import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data, error } = await supabase
    .from('credit_repair_clients')
    .select('id, full_name, email, phone, status, created_at, address_verified, address_flag_notes')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[clients] query error:', error);
    return res.status(500).json({ error: 'Failed to fetch clients' });
  }

  return res.status(200).json({ clients: data ?? [] });
}
