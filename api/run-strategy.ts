import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const claudeKey = process.env.CLAUDE_API_KEY;
  if (!supabaseUrl || !serviceKey || !claudeKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { clientId } = req.body ?? {};
  if (!clientId) return res.status(400).json({ error: 'Missing clientId' });

  const supabase = createClient(supabaseUrl, serviceKey);
  const anthropic = new Anthropic({ apiKey: claudeKey });

  // Load client and all accounts
  const { data: client, error: cErr } = await supabase
    .from('credit_repair_clients')
    .select('*')
    .eq('id', clientId)
    .maybeSingle();
  if (cErr || !client) return res.status(404).json({ error: 'Client not found' });

  const { data: accounts, error: aErr } = await supabase
    .from('dispute_accounts')
    .select('*')
    .eq('client_id', clientId);
  if (aErr) return res.status(500).json({ error: 'Failed to load accounts' });

  // Build payload for Claude — only items not ignored/duplicate
  const disputeSelections = (client.dispute_selections ?? {}) as Record<string, unknown>;

  const negativeAccts = (accounts ?? []).filter((a) =>
    String(a.account_standing ?? 'negative') !== 'positive' &&
    a.dispute_tag !== 'ignore' &&
    a.dispute_tag !== 'duplicate'
  );

  const buildAccountSummary = (a: Record<string, unknown>) => ({
    creditor_name: a.creditor_name,
    original_creditor: a.original_creditor || null,
    account_type: a.account_type,
    account_status: a.account_status,
    account_reason: a.account_reason || null,
    balance: a.balance,
    bureaus: a.bureaus,
    equifax_account_number: a.account_number_equifax || null,
    experian_account_number: a.account_number_experian || null,
    transunion_account_number: a.account_number_transunion || null,
    equifax_balance: a.equifax_balance || null,
    experian_balance: a.experian_balance || null,
    transunion_balance: a.transunion_balance || null,
    dispute_priority: a.dispute_priority,
    dispute_tag: a.dispute_tag,
    admin_selected_fcra: a.dispute_types ?? [],
    duplicate_flag: a.duplicate_flag,
    balance_inconsistency: a.balance_inconsistency,
  });

  const getSelections = (cat: string) => {
    const catSels = (disputeSelections[cat] ?? {}) as Record<string, unknown>;
    return Object.entries(catSels)
      .filter(([, v]) => {
        const s = v as Record<string, unknown>;
        return s.ignore !== true;
      })
      .map(([key, v]) => {
        const s = v as Record<string, unknown>;
        return { key, ...s };
      });
  };

  const payload = {
    client_name: client.full_name,
    case_type: client.case_type,
    dispute_round: client.dispute_round ?? 1,
    accounts: negativeAccts.map(buildAccountSummary),
    personal_info_errors: {
      names: getSelections('names'),
      addresses: getSelections('addresses'),
      phones: getSelections('phones'),
    },
    inquiries: getSelections('inquiries'),
  };

  const systemPrompt = `You are an expert credit repair attorney and dispute strategist. You receive a client's tagged credit dispute items and return a structured legal strategy plan in two sections.

SECTION A — IDENTITY THEFT ITEMS (§605B):
List only accounts and personal info items where dispute_tag is "identity_theft" or admin_selected_fcra includes "605B".
Group by bureau. For each bureau list the accounts and personal info items that go into that bureau's §605B block letter.
Each account must show: creditor name, account number for that specific bureau, balance for that specific bureau.

SECTION B — STANDARD DISPUTE ITEMS:
For every other account not ignored, not duplicate, not in Section A:
- If dispute_tag is "claude_decide", determine the best legal path based on the account type and status
- If admin_selected_fcra has specific sections checked, use those
- For each item provide: recommended legal path, brief 1-sentence reasoning

Legal paths available:
- §611 Reinvestigation — inaccurate or unverifiable information
- §623 Furnisher Demand — demand furnisher correct their reporting
- §605B Identity Theft Block — fraudulently opened accounts
- §609 Full File Disclosure — request complete file
- §809 FDCPA Debt Validation — validate debt with collector
- Combinations are allowed e.g. "§611 + §623"

Also include:
- personal_info_strategy: for each personal info error not ignored, recommended legal path
- inquiry_strategy: for each inquiry not ignored, recommended path

Return ONLY valid JSON. No markdown. Start with { and end with }.

JSON shape:
{
  "section_a": {
    "equifax": [{ "creditor_name": "string", "account_number": "string", "balance": "string", "account_reason": "string" }],
    "experian": [{ "creditor_name": "string", "account_number": "string", "balance": "string", "account_reason": "string" }],
    "transunion": [{ "creditor_name": "string", "account_number": "string", "balance": "string", "account_reason": "string" }]
  },
  "section_b": [
    {
      "creditor_name": "string",
      "account_status": "string",
      "recommended_path": "string e.g. §611 + §623",
      "reasoning": "string — one sentence",
      "bureaus": ["equifax"],
      "account_number_equifax": "string",
      "account_number_experian": "string",
      "account_number_transunion": "string",
      "balance": "string"
    }
  ],
  "personal_info_strategy": [
    { "item": "string", "type": "name | address | phone", "bureaus": ["equifax"], "recommended_path": "string", "reasoning": "string" }
  ],
  "inquiry_strategy": [
    { "creditor": "string", "bureau": "string", "date": "string", "recommended_path": "string", "reasoning": "string" }
  ],
  "overall_summary": "string — 2-3 sentences summarizing the full strategy"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: 'user', content: `Generate the dispute strategy plan for this client:\n\n${JSON.stringify(payload, null, 2)}` }],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    let cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    const si = cleaned.indexOf('{');
    const ei = cleaned.lastIndexOf('}');
    if (si >= 0 && ei > si) cleaned = cleaned.slice(si, ei + 1);

    const parsed = JSON.parse(cleaned);

    // Save strategy to client record
    await supabase
      .from('credit_repair_clients')
      .update({ dispute_strategy: parsed })
      .eq('id', clientId);

    return res.status(200).json({ strategy: parsed });
  } catch (err) {
    console.error('[run-strategy] error:', err);
    return res.status(500).json({ error: 'Strategy generation failed', detail: (err as Error).message });
  }
}
