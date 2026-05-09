import React, { useState } from 'react';
import type { IntakeData } from './IntakeForm';

interface Props {
  data: IntakeData;
  onChange: (field: keyof IntakeData, value: string | boolean | null) => void;
  onNext: () => void;
}

const inputClass =
  'w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-950 outline-none transition-colors duration-300 placeholder:text-neutral-400 focus:border-[#7a1c1c]';
const labelClass =
  'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

const formatSSN = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
};

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const Step1PersonalInfo: React.FC<Props> = ({ data, onChange, onNext }) => {
  const [showSSN, setShowSSN] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.fullName.trim()) e.fullName = 'Required';
    if (!data.dob) e.dob = 'Required';
    if (data.ssn.replace(/\D/g, '').length !== 9) e.ssn = 'Must be 9 digits (XXX-XX-XXXX)';
    if (!data.address.trim()) e.address = 'Required';
    if (!data.city.trim()) e.city = 'Required';
    if (!data.state) e.state = 'Required';
    if (!/^\d{5}$/.test(data.zip)) e.zip = 'Must be 5 digits';
    if (data.phone.replace(/\D/g, '').length < 10) e.phone = 'Must be 10 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow-red mb-3">Step 1 of 4</p>
        <h2 className="font-serif-display font-bold text-slate-dark text-2xl sm:text-3xl mb-2">
          Personal Information
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          This information is used to prepare your dispute letters and verify your identity with
          the credit bureaus. All data is encrypted in transit.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <label className={labelClass}>Full Legal Name</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className={inputClass}
            placeholder="As it appears on your government-issued ID"
          />
          {errors.fullName && <p className="mt-1 text-xs text-luxury-red">{errors.fullName}</p>}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              value={data.dob}
              onChange={(e) => onChange('dob', e.target.value)}
              className={inputClass}
            />
            {errors.dob && <p className="mt-1 text-xs text-luxury-red">{errors.dob}</p>}
          </div>
          <div>
            <label className={labelClass}>Social Security Number</label>
            <div className="relative">
              <input
                type={showSSN ? 'text' : 'password'}
                value={data.ssn}
                onChange={(e) => onChange('ssn', formatSSN(e.target.value))}
                className={`${inputClass} pr-10`}
                placeholder="XXX-XX-XXXX"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowSSN(!showSSN)}
                className="absolute right-0 top-3 text-neutral-400 hover:text-luxury-red transition-colors"
                tabIndex={-1}
                aria-label={showSSN ? 'Hide SSN' : 'Show SSN'}
              >
                {showSSN ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-1 text-[10px] text-neutral-400 leading-tight">
              Used for dispute authorization only — never stored in our database.
            </p>
            {errors.ssn && <p className="mt-1 text-xs text-luxury-red">{errors.ssn}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Current Street Address</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
            className={inputClass}
            placeholder="123 Main St, Apt 4B"
          />
          {errors.address && <p className="mt-1 text-xs text-luxury-red">{errors.address}</p>}
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <label className={labelClass}>City</label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => onChange('city', e.target.value)}
              className={inputClass}
              placeholder="Scottsdale"
            />
            {errors.city && <p className="mt-1 text-xs text-luxury-red">{errors.city}</p>}
          </div>
          <div>
            <label className={labelClass}>State</label>
            <select
              value={data.state}
              onChange={(e) => onChange('state', e.target.value)}
              className={inputClass}
            >
              <option value="">Select</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.state && <p className="mt-1 text-xs text-luxury-red">{errors.state}</p>}
          </div>
          <div>
            <label className={labelClass}>ZIP Code</label>
            <input
              type="text"
              value={data.zip}
              onChange={(e) => onChange('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
              className={inputClass}
              placeholder="85260"
            />
            {errors.zip && <p className="mt-1 text-xs text-luxury-red">{errors.zip}</p>}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', formatPhone(e.target.value))}
              className={inputClass}
              placeholder="(623) 555-0100"
            />
            {errors.phone && <p className="mt-1 text-xs text-luxury-red">{errors.phone}</p>}
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-luxury-red">{errors.email}</p>}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end border-t border-neutral-100 pt-8">
        <button
          onClick={handleNext}
          className="group relative inline-flex items-center justify-center overflow-hidden border border-neutral-950 bg-neutral-950 text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_18px_45px_rgba(17,17,17,0.16)] before:absolute before:inset-0 before:-translate-x-full before:bg-[#7a1c1c] before:transition-transform before:duration-300 hover:border-[#7a1c1c] hover:before:translate-x-0"
        >
          <span className="relative z-10">Continue to Documents →</span>
        </button>
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
