import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

// ── Shared bento card wrapper ─────────────────────────────────────────────────
const WsdBentoCard = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
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

// ── Card 1: Code editor typing animation ──────────────────────────────────────
type WsdCodePart = { t: string; c: string };
const WSD_CODE: { parts: WsdCodePart[] }[] = [
  { parts: [{ t: '// HeroSection.tsx', c: '#555' }] },
  { parts: [{ t: 'export default function ', c: '#c084fc' }, { t: 'HeroSection', c: '#60a5fa' }, { t: '() {', c: '#ccc' }] },
  { parts: [{ t: '  const ', c: '#c084fc' }, { t: '[visible]', c: '#ccc' }, { t: ' = useState(', c: '#ccc' }, { t: 'false', c: '#fb923c' }, { t: ')', c: '#ccc' }] },
  { parts: [{ t: '  useEffect', c: '#c084fc' }, { t: '(() => {', c: '#ccc' }] },
  { parts: [{ t: '    setVisible(', c: '#ccc' }, { t: 'true', c: '#fb923c' }, { t: ')', c: '#ccc' }] },
  { parts: [{ t: '  }, [])', c: '#ccc' }] },
  { parts: [{ t: '  return (', c: '#ccc' }] },
  { parts: [{ t: '    <', c: '#ccc' }, { t: 'section', c: '#60a5fa' }, { t: ' className=', c: '#ccc' }, { t: '"hero"', c: '#86efac' }, { t: '>', c: '#ccc' }] },
  { parts: [{ t: '      <', c: '#ccc' }, { t: 'h1', c: '#60a5fa' }, { t: ' className=', c: '#ccc' }, { t: '"heading"', c: '#86efac' }, { t: '>', c: '#ccc' }] },
  { parts: [{ t: '        Your Website, Built Right.', c: '#e5e7eb' }] },
  { parts: [{ t: '      </', c: '#ccc' }, { t: 'h1', c: '#60a5fa' }, { t: '>', c: '#ccc' }] },
  { parts: [{ t: '      <', c: '#ccc' }, { t: 'Button', c: '#60a5fa' }, { t: ' to=', c: '#ccc' }, { t: '"/contact"', c: '#86efac' }, { t: '>', c: '#ccc' }] },
  { parts: [{ t: '        Get Started', c: '#e5e7eb' }] },
  { parts: [{ t: '      </', c: '#ccc' }, { t: 'Button', c: '#60a5fa' }, { t: '>', c: '#ccc' }] },
  { parts: [{ t: '    </', c: '#ccc' }, { t: 'section', c: '#60a5fa' }, { t: '>', c: '#ccc' }] },
  { parts: [{ t: '  )', c: '#ccc' }] },
  { parts: [{ t: '}', c: '#ccc' }] },
];

