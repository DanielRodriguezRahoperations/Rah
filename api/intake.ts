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

  const supabaseUrl = process.env.SUPABASE_URL;
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
    console.error('[intake] DB insert failed — message:', dbError.message);
    console.error('[intake] DB insert failed — code:', dbError.code);
    console.error('[intake] DB insert failed — details:', dbError.details);
    console.error('[intake] DB insert failed — hint:', dbError.hint);
    console.error('[intake] DB insert failed — full error:', JSON.stringify(dbError));
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

  // 4. Client welcome email
  const firstName = fullName.split(' ')[0];
  const clientHtml = `
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
            <p style="margin:0;font-size:13px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">Using federal law (FCRA §605B, §611, §623, §609 and FDCPA §809), we draft certified, legally aggressive dispute letters tailored to each bureau and creditor. Each letter is unique and written to demand specific action under consumer protection law.</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align:top;width:32px;padding-top:2px;">
            <div style="width:24px;height:24px;background:#7a1c1c;color:#fff;font-size:11px;font-weight:bold;text-align:center;line-height:24px;font-family:Arial,sans-serif;">3</div>
          </td>
          <td style="padding:0 0 20px 14px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:#f5f5f5;font-family:Arial,sans-serif;">You sign and mail</p>
            <p style="margin:0;font-size:13px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">You review each letter in your client portal, sign digitally, and then mail via Certified Mail with Return Receipt. We give you step-by-step mailing instructions — no guesswork. Bureaus and creditors have 30 days to respond by law.</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align:top;width:32px;padding-top:2px;">
            <div style="width:24px;height:24px;background:#7a1c1c;color:#fff;font-size:11px;font-weight:bold;text-align:center;line-height:24px;font-family:Arial,sans-serif;">4</div>
          </td>
          <td style="padding:0 0 0 14px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:#f5f5f5;font-family:Arial,sans-serif;">We track responses and escalate</p>
            <p style="margin:0;font-size:13px;color:#888;line-height:1.7;font-family:Arial,sans-serif;">As responses come in, we monitor deadlines, escalate non-compliant bureaus and furnishers, and keep pushing until negative items are removed or corrected. The full process typically takes <strong style="color:#f5f5f5;">3&ndash;6 months</strong> depending on your file.</p>
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

  <!-- What you need to do -->
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
            Upload any <strong style="color:#f5f5f5;">response letters</strong> you receive from bureaus or creditors to your portal immediately.
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CROA notice -->
  <tr>
    <td style="padding:24px 48px;border-bottom:1px solid #2a2a2a;background:#111;">
      <p style="margin:0;font-size:11px;color:#444;line-height:1.7;font-family:Arial,sans-serif;">
        <strong style="color:#555;">Your Right to Cancel:</strong> Under the Credit Repair Organizations Act (CROA),
        you may cancel this agreement without penalty within three (3) business days of signing (${signatureDate})
        by notifying us in writing at 6301 E Pinnacle Vista Dr Unit 1004, Scottsdale, AZ 85266
        or by email at daniel@rahoperations.com.
      </p>
    </td>
  </tr>

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
