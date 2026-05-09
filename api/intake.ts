import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SIGNED_URL_TTL = 7 * 24 * 60 * 60; // 7 days in seconds

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    clientId,
    fullName,
    dob,
    ssn,
    address,
    city,
    state,
    zip,
    phone,
    email,
    goals,
    timeline,
    disputedAccounts,
    agreedToCroa,
    signatureName,
    signatureDate,
    docPaths,
  } = req.body ?? {};

  if (!clientId || !fullName || !email || !agreedToCroa || !signatureName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Supabase env vars not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  if (!resendKey) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // 1. Insert client record — SSN is intentionally excluded
  const { error: dbError } = await supabase.from('credit_repair_clients').insert({
    id: clientId,
    full_name: fullName,
    date_of_birth: dob,
    address,
    city,
    state,
    zip,
    phone,
    email,
    goals,
    timeline,
    disputed_accounts: disputedAccounts || null,
    agreed_to_croa: agreedToCroa,
    signature_name: signatureName,
    signature_date: signatureDate,
    doc_dl_front: docPaths?.dlFront ?? null,
    doc_dl_back: docPaths?.dlBack ?? null,
    doc_ss_card: docPaths?.ssCard ?? null,
    doc_utility_bill: docPaths?.utilityBill ?? null,
    doc_cr_equifax: docPaths?.crEquifax ?? null,
    doc_cr_experian: docPaths?.crExperian ?? null,
    doc_cr_transunion: docPaths?.crTransunion ?? null,
  });

  if (dbError) {
    console.error('DB insert error:', dbError);
    return res.status(500).json({ error: 'Failed to save intake record' });
  }

  // 2. Generate signed URLs for uploaded documents (7-day expiry)
  const docEntries: { label: string; path: string | null }[] = [
    { label: "Driver's License (Front)", path: docPaths?.dlFront },
    { label: "Driver's License (Back)", path: docPaths?.dlBack },
    { label: 'Social Security Card', path: docPaths?.ssCard },
    { label: 'Utility Bill', path: docPaths?.utilityBill },
    { label: 'Equifax Credit Report', path: docPaths?.crEquifax },
    { label: 'Experian Credit Report', path: docPaths?.crExperian },
    { label: 'TransUnion Credit Report', path: docPaths?.crTransunion },
  ];

  const signedUrls = await Promise.all(
    docEntries
      .filter((d) => d.path)
      .map(async (doc) => {
        const { data } = await supabase.storage
          .from('intake-documents')
          .createSignedUrl(doc.path!, SIGNED_URL_TTL);
        return { label: doc.label, url: data?.signedUrl ?? null };
      })
  );

  const docLinksHtml = signedUrls
    .filter((d) => d.url)
    .map(
      (d) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:38%;">${d.label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          <a href="${d.url}" style="color:#7a1c1c;font-size:13px;font-weight:600;text-decoration:none;">View Document →</a>
        </td>
      </tr>`
    )
    .join('');

  // 3. Admin notification email (includes SSN — send to secure inbox only)
  const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:2px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <tr>
          <td style="background:#0f0f0f;padding:28px 40px;text-align:center;">
            <p style="margin:0;color:#7a1c1c;font-size:20px;font-weight:bold;letter-spacing:1px;">RAH Operations</p>
            <p style="margin:8px 0 0;color:#888;font-size:10px;text-transform:uppercase;letter-spacing:4px;">New Credit Repair Intake</p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px 0;">
            <p style="margin:0 0 6px;color:#999;font-size:10px;text-transform:uppercase;letter-spacing:3px;">Client</p>
            <p style="margin:0;font-size:22px;font-weight:bold;color:#1a1a1a;">${fullName}</p>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:30%;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;"><a href="mailto:${email}" style="color:#7a1c1c;text-decoration:none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${phone}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Date of Birth</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${dob}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">SSN</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;font-weight:600;">${ssn} &nbsp;<span style="color:#aaa;font-weight:400;font-size:11px;">(not stored in database)</span></td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Address</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${address}, ${city}, ${state} ${zip}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Timeline</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${timeline}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Signed By</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;font-style:italic;">${signatureName} &mdash; ${signatureDate}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0 0 10px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Credit Goals</p>
            <div style="background:#f9f9f7;border-left:3px solid #7a1c1c;padding:16px 20px;">
              <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;">${goals.replace(/\n/g, '<br>')}</p>
            </div>
          </td>
        </tr>

        ${disputedAccounts ? `
        <tr>
          <td style="padding:20px 40px 0;">
            <p style="margin:0 0 10px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Disputed Accounts</p>
            <div style="background:#f9f9f7;border-left:3px solid #7a1c1c;padding:16px 20px;">
              <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;">${disputedAccounts.replace(/\n/g, '<br>')}</p>
            </div>
          </td>
        </tr>` : ''}

        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0 0 10px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Uploaded Documents</p>
            <p style="margin:0 0 12px;font-size:11px;color:#aaa;">Links expire in 7 days. Download and store securely.</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${docLinksHtml}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 40px 0;">
            <div style="background:#fff8f8;border:1px solid #f5d0d0;padding:12px 16px;">
              <p style="margin:0;font-size:11px;color:#7a1c1c;font-weight:600;">⚠ Security Notice</p>
              <p style="margin:4px 0 0;font-size:11px;color:#999;line-height:1.6;">This email contains the client's SSN. Do not forward. Store securely and delete after noting the information. The SSN is not saved in the database.</p>
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#f9f9f7;padding:20px 40px;text-align:center;margin-top:32px;border-top:1px solid #eee;">
            <p style="margin:0;color:#aaa;font-size:11px;">RAH Operations Credit Repair Intake — rahoperations.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // 4. Client confirmation email
  const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:2px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <tr>
          <td style="background:#0f0f0f;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#7a1c1c;font-size:22px;font-weight:bold;letter-spacing:1px;">RAH Operations</p>
            <p style="margin:8px 0 0;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:4px;">Credit Repair</p>
          </td>
        </tr>

        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 6px;font-size:13px;color:#999;text-transform:uppercase;letter-spacing:2px;">Application Received</p>
            <h1 style="margin:0 0 20px;font-size:28px;font-weight:bold;color:#1a1a1a;line-height:1.2;">Your intake is confirmed, ${fullName.split(' ')[0]}.</h1>

            <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.8;">
              Thank you for submitting your credit repair intake form. Our team has received your
              documents and information and will begin reviewing your case immediately.
            </p>

            <div style="background:#f9f9f7;border-left:3px solid #7a1c1c;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 6px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:2px;">What happens next</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:8px 0;font-size:14px;color:#1a1a1a;border-bottom:1px solid #eee;">
                  <span style="color:#7a1c1c;font-weight:bold;margin-right:8px;">01</span> Our team reviews your submitted documents.
                </td></tr>
                <tr><td style="padding:8px 0;font-size:14px;color:#1a1a1a;border-bottom:1px solid #eee;">
                  <span style="color:#7a1c1c;font-weight:bold;margin-right:8px;">02</span> A credit specialist contacts you within <strong>1–2 business days</strong>.
                </td></tr>
                <tr><td style="padding:8px 0;font-size:14px;color:#1a1a1a;">
                  <span style="color:#7a1c1c;font-weight:bold;margin-right:8px;">03</span> We begin disputing inaccurate items on your behalf.
                </td></tr>
              </table>
            </div>

            <p style="margin:0 0 8px;font-size:13px;color:#555;line-height:1.8;">
              <strong>Your Right to Cancel:</strong> Under the Credit Repair Organizations Act, you
              may cancel this agreement within 3 business days of signing (${signatureDate}) by
              contacting us in writing at the address below.
            </p>

            <div style="margin-top:32px;text-align:center;">
              <a href="tel:+16236408884" style="display:inline-block;background:#7a1c1c;color:#fff;padding:14px 32px;font-size:12px;text-decoration:none;letter-spacing:1px;text-transform:uppercase;margin-right:12px;">
                Call Us
              </a>
              <a href="mailto:daniel@rahoperations.com" style="display:inline-block;background:#1a1a1a;color:#fff;padding:14px 32px;font-size:12px;text-decoration:none;letter-spacing:1px;text-transform:uppercase;">
                Email Us
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#f9f9f7;padding:24px 40px;border-top:1px solid #eee;">
            <p style="margin:0;font-size:12px;color:#aaa;text-align:center;line-height:1.8;">
              RAH Operations, LLC &mdash; 6301 E Pinnacle Vista Dr Unit 1004, Scottsdale, AZ 85266<br>
              (623) 640-8884 &mdash; daniel@rahoperations.com
            </p>
          </td>
        </tr>

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

  const [adminRes, clientRes] = await Promise.all([
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: emailHeaders,
      body: JSON.stringify({
        from: 'RAH Website <onboarding@resend.dev>',
        to: ['daniel@rahoperations.com'],
        reply_to: email,
        subject: `New Credit Repair Intake — ${fullName}`,
        html: adminHtml,
      }),
    }),
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: emailHeaders,
      body: JSON.stringify({
        from: 'RAH Operations <onboarding@resend.dev>',
        to: [email],
        reply_to: 'daniel@rahoperations.com',
        subject: 'Your Credit Repair Intake Has Been Received — RAH Operations',
        html: clientHtml,
      }),
    }),
  ]);

  if (!adminRes.ok || !clientRes.ok) {
    const adminErr = adminRes.ok ? null : await adminRes.json().catch(() => ({}));
    const clientErr = clientRes.ok ? null : await clientRes.json().catch(() => ({}));
    console.error('Resend errors:', { adminErr, clientErr });
    // Don't fail the request — the DB record is already saved
  }

  return res.status(200).json({ success: true });
}
