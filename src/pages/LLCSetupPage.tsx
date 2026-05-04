import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const LLCSetupPage = () => {
  return (
    <>
      <SEOHead
        title="LLC Setup & Business Structuring Scottsdale Phoenix AZ | RAH Operations"
        description="Professional LLC formation and business structuring in Scottsdale and Phoenix Arizona. Build a proper foundation for credit, growth, and legal protection from day one."
        url={absoluteUrl('/llc-setup')}
      />

      {/* HERO — architectural, blueprint-inspired */}
      <section className="relative min-h-screen bg-[#12192a] flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #4a9eff 1px, transparent 1px), linear-gradient(to bottom, #4a9eff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#1a4fa0]/20 rounded-full blur-[160px]" />
        </div>

        <div className="container-clean relative z-10">
          <motion.p
            className="text-[#4a9eff] text-xs uppercase tracking-[0.3em] font-semibold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Business Structuring & LLC Setup — Arizona
          </motion.p>

          <motion.h1
            className="font-serif-display font-bold text-white leading-[0.88] mb-10 max-w-5xl"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.33, 0.66, 0.66, 1] }}
          >
            Filing an LLC
            <span className="block text-[#4a9eff]">Is Easy.</span>
            Building It Correctly
            <span className="block text-[#4a9eff]">Is Not.</span>
          </motion.h1>

          <motion.p
            className="text-xl text-neutral-300 font-serif-body max-w-2xl leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Most businesses are formed with zero strategy. That leads to problems with
            credit access, tax positioning, compliance, and growth. We build the structure
            correctly from day one.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Button to="/contact" size="lg">Start Your Business Setup</Button>
            <Button variant="secondary" size="lg" href="tel:+16236408884">(623) 640-8884</Button>
          </motion.div>

          {/* Blueprint label strip */}
          <motion.div
            className="mt-20 grid grid-cols-4 gap-6 border-t border-[#4a9eff]/20 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { label: 'Legal Protection', val: '✓' },
              { label: 'Tax Positioning', val: '✓' },
              { label: 'Credit Foundation', val: '✓' },
              { label: 'Scale Ready', val: '✓' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-[#4a9eff] font-serif-display font-bold text-2xl mb-1">{item.val}</p>
                <p className="text-xs uppercase tracking-widest text-white/40">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT STRUCTURE IMPACTS */}
      <section className="section bg-white overflow-hidden">
        <div className="container-clean">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow-red mb-6">The Foundation Problem</p>
              <h2
                className="font-serif-display font-bold text-slate-dark leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Most Businesses Are Built Without a Real Structure.
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Filing paperwork doesn't create a real business. Without the right structure,
                you limit your ability to access funding, protect yourself legally, and
                operate with credibility.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                We build your business architecture with those factors in mind from day one,
                so you're never fixing preventable mistakes down the road.
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
                { impact: 'Legal Protection', result: 'Personal asset separation from business liability' },
                { impact: 'Tax Positioning', result: 'Optimal entity structure for your tax situation' },
                { impact: 'Business Credibility', result: 'Lenders, vendors, and clients see a real company' },
                { impact: 'Funding Readiness', result: 'Structure lenders require before they approve capital' },
                { impact: 'Credit Building', result: 'Proper EIN and bureau setup to build business credit' },
              ].map((row) => (
                <div
                  key={row.impact}
                  className="border-b border-neutral-100 py-5 grid grid-cols-[1fr_1.2fr] gap-4 items-center hover:bg-cream-50 transition-colors px-2 -mx-2"
                >
                  <p className="text-sm font-semibold text-slate-dark">{row.impact}</p>
                  <p className="text-sm text-neutral-500">{row.result}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES — dark grid */}
      <section className="section bg-[#12192a] overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4a9eff]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-clean relative z-10">
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#4a9eff] text-xs uppercase tracking-[0.25em] font-semibold mb-4">Capabilities</p>
            <h2
              className="font-serif-display font-bold text-white leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Everything Required to Properly Establish Your Business.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#4a9eff]/10">
            {[
              { icon: '⬡', title: 'LLC & Corp Formation', desc: 'Proper entity selection and filing for your business model and goals.' },
              { icon: '⬡', title: 'EIN Registration', desc: 'Federal tax ID setup required for banking, hiring, and credit building.' },
              { icon: '⬡', title: 'Operating Agreement', desc: 'Legally sound agreements that define ownership, roles, and operations.' },
              { icon: '⬡', title: 'Business Banking', desc: 'Setup guidance for the right accounts to separate your finances.' },
              { icon: '⬡', title: 'Compliance Guidance', desc: 'Stay in good standing with state and federal requirements.' },
              { icon: '⬡', title: 'Structure Consultation', desc: 'Entity strategy aligned to your credit, tax, and growth objectives.' },
              { icon: '⬡', title: 'Credit Foundation', desc: 'EIN-based credit setup to start building your business profile.' },
              { icon: '⬡', title: 'Entity Optimization', desc: 'Restructuring guidance if your current setup is holding you back.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-[#12192a] p-7 hover:bg-[#182135] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <p className="text-[#4a9eff] text-lg mb-4">{item.icon}</p>
                <h4 className="text-white font-serif-display font-bold text-base mb-2">{item.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
            <p className="eyebrow-red mb-4">How We Build It</p>
            <h2
              className="font-serif-display font-bold text-slate-dark"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Four Steps to a Real Business.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Plan', desc: 'Define the right entity type, structure, and strategy for your specific goals.' },
              { num: '02', title: 'Form', desc: 'Handle all state filings, EIN registration, and documentation correctly.' },
              { num: '03', title: 'Set Up', desc: 'Establish proper banking, operating agreements, and compliance systems.' },
              { num: '04', title: 'Position', desc: 'Prepare your structure for business credit, funding, and scale.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <p
                  className="font-serif-display font-bold text-[#4a9eff] mb-4"
                  style={{ fontSize: '3.5rem', lineHeight: 1 }}
                >
                  {step.num}
                </p>
                <h3 className="text-xl font-serif-display font-bold text-slate-dark mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES — internal SEO links */}
      <section className="section section-dark">
        <div className="container-clean">
          <p className="eyebrow-red mb-6">Related Services</p>
          <h2
            className="font-serif-display font-bold text-white mb-12"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Build the Whole System — Not Just the Entity
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Business Credit & Funding',
                desc: 'Once your LLC is structured properly, we build the business credit profile that unlocks capital.',
                link: '/business-credit-and-funding',
                anchor: 'business credit building Arizona',
              },
              {
                title: 'Website Design & SEO',
                desc: 'A professionally structured business needs an online presence that matches. Get found in Scottsdale and Phoenix.',
                link: '/website-design-and-seo',
                anchor: 'website design SEO Scottsdale Phoenix AZ',
              },
              {
                title: 'New Business Setup',
                desc: 'End-to-end launch guidance covering your full business setup beyond just the LLC filing.',
                link: '/new-business-setup',
                anchor: 'new business setup Arizona',
              },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.link}
                title={s.anchor}
                className="block border border-white/10 p-7 hover:border-[#4a9eff]/50 hover:bg-white/5 transition-all duration-300 group"
              >
                <h3 className="text-lg font-serif-display font-bold text-white mb-3 group-hover:text-[#4a9eff] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs uppercase tracking-widest text-[#4a9eff]">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section bg-cream-50">
        <div className="container-clean max-w-3xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-4">Start Today</p>
            <h2
              className="font-serif-display font-bold text-slate-dark"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              If Your Business Isn't Structured Right,<br />It Will Hold You Back.
            </h2>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default LLCSetupPage;
