import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const ReputationManagementPage = () => {
  return (
    <>
      <SEOHead
        title="Reputation Management | RAH Operations"
        description="Reputation management systems designed to strengthen trust, improve brand perception, and support business growth."
        url={absoluteUrl('/reputation-management')}
      />

      {/* HERO */}
      <section className="relative py-32 lg:py-48 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gold-400/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container-clean relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl text-center"
          >
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-12 rounded-full" />
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif-display font-bold leading-[0.9] text-white mb-12 tracking-tight">
              Reputation
              <span className="block text-gold-400">Excellence</span>
            </h1>
            <p className="text-xl text-gray-300 font-serif-body leading-relaxed mb-12 max-w-2xl mx-auto">
              In a world of scrutiny, your reputation is your most valuable asset. We craft legacies of trust that command respect and drive unwavering loyalty.
            </p>

            <motion.div
              className="flex gap-6 justify-center flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button to="/contact" size="lg" className="bg-gold-500 text-black hover:bg-gold-400 border border-gold-500 shadow-2xl">
                Begin Assessment
              </Button>
              <Button to="tel:+18884724621" variant="outline" size="lg" className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black">
                (888) 472-4621
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section bg-white">
        <div className="container-clean grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-gray-900 mb-8 leading-tight">
              Trust Is Earned in Silence
            </h2>
            <p className="text-lg text-gray-700 font-serif-body mb-6 leading-relaxed">
              Every review, every mention, every search result shapes the narrative of your brand. In the digital age, reputation is not managed—it is orchestrated.
            </p>
            <p className="text-lg text-gray-600 font-serif-body leading-relaxed">
              We transform fragmented perceptions into a symphony of credibility that resonates with discerning audiences.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 rounded-lg shadow-xl border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-2xl font-serif-display font-bold text-gray-900 mb-8">The Transformation</h3>
            <div className="space-y-6">
              {[
                { before: 'Scattered Reviews', after: 'Curated Authority' },
                { before: 'Generic Perception', after: 'Distinctive Prestige' },
                { before: 'Local Visibility', after: 'Industry Eminence' },
                { before: 'Reactive Responses', after: 'Proactive Excellence' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-gray-500 line-through">{item.before}</span>
                  <span className="text-gold-600 font-semibold">→</span>
                  <span className="text-gray-900 font-semibold">{item.after}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-gray-900 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-900/20 to-transparent" />
        <div className="container-clean relative z-10">
          <motion.div
            className="max-w-3xl mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-gold mb-8">Our Expertise</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold mb-8 leading-tight">
              Comprehensive Reputation Architecture
            </h2>
            <p className="text-xl font-serif-body opacity-90">
              Every element of your digital presence, meticulously refined.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🔍', title: 'Profile Analysis', desc: 'Deep audit of all touchpoints' },
              { icon: '💬', title: 'Response Strategy', desc: 'Elegant communication protocols' },
              { icon: '⭐', title: 'Review Optimization', desc: 'Cultivating five-star ecosystems' },
              { icon: '📊', title: 'Mention Monitoring', desc: 'Vigilant brand surveillance' },
              { icon: '🎯', title: 'Trust Engineering', desc: 'Systematic credibility building' },
              { icon: '🏆', title: 'Authority Positioning', desc: 'Establishing industry leadership' },
              { icon: '⚖️', title: 'Perception Management', desc: 'Balancing the narrative' },
              { icon: '🔄', title: 'Continuous Refinement', desc: 'Eternal reputation evolution' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-gold-500/20 rounded-lg p-6 text-center hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-serif-display font-bold mb-2">{item.title}</h3>
                <p className="text-sm opacity-80 font-serif-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-gradient-to-br from-gray-50 to-white">
        <div className="container-clean">
          <motion.div
            className="max-w-3xl mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-8">The Methodology</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-gray-900 mb-8">
              Our Reputation Symphony
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { num: 'I', title: 'Assessment', desc: 'Comprehensive reputation audit', color: 'from-gray-800 to-black' },
              { num: 'II', title: 'Strategy', desc: 'Architectural reputation plan', color: 'from-gold-600 to-gold-800' },
              { num: 'III', title: 'Execution', desc: 'Precise implementation', color: 'from-gray-700 to-gray-900' },
              { num: 'IV', title: 'Evolution', desc: 'Continuous refinement', color: 'from-black to-gray-800' }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl`}>
                  {step.num}
                </div>
                <h3 className="text-2xl font-serif-display font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 font-serif-body leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-r from-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-1 bg-gold-500 mx-auto mb-12 rounded-full" />
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold mb-8 leading-tight">
              Elevate Your Reputation
            </h2>
            <p className="text-xl font-serif-body mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
              In a world that judges instantly, let your reputation speak volumes before you utter a word.
            </p>
            <Button to="/contact" size="lg" className="bg-gold-500 text-black hover:bg-gold-400 shadow-2xl">
              Begin the Transformation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section bg-white">
        <div className="container-clean max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm
              title="Initiate Your Reputation Assessment"
              subtitle="Share your current standing and let us orchestrate your path to reputational excellence."
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ReputationManagementPage;
