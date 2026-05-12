import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';
import Button from '../components/ui/Button';

// ── Shared bento card wrapper ─────────────────────────────────────────────────
const DmBentoCard = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
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

// ── Card 1: AI content generation ────────────────────────────────────────────
const DmContentMockup = () => {
  const CAPTION = `Phoenix businesses — showing up on Google Maps isn't luck. Here's the exact strategy we use to get our clients in the local 3-pack. 👇 rahoperations.com`;
  const [text, setText] = useState('');
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let active = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const run = async () => {
      while (active) {
        setFading(false); setText('');
        await sleep(500);
        for (let i = 1; i <= CAPTION.length && active; i++) { setText(CAPTION.slice(0, i)); await sleep(20); }
        await sleep(2000);
        if (!active) break; setFading(true); await sleep(600);
      }
    };
    run();
    return () => { active = false; };
  }, []);

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {['Instagram ▾', 'Caption ▾'].map((l) => (
          <div key={l} style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 5, padding: '4px 10px', fontSize: 10, color: '#666' }}>{l}</div>
        ))}
      </div>
      <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#CCC', lineHeight: 1.65, minHeight: 82, opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        {text}
        {text.length > 0 && text.length < CAPTION.length && <span style={{ color: '#7A1C1C' }}>|</span>}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 10, alignItems: 'center' }}>
        {[{ l: 'IG', c: '#e1306c' }, { l: 'FB', c: '#1877f2' }, { l: 'G', c: '#34a853' }, { l: 'TT', c: '#e8e8e8' }].map(({ l, c }) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
            <span style={{ fontSize: 9, color: '#444' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Card 2: Calendar grid (faster fill) ──────────────────────────────────────
type DmCalDot = { row: number; col: number; color: string; key: number };
const DM_INIT_DOTS: DmCalDot[] = [
  { row: 0, col: 1, color: '#7A1C1C', key: 0 }, { row: 0, col: 3, color: '#7A1C1C', key: 1 },
  { row: 1, col: 0, color: '#1d4ed8', key: 2 }, { row: 1, col: 4, color: '#7A1C1C', key: 3 },
  { row: 2, col: 2, color: '#1d4ed8', key: 4 }, { row: 2, col: 5, color: '#7A1C1C', key: 5 },
  { row: 3, col: 6, color: '#1d4ed8', key: 6 },
];

const DmCalendarMockup = () => {
  const [dots, setDots] = useState<DmCalDot[]>(DM_INIT_DOTS);
  const keyRef = useRef(20);
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const iv = setInterval(() => {
      setDots((prev) => {
        const occupied = new Set(prev.map((d) => `${d.row},${d.col}`));
        const avail: [number, number][] = [];
        for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) if (!occupied.has(`${r},${c}`)) avail.push([r, c]);
        if (avail.length === 0) return DM_INIT_DOTS;
        const [r, c] = avail[Math.floor(Math.random() * avail.length)];
        keyRef.current++;
        return [...prev, { row: r, col: c, color: Math.random() > 0.4 ? '#1d4ed8' : '#7A1C1C', key: keyRef.current }];
      });
    }, 1200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 5 }}>
        {DAYS.map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 9, color: '#444', fontWeight: 600 }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
        {Array.from({ length: 28 }, (_, idx) => {
          const row = Math.floor(idx / 7); const col = idx % 7;
          const dot = dots.find((d) => d.row === row && d.col === col);
          return (
            <div key={idx} style={{ height: 20, borderRadius: 3, background: row === 1 ? '#1a1a1a' : '#141414', border: `1px solid ${row === 1 ? '#222' : '#181818'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {dot && <motion.div key={dot.key} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ width: 6, height: 6, borderRadius: '50%', background: dot.color }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Card 3: Google Business Profile mockup ────────────────────────────────────
const DmGBPMockup = () => {
  const [views, setViews] = useState(247);
  const [ratingPct, setRatingPct] = useState(0);
  const [showPost, setShowPost] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setShowPost(true), 800);
    const DURATION = 1600; const start = Date.now();
    let raf: number;
    const update = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      setRatingPct(4.8 * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    const iv = setInterval(() => setViews((v) => v + Math.floor(Math.random() * 3) + 1), 1800);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearInterval(iv); };
  }, [inView]);

  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.3 }}
      style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#E0E0E0', marginBottom: 3 }}>Scottsdale Med Spa</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} style={{ color: i < Math.round(ratingPct) ? '#f5a623' : '#333', fontSize: 10 }}>{s}</span>
            ))}
            <span style={{ fontSize: 9, color: '#555', marginLeft: 3 }}>{ratingPct.toFixed(1)}</span>
          </div>
        </div>
        <span style={{ fontSize: 8, fontWeight: 700, background: '#16a34a1a', color: '#22c55e', border: '1px solid #16a34a33', borderRadius: 4, padding: '2px 6px', letterSpacing: '0.05em' }}>Updated just now</span>
      </div>
      <AnimatePresence>
        {showPost && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 5, padding: '8px 10px', marginBottom: 8 }}>
            <div style={{ height: 28, background: '#1a1a1a', borderRadius: 3, marginBottom: 6 }} />
            <div style={{ fontSize: 10, color: '#666' }}>Latest update posted</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ fontSize: 10, color: '#555', borderTop: '1px solid #1a1a1a', paddingTop: 8 }}>
        <span style={{ color: '#888', fontWeight: 600 }}>{views}</span> views this week
      </div>
    </motion.div>
  );
};

// ── Card 4: Client approval portal ───────────────────────────────────────────
const DmPortalMockup = () => {
  const [pending, setPending] = useState(2);
  useEffect(() => {
    const iv = setInterval(() => setPending((p) => (p > 0 ? p - 1 : 2)), 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#CCC' }}>Content Queue</span>
        {pending > 0 && <span style={{ fontSize: 9, fontWeight: 700, background: '#f97316' + '1a', color: '#f97316', border: '1px solid ' + '#f97316' + '33', borderRadius: 4, padding: '2px 6px' }}>{pending} pending</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 5, padding: '8px 10px' }}>
          <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>Instagram Post — Tomorrow 9am</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ flex: 1, background: '#16a34a1a', border: '1px solid #16a34a44', borderRadius: 4, color: '#22c55e', fontSize: 10, fontWeight: 600, padding: '4px 0', cursor: 'default' }}>Approve</button>
            <button style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, color: '#666', fontSize: 10, padding: '4px 0', cursor: 'default' }}>Revise</button>
          </div>
        </div>
        <div style={{ fontSize: 10, color: '#555', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
          Next post: Tomorrow 9am
        </div>
      </div>
    </div>
  );
};

// ── Card 5: Monthly stats counting up ────────────────────────────────────────
const DmStatsMockup = () => {
  const [counts, setCounts] = useState({ posts: 0, imp: 0, visits: 0, followers: 0 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const TARGETS = { posts: 47, imp: 12400, visits: 284, followers: 23 };
    const DURATION = 2000; const start = Date.now();
    let raf: number;
    const update = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts({ posts: Math.round(TARGETS.posts * e), imp: Math.round(TARGETS.imp * e), visits: Math.round(TARGETS.visits * e), followers: Math.round(TARGETS.followers * e) });
      if (p < 1) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.3 }}
      style={{ background: '#0f0f0f', borderRadius: 8, padding: 14, marginTop: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: 'Posts published', value: counts.posts },
          { label: 'Impressions', value: fmt(counts.imp) },
          { label: 'Profile visits', value: counts.visits },
          { label: 'New followers', value: counts.followers },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 6, padding: '10px 12px' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F5F5F5', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{value}</div>
            <div style={{ fontSize: 9, color: '#444', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const DigitalMarketingPage = () => {
  return (
    <>
      <SEOHead
        title="Digital Marketing Scottsdale & Phoenix AZ | RAH Operations"
        description="Digital marketing systems built to generate visibility, qualified leads, and measurable revenue growth for Scottsdale and Phoenix Arizona businesses."
        url={absoluteUrl('/digital-marketing')}
      />

      {/* HERO - BOLD HORIZONTAL */}
      <section className="relative py-32 lg:py-48 bg-gradient-to-r from-slate-dark via-luxury-red/10 to-slate-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-luxury-red to-transparent" />
        </div>

        <div className="container-clean relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="eyebrow-red mb-8">Digital Marketing • Growth Systems • Lead Generation</p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif-display font-bold leading-[0.85] mb-10 text-white max-w-5xl">
              Marketing That Produces
              <span className="block text-luxury-red">Real Results.</span>
            </h1>

            <p className="text-xl text-neutral-300 font-serif-body mb-12 max-w-2xl leading-relaxed">
              Most companies are posting, boosting, and hoping. That's not marketing. We build systems where visibility, messaging, and conversion work together to generate qualified leads.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/contact" size="lg">Strategy Call</Button>
              <Button to="/case-studies" variant="secondary" size="lg">See Results</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENTO SHOWCASE ─────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0A' }}>
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="mb-12">
            <p style={{ fontSize: 11, fontWeight: 500, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>WHAT YOU GET</p>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 600, color: '#F5F5F5', marginBottom: 12, letterSpacing: '-0.02em' }}>Your brand, posting itself daily.</h2>
            <p style={{ fontSize: 14, color: '#888888', maxWidth: 480, lineHeight: 1.65 }}>AI-generated content, scheduled posts, Google Business updates. All done for you while you focus on your business.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }} style={{ display: 'grid', gap: 12 }}>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[3fr_2fr]">
              <DmBentoCard title="AI Content Generation" description="Select a platform and content type. Claude AI writes the caption, Kie.ai generates the image. Posted automatically.">
                <DmContentMockup />
              </DmBentoCard>
              <DmBentoCard title="Scheduled & Posted Automatically" description="Content gets approved then goes live on schedule. No manual posting ever.">
                <DmCalendarMockup />
              </DmBentoCard>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <DmBentoCard title="Google Business Managed" description="Weekly posts, photo updates, and review monitoring — all handled for you.">
                <DmGBPMockup />
              </DmBentoCard>
              <DmBentoCard title="Client Approval Portal" description="Review and approve every post before it goes live. You stay in control.">
                <DmPortalMockup />
              </DmBentoCard>
              <DmBentoCard title="Monthly Reporting" description="See exactly what posted, what performed, and what's next.">
                <DmStatsMockup />
              </DmBentoCard>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-16 pt-12 border-t border-[#1A1A1A]">
            <p style={{ fontSize: 11, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>SERVING BUSINESSES NATIONWIDE</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: '#F5F5F5', marginBottom: 20, letterSpacing: '-0.01em' }}>Based in Scottsdale. Built for anywhere.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
              {[
                { label: 'Digital Marketing Scottsdale', to: '/services/digital-marketing-scottsdale' },
                { label: 'Digital Marketing Phoenix', to: '/services/digital-marketing-phoenix' },
                { label: 'Social Media Management', to: '/social-media-management' },
                { label: 'Google Business Scottsdale', to: '/services/google-business-profile-optimization-scottsdale' },
                { label: 'Google Business Phoenix', to: '/services/google-business-profile-optimization-phoenix' },
                { label: 'Reputation Management', to: '/reputation-management' },
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

      {/* PROBLEM - DATA COMPARISON */}
      <section className="section bg-cream-50">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">The Gap</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">
              Most Marketing Isn't Actually Marketing.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Disconnected Marketing',
                items: [
                  'Social media posting with no link to sales',
                  'Ads that drive clicks, not qualified leads',
                  'Website that doesn\'t convert traffic',
                  'No clear target or positioning',
                  'No measurement or ROI tracking',
                  'Budget wasted on activity, not outcomes'
                ],
                icon: '✕'
              },
              {
                title: 'Integrated Marketing System',
                items: [
                  'Every channel built around business goals',
                  'Ads targeting real customer intent',
                  'Website optimized for conversion',
                  'Clear positioning in every message',
                  'Tracked and measured results',
                  'Budget spent on what actually works'
                ],
                icon: '✓'
              }
            ].map((section, idx) => (
              <motion.div
                key={section.title}
                className={`border-4 p-10 ${idx === 0 ? 'border-luxury-red/30 bg-white' : 'border-luxury-red bg-luxury-red text-white'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <h3 className="text-2xl font-serif-display font-bold mb-8">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm md:text-base">
                      <span className="text-xl leading-none mt-1 flex-shrink-0">{section.icon}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="section bg-white">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">What We Build</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold text-slate-dark">
              Marketing Channels That Connect.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'SEO & Content', desc: 'Organic traffic built on keywords and value', icon: '◆' },
              { title: 'Paid Advertising', desc: 'Google Ads, Meta Ads targeting intent', icon: '◈' },
              { title: 'Email Strategy', desc: 'Nurture sequences that convert', icon: '◇' },
              { title: 'Social Media', desc: 'Authority building and engagement', icon: '◆' },
              { title: 'Conversion Optimization', desc: 'Landing pages that actually convert', icon: '◈' },
              { title: 'Analytics & Tracking', desc: 'Measure everything that matters', icon: '◇' }
            ].map((cap) => (
              <motion.div
                key={cap.title}
                className="border-3 border-slate-dark p-8 hover:bg-luxury-red hover:text-white hover:border-luxury-red group transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <p className="text-3xl mb-4 text-neutral-400 group-hover:text-white/50">{cap.icon}</p>
                <h3 className="text-lg font-serif-display font-bold mb-3">{cap.title}</h3>
                <p className="text-sm text-neutral-600 group-hover:text-white/80">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - FLOW */}
      <section className="section bg-slate-dark text-white">
        <div className="container-clean">
          <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="eyebrow-red mb-6">The System</p>
            <h2 className="text-6xl md:text-7xl font-serif-display font-bold">How We Build Marketing That Works.</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { n: '01', t: 'Audit & Strategy', d: 'Understand your market, competitors, and real customer intent.' },
              { n: '02', t: 'Channel Selection', d: 'Choose which channels actually reach your customers.' },
              { n: '03', t: 'Integrated Execution', d: 'Run campaigns that push traffic to a converting website.' },
              { n: '04', t: 'Track & Optimize', d: 'Measure results and double down on what works.' },
              { n: '05', t: 'Scale Results', d: 'Increase budget on proven channels and expand reach.' }
            ].map((step, i) => (
              <motion.div
                key={step.n}
                className={`flex gap-8 items-start pb-8 ${i < 4 ? 'border-b border-white/10' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-6xl font-serif-display font-bold text-luxury-red/30 flex-shrink-0 w-20">{step.n}</p>
                <div>
                  <h3 className="text-2xl font-serif-display font-bold mb-3">{step.t}</h3>
                  <p className="text-neutral-300 font-serif-body">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section bg-luxury-red text-white">
        <div className="container-clean">
          <motion.div className="grid md:grid-cols-4 gap-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {[
              { n: '3.2x', l: 'Average ROI' },
              { n: '+230%', l: 'Lead Volume' },
              { n: '42%', l: 'Avg CPC Reduction' },
              { n: '86%', l: 'Conversion Lift' }
            ].map((r) => (
              <div key={r.l} className="text-center border-t border-white/20 pt-6">
                <p className="text-5xl font-serif-display font-bold mb-2">{r.n}</p>
                <p className="text-white/80 uppercase tracking-wider text-sm">{r.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RELATED SERVICES — SEO internal links */}
      <section className="section section-dark">
        <div className="container-clean">
          <p className="eyebrow-red mb-6">Related Services</p>
          <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-white mb-6">
            Complete the Full Growth Stack
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed mb-10 max-w-3xl">
            We build integrated systems for Arizona businesses — from{' '}
            <Link to="/services/digital-marketing-scottsdale" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">digital marketing in Scottsdale</Link>{' '}
            and{' '}
            <Link to="/services/digital-marketing-phoenix" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">digital marketing in Phoenix</Link>{' '}
            to{' '}
            <Link to="/services/seo-scottsdale" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">SEO services in Scottsdale</Link>,{' '}
            <Link to="/services/seo-phoenix" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">SEO services in Phoenix</Link>, and{' '}
            <Link to="/services/google-business-profile-optimization-phoenix" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">Google Business Profile optimization in Phoenix</Link>.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Website Design & SEO',
                desc: 'Marketing without a high-converting website wastes every dollar. We build web development that ranks in Scottsdale and Phoenix.',
                link: '/website-design-and-seo',
                anchor: 'website design SEO Scottsdale Phoenix AZ',
              },
              {
                title: 'Social Media Management',
                desc: 'Digital marketing and social media work together. We build the content system that amplifies your paid campaigns.',
                link: '/social-media-management',
                anchor: 'social media management near Phoenix Arizona',
              },
              {
                title: 'Business Credit & Funding',
                desc: 'Scale your marketing budget with business credit. We help Arizona companies build the financial infrastructure to grow.',
                link: '/business-credit-and-funding',
                anchor: 'business credit building Phoenix Scottsdale',
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
            <h2 className="text-5xl md:text-6xl font-serif-display font-bold text-slate-dark mb-8">
              Ready to Build a Real Marketing System?
            </h2>
            <p className="text-xl text-neutral-600 font-serif-body mb-12 max-w-2xl mx-auto">
              Let's talk about your business goals and build a marketing strategy that actually produces results.
            </p>
            <Button to="/contact" size="lg">Schedule Strategy Call</Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingPage;
