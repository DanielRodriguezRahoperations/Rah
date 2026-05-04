import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message } = req.body ?? {};

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Env var not set yet — tell the caller clearly
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:2px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0f0f0f;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#7a1c1c;font-size:22px;font-weight:bold;letter-spacing:1px;">RAH Operations</p>
            <p style="margin:8px 0 0;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:4px;">New Lead Inquiry</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #eee;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;width:28%;">Name</td>
                <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:15px;color:#1a1a1a;">${name}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #eee;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Email</td>
                <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:15px;"><a href="mailto:${email}" style="color:#7a1c1c;text-decoration:none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #eee;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Phone</td>
                <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:15px;color:#1a1a1a;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #eee;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Service</td>
                <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:15px;color:#1a1a1a;">${service || 'Not specified'}</td>
              </tr>
            </table>

            <div style="margin-top:28px;">
              <p style="margin:0 0 10px;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Message</p>
              <div style="background:#f9f9f7;border-left:3px solid #7a1c1c;padding:20px 24px;">
                <p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>

            <div style="margin-top:36px;padding-top:24px;border-top:1px solid #eee;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;background:#7a1c1c;color:#fff;padding:14px 32px;font-size:13px;text-decoration:none;letter-spacing:1px;text-transform:uppercase;">Reply to ${name}</a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f7;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0;color:#aaa;font-size:11px;">Submitted from rahoperations.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'RAH Website <onboarding@resend.dev>',
        to: ['daniel@rahoperations.com'],
        reply_to: email,
        subject: `New Inquiry — ${service || 'General'} from ${name}`,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Resend API error:', err);
      return res.status(500).json({ error: 'Email delivery failed' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
