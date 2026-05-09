import React, { useState } from 'react';
import type { IntakeData } from './IntakeForm';

interface Props {
  data: IntakeData;
  onChange: (field: keyof IntakeData, value: string | boolean | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const inputClass =
  'w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-950 outline-none transition-colors duration-300 placeholder:text-neutral-400 focus:border-[#7a1c1c]';
const labelClass =
  'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500';

const TIMELINES = [
  { value: '1-3 months', label: '1–3 Months — Urgent' },
  { value: '3-6 months', label: '3–6 Months — Moderate' },
  { value: '6-12 months', label: '6–12 Months — Standard' },
  { value: '12+ months', label: '12+ Months — Long-term' },
];

const Step3CreditGoals: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.goals.trim()) e.goals = 'Please describe your credit goals';
    if (!data.timeline) e.timeline = 'Please select a timeline';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow-red mb-3">Step 3 of 4</p>
        <h2 className="font-serif-display font-bold text-slate-dark text-2xl sm:text-3xl mb-2">
          Credit Goals
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Understanding your goals helps us build a strategy tailored to your situation — not a
          generic template.
        </p>
      </div>

      <div className="space-y-10">
        <div>
          <label className={labelClass}>What are your main credit goals?</label>
          <textarea
            rows={5}
            value={data.goals}
            onChange={(e) => onChange('goals', e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="e.g., I want to qualify for a home loan in 6 months. My score is around 580 and I need to get it to 680+. I have several late payments and two collections that I believe may be inaccurate..."
          />
          {errors.goals && <p className="mt-1 text-xs text-luxury-red">{errors.goals}</p>}
        </div>

        <div>
          <label className={labelClass}>What is your target timeline?</label>
          <div className="mt-1 grid gap-3 sm:grid-cols-2">
            {TIMELINES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => onChange('timeline', t.value)}
                className={[
                  'border px-5 py-4 text-left transition-all duration-200',
                  data.timeline === t.value
                    ? 'border-luxury-red bg-luxury-red/5 text-luxury-red'
                    : 'border-neutral-200 text-neutral-600 hover:border-luxury-red/40',
                ].join(' ')}
              >
                <span className="block text-xs font-semibold uppercase tracking-wider">
                  {t.label.split('—')[0].trim()}
                </span>
                <span className="block text-[11px] text-neutral-400 mt-0.5">
                  {t.label.split('—')[1]?.trim()}
                </span>
              </button>
            ))}
          </div>
          {errors.timeline && <p className="mt-1 text-xs text-luxury-red">{errors.timeline}</p>}
        </div>

        <div>
          <label className={labelClass}>
            Specific accounts or items you know need to be disputed{' '}
            <span className="normal-case tracking-normal text-neutral-400">(optional)</span>
          </label>
          <textarea
            rows={4}
            value={data.disputedAccounts}
            onChange={(e) => onChange('disputedAccounts', e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="e.g., Capital One account #xxxx showing as 90-day late — I paid it on time. Midland collections for $340 — I never had this account. Medical bill from 2019 still showing..."
          />
          <p className="mt-1 text-[10px] text-neutral-400">
            Don't worry if you don't know yet — we'll review your full report together.
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-neutral-100 pt-8">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 hover:text-luxury-red transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="group relative inline-flex items-center justify-center overflow-hidden border border-neutral-950 bg-neutral-950 text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_18px_45px_rgba(17,17,17,0.16)] before:absolute before:inset-0 before:-translate-x-full before:bg-[#7a1c1c] before:transition-transform before:duration-300 hover:border-[#7a1c1c] hover:before:translate-x-0"
        >
          <span className="relative z-10">Continue to Agreement →</span>
        </button>
      </div>
    </div>
  );
};

export default Step3CreditGoals;
