export const BUREAU_ADDRESSES = {
  experianFraud:   { name: 'Experian',   dept: 'Fraud / Identity Theft Unit',  address: 'P.O. Box 9554, Allen, TX 75013' },
  experianDispute: { name: 'Experian',   dept: 'Dispute Department',            address: 'P.O. Box 4500, Allen, TX 75013' },
  equifaxFraud:    { name: 'Equifax',    dept: 'Fraud / Identity Theft Unit',   address: 'P.O. Box 105788, Atlanta, GA 30348' },
  equifaxDispute:  { name: 'Equifax',    dept: 'Dispute Department',            address: 'P.O. Box 740256, Atlanta, GA 30374' },
  transunion:      { name: 'TransUnion', dept: 'Fraud / Identity Theft Unit',   address: 'P.O. Box 2000, Chester, PA 19016' },
} as const;

export const RESPONSE_WINDOWS = {
  '605B': 4,   // business days
  '611':  30,  // calendar days
  '623':  30,  // calendar days
  '609':  15,  // calendar days
  '809':  30,  // calendar days
} as const;

export const TEMPLATE_605B = `[CLIENT FULL NAME]
[CLIENT ADDRESS]
[CITY, STATE ZIP]
[EMAIL] • [PHONE]
Date: [DATE]
VIA CERTIFIED MAIL – RETURN RECEIPT REQUESTED
[Tracking #: __________]

[BUREAU NAME]
Attn: Fraud / Identity Theft Unit
[BUREAU ADDRESS]

RE: REQUEST FOR IMMEDIATE BLOCK UNDER FCRA §605B (15 U.S.C. §1681c-2); DO NOT REINSERT WITHOUT PRIOR WRITTEN VERIFICATION

To Whom It May Concern:

I am a victim of identity theft. Pursuant to FCRA §605B, you are required to block information in my file that results from identity theft within four (4) business days of your receipt of adequate documentation.

Enclosed are the following:

  1. FTC Identity Theft Report for [CLIENT NAME];
  2. Government-issued photo ID (copy);
  3. Proof of current address (copy);
  4. Attachment A – List of fraudulent accounts/tradelines to be blocked.

ACTION REQUESTED:

  1. Block each tradeline listed in Attachment A within 4 business days;
  2. Apply correct Metro 2 fraud coding (e.g., "XB – Blocked for Fraud/Identity Theft");
  3. Provide written confirmation within five (5) business days that the items are blocked and will not be reinserted absent prior written verification to me;
  4. For any future reinsertion, provide advance notice and include the identity of the furnisher and the specific documentation relied upon per FCRA §611(a)(5)(B).

For avoidance of doubt, this request is made under FCRA §605B. In parallel, I am also submitting a dispute under §611 for any related items that remain.

Please send all correspondence to the mailing address above.

Sincerely,

[CLIENT NAME]

Enclosures: FTC Report; ID; Proof of Address; Attachment A`;

export const TEMPLATE_611 = `[CLIENT FULL NAME]
[CLIENT ADDRESS]
[CITY, STATE ZIP]
[EMAIL] • [PHONE]
Date: [DATE]
VIA CERTIFIED MAIL – RETURN RECEIPT REQUESTED
[Tracking #: __________]

[BUREAU NAME]
Attn: Dispute Department
[BUREAU ADDRESS]

RE: FCRA §611 DISPUTE & REINVESTIGATION – FRAUDULENT/UNAUTHORIZED ACCOUNTS

To Whom It May Concern:

I dispute the accuracy and completeness of the items in my credit file identified in Attachment A. These resulted from identity theft and are not mine. I have enclosed copies of my FTC Identity Theft Report, my government ID, and proof of address.

Under FCRA §611, please reinvestigate and delete/correct the Disputed Items within the statutory period. Please also ensure Metro 2 fraud coding is applied where applicable and provide me written results of your investigation.

If any Disputed Item is verified, please provide the furnisher's name, address, and the documentation relied upon to verify the account, as well as notice of my rights regarding reinsertion under §611(a)(5)(B).

Sincerely,

[CLIENT NAME]

Enclosures: FTC Report; ID; Proof of Address; Attachment A`;

