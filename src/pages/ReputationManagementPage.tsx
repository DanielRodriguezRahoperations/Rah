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

      {/* HERO — Architectural minimalism: ivory + deep forest green */}
      <section className="relative min-h-screen bg-[#1a2e1a] flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a2e1a_0%,#0f1f0f_100%)]" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[#f5f0e8]/3" />

        <div className="container-clean relative z-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.33, 0.66, 0.66, 1] }}
          >
            <div className="w-12 h-0.5 bg-[#a8c5a0] mb-12" />
            <p className="text-[#a8c5a0] text-xs uppercase tracking-[0.3em] mb-8">Reputation Management</p>
            <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-serif-display font-bold leading-[0.9] text-[#f5f0e8] mb-10">
              What People
              <span className="block italic text-[#a8c5a0]">Find</span>
              Defines You.
            </h1>
            <p className="text-xl text-[#f5f0e8]/70 font-serif-body leading-relaxed max-w-xl mb-12">
              Every search result, every review, every mention shapes how customers judge your business before you say a word. We make sure that picture is accurate, strong, and working in your favor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/contact" size="lg" className="bg-[#a8c5a0] border-[#a8c5a0] text-[#0f1f0f] hover:bg-[#8fb087]">
                Begin Assessment
              </Button>
              <Button to="tel:+18884724621" variant="outline" size="lg" className="border-[#f5f0e8]/30 text-[#f5f0e8] hover:border-[#a8c5a0] hover:text-[#a8c5a0]">
                (888) 472-4621
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="border border-[#a8c5a0]/20 p-8 space-y-6">
              {[
                { label: 'Review Score Avg.', value: '4.9★' },
                { label: 'Brands Protected', value: '40+' },
                { label: 'Sentiment Shift', value: '+68%' },
              ].map((s) => (
                <div key={s.label} className="border-b border-[#a8c5a0]/10 pb-6 last:border-0 last:pb-0">
                  <p className="text-4xl font-serif-display font-bold text-[#a8c5a0]">{s.value}</p>
                  <p className="text-xs uppercase tracking-widest text-[#f5f0e8]/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section bg-[#f5f0e8]">
        <div className="container-clean grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#1a2e1a] text-xs uppercase tracking-[0.3em] mb-8">The Reality</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-[#1a2e1a] mb-8 leading-[0.95]">
              A Weak Reputation Loses Leads Before You Know They Existed.
            </h2>
            <p className="text-lg text-neutral-700 font-serif-body leading-relaxed mb-6">
              Customers research before they reach out. They read reviews, scan search results, check your social presence, and form a judgment in seconds. If what they find doesn't match the quality of your work, you lose before the conversation even begins.
            </p>
            <p className="text-lg text-neutral-600 font-serif-body leading-relaxed">
              Reputation management isn't damage control. It's building a presence that consistently earns trust — proactively, not reactively.
            </p>
          </motion.div>

          <motion.div
            className="space-y-0"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {[
              { before: 'Scattered, unmanaged reviews', after: 'Curated five-star authority' },
              { before: 'Weak or inconsistent presence', after: 'Distinctive, credible brand' },
              { before: 'Reactive damage control', after: 'Proactive trust architecture' },
              { before: 'Lost leads you never see', after: 'Customers who choose you first' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center border-b border-[#1a2e1a]/10 py-6 last:border-0"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-sm text-neutral-500 line-through">{item.before}</span>
                <span className="text-[#1a2e1a] font-bold">→</span>
                <span className="text-sm font-semibold text-[#1a2e1a]">{item.after}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-[#1a2e1a] text-[#f5f0e8]">
        <div className="container-clean">
          <motion.div
            className="mb-16 max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[#a8c5a0] text-xs uppercase tracking-[0.3em] mb-6">What We Do</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold leading-tight">
              Complete Reputation Architecture.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Reputation Audit', desc: 'Full analysis of reviews, mentions, search results, and gaps' },
              { num: '02', title: 'Review Strategy', desc: 'Systems to consistently generate and respond to reviews' },
              { num: '03', title: 'Mention Monitoring', desc: 'Ongoing tracking of what the internet says about your brand' },
              { num: '04', title: 'Response Protocols', desc: 'Professional, on-brand responses to every piece of feedback' },
              { num: '05', title: 'Trust Signals', desc: 'Showcase proof, credentials, and authority across platforms' },
              { num: '06', title: 'Profile Optimization', desc: 'Every directory, platform, and listing working for you' },
              { num: '07', title: 'Authority Positioning', desc: 'Content and presence that establish genuine industry leadership' },
              { num: '08', title: 'Ongoing Refinement', desc: 'Monthly monitoring, reporting, and strategic evolution' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="border border-[#a8c5a0]/15 p-8 hover:border-[#a8c5a0]/40 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <p className="text-[#a8c5a0] text-xs font-bold mb-5">{item.num}</p>
                <h3 className="text-xl font-serif-display font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-[#f5f0e8]/55 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-white">
        <div className="container-clean">
          <motion.div
            className="mb-20 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[#1a2e1a] text-xs uppercase tracking-[0.3em] mb-6">The Method</p>
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-[#1a2e1a] leading-tight">
              Four Phases to a Reputation That Works.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { num: 'I', title: 'Assessment', desc: 'Understand where you stand — every review, search result, and trust gap' },
              { num: 'II', title: 'Strategy', desc: 'A clear reputation plan built around your business goals' },
              { num: 'III', title: 'Execution', desc: 'Implementation across all touchpoints where customers judge you' },
              { num: 'IV', title: 'Evolution', desc: 'Continuous monitoring and refinement as your business grows' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-16 h-16 border-2 border-[#1a2e1a] flex items-center justify-center mb-8">
                  <span className="text-2xl font-serif-display font-bold text-[#1a2e1a]">{step.num}</span>
                </div>
                <h3 className="text-2xl font-serif-display font-bold text-[#1a2e1a] mb-4">{step.title}</h3>
                <p className="text-neutral-600 font-serif-body leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#f5f0e8] relative overflow-hidden">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-0.5 bg-[#1a2e1a] mx-auto mb-12" />
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-[#1a2e1a] mb-8 leading-[0.95]">
              Your Reputation Is Working<br />24 Hours a Day.
            </h2>
            <p className="text-xl font-serif-body text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Make sure it's working for you. Let's assess where you stand and build a system that earns trust consistently.
            </p>
            <Button to="/contact" size="lg" className="bg-[#1a2e1a] border-[#1a2e1a] text-[#f5f0e8] hover:bg-[#0f1f0f]">
              Begin the Assessment
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
          >
            <ContactForm
              title="Start Your Reputation Assessment"
              subtitle="Tell us about your business and we'll identify the gaps and opportunities in your current reputation presence."
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ReputationManagementPage;
