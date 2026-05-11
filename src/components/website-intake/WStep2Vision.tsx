import React from 'react';

interface Props {
  data: {
    siteFeeling: string;
    targetCustomer: string;
    primaryAction: string;
    primaryGoal: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRIMARY_ACTIONS = [
  'Book a call',
  'Buy a product',
  'Submit an inquiry',
  'Learn about us',
  'Other',
];

const PRIMARY_GOALS = [
  'Generate leads',
  'Sell products',
  'Build credibility',
  'Book appointments',
  'Other',
];

const inputClass =
  'w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors placeholder-neutral-600';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-400 mb-2';

const WStep2Vision: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const isValid = data.siteFeeling.trim() && data.targetCustomer.trim() && data.primaryGoal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-neutral-400 font-serif-body leading-relaxed">
        Help us understand the look, feel, and purpose of your site. The more specific, the better.
      </p>

      <div>
        <label className={labelClass}>How should your site feel? (3 words) *</label>
        <input
          type="text"
          value={data.siteFeeling}
          onChange={(e) => onChange('siteFeeling', e.target.value)}
          required
          placeholder="Premium, trustworthy, modern"
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-neutral-600">Words like: Bold, Clean, Luxurious, Approachable, Technical, Warm…</p>
      </div>

      <div>
        <label className={labelClass}>Who is your ideal customer? *</label>
        <textarea
          value={data.targetCustomer}
          onChange={(e) => onChange('targetCustomer', e.target.value)}
          required
          rows={4}
          placeholder="Describe them like a person — age, lifestyle, what they care about"
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>

      <div>
        <label className={labelClass}>What's the ONE thing you want visitors to do?</label>
        <select
          value={data.primaryAction}
          onChange={(e) => onChange('primaryAction', e.target.value)}
          className={`${inputClass} appearance-none`}
        >
          <option value="">Select the main call-to-action…</option>
          {PRIMARY_ACTIONS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Primary goal of your website *</label>
        <select
          value={data.primaryGoal}
          onChange={(e) => onChange('primaryGoal', e.target.value)}
          required
          className={`${inputClass} appearance-none`}
        >
          <option value="">Select your main goal…</option>
          {PRIMARY_GOALS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-neutral-700 text-neutral-400 hover:text-white py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex-1 bg-luxury-red hover:bg-luxury-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
        >
          Continue →
        </button>
      </div>
    </form>
  );
};

export default WStep2Vision;
