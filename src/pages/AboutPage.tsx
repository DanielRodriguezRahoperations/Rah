import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="About RAH Operations | Website Design & SEO in Phoenix"
        description="RAH Operations builds premium websites and SEO systems for Arizona businesses. Learn about our approach to design, strategy, and lead generation."
        url={absoluteUrl('/about')}
      />

      {/* HERO */}
      <section className="relative min-h-screen bg-white pt-24 lg:pt-32 pb-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/4 right-0 w-1/2 h-96 bg-luxury-red rounded-full blur-3xl" />
        </div>

        <div className="container-clean relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <p className="eyebrow-red mb-8">About RAH Operations</p>
            <h1 className="text-6xl md:text-8xl font-serif-display font-bold leading-[0.85] mb-10 text-slate-dark">
              We Build Websites
              <span className="block text-luxury-red">That Work.</span>
            </h1>
            <p className="text-2xl text-neutral-600 font-serif-body mb-10 leading-relaxed max-w-3xl">
              RAH Operations was built on a simple belief: your website should be a business asset, not a liability. A system that generates visibility, builds trust, and produces qualified leads.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE STORY */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow-red mb-6">Our Story</p>
              <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark mb-8">
                Built on Real Experience
              </h2>

              <div className="space-y-6 text-lg text-neutral-700 font-serif-body leading-relaxed">
                <p>
                  We started RAH Operations after working with dozens of Arizona businesses that had excellent services but struggled to prove it online. Their websites looked generic. Their messaging was unclear. Their traffic was weak.
                </p>

                <p>
                  We realized the pattern: most agencies build websites that look nice but don't actually perform. They focus on design trends instead of business results. We decided to do the opposite.
                </p>

                <p>
                  Today, we build websites that rank locally, convert visitors into leads, and actually support business growth. We combine strategy, design, and technical excellence into websites that work.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative border-4 border-slate-dark p-2">
                <img
                  src="/newhero.png"
                  alt="RAH Operations team"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 bg-luxury-red text-white p-8 border-4 border-white">
                <p className="font-serif-display text-sm font-bold uppercase mb-2">Built On</p>
                <p className="text-3xl font-serif-display font-bold">Expertise</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section bg-white">
        <div className="container-clean">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">How We Work</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">
              Our Core Philosophy
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Strategy First',
                desc: 'We don\'t design until we understand your market, your customers, and what actually drives business results.'
              },
              {
                title: 'Premium By Default',
                desc: 'Every website we build communicates authority, professionalism, and trust. Design that matches the price of your services.'
              },
              {
                title: 'Results Obsessed',
                desc: 'We measure everything. Rankings, traffic, leads, conversions. Websites are built around metrics that matter.'
              },
              {
                title: 'Local Expertise',
                desc: 'We understand Arizona\'s business landscape. Local SEO, regional competition, and what works in this market.'
              },
              {
                title: 'No Templates',
                desc: 'Every website is custom-built. Your positioning is unique. Your website should reflect that.'
              },
              {
                title: 'Collaborative Partnership',
                desc: 'We work with you, not for you. Your input shapes the direction. Your goals drive the decisions.'
              }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                className="border-l-4 border-luxury-red pl-8 py-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="text-2xl font-serif-display font-bold text-slate-dark mb-4">
                  {value.title}
                </h3>
                <p className="text-neutral-600 font-serif-body leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE SERVE */}
      <section className="section bg-slate-dark text-white">
        <div className="container-clean">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">Who We Work With</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold">
              Businesses That Demand Better
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="col-span-2">
              <p className="text-xl text-neutral-300 font-serif-body mb-12">
                We partner with service-based businesses, agencies, and companies that understand premium positioning. Companies where design matters. Where first impressions count. Where a website is a business tool, not a digital brochure.
              </p>
            </div>

            {[
              'Home Services & Contractors',
              'Medical & Wellness Practices',
              'Automotive Brands',
              'Wedding & Event Services',
              'Professional Services',
              'Finance & Credit',
              'Real Estate',
              'Digital Agencies'
            ].map((industry) => (
              <motion.div
                key={industry}
                className="border-l-4 border-luxury-red pl-6 py-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-lg font-serif-body">{industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM STATS */}
      <section className="section bg-luxury-red text-white">
        <div className="container-clean">
          <motion.div
            className="grid md:grid-cols-4 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { n: '50+', l: 'Websites Built' },
              { n: '+87%', l: 'Avg Lead Growth' },
              { n: '8+', l: 'Years Experience' },
              { n: '100%', l: 'Client Satisfaction' }
            ].map((stat) => (
              <div key={stat.l} className="text-center border-t border-white/30 pt-6">
                <p className="text-5xl font-serif-display font-bold mb-2">{stat.n}</p>
                <p className="text-white/80 uppercase tracking-wider text-sm">{stat.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark mb-8">
              Ready to Build Something Better?
            </h2>
            <p className="text-xl text-neutral-600 font-serif-body mb-12 max-w-2xl mx-auto">
              Let's talk about your business, your market, and what a premium website could do for your leads and authority.
            </p>
            <Button to="/contact" size="lg">Start a Conversation</Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
