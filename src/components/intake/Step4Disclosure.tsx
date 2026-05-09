import React, { useState } from 'react';
import type { IntakeData } from './IntakeForm';
import { SITE_CONFIG } from '../../config/site';

interface Props {
  data: IntakeData;
  onChange: (field: keyof IntakeData, value: string | boolean | null) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}

const inputClass =
  'w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-950 outline-none transition-colors duration-300 placeholder:text-neutral-400 focus:border-[#7a1c1c]';
const labelClass =
  'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500';

const CROA_TEXT = `CONSUMER CREDIT FILE RIGHTS UNDER STATE AND FEDERAL LAW

You have a right to dispute inaccurate information in your credit report by contacting the credit bureau directly. However, neither you nor any "credit repair" company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report. The credit bureau must remove accurate, negative information from your report only if it is over 7 years old. Bankruptcy information can be reported for 10 years.

You have a right to obtain a copy of your credit report from a credit bureau. You may be charged a reasonable fee. There is no fee, however, if you have been turned down for credit, employment, insurance, or a rental dwelling because of information in your credit report within the preceding 60 days. The credit bureau must provide someone to help you interpret the information in your credit file. You are entitled to receive a free copy of your credit report if you are unemployed and intend to apply for employment in the next 60 days, if you are a recipient of public welfare assistance, or if you have reason to believe that there is inaccurate information in your credit report due to fraud.

You have a right to sue a credit repair organization that violates the Credit Repair Organizations Act. This law prohibits deceptive practices by credit repair organizations.

You have the right to cancel your contract with any credit repair organization for any reason within 3 business days from the date you signed the contract.

RIGHT TO CANCEL

You may cancel this contract without penalty or obligation at any time before midnight of the 3rd business day after the date you sign this contract. To cancel, mail or deliver a signed, dated written notice to:

RAH Operations, LLC
${SITE_CONFIG.address.full}

If you cancel, any money you have paid will be returned within 10 days after we receive your cancellation notice.

CLIENT ACKNOWLEDGMENT

By providing your digital signature below, you confirm that:

1. You have received and read the "Consumer Credit File Rights Under State and Federal Law" disclosure above.
2. You understand you have the right to dispute inaccurate information directly with credit bureaus at no charge.
3. You understand that RAH Operations, LLC cannot guarantee specific outcomes, as results depend on individual circumstances and the credit bureaus' determination.
4. You understand you have 3 business days to cancel this agreement without penalty under the Credit Repair Organizations Act (15 U.S.C. § 1679 et seq.).
5. You authorize RAH Operations, LLC to communicate with credit bureaus, creditors, and collection agencies on your behalf.
6. The information provided in this intake form is accurate and complete to the best of your knowledge.

This digital signature is legally binding under the Electronic Signatures in Global and National Commerce Act (E-SIGN Act, 15 U.S.C. § 7001 et seq.).`;

const Step4Disclosure: React.FC<Props> = ({ data, onChange, onSubmit, onBack, submitting }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.agreedToCroa) e.agreed = 'You must read and agree to the disclosure to proceed';
    if (!data.signatureName.trim()) e.sig = 'Your full legal name is required as your digital signature';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit();
  };

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow-red mb-3">Step 4 of 4</p>
        <h2 className="font-serif-display font-bold text-slate-dark text-2xl sm:text-3xl mb-2">
          Disclosure & Agreement
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Federal law requires that you receive and acknowledge the following disclosure before
          we begin working on your credit. Please read carefully.
        </p>
      </div>

      {/* CROA Disclosure scroll box */}
      <div className="mb-8 h-72 overflow-y-auto border border-neutral-200 bg-neutral-50 p-5 text-xs text-neutral-600 leading-relaxed whitespace-pre-line scroll-smooth">
        {CROA_TEXT}
      </div>

      {/* Agreement checkbox */}
      <div className="mb-8">
        <label className="flex cursor-pointer items-start gap-3">
          <div className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={data.agreedToCroa}
              onChange={(e) => onChange('agreedToCroa', e.target.checked)}
              className="sr-only"
            />
            <div
              className={[
                'h-5 w-5 border-2 flex items-center justify-center transition-colors duration-200',
                data.agreedToCroa ? 'border-luxury-red bg-luxury-red' : 'border-neutral-300 bg-white',
              ].join(' ')}
              onClick={() => onChange('agreedToCroa', !data.agreedToCroa)}
            >
              {data.agreedToCroa && (
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-neutral-700 leading-relaxed">
            I have read and understand the Consumer Credit File Rights Under State and Federal Law
            disclosure above, and I agree to all terms stated therein.
          </span>
        </label>
        {errors.agreed && <p className="mt-2 text-xs text-luxury-red">{errors.agreed}</p>}
      </div>

      {/* Digital Signature */}
      <div className="space-y-8 border-t border-neutral-100 pt-8">
        <div>
          <label className={labelClass}>Digital Signature — Type Your Full Legal Name</label>
          <input
            type="text"
            value={data.signatureName}
            onChange={(e) => onChange('signatureName', e.target.value)}
            className={`${inputClass} font-serif-body text-base italic`}
            placeholder="Type your full legal name to sign"
          />
          <p className="mt-1 text-[10px] text-neutral-400">
            Typing your name constitutes a legally binding digital signature under the E-SIGN Act.
          </p>
          {errors.sig && <p className="mt-1 text-xs text-luxury-red">{errors.sig}</p>}
        </div>

        <div>
          <label className={labelClass}>Date of Agreement</label>
          <input
            type="text"
            value={data.signatureDate}
            readOnly
            className={`${inputClass} cursor-default text-neutral-400`}
          />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-neutral-100 pt-8">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 hover:text-luxury-red transition-colors disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="group relative inline-flex items-center justify-center overflow-hidden border border-neutral-950 bg-neutral-950 text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_18px_45px_rgba(17,17,17,0.16)] before:absolute before:inset-0 before:-translate-x-full before:bg-[#7a1c1c] before:transition-transform before:duration-300 hover:border-[#7a1c1c] hover:before:translate-x-0 disabled:opacity-60 disabled:pointer-events-none"
        >
          <span className="relative z-10">
            {submitting ? 'Submitting…' : 'Submit Application →'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Step4Disclosure;
