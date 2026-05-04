import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const SocialMediaManagementPage = () => {
  return (
    <>
      <SEOHead
        title="Social Media Management Scottsdale & Phoenix AZ | RAH Operations"
        description="Social media strategy and content systems for Scottsdale and Phoenix Arizona businesses. Build brand authority, drive real engagement, and grow your audience."
        url={absoluteUrl('/social-media-management')}
      />

      {/* HERO — Kinetic street editorial: black + electric coral */}
      <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex items-end pb-16 lg:pb-24 pt-32">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-[#ff4c00]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[#ff4c00]/5 blur-[80px] pointer-events-none" />

        <div className="container-clean relative z-10">
          <motion.p
            className="text-[#ff4c00] text-xs uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            001 / Social Media
          </motion.p>

          <motion.h1
            className="text-[clamp(3.5rem,10vw,9rem)] font-serif-display font-bold leading-[0.88] text-white mb-12 max-w-5xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.33, 0.66, 0.66, 1] }}
          >
            Your Brand Needs
            <span className="block text-[#ff4c00]">a Voice,</span>
            Not a Feed.
          </motion.h1>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Button to="/contact" size="lg" className="bg-[#ff4c00] border-[#ff4c00] text-white hover:bg-[#e03d00]">
              Build Your Presence
            </Button>
            <Button to="/portfolio" variant="outline" size="lg" className="border-white/30 text-white hover:border-[#ff4c00] hover:text-[#ff4c00]">
              See Our Work
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              { n: '3×', label: 'Avg. Engagement Lift' },
              { n: '60+', label: 'Brands Managed' },
              { n: '100%', label: 'Strategy-First' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl md:text-5xl font-serif-display font-bold text-[#ff4c00]">{s.n}</p>
                <p className="text-xs uppercase tracking-widest text-white/50 mt-2">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* POSITIONING — Asymmetric split */}
      <section className="section bg-[#f5f1eb] relative overflow-hidden">
        <div className="container-clean grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#ff4c00] text-xs uppercase tracking-[0.3em] mb-8">The Problem</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-[#0a0a0a] mb-8 leading-[0.95]">
              Posting Without Strategy Is Just Noise.
            </h2>
            <p className="text-lg text-neutral-700 font-serif-body leading-relaxed mb-6">
              Most business social media fails because it's treated like a task, not a system. Random posts, no direction, no voice — and nothing to show for it.
            </p>
            <p className="text-lg text-neutral-600 font-serif-body leading-relaxed">
              We build content systems around your positioning: who you are, what you stand for, and what your ideal client needs to see before they trust you enough to reach out.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="border-l-4 border-[#ff4c00] pl-8 space-y-8">
              {[
                { label: 'Without Strategy', value: 'Invisible to your audience' },
                { label: 'With Presence Only', value: 'Noise without conversion' },
                { label: 'With RAH', value: 'Intentional brand authority' },
              ].map((item, i) => (
                <div key={i} className="group">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">{item.label}</p>
                  <p className="text-2xl font-serif-display font-bold text-[#0a0a0a]">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES — Dark grid */}
      <section className="section bg-[#0a0a0a] text-white">
        <div className="container-clean">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[#ff4c00] text-xs uppercase tracking-[0.3em] mb-6">002 / What We Handle</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-white max-w-3xl leading-tight">
              The Full Scope of Social Execution.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { num: '01', title: 'Content Strategy', desc: 'Built around your brand positioning, not trending audio' },
              { num: '02', title: 'Copy & Voice', desc: 'Consistent tone that sounds like you — at your best' },
              { num: '03', title: 'Platform Direction', desc: 'Right channels, right cadence for your audience' },
              { num: '04', title: 'Creative Production', desc: 'Visuals that stop the scroll for the right reasons' },
              { num: '05', title: 'Engagement Systems', desc: 'Community management that builds real relationships' },
              { num: '06', title: 'Paid Social', desc: 'Targeted distribution that expands your reach with precision' },
              { num: '07', title: 'Analytics & Reporting', desc: 'Clear data tied to business outcomes, not vanity metrics' },
              { num: '08', title: 'Ongoing Optimization', desc: 'Monthly refinement based on what actually performs' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#111] p-8 hover:bg-[#ff4c00]/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <p className="text-[#ff4c00] text-xs font-bold mb-4">{item.num}</p>
                <h3 className="text-xl font-serif-display font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-white">
        <div className="container-clean">
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[#ff4c00] text-xs uppercase tracking-[0.3em] mb-6">003 / How It Works</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-[#0a0a0a] leading-tight">
              Four Phases. One Coherent System.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Brand Audit', desc: 'We analyze your current presence, audience, and positioning gaps.' },
              { num: '02', title: 'Strategy Build', desc: 'A clear content direction tied to your business goals.' },
              { num: '03', title: 'Content Launch', desc: 'We produce and publish with consistency and intentionality.' },
              { num: '04', title: 'Growth Cycle', desc: 'Monthly performance reviews, refinements, and strategic pivots.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="border-t-4 border-[#ff4c00] pt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <p className="text-6xl font-serif-display font-bold text-[#ff4c00]/20 mb-4 leading-none">{step.num}</p>
                <h3 className="text-2xl font-serif-display font-bold text-[#0a0a0a] mb-3">{step.title}</h3>
                <p className="text-neutral-600 font-serif-body leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#ff4c00] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff_0px,#fff_1px,transparent_1px,transparent_50px)]" />
        <div className="container-narrow text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-serif-display font-bold mb-8 leading-[0.9]">
              Ready to Build a Real Presence?
            </h2>
            <p className="text-xl font-serif-body mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Let's replace the random posting with a system that actually works for your brand.
            </p>
            <Button to="/contact" size="lg" className="bg-white text-[#ff4c00] hover:bg-[#fff5f0] border-white">
              Start the Conversation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section bg-[#f5f1eb]">
        <div className="container-clean max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm
              title="Tell Us About Your Brand"
              subtitle="We'll build a social strategy that's designed specifically for your audience and goals."
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SocialMediaManagementPage;
