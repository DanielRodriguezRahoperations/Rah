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

  const { clientId, letterType, recipientName, recipientAddress, accountIds, clientData, bureau } =
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

  // Fetch client record for round / police / FTC context
  const { data: clientRecord } = await supabase
    .from('credit_repair_clients')
    .select('*')
    .eq('id', clientId)
    .maybeSingle();

  const cr = clientRecord as Record<string, unknown> | null;

  const ftcNumbers = [
    ...(cr?.doc_ftc_report ? ['primary report on file'] : []),
    ...(Array.isArray(cr?.doc_ftc_reports)
      ? (cr.doc_ftc_reports as unknown[]).map((_, i) => `Report ${i + 1}`)
      : []),
  ].join(', ') || 'on file';

  const { data: bureauResponses } = await supabase
    .from('bureau_responses')
    .select('id')
    .eq('client_id', clientId);

  const disputeRound = Number(cr?.dispute_round ?? 1);
  const roundContext = disputeRound > 1
    ? `\nDISPUTE ROUND: ${disputeRound}\nROUND NOTES: ${cr?.round_notes || 'No notes provided'}\nThis is not a first-time dispute. Escalate language appropriately per round escalation strategy.`
    : 'DISPUTE ROUND: 1 — Use standard first-round dispute language.';

  const policeContext = cr?.police_report_number
    ? `\nPOLICE REPORT ON FILE: ${cr.police_agency} Report #${cr.police_report_number}, Officer: ${cr.police_officer}, Date: ${cr.police_report_date}\nInclude this in all applicable letters and enclosures lists.`
    : '';

  const responseContext = (bureauResponses?.length ?? 0) > 0
    ? `\nBUREAU/CREDITOR RESPONSE LETTERS HAVE BEEN UPLOADED.\nAnalyze and refute each response directly:\n- If they claimed verification: Challenge under §611(a)(7), demand furnisher name and original source docs\n- If they claimed accuracy: Escalate to §609(a)(1) full file disclosure and Metro 2 §607(b) challenge\n- If procedural defects exist: Cite as additional FCRA violations`
    : '';

  const extrasContext = `\n\n---\nADDITIONAL CONTEXT FOR THIS LETTER:\n${roundContext}${policeContext}${responseContext}\nFTC REPORT NUMBERS: ${ftcNumbers}\nCLIENT ADDRESS (use exactly as written): ${cr?.address ?? clientData.address}\nCLIENT FULL NAME (use exactly): ${cr?.full_name ?? clientData.fullName}\n---`;

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
        .map((a, i) => {
          const orig = a.original_creditor ? ` (Original: ${a.original_creditor})` : '';
          const bd = typeof bureau === 'string' && bureau
            ? (a[`${bureau}_data`] as Record<string, unknown> | null | undefined)
            : null;
          let acctStr: string;
          if (bureau) {
            const num = bd?.account_number ?? a[`account_number_${bureau}`] ?? a.account_number;
            acctStr = num ? String(num) : '—';
          } else {
            const acctParts = [
              a.account_number_equifax ? `EQ: ${a.account_number_equifax}` : null,
              a.account_number_experian ? `EX: ${a.account_number_experian}` : null,
              a.account_number_transunion ? `TU: ${a.account_number_transunion}` : null,
            ].filter(Boolean);
            acctStr = acctParts.length ? acctParts.join(' | ') : (a.account_number ? `Ref: ${a.account_number}` : '—');
          }
          const phoneArr = (Array.isArray(bd?.phone_numbers) ? bd!.phone_numbers : a.phone_numbers) as string[] | undefined;
          const nameArr = (Array.isArray(bd?.name_variations) ? bd!.name_variations : a.name_variations) as string[] | undefined;
          const addrArr = (Array.isArray(bd?.addresses) ? bd!.addresses : a.addresses) as string[] | undefined;
          const phones = phoneArr?.length ? ` | Phone Numbers: ${phoneArr.join(', ')}` : '';
          const names = nameArr?.length ? ` | Name Variations: ${nameArr.join(', ')}` : '';
          const addrs = addrArr?.length ? ` | Addresses: ${addrArr.join('; ')}` : '';
          const bureauLabel = bureau ? String(bureau) : (a.bureaus as string[] | undefined)?.join(', ') ?? '';
          return `${i + 1}. Creditor: ${a.creditor_name}${orig} | Account #: ${acctStr} | Balance: ${a.balance} | Date Opened: ${a.date_opened} | Type: ${a.account_type} | Status: ${a.account_status} | Bureau: ${bureauLabel}${phones}${names}${addrs}`;
        })
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

Return ONLY a JSON object in the exact shape specified. No explanation. No markdown.${extrasContext}`;

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
