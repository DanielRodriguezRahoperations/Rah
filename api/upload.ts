import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { formidable } from 'formidable';
import { readFileSync, unlinkSync } from 'fs';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('[upload] Missing Supabase env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const form = formidable({
    uploadDir: '/tmp',
    keepExtensions: true,
    maxFileSize: 15 * 1024 * 1024,
  });

  let fields: Awaited<ReturnType<typeof form.parse>>[0];
  let files: Awaited<ReturnType<typeof form.parse>>[1];

  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    console.error('[upload] formidable parse error:', err);
    return res.status(400).json({ error: 'Failed to parse upload' });
  }

  const clientId = Array.isArray(fields.clientId) ? fields.clientId[0] : fields.clientId;
  const storageName = Array.isArray(fields.storageName) ? fields.storageName[0] : fields.storageName;
  const fileList = Array.isArray(files.file) ? files.file : files.file ? [files.file] : [];
  const file = fileList[0];

  if (!clientId || !storageName || !file) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const ext = file.originalFilename?.split('.').pop()?.toLowerCase() ?? 'bin';
  const storagePath = `${clientId}/${storageName}.${ext}`;
  const buffer = readFileSync(file.filepath);

  try {
    unlinkSync(file.filepath);
  } catch {
    // Temp file cleanup is best-effort
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { error } = await supabase.storage
    .from('intake-documents')
    .upload(storagePath, buffer, {
      contentType: file.mimetype ?? 'application/octet-stream',
      upsert: true,
    });

  if (error) {
    console.error(`[upload] Supabase error for ${storageName}:`, error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ path: storagePath });
}
