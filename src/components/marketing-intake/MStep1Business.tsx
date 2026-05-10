import React from 'react';

interface Props {
  data: {
    businessName: string;
    ownerName: string;
    email: string;
    phone: string;
    businessType: string;
    websiteUrl: string;
    location: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

const BUSINESS_TYPES = [
  'Restaurant / Food & Beverage',
  'Retail / E-commerce',
  'Real Estate',
  'Health & Wellness / Spa',
  'Contractor / Home Services',
  'Professional Services (Law, Finance, etc.)',
  'Beauty / Salon / Barbershop',
  'Automotive',
  'Fitness / Gym',
  'Medical / Dental',
  'Non-Profit',
  'Tech / Startup',
  'Other',
];

const inputClass =
  'w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors placeholder-neutral-600';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-400 mb-2';

const MStep1Business: React.FC<Props> = ({ data, onChange, onNext }) => {
  const isValid = data.businessName.trim() && data.ownerName.trim() && data.email.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClass}>Business Name *</label>
          <input
            type="text"
            value={data.businessName}
            onChange={(e) => onChange('businessName', e.target.value)}
            required
            placeholder="Acme Landscaping LLC"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Owner / Contact Name *</label>
          <input
            type="text"
            value={data.ownerName}
            onChange={(e) => onChange('ownerName', e.target.value)}
            required
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="(602) 555-0100"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Email Address *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            required
            placeholder="jane@yourbusiness.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Business Type</label>
          <select
            value={data.businessType}
            onChange={(e) => onChange('businessType', e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Select industry…</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>City / State</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange('location', e.target.value)}
            placeholder="Scottsdale, AZ"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Current Website URL</label>
          <input
            type="url"
            value={data.websiteUrl}
            onChange={(e) => onChange('websiteUrl', e.target.value)}
            placeholder="https://yourbusiness.com"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-neutral-600">Leave blank if you don't have one yet.</p>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-luxury-red hover:bg-luxury-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
        >
          Continue →
        </button>
      </div>
    </form>
  );
};

export default MStep1Business;