const WsdCodeEditor = () => {
  const [lines, setLines] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let active = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const run = async () => {
      while (active) {
        setLines(0);
        await sleep(600);
        for (let i = 1; i <= WSD_CODE.length && active; i++) { setLines(i); await sleep(300); }
        await sleep(3200);
      }
    };
    run();
    return () => { active = false; };
  }, [inView]);

  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.3 }}
      style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 8, overflow: 'hidden', marginTop: 8 }}>
      <div style={{ background: '#141414', borderBottom: '1px solid #1e1e1e', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
        <div style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: 4, padding: '2px 8px', fontSize: 10, color: '#666', marginLeft: 4 }}>HomePage.tsx</div>
      </div>
      <div style={{ padding: '12px 14px', minHeight: 200, display: 'flex', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', userSelect: 'none' }}>
          {WSD_CODE.slice(0, lines).map((_, i) => <div key={i} style={{ fontSize: 11, lineHeight: '1.75', fontFamily: "'JetBrains Mono', monospace", color: '#2a2a2a' }}>{i + 1}</div>)}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {WSD_CODE.slice(0, lines).map((line, i) => (
            <div key={i} style={{ fontSize: 11, lineHeight: '1.75', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>
              {line.parts.map((p, j) => <span key={j} style={{ color: p.c }}>{p.t || ' '}</span>)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ── Card 2: Google SERP + Lighthouse scores ───────────────────────────────────
const WsdSeoMockup = () => {
  const [scores, setScores] = useState({ perf: 0, seo: 0, acc: 0 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const TARGETS = { perf: 94, seo: 99, acc: 98 };
    const DURATION = 1800;
    const start = Date.now();
    let raf: number;
    const update = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setScores({ perf: Math.round(TARGETS.perf * e), seo: Math.round(TARGETS.seo * e), acc: Math.round(TARGETS.acc * e) });
      if (p < 1) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const Circle = ({ score, label }: { score: number; label: string }) => {
    const r = 22; const circ = 2 * Math.PI * r;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <svg width="58" height="58" viewBox="0 0 58 58">
          <circle cx="29" cy="29" r={r} fill="none" stroke="#1e1e1e" strokeWidth="3" />
          <circle cx="29" cy="29" r={r} fill="none" stroke="#22c55e" strokeWidth="3"
            strokeDasharray={circ} strokeDashoffset={circ * (1 - score / 100)}
            strokeLinecap="round" transform="rotate(-90 29 29)" style={{ transition: 'stroke-dashoffset 0.05s linear' }} />
          <text x="29" y="34" textAnchor="middle" fill="#E0E0E0" fontSize="12" fontWeight="700" fontFamily="monospace">{score}</text>
        </svg>
        <span style={{ fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      </div>
    );
  };

  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.3 }}
      style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 6, padding: '10px 12px', marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: '#22863a', fontFamily: 'Arial, sans-serif', marginBottom: 2 }}>rahoperations.com</div>
        <div style={{ fontSize: 12, color: '#5b9bd5', fontWeight: 600, marginBottom: 3 }}>Website Design Scottsdale | RAH Operations</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 3 }}>
          {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#f5a623', fontSize: 10 }}>{s}</span>)}
          <span style={{ fontSize: 9, color: '#555', marginLeft: 4 }}>5.0 (50 reviews)</span>
        </div>
        <div style={{ fontSize: 10, color: '#888', lineHeight: 1.55 }}>Custom websites built in 7 days. SEO-ready, conversion-focused. Scottsdale, Phoenix & nationwide.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Circle score={scores.perf} label="Performance" />
        <Circle score={scores.seo} label="SEO" />
        <Circle score={scores.acc} label="Accessibility" />
      </div>
    </motion.div>
  );
};

// ── Card 3: Mobile device frame ───────────────────────────────────────────────
const WsdMobileMockup = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf: number;
    let lastTs: number | null = null;
    const tick = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const delta = ts - lastTs; lastTs = ts;
      setOffset((prev) => { const next = prev + delta * 0.018; return next > 90 ? 0 : next; });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const sections = [{ h: 28, bg: '#1a1a1a' }, { h: 48, bg: '#141414' }, { h: 22, bg: '#111111' }, { h: 40, bg: '#0f0f0f' }, { h: 32, bg: '#141414' }, { h: 20, bg: '#111111' }];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
      <div style={{ border: '2px solid #2a2a2a', borderRadius: 18, padding: '10px 5px', background: '#0a0a0a', width: 68 }}>
        <div style={{ width: 16, height: 3, background: '#2a2a2a', borderRadius: 2, margin: '0 auto 6px' }} />
        <div style={{ overflow: 'hidden', height: 108, borderRadius: 5, background: '#141414' }}>
          <div style={{ transform: `translateY(-${offset % 90}px)` }}>
            {[...sections, ...sections].map((s, i) => <div key={i} style={{ height: s.h, background: s.bg, marginBottom: 2 }} />)}
          </div>
        </div>
        <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid #2a2a2a', margin: '8px auto 0' }} />
      </div>
    </div>
  );
};

// ── Card 4: Intake form typing animation ──────────────────────────────────────
const WsdIntakeMockup = () => {
  const [bizName, setBizName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [glowing, setGlowing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    let active = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const BN = 'Phoenix Roofing Co'; const EM = 'owner@phoenixroofing.com'; const SV = 'New Website + SEO';
    const run = async () => {
      while (active) {
        setBizName(''); setEmail(''); setService(''); setGlowing(false); setSuccess(false);
        await sleep(700);
        for (let i = 1; i <= BN.length && active; i++) { setBizName(BN.slice(0, i)); await sleep(55); }
        await sleep(240);
        for (let i = 1; i <= EM.length && active; i++) { setEmail(EM.slice(0, i)); await sleep(42); }
        await sleep(240);
        for (let i = 1; i <= SV.length && active; i++) { setService(SV.slice(0, i)); await sleep(50); }
        await sleep(350);
        if (!active) break; setGlowing(true); await sleep(600);
        if (!active) break; setSuccess(true); await sleep(2400);
      }
    };
    run();
    return () => { active = false; };
  }, []);

  const fs = (isTyping: boolean) => ({
    background: isTyping ? '#1a1a1a' : '#141414',
    border: `1px solid ${isTyping ? '#2e2e2e' : '#1a1a1a'}`,
    borderRadius: 5, padding: '6px 9px', transition: 'all 0.2s ease',
  });

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 7, padding: 12, marginTop: 8, minHeight: 150 }}>
      {success ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 150 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#16a34a1a', border: '1px solid #16a34a44', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 16, color: '#22c55e' }}>✓</div>
          <p style={{ fontSize: 10, color: '#888', textAlign: 'center', lineHeight: 1.6 }}>Intake received.<br />Welcome email sent.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[{ l: 'Business Name', v: bizName, a: !!bizName && !email }, { l: 'Email', v: email, a: !!email && !service }, { l: 'Service Needed', v: service, a: !!service }].map(({ l, v, a }) => (
            <div key={l} style={fs(a)}>
              <div style={{ fontSize: 8, color: '#444', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 1 }}>{l}</div>
              <div style={{ fontSize: 10, color: '#E0E0E0', minHeight: 13 }}>{v}{a && cursor && <span style={{ color: '#7A1C1C', fontWeight: 300 }}>|</span>}</div>
            </div>
          ))}
          <button style={{ marginTop: 2, background: glowing ? '#7A1C1C' : '#2a0a0a', border: 'none', borderRadius: 5, color: glowing ? '#fff' : '#7a3333', fontSize: 10, fontWeight: 600, padding: '7px', cursor: 'default', boxShadow: glowing ? '0 0 20px rgba(122,28,28,0.55)' : 'none', transition: 'all 0.3s ease' }}>Submit</button>
        </div>
      )}
    </div>
  );
};

