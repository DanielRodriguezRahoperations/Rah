import React from 'react';
import { SITE_CONFIG } from '../../config/site';

interface Props {
  businessName: string;
  email: string;
  servicesRequested: string[];
}

const MStep5Confirmation: React.FC<Props> = ({ businessName, email, servicesRequested }) => {
  return (
    <div className="space-y-8 text-center">
      {/* Success icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-luxury-dark/30 border border-luxury-red/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>

      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-3">
          Intake Received
        </p>
        <h2 className="font-serif-display text-3xl text-white mb-4">
          You're in, {businessName.split(' ')[0]}.
        </h2>
        <p className="text-neutral-400 font-serif-body leading-relaxed max-w-sm mx-auto">
          We've received your intake for <strong className="text-white">{businessName}</strong> and
          sent a confirmation to <strong className="text-white">{email}</strong>.
        </p>
      </div>

      {/* Services summary */}
      {servicesRequested.length > 0 && (
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 text-left">
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-3">Services Selected</p>
          <ul className="space-y-2">
            {servicesRequested.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-neutral-300">
                <span className="w-1 h-1 rounded-full bg-luxury-red flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What's next */}
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 text-left space-y-3">
        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">What Happens Next</p>
        {[
          'Daniel will personally review your intake within 1–2 business days.',
          'You\'ll receive a strategy call invite to discuss your goals and finalize your package.',
          'We\'ll set up your client portal so you can track content and approve posts.',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-sm bg-luxury-dark text-luxury-accent text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">{step}</p>
          </div>
        ))}
      </div>

      {/* Portal link */}
      <div className="pt-2">
        <a
          href="/marketing/portal"
          className="inline-block bg-luxury-red hover:bg-luxury-light text-white text-sm font-semibold py-3 px-8 rounded-sm transition-colors uppercase tracking-widest"
        >
          Access Your Portal
        </a>
        <p className="mt-3 text-xs text-neutral-600">
          Questions?{' '}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-luxury-red hover:underline">
            {SITE_CONFIG.email}
          </a>{' '}
          or{' '}
          <a href={`tel:${SITE_CONFIG.phone}`} className="text-luxury-red hover:underline">
            {SITE_CONFIG.phone}
          </a>
        </p>
      </div>
    </div>
  );
};

export default MStep5Confirmation;
