import React from 'react';

interface Props {
  data: {
    instagramHandle: string;
    facebookHandle: string;
    googleBusinessUrl: string;
    tiktokHandle: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const inputClass =
  'w-full bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors placeholder-neutral-600';
const labelClass = 'block text-xs uppercase tracking-widest text-neutral-400 mb-2';

const platforms = [
  {
    key: 'instagramHandle',
    label: 'Instagram Handle',
    placeholder: '@yourbusiness',
    icon: '📸',
    hint: 'Example: @rahoperations',
  },
  {
    key: 'facebookHandle',
    label: 'Facebook Page',
    placeholder: 'facebook.com/yourbusiness or Page name',
    icon: '📘',
    hint: 'Your Facebook page URL or username',
  },
  {
    key: 'tiktokHandle',
    label: 'TikTok Handle',
    placeholder: '@yourbusiness',
    icon: '🎵',
    hint: 'Leave blank if you don\'t have one',
  },
  {
    key: 'googleBusinessUrl',
    label: 'Google Business Profile URL',
    placeholder: 'maps.google.com/…',
    icon: '🗺',
    hint: 'Paste your Google Business listing URL',
  },
];

const MStep2Social: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <p className="text-sm text-neutral-400 font-serif-body leading-relaxed">
        Share your existing social media accounts so we can audit them and connect your content workflow.
        All fields are optional — skip any that don't apply.
      </p>

      <div className="space-y-5">
        {platforms.map((p) => (
          <div key={p.key}>
            <label className={labelClass}>
              <span className="mr-2">{p.icon}</span>{p.label}
            </label>
            <input
              type="text"
              value={(data as Record<string, string>)[p.key] ?? ''}
              onChange={(e) => onChange(p.key, e.target.value)}
              placeholder={p.placeholder}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-neutral-600">{p.hint}</p>
          </div>
        ))}
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
          type="button"
          onClick={onNext}
          className="flex-1 bg-luxury-red hover:bg-luxury-light text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default MStep2Social;
