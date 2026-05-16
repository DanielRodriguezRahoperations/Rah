import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { clientId, message } = req.body ?? {};
  if (typeof clientId !== 'string' || !clientId || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'clientId and message are required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey || !resendKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: client, error: cErr } = await supabase
    .from('credit_repair_clients')
    .select('id, full_name, email, dispute_rounds')
    .eq('id', clientId)
    .maybeSingle();

  if (cErr || !client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const { full_name, email } = client as { id: string; full_name: string; email: string; dispute_rounds: unknown[] | null };
  const existingRounds: unknown[] = Array.isArray((client as { dispute_rounds: unknown[] }).dispute_rounds)
    ? (client as { dispute_rounds: unknown[] }).dispute_rounds
    : [];
  const roundNumber = existingRounds.length + 1;

  const newRound = {
    round: roundNumber,
    sent_at: new Date().toISOString(),
    message: message.trim(),
  };

  const updatedRounds = [...existingRounds, newRound];

  const { error: updErr } = await supabase
    .from('credit_repair_clients')
    .update({ dispute_rounds: updatedRounds })
    .eq('id', clientId);

  if (updErr) {
    console.error('[send-dispute-notice] update error:', updErr);
    return res.status(500).json({ error: 'Failed to record dispute round' });
  }

  const firstName = (full_name as string)?.split(' ')[0] ?? '';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#141414;overflow:hidden;">
  <tr>
    <td style="padding:40px 48px 32px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#7a1c1c;letter-spacing:2px;">RAH OPERATIONS</p>
      <p style="margin:0;font-size:10px;color:#555;text-transform:uppercase;letter-spacing:5px;">Credit Repair Division</p>
    </td>
  </tr>
  <tr>
    <td style="padding:40px 48px 32px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 8px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Case Update — Round ${roundNumber}</p>
      <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:28px;font-weight:bold;color:#f5f5f5;line-height:1.25;">Your Round ${roundNumber} Disputes Have Been Sent</h1>
      <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.85;font-family:Arial,sans-serif;">Hi ${firstName},</p>
      <p style="margin:0 0 20px;font-size:15px;color:#aaa;line-height:1.85;font-family:Arial,sans-serif;">${message.trim().replace(/\n/g, '<br>')}</p>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 48px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 16px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">What to Expect Next</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #222;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
            <span style="color:#7a1c1c;font-weight:bold;margin-right:10px;">→</span>
            Watch for <strong style="color:#f5f5f5;">certified mail</strong> from the credit bureaus over the next 30–45 days.
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #222;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
            <span style="color:#7a1c1c;font-weight:bold;margin-right:10px;">→</span>
            When responses arrive, <strong style="color:#f5f5f5;">upload them to your portal immediately</strong> — this keeps your case moving.
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
            <span style="color:#7a1c1c;font-weight:bold;margin-right:10px;">→</span>
            Log into your portal at <a href="https://www.rahoperations.com/portal" style="color:#7a1c1c;text-decoration:none;">rahoperations.com/portal</a> to track your case.
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 48px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 6px;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">Questions?</p>
      <p style="margin:0 0 4px;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
        <a href="mailto:daniel@rahoperations.com" style="color:#7a1c1c;text-decoration:none;">daniel@rahoperations.com</a>
        &nbsp;&middot;&nbsp;
        <a href="tel:+16236408884" style="color:#7a1c1c;text-decoration:none;">(623) 640-8884</a>
      </p>
    </td>
  </tr>
  <tr>
    <td style="background:#0a0a0a;padding:16px 48px;border-top:1px solid #1e1e1e;">
      <p style="margin:0;font-size:10px;color:#333;text-align:center;font-family:Arial,sans-serif;letter-spacing:1px;">
        © ${new Date().getFullYear()} RAH OPERATIONS, LLC — RAHOPERATIONS.COM
      </p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'RAH Operations <noreply@rahoperations.com>',
        to: [email],
        reply_to: 'daniel@rahoperations.com',
        subject: `Update on Your Credit Repair — Round ${roundNumber} Disputes Sent`,
        html,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.json().catch(() => ({}));
      console.error('[send-dispute-notice] resend error:', emailRes.status, errBody);
      return res.status(500).json({ error: 'Dispute round saved but email failed to send' });
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[send-dispute-notice] resend threw:', errMsg);
    return res.status(500).json({ error: 'Dispute round saved but email failed to send' });
  }

  console.log(`[send-dispute-notice] round ${roundNumber} sent to ${email} for client ${clientId}`);
  return res.status(200).json({ success: true, round: roundNumber });
}
