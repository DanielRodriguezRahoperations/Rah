import React from 'react';

interface Props {
  data: {
    goals: string;
    budget: string;
    timeline: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
  error: string;
}

const BUDGETS = [
  { value: '$297/mo', label: '$297/mo — Starter' },
  { value: '$597/mo', label: '$597/mo — Growth' },
  { value: '$997/mo', label: '$997/mo — Pro' },
  { value: '$1,500 one-time', label: '$1,500 one-time — Project' },
  { value: '$3,500 one-time', label: '$3,500 one-time — Full Build' },
  { value: 'Custom', label: 'Custom — Let\'s talk' },
];

const TIMELINES = [
  'ASAP — Ready to start now',
  'Within 30 days',
  'Within 60 days',
  '3–6 months',
  'Just exploring options',
];

const inputClass =
  'w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-400 mb-2';

const MStep4Goals: React.FC<Props> = ({ data, onChange, onSubmit, onBack, submitting, error }) => {
  const isValid = data.goals.trim() && data.budget;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !submitting) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-neutral-400 font-serif-body leading-relaxed">
        Tell us what success looks like for you. The more detail you share, the better we can build your strategy.
      </p>

      <div>
        <label className={labelClass}>Your Goals *</label>
        <textarea
          value={data.goals}
          onChange={(e) => onChange('goals', e.target.value)}
          required
          rows={5}
          placeholder="What do you want to achieve? (e.g., grow Instagram followers, drive more foot traffic, rank on Google for 'best contractor Phoenix', launch a new product, etc.)"
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>

      <div>
        <label className={labelClass}>Monthly Budget / Investment *</label>
        <select
          value={data.budget}
          onChange={(e) => onChange('budget', e.target.value)}
          required
          className={`${inputClass} appearance-none`}
        >
          <option value="">Select a budget range…</option>
          {BUDGETS.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
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
          {submitting ? 'Submitting…' : 'Submit →'}
        </button>
      </div>
    </form>
  );
};

export default MStep4Goals;
