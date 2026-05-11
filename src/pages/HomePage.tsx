import { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const BULLETS = [
  'Not a template. Every site is built in React from scratch.',
  'Not just a website. Intake forms, portals, and automation included.',
  "Not slow. Most projects live within 7 days.",
];

const HERO_WORDS: { text: string; br: boolean }[] = [
  { text: 'Business', br: false },
  { text: 'systems', br: false },
  { text: 'that', br: true },
  { text: 'actually', br: false },
  { text: 'work', br: false },
  { text: 'online.', br: false },
];

// ── Portfolio card with live iframe preview ───────────────────────────────────

type PortfolioItem = (typeof PORTFOLIO)[number];

const PortfolioCard = ({ domain, name, desc, to, url }: PortfolioItem) => {
  const cardInner = (
    <motion.div
      className="group border border-[#1A1A1A] bg-[#0D0D0D] overflow-hidden"
      style={{ cursor: 'pointer' }}
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', borderColor: '#383838' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* TOP: live iframe preview */}
      <div style={{ position: 'relative', height: '252px', overflow: 'hidden' }}>
        <iframe
          src={url}
          title={name}
          loading="eager"
          style={{
            width: '1440px',
            height: '900px',
            transform: 'scale(0.35)',
            transformOrigin: 'top left',
            border: 'none',
            display: 'block',
          }}
        />
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
      </div>

      {/* BOTTOM: meta */}
      <div className="border-t border-[#1A1A1A] p-5">
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
      <svg
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 99,
          opacity: 0.04,
        }}
      >
        <filter id="grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>

      {/* Inter font + orb keyframe animations */}
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
        `}</style>
      </Helmet>

      <SEOHead
        title="Website Design Scottsdale | Business Systems — RAH Operations"
        description="RAH Operations builds websites, marketing automation, and client systems for Arizona businesses. Custom React sites with intake forms, portals, and AI content. Delivered fast."
        url={absoluteUrl('/')}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
        {/* Ambient gradient orbs */}
        <div
          className="rah-orb-1 pointer-events-none absolute"
          style={{
            top: '20%',
            left: '15%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(122,28,28,0.12) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="rah-orb-2 pointer-events-none absolute"
          style={{
            bottom: '20%',
            right: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(60,20,80,0.1) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />

        <div className="relative mx-auto w-full max-w-[680px]">
          {/* Eyebrow with letter-spacing animation */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.05em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-7 text-[11px] font-medium uppercase text-[#555555]"
          >
            Scottsdale, AZ
          </motion.p>

          {/* Word-by-word hero h1 */}
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
                {br ? <br /> : ' '}
              </Fragment>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-10 max-w-[440px] text-[16px] leading-relaxed text-[#888888] sm:text-[17px]"
          >
            Websites, marketing automation, and client systems for Arizona businesses ready to grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
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
        </div>
      </section>

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
              {i > 0 && (
                <span className="mr-8 opacity-40">·</span>
              )}
              {c}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── WHAT WE BUILD ─────────────────────────────────────────────────── */}
      <Div />
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
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
                  className="group relative flex flex-col gap-5 bg-[#0D0D0D] p-8 lg:p-10 overflow-hidden"
                  whileHover={{ backgroundColor: '#111111' }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(122,28,28,0.08), transparent 70%)' }}
                  />
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
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
            viewport={{ once: true, margin: '-80px' }}
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
