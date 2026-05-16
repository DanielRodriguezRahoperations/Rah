import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body ?? {};
  if (typeof email !== 'string' || !email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey || !resendKey) {
    console.error('[portal-login] missing env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: client, error: cErr } = await supabase
    .from('credit_repair_clients')
    .select('id, full_name, email')
    .eq('email', email)
    .maybeSingle();

  if (cErr) {
    console.error('[portal-login] lookup error:', cErr);
    return res.status(500).json({ error: 'Lookup failed' });
  }
  if (!client) {
    return res.status(404).json({ error: 'No account found for this email address.' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  // Clear stale sessions for this email
  await supabase.from('portal_sessions').delete().eq('email', email);

  const { error: insErr } = await supabase.from('portal_sessions').insert({
    client_id: client.id,
    email,
    code,
    code_expires_at: expiresAt,
    session_token: null,
  });

  if (insErr) {
    console.error('[portal-login] insert error:', insErr);
    return res.status(500).json({ error: 'Failed to create login session' });
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:2px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:#0f0f0f;padding:28px 40px;text-align:center;">
          <p style="margin:0;color:#7a1c1c;font-size:20px;font-weight:bold;letter-spacing:1px;">RAH Operations</p>
          <p style="margin:8px 0 0;color:#888;font-size:10px;text-transform:uppercase;letter-spacing:4px;">Client Portal Login</p>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">Hi ${client.full_name?.split(' ')[0] ?? ''},</p>
          <p style="margin:0 0 24px;font-size:14px;color:#555;line-height:1.7;">Use the verification code below to sign in to your client portal. This code expires in 15 minutes.</p>
          <div style="background:#f9f9f7;border-left:3px solid #7a1c1c;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="margin:0;font-size:32px;font-weight:bold;letter-spacing:8px;color:#1a1a1a;font-family:monospace;">${code}</p>
          </div>
          <p style="margin:0;font-size:12px;color:#999;line-height:1.7;">If you did not request this code, you can ignore this email.</p>
        </td></tr>
        <tr><td style="background:#f9f9f7;padding:20px 40px;border-top:1px solid #eee;text-align:center;">
          <p style="margin:0;font-size:11px;color:#aaa;">RAH Operations &mdash; rahoperations.com</p>
        </td></tr>
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
        subject: `Your RAH Portal Login Code: ${code}`,
        html,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.json().catch(() => ({}));
      console.error('[portal-login] resend error — status:', emailRes.status, 'body:', errBody);
      return res.status(500).json({ error: 'Failed to send code' });
    }
  } catch (err) {
    console.error('[portal-login] resend fetch threw:', err);
    return res.status(500).json({ error: 'Failed to send code' });
  }

  return res.status(200).json({ message: 'Code sent' });
}
