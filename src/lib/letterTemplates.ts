export const BUREAU_ADDRESSES = {
  experianFraud:    { name: 'Experian',   dept: 'Fraud / Identity Theft Unit',    address: 'P.O. Box 9554, Allen, TX 75013' },
  experianDispute:  { name: 'Experian',   dept: 'Consumer Dispute Center',         address: 'P.O. Box 4500, Allen, TX 75013' },
  equifaxFraud:     { name: 'Equifax',    dept: 'Fraud / Identity Theft Unit',     address: 'P.O. Box 105788, Atlanta, GA 30348' },
  equifaxDispute:   { name: 'Equifax',    dept: 'Consumer Dispute Department',     address: 'P.O. Box 740256, Atlanta, GA 30374' },
  transunionFraud:  { name: 'TransUnion', dept: 'Fraud Victim Assistance',         address: 'P.O. Box 2000, Chester, PA 19016' },
  transunionDispute:{ name: 'TransUnion', dept: 'Consumer Dispute Center',         address: 'P.O. Box 2000, Chester, PA 19016' },
  // keep legacy key for backward compat
  transunion:       { name: 'TransUnion', dept: 'Fraud Victim Assistance',         address: 'P.O. Box 2000, Chester, PA 19016' },
} as const;

export const RESPONSE_WINDOWS = {
  '605B': 4,   // business days
  '611':  30,  // calendar days
  '623':  30,  // calendar days
  '609':  15,  // calendar days
  '809':  30,  // calendar days
} as const;

export const TEMPLATE_605B = `[DATE]

[BUREAU NAME]
Attn: Fraud / Identity Theft Unit
[BUREAU ADDRESS]

Re: Identity Theft Block Request — FCRA § 605B (15 U.S.C. § 1681c-2)
    DO NOT REINSERT WITHOUT PRIOR WRITTEN VERIFICATION

CONSUMER INFORMATION:
Full Name:          [CLIENT FULL NAME]
Current Address:    [CLIENT ADDRESS]
                    [CITY, STATE ZIP]
Date of Birth:      [CLIENT DOB]
SSN (Last 4):       XXXX
FTC Report No(s).:  [FTC REPORT NUMBERS]

To Whom It May Concern:

I am a victim of identity theft. Pursuant to 15 U.S.C. § 1681c-2 (FCRA § 605B), you are required to block the fraudulent information listed below from my consumer credit file within four (4) business days of your receipt of this written notice and the accompanying documentation establishing my identity.

I. FRAUDULENT ACCOUNTS — BLOCK REQUIRED

[Numbered list of each fraudulent account in this bureau: Creditor Name | Account # (bureau-specific) | Balance | Status]

[SECTION II — FRAUDULENT ADDRESSES: Include ONLY if unknown_addresses were provided in the context. If none, omit this section entirely.]
II. FRAUDULENT ADDRESSES — REMOVE FROM FILE

The following addresses appearing in my credit file are addresses where I have never resided. They must be removed immediately:

[Numbered list of fraudulent addresses from context]

[SECTION III — FRAUDULENT PHONE NUMBERS: Include ONLY if unknown_phone_numbers were provided in the context. If none, omit this section entirely.]
III. FRAUDULENT PHONE NUMBERS — REMOVE FROM FILE

The following phone numbers appearing in my credit file are numbers I have never used. They must be removed immediately:

[Numbered list of fraudulent phone numbers from context]

[SECTION IV — FRAUDULENT CREDIT INQUIRIES: Include ONLY if unauthorized inquiries for this bureau were provided in the context. If none, omit this section entirely.]
IV. FRAUDULENT CREDIT INQUIRIES — REMOVE FROM FILE

The following credit inquiries appearing in my file were not authorized by me and must be deleted immediately:

[Numbered list: Creditor Name — Date — Bureau]

Please be advised that failure to comply with this request within the statutory four (4) business day period may result in: (1) a formal complaint filed with the Consumer Financial Protection Bureau (CFPB); (2) a complaint filed with the applicable state Attorney General's office; and (3) pursuit of civil damages under FCRA §§ 616 and 617, which provide for statutory damages of $100 to $1,000 per willful violation, plus attorney's fees and costs.

Enclosed:
  1. FTC Identity Theft Report(s) — Report No(s). [FTC REPORT NUMBERS]
  2. Government-issued photo identification
  3. Proof of current address (utility bill)
  4. Social Security card (copy)

This correspondence is being transmitted via USPS Certified Mail with Return Receipt Requested.

Sincerely,

[CLIENT FULL NAME]`;

