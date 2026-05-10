import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/ui/SEOHead';
import MarketingIntakeForm from '../../components/marketing-intake/MarketingIntakeForm';
import { SITE_CONFIG } from '../../config/site';

const MarketingIntakePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Marketing Services Intake — RAH Operations"
        description="Get started with RAH Operations digital marketing services. Tell us about your business and goals."
        noIndex={true}
      />

      <section className="min-h-screen bg-[#0f0f0f] pt-24 pb-20 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-luxury-red/6 rounded-full blur-[140px]" />
          <div className="absolute top-1/4 right-0 w-[25vw] h-[25vw] bg-luxury-red/4 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-4">
              RAH Operations — Digital Marketing
            </p>
            <h1 className="font-serif-display text-4xl lg:text-5xl text-white mb-5 leading-tight">
              Let's Grow Your Business
            </h1>
            <p className="text-neutral-400 font-serif-body text-lg leading-relaxed max-w-lg mx-auto">
              Complete the form below so we can understand your business, goals, and how we can
              build the right strategy for you.
            </p>
          </motion.div>

          {/* What to expect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-12"
          >
            {[
              { num: '01', label: '4-step form', desc: 'Takes about 5 minutes' },
              { num: '02', label: 'Strategy review', desc: 'Daniel responds in 24–48hrs' },
              { num: '03', label: 'We get to work', desc: 'Content live within 7 days' },
            ].map((item) => (
              <div key={item.num} className="bg-[#1a1a1a] border border-neutral-800 rounded-sm p-4 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-luxury-red font-bold mb-2">{item.num}</p>
                <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MarketingIntakeForm />
          </motion.div>

          {/* Footer note */}
          <p className="text-center text-xs text-neutral-600 mt-8">
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
      </section>
    </>
  );
};

export default MarketingIntakePage;
