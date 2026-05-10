import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import {
  getTemplate,
  LETTER_GENERATION_SYSTEM_PROMPT,
} from '../src/lib/letterTemplates';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!validateAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { clientId, letterType, recipientName, recipientAddress, accountIds, clientData } =
    req.body ?? {};

  if (
    !clientId ||
    !letterType ||
    !recipientName ||
    !recipientAddress ||
    !Array.isArray(accountIds) ||
    !clientData
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch accounts
  let accounts: Array<Record<string, unknown>> = [];
  if (accountIds.length > 0) {
    const { data, error } = await supabase
      .from('dispute_accounts')
      .select('*')
      .in('id', accountIds);
    if (error) {
      console.error('[generate-letters] fetch accounts error:', error);
      return res.status(500).json({ error: 'Failed to fetch accounts' });
    }
    accounts = data ?? [];
  }

  let template: string;
  try {
    template = getTemplate(letterType);
  } catch {
    return res.status(400).json({ error: 'Unknown letter type' });
  }

  const today = new Date().toISOString().slice(0, 10);

  const claudeKey = process.env.CLAUDE_API_KEY;
  if (!claudeKey) {
    return res.status(500).json({ error: 'Claude API not configured' });
  }
  const anthropic = new Anthropic({ apiKey: claudeKey });

  const accountsList = accounts.length
    ? accounts
        .map(
          (a, i) =>
            `${i + 1}. Creditor: ${a.creditor_name} | Account #: ${a.account_number} | Balance: ${a.balance} | Date Opened: ${a.date_opened} | Type: ${a.account_type} | Status: ${a.account_status} | Bureaus: ${(a.bureaus as string[] | undefined)?.join(', ') ?? ''}`
        )
        .join('\n')
    : '[no accounts attached]';

  const userMsg = `Rewrite the dispute letter template below into a unique, legally precise letter for this specific recipient and consumer. Fill all bracketed placeholders.

LETTER TYPE: ${letterType}

CLIENT DATA:
- Full Name: ${clientData.fullName}
- Address: ${clientData.address}
- City/State/Zip: ${clientData.city}, ${clientData.state} ${clientData.zip}
- Email: ${clientData.email}
- Phone: ${clientData.phone}
- Date: ${today}

RECIPIENT:
- Name: ${recipientName}
- Address: ${recipientAddress}

ACCOUNTS RELEVANT TO THIS RECIPIENT:
${accountsList}

TEMPLATE:
${template}

Return ONLY a JSON object in the exact shape specified. No explanation. No markdown.`;

  let parsed: { letter: string; attachmentA: string; packetTopSlip: string };
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      system: LETTER_GENERATION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMsg }],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock && textBlock.type === 'text' ? textBlock.text : '';
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    const startIdx = cleaned.indexOf('{');
    const endIdx = cleaned.lastIndexOf('}');
    const jsonStr =
      startIdx >= 0 && endIdx > startIdx ? cleaned.slice(startIdx, endIdx + 1) : cleaned;
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    console.error('[generate-letters] Claude error:', err);
    return res.status(500).json({ error: 'Failed to generate letter' });
  }

  const { data: letterRow, error: insErr } = await supabase
    .from('dispute_letters')
    .insert({
      client_id: clientId,
      recipient_name: recipientName,
      recipient_address: recipientAddress,
      letter_type: letterType,
      content: parsed.letter,
      attachment_a: parsed.attachmentA,
      packet_top_slip: parsed.packetTopSlip,
    })
    .select('*')
    .single();

  if (insErr || !letterRow) {
    console.error('[generate-letters] insert error:', insErr);
    return res.status(500).json({ error: 'Failed to save letter' });
  }

  await supabase.from('tracking_log').insert({
    client_id: clientId,
    letter_id: letterRow.id,
    recipient_name: recipientName,
    recipient_address: recipientAddress,
    letter_type: letterType,
    date_generated: new Date().toISOString(),
  });

  return res.status(200).json({
    letterId: letterRow.id,
    letter: parsed.letter,
    attachmentA: parsed.attachmentA,
    packetTopSlip: parsed.packetTopSlip,
  });
}
