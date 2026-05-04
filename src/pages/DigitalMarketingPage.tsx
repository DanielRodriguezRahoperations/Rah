import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const DigitalMarketingPage = () => {
  return (
    <>
      <SEOHead
        title="Digital Marketing | RAH Operations"
        description="Digital marketing systems built to generate visibility, qualified leads, and measurable business growth."
        url={absoluteUrl('/digital-marketing')}
      />

      {/* HERO - BOLD HORIZONTAL */}
      <section className="relative py-32 lg:py-48 bg-gradient-to-r from-slate-dark via-luxury-red/10 to-slate-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-luxury-red to-transparent" />
        </div>

        <div className="container-clean relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="eyebrow-red mb-8">Digital Marketing • Growth Systems • Lead Generation</p>

            <h1 className="text-6xl md:text-8xl font-serif-display font-bold leading-[0.85] mb-10 text-white max-w-5xl">
              Marketing That Produces
              <span className="block text-luxury-red">Real Results.</span>
            </h1>

            <p className="text-xl text-neutral-300 font-serif-body mb-12 max-w-2xl leading-relaxed">
              Most companies are posting, boosting, and hoping. That's not marketing. We build systems where visibility, messaging, and conversion work together to generate qualified leads.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/contact" size="lg">Strategy Call</Button>
              <Button to="/case-studies" variant="secondary" size="lg">See Results</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM - DATA COMPARISON */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">The Gap</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">
              Most Marketing Isn't Actually Marketing.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Disconnected Marketing',
                items: [
                  'Social media posting with no link to sales',
                  'Ads that drive clicks, not qualified leads',
                  'Website that doesn\'t convert traffic',
                  'No clear target or positioning',
                  'No measurement or ROI tracking',
                  'Budget wasted on activity, not outcomes'
                ],
                icon: '✕'
              },
              {
                title: 'Integrated Marketing System',
                items: [
                  'Every channel built around business goals',
                  'Ads targeting real customer intent',
                  'Website optimized for conversion',
                  'Clear positioning in every message',
                  'Tracked and measured results',
                  'Budget spent on what actually works'
                ],
                icon: '✓'
              }
            ].map((section, idx) => (
              <motion.div
                key={section.title}
                className={`border-4 p-10 ${idx === 0 ? 'border-luxury-red/30 bg-white' : 'border-luxury-red bg-luxury-red text-white'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <h3 className="text-2xl font-serif-display font-bold mb-8">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm md:text-base">
                      <span className="text-xl leading-none mt-1 flex-shrink-0">{section.icon}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="section bg-white">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">What We Build</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">
              Marketing Channels That Connect.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'SEO & Content', desc: 'Organic traffic built on keywords and value', icon: '◆' },
              { title: 'Paid Advertising', desc: 'Google Ads, Meta Ads targeting intent', icon: '◈' },
              { title: 'Email Strategy', desc: 'Nurture sequences that convert', icon: '◇' },
              { title: 'Social Media', desc: 'Authority building and engagement', icon: '◆' },
              { title: 'Conversion Optimization', desc: 'Landing pages that actually convert', icon: '◈' },
              { title: 'Analytics & Tracking', desc: 'Measure everything that matters', icon: '◇' }
            ].map((cap) => (
              <motion.div
                key={cap.title}
                className="border-3 border-slate-dark p-8 hover:bg-luxury-red hover:text-white hover:border-luxury-red group transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <p className="text-3xl mb-4 text-neutral-400 group-hover:text-white/50">{cap.icon}</p>
                <h3 className="text-lg font-serif-display font-bold mb-3">{cap.title}</h3>
                <p className="text-sm text-neutral-600 group-hover:text-white/80">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - FLOW */}
      <section className="section bg-slate-dark text-white">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">The System</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold">How We Build Marketing That Works.</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { n: '01', t: 'Audit & Strategy', d: 'Understand your market, competitors, and real customer intent.' },
              { n: '02', t: 'Channel Selection', d: 'Choose which channels actually reach your customers.' },
              { n: '03', t: 'Integrated Execution', d: 'Run campaigns that push traffic to a converting website.' },
              { n: '04', t: 'Track & Optimize', d: 'Measure results and double down on what works.' },
              { n: '05', t: 'Scale Results', d: 'Increase budget on proven channels and expand reach.' }
            ].map((step, i) => (
              <motion.div
                key={step.n}
                className={`flex gap-8 items-start pb-8 ${i < 4 ? 'border-b border-white/10' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-6xl font-serif-display font-bold text-luxury-red/30 flex-shrink-0 w-20">{step.n}</p>
                <div>
                  <h3 className="text-2xl font-serif-display font-bold mb-3">{step.t}</h3>
                  <p className="text-neutral-300 font-serif-body">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section bg-luxury-red text-white">
        <div className="container-clean">
          <motion.div className="grid md:grid-cols-4 gap-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {[
              { n: '3.2x', l: 'Average ROI' },
              { n: '+230%', l: 'Lead Volume' },
              { n: '42%', l: 'Avg CPC Reduction' },
              { n: '86%', l: 'Conversion Lift' }
            ].map((r) => (
              <div key={r.l} className="text-center border-t border-white/20 pt-6">
                <p className="text-5xl font-serif-display font-bold mb-2">{r.n}</p>
                <p className="text-white/80 uppercase tracking-wider text-sm">{r.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RELATED SERVICES — SEO internal links */}
      <section className="section section-dark">
        <div className="container-clean">
          <p className="eyebrow-red mb-6">Related Services</p>
          <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-white mb-12">
            Complete the Full Growth Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Website Design & SEO',
                desc: 'Marketing without a high-converting website wastes every dollar. We build web development that ranks in Scottsdale and Phoenix.',
                link: '/website-design-and-seo',
                anchor: 'website design SEO Scottsdale Phoenix AZ',
              },
              {
                title: 'Social Media Management',
                desc: 'Digital marketing and social media work together. We build the content system that amplifies your paid campaigns.',
                link: '/social-media-management',
                anchor: 'social media management near Phoenix Arizona',
              },
              {
                title: 'Business Credit & Funding',
                desc: 'Scale your marketing budget with business credit. We help Arizona companies build the financial infrastructure to grow.',
                link: '/business-credit-and-funding',
                anchor: 'business credit building Phoenix Scottsdale',
              },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.link}
                title={s.anchor}
                className="block border border-white/10 p-7 hover:border-luxury-red/50 hover:bg-white/5 transition-all duration-300 group"
              >
                <h3 className="text-lg font-serif-display font-bold text-white mb-3 group-hover:text-luxury-red transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs uppercase tracking-widest text-luxury-red">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark mb-8">
              Ready to Build a Real Marketing System?
            </h2>
            <p className="text-xl text-neutral-600 font-serif-body mb-12 max-w-2xl mx-auto">
              Let's talk about your business goals and build a marketing strategy that actually produces results.
            </p>
            <Button to="/contact" size="lg">Schedule Strategy Call</Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingPage;
