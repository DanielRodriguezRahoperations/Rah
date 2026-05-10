import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body ?? {};
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('[admin-auth] ADMIN_PASSWORD not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (typeof password !== 'string' || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = Buffer.from(adminPassword).toString('base64');
  return res.status(200).json({ token });
}
