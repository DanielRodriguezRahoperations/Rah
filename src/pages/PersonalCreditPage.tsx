import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';

// ── Shared bento card wrapper ─────────────────────────────────────────────────
const CrBentoCard = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <div style={{ background: '#111111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s' }}
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

// ── Card 1: Dispute letter generator ─────────────────────────────────────────
const CrLetterMockup = () => {
  const [phase, setPhase] = useState(0);
  const [barW, setBarW] = useState(0);
  const ACCOUNTS = ['Collection — $847 — Midland Credit', 'Late Payment — Capital One', 'Inquiry — 03/2024'];

  useEffect(() => {
    let active = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const run = async () => {
      while (active) {
        setPhase(0); setBarW(0);
        await sleep(600);
        setPhase(1);
        for (let i = 0; i <= 100 && active; i += 2) { setBarW(i); await sleep(25); }
        await sleep(300); if (!active) break;
        setPhase(2); await sleep(800); if (!active) break;
        setPhase(3); await sleep(800); if (!active) break;
        setPhase(4); await sleep(3000);
      }
    };
    run();
    return () => { active = false; };
  }, []);

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8, minHeight: 160 }}>
      {phase === 0 && <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontSize: 10, color: '#444' }}>Ready to analyze...</div></div>}
      {phase >= 1 && phase < 2 && (
        <div>
          <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>Analyzing credit report...</div>
          <div style={{ height: 3, background: '#1e1e1e', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${barW}%`, background: '#7A1C1C', transition: 'width 0.025s linear' }} />
          </div>
        </div>
      )}
      {phase >= 2 && (
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {['EXP', 'EQU', 'TU'].map((b) => (
              <motion.div key={b} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, padding: '3px 7px', fontSize: 9, color: '#888', fontWeight: 700, letterSpacing: '0.05em' }}>
                {b}
              </motion.div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
            {ACCOUNTS.map((acc, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15, duration: 0.3 }}
                style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 4, padding: '5px 8px', fontSize: 9, color: '#888', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: '#7A1C1C', fontSize: 8 }}>●</span>{acc}
              </motion.div>
            ))}
          </div>
          <motion.button
            animate={phase === 3 ? { boxShadow: ['0 0 0px rgba(122,28,28,0)', '0 0 20px rgba(122,28,28,0.7)', '0 0 0px rgba(122,28,28,0)'] } : {}}
            transition={{ duration: 1, repeat: 2 }}
            style={{ width: '100%', background: phase >= 4 ? '#16a34a' : '#7A1C1C', border: 'none', borderRadius: 5, color: '#fff', fontSize: 10, fontWeight: 600, padding: '7px', cursor: 'default', transition: 'background 0.3s' }}>
            {phase >= 4 ? '3 letters generated ✓' : 'Generate Letters'}
          </motion.button>
        </div>
      )}
    </div>
  );
};

// ── Card 2: Client portal with case timeline ──────────────────────────────────
const CrPortalMockup = () => {
  const steps = ['Intake', 'Analysis', 'Letters', 'Mailed', 'Response', 'Resolution'];
  const currentStep = 3;

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#CCC' }}>Maria S.</span>
        <span style={{ fontSize: 8, fontWeight: 700, background: '#f59e0b1a', color: '#f59e0b', border: '1px solid #f59e0b33', borderRadius: 4, padding: '2px 6px', letterSpacing: '0.05em' }}>LETTERS MAILED</span>
      </div>
      <div style={{ fontSize: 9, color: '#555', marginBottom: 4 }}>Certified tracking: 9400111899223847</div>
      <div style={{ fontSize: 9, color: '#555', marginBottom: 10 }}>Bureau response due: June 15</div>
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, minWidth: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: i <= currentStep ? '#7A1C1C' : '#1e1e1e', border: `1px solid ${i <= currentStep ? '#7A1C1C' : '#2a2a2a'}`, zIndex: 1, position: 'relative' }} />
            <div style={{ fontSize: 7, color: i === currentStep ? '#F5F5F5' : i < currentStep ? '#666' : '#333', textAlign: 'center', fontWeight: i === currentStep ? 700 : 400, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Card 3: All 3 bureaus with stagger ───────────────────────────────────────
const CrBureauMockup = () => (
  <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { name: 'Experian', abbr: 'EXP', delay: 0 },
        { name: 'Equifax', abbr: 'EQU', delay: 0.3 },
        { name: 'TransUnion', abbr: 'TU', delay: 0.6 },
      ].map(({ name, abbr, delay }) => (
        <motion.div key={name} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.4 }}
          style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 6, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#666', letterSpacing: '0.05em' }}>{abbr}</span>
            <span style={{ fontSize: 10, color: '#888' }}>{name}</span>
          </div>
          <motion.span initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: delay + 0.3, duration: 0.3, type: 'spring' }}
            style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>Letter sent ✓</motion.span>
        </motion.div>
      ))}
    </div>
  </div>
);

// ── Card 4: USPS tracking progress ───────────────────────────────────────────
const CrTrackingMockup = () => {
  const statuses = ['Label created', 'In transit', 'Delivered'];
  const [statusIdx, setStatusIdx] = useState(0);
  const [barW, setBarW] = useState(0);

  useEffect(() => {
    let active = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const run = async () => {
      while (active) {
        setStatusIdx(0); setBarW(0);
        await sleep(600);
        for (let w = 0; w <= 33 && active; w++) { setBarW(w); await sleep(20); }
        await sleep(500); if (!active) break;
        setStatusIdx(1);
        for (let w = 33; w <= 66 && active; w++) { setBarW(w); await sleep(20); }
        await sleep(500); if (!active) break;
        setStatusIdx(2);
        for (let w = 66; w <= 100 && active; w++) { setBarW(w); await sleep(20); }
        await sleep(3000);
      }
    };
    run();
    return () => { active = false; };
  }, []);

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ fontSize: 9, color: '#444', fontFamily: 'monospace', letterSpacing: '0.05em', marginBottom: 8 }}>9400111899223847234</div>
      <div style={{ height: 3, background: '#1e1e1e', borderRadius: 2, overflow: 'hidden', marginBottom: 10 }}>
        <div style={{ height: '100%', width: `${barW}%`, background: '#7A1C1C', transition: 'width 0.02s linear' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {statuses.map((s, i) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: i <= statusIdx ? '#7A1C1C' : '#1e1e1e', transition: 'background 0.3s' }} />
            <span style={{ fontSize: 8, color: i <= statusIdx ? '#888' : '#333', textAlign: 'center', transition: 'color 0.3s' }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Card 5: Before / After credit score ──────────────────────────────────────
const CrScoreMockup = () => {
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const DURATION = 1800; const start = Date.now();
    let raf: number;
    const update = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setBefore(Math.round(587 * e));
      setAfter(Math.round(649 * e));
      if (p < 1) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.3 }}
      style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', padding: '8px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#ef4444', fontFamily: 'monospace', letterSpacing: '-0.03em' }}>{before}</div>
          <div style={{ fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Before</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ fontSize: 14, color: '#555' }}>→</div>
          <div style={{ fontSize: 8, color: '#444', textAlign: 'center' }}>30–60<br />days</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#22c55e', fontFamily: 'monospace', letterSpacing: '-0.03em' }}>{after}+</div>
          <div style={{ fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>After</div>
        </div>
      </div>
    </motion.div>
  );
};

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
              <Button to="/credit-repair/intake" size="lg">Start Your Intake →</Button>
              <Button variant="secondary" size="lg" href="tel:+16236408884">(623) 640-8884</Button>
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
              Your credit, handled from start to finish.
            </h2>
            <p style={{ fontSize: 15, color: '#666', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              FCRA-compliant dispute letters, certified mail tracking, and a client portal that shows you every step in real time.
            </p>
          </motion.div>

          {/* Row 1 */}
          <div className="grid gap-4 mb-4 lg:grid-cols-[3fr_2fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <CrBentoCard title="Dispute Letter Generator" description="We scan your credit report and auto-generate FCRA-compliant dispute letters for every negative item.">
                <CrLetterMockup />
              </CrBentoCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <CrBentoCard title="Client Portal" description="Track your full case progress from intake to resolution, in real time.">
                <CrPortalMockup />
              </CrBentoCard>
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }}>
              <CrBentoCard title="All 3 Bureaus" description="Experian, Equifax, and TransUnion — every letter sent to every bureau simultaneously.">
                <CrBureauMockup />
              </CrBentoCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <CrBentoCard title="Certified Mail Tracking" description="Every dispute letter is sent certified mail with live USPS tracking so you always know it arrived.">
                <CrTrackingMockup />
              </CrBentoCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <CrBentoCard title="Real Score Movement" description="Most clients see measurable score improvement within 30–60 days of their first dispute round.">
                <CrScoreMockup />
              </CrBentoCard>
            </motion.div>
          </div>

          {/* Location links */}
          <div className="mt-10 pt-8" style={{ borderTop: '1px solid #1e1e1e' }}>
            <p style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12, textAlign: 'center' }}>Credit Repair Services</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { to: '/services/credit-repair-scottsdale', label: 'Credit Repair Scottsdale' },
                { to: '/services/credit-repair-phoenix', label: 'Credit Repair Phoenix' },
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
              <Button to="/credit-repair/intake">Start Your Intake →</Button>
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