export const TEMPLATE_611 = `[DATE]

[BUREAU NAME]
Attn: Dispute Department
[BUREAU ADDRESS]

Re: [ROTATE: "Demand for Reinvestigation — FCRA § 611(a)(1) — Immediate Action Required" / "Formal Dispute and Reinvestigation Request under 15 U.S.C. § 1681i" / "FCRA § 611 Reinvestigation Demand — Identity Theft / Inaccurate Reporting"]

CONSUMER INFORMATION:
Full Name:         [CLIENT FULL NAME]
Current Address:   [CLIENT ADDRESS]
                   [CITY, STATE ZIP]
Phone:             [PHONE]
Email:             [EMAIL]
FTC Report No(s).: [FTC REPORT NUMBERS]

To Whom It May Concern:

Pursuant to the Fair Credit Reporting Act, 15 U.S.C. § 1681i (FCRA § 611), I formally dispute the accuracy and/or verifiability of the accounts identified in Attachment A. Each item is inaccurate, unverifiable, and/or the result of identity theft. You are required to conduct a reasonable reinvestigation within thirty (30) calendar days of receipt of this notice.

I. DISPUTED ACCOUNTS

[Numbered list of disputed accounts: Creditor Name | Account # (bureau-specific) | Balance | Status | Reason for dispute. Use only accounts assigned to this bureau.]

II. REINVESTIGATION DEMANDS

For each disputed account:
  1. Conduct a full reinvestigation under § 611(a)(1);
  2. Delete or correct any information that cannot be independently verified;
  3. Provide written notice of results within 5 business days of completion per § 611(a)(6);
  4. Disclose the name, address, and telephone number of each furnisher contacted per § 611(a)(6)(B)(ii);
  5. If any item is verified, provide the furnisher's name and a complete description of the procedure used to determine accuracy per § 611(a)(7).

Verification without providing original source documentation from the furnisher is legally insufficient under § 611(a)(7) and will be treated as willful non-compliance.

Please be advised that failure to comply within the statutory period may result in: (1) a formal complaint filed with the Consumer Financial Protection Bureau (CFPB); (2) a complaint filed with the applicable state Attorney General's office; and (3) pursuit of civil damages under FCRA §§ 616 and 617, which provide for statutory damages of $100 to $1,000 per willful violation, plus attorney's fees and costs.

Enclosed:
  1. FTC Identity Theft Report(s) — Report No(s). [FTC REPORT NUMBERS]
  2. Government-issued photo identification
  3. Proof of current address (utility bill)
  4. Social Security card (copy)
  5. Attachment A — Disputed Accounts Summary

This correspondence is being transmitted via USPS Certified Mail with Return Receipt Requested.

Sincerely,

/s/ [CLIENT FULL NAME]
[CLIENT FULL NAME]`;

export const TEMPLATE_623 = `[DATE]

[FURNISHER NAME]
Attn: FCRA Compliance Department
[FURNISHER ADDRESS]

Re: [ROTATE: "Notice of Disputed Account(s) — FCRA § 623(a)(8) Furnisher Obligations" / "Demand to Cease Reporting — FCRA § 623(b) — Identity Theft Notification" / "FCRA § 623 Furnisher Dispute — Fraudulent Account Removal Demand"]

CONSUMER INFORMATION:
Full Name:         [CLIENT FULL NAME]
Current Address:   [CLIENT ADDRESS]
                   [CITY, STATE ZIP]
Phone:             [PHONE]
Email:             [EMAIL]
FTC Report No(s).: [FTC REPORT NUMBERS]

To Whom It May Concern:

I am a victim of identity theft. Pursuant to the Fair Credit Reporting Act, 15 U.S.C. § 1681s-2(a)(8) and § 1681s-2(b) (FCRA § 623), I formally dispute the accuracy of the account(s) identified in Attachment A, which were opened or used without my authorization and are being furnished to one or more consumer reporting agencies.

I. DISPUTED ACCOUNTS

[Numbered list: Creditor Name | Account # | Balance | Date Opened | Status | Reason for Dispute. Use only accounts this furnisher reports.]

II. YOUR OBLIGATIONS UNDER FCRA § 623

Upon receiving this notice with accompanying documentation, you are legally required to:
  1. Conduct a reasonable investigation of each disputed item within 30 calendar days;
  2. Review all relevant information submitted with this notice;
  3. Report results of your investigation to every consumer reporting agency to which you furnished the information;
  4. Correct or delete any information determined to be inaccurate, incomplete, or unverifiable;
  5. Cease reporting any information you know or reasonably should know resulted from identity theft.

III. DEMANDED ACTION

  1. Immediately cease furnishing the disputed account(s) to Equifax, Experian, and TransUnion;
  2. Direct all three bureaus to delete and block the disputed tradeline(s);
  3. Provide written confirmation of deletion/correction to me within 30 calendar days;
  4. Provide copies of any documents bearing my signature that you believe authorize the disputed account(s).

Please be advised that failure to comply may result in: (1) a formal complaint filed with the Consumer Financial Protection Bureau (CFPB); (2) a complaint filed with the applicable state Attorney General's office; and (3) pursuit of civil damages under FCRA §§ 616 and 617, which provide for statutory damages of $100 to $1,000 per willful violation, plus attorney's fees and costs.

Enclosed:
  1. FTC Identity Theft Report(s) — Report No(s). [FTC REPORT NUMBERS]
  2. Government-issued photo identification
  3. Proof of current address (utility bill)
  4. Social Security card (copy)
  5. Attachment A — Disputed Accounts (Furnisher-Specific)

This correspondence is being transmitted via USPS Certified Mail with Return Receipt Requested.

Sincerely,

/s/ [CLIENT FULL NAME]
[CLIENT FULL NAME]`;

