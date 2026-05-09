import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';

interface Props {
  name: string;
  email: string;
}

const Step5Confirmation: React.FC<Props> = ({ name, email }) => {
  const firstName = name.split(' ')[0];

  return (
    <div className="relative bg-[#0f0f0f] min-h-[560px] flex flex-col items-center justify-center text-center px-8 py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-luxury-red/10 blur-[100px]" />
      </div>

      {/* Animated seal */}
      <motion.div
        className="relative mb-10"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.33, 0.66, 0.66, 1] }}
      >
        <div className="relative w-28 h-28 flex items-center justify-center mx-auto">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-luxury-red"
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-3 rounded-full border border-luxury-red/40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.span
            className="text-luxury-red text-4xl relative z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            ✓
          </motion.span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h2
        className="font-serif-display font-bold text-white mb-3 leading-[1.05]"
        style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        Application Received,
        <span className="block text-luxury-red">{firstName}.</span>
      </motion.h2>

      <motion.p
        className="text-neutral-300 font-serif-body text-base max-w-md leading-relaxed mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
      >
        A confirmation has been sent to{' '}
        <span className="text-white font-medium">{email}</span>. Our credit team will
        review your documents and reach out within{' '}
        <span className="text-white font-semibold">1–2 business days</span> to begin
        your personalized credit plan.
      </motion.p>

      {/* Divider */}
      <motion.div
        className="flex items-center gap-4 my-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="h-px w-16 bg-luxury-red/50" />
        <span className="text-luxury-red text-xs uppercase tracking-[0.25em] font-semibold">
          RAH Operations
        </span>
        <div className="h-px w-16 bg-luxury-red/50" />
      </motion.div>

      {/* Next steps */}
      <motion.div
        className="w-full max-w-sm space-y-3 text-left mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {[
          { num: '01', text: 'Your documents are being securely stored and reviewed.' },
          { num: '02', text: 'A credit specialist will contact you to discuss your plan.' },
          { num: '03', text: "We'll begin disputing inaccurate items on your behalf." },
        ].map((item) => (
          <div key={item.num} className="flex items-start gap-3">
            <span className="font-serif-display font-bold text-luxury-red/60 text-sm leading-none mt-0.5">
              {item.num}
            </span>
            <p className="text-sm text-neutral-400 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </motion.div>

      {/* Contact row */}
      <motion.div
        className="grid grid-cols-2 gap-4 w-full max-w-sm mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <a
          href={`tel:${SITE_CONFIG.phoneTel}`}
          className="border border-white/10 p-4 text-center hover:border-luxury-red/40 transition-colors"
        >
          <p className="text-white font-serif-display font-bold text-sm">{SITE_CONFIG.phone}</p>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Call Us</p>
        </a>
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="border border-white/10 p-4 text-center hover:border-luxury-red/40 transition-colors"
        >
          <p className="text-white font-serif-display font-bold text-sm truncate">{SITE_CONFIG.email}</p>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Email Us</p>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Link
          to="/"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 hover:text-luxury-red transition-colors"
        >
          ← Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Step5Confirmation;
