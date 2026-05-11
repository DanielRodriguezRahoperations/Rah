import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import WebsiteIntakeForm from '../components/website-intake/WebsiteIntakeForm';
import Layout from '../components/layout/Layout';
import { SITE_CONFIG } from '../config/site';

const WebsiteIntakePage: React.FC = () => (
  <Layout>
    <SEOHead
      title="Website Design Intake — RAH Operations"
      description="Tell us about your business and vision. We'll build your custom React website and have it live within 7 days."
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
            RAH Operations — Website Design
          </p>
          <h1 className="font-serif-display text-4xl lg:text-5xl text-white mb-5 leading-tight">
            Let's build something remarkable.
          </h1>
          <p className="text-neutral-400 font-serif-body text-lg leading-relaxed max-w-lg mx-auto">
            Tell us about your business and vision. We'll handle everything else.
          </p>
        </motion.div>

        {/* Info boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {[
            { num: '01', label: '5-minute brief', desc: 'Takes about 5 minutes' },
            { num: '02', label: 'Strategy review', desc: 'Daniel responds in 24hrs' },
            { num: '03', label: 'Live in 7 days', desc: 'Your site launches fast' },
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
          <WebsiteIntakeForm />
        </motion.div>

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
  </Layout>
);

export default WebsiteIntakePage;
