import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { clientId, status, dispute_round, round_notes, personal_info_errors, ftc_report_numbers, case_type, address_verified, letterId, response_received_at } = req.body ?? {};

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // Handle letter-level updates (response received, etc.)
  if (letterId && response_received_at !== undefined) {
    const { error: letterErr } = await supabase
      .from('dispute_letters')
      .update({ response_received_at })
      .eq('id', letterId);
    if (letterErr) {
      console.error('[update-status] letter update error:', letterErr);
      return res.status(500).json({ error: 'Failed to update letter' });
    }
    return res.status(200).json({ success: true });
  }

  if (!clientId) {
    return res.status(400).json({ error: 'Missing clientId' });
  }

  const update: Record<string, unknown> = {};
  if (typeof status === 'string') update.status = status;
  if (dispute_round !== undefined) update.dispute_round = Number(dispute_round);
  if (round_notes !== undefined) update.round_notes = round_notes;
  if (personal_info_errors !== undefined) update.personal_info_errors = personal_info_errors;
  if (ftc_report_numbers !== undefined) update.ftc_report_numbers = ftc_report_numbers;
  if (case_type !== undefined) update.case_type = case_type;
  if (address_verified !== undefined) update.address_verified = Boolean(address_verified);

  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  const { error } = await supabase
    .from('credit_repair_clients')
    .update(update)
    .eq('id', clientId);

  if (error) {
    console.error('[update-status] error:', error);
    return res.status(500).json({ error: 'Failed to update' });
  }

  return res.status(200).json({ success: true });
}