export const TEMPLATE_609 = `[DATE]

[BUREAU NAME]
Attn: Consumer Disclosure Department
[BUREAU ADDRESS]

Re: [ROTATE: "Full File Disclosure Request — FCRA § 609(a)(1)" / "Consumer File Disclosure Request under 15 U.S.C. § 1681g" / "FCRA § 609(a)(1) — Complete Consumer File Requested"]

CONSUMER INFORMATION:
Full Name:       [CLIENT FULL NAME]
Current Address: [CLIENT ADDRESS]
                 [CITY, STATE ZIP]
Phone:           [PHONE]
Email:           [EMAIL]

To Whom It May Concern:

Pursuant to the Fair Credit Reporting Act, 15 U.S.C. § 1681g (FCRA § 609(a)(1)), I formally request a complete copy of my consumer file as it exists in your records as of the date of this letter. You are required to provide this disclosure within fifteen (15) calendar days of receipt.

I. INFORMATION REQUESTED

Please include:
  1. All tradelines and collection items, including active, suppressed, and previously blocked accounts;
  2. The name, address, and telephone number of each furnisher that provided information in my file;
  3. The date each item was first reported and the most recent update date;
  4. Any fraud alerts, credit freezes, or identity theft flags currently in place;
  5. Any Metro 2 fraud coding (e.g., XB, XH) applied to any tradeline, including effective dates;
  6. Any reinsertion history, including date(s) of reinsertion, furnisher identity, and documentation relied upon;
  7. All public record items and credit inquiries;
  8. The complete list of parties who accessed my file in the past 24 months.

II. PURPOSE

This request is made in connection with an ongoing identity theft dispute. I am reviewing my file to confirm that all previously blocked items remain blocked, that no unauthorized reinsertions have occurred, and that all consumer information is accurate and complete.

Please mail the complete file disclosure — not a summary — to my current address listed above.

Enclosed:
  1. Government-issued photo identification
  2. Proof of current address (utility bill)

This correspondence is being transmitted via USPS Certified Mail with Return Receipt Requested.

Sincerely,

/s/ [CLIENT FULL NAME]
[CLIENT FULL NAME]`;

export const TEMPLATE_809 = `[DATE]

[COLLECTION AGENCY NAME]
Attn: Compliance / Consumer Validation Department
[COLLECTOR ADDRESS]

Re: [ROTATE: "Debt Validation Demand — FDCPA § 809(b) — Cease Collection Pending Validation" / "Formal Validation Request — 15 U.S.C. § 1692g(b)" / "FDCPA § 809(b) Notice — Disputed Debt / Validation Required"]
    Account: [AGENCY ACCOUNT # / ORIGINAL CREDITOR — use bureau-specific account number]

CONSUMER INFORMATION:
Full Name:       [CLIENT FULL NAME]
Current Address: [CLIENT ADDRESS]
                 [CITY, STATE ZIP]
Phone:           [PHONE]
Email:           [EMAIL]

To Whom It May Concern:

I dispute this alleged debt in its entirety and hereby demand validation pursuant to 15 U.S.C. § 1692g(b) (FDCPA § 809(b)). This constitutes a timely written request for validation. Until you provide complete validation as set forth below, you must cease all collection activity, including any reporting or continued reporting of this alleged debt to any consumer reporting agency.

I. VALIDATION DEMANDED

Please provide all of the following:
  1. The name and current address of the original creditor;
  2. A complete itemized breakdown of the alleged debt: principal, interest, fees, and any other charges;
  3. Copies of any written agreements or documents bearing my signature establishing my liability;
  4. Proof that your organization is licensed to collect debts in my state, including your license number and registered agent;
  5. The date you first began reporting this alleged debt to any consumer reporting agency, and the names of all agencies to which you have reported;
  6. If this is a purchased debt: a complete chain of title from the original creditor to your organization.

II. CEASE COLLECTION NOTICE

Until validation is provided, you must immediately cease all collection activity, including:
  - Continued reporting to Equifax, Experian, or TransUnion;
  - Any telephone calls, letters, or other communications attempting collection.

Failure to validate and continued collection activity without validation constitutes willful violation of the FDCPA, subjecting you to actual damages, statutory damages of $1,000 per violation, plus attorney's fees and costs under 15 U.S.C. § 1692k.

This letter is not a refusal to pay a legitimate debt — it is a formal notice that your claim is disputed and validation is required before any collection activity may continue.

This correspondence is being transmitted via USPS Certified Mail with Return Receipt Requested.

Sincerely,

/s/ [CLIENT FULL NAME]
[CLIENT FULL NAME]`;

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

