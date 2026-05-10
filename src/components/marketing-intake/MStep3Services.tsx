import React from 'react';

interface Props {
  data: {
    servicesRequested: string[];
  };
  onChange: (services: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const SERVICES = [
  {
    id: 'Social Media Management',
    label: 'Social Media Management',
    desc: 'Monthly content creation, scheduling, and engagement across Instagram, Facebook, and TikTok.',
  },
  {
    id: 'Website Design',
    label: 'Website Design & Development',
    desc: 'Custom, conversion-focused website built on modern stack. Includes copywriting and SEO setup.',
  },
  {
    id: 'SEO',
    label: 'Search Engine Optimization',
    desc: 'Local and national SEO strategy to rank on Google and drive organic traffic.',
  },
  {
    id: 'Video/Reels',
    label: 'Video / Reels Production',
    desc: 'Short-form video scripts, content strategy, and reel production for Instagram and TikTok.',
  },
  {
    id: 'Google Business',
    label: 'Google Business Profile',
    desc: 'Google Business optimization, review management, and local search domination.',
  },
  {
    id: 'Email Marketing',
    label: 'Email Marketing',
    desc: 'Monthly email campaigns, list segmentation, and automated sequences to nurture leads.',
  },
  {
    id: 'Full Service',
    label: 'Full Service Package',
    desc: 'Everything above — complete done-for-you digital marketing. Best value.',
    highlight: true,
  },
];

const MStep3Services: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const toggle = (serviceId: string) => {
    const current = data.servicesRequested;

    if (serviceId === 'Full Service') {
      // Toggle full service on/off; selecting it deselects others
      if (current.includes('Full Service')) {
        onChange([]);
      } else {
        onChange(['Full Service']);
      }
      return;
    }

    // If Full Service was selected, replace it with just this one
    const withoutFull = current.filter((s) => s !== 'Full Service');
    if (withoutFull.includes(serviceId)) {
      onChange(withoutFull.filter((s) => s !== serviceId));
    } else {
      onChange([...withoutFull, serviceId]);
    }
  };

  const isValid = data.servicesRequested.length > 0;

  return (
    <div className="space-y-6">
      <p className="text-sm text-neutral-400 font-serif-body leading-relaxed">
        Select every service you're interested in. Choose multiple — we'll tailor a package to your budget.
      </p>

      <div className="space-y-3">
        {SERVICES.map((svc) => {
          const checked = data.servicesRequested.includes(svc.id);
          return (
            <button
              key={svc.id}
              type="button"
              onClick={() => toggle(svc.id)}
              className={`w-full text-left p-4 rounded-sm border transition-all ${
                checked
                  ? 'border-luxury-red bg-luxury-dark/20'
                  : 'border-neutral-800 bg-[#0f0f0f] hover:border-neutral-600'
              } ${svc.highlight ? 'ring-1 ring-luxury-red/30' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-colors ${
                    checked ? 'bg-luxury-red border-luxury-red' : 'border-neutral-600'
                  }`}
                >
                  {checked && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${checked ? 'text-white' : 'text-neutral-200'}`}>
                    {svc.label}
                    {svc.highlight && (
                      <span className="ml-2 text-[10px] uppercase tracking-widest bg-luxury-red/20 text-luxury-accent px-2 py-0.5 rounded-sm">
                        Best Value
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
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
          disabled={!isValid}
          className="flex-1 bg-luxury-red hover:bg-luxury-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors uppercase tracking-widest text-sm"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default MStep3Services;