export const TEMPLATE_623 = `[CLIENT FULL NAME]
[CLIENT ADDRESS]
[CITY, STATE ZIP]
[EMAIL] • [PHONE]
Date: [DATE]
VIA CERTIFIED MAIL – RETURN RECEIPT REQUESTED
[Tracking #: __________]

[FURNISHER NAME]
Attn: Fraud/Identity Theft or FCRA Compliance
[FURNISHER ADDRESS]

RE: FCRA §623(a)(8) & §623(b) – IDENTITY THEFT NOTICE AND DEMAND TO CEASE REPORTING / CORRECT TRADELINE(S)
Accounts: see Attachment A (only accounts you report)

To Whom It May Concern:

I am a victim of identity theft. The accounts identified in Attachment A were opened or used without my authorization and are being reported to one or more consumer reporting agencies. Enclosed are copies of my FTC Identity Theft Report, my government ID, and proof of current address.

Pursuant to FCRA §623(a)(8) and §623(b), upon receiving notice of identity theft you must:

  1. Conduct a reasonable investigation;
  2. Delete or block any information that you cannot verify as accurate and authorized;
  3. Cease reporting information you know or reasonably should know is the result of identity theft;
  4. Notify all CRAs to which you furnished the information so they can delete/correct the reporting.

ACTION REQUESTED:

  1. Immediately cease reporting the fraudulent tradeline(s);
  2. Notify Experian, Equifax, and TransUnion to delete/block the item(s);
  3. Provide written confirmation of deletion/correction to me;
  4. Provide copies of any documentation bearing my signature that you believe authorizes the account(s).

Failure to comply may result in regulatory complaints and legal action for willful or negligent noncompliance under the FCRA.

Sincerely,

[CLIENT NAME]

Enclosures: FTC Report; ID; Proof of Address; Attachment A (furnisher-specific)`;

export const TEMPLATE_609 = `[CLIENT FULL NAME]
[CLIENT ADDRESS]
[CITY, STATE ZIP]
[EMAIL] • [PHONE]
Date: [DATE]
VIA CERTIFIED MAIL – RETURN RECEIPT REQUESTED
[Tracking #: __________]

[BUREAU NAME]
Attn: Disclosure Department
[BUREAU ADDRESS]

RE: FCRA §609(a)(1) REQUEST – FULL FILE DISCLOSURE

To Whom It May Concern:

Pursuant to FCRA §609(a)(1), please provide a complete copy of my file as of the date of this request, including but not limited to:

  1. All tradelines and collection items (current and suppressed);
  2. Furnisher names, addresses, dates first reported, and date of last update;
  3. Any fraud alerts, credit freezes, and internal fraud flags;
  4. Any "blocked for identity theft" coding (e.g., Metro 2 XB) and the effective dates;
  5. Any reinsertion history/logs, including date(s) of reinsertion, furnisher identity, and documentation relied upon.

I have enclosed copies of my government ID and proof of address for identity verification. Please mail the full file disclosure to the address above.

Sincerely,

[CLIENT NAME]

Enclosures: ID; Proof of Address`;

export const TEMPLATE_809 = `[CLIENT FULL NAME]
[CLIENT ADDRESS]
[CITY, STATE ZIP]
[EMAIL] • [PHONE]
Date: [DATE]
VIA CERTIFIED MAIL – RETURN RECEIPT REQUESTED
[Tracking #: __________]

[COLLECTION AGENCY NAME]
Attn: Compliance / Validation
[COLLECTOR ADDRESS]

RE: FDCPA §809(b) VALIDATION REQUEST AND CEASE COLLECTION PENDING VERIFICATION
Account: [AGENCY ACCOUNT # / ORIGINAL CREDITOR]

To Whom It May Concern:

I dispute this alleged debt in its entirety. This letter is a timely request under 15 U.S.C. §1692g(b) (FDCPA §809(b)) for validation. Until you provide proper validation, you must cease all collection activities, including reporting or causing to be reported any information to consumer reporting agencies.

Please provide:

  1. The name and address of the original creditor;
  2. The amount of the alleged debt with an itemized breakdown;
  3. Copies of any documents bearing my signature or that establish my liability;
  4. Your authority to collect in my state;
  5. The date you began furnishing information to any CRA and where.

If you cannot validate, you must cease collection and request deletion of any reporting you initiated. This letter is not a refusal to pay; it is a notice that your claim is disputed.

Sincerely,

[CLIENT NAME]`;

export const PACKET_TOP_SLIP_TEMPLATE = `IDENTITY THEFT – FCRA §605B BLOCK REQUEST
DO NOT REINSERT WITHOUT PRIOR WRITTEN VERIFICATION TO CONSUMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Recipient:  [RECIPIENT NAME]
Consumer:   [CLIENT FULL NAME]  |  Last 4 SSN: XXXX
Enclosures: FTC Report  •  ID  •  Proof of Address  •  Attachment A
Mailed:     [DATE] via Certified Mail  [Tracking #: __________]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

export const LETTER_GENERATION_SYSTEM_PROMPT = `
You are operating as elite consumer protection counsel for a credit repair firm. Generate legally airtight, court-ready dispute letters on behalf of clients who are victims of identity theft and/or inaccurate credit reporting.

