import type { VercelRequest, VercelResponse } from '@vercel/node';

function verifyAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

function toE164(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!verifyAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const { name, phone } = req.body ?? {};
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromPhone) {
    return res.status(500).json({ error: 'Twilio is not configured — add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER to environment variables' });
  }

  const toPhone = toE164(phone as string);
  const firstName = (name as string).trim().split(/\s+/)[0];
  const body = `Hi ${firstName}, Daniel from RAH Operations here. Ready to start your credit repair journey? Fill out your intake form here: rahoperations.com/credit-repair/intake - Questions? Call (623) 640-8884`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  try {
    const twilioRes = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: toPhone, From: fromPhone, Body: body }).toString(),
    });

    const twilioJson = await twilioRes.json() as Record<string, unknown>;

    if (!twilioRes.ok) {
      console.error('[send-sms] Twilio error:', twilioJson);
      return res.status(502).json({ error: (twilioJson.message as string) ?? 'Failed to send SMS' });
    }

    console.log('[send-sms] Sent to', toPhone, 'SID:', twilioJson.sid);
    return res.status(200).json({ ok: true, sid: twilioJson.sid });
  } catch (err) {
    console.error('[send-sms] fetch error:', err);
    return res.status(500).json({ error: 'Network error contacting Twilio' });
  }
}
