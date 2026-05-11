import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    name,
    email,
    phone,
    businessName,
    industry,
    targetCustomer,
    siteFeeling,
    brandsTheyLove,
    brandsTheyHate,
    hasLogo,
    hasPhotos,
    hasCopy,
    primaryGoal,
    budget,
    timeline,
    additionalNotes,
  } = req.body ?? {};

  if (!name || !email || !businessName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey || !resendKey) {
    console.error('[website-intake] missing env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { error: insertErr } = await supabase.from('website_clients').insert({
    name,
    email,
    phone: phone || null,
    business_name: businessName,
    industry: industry || null,
    target_customer: targetCustomer || null,
    site_feeling: siteFeeling || null,
    brands_they_love: brandsTheyLove || null,
    brands_they_hate: brandsTheyHate || null,
    has_logo: hasLogo === true,
    has_photos: hasPhotos === true,
    has_copy: hasCopy === true,
    primary_goal: primaryGoal || null,
    budget: budget || null,
    timeline: timeline || null,
    additional_notes: additionalNotes || null,
    status: 'new',
  });

  if (insertErr) {
    console.error('[website-intake] insert error:', insertErr);
    return res.status(500).json({ error: 'Failed to save intake record' });
  }

  const firstName = name.split(' ')[0];

  // Welcome email to client
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
      <p style="margin:0;font-size:10px;color:#555;text-transform:uppercase;letter-spacing:5px;">Website Design Division</p>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 48px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 8px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Brief Received</p>
      <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:28px;font-weight:bold;color:#f5f5f5;line-height:1.25;">Your Website Project<br>Has Been Received.</h1>
      <p style="margin:0;font-size:15px;color:#aaa;line-height:1.85;font-family:Arial,sans-serif;">
        Hi ${firstName} — we've got your brief for <strong style="color:#f5f5f5;">${businessName}</strong>.
        Daniel will review everything and reach out within <strong style="color:#f5f5f5;">24 hours</strong>
        to schedule your strategy call.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 48px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 16px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">What Happens Next</p>
      ${[
        ['01', 'Daniel reviews your brief within 24 hours and schedules a strategy call with you.'],
        ['02', 'On the call we align on design direction, features, and timeline.'],
        ['03', 'Build begins. Your site goes live within 7 days of kickoff.'],
      ].map(([n, text]) => `
      <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px;">
        <div style="width:24px;height:24px;background:#7a1c1c;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Arial,sans-serif;font-size:10px;font-weight:bold;color:#fff;">${n}</div>
        <p style="margin:0;font-size:14px;color:#aaa;line-height:1.7;font-family:Arial,sans-serif;">${text}</p>
      </div>`).join('')}
    </td>
  </tr>
  <tr>
    <td style="padding:32px 48px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 16px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Your Budget</p>
      <p style="margin:0;font-size:14px;color:#ccc;font-family:Arial,sans-serif;">${budget || 'To be discussed on strategy call'}</p>
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

  // Admin notification email
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
    <p style="margin:6px 0 0;color:#888;font-size:10px;text-transform:uppercase;letter-spacing:4px;">New Website Client</p>
  </td></tr>
  <tr><td style="padding:28px 40px;">
    <p style="margin:0 0 20px;font-size:22px;font-weight:bold;color:#1a1a1a;">${businessName}</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:30%;">Owner</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${name}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;"><a href="mailto:${email}" style="color:#7a1c1c;text-decoration:none;">${email}</a></td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${phone || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Industry</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${industry || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Budget</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;font-weight:600;">${budget || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Timeline</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${timeline || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Site Feeling</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${siteFeeling || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Primary Goal</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${primaryGoal || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Logo</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${hasLogo ? 'Yes' : 'No / Needs one'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Photos</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${hasPhotos ? 'Yes' : 'No / Needs them'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Copy</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${hasCopy ? 'Yes' : 'No / Needs help'}</td></tr>
    </table>
    ${targetCustomer ? `<div style="margin:20px 0 0;background:#f9f9f7;border-left:3px solid #7a1c1c;padding:16px 20px;"><p style="margin:0 0 6px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:2px;">Target Customer</p><p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;">${targetCustomer.replace(/\n/g, '<br>')}</p></div>` : ''}
    ${brandsTheyLove ? `<div style="margin:16px 0 0;background:#f9f9f7;border-left:3px solid #7a1c1c;padding:16px 20px;"><p style="margin:0 0 6px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:2px;">Brands They Love</p><p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;">${brandsTheyLove.replace(/\n/g, '<br>')}</p></div>` : ''}
    ${brandsTheyHate ? `<div style="margin:16px 0 0;background:#f9f9f7;border-left:3px solid #c00;padding:16px 20px;"><p style="margin:0 0 6px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:2px;">Hard No's</p><p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;">${brandsTheyHate.replace(/\n/g, '<br>')}</p></div>` : ''}
    ${additionalNotes ? `<div style="margin:16px 0 0;background:#f9f9f7;border-left:3px solid #aaa;padding:16px 20px;"><p style="margin:0 0 6px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:2px;">Additional Notes</p><p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;">${additionalNotes.replace(/\n/g, '<br>')}</p></div>` : ''}
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
        subject: `Your Website Project — RAH Operations`,
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
        subject: `New Website Client — ${businessName} (${name})`,
        html: adminHtml,
      }),
    }),
  ]);

  return res.status(200).json({ success: true });
}