CORE STRATEGY — FOLLOW AT ALL TIMES:

1. USE THE BEST LEGAL STRATEGY AVAILABLE
   - Mirror elite consumer attorney language at all times
   - Never use template-sounding or generic language
   - Rotate phrasing, structure, and sentence order across bureau letters so each is unique — never identical
   - Exploit every applicable law: FCRA §605B, §611, §623, §609(a)(1), FDCPA §809, Metro 2 Compliance

2. NEVER ADMIT LIABILITY
   - Only dispute, verify, or demand deletion
   - Never acknowledge debt ownership
   - Never use language that could be interpreted as ratification of an account

3. LAW-FIRM TONE, NOT REPAIR TONE
   - Formal, aggressive, precise legal language
   - Every letter is a legal instrument and potential court exhibit
   - Bureau letters: address to "ATTN: FCRA Compliance / Identity Theft Unit"
   - Furnisher letters: address to "ATTN: FCRA Compliance Department"

4. BUILD A COURT-READY PAPER TRAIL
   - Reference all prior dispute dates, FTC report numbers, and certified mail submissions
   - Cite specific FCRA violation sections and statutory damages where applicable
   - Include response deadlines in every letter

5. ESCALATION BY ROUND
   - Round 1: Full legal demand, identity theft block, §605B/§623 language
   - Round 2: Reference prior dispute date and non-compliance, escalate reinvestigation demand, cite failure to act in prior round
   - Round 3: Add explicit CFPB complaint threat, reference two prior rounds, cite §616 willful noncompliance, demand written method of verification
   - Round 4: Maximum escalation — reference all prior rounds, state legal action is being prepared, cite $100–$1,000 statutory damages per willful violation under §616

6. USE ALL CLIENT DOCUMENTS INTELLIGENTLY
   - Reference ALL uploaded FTC Identity Theft Report numbers (there may be more than one)
   - If a police report exists, reference the report number, agency, officer name, and date
   - If bureau or creditor response letters were uploaded, analyze their claims and directly refute them
   - Challenge method of verification under §611(a)(7)
   - Challenge Metro 2 compliance under §607(b)
   - Demand original source documentation
   - Never let a prior bureau response go unaddressed

7. CLIENT DATA — USE ACTUAL VALUES, NEVER PLACEHOLDERS
   - Always use the client's real full name, current address, DOB, SSN last 4
   - Always list enclosures: FTC Identity Theft Report(s), government-issued photo ID, Social Security card, proof of current address (utility bill)
   - Add police report to enclosures if one was uploaded

8. METRO 2 CODING
   - For all identity theft blocks, demand Metro 2 XB coding
   - For inaccuracy disputes, challenge Metro 2 formatting under §607(b)

COVER LETTER HEADERS (rotate — never identical across bureaus):
- Bureaus: "Demand for Identity-Theft Block under FCRA §605B — Immediate Action Required"
- Furnishers: "Notice of Fraudulent Account — Furnisher Duties under FCRA §623(a)(8)/(b)"
- Reinsertion: "Legal Notice of Unauthorized Reinsertion — Willful FCRA Violation"

SIGNATURE BLOCK — every letter must end with:
Sincerely,

/s/ [CLIENT FULL NAME]
[CLIENT FULL NAME]
[DATE]

The /s/ prefix is the standard legal electronic signature notation under the E-SIGN Act (15 U.S.C. §7001).
`;

export function getTemplate(letterType: string): string {
  switch (letterType) {
    case '605B': return TEMPLATE_605B;
    case '611':  return TEMPLATE_611;
    case '623':  return TEMPLATE_623;
    case '609':  return TEMPLATE_609;
    case '809':  return TEMPLATE_809;
    default: throw new Error(`Unknown letter type: ${letterType}`);
  }
}

export interface ClientData {
  fullName: string;
  address: string;
  dob: string;
  ssnLast4: string;
}

export interface AccountData {
  creditorName: string;
  accountNumber: string;
  accountLast4: string;
}

export interface ExtraFields {
  date: string;
  bureauAddress?: string;
  furnisherName?: string;
  furnisherAddress?: string;
  ftcReportNumbers: string;
  policeReportNumber?: string;
  policeAgency?: string;
  originalDisputeDate?: string;
}

export interface AdvancedTemplate {
  displayName: string;
  recipientType: 'bureau' | 'furnisher';
  responseWindowDays: number;
  generate: (client: ClientData, account: AccountData, extras: ExtraFields) => string;
}

export const ADVANCED_TEMPLATES: Record<string, AdvancedTemplate> = {
  '605b_id_theft_block': {
    displayName: '§605B Identity Theft Block (Bureau)',
    recipientType: 'bureau',
    responseWindowDays: 4,
    generate: (client, account, extras) => `
