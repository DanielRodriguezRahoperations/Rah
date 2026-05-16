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

  const { clientId } = req.body ?? {};
  if (typeof clientId !== 'string' || !clientId) {
    return res.status(400).json({ error: 'clientId is required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey || !resendKey) {
    console.error('[send-welcome-email] missing env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: client, error: cErr } = await supabase
    .from('credit_repair_clients')
    .select('id, full_name, email, signature_date')
    .eq('id', clientId)
    .maybeSingle();

  if (cErr) {
    console.error('[send-welcome-email] lookup error:', cErr);
    return res.status(500).json({ error: 'Lookup failed' });
  }
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const { full_name, email, signature_date } = client as {
    id: string;
    full_name: string;
    email: string;
    signature_date: string | null;
  };

  const firstName = full_name?.split(' ')[0] ?? '';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#141414;overflow:hidden;">

  <!-- Header -->
  <tr>
    <td style="padding:40px 48px 32px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#7a1c1c;letter-spacing:2px;">RAH OPERATIONS</p>
      <p style="margin:0;font-size:10px;color:#555;text-transform:uppercase;letter-spacing:5px;">Credit Repair Division</p>
    </td>
  </tr>

  <!-- Hero -->
  <tr>
    <td style="padding:40px 48px 32px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 8px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Case Confirmed</p>
      <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:bold;color:#f5f5f5;line-height:1.25;">Welcome, ${firstName}.<br>Your case is now active.</h1>
      <p style="margin:0;font-size:15px;color:#aaa;line-height:1.85;font-family:Arial,sans-serif;">
        We have received your intake documents and your case has been opened at RAH Operations.
        Daniel will personally review your file and your dispute strategy will be built within
        the next <strong style="color:#f5f5f5;">1&ndash;2 business days</strong>.
      </p>
    </td>
  </tr>

  <!-- What we do -->
  <tr>
    <td style="padding:36px 48px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 20px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">How Credit Repair Works</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;width:32px;padding-top:2px;">
            <div style="width:24px;height:24px;background:#7a1c1c;color:#fff;font-size:11px;font-weight:bold;text-align:center;line-height:24px;font-family:Arial,sans-serif;">1</div>
          </td>
          <td style="padding:0 0 20px 14px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:#f5f5f5;font-family:Arial,sans-serif;">We analyze your credit reports</p>
            <p style="margin:0;font-size:13px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">We pull all three bureau reports (Equifax, Experian, TransUnion) and identify every negative item — collections, late payments, charge-offs, unauthorized inquiries, and inaccurate information.</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align:top;width:32px;padding-top:2px;">
            <div style="width:24px;height:24px;background:#7a1c1c;color:#fff;font-size:11px;font-weight:bold;text-align:center;line-height:24px;font-family:Arial,sans-serif;">2</div>
          </td>
          <td style="padding:0 0 20px 14px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:#f5f5f5;font-family:Arial,sans-serif;">We draft your dispute letters</p>
            <p style="margin:0;font-size:13px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">Using federal law (FCRA §605B, §611, §623, §609 and FDCPA §809), we draft certified, legally aggressive dispute letters tailored to each bureau and creditor.</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align:top;width:32px;padding-top:2px;">
            <div style="width:24px;height:24px;background:#7a1c1c;color:#fff;font-size:11px;font-weight:bold;text-align:center;line-height:24px;font-family:Arial,sans-serif;">3</div>
          </td>
          <td style="padding:0 0 20px 14px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:#f5f5f5;font-family:Arial,sans-serif;">You sign and mail</p>
            <p style="margin:0;font-size:13px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">You review each letter in your client portal, sign digitally, then mail via Certified Mail with Return Receipt. Bureaus and creditors have 30 days to respond by law.</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align:top;width:32px;padding-top:2px;">
            <div style="width:24px;height:24px;background:#7a1c1c;color:#fff;font-size:11px;font-weight:bold;text-align:center;line-height:24px;font-family:Arial,sans-serif;">4</div>
          </td>
          <td style="padding:0 0 0 14px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:#f5f5f5;font-family:Arial,sans-serif;">We track responses and escalate</p>
            <p style="margin:0;font-size:13px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">As responses come in, we monitor deadlines, escalate non-compliant bureaus and furnishers, and keep pushing. The full process typically takes <strong style="color:#f5f5f5;">3&ndash;6 months</strong>.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Portal CTA -->
  <tr>
    <td style="padding:36px 48px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 20px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Your Client Portal</p>
      <p style="margin:0 0 24px;font-size:14px;color:#aaa;line-height:1.8;font-family:Arial,sans-serif;">
        Track your case, review and sign dispute letters, upload bureau responses, and enter
        certified mail tracking numbers — all in one place. You will receive a separate email
        with a login code when your letters are ready to review and sign.
      </p>
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#7a1c1c;">
            <a href="https://www.rahoperations.com/portal" style="display:inline-block;padding:15px 36px;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;color:#fff;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
              Access Your Portal &rarr;
            </a>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:#555;font-family:Arial,sans-serif;">
        https://www.rahoperations.com/portal &mdash; log in with this email address: ${email}
      </p>
    </td>
  </tr>

  <!-- What to do now -->
  <tr>
    <td style="padding:36px 48px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 16px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">What You Need to Do Right Now</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #222;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
            <span style="color:#7a1c1c;font-weight:bold;margin-right:10px;">&rarr;</span>
            <strong style="color:#f5f5f5;">Nothing yet.</strong> We will contact you within 1&ndash;2 business days.
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #222;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
            <span style="color:#7a1c1c;font-weight:bold;margin-right:10px;">&rarr;</span>
            Watch for an email with your <strong style="color:#f5f5f5;">login code</strong> when letters are ready to sign.
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #222;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
            <span style="color:#7a1c1c;font-weight:bold;margin-right:10px;">&rarr;</span>
            When prompted, mail your packets via <strong style="color:#f5f5f5;">Certified Mail with Return Receipt</strong> — we will walk you through it.
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
            <span style="color:#7a1c1c;font-weight:bold;margin-right:10px;">&rarr;</span>
            Upload any <strong style="color:#f5f5f5;">response letters</strong> from bureaus or creditors to your portal immediately.
          </td>
        </tr>
      </table>
    </td>
  </tr>

  ${signature_date ? `
  <!-- CROA notice -->
  <tr>
    <td style="padding:24px 48px;border-bottom:1px solid #2a2a2a;background:#111;">
      <p style="margin:0;font-size:11px;color:#444;line-height:1.7;font-family:Arial,sans-serif;">
        <strong style="color:#555;">Your Right to Cancel:</strong> Under the Credit Repair Organizations Act (CROA),
        you may cancel this agreement without penalty within three (3) business days of signing (${signature_date})
        by notifying us in writing at 6301 E Pinnacle Vista Dr Unit 1004, Scottsdale, AZ 85266
        or by email at daniel@rahoperations.com.
      </p>
    </td>
  </tr>` : ''}

  <!-- Contact + footer -->
  <tr>
    <td style="padding:32px 48px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:24px;vertical-align:top;">
            <p style="margin:0 0 6px;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">Questions?</p>
            <p style="margin:0 0 4px;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
              <a href="mailto:daniel@rahoperations.com" style="color:#7a1c1c;text-decoration:none;">daniel@rahoperations.com</a>
            </p>
            <p style="margin:0;font-size:13px;color:#ccc;font-family:Arial,sans-serif;">
              <a href="tel:+16236408884" style="color:#7a1c1c;text-decoration:none;">(623) 640-8884</a>
            </p>
          </td>
          <td style="vertical-align:top;text-align:right;">
            <p style="margin:0;font-size:12px;color:#333;font-family:Arial,sans-serif;line-height:1.6;">
              RAH Operations, LLC<br>
              6301 E Pinnacle Vista Dr, Unit 1004<br>
              Scottsdale, AZ 85266
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Bottom bar -->
  <tr>
    <td style="background:#0a0a0a;padding:16px 48px;border-top:1px solid #1e1e1e;">
      <p style="margin:0;font-size:10px;color:#333;text-align:center;font-family:Arial,sans-serif;letter-spacing:1px;">
        &copy; ${new Date().getFullYear()} RAH OPERATIONS, LLC &mdash; RAHOPERATIONS.COM
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
        subject: "Welcome to RAH Operations — We're on it!",
        html,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.json().catch(() => ({}));
      console.error('[send-welcome-email] resend error — status:', emailRes.status, 'body:', errBody);
      return res.status(500).json({ error: 'Failed to send welcome email', detail: JSON.stringify(errBody) });
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[send-welcome-email] resend fetch threw:', errMsg);
    return res.status(500).json({ error: 'Failed to send welcome email', detail: errMsg });
  }

  console.log(`[send-welcome-email] sent welcome email to ${email} for client ${clientId}`);
  return res.status(200).json({ success: true });
}
