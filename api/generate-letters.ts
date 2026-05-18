import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { getTemplate } from '../src/lib/letterTemplates';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

// ============================================================================
// LITIGATION-STYLE MASTER SYSTEM PROMPT
// ============================================================================
// Constrains Claude to recognized FCRA/FDCPA/FACTA sections only. Forbids
// freestyle legal citations. Demands packet structure: cover page + TOC +
// letter + Attachment A + packet top slip.
// ============================================================================

const LITIGATION_LETTER_SYSTEM_PROMPT = `You are a consumer reporting compliance enforcement drafter operating under FCRA, FDCPA, and FACTA. You produce litigation-grade dispute packets — not generic credit repair letters.

YOUR OUTPUT IS A LEGAL DOCUMENT PACKET. Treat every word as if it will be reviewed by opposing counsel, a CFPB investigator, or a federal judge.

==========================================================================
ABSOLUTE RULES — VIOLATION OF ANY OF THESE INVALIDATES THE OUTPUT
==========================================================================

1. RETURN ONLY A SINGLE JSON OBJECT. No markdown. No code fences. No preamble. No explanation. The first character of your response must be { and the last must be }.

2. THE JSON OBJECT MUST HAVE EXACTLY THESE FIVE KEYS, IN THIS ORDER:
   {
     "coverPage": string,
     "tableOfContents": string,
     "letter": string,
     "attachmentA": string,
     "packetTopSlip": string
   }
   No additional keys. No missing keys. All five must be non-empty strings.

3. LEGAL CITATION CONSTRAINTS — DO NOT VIOLATE
   You may cite ONLY from this approved list. Use exact section numbers and exact statutory language. Do not paraphrase the statute. Do not invent subsections. Do not cite case law you cannot verify.

   APPROVED FCRA SECTIONS (15 U.S.C. § 1681):
   - § 1681a — Definitions
   - § 1681b — Permissible purposes of consumer reports
   - § 1681c — Requirements relating to information contained in consumer reports
   - § 1681c-2 — Block of information resulting from identity theft (FACTA § 605B)
   - § 1681e(b) — Compliance procedures; maximum possible accuracy
   - § 1681g — Disclosures to consumers (full file disclosure)
   - § 1681i — Procedure in case of disputed accuracy (reinvestigation, MOV)
   - § 1681i(a)(5)(B) — Reinsertion notice requirement
   - § 1681i(a)(6) — Notice of results of reinvestigation
   - § 1681i(a)(7) — Description of reinvestigation procedure (Method of Verification)
   - § 1681j — Charges for certain disclosures
   - § 1681n — Civil liability for willful noncompliance
   - § 1681o — Civil liability for negligent noncompliance
   - § 1681s-2(a) — Duties of furnishers — accuracy
   - § 1681s-2(b) — Duties of furnishers upon notice of dispute

   APPROVED FDCPA SECTIONS (15 U.S.C. § 1692):
   - § 1692c — Communication with consumers
   - § 1692d — Harassment or abuse
   - § 1692e — False or misleading representations
   - § 1692f — Unfair practices
   - § 1692g — Validation of debts
   - § 1692j — Furnishing certain deceptive forms
   - § 1692k — Civil liability

   APPROVED FACTA SECTIONS:
   - FACTA § 605B (codified at 15 U.S.C. § 1681c-2) — Identity theft block
   - FACTA § 609(e) — Disclosure to victims of identity theft
   - FACTA § 611 — Procedure in case of disputed accuracy (as amended)

   APPROVED REGULATIONS:
   - 12 CFR Part 1022 (Regulation V) — FCRA implementing regulation
   - 16 CFR Part 660 — Furnisher accuracy and integrity (Reg V furnisher rule)

   APPROVED INDUSTRY STANDARDS (reference, not "law"):
   - Metro 2 Format Reporting Standard (CDIA)
   - e-OSCAR automated dispute platform

   IF A LEGAL THEORY YOU WANT TO USE IS NOT ON THIS LIST, DO NOT INVENT ONE. Restructure the argument to fit an approved citation, or omit it.

4. APPROVED REMEDIES — USE THESE EXACT TERMS
   - BLOCK (under § 1681c-2 / FACTA § 605B — identity theft only)
   - DELETE (under § 1681i for unverifiable; § 1681e(b) for inaccurate)
   - CORRECT (under § 1681i and § 1681s-2(b) for partial inaccuracy)
   - SUPPRESS (for obsolete information under § 1681c)
   - VALIDATE (under § 1692g for debt collectors)
   - METHOD OF VERIFICATION DEMAND (under § 1681i(a)(7))
   - REINSERTION CHALLENGE (under § 1681i(a)(5)(B))
   - CFPB ESCALATION (administrative remedy)

   Match the remedy to the legal theory. Do not demand BLOCK on a non-identity-theft account. Do not demand VALIDATE from a credit bureau (only debt collectors).

5. LEGAL THEORY DISCIPLINE
   Pick ONE primary legal theory per account and stay consistent. Do not contradict yourself. Specifically:
   - If account is positioned as IDENTITY THEFT → argue § 1681c-2 block, do not also argue "balance is wrong" (that admits the account is the consumer's)
   - If account is positioned as INACCURATE REPORTING → argue § 1681e(b) and § 1681s-2(a), cite specific inaccuracies
   - If account is positioned as UNVERIFIABLE → argue § 1681i reinvestigation failure, demand MOV
   - If account is positioned as PROCEDURAL VIOLATION → cite the specific procedural defect

6. RECIPIENT-TYPE DISCIPLINE
   - To a CREDIT BUREAU: cite § 1681i, § 1681e(b), § 1681c-2. Never cite § 1692 — FDCPA does not apply to credit bureaus.
   - To a FURNISHER (original creditor): cite § 1681s-2(a), § 1681s-2(b), 16 CFR Part 660. May cite § 1692 if also a debt collector.
   - To a DEBT COLLECTOR: cite § 1692g validation, § 1692e, § 1692f, plus § 1681s-2(b).

==========================================================================
PACKET STRUCTURE REQUIREMENTS
==========================================================================

(A) coverPage — A formal cover sheet for the packet. Must include:
    - Bold title: "CONSUMER DISPUTE PACKET — [LETTER TYPE]"
    - Date prepared
    - Consumer full legal name
    - Consumer current address
    - Recipient name and address (use the resolved address provided)
    - Letter type and dispute round number
    - Total number of accounts/items in this packet
    - FTC Identity Theft Report Number(s) — if applicable
    - Police report reference — if applicable
    - Statement: "This packet is a formal communication under the Fair Credit Reporting Act and related federal consumer protection statutes. Retain for the duration of all statutory response and recordkeeping periods."
    - "DELIVERED VIA: [to be filled by mail processor]" and "TRACKING #: [to be filled]"

(B) tableOfContents — A numbered table of contents listing every component of the packet. Format:
    SECTION 1 — Cover Page
    SECTION 2 — Dispute Letter (this letter)
    SECTION 3 — Attachment A: Itemized List of Disputed Items
    SECTION 4 — [Enclosures, e.g., FTC Identity Theft Report, Police Report, Proof of Identity, Proof of Address — list only what is applicable based on letter type and context provided]
    SECTION 5 — Packet Top Slip (mail processor instructions)
    Use the actual section names. If a section does not apply, omit it and renumber.

(C) letter — The dispute letter body itself. Requirements:
    - Date line at top
    - Consumer name/address block (top left)
    - Recipient name/address block (below consumer block)
    - Subject line referencing the specific dispute type
    - Opening paragraph: identify yourself, identify the recipient's statutory duty, state the purpose
    - Numbered grounds for dispute (each with exact statutory citation)
    - For each disputed account/item: state the account number AS REPORTED BY THIS SPECIFIC RECIPIENT/BUREAU, state the balance AS REPORTED BY THIS SPECIFIC RECIPIENT/BUREAU, state the legal theory, state the remedy demanded
    - If the consumer report shows DIFFERENT account numbers or balances across bureaus for the same account, CITE THAT DISCREPANCY explicitly as evidence of failure to follow reasonable procedures under § 1681e(b)
    - Statutory deadline reminder (30 days under § 1681i; 5 business days under § 1681c-2 for FACTA blocks)
    - Demand for written confirmation of action taken
    - Reservation of rights paragraph citing § 1681n and § 1681o
    - Signature block
    - Enclosures list

(D) attachmentA — Itemized List of Disputed Items. For each account/item:
    - Item number
    - Creditor name (and original creditor if applicable)
    - Account number as reported by this recipient
    - Balance as reported by this recipient
    - Date opened
    - Account type and status
    - Specific inaccuracy or basis for dispute
    - Statutory citation
    - Remedy demanded
    Format as a numbered list with clear field labels. This is the document the recipient's compliance team will work from.

(E) packetTopSlip — A one-page slip for the mail processor (Lob, USPS clerk, internal staff). Plain instructions:
    - "MAIL PROCESSOR INSTRUCTIONS"
    - Mail class (Certified Mail, Return Receipt Requested)
    - Recipient name and address (clear, address-block format)
    - Return address
    - Page count of full packet
    - Required enclosures checklist
    - "DO NOT MAIL IF ADDRESS IS MARKED 'VERIFY BEFORE MAILING' — RETURN TO QUEUE"

==========================================================================
ADDRESS-HANDLING RULE
==========================================================================
The recipient address provided to you may contain the literal string "*** VERIFY ADDRESS BEFORE MAILING ***" or "AI-ASSISTED — REQUIRES REVIEW". If it does:
- Use the address EXACTLY as provided, including those markers
- In the packetTopSlip, repeat the verification warning prominently
- Do not "clean up" or remove the markers

==========================================================================
TONE
==========================================================================
Professional. Precise. Statutory. Not aggressive, not pleading. The tone of a paralegal drafting under attorney supervision. Vary sentence structure between letters so packets do not look templated, but never at the cost of legal precision.

==========================================================================
FINAL CHECK BEFORE OUTPUT
==========================================================================
Before returning, verify:
[ ] Output is a single JSON object, no markdown, no preamble
[ ] All five keys present and non-empty
[ ] All citations are from the approved list
[ ] Remedy matches the legal theory
[ ] Recipient-type discipline observed
[ ] No contradictions across legal theories for the same account
[ ] Per-bureau account numbers and balances are stated where the data was provided
[ ] Address markers (if any) are preserved verbatim`;