${client.fullName}
${client.address}
DOB: ${client.dob}
SSN: XXX-XX-${client.ssnLast4}
Date: ${extras.date}

To:
${extras.bureauAddress}

RE: Request for Permanent Blocking of Fraudulent Account under FCRA §605B

To Whom It May Concern,

This letter serves as my formal request to permanently block the fraudulent account listed below from my consumer credit file pursuant to FCRA §605B. I am the victim of identity theft and did not open or authorize the following account:

Fraudulent Account to be Permanently Blocked:
${account.creditorName} — Account #${account.accountNumber}

This account was reported without my knowledge or consent and must be permanently blocked and deleted. I have enclosed my FTC Identity Theft Report(s) (${extras.ftcReportNumbers}) and all legally required supporting documentation.${extras.policeReportNumber ? ` I have also enclosed ${extras.policeAgency} Report #${extras.policeReportNumber} documenting this identity theft.` : ''}

Under FCRA §605B, you are required to act within 4 business days. I also demand that this account be coded Metro 2 XB upon blocking.

Enclosures:
- FTC Identity Theft Report(s)
- Government-issued photo ID
- Social Security card
- Proof of current address${extras.policeReportNumber ? `\n- Police Report #${extras.policeReportNumber}` : ''}

Sincerely,

/s/ ${client.fullName}
${client.fullName}
${extras.date}
`,
  },

  '605b_furnisher_block': {
    displayName: '§605B Identity Theft Block (Furnisher)',
    recipientType: 'furnisher',
    responseWindowDays: 4,
    generate: (client, account, extras) => `
${client.fullName}
${client.address}
DOB: ${client.dob}
SSN (Last 4): ${client.ssnLast4}
Date: ${extras.date}

ATTN: FCRA Compliance Department
${extras.furnisherName}
${extras.furnisherAddress}

Re: Identity Theft Deletion Demand Under FCRA §605B — Account #${account.accountNumber}

To Whom It May Concern,

This letter serves as my formal request under FCRA §605B to immediately and permanently block all reporting of the above-referenced account, which was fraudulently opened in my name. This account was included in my FTC Identity Theft Report(s) (${extras.ftcReportNumbers}), and I have never authorized or accessed this account in any form.${extras.policeReportNumber ? ` This identity theft was also reported to ${extras.policeAgency}, Report #${extras.policeReportNumber}.` : ''}

Pursuant to FCRA §605B, you are legally obligated to block the reporting of any information resulting from identity theft within four (4) business days of receipt of my documentation.

Enclosed are:
- FTC Identity Theft Report(s)
- Government-issued photo ID
- Social Security card
- Proof of current address${extras.policeReportNumber ? `\n- Police Report #${extras.policeReportNumber}` : ''}

Please confirm in writing that all data related to this account has been blocked from all consumer reporting agencies. Continued furnishing of this information is unlawful under federal law.

Sincerely,

/s/ ${client.fullName}
${client.fullName}
${extras.date}
`,
  },

  '611_reinsertion_prevention_bureau': {
    displayName: '§611(a)(5)(B) Reinsertion Prevention (Bureau)',
    recipientType: 'bureau',
    responseWindowDays: 5,
    generate: (client, account, extras) => `
${client.fullName}
${client.address}
DOB: ${client.dob}
SSN: XXX-XX-${client.ssnLast4}
Date: ${extras.date}

To:
${extras.bureauAddress}

Re: Prevention of Unauthorized Reinsertion — ${account.creditorName} (Fraudulent Account)

Dear FCRA Compliance Officer:

This is a formal legal notice pursuant to FCRA §611(a)(5)(B). I am instructing you to block any future attempts to reinsert the fraudulent ${account.creditorName} account ending in ${account.accountLast4} into my consumer file without full compliance with federal law.

This account was disputed as fraudulent and fully documented in my identity theft block request submitted on ${extras.originalDisputeDate}, which included:
- FTC Identity Theft Reports (${extras.ftcReportNumbers})
- Government-issued photo ID, Social Security card, and utility bill
- A signed declaration under penalty of perjury${extras.policeReportNumber ? `\n- ${extras.policeAgency} Report #${extras.policeReportNumber}` : ''}

This account does not belong to me and was the result of identity theft. Under FCRA §605B it must remain permanently blocked. If it has already been removed, no reinsertion may occur without meeting all conditions under §611(a)(5)(B), including advance written notice to me.