// ── Card 5: 7-day timeline ────────────────────────────────────────────────────
const WSD_TL_STEPS = [
  { day: 'Day 1', label: 'Brief' }, { day: 'Day 2', label: 'Design' },
  { day: 'Days 3–4', label: 'Dev' }, { day: 'Days 5–6', label: 'Test' }, { day: 'Day 7', label: 'Live 🚀' },
];

const WsdTimelineMockup = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const DURATION = 4000; const PAUSE = 1000;
    let raf: number; let startTs: number | null = null; let pausing = false; let pauseStart: number | null = null;
    const tick = (ts: number) => {
      if (pausing) {
        if (pauseStart === null) pauseStart = ts;
        if (ts - pauseStart >= PAUSE) { pausing = false; pauseStart = null; startTs = null; }
        raf = requestAnimationFrame(tick); return;
      }
      if (startTs === null) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION, 1);
      setProgress(p);
      if (p >= 1) pausing = true;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', minWidth: 260, padding: '12px 0 4px' }}>
        <div style={{ position: 'absolute', top: 20, left: '8%', right: '8%', height: 1, background: '#1e1e1e' }} />
        <div style={{ position: 'absolute', top: 20, left: '8%', width: `${progress * 84}%`, height: 1, background: '#7A1C1C', transition: 'width 0.04s linear' }} />
        <div style={{ position: 'absolute', top: 16, left: `calc(8% + ${progress * 84}%)`, width: 8, height: 8, borderRadius: '50%', background: '#d14b4b', boxShadow: '0 0 12px rgba(209,75,75,0.8)', transform: 'translateX(-50%)', transition: 'left 0.04s linear' }} />
        {WSD_TL_STEPS.map((step, i) => {
          const reached = progress >= i / (WSD_TL_STEPS.length - 1);
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: reached ? '#7A1C1C' : '#1e1e1e', border: `1px solid ${reached ? '#7A1C1C' : '#2a2a2a'}`, boxShadow: reached ? '0 0 7px rgba(122,28,28,0.5)' : 'none', transition: 'all 0.3s', zIndex: 1 }} />
              <div style={{ fontSize: 8, color: '#444', fontWeight: 500, textAlign: 'center' }}>{step.day}</div>
              <div style={{ fontSize: 9, color: reached ? '#CCC' : '#333', textAlign: 'center', transition: 'color 0.3s' }}>{step.label}</div>
              {reached && <div style={{ fontSize: 9, color: '#22c55e' }}>✓</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif-display font-bold leading-[0.9] mb-12 text-slate-dark">
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

      {/* ── BENTO SHOWCASE ─────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0A' }}>
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="mb-12">
            <p style={{ fontSize: 11, fontWeight: 500, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>WHAT YOU GET</p>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 600, color: '#F5F5F5', marginBottom: 12, letterSpacing: '-0.02em' }}>A website that works while you sleep.</h2>
            <p style={{ fontSize: 14, color: '#888888', maxWidth: 480, lineHeight: 1.65 }}>Custom built, SEO-ready, and connected to everything your business needs from day one.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }} style={{ display: 'grid', gap: 12 }}>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[3fr_2fr]">
              <WsdBentoCard title="Built From Scratch in React" description="Not a template. Every site is custom React, TypeScript, and Tailwind — built for your specific business.">
                <WsdCodeEditor />
              </WsdBentoCard>
              <WsdBentoCard title="SEO Built In From Day One" description="Every page ships with proper meta tags, schema markup, sitemap, and Google Business optimization.">
                <WsdSeoMockup />
              </WsdBentoCard>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <WsdBentoCard title="Mobile First" description="Every site looks perfect on every device. Tested across all screen sizes before launch.">
                <WsdMobileMockup />
              </WsdBentoCard>
              <WsdBentoCard title="Intake Form Included" description="Clients book, inquire, or submit requests directly from your site. Automated welcome email included.">
                <WsdIntakeMockup />
              </WsdBentoCard>
              <WsdBentoCard title="Live in 7 Days" description="From brief to live website. Most projects launch within one week.">
                <WsdTimelineMockup />
              </WsdBentoCard>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-16 pt-12 border-t border-[#1A1A1A]">
            <p style={{ fontSize: 11, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>SERVING BUSINESSES NATIONWIDE</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: '#F5F5F5', marginBottom: 20, letterSpacing: '-0.01em' }}>Based in Scottsdale. Built for anywhere.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
              {[
                { label: 'Website Design Scottsdale', to: '/services/website-design-scottsdale' },
                { label: 'Website Design Phoenix', to: '/services/website-design-phoenix' },
                { label: 'SEO Scottsdale', to: '/services/seo-scottsdale' },
                { label: 'SEO Phoenix', to: '/services/seo-phoenix' },
                { label: 'Local SEO Scottsdale', to: '/services/local-seo-scottsdale' },
                { label: 'Local SEO Phoenix', to: '/services/local-seo-phoenix' },
                { label: 'Website Development Scottsdale', to: '/services/website-development-scottsdale' },
                { label: 'Website Development Phoenix', to: '/services/website-development-phoenix' },
              ].map((l) => (
                <Link key={l.to} to={l.to}
                  style={{ fontSize: 12, color: '#555555', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#888888')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
                >{l.label}</Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AUDIT BANNER */}
      <section style={{ background: '#111111', borderTop: '1px solid #1e1e1e', borderBottom: '1px solid #1e1e1e', padding: '48px 24px' }}>
        <div className="container-clean text-center" style={{ maxWidth: 640 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', color: '#9d3f3f', textTransform: 'uppercase', marginBottom: 10 }}>
            FREE TOOL
          </p>
          <h3 style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)', fontWeight: 700, color: '#F5F5F5', fontFamily: 'Playfair Display, serif', lineHeight: 1.2, marginBottom: 10 }}>
            See how your current site stacks up.
          </h3>
          <p style={{ fontSize: 14, color: '#666666', lineHeight: 1.65, marginBottom: 24 }}>
            Free audit — instant results. SSL, SEO, mobile, speed, and more.
          </p>
          <Link
            to="/website-audit"
            style={{ display: 'inline-block', background: '#7A1C1C', color: '#fff', padding: '11px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#9d3f3f')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#7A1C1C')}
          >
            Get Free Audit →
          </Link>
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
          <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-white mb-6">
            Pair Web Development With These Growth Systems
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed mb-10 max-w-3xl">
            RAH Operations also supports business owners looking for{' '}
            <Link to="/services/website-design-scottsdale" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">Website Design in Scottsdale</Link>,{' '}
            <Link to="/services/seo-scottsdale" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">SEO services in Scottsdale</Link>,{' '}
            <Link to="/services/local-seo-scottsdale" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">Local SEO in Scottsdale</Link>, and{' '}
            <Link to="/services/google-business-profile-optimization-scottsdale" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">Google Business Profile optimization in Scottsdale</Link>{' '}
            — as well as the Phoenix equivalents for every service we offer.
          </p>
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
