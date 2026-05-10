import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (req.method === 'GET') {
    const clientId = req.query.clientId as string;
    if (!clientId) return res.status(400).json({ error: 'clientId required' });

    const { data, error } = await supabase
      .from('post_schedule')
      .select('*, generated_assets(asset_type, content_text, file_url, platform)')
      .eq('client_id', clientId)
      .order('scheduled_at', { ascending: true });

    if (error) return res.status(500).json({ error: 'Failed to fetch schedule' });
    return res.status(200).json({ schedule: data ?? [] });
  }

  if (req.method === 'POST') {
    const { clientId, assetId, scheduledAt, platform } = req.body ?? {};
    if (!clientId || !scheduledAt || !platform) {
      return res.status(400).json({ error: 'clientId, scheduledAt, and platform are required' });
    }

    // If assetId provided, mark the asset as approved
    if (assetId) {
      await supabase
        .from('generated_assets')
        .update({ approved: true })
        .eq('id', assetId);
    }

    const { data, error } = await supabase
      .from('post_schedule')
      .insert({
        client_id: clientId,
        asset_id: assetId || null,
        scheduled_at: scheduledAt,
        platform,
        posted: false,
      })
      .select('*')
      .single();

    if (error) {
      console.error('[marketing-schedule] insert error:', error);
      return res.status(500).json({ error: 'Failed to create schedule entry' });
    }

    return res.status(200).json({ entry: data });
  }

  if (req.method === 'PATCH') {
    // Mark a post as posted
    const { scheduleId, postUrl } = req.body ?? {};
    if (!scheduleId) return res.status(400).json({ error: 'scheduleId required' });

    const { error } = await supabase
      .from('post_schedule')
      .update({ posted: true, post_url: postUrl || null })
      .eq('id', scheduleId);

    if (error) return res.status(500).json({ error: 'Failed to update post status' });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
