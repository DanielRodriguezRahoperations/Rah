import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

interface CheckResult {
  score: number;
  max: number;
  passed: boolean;
  message: string;
}

interface AuditResults {
  score: number;
  grade: string;
  domain: string;
  leadId: string | null;
  checks: {
    ssl: CheckResult;
    metaTags: CheckResult;
    viewport: CheckResult;
    sitemap: CheckResult;
    robots: CheckResult;
    schema: CheckResult;
    googleBusiness: CheckResult;
    pageSpeed: CheckResult;
  };
  recommendations: string[];
}

type Stage = 'form' | 'loading' | 'results' | 'error';

const LOADING_STEPS = [
  'Connecting to your website...',
  'Checking SSL certificate...',
  'Analyzing meta tags and SEO...',
  'Testing mobile compatibility...',
  'Checking sitemap and robots.txt...',
  'Scanning for schema markup...',
  'Checking Google Business signals...',
  'Measuring page response time...',
  'Generating your report...',
];

const CHECK_LABELS: Record<string, string> = {
  ssl: 'SSL Certificate',
  metaTags: 'Meta Tags & SEO',
  viewport: 'Mobile Viewport',
  sitemap: 'XML Sitemap',
  robots: 'Robots.txt',
  schema: 'Schema Markup',
  googleBusiness: 'Google Business',
  pageSpeed: 'Page Speed',
};

function scoreColor(score: number): string {
  if (score >= 75) return '#22c55e';
  if (score >= 60) return '#f59e0b';
  return '#ef4444';
}

function gradeLabel(grade: string): string {
  const labels: Record<string, string> = {
    A: 'Excellent',
    B: 'Good',
    C: 'Needs Work',
    D: 'Poor',
    F: 'Critical Issues',
  };
  return labels[grade] ?? grade;
}

// Circular SVG gauge
const ScoreGauge = ({ score }: { score: number }) => {
  const R = 70;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - score / 100);
  const color = scoreColor(score);

  return (
    <svg viewBox="0 0 180 180" width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="90" cy="90" r={R} fill="none" stroke="#1e1e1e" strokeWidth="12" />
      <circle
        cx="90" cy="90" r={R} fill="none"
        stroke={color} strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1), stroke 0.4s' }}
      />
    </svg>
  );
};

// Loading circle
const ProgressRing = ({ pct }: { pct: number }) => {
  const R = 44;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - pct / 100);
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="50" cy="50" r={R} fill="none" stroke="#1e1e1e" strokeWidth="6" />
      <circle cx="50" cy="50" r={R} fill="none" stroke="#7A1C1C" strokeWidth="6"
        strokeLinecap="round" strokeDasharray={C} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
    </svg>
  );
};

