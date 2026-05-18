import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!validateAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) {
      return res.status(500).json({ error: 'Server configuration error' });
    }
    const supabase = createClient(supabaseUrl, serviceKey);

    const { letterId, clientId, scope } = (req.body ?? {}) as {
      letterId?: string;
      clientId?: string;
      scope?: string;
    };

    // ─── Bulk delete: all unmailed letters for a client ───
    if (scope === 'all-unmailed') {
      if (!clientId || typeof clientId !== 'string') {
        return res.status(400).json({ error: 'clientId required for bulk delete' });
      }

      const { data: letters, error: fErr } = await supabase
        .from('dispute_letters')
        .select('id, pdf_unsigned_path, mailed_at, lob_tracking_number')
        .eq('client_id', clientId)
        .is('mailed_at', null)
        .is('lob_tracking_number', null);

      if (fErr) {
        return res.status(500).json({ error: `Fetch failed: ${fErr.message}` });
      }
      if (!letters || letters.length === 0) {
        return res.status(200).json({ deleted: 0, message: 'No unmailed letters to delete' });
      }

      const letterIds = letters.map((l) => l.id);
      const pdfPaths = letters
        .map((l) => l.pdf_unsigned_path)
        .filter((p): p is string => typeof p === 'string' && p.length > 0);

      // Clean up tracking_log first (defensive — works whether or not FK cascade is set)
      await supabase.from('tracking_log').delete().in('letter_id', letterIds);

      // Delete the letter rows
      const { error: dErr } = await supabase
        .from('dispute_letters')
        .delete()
        .in('id', letterIds);

      if (dErr) {
        return res.status(500).json({ error: `Delete failed: ${dErr.message}` });
      }

      // Best-effort PDF cleanup (don't fail the request if storage cleanup has issues)
      if (pdfPaths.length > 0) {
        const { error: sErr } = await supabase.storage
          .from('intake-documents')
          .remove(pdfPaths);
        if (sErr) {
          console.warn('[delete-letter] storage cleanup partial failure:', sErr);
        }
      }

      return res.status(200).json({ deleted: letterIds.length });
    }

    // ─── Single delete ───
    if (!letterId || typeof letterId !== 'string') {
      return res.status(400).json({ error: 'letterId required (or scope=all-unmailed with clientId)' });
    }

    const { data: letter, error: fErr } = await supabase
      .from('dispute_letters')
      .select('id, pdf_unsigned_path, mailed_at, lob_tracking_number')
      .eq('id', letterId)
      .maybeSingle();

    if (fErr) {
      return res.status(500).json({ error: `Lookup failed: ${fErr.message}` });
    }
    if (!letter) {
      return res.status(404).json({ error: 'Letter not found' });
    }
    if (letter.mailed_at || letter.lob_tracking_number) {
      return res.status(409).json({
        error: 'Cannot delete a mailed letter — it is a legal record of dispatch.',
      });
    }

    // Clean up tracking_log first
    await supabase.from('tracking_log').delete().eq('letter_id', letterId);

    // Delete the letter row
    const { error: dErr } = await supabase
      .from('dispute_letters')
      .delete()
      .eq('id', letterId);

    if (dErr) {
      return res.status(500).json({ error: `Delete failed: ${dErr.message}` });
    }

    // Best-effort PDF cleanup
    if (typeof letter.pdf_unsigned_path === 'string' && letter.pdf_unsigned_path.length > 0) {
      const { error: sErr } = await supabase.storage
        .from('intake-documents')
        .remove([letter.pdf_unsigned_path]);
      if (sErr) {
        console.warn('[delete-letter] storage cleanup failed:', sErr);
      }
    }

    return res.status(200).json({ deleted: 1, letterId });
  } catch (err) {
    console.error('[delete-letter] unhandled error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ error: message });
  }
}
