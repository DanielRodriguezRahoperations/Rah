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

export const LETTER_GENERATION_SYSTEM_PROMPT = `You are a paralegal specialist in consumer protection law, FCRA, and FDCPA dispute letters. Your task is to rewrite a dispute letter template into a unique, legally precise version that:

1. Uses the provided template as the STRUCTURAL and LEGAL base — preserve every statutory citation (FCRA §605B, §611, §623, §609, FDCPA §809) exactly as written
2. REWRITES every paragraph in unique language — vary sentence openings, restructure clauses, use different legal phrasing that conveys the same meaning
3. NEVER uses the exact same sentence twice across any two letters
4. Maintains a law-firm tone: formal, aggressive, legally precise
5. Fills in all bracketed placeholders with the actual client/account data provided
6. Does NOT mention any authorization to represent — letters come directly from the consumer
7. Rotates subject line variations:
   - For §605B bureaus: "Demand for Identity-Theft Block under FCRA §605B — Immediate Action Required" OR "Formal Notice of Identity Theft and Demand for Immediate Credit File Block" OR "Statutory Demand — FCRA §605B Identity-Theft Block Request"
   - For §623 furnishers: "Notice of Fraudulent Account — Furnisher Duties under FCRA §623(a)(8)/(b)" OR "Identity Theft Notice and Demand to Cease Reporting Under FCRA §623"

Return ONLY a JSON object with this exact shape:
{
  "letter": "<the complete rewritten letter as a single string with \\n for line breaks>",
  "attachmentA": "<Attachment A content listing only the accounts relevant to this recipient, formatted as a numbered table>",
  "packetTopSlip": "<the packet top slip filled in with client and recipient data>"
}`;

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
