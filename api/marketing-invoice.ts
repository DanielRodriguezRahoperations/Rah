import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (req.method === 'GET') {
    const clientId = req.query.clientId as string;
    if (!clientId) return res.status(400).json({ error: 'clientId required' });

    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: 'Failed to fetch invoices' });
    return res.status(200).json({ invoices: data ?? [] });
  }

  if (req.method === 'POST') {
    const { clientId, amount, type, description, dueDate } = req.body ?? {};
    if (!clientId || !amount || !type) {
      return res.status(400).json({ error: 'clientId, amount, and type are required' });
    }

    // ⚠️ SETUP REQUIRED: STRIPE_SECRET_KEY needed in Vercel env vars for payment links
    // When Stripe is configured, create a payment link here and store stripe_payment_id

    const { data, error } = await supabase
      .from('invoices')
      .insert({
        client_id: clientId,
        amount: parseFloat(String(amount)),
        type,
        description: description || null,
        due_date: dueDate || null,
        status: 'draft',
      })
      .select('*')
      .single();

    if (error) {
      console.error('[marketing-invoice] insert error:', error);
      return res.status(500).json({ error: 'Failed to create invoice' });
    }

    return res.status(200).json({ invoice: data });
  }

  if (req.method === 'PATCH') {
    const { invoiceId, status } = req.body ?? {};
    const validStatuses = ['draft', 'sent', 'paid'];
    if (!invoiceId || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'invoiceId and valid status required' });
    }

    const { error } = await supabase
      .from('invoices')
      .update({ status })
      .eq('id', invoiceId);

    if (error) return res.status(500).json({ error: 'Failed to update invoice' });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