§ 605B LETTER — CRITICAL RULES (override all others for letterType "605B"):

1. DATE-FIRST FORMAT: The letter opens with the date on the first line. No client address block at the top. The bureau name and address come after the date.

2. CONSUMER INFO BLOCK: After the bureau address, include a labeled consumer information block with Full Name, Current Address, Date of Birth, SSN (Last 4 as XXXX), and FTC Report No(s). — use actual values from client data.

3. FOUR BUSINESS DAYS: The phrase "four (4) business days" is MANDATORY in the opening paragraph. Never shorten to "4 days" or omit.

4. CONDITIONAL SECTIONS — only include if data exists in context:
   - Section II (Fraudulent Addresses): include ONLY if FRAUDULENT ADDRESSES section is provided in context with actual addresses. Omit entirely if none.
   - Section III (Fraudulent Phone Numbers): include ONLY if FRAUDULENT PHONE NUMBERS section is provided in context with actual numbers. Omit entirely if none.
   - Section IV (Fraudulent Credit Inquiries): include ONLY if UNAUTHORIZED INQUIRIES section is provided in context with actual entries. Omit entirely if none.

5. CFPB/AG/CIVIL ACTION WARNING: The paragraph warning about CFPB complaints, Attorney General complaints, and civil damages under §§ 616 and 617 is MANDATORY. Always include it verbatim.

6. ENCLOSURES: Always list FTC Identity Theft Report(s) with actual report number(s), photo ID, proof of address (utility bill), and Social Security card.

7. USPS CERTIFIED MAIL: Always include "This correspondence is being transmitted via USPS Certified Mail with Return Receipt Requested."

8. SIGNATURE: For §605B letters, sign as "Sincerely, [CLIENT FULL NAME]" — NO /s/ prefix. No date under signature.

9. NO ATTACHMENT A REFERENCE: §605B letters list fraudulent accounts directly in the letter body under Section I. Do not reference "Attachment A" in the main letter body.

ROTATING "Re:" LINES — use a different variant for each bureau letter so no two are identical:

§ 611 VARIANTS (pick one per letter, no repeats across Equifax/Experian/TransUnion):
- "Re: Demand for Reinvestigation — FCRA § 611(a)(1) — Immediate Action Required"
- "Re: Formal Dispute and Reinvestigation Request under 15 U.S.C. § 1681i"
- "Re: FCRA § 611 Reinvestigation Demand — Identity Theft / Inaccurate Reporting"

§ 623 VARIANTS:
- "Re: Notice of Disputed Account(s) — FCRA § 623(a)(8) Furnisher Obligations"
- "Re: Demand to Cease Reporting — FCRA § 623(b) — Identity Theft Notification"
- "Re: FCRA § 623 Furnisher Dispute — Fraudulent Account Removal Demand"

§ 609 VARIANTS:
- "Re: Full File Disclosure Request — FCRA § 609(a)(1)"
- "Re: Consumer File Disclosure Request under 15 U.S.C. § 1681g"
- "Re: FCRA § 609(a)(1) — Complete Consumer File Requested"

§ 809 VARIANTS:
- "Re: Debt Validation Demand — FDCPA § 809(b) — Cease Collection Pending Validation"
- "Re: Formal Validation Request — 15 U.S.C. § 1692g(b)"
- "Re: FDCPA § 809(b) Notice — Disputed Debt / Validation Required"
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
