import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

const NewBusinessSetupPage = () => {
  return (
    <>
      <SEOHead
        title="New Business Setup Scottsdale Phoenix AZ | RAH Operations"
        description="Complete new business setup and launch systems in Scottsdale and Phoenix Arizona. Proper formation, structure, compliance, and foundation so your business can scale from day one."
        url={absoluteUrl('/new-business-setup')}
      />

      {/* HERO — high-contrast launch energy, white + red */}
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[55vw] h-screen bg-luxury-red" />
          <div className="absolute top-0 right-[55vw] w-32 h-screen bg-luxury-red/10 blur-2xl" />
        </div>

        <div className="container-clean relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Left — dark text on white */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.33, 0.66, 0.66, 1] }}
          >
            <p className="eyebrow-red mb-8">New Business Setup — Scottsdale & Phoenix, AZ</p>
            <h1
              className="font-serif-display font-bold text-slate-dark leading-[0.88] mb-10"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              Most Businesses
              <span className="block text-luxury-red">Fail Before</span>
              They Ever
              <span className="block">Start.</span>
            </h1>
            <p className="text-lg text-neutral-600 font-serif-body leading-relaxed mb-10 max-w-md">
              Not because of the idea — because the foundation is built wrong.
              We structure your business correctly from launch so it's ready
              for credit, growth, and scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/contact" size="lg">Start Your Business Setup</Button>
              <Button variant="secondary" size="lg" href="tel:+18884724621">(888) 472-4621</Button>
            </div>
          </motion.div>

          {/* Right — white text on red panel */}
          <motion.div
            className="relative lg:pl-16 py-12 lg:py-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.33, 0.66, 0.66, 1] }}
          >
            <div className="relative z-10 space-y-8">
              <p className="text-white/60 text-xs uppercase tracking-[0.25em] font-semibold">
                What You Get
              </p>
              {[
                { num: '01', label: 'Legal Foundation', detail: 'Entity formed and structured correctly' },
                { num: '02', label: 'Financial Setup', detail: 'Banking and EIN ready for operations' },
                { num: '03', label: 'Credit Ready', detail: 'Structure that supports credit building' },
                { num: '04', label: 'Launch Compliant', detail: 'State and federal compliance handled' },
                { num: '05', label: 'Scale Positioned', detail: 'Built to grow — not to be rebuilt later' },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  className="flex items-start gap-5 border-b border-white/15 pb-6 last:border-0 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                >
                  <span className="text-white/30 font-mono text-sm shrink-0 mt-1">{item.num}</span>
                  <div>
                    <p className="text-white font-serif-display font-bold text-lg leading-tight">{item.label}</p>
                    <p className="text-white/60 text-sm mt-1">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="section bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-luxury-red/8 rounded-full blur-[140px]" />
        </div>
        <div className="container-clean relative z-10">
          <motion.div
            className="mb-16 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow-red mb-6">The Setup Problem</p>
            <h2
              className="font-serif-display font-bold text-white leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              Formation Is Not Just Paperwork.<br />
              <span className="text-luxury-red">It's Architecture.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                heading: 'What Most People Do',
                points: [
                  'File an LLC with no strategy behind it',
                  'Skip operating agreements',
                  'Open a random business account',
                  'Ignore EIN and bureau setup',
                  'Miss compliance requirements',
                ],
                dark: false,
              },
              {
                heading: 'What Goes Wrong',
                points: [
                  'Personal assets remain exposed',
                  "Can't access business credit",
                  'Lenders see no real business',
                  'Tax structure is inefficient',
                  'Must restructure everything later',
                ],
                dark: false,
              },
              {
                heading: 'The RAH Approach',
                points: [
                  'Entity strategy built around your goals',
                  'All filings done correctly the first time',
                  'Banking and EIN ready for credit',
                  'Compliance handled from launch',
                  'Foundation built to scale',
                ],
                dark: true,
              },
            ].map((col, idx) => (
              <motion.div
                key={col.heading}
                className={`p-8 ${col.dark ? 'bg-luxury-red' : 'bg-white/5 border border-white/10'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <h3 className="font-serif-display font-bold text-white text-xl mb-6">{col.heading}</h3>
                <ul className="space-y-3">
                  {col.points.map((pt) => (
                    <li key={pt} className="flex gap-3 items-start text-sm">
                      <span className="text-white/50 mt-1">{col.dark ? '✓' : '—'}</span>
                      <span className={col.dark ? 'text-white/90' : 'text-white/60'}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
                Everything Required to Launch Correctly.
              </h2>
              <Button to="/contact">Start Your Setup</Button>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-x-12 gap-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                'LLC and corporation formation',
                'Business structure consultation',
                'EIN registration and setup',
                'Operating agreement drafting',
                'Business compliance guidance',
                'Banking and financial setup',
                'Licensing and registration support',
                'Structure optimization review',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-neutral-200 pb-4">
                  <span className="text-luxury-red mt-0.5">→</span>
                  <p className="text-sm text-slate-dark">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS — oversized step numbers */}
      <section className="section section-dark overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-luxury-red/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-clean relative z-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-4">Our Process</p>
            <h2
              className="font-serif-display font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Four Steps to Launch.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-0">
            {[
              { num: '01', title: 'Plan', desc: 'We map the right entity structure, tax positioning, and credit strategy for your goals.' },
              { num: '02', title: 'Form', desc: 'All state filings, EIN registration, and documentation handled without gaps.' },
              { num: '03', title: 'Set Up', desc: 'Banking, compliance, and operational systems established correctly.' },
              { num: '04', title: 'Launch', desc: 'You launch with a real business — positioned for credit, growth, and scale.' },
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
                  className="font-serif-display font-bold text-luxury-red/40 mb-2 leading-none"
                  style={{ fontSize: '5rem' }}
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
            Complete the Full Business System
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'LLC Setup & Structuring',
                desc: 'Deep-dive entity strategy and formation for businesses that want more than just a filing.',
                link: '/llc-setup',
                anchor: 'LLC setup Arizona business formation',
              },
              {
                title: 'Business Credit & Funding',
                desc: 'After setup comes capital. We build the credit profile that gets your business funded.',
                link: '/business-credit-and-funding',
                anchor: 'business credit funding Scottsdale Phoenix',
              },
              {
                title: 'Website Design & SEO',
                desc: 'Every new Arizona business needs a web presence that ranks. Our web development makes it happen.',
                link: '/website-design-and-seo',
                anchor: 'web development SEO near Scottsdale Arizona',
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
              If You Start Wrong,<br />You'll Spend Time Fixing It.
            </h2>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default NewBusinessSetupPage;
