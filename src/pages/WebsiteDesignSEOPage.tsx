import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

const WebsiteDesignSEOPage = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 0.66, 0.66, 1] } }
  };

  return (
    <>
      <SEOHead
        title="Website Design & SEO Scottsdale, Phoenix AZ | RAH Operations"
        description="High-conversion website design and SEO services in Scottsdale and Phoenix, Arizona. Custom-built websites engineered for rankings, authority, and lead generation."
        url={absoluteUrl('/website-design-and-seo')}
      />

      {/* HERO */}
      <section className="relative min-h-screen bg-white pt-24 lg:pt-32 pb-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-luxury-red to-transparent" />
        </div>

        <div className="container-clean relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="mb-8">
              <p className="eyebrow-red mb-6">Website Design • Local SEO • Development</p>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif-display font-bold leading-[0.9] mb-12 text-slate-dark">
              Your Website Should Earn Your Business Trust.
              <span className="block text-luxury-red mt-6">Not Destroy It.</span>
            </h1>
            <p className="text-lg text-neutral-600 font-serif-body mb-10 max-w-xl leading-relaxed">
              We build high-performance websites engineered for search visibility, authority, and conversion. Every design choice, every word, every structure is built around one goal: turning visitors into qualified leads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/contact" size="lg">Schedule Audit</Button>
              <Button to="/case-studies" variant="secondary" size="lg">See Results</Button>
            </div>
          </motion.div>

          <motion.div className="relative h-full" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <div className="relative">
              <div className="absolute -inset-8 border-4 border-luxury-red/20 -rotate-2 hidden lg:block" />
              <img src="/newhero.png" alt="Website design and SEO" className="w-full relative z-10 border-4 border-slate-dark" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section bg-slate-dark text-white">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">The Reality</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold">Most Websites Fail Before They Even Load.</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div className="border-l-4 border-luxury-red pl-8" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-serif-display font-bold mb-8 text-neutral-200">Generic Website Trajectory</h3>
              <ul className="space-y-4">
                {['No SEO foundation → buried on page 3+', 'Unclear messaging → visitors leave', 'Poor design → low perceived value', 'Slow speed → instant bounce', 'Mobile broken → 60% traffic lost', 'No conversion path → chaos'].map((item, i) => (
                  <motion.li key={i} className="flex gap-3" variants={itemVariants}>
                    <span className="text-luxury-red text-xl leading-none mt-1">✕</span>
                    <span className="text-neutral-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="border-l-4 border-cream-300 pl-8" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-serif-display font-bold mb-8 text-cream-50">RAH Website System</h3>
              <ul className="space-y-4">
                {['SEO architecture → rank locally', 'Clear positioning → instant credibility', 'Premium design → impressive first impression', 'Optimized speed → fast on all devices', 'Mobile-first → flawless everywhere', 'Conversion flow → qualified leads'].map((item, i) => (
                  <motion.li key={i} className="flex gap-3" variants={itemVariants}>
                    <span className="text-cream-300 text-xl leading-none mt-1">✓</span>
                    <span className="text-cream-100">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">Complete System</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">What We Build Into Every Website.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Design', desc: 'Custom visual system' },
              { title: 'SEO', desc: 'Technical optimization' },
              { title: 'Performance', desc: 'Sub-2s load time' },
              { title: 'Mobile', desc: 'Flawless on all devices' },
              { title: 'Conversion', desc: 'Clear CTA path' },
              { title: 'Content', desc: 'Buyer journey copy' },
              { title: 'Analytics', desc: 'Tracking setup' },
              { title: 'Support', desc: 'Ongoing optimization' }
            ].map((item) => (
              <motion.div key={item.title} className="border-3 border-slate-dark p-6 group hover:bg-luxury-red hover:text-white hover:border-luxury-red transition-all duration-300" whileHover={{ y: -4 }}>
                <h3 className="text-lg font-serif-display font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 group-hover:text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-white">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">How We Build</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">Strategy Before Design. Design Before Code.</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { n: '01', t: 'Market Analysis', d: 'Audit your market, competitors, positioning, and keywords.' },
              { n: '02', t: 'Conversion Architecture', d: 'Map the visitor journey and map what builds trust.' },
              { n: '03', t: 'Custom Design', d: 'Build visual identity that communicates premium positioning.' },
              { n: '04', t: 'SEO Development', d: 'Code for search engines first, humans second.' },
              { n: '05', t: 'Launch & Optimize', d: 'Measure, test, and continuously improve performance.' }
            ].map((step, i) => (
              <motion.div key={step.n} className={`grid lg:grid-cols-[0.2fr_0.8fr] gap-8 items-start py-8 border-t border-neutral-200 ${i === 0 ? 'pt-0' : ''}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-6xl font-serif-display font-bold text-luxury-red/20">{step.n}</p>
                <div>
                  <h3 className="text-2xl font-serif-display font-bold mb-4 -mt-6 relative z-10 text-slate-dark">{step.t}</h3>
                  <p className="text-lg text-neutral-600 font-serif-body">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section bg-luxury-red text-white">
        <div className="container-clean">
          <motion.div className="grid md:grid-cols-4 gap-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {[
              { num: '+87%', lab: 'Avg Lead Growth' },
              { num: '#1', lab: 'Local Rankings' },
              { num: '2.4s', lab: 'Load Time' },
              { num: '50+', lab: 'Websites Built' }
            ].map((s) => (
              <motion.div key={s.lab} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="text-5xl font-serif-display font-bold mb-3">{s.num}</p>
                <p className="text-white/80 font-serif-body">{s.lab}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RELATED SERVICES — SEO internal links */}
      <section className="section section-dark">
        <div className="container-clean">
          <p className="eyebrow-red mb-6">Related Services</p>
          <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-white mb-12">
            Pair Web Development With These Growth Systems
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Digital Marketing',
                desc: 'Your website ranks — now drive traffic with paid and organic digital marketing in Phoenix and Scottsdale.',
                link: '/digital-marketing',
                anchor: 'digital marketing Scottsdale Phoenix AZ',
              },
              {
                title: 'Social Media Management',
                desc: 'Amplify your web presence with strategic social media content that builds brand authority near Scottsdale.',
                link: '/social-media-management',
                anchor: 'social media management Scottsdale Arizona',
              },
              {
                title: 'Business Credit & Funding',
                desc: 'A professional website signals legitimacy to lenders. Pair it with our business credit building system.',
                link: '/business-credit-and-funding',
                anchor: 'business credit funding Arizona',
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
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark mb-8">Ready to Rank and Convert?</h2>
            <p className="text-xl text-neutral-600 font-serif-body mb-12 max-w-2xl mx-auto">Let's audit your website and build a plan to turn visitors into qualified leads.</p>
            <Button to="/contact" size="lg">Start Your Audit Today</Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WebsiteDesignSEOPage;
