import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

// ── Shared bento card wrapper ─────────────────────────────────────────────────
const BcBentoCard = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <div style={{ background: '#111111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden', height: '100%', transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s' }}
    onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = '#333'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'; }}
    onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = '#1e1e1e'; el.style.transform = ''; el.style.boxShadow = ''; }}
  >
    <div style={{ padding: '18px 18px 0' }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#E0E0E0', marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 12, color: '#555555', lineHeight: 1.5 }}>{description}</p>
    </div>
    <div style={{ padding: '8px 18px 18px' }}>{children}</div>
  </div>
);

// ── Card 1: Build steps with glowing dot ──────────────────────────────────────
const BcBuildMockup = () => {
  const [step, setStep] = useState(0);
  const steps = ['EIN & Biz Address', 'Dun & Bradstreet', 'Net-30 Accounts', 'Revolving Credit', 'Funding Access'];

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 1400);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: i <= step ? '#7A1C1C' : '#1e1e1e', transition: 'background 0.4s' }} />
              {i === step && (
                <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#7A1C1C' }} />
              )}
            </div>
            <span style={{ fontSize: 10, color: i < step ? '#666' : i === step ? '#E0E0E0' : '#333', fontWeight: i === step ? 700 : 400, transition: 'color 0.4s' }}>{s}</span>
            {i < step && <span style={{ marginLeft: 'auto', fontSize: 9, color: '#22c55e' }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Card 2: D&B Paydex score counting up ─────────────────────────────────────
const BcBureauMockup = () => {
  const [score, setScore] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const DURATION = 1600; const start = Date.now();
    let raf: number;
    const update = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(80 * e));
      if (p < 1) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.3 }}
      style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div style={{ fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Dun &amp; Bradstreet</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: '#22c55e', fontFamily: 'monospace', letterSpacing: '-0.03em', lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 9, color: '#444', marginTop: 4 }}>Paydex Score</div>
        <div style={{ marginTop: 10, height: 3, background: '#1e1e1e', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div style={{ height: '100%', background: '#22c55e', width: `${score}%`, transition: 'width 0.05s linear' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 8, color: '#333' }}>
          <span>0</span><span style={{ color: score >= 75 ? '#22c55e' : '#333' }}>Good</span><span>100</span>
        </div>
      </div>
    </motion.div>
  );
};

// ── Card 3: Personal vs Business guarantee comparison ─────────────────────────
const BcGuaranteeMockup = () => (
  <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
    {[
      { label: 'No personal guarantee', yes: true },
      { label: 'Separate from SSN', yes: true },
      { label: 'Builds independently', yes: true },
      { label: 'Higher limits', yes: true },
    ].map(({ label, yes }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: yes ? '#22c55e' : '#ef4444', fontWeight: 700 }}>{yes ? '✓' : '✗'}</span>
        <span style={{ fontSize: 10, color: '#888' }}>{label}</span>
      </div>
    ))}
  </div>
);

// ── Card 4: Funding lines fading in ───────────────────────────────────────────
const BcFundingMockup = () => {
  const lines = [
    { name: 'Nav Prime', amount: '$50,000', type: 'Business Line' },
    { name: 'Divvy Card', amount: '$25,000', type: 'Corporate Card' },
    { name: 'Fundbox', amount: '$150,000', type: 'LOC' },
  ];

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {lines.map(({ name, amount, type }, i) => (
        <motion.div key={name} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.25, duration: 0.4 }}
          style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 6, padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#CCC' }}>{name}</div>
            <div style={{ fontSize: 8, color: '#555', marginTop: 1 }}>{type}</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', fontFamily: 'monospace' }}>{amount}</div>
        </motion.div>
      ))}
    </div>
  );
};

// ── Card 5: Month 1–12 timeline ───────────────────────────────────────────────
const BcTimelineMockup = () => {
  const [active, setActive] = useState(0);
  const milestones = [
    { month: 'M1–2', label: 'Foundation', detail: 'EIN, address, D-U-N-S number' },
    { month: 'M3–4', label: 'Net-30s', detail: 'First vendor accounts reporting' },
    { month: 'M5–6', label: 'Score Builds', detail: 'Paydex 70+ established' },
    { month: 'M7–9', label: 'Revolving', detail: 'Business cards & credit lines' },
    { month: 'M10–12', label: 'Funding', detail: '5-6 figure funding access' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % milestones.length), 1600);
    return () => clearInterval(id);
  }, [milestones.length]);

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        {milestones.map((m, i) => (
          <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: i <= active ? '#7A1C1C' : '#1e1e1e', transition: 'background 0.4s', position: 'relative' }}>
              {i === active && <motion.div animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1, repeat: Infinity }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#7A1C1C' }} />}
            </div>
            <span style={{ fontSize: 7, color: i === active ? '#E0E0E0' : '#444', fontWeight: i === active ? 700 : 400, transition: 'color 0.4s' }}>{m.month}</span>
          </div>
        ))}
      </div>
      <div style={{ background: '#141414', borderRadius: 6, padding: '8px 10px', minHeight: 42 }}>
        <motion.div key={active} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#E0E0E0', marginBottom: 2 }}>{milestones[active].label}</div>
          <div style={{ fontSize: 9, color: '#666' }}>{milestones[active].detail}</div>
        </motion.div>
      </div>
    </div>
  );
};