const WebsiteAuditPage = () => {
  const [stage, setStage] = useState<Stage>('form');
  const [domain, setDomain] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults] = useState<AuditResults | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);

  const apiDoneRef = useRef(false);
  const apiDataRef = useRef<AuditResults | null>(null);
  const apiErrorRef = useRef(false);
  const errorMsgRef = useRef('');

  // Loading step animation
  useEffect(() => {
    if (stage !== 'loading') return;
    apiDoneRef.current = false;
    apiDataRef.current = null;
    apiErrorRef.current = false;

    let step = 0;
    let destroyed = false;

    const advance = () => {
      if (destroyed) return;
      step++;
      setLoadingStep(step);

      if (step < LOADING_STEPS.length - 1) {
        setTimeout(advance, 2100);
      } else {
        // At final step — poll until API finishes
        const poll = setInterval(() => {
          if (destroyed) { clearInterval(poll); return; }
          if (apiDoneRef.current) {
            clearInterval(poll);
            setTimeout(() => {
              if (destroyed) return;
              if (apiErrorRef.current) {
                setError(errorMsgRef.current || 'Audit failed. Please try again.');
                setStage('error');
              } else {
                setResults(apiDataRef.current);
                setStage('results');
              }
            }, 600);
          }
        }, 300);
      }
    };

    setTimeout(advance, 2100);
    return () => { destroyed = true; };
  }, [stage]);

  // Score count-up
  useEffect(() => {
    if (!results || stage !== 'results') return;
    const target = results.score;
    const DURATION = 1600;
    const start = Date.now();
    let raf: number;
    const animate = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplayScore(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [results, stage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoadingStep(0);
    setStage('loading');

    try {
      const res = await fetch('/api/run-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        apiErrorRef.current = true;
        errorMsgRef.current = data.error || 'Audit failed. Please try again.';
      } else {
        apiDataRef.current = data;
      }
    } catch {
      apiErrorRef.current = true;
      errorMsgRef.current = 'Network error. Please check your connection.';
    } finally {
      apiDoneRef.current = true;
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!results?.leadId || !phone) return;
    setPhoneLoading(true);
    try {
      await fetch('/api/audit-update-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: results.leadId, phone }),
      });
      setPhoneSent(true);
    } catch {
      // silent fail
    } finally {
      setPhoneLoading(false);
    }
  };

  const BADGE_LABELS = [
    'SSL Security', 'Meta Tags', 'Mobile', 'Sitemap',
    'Robots.txt', 'Schema', 'Google Business', 'Page Speed',
  ];

  return (
    <>
      <SEOHead
        title="Free Website Audit Tool — RAH Operations"
        description="Get a free instant website audit. Check your SEO, speed, mobile, and Google presence in 30 seconds. No credit card. No obligation."
        url={absoluteUrl('/website-audit')}
      />

      {/* ── STAGE 1: FORM ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {stage === 'form' && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <section className="relative min-h-screen bg-[#0f0f0f] flex items-center overflow-hidden pt-28 pb-20">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-luxury-red/6 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-luxury-dark/30 rounded-full blur-[120px]" />
              </div>

              <div className="container-clean relative z-10 max-w-2xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.33, 0.66, 0.66, 1] }}>
                  <p className="text-luxury-red text-[11px] uppercase tracking-[0.28em] font-bold mb-6">
                    FREE WEBSITE AUDIT
                  </p>
                  <h1 className="font-serif-display font-bold text-white leading-[1.05] mb-6"
                    style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>
                    How does your website score?
                  </h1>
                  <p className="text-neutral-400 text-lg leading-relaxed mb-12 max-w-lg mx-auto">
                    Enter your domain and get a full SEO and performance audit in 30 seconds.
                    No credit card. No obligation.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Website URL</label>
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                        placeholder="yourbusiness.com"
                        className="w-full bg-[#111111] border border-neutral-800 text-white px-4 py-3.5 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Your Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Jane Smith"
                          className="w-full bg-[#111111] border border-neutral-800 text-white px-4 py-3.5 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@yourbusiness.com"
                          className="w-full bg-[#111111] border border-neutral-800 text-white px-4 py-3.5 rounded-sm text-sm focus:outline-none focus:border-luxury-red transition-colors"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-luxury-red hover:bg-luxury-light text-white py-4 text-[11px] uppercase tracking-[0.22em] font-bold transition-colors"
                    >
                      Run My Free Audit →
                    </button>
                  </form>

                  <div className="mt-10">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-4">What we check:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {BADGE_LABELS.map((b) => (
                        <span key={b} className="text-[10px] border border-neutral-800 text-neutral-500 px-3 py-1.5 rounded-sm">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ── STAGE 2: LOADING ────────────────────────────────────────────── */}
        {stage === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <section className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
              <div className="text-center max-w-sm mx-auto px-6">
                <div className="relative inline-block mb-8">
                  <ProgressRing pct={Math.round((loadingStep / (LOADING_STEPS.length - 1)) * 100)} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[13px] font-bold text-white font-mono">
                      {Math.round((loadingStep / (LOADING_STEPS.length - 1)) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  {LOADING_STEPS.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: i <= loadingStep ? 1 : 0.2, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        {i < loadingStep ? (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
                            className="text-green-400 text-sm font-bold">✓</motion.span>
                        ) : i === loadingStep ? (
                          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-luxury-red" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-neutral-800" />
                        )}
                      </div>
                      <span className={`text-sm ${i < loadingStep ? 'text-neutral-500 line-through' : i === loadingStep ? 'text-white' : 'text-neutral-700'}`}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <p className="text-xs text-neutral-600 mt-8">
                  Auditing <span className="text-neutral-400">{domain}</span>
                </p>
              </div>
            </section>
          </motion.div>
        )}

        {/* ── STAGE 3: RESULTS ────────────────────────────────────────────── */}
        {stage === 'results' && results && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <section className="min-h-screen bg-[#0A0A0A] pt-28 pb-20">
              <div className="container-clean max-w-4xl mx-auto">

                {/* Score header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-luxury-red text-[11px] uppercase tracking-[0.28em] font-bold mb-8">
                    Website Audit Results — {results.domain}
                  </p>

                  <div className="relative inline-block mb-6">
                    <ScoreGauge score={displayScore} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono font-bold leading-none" style={{ fontSize: 40, color: scoreColor(displayScore) }}>
                        {displayScore}
                      </span>
                      <span className="text-neutral-500 text-xs mt-1">out of 100</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <span className="font-serif-display font-bold text-4xl" style={{ color: scoreColor(results.score) }}>
                      {results.grade}
                    </span>
                    <span className="text-neutral-400 text-lg">—</span>
                    <span className="text-neutral-300 text-lg">{gradeLabel(results.grade)}</span>
                  </div>
                </motion.div>

                {/* Checks grid */}
                <motion.div
                  className="grid sm:grid-cols-2 gap-3 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {Object.entries(results.checks).map(([key, check], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                      style={{
                        background: '#111111',
                        border: `1px solid ${check.passed ? '#166534' : '#7f1d1d'}`,
                        borderRadius: 8,
                        padding: '14px 16px',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 14 }}>{check.passed ? '✅' : '❌'}</span>
                          <span className="text-sm font-semibold text-neutral-200">{CHECK_LABELS[key]}</span>
                        </div>
                        <span
                          className="text-xs font-mono font-bold shrink-0"
                          style={{ color: check.score === check.max ? '#22c55e' : check.score > 0 ? '#f59e0b' : '#ef4444' }}
                        >
                          {check.score}/{check.max}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed">{check.message}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Recommendations */}
                {results.score < 90 && results.recommendations.length > 0 && (
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ background: '#111111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '24px' }}
                  >
                    <h2 className="text-white font-semibold text-lg mb-6">Here's what's holding your site back:</h2>
                    <ol className="space-y-4">
                      {results.recommendations.map((rec, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-luxury-red/20 text-luxury-red text-xs font-bold flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-neutral-300 text-sm leading-relaxed">{rec}</p>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}

                {/* CTA */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{ background: '#7A1C1C', borderRadius: 10, padding: '40px 24px' }}
                >
                  <h2 className="font-serif-display font-bold text-white text-3xl mb-4">
                    Want RAH to fix all of this?
                  </h2>
                  <p className="text-red-200 text-base leading-relaxed mb-8 max-w-lg mx-auto">
                    Most of these issues can be resolved in a single day. We've done it for
                    businesses across Arizona and nationwide.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact"
                      className="bg-white text-luxury-red px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] font-bold hover:bg-red-50 transition-colors">
                      Book a Free Call
                    </Link>
                    <Link to="/portfolio"
                      className="border border-white/40 text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] font-bold hover:border-white transition-colors">
                      See Our Work
                    </Link>
                  </div>
                </motion.div>

                {/* Phone capture */}
                {results.leadId && !phoneSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    style={{ background: '#111111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '24px' }}
                  >
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Optional</p>
                    <h3 className="text-white font-semibold mb-2">Get your full PDF report emailed to you:</h3>
                    <form onSubmit={handlePhoneSubmit} className="flex gap-3 mt-4">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(623) 555-0100"
                        className="flex-1 bg-[#0f0f0f] border border-neutral-800 text-white px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-luxury-red transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={phoneLoading || !phone}
                        className="bg-luxury-red hover:bg-luxury-light disabled:opacity-50 text-white px-5 py-3 text-[11px] uppercase tracking-widest font-bold transition-colors whitespace-nowrap"
                      >
                        {phoneLoading ? 'Sending…' : 'Send Report'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {phoneSent && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                    <p className="text-green-400 text-sm">✓ Got it — we'll send your report shortly.</p>
                  </motion.div>
                )}

                {/* Run another audit */}
                <div className="text-center mt-10">
                  <button
                    onClick={() => { setStage('form'); setResults(null); setDisplayScore(0); setDomain(''); setName(''); setEmail(''); setPhone(''); setPhoneSent(false); }}
                    className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-300 transition-colors border border-neutral-800 hover:border-neutral-600 px-5 py-2.5"
                  >
                    ← Audit Another Site
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ── ERROR STATE ──────────────────────────────────────────────────── */}
        {stage === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <section className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
              <div className="text-center max-w-md mx-auto px-6">
                <p className="text-luxury-red text-[11px] uppercase tracking-[0.28em] font-bold mb-4">Audit Failed</p>
                <h2 className="font-serif-display text-white text-2xl mb-4">Something went wrong</h2>
                <p className="text-neutral-400 mb-8">{error}</p>
                <button
                  onClick={() => { setStage('form'); setError(''); }}
                  className="bg-luxury-red hover:bg-luxury-light text-white px-6 py-3 text-[11px] uppercase tracking-widest font-bold transition-colors"
                >
                  Try Again
                </button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WebsiteAuditPage;
