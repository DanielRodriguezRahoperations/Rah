import { Fragment, useRef, useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

// ── Animation variants ────────────────────────────────────────────────────────

const up = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

// ── Static data ───────────────────────────────────────────────────────────────

const SERVICES = [
  {
    n: '01',
    title: 'Websites That Convert',
    desc: 'Custom React sites with intake forms, booking systems, and client portals built in. Delivered in 7 days.',
  },
  {
    n: '02',
    title: 'Marketing On Autopilot',
    desc: 'AI-generated content, scheduled posts, Google Business management. Done-for-you monthly.',
  },
  {
    n: '03',
    title: 'Complete Business Systems',
    desc: 'CRM, automated emails, client portals, document management. The backend most businesses never build.',
  },
];

const PORTFOLIO = [
  {
    domain: 'tier1customs.com',
    name: 'Tier 1 Customs',
    desc: 'Custom automotive brand website',
    to: '/case-studies/tier-1-customs',
    url: 'https://www.tier1customs.com',
  },
  {
    domain: 'everaftereditfl.com',
    name: 'The Ever After Edit',
    desc: 'Luxury wedding signage brand',
    to: '/case-studies/ever-after-edit',
    url: 'https://www.everaftereditfl.com',
  },
  {
    domain: 'empirebuildsaz.com',
    name: 'Empire Builds AZ',
    desc: 'Custom home builder, Arizona',
    to: '/case-studies/empire-builds-az',
    url: 'https://empirebuildsaz.com',
  },
  {
    domain: 'danielrodriguez.org',
    name: 'Daniel Rodriguez',
    desc: 'Personal brand and author site',
    to: null,
    url: 'https://www.danielrodriguez.org',
  },
];

const CLIENTS = ['Tier 1 Customs', 'Ever After Edit', 'Empire Builds AZ', 'Daniel Rodriguez'];

const HERO_WORDS: { text: string; br: boolean }[] = [
  { text: 'We', br: false },
  { text: 'build', br: false },
  { text: 'your', br: false },
  { text: 'website,', br: false },
  { text: 'run', br: false },
  { text: 'your', br: false },
  { text: 'marketing,', br: true },
  { text: 'and', br: false },
  { text: 'grow', br: false },
  { text: 'your', br: false },
  { text: 'presence.', br: false },
  { text: 'You', br: false },
  { text: 'run', br: false },
  { text: 'your', br: false },
  { text: 'business.', br: false },
];

// ── Bento card wrapper ────────────────────────────────────────────────────────

interface BentoCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const BentoCard = ({ title, description, children }: BentoCardProps) => (
  <div className="bento-card" style={{ background: '#111111', borderRadius: 12, overflow: 'hidden' }}>
    <div style={{ padding: '18px 18px 0' }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#E0E0E0', marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 12, color: '#555555', lineHeight: 1.5 }}>{description}</p>
    </div>
    <div style={{ padding: '8px 18px 18px' }}>{children}</div>
  </div>
);

// ── Card 1: Intake Form Animated Mockup ──────────────────────────────────────

const IntakeFormMockup = () => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [services, setServices] = useState('');
  const [glowing, setGlowing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;
    const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
    const BN = 'Acme Landscaping';
    const EM = 'owner@acme.com';
    const SV = 'Social Media + Website';

    const run = async () => {
      while (active) {
        setBusinessName(''); setEmail(''); setServices('');
        setGlowing(false); setSuccess(false);
        await sleep(700);
        for (let i = 1; i <= BN.length && active; i++) { setBusinessName(BN.slice(0, i)); await sleep(55); }
        await sleep(250);
        for (let i = 1; i <= EM.length && active; i++) { setEmail(EM.slice(0, i)); await sleep(55); }
        await sleep(250);
        for (let i = 1; i <= SV.length && active; i++) { setServices(SV.slice(0, i)); await sleep(45); }
        await sleep(350);
        if (!active) break;
        setGlowing(true);
        await sleep(600);
        if (!active) break;
        setSuccess(true);
        await sleep(2400);
      }
    };

    run();
    return () => { active = false; };
  }, []);

  const fieldStyle = (isTyping: boolean): React.CSSProperties => ({
    background: isTyping ? '#1a1a1a' : '#141414',
    border: `1px solid ${isTyping ? '#2e2e2e' : '#1a1a1a'}`,
    borderRadius: 6,
    padding: '7px 10px',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8, minHeight: 158 }}>
      {success ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 158, animation: 'fadeInUp 0.4s ease' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#16a34a1a', border: '1px solid #16a34a44', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontSize: 18, color: '#22c55e' }}>✓</div>
          <p style={{ fontSize: 11, color: '#888', textAlign: 'center', lineHeight: 1.6 }}>Intake received.<br />Welcome email sent.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Business Name', value: businessName, active: !!businessName && !email },
            { label: 'Email', value: email, active: !!email && !services },
            { label: 'Services', value: services, active: !!services },
          ].map(({ label, value, active: isActive }) => (
            <div key={label} style={fieldStyle(isActive)}>
              <div style={{ fontSize: 9, color: '#444', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 11, color: '#E0E0E0', minHeight: 15 }}>
                {value}
                {isActive && <span style={{ animation: 'blink 1s step-end infinite', color: '#7A1C1C', fontWeight: 300 }}>|</span>}
              </div>
            </div>
          ))}
          <button
            style={{
              marginTop: 2, background: glowing ? '#7A1C1C' : '#2a0a0a', border: 'none',
              borderRadius: 6, color: glowing ? '#fff' : '#7a3333', fontSize: 11, fontWeight: 600,
              padding: '8px', cursor: 'default',
              boxShadow: glowing ? '0 0 22px rgba(122,28,28,0.55)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

// ── Card 2: AI Content Generator ─────────────────────────────────────────────

const ContentGenMockup = () => {
  const CAPTION = `Scottsdale businesses — your competitors are already showing up on Google. Here's exactly how to outrank them in 90 days. 👇 Full strategy at rahoperations.com`;
  const [text, setText] = useState('');
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let active = true;
    const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

    const run = async () => {
      while (active) {
        setFading(false); setText('');
        await sleep(500);
        for (let i = 1; i <= CAPTION.length && active; i++) { setText(CAPTION.slice(0, i)); await sleep(22); }
        await sleep(2000);
        if (!active) break;
        setFading(true);
        await sleep(600);
      }
    };

    run();
    return () => { active = false; };
  }, []);

  const platforms = [
    { label: 'IG', color: '#e1306c' },
    { label: 'FB', color: '#1877f2' },
    { label: 'G', color: '#34a853' },
    { label: 'TT', color: '#e8e8e8' },
  ];

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {['Instagram ▾', 'Caption ▾'].map((label) => (
          <div key={label} style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 5, padding: '4px 10px', fontSize: 10, color: '#666' }}>{label}</div>
        ))}
      </div>
      <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#CCC', lineHeight: 1.65, minHeight: 82, opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        {text}
        {text.length > 0 && text.length < CAPTION.length && (
          <span style={{ animation: 'blink 1s step-end infinite', color: '#7A1C1C' }}>|</span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 10, alignItems: 'center' }}>
        {platforms.map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
            <span style={{ fontSize: 9, color: '#444' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Card 3: Calendar Scheduler ────────────────────────────────────────────────

type CalDot = { row: number; col: number; color: string; key: number };

const INITIAL_DOTS: CalDot[] = [
  { row: 0, col: 1, color: '#7A1C1C', key: 0 },
  { row: 0, col: 4, color: '#7A1C1C', key: 1 },
  { row: 1, col: 0, color: '#7A1C1C', key: 2 },
  { row: 1, col: 5, color: '#1d4ed8', key: 3 },
  { row: 2, col: 2, color: '#1d4ed8', key: 4 },
  { row: 3, col: 6, color: '#1d4ed8', key: 5 },
];

const CalendarMockup = () => {
  const [dots, setDots] = useState<CalDot[]>(INITIAL_DOTS);
  const keyRef = useRef(10);

  useEffect(() => {
    const iv = setInterval(() => {
      setDots((prev) => {
        const occupied = new Set(prev.map((d) => `${d.row},${d.col}`));
        const available: [number, number][] = [];
        for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) if (!occupied.has(`${r},${c}`)) available.push([r, c]);
        if (available.length === 0) return INITIAL_DOTS;
        const [r, c] = available[Math.floor(Math.random() * available.length)];
        keyRef.current++;
        return [...prev, { row: r, col: c, color: Math.random() > 0.45 ? '#1d4ed8' : '#7A1C1C', key: keyRef.current }];
      });
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 5 }}>
        {DAYS.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 9, color: '#444', fontWeight: 600 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
        {Array.from({ length: 28 }, (_, idx) => {
          const row = Math.floor(idx / 7);
          const col = idx % 7;
          const dot = dots.find((d) => d.row === row && d.col === col);
          return (
            <div key={idx} style={{ height: 20, borderRadius: 3, background: row === 1 ? '#1a1a1a' : '#141414', border: `1px solid ${row === 1 ? '#222' : '#181818'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {dot && (
                <div key={dot.key} style={{ width: 6, height: 6, borderRadius: '50%', background: dot.color, animation: 'popIn 0.3s ease' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Card 4: Client Portal ─────────────────────────────────────────────────────

const ClientPortalMockup = () => {
  const [pending, setPending] = useState(3);

  useEffect(() => {
    const iv = setInterval(() => setPending((p) => (p > 0 ? p - 1 : 3)), 1000);
    return () => clearInterval(iv);
  }, []);

  const rows = [
    { color: '#f97316', label: `${pending} post${pending !== 1 ? 's' : ''} pending approval`, delay: 0 },
    { color: '#3b82f6', label: 'Next post: Friday 9am', delay: 0.1 },
    { color: '#22c55e', label: 'Invoice: $597 — Paid', delay: 0.2 },
  ];

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#CCC' }}>Acme Landscaping</span>
        <span style={{ fontSize: 9, fontWeight: 700, background: '#16a34a1a', color: '#22c55e', border: '1px solid #16a34a33', borderRadius: 4, padding: '2px 6px', letterSpacing: '0.05em' }}>ACTIVE</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: row.delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: row.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#888' }}>{row.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ── Card 5: Emails Sent Automatically ────────────────────────────────────────

interface EmailItem { id: number; dot: string; subject: string; time: string; }

const SEED_EMAILS: EmailItem[] = [
  { id: 1, dot: '#22c55e', subject: 'Welcome to RAH Operations', time: 'just now' },
  { id: 2, dot: '#3b82f6', subject: 'Your content is ready', time: '2m ago' },
  { id: 3, dot: '#3b82f6', subject: 'Invoice sent', time: '1h ago' },
  { id: 4, dot: '#555555', subject: 'Follow-up: Next steps', time: '2h ago' },
];

const NEW_EMAIL_POOL = [
  { dot: '#22c55e', subject: 'New inquiry received' },
  { dot: '#3b82f6', subject: 'Social post published' },
  { dot: '#22c55e', subject: 'Welcome email sent' },
  { dot: '#3b82f6', subject: 'Monthly report ready' },
];

const EmailListMockup = () => {
  const [emails, setEmails] = useState<EmailItem[]>(SEED_EMAILS);
  const counterRef = useRef(100);
  const poolIdx = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      const tmpl = NEW_EMAIL_POOL[poolIdx.current % NEW_EMAIL_POOL.length];
      poolIdx.current++;
      counterRef.current++;
      setEmails((prev) => [{ id: counterRef.current, dot: tmpl.dot, subject: tmpl.subject, time: 'just now' }, ...prev.slice(0, 3)]);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8, overflow: 'hidden' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        {emails.map((em) => (
          <motion.div
            key={em.id}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid #1a1a1a' }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: em.dot, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#888', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{em.subject}</span>
            <span style={{ fontSize: 9, color: '#333', flexShrink: 0 }}>{em.time}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ── Card 6: 7-day Timeline ───────────────────────────────────────────────────

const TIMELINE_STEPS = [
  { day: 'Day 1', label: 'Brief &\nDiscovery' },
  { day: 'Day 2', label: 'Design\nSystem' },
  { day: 'Days 3–4', label: 'Development' },
  { day: 'Days 5–6', label: 'Content &\nTesting' },
  { day: 'Day 7', label: 'Live 🚀' },
];

const TimelineMockup = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const DURATION = 4000;
    const PAUSE = 1000;
    let raf: number;
    let startTs: number | null = null;
    let pausing = false;
    let pauseStart: number | null = null;

    const tick = (ts: number) => {
      if (pausing) {
        if (pauseStart === null) pauseStart = ts;
        if (ts - pauseStart >= PAUSE) { pausing = false; pauseStart = null; startTs = null; }
        raf = requestAnimationFrame(tick);
        return;
      }
      if (startTs === null) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION, 1);
      setProgress(p);
      if (p >= 1) { pausing = true; }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', minWidth: 480, padding: '12px 0 4px' }}>
        {/* Track background */}
        <div style={{ position: 'absolute', top: 20, left: '10%', right: '10%', height: 1, background: '#1e1e1e' }} />
        {/* Track fill */}
        <div style={{ position: 'absolute', top: 20, left: '10%', width: `${progress * 80}%`, height: 1, background: '#7A1C1C', transition: 'width 0.04s linear' }} />
        {/* Glow dot */}
        <div style={{ position: 'absolute', top: 16, left: `calc(10% + ${progress * 80}%)`, width: 9, height: 9, borderRadius: '50%', background: '#d14b4b', boxShadow: '0 0 14px rgba(209,75,75,0.8)', transform: 'translateX(-50%)', transition: 'left 0.04s linear' }} />
        {/* Steps */}
        {TIMELINE_STEPS.map((step, i) => {
          const reached = progress >= i / (TIMELINE_STEPS.length - 1);
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: reached ? '#7A1C1C' : '#1e1e1e', border: `1px solid ${reached ? '#7A1C1C' : '#2a2a2a'}`, boxShadow: reached ? '0 0 8px rgba(122,28,28,0.5)' : 'none', transition: 'all 0.3s ease', marginTop: 0, flexShrink: 0, zIndex: 1 }} />
              <div style={{ fontSize: 9, color: '#444', fontWeight: 500, textAlign: 'center' }}>{step.day}</div>
              <div style={{ fontSize: 10, color: reached ? '#CCC' : '#333', textAlign: 'center', lineHeight: 1.4, whiteSpace: 'pre-line', transition: 'color 0.3s ease' }}>{step.label}</div>
              {reached && <div style={{ fontSize: 10, color: '#22c55e' }}>✓</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Code Editor Mockup (Alternating Section 1) ───────────────────────────────

type CodePart = { text: string; color: string };
type CodeLine = { parts: CodePart[] };

const CODE_LINES: CodeLine[] = [
  { parts: [{ text: '// HomePage.tsx', color: '#555' }] },
  { parts: [{ text: "import ", color: '#c084fc' }, { text: "React", color: '#60a5fa' }, { text: " from ", color: '#ccc' }, { text: "'react'", color: '#86efac' }] },
  { parts: [{ text: "import ", color: '#c084fc' }, { text: "{ motion } ", color: '#ccc' }, { text: "from ", color: '#ccc' }, { text: "'framer-motion'", color: '#86efac' }] },
  { parts: [{ text: '', color: '#ccc' }] },
  { parts: [{ text: 'export default function ', color: '#c084fc' }, { text: 'HomePage', color: '#60a5fa' }, { text: '() {', color: '#ccc' }] },
  { parts: [{ text: '  const ', color: '#c084fc' }, { text: '[ready, setReady]', color: '#ccc' }, { text: ' = useState(', color: '#ccc' }, { text: 'false', color: '#fb923c' }, { text: ')', color: '#ccc' }] },
  { parts: [{ text: '', color: '#ccc' }] },
  { parts: [{ text: '  useEffect', color: '#c084fc' }, { text: '(() => {', color: '#ccc' }] },
  { parts: [{ text: '    setReady(', color: '#ccc' }, { text: 'true', color: '#fb923c' }, { text: ')', color: '#ccc' }] },
  { parts: [{ text: '  }, [])', color: '#ccc' }] },
  { parts: [{ text: '', color: '#ccc' }] },
  { parts: [{ text: '  return ', color: '#c084fc' }, { text: '(', color: '#ccc' }] },
  { parts: [{ text: '    <', color: '#ccc' }, { text: 'main', color: '#60a5fa' }, { text: " className=", color: '#ccc' }, { text: '"bg-[#0A0A0A]"', color: '#86efac' }, { text: '>', color: '#ccc' }] },
  { parts: [{ text: '      <', color: '#ccc' }, { text: 'HeroSection', color: '#60a5fa' }, { text: ' />', color: '#ccc' }] },
  { parts: [{ text: '    </', color: '#ccc' }, { text: 'main', color: '#60a5fa' }, { text: '>', color: '#ccc' }] },
  { parts: [{ text: '  )', color: '#ccc' }] },
  { parts: [{ text: '}', color: '#ccc' }] },
];

const CodeEditorMockup = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let active = true;
    const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

    const run = async () => {
      while (active) {
        setVisibleLines(0);
        await sleep(600);
        for (let i = 1; i <= CODE_LINES.length && active; i++) { setVisibleLines(i); await sleep(270); }
        await sleep(3200);
      }
    };
    run();
    return () => { active = false; };
  }, [inView]);

  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.3 }}
      style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
      {/* Window chrome */}
      <div style={{ background: '#141414', borderBottom: '1px solid #1e1e1e', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
        ))}
        <div style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: 5, padding: '2px 10px', fontSize: 11, color: '#666', marginLeft: 6 }}>
          HomePage.tsx
        </div>
      </div>
      {/* Code */}
      <div style={{ padding: '14px 18px', minHeight: 240, display: 'flex', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', userSelect: 'none' }}>
          {CODE_LINES.slice(0, visibleLines).map((_, i) => (
            <div key={i} style={{ fontSize: 12, lineHeight: '1.75', fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: '#2a2a2a' }}>{i + 1}</div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {CODE_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ fontSize: 12, lineHeight: '1.75', fontFamily: "'JetBrains Mono', 'Fira Code', monospace", whiteSpace: 'nowrap' }}>
              {line.parts.map((p, j) => (
                <span key={j} style={{ color: p.color }}>{p.text || ' '}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ── Analytics Dashboard Mockup (Alternating Section 2) ───────────────────────

const SVG_POINTS: [number, number][] = [[0, 68], [36, 62], [72, 50], [110, 44], [148, 32], [190, 20], [228, 12], [270, 7]];
const SVG_PATH_D = SVG_POINTS.reduce((acc, [x, y], i) => i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`, '');
const SVG_FILL_D = `${SVG_PATH_D} L 270 76 L 0 76 Z`;
const PATH_LENGTH = 310;

const AnalyticsMockup = () => {
  const [counts, setCounts] = useState({ visitors: 0, lighthouse: 0, clients: 0 });
  const [lineDrawn, setLineDrawn] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const TARGETS = { visitors: 2847, lighthouse: 94, clients: 12 };
    const DURATION = 2200;
    const start = Date.now();
    let raf: number;

    const update = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCounts({
        visitors: Math.round(TARGETS.visitors * eased),
        lighthouse: Math.round(TARGETS.lighthouse * eased),
        clients: Math.round(TARGETS.clients * eased),
      });
      if (p < 1) { raf = requestAnimationFrame(update); }
    };

    const lineTimeout = setTimeout(() => setLineDrawn(true), 200);
    raf = requestAnimationFrame(update);
    return () => { cancelAnimationFrame(raf); clearTimeout(lineTimeout); };
  }, [inView]);

  const stats = [
    { label: 'Visitors', value: counts.visitors.toLocaleString() },
    { label: 'Lighthouse', value: counts.lighthouse },
    { label: 'Clients', value: counts.clients },
  ];

  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.4 }}
      style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: 10, padding: 20 }}>
      <div style={{ fontSize: 11, color: '#444', marginBottom: 14, fontFamily: 'monospace', letterSpacing: '0.02em' }}>
        rahoperations.com
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {stats.map(({ label, value }) => (
          <div key={label} style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F5F5F5', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{value}</div>
            <div style={{ fontSize: 10, color: '#444', marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8, padding: '12px 14px' }}>
        <svg width="100%" viewBox="0 0 270 76" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="ahGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A1C1C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7A1C1C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={SVG_FILL_D} fill="url(#ahGrad)" opacity={lineDrawn ? 1 : 0} style={{ transition: 'opacity 0.8s ease 0.5s' }} />
          <path
            d={SVG_PATH_D} fill="none" stroke="#7A1C1C" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={PATH_LENGTH}
            strokeDashoffset={lineDrawn ? 0 : PATH_LENGTH}
            style={{ transition: `stroke-dashoffset 1.8s ease-out 0.2s` }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

// ── Portfolio card with live iframe preview ───────────────────────────────────

type PortfolioItem = (typeof PORTFOLIO)[number];

const PortfolioCard = ({ domain, name, desc, to, url }: PortfolioItem) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const cardInner = (
    <motion.div
      className="group border border-[#1A1A1A] bg-[#0D0D0D] overflow-hidden"
      style={{ cursor: 'pointer' }}
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', borderColor: '#383838' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', height: '252px', overflow: 'hidden', background: '#111111' }}
      >
        <iframe
          key={url}
          ref={iframeRef}
          src={url}
          title={name}
          loading="eager"
          style={{ width: '1440px', height: '900px', transform: 'scale(0.35)', transformOrigin: 'top left', border: 'none', display: 'block', opacity: 0, transition: 'opacity 0.3s ease' }}
          onLoad={() => { const el = iframeRef.current; if (el) el.style.opacity = '1'; }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, #0D0D0D)', pointerEvents: 'none', zIndex: 1 }} />
      </motion.div>
      <div className="border-t border-[#1A1A1A] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#E0E0E0' }}>{name}</p>
            <p style={{ marginTop: 3, fontSize: 12, color: '#666666' }}>{desc}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              style={{ display: 'block', marginTop: 8, fontSize: 11, color: '#333333', textDecoration: 'none' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#666666')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#333333')}
            >{domain}</a>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            style={{ flexShrink: 0, fontSize: 16, color: '#333333', textDecoration: 'none', marginTop: 2 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#888888')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#333333')}
          >↗</a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div variants={up}>
      {to ? <Link to={to} className="block">{cardInner}</Link> : cardInner}
    </motion.div>
  );
};

// ── Dividers ──────────────────────────────────────────────────────────────────

const Div = () => <div className="border-t border-[#1A1A1A]" />;

const GradientDivider = () => (
  <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #333333, transparent)' }} />
);

// ── Component ─────────────────────────────────────────────────────────────────

const HomePage = () => {
  const workRef = useRef<HTMLElement>(null);
  const scrollToWork = () => workRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      className="bg-[#0A0A0A] text-[#F5F5F5]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", position: 'relative', zIndex: 2 }}
    >
      {/* Grain texture overlay */}
      <svg aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99, opacity: 0.04 }}>
        <filter id="grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>

      {/* Fonts + keyframes */}
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          @keyframes orbFloat1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33%       { transform: translate(30px, -20px) scale(1.05); }
            66%       { transform: translate(-20px, 15px) scale(0.95); }
          }
          @keyframes orbFloat2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33%       { transform: translate(-25px, 30px) scale(1.08); }
            66%       { transform: translate(20px, -10px) scale(0.92); }
          }
          .rah-orb-1 { animation: orbFloat1 12s ease-in-out infinite; }
          .rah-orb-2 { animation: orbFloat2 16s ease-in-out infinite; }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
          }
          @keyframes popIn {
            0%   { transform: scale(0); opacity: 0; }
            60%  { transform: scale(1.4); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .bento-card {
            border: 1px solid #1e1e1e;
            transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          }
          .bento-card:hover {
            border-color: #333333;
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          }
        `}</style>
      </Helmet>

      <SEOHead
        title="RAH Operations — Website Design, Marketing & Credit Repair"
        description="Website built in 7 days. Social media posted daily. Credit repair handled. Full online presence for Arizona businesses — done for you."
        url={absoluteUrl('/')}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
        <div className="rah-orb-1 pointer-events-none absolute" style={{ top: '20%', left: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(122,28,28,0.12) 0%, transparent 70%)', filter: 'blur(120px)' }} />
        <div className="rah-orb-2 pointer-events-none absolute" style={{ bottom: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(60,20,80,0.1) 0%, transparent 70%)', filter: 'blur(120px)' }} />

        <div className="relative mx-auto w-full max-w-[680px]">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.05em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-7 text-[11px] font-medium uppercase text-[#555555]"
          >
            WEBSITE · MARKETING · CREDIT REPAIR
          </motion.p>

          <h1 className="mb-5 text-[42px] font-bold leading-[1.05] tracking-[-0.03em] text-[#F5F5F5] sm:text-[54px] lg:text-[64px]">
            {HERO_WORDS.map(({ text, br }, i) => (
              <Fragment key={i}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  {text}
                </motion.span>
                {br ? <br /> : ' '}
              </Fragment>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-10 max-w-[500px] text-[16px] leading-relaxed text-[#888888] sm:text-[17px]"
          >
            Website live in 7 days. Social media posting daily. Clients finding you on Google. All done for you — from Scottsdale to anywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <Link to="/services" className="inline-block rounded bg-[#7A1C1C] px-7 py-3 text-[13px] font-semibold text-white tracking-[0.02em] transition-opacity duration-200 hover:opacity-80">
              Start a Project
            </Link>
            <button type="button" onClick={scrollToWork} className="border-0 bg-transparent p-0 text-[13px] font-medium text-[#555555] cursor-pointer transition-colors duration-200 hover:text-[#F5F5F5]">
              See our work ↓
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT YOU GET STRIP ────────────────────────────────────────────── */}
      <div style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {([
              { icon: '🌐', title: 'Custom Website', sub: 'Live in 7 days' },
              { icon: '📱', title: 'Social Media', sub: 'Posted daily, automatically' },
              { icon: '📍', title: 'Google & SEO', sub: 'Found by local customers' },
              { icon: '💳', title: 'Credit Repair', sub: 'All 3 bureaus handled' },
            ] as const).map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-[13px] font-semibold text-[#E0E0E0] mb-1">{item.title}</p>
                <p className="text-[11px] text-[#555555]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CLIENT NAMES ──────────────────────────────────────────────────── */}
      <GradientDivider />
      <div className="px-6 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } } }}
          className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12"
        >
          {CLIENTS.map((c, i) => (
            <motion.span
              key={c}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.35 } }}
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888] select-none cursor-default transition-all duration-300 hover:opacity-100 hover:text-[#F5F5F5]"
            >
              {i > 0 && <span className="mr-8 opacity-40">·</span>}
              {c}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── THE SYSTEM — BENTO GRID ───────────────────────────────────────── */}
      <Div />
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p variants={up} className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
              WEBSITE · MARKETING · CREDIT REPAIR
            </motion.p>
            <motion.h2 variants={up} className="mb-4 text-[26px] font-semibold tracking-[-0.02em] text-[#F5F5F5]">
              One company. Your entire online presence.
            </motion.h2>
            <motion.p variants={up} className="max-w-[480px] text-[14px] leading-relaxed text-[#888888]">
              Most businesses need 4–5 vendors to do what RAH does in one place. Website. Social media. SEO. Credit repair. All connected. All automated.
            </motion.p>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={{ display: 'grid', gap: 12 }}
          >
            {/* Row 1: 60 / 40 */}
            <motion.div variants={up} className="grid grid-cols-1 gap-3 lg:grid-cols-[3fr_2fr]">
              <BentoCard
                title="Client Intake — Automated"
                description="New client submits a form. Welcome email sends instantly. Record saved. You get notified."
              >
                <IntakeFormMockup />
              </BentoCard>
              <BentoCard
                title="AI Content Generation"
                description="Select a platform. Hit generate. Caption written, image prompted, scheduled."
              >
                <ContentGenMockup />
              </BentoCard>
            </motion.div>

            {/* Row 2: three equal thirds */}
            <motion.div variants={up} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <BentoCard
                title="Posts Scheduled"
                description="Content approved. Goes live automatically."
              >
                <CalendarMockup />
              </BentoCard>
              <BentoCard
                title="Client Portal"
                description="Clients approve content, track status, view invoices. No emails back and forth."
              >
                <ClientPortalMockup />
              </BentoCard>
              <BentoCard
                title="Emails Sent Automatically"
                description="Welcome, updates, and follow-ups. Zero manual sending."
              >
                <EmailListMockup />
              </BentoCard>
            </motion.div>

            {/* Row 3: full width */}
            <motion.div variants={up}>
              <BentoCard
                title="Built. Deployed. Live in 7 days."
                description="From intake form to live website — here's what one week with RAH looks like."
              >
                <TimelineMockup />
              </BentoCard>
            </motion.div>
          </motion.div>

          {/* Built different */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {([
              'Not 4 vendors. One company handles everything — website, marketing, credit, and systems.',
              'Not slow. Most agencies take 3 months. RAH delivers in 7 days.',
              'Not hands-off. Content posted, rankings monitored, results delivered — every month.',
            ] as const).map((text, i) => (
              <motion.div key={i} variants={up} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 10, padding: '16px 18px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#7A1C1C', fontSize: 14, fontWeight: 700, flexShrink: 0, lineHeight: 1.5 }}>✕</span>
                <p style={{ fontSize: 13, color: '#888888', lineHeight: 1.6 }}>{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ─────────────────────────────────────────────────── */}
      <Div />
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.p variants={up} className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
              What We Build
            </motion.p>
            <motion.h2 variants={up} className="mb-14 max-w-sm text-[26px] font-semibold tracking-[-0.02em] text-[#F5F5F5]">
              Everything your business needs to run online.
            </motion.h2>

            <motion.div variants={stagger} className="grid gap-px bg-[#1A1A1A] sm:grid-cols-3">
              {SERVICES.map((s) => (
                <motion.div
                  key={s.n} variants={up}
                  className="group relative flex flex-col gap-5 bg-[#0D0D0D] p-8 lg:p-10 overflow-hidden"
                  whileHover={{ backgroundColor: '#111111' }} transition={{ duration: 0.3 }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(122,28,28,0.08), transparent 70%)' }} />
                  <span className="relative text-[11px] font-medium tracking-[0.1em] text-[#444444]">{s.n}</span>
                  <h3 className="relative text-[15px] font-semibold leading-snug text-[#F5F5F5]">{s.title}</h3>
                  <p className="relative text-[13px] leading-relaxed text-[#888888]">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={up} className="mt-8 text-[13px] text-[#555555]">
              One week of work with RAH replaces what most agencies charge{' '}
              <span className="text-[#888888]">$30,000–$50,000</span> to build over 3 months.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────────────────── */}
      <Div />
      <section ref={workRef} className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.p variants={up} className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
              Recent Work
            </motion.p>
            <motion.h2 variants={up} className="mb-12 text-[26px] font-semibold tracking-[-0.02em] text-[#F5F5F5]">
              Sites we've built.
            </motion.h2>
            <motion.div variants={stagger} className="grid gap-3 sm:grid-cols-2">
              {PORTFOLIO.map((p) => (
                <PortfolioCard key={p.domain} {...p} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ALTERNATING: NO TEMPLATES ─────────────────────────────────────── */}
      <Div />
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">

          {/* Alt 1 — Left text, Right code editor */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid items-center gap-12 mb-24 lg:grid-cols-2 lg:gap-20"
          >
            <motion.div variants={up}>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
                No Templates
              </p>
              <h2 className="mb-5 text-[28px] font-semibold tracking-[-0.02em] text-[#F5F5F5] leading-tight">
                Every site built from scratch in React.
              </h2>
              <p className="mb-6 max-w-sm text-[14px] leading-relaxed text-[#888888]">
                Templates break. Templates look like everyone else. Every RAH site is custom React, TypeScript, and Tailwind — built for your specific business, not adapted from someone else's.
              </p>
              <Link
                to="/website-intake"
                className="text-[13px] font-medium text-[#888888] transition-colors duration-200 hover:text-[#F5F5F5]"
              >
                See our process →
              </Link>
            </motion.div>

            <motion.div variants={up}>
              <CodeEditorMockup />
            </motion.div>
          </motion.div>

          {/* Alt 2 — Left analytics, Right text */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <motion.div variants={up} className="order-2 lg:order-1">
              <AnalyticsMockup />
            </motion.div>

            <motion.div variants={up} className="order-1 lg:order-2">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
                Real Results
              </p>
              <h2 className="mb-5 text-[28px] font-semibold tracking-[-0.02em] text-[#F5F5F5] leading-tight">
                Fast. Found. Converting.
              </h2>
              <p className="mb-6 max-w-sm text-[14px] leading-relaxed text-[#888888]">
                Every site we build scores 90+ on Google Lighthouse. SEO-ready from day one. Intake forms and client portals included so your site works while you sleep.
              </p>
              <button
                type="button" onClick={scrollToWork}
                className="border-0 bg-transparent p-0 text-[13px] font-medium text-[#888888] cursor-pointer transition-colors duration-200 hover:text-[#F5F5F5]"
              >
                View our work →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SPLIT CTA ─────────────────────────────────────────────────────── */}
      <Div />
      <section>
        <div className="grid sm:grid-cols-2">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="border-b border-[#1A1A1A] px-10 py-16 sm:border-b-0 sm:border-r lg:px-14 lg:py-20"
          >
            <motion.p variants={up} className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
              Need a website?
            </motion.p>
            <motion.h2 variants={up} className="mb-4 text-[20px] font-semibold tracking-[-0.02em] text-[#F5F5F5]">
              Custom built, conversion focused, delivered fast.
            </motion.h2>
            <motion.p variants={up} className="mb-8 max-w-[280px] text-[13px] leading-relaxed text-[#888888]">
              React-based, SEO-ready, with your intake form and client portal already connected.
            </motion.p>
            <motion.div variants={up}>
              <Link to="/services" className="inline-block rounded bg-[#7A1C1C] px-6 py-2.5 text-[12px] font-semibold text-white tracking-[0.02em] transition-opacity duration-200 hover:opacity-80">
                Start a Project
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="px-10 py-16 lg:px-14 lg:py-20"
          >
            <motion.p variants={up} className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
              Need more clients?
            </motion.p>
            <motion.h2 variants={up} className="mb-4 text-[20px] font-semibold tracking-[-0.02em] text-[#F5F5F5]">
              Done-for-you social media, SEO, and Google Business.
            </motion.h2>
            <motion.p variants={up} className="mb-8 max-w-[280px] text-[13px] leading-relaxed text-[#888888]">
              AI-powered content and scheduling so your brand stays active without the manual work.
            </motion.p>
            <motion.div variants={up}>
              <Link to="/marketing/intake" className="inline-block rounded border border-[#2A2A2A] px-6 py-2.5 text-[12px] font-semibold text-[#CCCCCC] tracking-[0.02em] transition-colors duration-200 hover:border-[#555555] hover:text-[#F5F5F5]">
                Grow My Business
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ADDRESS ───────────────────────────────────────────────────────── */}
      <div className="border-t border-[#1A1A1A] px-6 py-5 text-center">
        <p className="text-[11px] text-[#333333]">RAH Operations — 6301 E Pinnacle Vista Dr, Scottsdale, AZ 85266</p>
      </div>
    </div>
  );
};

export default HomePage;
