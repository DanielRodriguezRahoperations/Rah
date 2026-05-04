import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const ContactPage = () => {
  return (
    <>
      <SEOHead
        title="Contact RAH Operations | Website Design & SEO Inquiries"
        description="Get in touch with RAH Operations for website design, SEO, and digital marketing services in Phoenix and Scottsdale."
        url={absoluteUrl('/contact')}
      />

      {/* HERO */}
      <section className="relative py-32 lg:py-48 bg-gradient-to-br from-slate-dark via-slate-dark to-luxury-red/20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-luxury-red/10 blur-3xl rounded-full" />
        </div>

        <div className="container-clean relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif-display font-bold leading-[0.9] text-white mb-10">
              Let's Build Something Better.
            </h1>
            <p className="text-xl text-neutral-300 font-serif-body leading-relaxed mb-8">
              Tell us about your business, your goals, and your market. We'll show you what's possible with a premium website and proven marketing strategy.
            </p>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl">📞</span>
                <a href="tel:+18884724621" className="font-semibold hover:text-luxury-red transition-colors">
                  (888) 472-4621
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="section bg-white">
        <div className="container-clean max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm
              title="Start Your Project"
              subtitle="We'll review your needs and get back to you within 24 hours with a clear plan and timeline."
            />
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">What Happens Next</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">
              Our Process Is Transparent.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                n: '01',
                t: 'You Submit',
                d: 'Tell us about your business, your goals, and what matters most.'
              },
              {
                n: '02',
                t: 'We Respond',
                d: 'Within 24 hours, we send back a clear summary and proposed plan.'
              },
              {
                n: '03',
                t: 'We Connect',
                d: 'Schedule a call to discuss strategy, timeline, and investment.'
              },
              {
                n: '04',
                t: 'We Build',
                d: 'Execute your project with weekly updates and transparent communication.'
              }
            ].map((step, i) => (
              <motion.div
                key={step.n}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="border-4 border-slate-dark p-8 h-full flex flex-col">
                  <p className="text-6xl font-serif-display font-bold text-luxury-red/20 mb-4">{step.n}</p>
                  <h3 className="text-2xl font-serif-display font-bold mb-4 -mt-12 relative z-10">{step.t}</h3>
                  <p className="text-neutral-600 font-serif-body flex-grow">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-clean max-w-3xl">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-6">Questions?</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark">
              Common Questions Answered.
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                q: 'How long does a website take?',
                a: 'Typically 8-12 weeks from discovery to launch. We break it into clear milestones so you see progress every step.'
              },
              {
                q: 'What\'s the investment?',
                a: 'Website projects start at $8,000 and scale based on complexity, features, and scope. We provide a clear proposal upfront.'
              },
              {
                q: 'Do you include SEO?',
                a: 'Yes. Every website is built with SEO architecture, technical optimization, and local search foundations built in.'
              },
              {
                q: 'Can you redesign my existing site?',
                a: 'Absolutely. We audit your current site, preserve what\'s working, and rebuild the rest for performance and conversion.'
              },
              {
                q: 'What if I need ongoing support?',
                a: 'We offer maintenance and optimization plans. Most clients choose ongoing services to keep their site performing and improving.'
              },
              {
                q: 'Do you work with my current hosting?',
                a: 'We can. Or we recommend and manage hosting for optimal performance. Either way, you\'ll own your site.'
              }
            ].map((item, i) => (
              <motion.div
                key={item.q}
                className="border-b border-neutral-200 pb-8 last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="text-2xl font-serif-display font-bold text-slate-dark mb-4">
                  {item.q}
                </h3>
                <p className="text-lg text-neutral-600 font-serif-body leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section bg-luxury-red text-white">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl font-serif-body mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
              Submit the form above, call us directly, or schedule a time that works best. We're excited to talk about what you're building.
            </p>
            <Button to="tel:+18884724621" size="lg" className="bg-white text-luxury-red hover:bg-cream-50">
              Call (888) 472-4621
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
