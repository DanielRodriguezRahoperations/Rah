import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

function parseRecipientAddress(name: string, addressText: string) {
  const lines = String(addressText).split('\n').filter(Boolean);
  const lastLine = lines[lines.length - 1] || '';
  const parts = lastLine.split(',').map((s) => s.trim());
  if (parts.length >= 3) {
    const address1 = parts.slice(0, parts.length - 2).join(', ');
    const city = parts[parts.length - 2];
    const stateZip = parts[parts.length - 1].trim().split(' ');
    const state = stateZip[0] || 'AZ';
    const zip = stateZip[1] || '00000';
    return { name, address_line1: address1, address_city: city, address_state: state, address_zip: zip };
  }
  return { name, address_line1: lastLine, address_city: 'Unknown', address_state: 'AZ', address_zip: '00000' };
}

const LOB_BASE = 'https://api.lob.com/v1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const LOB_API_KEY = process.env.LOB_ENV === 'live'
    ? process.env.LOB_API_KEY_LIVE!
    : process.env.LOB_API_KEY_TEST!;

  const { letterId, clientId } = req.body ?? {};
  if (!letterId || !clientId) return res.status(400).json({ error: 'Missing letterId or clientId' });

  const { data: letter } = await supabase
    .from('dispute_letters')
    .select('*')
    .eq('id', letterId)
    .single();

  const { data: client } = await supabase
    .from('credit_repair_clients')
    .select('full_name, address, city, state, zip, email')
    .eq('id', clientId)
    .single();

  if (!letter || !client) return res.status(404).json({ error: 'Letter or client not found' });

  const pdfPath = (letter as Record<string, unknown>).pdf_unsigned_path as string | null;
  if (!pdfPath) return res.status(400).json({ error: 'No PDF generated for this letter yet. Generate the PDF first.' });

  const { data: signedUrlData } = await supabase.storage
    .from('intake-documents')
    .createSignedUrl(pdfPath, 3600);

  if (!signedUrlData?.signedUrl) return res.status(500).json({ error: 'Could not get PDF URL' });

  const cl = client as Record<string, unknown>;
  const recipientName = (letter as Record<string, unknown>).recipient_name as string;
  const recipientAddress = (letter as Record<string, unknown>).recipient_address as string;
  const recipient = parseRecipientAddress(recipientName, recipientAddress);

  const lobBody = {
    description: `Dispute letter for ${cl.full_name}`,
    to: {
      name: recipient.name,
      address_line1: recipient.address_line1,
      address_city: recipient.address_city,
      address_state: recipient.address_state,
      address_zip: recipient.address_zip,
      address_country: 'US',
    },
    from: {
      name: cl.full_name as string,
      address_line1: (cl.address as string) || '6301 E Pinnacle Vista Dr Unit 1004',
      address_city: (cl.city as string) || 'Scottsdale',
      address_state: (cl.state as string) || 'AZ',
      address_zip: (cl.zip as string) || '85266',
      address_country: 'US',
    },
    file: signedUrlData.signedUrl,
    color: false,
    double_sided: false,
    address_placement: 'top_first_page',
    mail_type: 'usps_first_class',
    extra_service: 'certified',
    return_envelope: true,
    perforated_page: 1,
  };

  const lobResponse = await fetch(`${LOB_BASE}/letters`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(LOB_API_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lobBody),
  });

  const lobData = await lobResponse.json() as Record<string, unknown>;

  if (!lobResponse.ok) {
    console.error('[send-mail] Lob error:', lobData);
    return res.status(500).json({ error: 'Lob API error', details: lobData });
  }

  await supabase
    .from('dispute_letters')
    .update({
      lob_letter_id: lobData.id,
      lob_tracking_number: lobData.tracking_number,
      mailed_at: new Date().toISOString(),
      mail_status: 'mailed',
    })
    .eq('id', letterId);

  await supabase.from('tracking_log').insert({
    client_id: clientId,
    letter_id: letterId,
    tracking_number: lobData.tracking_number,
    carrier: 'USPS Certified Mail',
    mailed_at: new Date().toISOString(),
    status: 'mailed',
  });

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    (async () => {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'RAH Operations <noreply@rahoperations.com>',
            to: cl.email as string,
            subject: 'Your Dispute Letter Has Been Mailed',
            html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
              <h2 style="color:#1a1a1a;">Your Dispute Letter Has Been Mailed</h2>
              <p>Hi ${(cl.full_name as string).split(' ')[0]},</p>
              <p>We have successfully mailed your dispute correspondence via USPS Certified Mail.</p>
              <div style="background:#f5f5f5;padding:16px;border-radius:4px;margin:20px 0;">
                <p style="margin:0;"><strong>Mailed To:</strong> ${recipientName}</p>
                <p style="margin:8px 0 0;"><strong>Date Mailed:</strong> ${new Date().toLocaleDateString()}</p>
                <p style="margin:8px 0 0;"><strong>Tracking Number:</strong> ${lobData.tracking_number}</p>
              </div>
              <p>Track your letter at <a href="https://tools.usps.com/go/TrackConfirmAction">USPS.com</a> using the tracking number above.</p>
              <p style="color:#666;font-size:13px;margin-top:32px;">RAH Operations | rahoperations.com</p>
            </div>`,
          }),
        });
      } catch { /* non-critical */ }
    })();
  }

  return res.status(200).json({
    success: true,
    lobLetterId: lobData.id,
    trackingNumber: lobData.tracking_number,
  });
}
