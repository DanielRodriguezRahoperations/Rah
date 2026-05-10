import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SIGNED_URL_TTL = 7 * 24 * 60 * 60;

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

const DOC_FIELDS = [
  'doc_dl_front',
  'doc_dl_back',
  'doc_ss_card',
  'doc_utility_bill',
  'doc_cr_equifax',
  'doc_cr_experian',
  'doc_cr_transunion',
  'doc_ftc_report',
  'doc_police_report',
] as const;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { clientId } = req.query;
  if (typeof clientId !== 'string' || !clientId) {
    return res.status(400).json({ error: 'Missing clientId' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // 1. Client record
  const { data: client, error: clientErr } = await supabase
    .from('credit_repair_clients')
    .select('*')
    .eq('id', clientId)
    .maybeSingle();

  if (clientErr || !client) {
    console.error('[client-detail] client error:', clientErr);
    return res.status(404).json({ error: 'Client not found' });
  }

  // 2. Letters with tracking
  const { data: letters } = await supabase
    .from('dispute_letters')
    .select('*, tracking_log(*)')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  // 3. Accounts
  const { data: accounts } = await supabase
    .from('dispute_accounts')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: true });

  // 4. Bureau responses
  const { data: responses } = await supabase
    .from('bureau_responses')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  // 5. Doc signed URLs
  const docUrls: Record<string, string | null> = {};
  await Promise.all(
    DOC_FIELDS.map(async (field) => {
      const path = (client as Record<string, unknown>)[field];
      if (typeof path === 'string' && path.length > 0) {
        const { data: signed } = await supabase.storage
          .from('intake-documents')
          .createSignedUrl(path, SIGNED_URL_TTL);
        docUrls[field] = signed?.signedUrl ?? null;
      } else {
        docUrls[field] = null;
      }
    })
  );

  return res.status(200).json({
    client,
    letters: letters ?? [],
    accounts: accounts ?? [],
    responses: responses ?? [],
    docUrls,
  });
}
