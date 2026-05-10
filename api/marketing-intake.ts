import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    clientId,
    name,
    email,
    phone,
    businessName,
    businessType,
    websiteUrl,
    location,
    instagramHandle,
    facebookHandle,
    googleBusinessUrl,
    tiktokHandle,
    servicesRequested,
    budget,
    goals,
    timeline,
  } = req.body ?? {};

  if (!clientId || !name || !email || !businessName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey || !resendKey) {
    console.error('[marketing-intake] missing env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // 1. Insert client record
  const { error: clientErr } = await supabase.from('marketing_clients').insert({
    id: clientId,
    name,
    email,
    phone: phone || null,
    business_name: businessName,
    business_type: businessType || null,
    website_url: websiteUrl || null,
    location: location || null,
    instagram_handle: instagramHandle || null,
    facebook_handle: facebookHandle || null,
    google_business_url: googleBusinessUrl || null,
    tiktok_handle: tiktokHandle || null,
    services_requested: servicesRequested || [],
    budget: budget || null,
    goals: goals || null,
    timeline: timeline || null,
    status: 'lead',
  });

  if (clientErr) {
    console.error('[marketing-intake] client insert error:', clientErr);
    return res.status(500).json({ error: 'Failed to save intake record' });
  }

  // 2. Insert initial project record
  const services = servicesRequested as string[] | undefined;
  const projectType = services?.includes('Full Service') ? 'full-service'
    : services?.includes('Website Design') ? 'website'
    : services?.includes('SEO') ? 'seo'
    : services?.includes('Video/Reels') ? 'video'
    : 'social';

  await supabase.from('marketing_projects').insert({
    client_id: clientId,
    project_type: projectType,
    status: 'planning',
    notes: goals || null,
  });

  // 3. Welcome email to client
  const firstName = name.split(' ')[0];
  const servicesList = (services ?? []).join(', ') || 'To be determined';

  const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#141414;overflow:hidden;">
  <tr>
    <td style="padding:40px 48px 32px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#7a1c1c;letter-spacing:2px;">RAH OPERATIONS</p>
      <p style="margin:0;font-size:10px;color:#555;text-transform:uppercase;letter-spacing:5px;">Digital Marketing Division</p>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 48px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 8px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Intake Received</p>
      <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:28px;font-weight:bold;color:#f5f5f5;line-height:1.25;">Welcome, ${firstName}.<br>Let's grow ${businessName}.</h1>
      <p style="margin:0;font-size:15px;color:#aaa;line-height:1.85;font-family:Arial,sans-serif;">
        We've received your marketing intake for <strong style="color:#f5f5f5;">${businessName}</strong>.
        Daniel will review your goals and reach out within <strong style="color:#f5f5f5;">1–2 business days</strong>
        to map out your strategy.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 48px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 16px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Services Requested</p>
      <p style="margin:0;font-size:14px;color:#ccc;font-family:Arial,sans-serif;line-height:1.8;">${servicesList}</p>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 48px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 16px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Your Goals</p>
      <p style="margin:0;font-size:14px;color:#ccc;font-family:Arial,sans-serif;line-height:1.8;">${(goals || 'Not specified').replace(/\n/g, '<br>')}</p>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 48px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 16px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Your Client Portal</p>
      <p style="margin:0 0 20px;font-size:14px;color:#aaa;line-height:1.8;font-family:Arial,sans-serif;">Track your content, approve posts, and view invoices in your portal. You'll receive a login code once your account is fully set up.</p>
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#7a1c1c;">
            <a href="https://www.rahoperations.com/marketing/portal" style="display:inline-block;padding:14px 32px;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;color:#fff;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
              Access Portal &rarr;
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 48px;border-top:1px solid #222;">
      <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;">
        Questions? <a href="mailto:daniel@rahoperations.com" style="color:#7a1c1c;text-decoration:none;">daniel@rahoperations.com</a> &mdash;
        <a href="tel:+16236408884" style="color:#7a1c1c;text-decoration:none;">(623) 640-8884</a>
      </p>
    </td>
  </tr>
  <tr>
    <td style="background:#0a0a0a;padding:16px 48px;border-top:1px solid #1e1e1e;">
      <p style="margin:0;font-size:10px;color:#333;text-align:center;font-family:Arial,sans-serif;">&copy; ${new Date().getFullYear()} RAH OPERATIONS, LLC &mdash; RAHOPERATIONS.COM</p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  // 4. Admin notification email
  const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:2px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
  <tr><td style="background:#0f0f0f;padding:24px 40px;text-align:center;">
    <p style="margin:0;color:#7a1c1c;font-size:18px;font-weight:bold;letter-spacing:1px;">RAH Operations</p>
    <p style="margin:6px 0 0;color:#888;font-size:10px;text-transform:uppercase;letter-spacing:4px;">New Marketing Client</p>
  </td></tr>
  <tr><td style="padding:28px 40px;">
    <p style="margin:0 0 20px;font-size:22px;font-weight:bold;color:#1a1a1a;">${businessName}</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:30%;">Owner</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${name}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;"><a href="mailto:${email}" style="color:#7a1c1c;text-decoration:none;">${email}</a></td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${phone || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Type</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${businessType || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Location</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${location || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Budget</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;font-weight:600;">${budget || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Services</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${servicesList}</td></tr>
    </table>
    <div style="margin:20px 0 0;background:#f9f9f7;border-left:3px solid #7a1c1c;padding:16px 20px;">
      <p style="margin:0 0 6px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:2px;">Goals / Timeline</p>
      <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;">${(goals || '—').replace(/\n/g, '<br>')}</p>
      ${timeline ? `<p style="margin:12px 0 0;font-size:12px;color:#7a1c1c;font-weight:600;">Timeline: ${timeline}</p>` : ''}
    </div>
    <div style="margin:24px 0 0;">
      <a href="https://www.rahoperations.com/admin/dashboard" style="display:inline-block;background:#7a1c1c;color:#fff;text-decoration:none;padding:12px 28px;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">View in Dashboard &rarr;</a>
    </div>
  </td></tr>
  <tr><td style="background:#f9f9f7;padding:16px 40px;border-top:1px solid #eee;text-align:center;">
    <p style="margin:0;font-size:11px;color:#aaa;">RAH Operations &mdash; rahoperations.com</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  // 5. Send both emails concurrently
  const emailHeaders = {
    Authorization: `Bearer ${resendKey}`,
    'Content-Type': 'application/json',
  };

  await Promise.all([
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: emailHeaders,
      body: JSON.stringify({
        from: 'RAH Operations <onboarding@resend.dev>',
        to: [email],
        reply_to: 'daniel@rahoperations.com',
        subject: `Welcome to RAH Operations — ${businessName}`,
        html: clientHtml,
      }),
    }),
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: emailHeaders,
      body: JSON.stringify({
        from: 'RAH Website <onboarding@resend.dev>',
        to: ['daniel@rahoperations.com'],
        reply_to: email,
        subject: `New Marketing Client — ${businessName} (${name})`,
        html: adminHtml,
      }),
    }),
  ]);

  return res.status(200).json({ success: true });
}