const BusinessCreditPage = () => {
  return (
    <>
      <SEOHead
        title="Business Credit & Funding Scottsdale Phoenix AZ | RAH Operations"
        description="Build business credit and unlock funding in Scottsdale and Phoenix Arizona. Structured credit strategies to help companies access capital and scale with confidence."
        url={absoluteUrl('/business-credit-and-funding')}
      />

      {/* HERO — dark financial power */}
      <section className="relative min-h-screen bg-[#0f0f0f] flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)' }}
          />
          <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full bg-[#c8a96e]/8 blur-[180px]" />
        </div>

        <div className="container-clean relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
          <div>
            <motion.p
              className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] font-semibold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Business Credit & Funding — Arizona
            </motion.p>

            <motion.h1
              className="font-serif-display font-bold text-white leading-[0.88] mb-10"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.33, 0.66, 0.66, 1] }}
            >
              Your Business
              <span className="block text-[#c8a96e]">Deserves</span>
              Its Own
              <span className="block text-[#c8a96e]">Credit.</span>
            </motion.h1>

            <motion.p
              className="text-xl text-neutral-300 font-serif-body max-w-xl leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              If your business depends on your personal credit, it isn't structured correctly.
              We fix the foundation, build the profile, and create a path to real capital.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Button to="/contact" size="lg">Request a Credit Analysis</Button>
              <Button variant="secondary" size="lg" href="tel:+16236408884">(623) 640-8884</Button>
            </motion.div>
          </div>

          {/* Credit score visual */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative border border-white/10 p-8 bg-white/3">
              <p className="text-[#c8a96e] text-xs uppercase tracking-[0.2em] mb-6">Business Credit Score</p>
              <div className="flex items-end gap-3 mb-8">
                <span className="font-serif-display font-bold text-white" style={{ fontSize: '5rem', lineHeight: 1 }}>800</span>
                <span className="text-[#c8a96e] text-2xl font-serif-display mb-2">+</span>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  { label: 'D&B Paydex', score: 80, color: '#c8a96e' },
                  { label: 'Experian Business', score: 76, color: '#c8a96e' },
                  { label: 'Equifax Business', score: 90, color: '#c8a96e' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/50">{item.label}</span>
                      <span className="text-[#c8a96e]">{item.score}</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs text-white/40 uppercase tracking-widest">Status: Fundable</p>
              </div>
              {/* corner marks */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c8a96e]" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c8a96e]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENTO SHOWCASE */}
      <section style={{ background: '#0A0A0A', padding: '80px 0' }}>
        <div className="container-clean">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#7A1C1C', textTransform: 'uppercase', marginBottom: 12 }}>HOW IT WORKS</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700, color: '#F5F5F5', fontFamily: 'Playfair Display, serif', lineHeight: 1.1, marginBottom: 16 }}>
              Build business credit that works without you.
            </h2>
            <p style={{ fontSize: 15, color: '#666', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              A structured system that separates your business from your personal credit — so you can access capital without a personal guarantee.
            </p>
          </motion.div>

          {/* Row 1 */}
          <div className="grid gap-4 mb-4 lg:grid-cols-[3fr_2fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <BcBentoCard title="Credit Build Roadmap" description="Step-by-step progression from EIN setup to 6-figure funding access — tracked in real time.">
                <BcBuildMockup />
              </BcBentoCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <BcBentoCard title="D&B Paydex Score" description="We establish your Dun & Bradstreet profile and build your Paydex score to 80+ for lender credibility.">
                <BcBureauMockup />
              </BcBentoCard>
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid gap-4 sm:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <BcBentoCard title="No Personal Guarantee" description="Business credit built right keeps your personal assets and SSN out of every application.">
                <BcGuaranteeMockup />
              </BcBentoCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <BcBentoCard title="Funding Lines Unlocked" description="Net-30 vendors, revolving cards, and business credit lines — all reporting to the right bureaus.">
                <BcFundingMockup />
              </BcBentoCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <BcBentoCard title="12-Month Timeline" description="Most clients reach fundable business credit status within 6–12 months of starting the program.">
                <BcTimelineMockup />
              </BcBentoCard>
            </motion.div>
          </div>

          {/* Location links */}
          <div className="mt-10 pt-8" style={{ borderTop: '1px solid #1e1e1e' }}>
            <p style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12, textAlign: 'center' }}>Business Credit Services</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { to: '/services/business-credit-scottsdale', label: 'Business Credit Scottsdale' },
                { to: '/services/business-credit-phoenix', label: 'Business Credit Phoenix' },
                { to: '/services/business-funding-arizona', label: 'Business Funding Arizona' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} style={{ fontSize: 11, color: '#444', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#9d3f3f')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM — light section */}
      <section className="section bg-cream-50 overflow-hidden">
        <div className="container-clean">
          <motion.div
            className="mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow-red mb-6">The Reality</p>
            <h2
              className="font-serif-display font-bold text-slate-dark leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Access to Capital Comes Down to Structure — Not Luck.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {[
              {
                label: 'Without Business Credit',
                items: [
                  'Personal assets at risk on every loan',
                  'Lower limits, higher rates',
                  'Lenders see a risk — not a business',
                  'Funding doors stay closed',
                  'Growth is capped by personal score',
                ],
                accent: '#7a1c1c',
                dark: false,
              },
              {
                label: 'With a Built Business Profile',
                items: [
                  'Business borrows — you stay protected',
                  'Higher credit limits unlocked',
                  'Lenders see a fundable company',
                  'Multiple capital sources available',
                  'Business scales independently',
                ],
                accent: '#c8a96e',
                dark: true,
              },
            ].map((col, i) => (
              <motion.div
                key={col.label}
                className={`p-10 ${col.dark ? 'bg-[#1a1a1a]' : 'bg-white border border-neutral-200'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-6"
                  style={{ color: col.accent }}>{col.label}</p>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-4 items-start">
                      <span className="mt-1 text-lg leading-none" style={{ color: col.accent }}>
                        {col.dark ? '✓' : '✕'}
                      </span>
                      <span className={`text-sm leading-relaxed ${col.dark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES — dark numbered list */}
      <section className="section section-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c8a96e]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-clean relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow-red mb-6">Capabilities</p>
              <h2
                className="font-serif-display font-bold text-white leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Everything Required to Build and Leverage Your Business Credit.
              </h2>
              <Button to="/contact">Start Building Now</Button>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-px bg-white/10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                'Business structure optimization',
                'Credit profile setup & filing',
                'Vendor & trade line strategy',
                'D-U-N-S & bureau registration',
                'Business credit building plan',
                'Funding & financing strategy',
                'Capital application guidance',
                'Ongoing credit optimization',
              ].map((item, i) => (
                <div key={item} className="bg-[#1a1a1a] p-6 hover:bg-[#222] transition-colors">
                  <span className="text-[#c8a96e] text-xs font-mono mb-3 block">0{i + 1}</span>
                  <p className="text-white text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS — horizontal steps */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-red mb-4">Our Process</p>
            <h2
              className="font-serif-display font-bold text-slate-dark"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Four Phases to Fundable.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-0">
            {[
              { num: '01', title: 'Assess', desc: 'Evaluate your current structure and credit position against lender standards.' },
              { num: '02', title: 'Build', desc: 'Establish and strengthen your business credit profile across all bureaus.' },
              { num: '03', title: 'Position', desc: 'Prepare your business financials and documents for funding approval.' },
              { num: '04', title: 'Access', desc: 'Secure capital lines and expand credit opportunities with confidence.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="border-l border-neutral-200 first:border-l-0 pl-8 first:pl-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <p className="font-serif-display font-bold text-[#c8a96e] mb-4"
                  style={{ fontSize: '3rem', lineHeight: 1 }}>{step.num}</p>
                <h3 className="text-xl font-serif-display font-bold text-slate-dark mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES — internal linking for SEO */}
      <section className="section section-dark">
        <div className="container-clean">
          <p className="eyebrow-red mb-6">Related Services</p>
          <h2
            className="font-serif-display font-bold text-white mb-12"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            Pair Business Credit With These Growth Systems
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'New Business Setup',
                desc: 'Proper LLC formation and structure is the foundation your credit profile is built on.',
                link: '/new-business-setup',
                anchor: 'new business setup Arizona',
              },
              {
                title: 'Website Design & SEO',
                desc: 'A credible web presence signals legitimacy to lenders. Our web development near Scottsdale builds that.',
                link: '/website-design-and-seo',
                anchor: 'professional web development Scottsdale AZ',
              },
              {
                title: 'Personal Credit Repair',
                desc: 'Strong personal credit accelerates business approvals. Work both profiles simultaneously.',
                link: '/personal-credit-repair',
                anchor: 'personal credit repair Scottsdale Phoenix',
              },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.link}
                title={s.anchor}
                className="block border border-white/10 p-7 hover:border-[#c8a96e]/50 hover:bg-white/5 transition-all duration-300 group"
              >
                <h3 className="text-lg font-serif-display font-bold text-white mb-3 group-hover:text-[#c8a96e] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs uppercase tracking-widest text-[#c8a96e]">Learn More →</span>
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
            <p className="eyebrow-red mb-4">Get Started</p>
            <h2
              className="font-serif-display font-bold text-slate-dark"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              If You're Not Set Up Correctly,<br />You're Leaving Money on the Table.
            </h2>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default BusinessCreditPage;
