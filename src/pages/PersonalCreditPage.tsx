import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const PersonalCreditPage = () => {
  return (
    <>
      <SEOHead
        title="Personal Credit Repair Scottsdale Phoenix AZ | RAH Operations"
        description="Strategic personal credit repair in Scottsdale and Phoenix Arizona. Structured improvement plans to strengthen your credit profile and expand your financial options."
        url={absoluteUrl('/personal-credit-repair')}
      />

      {/* HERO — transformation: dark left panel, light right panel */}
      <section className="relative min-h-screen bg-[#0f0f0f] flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-cream-50" />
          <div className="absolute top-0 right-1/2 w-32 h-full bg-gradient-to-r from-[#0f0f0f] to-cream-50" />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-luxury-red/8 rounded-full blur-[120px]" />
        </div>

        <div className="container-clean relative z-10 grid lg:grid-cols-2 gap-0 items-center min-h-[80vh]">
          {/* Left — dark: the problem */}
          <motion.div
            className="py-12 lg:py-0 pr-0 lg:pr-16"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.33, 0.66, 0.66, 1] }}
          >
            <p className="text-luxury-red text-xs uppercase tracking-[0.3em] font-semibold mb-8">
              Personal Credit Repair — Scottsdale & Phoenix, AZ
            </p>
            <h1
              className="font-serif-display font-bold text-white leading-[0.88] mb-10"
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
            >
              Your Credit
              <span className="block text-luxury-red">Score</span>
              Controls Your
              <span className="block">Options.</span>
            </h1>
            <p className="text-lg text-neutral-300 font-serif-body leading-relaxed mb-10 max-w-md">
              A weak credit profile limits everything — housing, financing, business approvals.
              We improve it the right way: with strategy, not shortcuts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/contact" size="lg">Request a Credit Review</Button>
              <Button variant="secondary" size="lg" href="tel:+18884724621">(888) 472-4621</Button>
            </div>
          </motion.div>

          {/* Right — light: the result */}
          <motion.div
            className="py-12 lg:py-0 pl-0 lg:pl-16"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.33, 0.66, 0.66, 1] }}
          >
            <p className="text-slate-dark text-xs uppercase tracking-[0.3em] font-semibold mb-8">
              After RAH Credit Strategy
            </p>

            {/* Score gauge visual */}
            <div className="mb-10">
              <div className="flex items-end gap-4 mb-2">
                <span
                  className="font-serif-display font-bold text-slate-dark leading-none"
                  style={{ fontSize: '6rem' }}
                >
                  780
                </span>
                <div className="mb-3">
                  <span className="text-luxury-red font-serif-display font-bold text-2xl">+</span>
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Excellent</p>
                </div>
              </div>

              {/* Score bar */}
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-luxury-red to-luxury-red/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 1.8, delay: 0.6, ease: 'easeOut' }}
                />
              </div>

              <div className="flex justify-between text-xs text-neutral-400 uppercase tracking-widest">
                <span>300</span>
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span className="text-luxury-red font-semibold">Excellent</span>
                <span>850</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Negative Items Removed', val: '✓' },
                { label: 'Utilization Optimized', val: '✓' },
                { label: 'Payment History Improved', val: '✓' },
                { label: 'Account Mix Strengthened', val: '✓' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 border-b border-neutral-200 pb-3">
                  <span className="text-luxury-red font-semibold">{item.val}</span>
                  <p className="text-sm text-slate-dark font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE APPROACH */}
      <section className="section bg-[#1a1a1a] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-luxury-red/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-clean relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow-red mb-6">The Right Approach</p>
              <h2
                className="font-serif-display font-bold text-white leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Credit Improvement Requires Strategy,
                <span className="text-luxury-red"> Not Shortcuts.</span>
              </h2>
              <p className="text-neutral-300 leading-relaxed mb-6">
                Quick-fix credit schemes are temporary at best and damaging at worst.
                Most people are given generic advice that doesn't hold up long-term.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                We take a structured approach — reviewing your full profile,
                identifying every limiting factor, and improving your score in a
                way that sticks.
              </p>
            </motion.div>

            <motion.div
              className="space-y-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                { before: 'Generic advice', after: 'Personalized strategy built around your profile' },
                { before: 'Quick-fix promises', after: 'Sustainable, long-term score improvement' },
                { before: 'No tracking or plan', after: 'Clear roadmap with measurable milestones' },
                { before: 'Ignored dispute rights', after: 'Full dispute strategy and documentation' },
                { before: 'Credit score guesswork', after: 'All three bureaus optimized systematically' },
              ].map((row) => (
                <div
                  key={row.before}
                  className="grid grid-cols-2 gap-4 border-b border-white/10 py-5"
                >
                  <div className="flex gap-3 items-start">
                    <span className="text-luxury-red/50 mt-0.5 text-sm">✕</span>
                    <p className="text-neutral-400 text-sm">{row.before}</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-luxury-red mt-0.5 text-sm">✓</span>
                    <p className="text-white text-sm">{row.after}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow-red mb-6">Capabilities</p>
              <h2
                className="font-serif-display font-bold text-slate-dark leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Everything Required to Repair, Build, and Protect Your Credit.
              </h2>
              <Button to="/contact">Request a Credit Review</Button>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-x-12 gap-y-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                'Credit report analysis (all 3 bureaus)',
                'Dispute strategy and documentation',
                'Creditor negotiation guidance',
                'Negative item identification & removal',
                'Credit utilization optimization',
                'Account mix and age strategy',
                'Ongoing monitoring and guidance',
                'Long-term credit building plan',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-neutral-200 pb-4">
                  <span className="text-luxury-red mt-0.5 shrink-0">→</span>
                  <p className="text-sm text-slate-dark">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-red/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-clean relative z-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-4">The Process</p>
            <h2
              className="font-serif-display font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Four Stages to a Stronger Profile.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-0">
            {[
              { num: '01', title: 'Review', desc: 'Full analysis of your credit reports across all three major bureaus.' },
              { num: '02', title: 'Identify', desc: 'Pinpoint every negative factor, inaccuracy, and optimization opportunity.' },
              { num: '03', title: 'Correct', desc: 'Execute dispute strategy and creditor communication to remove damaging items.' },
              { num: '04', title: 'Strengthen', desc: 'Build a long-term profile that improves your score and expands your access.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="border-l border-white/10 first:border-l-0 pl-8 first:pl-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <p
                  className="font-serif-display font-bold text-luxury-red/30 mb-4"
                  style={{ fontSize: '4.5rem', lineHeight: 1 }}
                >
                  {step.num}
                </p>
                <h3 className="text-2xl font-serif-display font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES — SEO internal links */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <p className="eyebrow-red mb-6">Related Services</p>
          <h2
            className="font-serif-display font-bold text-slate-dark mb-12"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Strengthen Your Full Financial Position
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Business Credit & Funding',
                desc: 'Personal credit strength accelerates business approvals. Build both profiles in parallel.',
                link: '/business-credit-and-funding',
                anchor: 'business credit building Scottsdale Phoenix AZ',
              },
              {
                title: 'New Business Setup',
                desc: 'A strong personal credit profile is the foundation for business formation and funding readiness.',
                link: '/new-business-setup',
                anchor: 'new business setup Arizona',
              },
              {
                title: 'Website Design & SEO',
                desc: 'Grow your business presence online with web development and digital marketing near Scottsdale.',
                link: '/website-design-and-seo',
                anchor: 'web development digital marketing Scottsdale AZ',
              },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.link}
                title={s.anchor}
                className="block border border-neutral-200 bg-white p-7 hover:border-luxury-red/40 hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="text-lg font-serif-display font-bold text-slate-dark mb-3 group-hover:text-luxury-red transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs uppercase tracking-widest text-luxury-red">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section bg-white">
        <div className="container-clean max-w-3xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-4">Get Started</p>
            <h2
              className="font-serif-display font-bold text-slate-dark"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              If Your Credit Is Holding You Back,<br />It Needs to Be Fixed Correctly.
            </h2>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default PersonalCreditPage;
