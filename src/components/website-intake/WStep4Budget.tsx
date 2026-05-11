import React from 'react';

interface Props {
  data: {
    budget: string;
    timeline: string;
    additionalNotes: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
  error: string;
}

const BUDGETS = [
  { value: 'Starter — $1,500', label: 'Starter — $1,500', desc: '5 pages, intake form included' },
  { value: 'Growth — $2,500', label: 'Growth — $2,500', desc: '8 pages, portal + automation' },
  { value: 'Premium — $5,000', label: 'Premium — $5,000', desc: 'Full custom, all systems' },
  { value: 'Enterprise', label: 'Enterprise', desc: "Let's talk" },
];

const TIMELINES = [
  'ASAP — Need it within 7 days',
  'Within 30 days',
  'Within 60 days',
  'Just exploring',
];

const inputClass =
  'w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors placeholder-neutral-600';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-400 mb-2';

const WStep4Budget: React.FC<Props> = ({ data, onChange, onSubmit, onBack, submitting, error }) => {
  const isValid = data.budget;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !submitting) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-neutral-400 font-serif-body leading-relaxed">
        Every project includes a custom React build, SEO setup, intake form, and mobile-first design. Pick what fits your goals.
      </p>

      <div>
        <label className={labelClass}>Budget *</label>
        <div className="space-y-3">
          {BUDGETS.map((b) => {
            const selected = data.budget === b.value;
            return (
              <button
                key={b.value}
                type="button"
                onClick={() => onChange('budget', b.value)}
                className={`w-full text-left p-4 rounded-sm border transition-all ${
                  selected
                    ? 'border-luxury-red bg-luxury-dark/20'
                    : 'border-neutral-800 bg-[#0f0f0f] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                    selected ? 'bg-luxury-red border-luxury-red' : 'border-neutral-600'
                  }`}>
                    {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${selected ? 'text-white' : 'text-neutral-200'}`}>{b.label}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelClass}>Timeline</label>
        <select
          value={data.timeline}
          onChange={(e) => onChange('timeline', e.target.value)}
          className={`${inputClass} appearance-none`}
        >
          <option value="">Select timeline…</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Anything else we should know? (optional)</label>
        <textarea
          value={data.additionalNotes}
          onChange={(e) => onChange('additionalNotes', e.target.value)}
          rows={4}
          placeholder="Integrations needed, existing branding, competitors, launch constraints…"
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>

      {error && (
        <div className="bg-red-950/50 border border-red-900 text-red-200 text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="flex-1 border border-neutral-700 text-neutral-400 hover:text-white py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="flex-1 bg-luxury-red hover:bg-luxury-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
        >
          {submitting ? 'Submitting…' : 'Submit Brief →'}
        </button>
      </div>
    </form>
  );
};

export default WStep4Budget;
