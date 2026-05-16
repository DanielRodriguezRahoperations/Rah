import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

const NEGATIVE_KEYWORDS = [
  'collection', 'collections', 'late', 'charge-off', 'charged off',
  'derogatory', 'delinquent', 'negative',
];

function isNegative(status: string): boolean {
  const s = status.toLowerCase();
  return NEGATIVE_KEYWORDS.some((kw) => s.includes(kw));
}

function maskAccountNumber(num: string): string {
  if (!num || num.length <= 4) return num || '—';
  return `****${num.slice(-4)}`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 0;color:#888;font-size:12px;width:38%;font-family:Arial,sans-serif;">${label}</td>
    <td style="padding:6px 0;color:#ccc;font-size:13px;font-family:Arial,sans-serif;">${value || '—'}</td>
  </tr>`;
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
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: client, error: cErr } = await supabase
    .from('credit_repair_clients')
    .select('id, full_name, email')
    .eq('id', clientId)
    .maybeSingle();

  if (cErr || !client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const { full_name, email } = client as { id: string; full_name: string; email: string };
  const firstName = full_name?.split(' ')[0] ?? '';

  const { data: accountRows } = await supabase
    .from('dispute_accounts')
    .select('id, creditor_name, account_number, balance, account_type, account_status, bureaus, dispute_types')
    .eq('client_id', clientId)
    .order('created_at', { ascending: true });

  type Account = {
    id: string;
    creditor_name: string;
    account_number: string;
    balance: string;
    account_type: string;
    account_status: string;
    bureaus: string[];
    dispute_types: string[];
  };

  const accounts: Account[] = (accountRows ?? []) as Account[];

  const positive = accounts.filter((a) => !isNegative(a.account_status));
  const disputed = accounts.filter((a) => a.dispute_types && a.dispute_types.length > 0);
  const underReview = accounts.filter(
    (a) => isNegative(a.account_status) && (!a.dispute_types || a.dispute_types.length === 0),
  );

  const sectionHeader = (emoji: string, title: string, count: number) => `
    <tr><td colspan="2" style="padding:28px 0 12px;">
      <p style="margin:0 0 4px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">${emoji} ${count} item${count !== 1 ? 's' : ''}</p>
      <p style="margin:0;font-size:18px;font-weight:bold;color:#f5f5f5;font-family:Georgia,serif;">${title}</p>
      <hr style="border:none;border-top:1px solid #2a2a2a;margin:12px 0 0;">
    </td></tr>`;

  const positiveRows = positive.length === 0
    ? `<tr><td colspan="2" style="padding:12px 0;color:#555;font-size:13px;font-family:Arial,sans-serif;">No positive accounts found in this report.</td></tr>`
    : positive.map((a) => `
      <tr>
        <td colspan="2" style="padding:12px 0;border-bottom:1px solid #1e1e1e;">
          <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:#e0e0e0;font-family:Arial,sans-serif;">${a.creditor_name}</p>
          <p style="margin:0;font-size:12px;color:#888;font-family:Arial,sans-serif;">${a.account_type || '—'} &middot; <span style="color:#4ade80;">${a.account_status}</span></p>
        </td>
      </tr>`).join('');

  const disputedRows = disputed.length === 0
    ? `<tr><td colspan="2" style="padding:12px 0;color:#555;font-size:13px;font-family:Arial,sans-serif;">No items are currently assigned a dispute type.</td></tr>`
    : disputed.map((a) => {
        const dtype = a.dispute_types[0];
        const badge = dtype === 'identity_theft' ? 'Identity Theft' : 'Standard Dispute';
        const badgeColor = dtype === 'identity_theft' ? '#ef4444' : '#f59e0b';
        return `
      <tr>
        <td colspan="2" style="padding:12px 0;border-bottom:1px solid #1e1e1e;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 2px;font-size:14px;font-weight:bold;color:#e0e0e0;font-family:Arial,sans-serif;">${a.creditor_name}</p>
                <p style="margin:0;font-size:12px;color:#888;font-family:Arial,sans-serif;">Acct: ${maskAccountNumber(a.account_number)} &middot; Balance: ${a.balance || '—'}</p>
              </td>
              <td style="text-align:right;vertical-align:top;">
                <span style="display:inline-block;background:${badgeColor}22;color:${badgeColor};border:1px solid ${badgeColor}44;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;padding:2px 8px;font-family:Arial,sans-serif;">${badge}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
      }).join('');

  const underReviewRows = underReview.length === 0
    ? `<tr><td colspan="2" style="padding:12px 0;color:#555;font-size:13px;font-family:Arial,sans-serif;">No items currently under review.</td></tr>`
    : underReview.map((a) => `
      <tr>
        <td colspan="2" style="padding:12px 0;border-bottom:1px solid #1e1e1e;">
          <p style="margin:0 0 2px;font-size:14px;font-weight:bold;color:#e0e0e0;font-family:Arial,sans-serif;">${a.creditor_name}</p>
          <p style="margin:0;font-size:12px;color:#888;font-family:Arial,sans-serif;">${a.account_status}</p>
        </td>
      </tr>`).join('');

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#141414;overflow:hidden;">

  <tr>
    <td style="padding:40px 48px 32px;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 4px;font-size:22px;font-weight:bold;color:#7a1c1c;letter-spacing:2px;font-family:Georgia,serif;">RAH OPERATIONS</p>
      <p style="margin:0;font-size:10px;color:#555;text-transform:uppercase;letter-spacing:5px;font-family:Arial,sans-serif;">Credit Repair Division</p>
    </td>
  </tr>

  <tr>
    <td style="padding:36px 48px 24px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;">
      <p style="margin:0 0 8px;font-size:11px;color:#7a1c1c;text-transform:uppercase;letter-spacing:3px;font-family:Arial,sans-serif;">Credit Report Summary</p>
      <h1 style="margin:0 0 20px;font-size:28px;font-weight:bold;color:#f5f5f5;line-height:1.3;font-family:Georgia,serif;">Your Credit Report Summary</h1>
      <p style="margin:0;font-size:15px;color:#aaa;line-height:1.85;font-family:Arial,sans-serif;">
        Hi ${firstName}, here is a current snapshot of your credit file as we have it on record.
        Below you'll find your positive accounts, the items we're actively disputing on your behalf,
        and any items still under evaluation.
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:8px 48px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${sectionHeader('✅', 'Positive Accounts on Your Report', positive.length)}
        ${positiveRows}
        ${sectionHeader('🛡️', "Items We're Disputing on Your Behalf", disputed.length)}
        ${disputedRows}
        ${sectionHeader('🔍', 'Items Under Review', underReview.length)}
        ${underReviewRows}
        <tr><td colspan="2" style="padding:28px 0 8px;">
          <hr style="border:none;border-top:1px solid #2a2a2a;margin:0 0 24px;">
          <p style="margin:0;font-size:14px;color:#aaa;line-height:1.85;font-family:Arial,sans-serif;">
            You can log into your client portal at
            <a href="https://www.rahoperations.com/portal" style="color:#7a1c1c;text-decoration:none;">rahoperations.com/portal</a>
            to track your case progress in real time. If you have any questions, reply to this email or call us.
          </p>
        </td></tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:24px 48px;border-top:1px solid #2a2a2a;">
      <p style="margin:0 0 4px;font-size:12px;color:#ccc;font-family:Arial,sans-serif;">
        <a href="mailto:daniel@rahoperations.com" style="color:#7a1c1c;text-decoration:none;">daniel@rahoperations.com</a>
        &nbsp;&middot;&nbsp;
        <a href="tel:+16236408884" style="color:#7a1c1c;text-decoration:none;">(623) 640-8884</a>
      </p>
    </td>
  </tr>

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
        subject: 'Your Credit Report Summary — RAH Operations',
        html,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.json().catch(() => ({}));
      console.error('[send-report-summary] resend error:', emailRes.status, errBody);
      return res.status(500).json({ error: 'Failed to send summary email', detail: JSON.stringify(errBody) });
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[send-report-summary] resend threw:', errMsg);
    return res.status(500).json({ error: 'Failed to send summary email', detail: errMsg });
  }

  console.log(`[send-report-summary] sent to ${email} — positive:${positive.length} disputed:${disputed.length} underReview:${underReview.length}`);
  return res.status(200).json({
    success: true,
    counts: { positive: positive.length, disputed: disputed.length, underReview: underReview.length },
  });
}
