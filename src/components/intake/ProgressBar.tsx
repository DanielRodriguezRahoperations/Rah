import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
}

const STEPS = [
  { num: 1, label: 'Personal Info' },
  { num: 2, label: 'Documents' },
  { num: 3, label: 'Credit Goals' },
  { num: 4, label: 'Agreement' },
  { num: 5, label: 'Complete' },
];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const fillPercent = (currentStep - 1) / (STEPS.length - 1);

  return (
    <div className="mb-10">
      <div className="relative flex items-start justify-between">
        {/* Track */}
        <div className="absolute left-4 right-4 top-4 h-px bg-neutral-200" />
        {/* Fill */}
        <motion.div
          className="absolute left-4 top-4 h-px bg-luxury-red origin-left"
          style={{ right: '1rem' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: fillPercent }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {STEPS.map((step) => {
          const done = step.num < currentStep;
          const active = step.num === currentStep;
          return (
            <div key={step.num} className="relative z-10 flex flex-col items-center gap-2 w-16">
              <div
                className={[
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors duration-300',
                  done ? 'bg-luxury-red border-luxury-red text-white' : '',
                  active ? 'bg-white border-luxury-red text-luxury-red' : '',
                  !done && !active ? 'bg-white border-neutral-300 text-neutral-400' : '',
                ].join(' ')}
              >
                {done ? '✓' : step.num}
              </div>
              <span
                className={[
                  'text-[9px] uppercase tracking-wider font-semibold text-center leading-tight hidden sm:block',
                  active ? 'text-luxury-red' : done ? 'text-neutral-500' : 'text-neutral-300',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