// ============================================================================
// CLAUDE-ASSISTED FURNISHER ADDRESS LOOKUP
// ============================================================================
// Last-resort fallback after furnisher_addresses table and bureau-reported
// addresses both miss. Returns { address, confidence, source }.
// HIGH confidence may be used inline but is STILL labeled AI-assisted.
// MEDIUM/LOW keep needs_address: true.
// NO caching this round — per Fix 5 scope.
// ============================================================================

async function resolveFurnisherAddressViaClaude(
  anthropic: Anthropic,
  creditorName: string
): Promise<{ address: string | null; confidence: 'high' | 'medium' | 'low'; source: 'claude' }> {
  const sysPrompt = `You are a consumer finance address lookup assistant. Your job is to provide the official FCRA dispute / compliance mailing address for a named creditor or furnisher.

ABSOLUTE RULES:
1. Return ONLY a single JSON object. No markdown. No preamble. First char {, last char }.
2. Required shape:
   { "address": string | null, "confidence": "high" | "medium" | "low", "reasoning": string }
3. CONFIDENCE LEVELS:
   - "high" — You are highly confident this is the current, official FCRA dispute address (e.g., well-known major creditors: Capital One, Synchrony, Discover, Chase, American Express).
   - "medium" — You believe this is correct but the creditor is smaller, has changed addresses recently, or the FCRA dispute address differs from the general correspondence address.
   - "low" — You can only guess at a general corporate address, or you are not sure this is the FCRA compliance department address.
4. If you do not know the creditor at all, return { "address": null, "confidence": "low", "reasoning": "Unknown creditor" }.
5. NEVER fabricate an address you do not actually know. Returning null with low confidence is correct behavior when you don't know.
6. Format the address as:
   "ATTN: FCRA Compliance Department / Consumer Disputes\\n[Street Address]\\n[City, State ZIP]"
7. Do not include phone numbers, email addresses, or websites. Mailing address only.`;

  const userMsg = `Provide the official FCRA dispute / consumer compliance mailing address for the following furnisher:

CREDITOR / FURNISHER NAME: ${creditorName}

Return the JSON object now.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: sysPrompt,
      messages: [{ role: 'user', content: userMsg }],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock && textBlock.type === 'text' ? textBlock.text : '';
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    const startIdx = cleaned.indexOf('{');
    const endIdx = cleaned.lastIndexOf('}');
    const jsonStr =
      startIdx >= 0 && endIdx > startIdx ? cleaned.slice(startIdx, endIdx + 1) : cleaned;
    const parsed = JSON.parse(jsonStr) as {
      address: string | null;
      confidence: 'high' | 'medium' | 'low';
      reasoning?: string;
    };

    const conf: 'high' | 'medium' | 'low' =
      parsed.confidence === 'high' || parsed.confidence === 'medium' || parsed.confidence === 'low'
        ? parsed.confidence
        : 'low';

    return {
      address: parsed.address && parsed.address.trim().length > 0 ? parsed.address : null,
      confidence: conf,
      source: 'claude',
    };
  } catch (err) {
    console.error('[generate-letters] Claude address lookup error:', err);
    return { address: null, confidence: 'low', source: 'claude' };
  }
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

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

  const claudeKey = process.env.CLAUDE_API_KEY;
  if (!claudeKey) {
    return res.status(500).json({ error: 'Claude API not configured' });
  }
  const anthropic = new Anthropic({ apiKey: claudeKey });

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

  const ftcNumbers = (() => {
    if (Array.isArray(cr?.ftc_report_numbers) && (cr!.ftc_report_numbers as unknown[]).length > 0) {
      return (cr!.ftc_report_numbers as unknown[]).map(String).join(', ');
    }
    const fallback = [
      ...(cr?.doc_ftc_report ? ['primary report on file'] : []),
      ...(Array.isArray(cr?.doc_ftc_reports)
        ? (cr!.doc_ftc_reports as unknown[]).map((_, i) => `Report ${i + 1}`)
        : []),
    ].join(', ');
    return fallback || 'on file';
  })();

  const { data: bureauResponses } = await supabase
    .from('bureau_responses')
    .select('id')
    .eq('client_id', clientId);

  // ---- Furnisher address resolution (3-level chain) ------------------------
  // Level 1: furnisher_addresses table
  // Level 2: bureau-reported furnisher_address from account data
  // Level 3: Claude-assisted suggestion (confidence-tagged; NO caching this round)
  // --------------------------------------------------------------------------

  let resolvedRecipientAddress = recipientAddress;
  let needsAddress = false;
  let addressSource: 'provided' | 'furnisher_table' | 'bureau_data' | 'claude_high' | 'claude_medium' | 'claude_low' | 'fallback' = 'provided';

  if (['623', '809'].includes(letterType)) {
    // Level 1 — furnisher_addresses table
    const { data: faRows } = await supabase
      .from('furnisher_addresses')
      .select('address, fcra_dept')
      .or(`creditor_name.ilike.${recipientName},aka.cs.{${recipientName}}`)
      .limit(1);

    if (faRows && faRows.length > 0) {
      const fa = faRows[0] as Record<string, string>;
      resolvedRecipientAddress = `${recipientName}\nATTN: ${fa.fcra_dept || 'FCRA Compliance Department'}\n${fa.address}`;
      addressSource = 'furnisher_table';
    } else {
      // Level 2 — bureau-reported furnisher_address in account data
      const bureauKeys = ['equifax_data', 'experian_data', 'transunion_data'];
      const acctWithAddr = accounts.find((a) =>
        bureauKeys.some((k) => {
          const bd = a[k] as Record<string, unknown> | null | undefined;
          return bd?.furnisher_address && String(bd.furnisher_address).trim().length > 5;
        })
      );

      if (acctWithAddr) {
        for (const k of bureauKeys) {
          const bd = acctWithAddr[k] as Record<string, unknown> | null | undefined;
          if (bd?.furnisher_address && String(bd.furnisher_address).trim().length > 5) {
            resolvedRecipientAddress = `${recipientName}\nATTN: FCRA Compliance Department\n${bd.furnisher_address}`;
            addressSource = 'bureau_data';
            break;
          }
        }
      } else if (
        !recipientAddress ||
        recipientAddress.includes('Verify Before Mailing') ||
        recipientAddress.includes('Address on File')
      ) {
        // Level 3 — Claude-assisted fallback (no caching this round)
        const claudeResult = await resolveFurnisherAddressViaClaude(anthropic, recipientName);

        if (claudeResult.address && claudeResult.confidence === 'high') {
          resolvedRecipientAddress = `${recipientName}\nATTN: FCRA Compliance Department\n${claudeResult.address}\n\n*** AI-ASSISTED ADDRESS — REQUIRES REVIEW BEFORE MAILING ***`;
          addressSource = 'claude_high';
          needsAddress = true;
        } else if (claudeResult.address && claudeResult.confidence === 'medium') {
          resolvedRecipientAddress = `${recipientName}\nATTN: FCRA Compliance Department\n${claudeResult.address}\n\n*** VERIFY ADDRESS BEFORE MAILING — AI-ASSISTED, MEDIUM CONFIDENCE ***`;
          addressSource = 'claude_medium';
          needsAddress = true;
        } else {
          resolvedRecipientAddress = `${recipientName}\nATTN: FCRA Compliance Department\n*** VERIFY ADDRESS BEFORE MAILING ***`;
          addressSource = claudeResult.address ? 'claude_low' : 'fallback';
          needsAddress = true;
        }
      }
    }
  }

  const disputeRound = Number(cr?.dispute_round ?? 1);
  const roundContext = disputeRound > 1
    ? `\nDISPUTE ROUND: ${disputeRound}\nROUND NOTES: ${cr?.round_notes || 'No notes provided'}\nThis is not a first-time dispute. Escalate language appropriately per round escalation strategy. Reference prior dispute attempts where appropriate. If response letters from prior rounds are on file, refute their content under § 1681i(a)(7) and demand Method of Verification disclosure.`
    : 'DISPUTE ROUND: 1 — Use standard first-round dispute language.';

  const policeContext = cr?.police_report_number
    ? `\nPOLICE REPORT ON FILE: ${cr.police_agency} Report #${cr.police_report_number}, Officer: ${cr.police_officer}, Date: ${cr.police_report_date}\nInclude this in all applicable letters and enclosures lists. For § 605B / FACTA blocks, this is required supporting documentation.`
    : '';

  const responseContext = (bureauResponses?.length ?? 0) > 0
    ? `\nBUREAU/CREDITOR RESPONSE LETTERS HAVE BEEN UPLOADED.\nRefute each response directly:\n- If they claimed verification: Challenge under § 1681i(a)(7), demand Method of Verification disclosure including furnisher name, contact, and source documents reviewed.\n- If they claimed accuracy: Escalate to § 1681g full file disclosure and challenge Metro 2 reporting under § 1681e(b).\n- If they marked dispute "frivolous": Demand the specific basis under § 1681i(a)(3) and state intent to escalate to CFPB if no substantive response is provided within statutory window.\n- If procedural defects exist (no signed verification, no specific findings): Cite as additional FCRA violations under § 1681i.`
    : '';

  // §605B-specific context: personal info errors and unauthorized inquiries
  let bureau605bContext = '';
  if (letterType === '605B' && typeof bureau === 'string' && bureau) {
    const pie = cr?.personal_info_errors as {
      name_variations?: Record<string, string[]>;
      unknown_addresses?: Record<string, string[]>;
      unknown_phone_numbers?: Record<string, string[]>;
    } | null | undefined;

    const disputeSel = cr?.dispute_selections as Record<string, Record<string, { bureaus: Record<string, boolean>; fcra_sections: string[] }>> | null | undefined;

    const nameVarMap = pie?.name_variations ?? {};
    const namesForBureau: string[] = [];
    for (const [name, bureaus] of Object.entries(nameVarMap)) {
      const sel = disputeSel?.names?.[name];
      const inSel = sel ? sel.bureaus[bureau] : Array.isArray(bureaus) && bureaus.includes(bureau);
      if (inSel) namesForBureau.push(name);
    }

    const addrMap = pie?.unknown_addresses ?? {};
    const addrsForBureau: string[] = [];
    for (const [addr, bureaus] of Object.entries(addrMap)) {
      const sel = disputeSel?.addresses?.[addr];
      const inSel = sel ? sel.bureaus[bureau] : Array.isArray(bureaus) && bureaus.includes(bureau);
      if (inSel) addrsForBureau.push(addr);
    }

    const phoneMap = pie?.unknown_phone_numbers ?? {};
    const phonesForBureau: string[] = [];
    for (const [phone, bureaus] of Object.entries(phoneMap)) {
      const sel = disputeSel?.phones?.[phone];
      const inSel = sel ? sel.bureaus[bureau] : Array.isArray(bureaus) && bureaus.includes(bureau);
      if (inSel) phonesForBureau.push(phone);
    }

    const allInquiries = Array.isArray(cr?.inquiries)
      ? cr!.inquiries as Array<{ creditor: string; date: string; bureau: string; potentially_unauthorized: boolean; inquiry_type?: string; confirmed_unauthorized?: boolean }>
      : [];
    const unauthorizedForBureau = allInquiries.filter(
      (q) => q.potentially_unauthorized && q.inquiry_type === 'hard' && q.bureau?.toLowerCase() === bureau.toLowerCase()
    );

    if (namesForBureau.length > 0) {
      bureau605bContext += `\n\nFRAUDULENT NAME VARIATIONS (include under Section I or as separate item):\n${namesForBureau.map((n, i) => `  ${i + 1}. ${n}`).join('\n')}`;
    }
    if (addrsForBureau.length > 0) {
      bureau605bContext += `\n\nFRAUDULENT ADDRESSES (include as Section II):\n${addrsForBureau.map((a, i) => `  ${i + 1}. ${a}`).join('\n')}`;
    }
    if (phonesForBureau.length > 0) {
      bureau605bContext += `\n\nFRAUDULENT PHONE NUMBERS (include as Section III):\n${phonesForBureau.map((p, i) => `  ${i + 1}. ${p}`).join('\n')}`;
    }
    if (unauthorizedForBureau.length > 0) {
      bureau605bContext += `\n\nUNAUTHORIZED HARD INQUIRIES FOR ${bureau.toUpperCase()} (include as Section IV):\n${unauthorizedForBureau.map((q, i) => `  ${i + 1}. ${q.creditor} — ${q.date}`).join('\n')}`;
    }
  }

  const extrasContext = `\n\n---\nADDITIONAL CONTEXT FOR THIS LETTER:\n${roundContext}${policeContext}${responseContext}\nFTC REPORT NUMBERS: ${ftcNumbers}\nCLIENT ADDRESS (use exactly as written): ${cr?.address ?? clientData.address}\nCLIENT FULL NAME (use exactly): ${cr?.full_name ?? clientData.fullName}\nADDRESS SOURCE: ${addressSource}${needsAddress ? ' — REQUIRES HUMAN VERIFICATION BEFORE MAILING' : ''}${bureau605bContext}\n---`;

  let template: string;
  try {
    template = getTemplate(letterType);
  } catch {
    return res.status(400).json({ error: 'Unknown letter type' });
  }

  const today = new Date().toISOString().slice(0, 10);

  // Build per-account list with per-bureau account # AND balance
  const accountsList = accounts.length
    ? accounts
        .map((a, i) => {
          const orig = a.original_creditor ? ` (Original: ${a.original_creditor})` : '';
          const bd = typeof bureau === 'string' && bureau
            ? (a[`${bureau}_data`] as Record<string, unknown> | null | undefined)
            : null;

          // Per-bureau account number
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

          // Per-bureau balance (NEW in Fix 5)
          // Reads top-level columns (equifax_balance / experian_balance / transunion_balance),
          // falls back to bureau_data JSON, then single a.balance.
          const eqData = a.equifax_data as Record<string, unknown> | null | undefined;
          const exData = a.experian_data as Record<string, unknown> | null | undefined;
          const tuData = a.transunion_data as Record<string, unknown> | null | undefined;
          const eqBal = a.equifax_balance ?? eqData?.balance ?? null;
          const exBal = a.experian_balance ?? exData?.balance ?? null;
          const tuBal = a.transunion_balance ?? tuData?.balance ?? null;

          let balStr: string;
          if (bureau) {
            const topLevelKey = `${bureau}_balance` as const;
            const b = a[topLevelKey] ?? bd?.balance ?? a.balance;
            balStr = b != null && b !== '' ? String(b) : '—';
          } else {
            const balParts = [
              eqBal != null && eqBal !== '' ? `EQ: ${eqBal}` : null,
              exBal != null && exBal !== '' ? `EX: ${exBal}` : null,
              tuBal != null && tuBal !== '' ? `TU: ${tuBal}` : null,
            ].filter(Boolean);
            balStr = balParts.length ? balParts.join(' | ') : (a.balance != null ? String(a.balance) : '—');
          }

          // Trust pre-computed flag from analyze step first
          const preComputedDiscrepancy = a.balance_inconsistency === true;
          const allBals = [eqBal, exBal, tuBal].filter((v) => v != null && v !== '');
          const uniqueBals = new Set(allBals.map((v) => String(v).replace(/[^0-9.-]/g, '')));
          const detectedDiscrepancy = !bureau && uniqueBals.size > 1;
          const discrepancyNote = a.balance_inconsistency_note ? ` (${a.balance_inconsistency_note})` : '';
          const balanceDiscrepancy = (preComputedDiscrepancy || detectedDiscrepancy) && !bureau
            ? ` | ⚠ BALANCE DISCREPANCY ACROSS BUREAUS — cite under § 1681e(b)${discrepancyNote}`
            : '';

          const phoneArr = (Array.isArray(bd?.phone_numbers) ? bd!.phone_numbers : a.phone_numbers) as string[] | undefined;
          const nameArr = (Array.isArray(bd?.name_variations) ? bd!.name_variations : a.name_variations) as string[] | undefined;
          const addrArr = (Array.isArray(bd?.addresses) ? bd!.addresses : a.addresses) as string[] | undefined;
          const phones = phoneArr?.length ? ` | Phone Numbers: ${phoneArr.join(', ')}` : '';
          const names = nameArr?.length ? ` | Name Variations: ${nameArr.join(', ')}` : '';
          const addrs = addrArr?.length ? ` | Addresses: ${addrArr.join('; ')}` : '';
          const bureauLabel = bureau ? String(bureau) : (a.bureaus as string[] | undefined)?.join(', ') ?? '';

          return `${i + 1}. Creditor: ${a.creditor_name}${orig} | Account #: ${acctStr} | Balance: ${balStr}${balanceDiscrepancy} | Date Opened: ${a.date_opened} | Type: ${a.account_type} | Status: ${a.account_status} | Bureau: ${bureauLabel}${phones}${names}${addrs}`;
        })
        .join('\n')
    : '[no accounts attached]';

  const userMsg = `Generate a litigation-grade dispute packet using the data below. Return ONLY the JSON object specified in the system instructions.

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
- Address (use EXACTLY as provided, including any verification markers):
${resolvedRecipientAddress}

ACCOUNTS RELEVANT TO THIS RECIPIENT:
${accountsList}

TEMPLATE REFERENCE (structural guidance only — adapt to litigation-grade format described in system prompt; do NOT copy verbatim):
${template}

Return ONLY the JSON object. No markdown. No preamble.${extrasContext}`;

  let parsed: {
    coverPage: string;
    tableOfContents: string;
    letter: string;
    attachmentA: string;
    packetTopSlip: string;
  };

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 16000,
      system: LITIGATION_LETTER_SYSTEM_PROMPT,
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

    if (
      typeof parsed.coverPage !== 'string' ||
      typeof parsed.tableOfContents !== 'string' ||
      typeof parsed.letter !== 'string' ||
      typeof parsed.attachmentA !== 'string' ||
      typeof parsed.packetTopSlip !== 'string'
    ) {
      throw new Error('Claude returned malformed JSON shape — missing one or more required keys');
    }
  } catch (err) {
    console.error('[generate-letters] Claude error:', err);
    return res.status(500).json({ error: 'Failed to generate letter' });
  }

  const { data: letterRow, error: insErr } = await supabase
    .from('dispute_letters')
    .insert({
      client_id: clientId,
      recipient_name: recipientName,
      recipient_address: resolvedRecipientAddress,
      letter_type: letterType,
      content: parsed.letter,
      attachment_a: parsed.attachmentA,
      packet_top_slip: parsed.packetTopSlip,
      cover_page: parsed.coverPage,
      table_of_contents: parsed.tableOfContents,
      needs_address: needsAddress,
    })
    .select('*')
    .single();

  if (insErr || !letterRow) {
    console.error('[generate-letters] insert error:', insErr);
    return res.status(500).json({ error: 'Failed to save letter' });
  }

  // tracking_log bug fix: use resolvedRecipientAddress, not raw recipientAddress
  await supabase.from('tracking_log').insert({
    client_id: clientId,
    letter_id: letterRow.id,
    recipient_name: recipientName,
    recipient_address: resolvedRecipientAddress,
    letter_type: letterType,
    date_generated: new Date().toISOString(),
  });

  return res.status(200).json({
    letterId: letterRow.id,
    coverPage: parsed.coverPage,
    tableOfContents: parsed.tableOfContents,
    letter: parsed.letter,
    attachmentA: parsed.attachmentA,
    packetTopSlip: parsed.packetTopSlip,
    needsAddress,
    addressSource,
  });
}
