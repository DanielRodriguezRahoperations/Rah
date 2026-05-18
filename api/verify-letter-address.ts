import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
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

    const { letterId } = (req.body ?? {}) as { letterId?: string };

    if (!letterId || typeof letterId !== 'string') {
      return res.status(400).json({ error: 'letterId required' });
    }

    // Confirm the letter exists before updating
    const { data: letter, error: fErr } = await supabase
      .from('dispute_letters')
      .select('id, needs_address')
      .eq('id', letterId)
      .maybeSingle();

    if (fErr) {
      return res.status(500).json({ error: `Lookup failed: ${fErr.message}` });
    }
    if (!letter) {
      return res.status(404).json({ error: 'Letter not found' });
    }

    // Idempotent: setting needs_address = false on an already-verified letter is a no-op success.
    // No restriction on mailed letters — verifying them post-mail is meaningless but harmless.
    const { error: uErr } = await supabase
      .from('dispute_letters')
      .update({ needs_address: false })
      .eq('id', letterId);

    if (uErr) {
      return res.status(500).json({ error: `Update failed: ${uErr.message}` });
    }

    return res.status(200).json({ ok: true, letterId, needs_address: false });
  } catch (err) {
    console.error('[verify-letter-address] unhandled error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ error: message });
  }
}
