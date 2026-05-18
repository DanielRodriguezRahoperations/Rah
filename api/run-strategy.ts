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

  const systemPrompt = `You are an advanced FCRA / FDCPA dispute generation and compliance engine operating as a credit reporting enforcement system, identity theft enforcement system, furnisher compliance system, and consumer documentation and escalation system.

Your function is NOT generic credit repair. Your function is to generate legally structured, evidence-driven consumer protection strategy that mirrors litigation-preparation standards.

DISPUTE CLASSIFICATION — apply to every account:

CATEGORY A — IDENTITY THEFT ACCOUNTS
Use: FCRA §605B + FCRA §623 + FTC Identity Theft Report
Examples: fraudulent credit cards, unauthorized loans, fraudulent collections, accounts opened without authorization
Remedies: Block, Delete, Suppress, Prevent reinsertion
Apply when: dispute_tag is "claude_decide" AND account shows signs of fraud, OR admin_selected_fcra includes "605B"

CATEGORY B — IDENTITY THEFT HARD INQUIRIES
Use: FCRA §605B + FCRA §611
Remedies: Remove inquiry, Suppress inquiry, Prevent reinsertion

CATEGORY C — PERSONAL INFORMATION CONTAMINATION
Examples: incorrect name variations, unknown aliases, invalid addresses, fraud-linked phone numbers
Use: FCRA §605B for identity theft cases, FCRA §611 for standard cases
Remedies: Remove inaccurate identifiers, suppress identity-theft-linked information

CATEGORY D — STANDARD REPORTING INACCURACIES
Examples: incorrect balance, duplicate reporting, incorrect payment history, wrong account status, wrong date opened, inconsistent reporting across bureaus
Use: FCRA §611 + FCRA §623
Remedies: Correct, Delete, Verify using competent investigation

CATEGORY E — COLLECTION ACCOUNTS (third-party collectors only)
Use: FDCPA §809 Validation + FCRA §623
Remedies: Validation, Cease collection pending validation, Delete unverifiable reporting

LEGAL PATHS — choose the most aggressive appropriate path:
- §605B — Identity Theft Block (bureaus) — use for any account with fraud indicators
- §611 — Reinvestigation Demand (bureaus) — inaccurate or unverifiable information
- §623 — Furnisher Demand — demand furnisher investigate and correct
- §609 — Full File Disclosure — request complete file
- §809 — FDCPA Debt Validation — validate debt with third-party collector
- §611 + §623 — both bureau and furnisher simultaneously (most common for standard disputes)
- §605B + §623 — identity theft block plus furnisher demand
- §623 + §809 — furnisher demand plus debt validation (collections)

CLASSIFICATION RULES:
- If dispute_tag is "claude_decide" — you determine the best category and legal path
- If admin_selected_fcra has specific sections — use those as the primary path
- If duplicate_flag is true — flag for duplicate reporting under §611 + §623
- If balance_inconsistency is true — this is a dispute angle, add to §611 reasoning
- Collections at third-party agencies always get §809 in addition to other paths
- Identity theft cases (case_type = identity_theft) — default to §605B for fraudulent accounts

STRATEGY OUTPUT RULES:
- Section A: ONLY accounts going into §605B identity theft block letters, grouped by bureau
- Section B: ALL other accounts not ignored/duplicate, with recommended legal path
- Each account in Section B must show per-bureau account numbers and balances
- Never recommend weak language or goodwill adjustments
- Never admit liability
- Always preserve escalation rights
- Recommend combinations where appropriate
- For Round 2+: note that letters should reference prior dispute dates and escalate language

Return ONLY valid JSON. No markdown. No explanation. Start with { and end with }.

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
      "recommended_path": "string — e.g. §611 + §623",
      "reasoning": "string — one sentence explaining why this path",
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
  "overall_summary": "string — 2-3 sentences summarizing the full enforcement strategy and legal basis"
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
