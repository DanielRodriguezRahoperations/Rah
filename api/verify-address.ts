// SQL Migration — run once in Supabase SQL Editor:
// ALTER TABLE credit_repair_clients ADD COLUMN IF NOT EXISTS address_verification_result jsonb;

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

type SupportedMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

function getImageMediaType(path: string): SupportedMediaType | null {
  const ext = (path.split('.').pop() ?? '').toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'webp') return 'image/webp';
  return null;
}

export type AddressVerifyResult = {
  intake_address: string;
  id_address: string | null;
  utility_address: string | null;
  match_status: 'verified' | 'partial' | 'mismatch';
  match_notes: string;
  verified: boolean;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { clientId } = req.body ?? {};
  if (!clientId) {
    return res.status(400).json({ error: 'Missing clientId' });
  }

  const claudeKey = process.env.CLAUDE_API_KEY;
  if (!claudeKey) return res.status(500).json({ error: 'Claude API not configured' });

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data: client, error: clientErr } = await supabase
    .from('credit_repair_clients')
    .select('address, city, state, zip, doc_dl_front, doc_utility_bill')
    .eq('id', clientId)
    .maybeSingle();

  if (clientErr || !client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const c = client as Record<string, unknown>;
  const intakeAddress = [c.address, c.city, c.state, c.zip].filter(Boolean).join(', ');

  if (!c.doc_dl_front && !c.doc_utility_bill) {
    return res.status(400).json({
      error: 'No documents available. Upload a government ID and/or utility bill first.',
    });
  }

  const downloadAsBase64 = async (
    path: string,
  ): Promise<{ data: string; mediaType: SupportedMediaType } | null> => {
    const mediaType = getImageMediaType(path);
    if (!mediaType) {
      console.warn(`[verify-address] Unsupported file format for path: ${path}`);
      return null;
    }
    const { data, error } = await supabase.storage.from('intake-documents').download(path);
    if (error || !data) {
      console.error('[verify-address] download error:', error);
      return null;
    }
    const buf = Buffer.from(await data.arrayBuffer());
    return { data: buf.toString('base64'), mediaType };
  };

  const [govIdDoc, utilityDoc] = await Promise.all([
    c.doc_dl_front ? downloadAsBase64(String(c.doc_dl_front)) : Promise.resolve(null),
    c.doc_utility_bill ? downloadAsBase64(String(c.doc_utility_bill)) : Promise.resolve(null),
  ]);

  if (!govIdDoc && !utilityDoc) {
    return res.status(400).json({
      error: 'Documents could not be read — unsupported file format (PDF, HEIC). Upload JPEG or PNG files for automated verification.',
    });
  }

  type TextBlock = { type: 'text'; text: string };
  type ImageBlock = { type: 'image'; source: { type: 'base64'; media_type: SupportedMediaType; data: string } };
  type ContentBlock = TextBlock | ImageBlock;

  const contentBlocks: ContentBlock[] = [
    { type: 'text', text: `INTAKE FORM ADDRESS: "${intakeAddress}"` },
  ];

  if (govIdDoc) {
    contentBlocks.push({ type: 'text', text: 'GOVERNMENT ID (Driver\'s License front):' });
    contentBlocks.push({ type: 'image', source: { type: 'base64', media_type: govIdDoc.mediaType, data: govIdDoc.data } });
  } else if (c.doc_dl_front) {
    contentBlocks.push({ type: 'text', text: 'GOVERNMENT ID: not available (unsupported format)' });
  }

  if (utilityDoc) {
    contentBlocks.push({ type: 'text', text: 'UTILITY BILL / PROOF OF ADDRESS:' });
    contentBlocks.push({ type: 'image', source: { type: 'base64', media_type: utilityDoc.mediaType, data: utilityDoc.data } });
  } else if (c.doc_utility_bill) {
    contentBlocks.push({ type: 'text', text: 'UTILITY BILL: not available (unsupported format)' });
  }

  contentBlocks.push({
    type: 'text',
    text: 'Extract the address visible on each document. Compare each to the intake form address. Return ONLY the JSON object, no explanation.',
  });

  const anthropic = new Anthropic({ apiKey: claudeKey });

  let result: AddressVerifyResult;
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: `You are an address verification specialist for a credit repair firm. Examine the provided documents and extract the address shown on each one, then compare to the client's intake form address.

MATCH RULES:
- "verified": all components (street number, street name, city, state, zip) match, ignoring minor formatting differences (abbreviations, punctuation, capitalization)
- "partial": most components match but one field is missing, abbreviated differently, or slightly variant (e.g. apartment number absent on one doc, zip code truncated)
- "mismatch": the addresses clearly refer to different locations

If a document could not be read or was not provided, set that address field to null and do not penalize the match score for it — only compare what is available.

Return ONLY this JSON object, no markdown, no explanation:
{
  "intake_address": "the intake form address string",
  "id_address": "address from government ID, or null",
  "utility_address": "address from utility bill, or null",
  "match_status": "verified" | "partial" | "mismatch",
  "match_notes": "one sentence explaining the result — confirm match or describe discrepancy",
  "verified": true | false
}`,
      messages: [
        {
          role: 'user',
          content: contentBlocks as Anthropic.MessageParam['content'],
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock && textBlock.type === 'text' ? textBlock.text : '';
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    const startIdx = cleaned.indexOf('{');
    const endIdx = cleaned.lastIndexOf('}');
    const jsonStr = startIdx >= 0 && endIdx > startIdx ? cleaned.slice(startIdx, endIdx + 1) : cleaned;
    result = JSON.parse(jsonStr);
  } catch (err) {
    console.error('[verify-address] Claude error:', err);
    return res.status(500).json({ error: 'Failed to analyze documents' });
  }

  const updateData: Record<string, unknown> = {
    address_verification_result: result,
    address_verified: result.match_status === 'verified',
    address_flag_notes: result.match_status !== 'verified' ? result.match_notes : null,
  };

  const { error: updateErr } = await supabase
    .from('credit_repair_clients')
    .update(updateData)
    .eq('id', clientId);

  if (updateErr) {
    console.error('[verify-address] update error:', updateErr);
    return res.status(500).json({ error: 'Failed to save verification result' });
  }

  return res.status(200).json(result);
}