This letter constitutes formal notification that any reinsertion without proper procedure will be treated as knowing and willful noncompliance subject to liability under FCRA §§616 and 617.

Sincerely,

/s/ ${client.fullName}
${client.fullName}
${extras.date}
`,
  },

  '611_reinsertion_prevention_furnisher': {
    displayName: '§611(a)(5)(B) Reinsertion Prevention (Furnisher)',
    recipientType: 'furnisher',
    responseWindowDays: 5,
    generate: (client, account, extras) => `
${client.fullName}
${client.address}
DOB: ${client.dob}
SSN (Last 4): ${client.ssnLast4}
Date: ${extras.date}

ATTN: FCRA Compliance Department
${extras.furnisherName}
${extras.furnisherAddress}

Re: Notice of Reinsertion Prohibition — FCRA §611(a)(5)(B) — Account #${account.accountNumber}

To Whom It May Concern,

This notice formally prohibits the reinsertion of any data associated with the fraudulent account referenced above into any consumer reporting agency database unless full compliance is met with FCRA §611(a)(5)(B), which requires:

1. Certification of accuracy and complete authorization from your institution; and
2. Formal written notice to me no fewer than 5 business days prior to reinsertion.

Failure to meet these obligations will be treated as a willful violation of the FCRA and immediately reported to the Consumer Financial Protection Bureau and applicable state regulatory authorities.

Sincerely,

/s/ ${client.fullName}
${client.fullName}
${extras.date}
`,
  },

  '611_reinsertion_violation': {
    displayName: '§611 Reinsertion Violation — Account Was Reinserted (Bureau)',
    recipientType: 'bureau',
    responseWindowDays: 30,
    generate: (client, account, extras) => `
${client.fullName}
${client.address}
DOB: ${client.dob}
SSN: XXX-XX-${client.ssnLast4}
Date: ${extras.date}

To:
${extras.bureauAddress}

RE: FCRA §611(a)(5)(B) Violation — Unauthorized Reinsertion of Previously Blocked Account
${account.creditorName} — Account Ending in ${account.accountLast4}

Dear FCRA Compliance Officer:

This letter is a formal legal complaint and demand for immediate corrective action. The account referenced above was previously disputed as fraudulent, fully documented with FTC Identity Theft Reports (${extras.ftcReportNumbers}) submitted on ${extras.originalDisputeDate}, and was blocked and deleted from my consumer credit file at that time.

I have now discovered that this account has been reinserted into my credit file without the legally required advance written notice, in direct violation of FCRA §611(a)(5)(B). This constitutes a knowing and willful violation of federal law for which you are liable under FCRA §616.

I hereby demand:
1. Immediate re-deletion of this account from my credit file;
2. Written confirmation of deletion within 30 days;
3. A written explanation of how this reinsertion occurred and who certified its accuracy.

Failure to comply will result in:
- A formal complaint filed with the Consumer Financial Protection Bureau (CFPB)
- A formal complaint filed with the Federal Trade Commission (FTC)
- Pursuit of statutory damages under FCRA §616 of $100–$1,000 per willful violation, plus attorney fees

I reserve all legal rights and remedies under the FCRA and applicable state law.

Sincerely,

/s/ ${client.fullName}
${client.fullName}
${extras.date}
`,
  },

  '623_furnisher_deletion': {
    displayName: '§623 Furnisher Deletion Request',
    recipientType: 'furnisher',
    responseWindowDays: 30,
    generate: (client, account, extras) => `
${client.fullName}
${client.address}
DOB: ${client.dob}
SSN (Last 4): ${client.ssnLast4}
Date: ${extras.date}

ATTN: FCRA Compliance Department
${extras.furnisherName}
${extras.furnisherAddress}

Re: FCRA §623 Furnisher Deletion Request — Account #${account.accountNumber}

To Whom It May Concern,

I am formally notifying you that the account referenced above was fraudulently opened in my name and was included in my official FTC Identity Theft Report(s) (${extras.ftcReportNumbers}).${extras.policeReportNumber ? ` This matter was also reported to ${extras.policeAgency}, Report #${extras.policeReportNumber}.` : ''}

Under FCRA §623, as the furnisher of this information, you are legally obligated to cease all reporting and permanently delete this account from all consumer reporting agencies. Failure to investigate, suppress, and delete this fraudulent account constitutes a violation of federal law.

This demand is supported by full documentation and will be enforced through formal complaints with the CFPB and legal action under FCRA §616 if ignored.

Sincerely,

/s/ ${client.fullName}
${client.fullName}
${extras.date}
`,
  },
};
