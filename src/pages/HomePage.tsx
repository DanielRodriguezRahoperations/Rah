import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

// ── Animation variants ────────────────────────────────────────────────────────

const up = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
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
    url: 'https://www.empirebuildsaz.com',
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

const BULLETS = [
  'Not a template. Every site is built in React from scratch.',
  'Not just a website. Intake forms, portals, and automation included.',
  "Not slow. Most projects live within 7 days.",
];

// ── Portfolio card with live iframe preview ───────────────────────────────────

type PortfolioItem = (typeof PORTFOLIO)[number];

const PortfolioCard = ({ domain, name, desc, to, url }: PortfolioItem) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [hovered, setHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Hard timeout — fires if onLoad never arrives (XFO blocks, slow network, etc.)
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'error' : s));
    }, 9000);
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleLoad = () => {
    clearTimeout(timerRef.current);
    // Cross-origin iframes always throw SecurityError on contentDocument access —
    // that confirms something actually rendered. Accessible + empty body = XFO block.
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc && (!doc.body || doc.body.innerHTML.trim() === '')) {
        setStatus('error');
      } else {
        setStatus('loaded');
      }
    } catch {
      // SecurityError = cross-origin content rendered successfully
      setStatus('loaded');
    }
  };

  const handleError = () => {
    clearTimeout(timerRef.current);
    setStatus('error');
  };

  const isError = status === 'error';

  const cardInner = (
    <motion.div
      animate={{ borderColor: isError ? ['#1A1A1A', '#2D1818', '#1A1A1A'] : hovered ? '#2A2A2A' : '#1A1A1A' }}
      transition={isError ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.15 }}
      className="border bg-[#0D0D0D] overflow-hidden"
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── TOP: iframe preview (60% height) ── */}
      <div className="relative overflow-hidden" style={{ height: '252px' }}>
        {isError ? (
          /* Fallback — XFO block or network error */
          <div className="flex h-full flex-col items-center justify-center gap-5 px-8">
            <span style={{ fontSize: 13, fontWeight: 500, color: '#555555' }}>{domain}</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: '#666666',
                border: '1px solid #2A2A2A',
                padding: '7px 18px',
                textDecoration: 'none',
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#444444';
                (e.currentTarget as HTMLAnchorElement).style.color = '#F5F5F5';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2A2A2A';
                (e.currentTarget as HTMLAnchorElement).style.color = '#666666';
              }}
            >
              View Live Site →
            </a>
          </div>
        ) : (
          <>
            {/* Loading hint */}
            {status === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span style={{ fontSize: 10, letterSpacing: '0.16em', color: '#252525', textTransform: 'uppercase' }}>
                  Loading preview…
                </span>
              </div>
            )}

            {/* iframe — pointer-events toggled by hover */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: hovered ? 'auto' : 'none',
              }}
            >
              <iframe
                ref={iframeRef}
                src={url}
                title={name}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                  width: '1440px',
                  height: '900px',
                  transform: 'scale(0.35)',
                  transformOrigin: 'top left',
                  border: 'none',
                  opacity: status === 'loaded' ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              />
            </div>

            {/* Bottom gradient fade into card background */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to bottom, transparent, #0D0D0D)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          </>
        )}
      </div>

      {/* ── BOTTOM: meta (40% height) ── */}
      <div
        className="border-t border-[#1A1A1A] p-5"
        style={{
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'transform 0.2s ease',
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#E0E0E0' }}>{name}</p>
            <p style={{ marginTop: 3, fontSize: 12, color: '#666666' }}>{desc}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ display: 'block', marginTop: 8, fontSize: 11, color: '#333333', textDecoration: 'none' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#666666')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#333333')}
            >
              {domain}
            </a>
          </div>
          {/* External link arrow */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ flexShrink: 0, fontSize: 16, color: '#333333', textDecoration: 'none', marginTop: 2 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#888888')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#333333')}
          >
            ↗
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div variants={up}>
      {to ? (
        <Link to={to} className="block">
          {cardInner}
        </Link>
      ) : (
        cardInner
      )}
    </motion.div>
  );
};

// ── Reusable section divider ──────────────────────────────────────────────────

const Div = () => <div className="border-t border-[#1A1A1A]" />;

// ── Component ─────────────────────────────────────────────────────────────────

const HomePage = () => {
  const workRef = useRef<HTMLElement>(null);
  const scrollToWork = () => workRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      className="bg-[#0A0A0A] text-[#F5F5F5]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Load Inter */}
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <SEOHead
        title="Website Design Scottsdale | Business Systems — RAH Operations"
        description="RAH Operations builds websites, marketing automation, and client systems for Arizona businesses. Custom React sites with intake forms, portals, and AI content. Delivered fast."
        url={absoluteUrl('/')}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-[680px]"
        >
          <motion.p
            variants={up}
            className="mb-7 text-[11px] font-medium uppercase tracking-[0.16em] text-[#555555]"
          >
            Scottsdale, AZ
          </motion.p>

          <motion.h1
            variants={up}
            className="mb-5 text-[42px] font-bold leading-[1.05] tracking-[-0.03em] text-[#F5F5F5] sm:text-[54px] lg:text-[64px]"
          >
            Business systems that
            <br />
            actually work online.
          </motion.h1>

          <motion.p
            variants={up}
            className="mx-auto mb-10 max-w-[440px] text-[16px] leading-relaxed text-[#888888] sm:text-[17px]"
          >
            Websites, marketing automation, and client systems for Arizona businesses ready to grow.
          </motion.p>

          <motion.div variants={up} className="flex flex-col items-center gap-4">
            <Link
              to="/website-intake"
              className="inline-block rounded bg-[#7A1C1C] px-7 py-3 text-[13px] font-semibold text-white tracking-[0.02em] transition-opacity duration-200 hover:opacity-80"
            >
              Start a Project
            </Link>
            <button
              type="button"
              onClick={scrollToWork}
              className="border-0 bg-transparent p-0 text-[13px] font-medium text-[#555555] cursor-pointer transition-colors duration-200 hover:text-[#F5F5F5]"
            >
              See our work ↓
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CLIENT NAMES ──────────────────────────────────────────────────── */}
      <Div />
      <div className="px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {CLIENTS.map((c, i) => (
            <span
              key={c}
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888] opacity-35 select-none"
            >
              {i > 0 && (
                <span className="mr-8 opacity-40">·</span>
              )}
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── WHAT WE BUILD ─────────────────────────────────────────────────── */}
      <Div />
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.p variants={up} className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
              What We Build
            </motion.p>
            <motion.h2 variants={up} className="mb-14 max-w-sm text-[26px] font-semibold tracking-[-0.02em] text-[#F5F5F5]">
              Everything your business needs to run online.
            </motion.h2>

            <motion.div variants={stagger} className="grid gap-px bg-[#1A1A1A] sm:grid-cols-3">
              {SERVICES.map((s) => (
                <motion.div
                  key={s.n}
                  variants={up}
                  className="flex flex-col gap-5 bg-[#0D0D0D] p-8 lg:p-10"
                >
                  <span className="text-[11px] font-medium tracking-[0.1em] text-[#444444]">{s.n}</span>
                  <h3 className="text-[15px] font-semibold leading-snug text-[#F5F5F5]">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed text-[#888888]">{s.desc}</p>
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
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

      {/* ── THE DIFFERENCE ────────────────────────────────────────────────── */}
      <Div />
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <motion.div variants={up}>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
                The Difference
              </p>
              <p className="text-[52px] font-bold tracking-[-0.04em] leading-[0.95] text-[#F5F5F5] lg:text-[64px]">
                Built
                <br />
                different.
              </p>
            </motion.div>

            <motion.ul variants={stagger} className="space-y-8 pt-2 lg:pt-14">
              {BULLETS.map((text) => (
                <motion.li key={text} variants={up} className="flex items-start gap-4">
                  <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#7A1C1C]" />
                  <span className="text-[14px] leading-relaxed text-[#888888]">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ── SPLIT CTA ─────────────────────────────────────────────────────── */}
      <Div />
      <section>
        <div className="grid sm:grid-cols-2">
          {/* Left — website */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
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
              <Link
                to="/website-intake"
                className="inline-block rounded bg-[#7A1C1C] px-6 py-2.5 text-[12px] font-semibold text-white tracking-[0.02em] transition-opacity duration-200 hover:opacity-80"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — marketing */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
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
              <Link
                to="/marketing/intake"
                className="inline-block rounded border border-[#2A2A2A] px-6 py-2.5 text-[12px] font-semibold text-[#CCCCCC] tracking-[0.02em] transition-colors duration-200 hover:border-[#555555] hover:text-[#F5F5F5]"
              >
                Grow My Business
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
