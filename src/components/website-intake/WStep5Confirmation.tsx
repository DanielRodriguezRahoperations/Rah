import React from 'react';
import { SITE_CONFIG } from '../../config/site';

interface Props {
  businessName: string;
  email: string;
  budget: string;
}

const NEXT_STEPS = [
  'Daniel reviews your brief within 24 hours.',
  'A strategy call is scheduled to align on vision, pages, and design direction.',
  'Design system generated and shown to you for approval.',
  'Build begins — your site goes live within 7 days of kickoff.',
];

const WStep5Confirmation: React.FC<Props> = ({ businessName, email, budget }) => (
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
        Brief Received
      </p>
      <h2 className="font-serif-display text-3xl text-white mb-4">
        Let's build something remarkable.
      </h2>
      <p className="text-neutral-400 font-serif-body leading-relaxed max-w-sm mx-auto">
        We've received your brief for <strong className="text-white">{businessName}</strong> and
        sent a confirmation to <strong className="text-white">{email}</strong>.
      </p>
    </div>

    {/* Project summary */}
    {budget && (
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 text-left">
        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-3">Your Selection</p>
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-luxury-red flex-shrink-0" />
          <span className="text-sm text-neutral-300">{budget}</span>
        </div>
      </div>
    )}

    {/* What's next */}
    <div className="bg-[#0f0f0f] border border-neutral-800 rounded-sm p-5 text-left space-y-3">
      <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">What Happens Next</p>
      {NEXT_STEPS.map((step, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-sm bg-luxury-dark text-luxury-accent text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {i + 1}
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">{step}</p>
        </div>
      ))}
    </div>

    <div className="pt-2">
      <a
        href="/"
        className="inline-block bg-luxury-red hover:bg-luxury-light text-white text-sm font-semibold py-3 px-8 rounded-sm transition-colors uppercase tracking-widest"
      >
        Back to Homepage
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

export default WStep5Confirmation;
