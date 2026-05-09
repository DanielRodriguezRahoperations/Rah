import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const VALID_STORAGE_NAMES = new Set([
  'dl-front', 'dl-back', 'ss-card', 'utility-bill',
  'cr-equifax', 'cr-experian', 'cr-transunion',
]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientId, storageName, ext } = req.query;

  if (
    typeof clientId !== 'string' || !clientId ||
    typeof storageName !== 'string' || !VALID_STORAGE_NAMES.has(storageName) ||
    typeof ext !== 'string' || !ext
  ) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('[upload] Missing Supabase env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const path = `${clientId}/${storageName}.${ext.toLowerCase()}`;

  const { data, error } = await supabase.storage
    .from('intake-documents')
    .createSignedUploadUrl(path, { upsert: true });

  if (error || !data) {
    console.error('[upload] createSignedUploadUrl error:', error);
    return res.status(500).json({ error: error?.message ?? 'Failed to create upload URL' });
  }

  return res.status(200).json({ signedUrl: data.signedUrl, path });
}
