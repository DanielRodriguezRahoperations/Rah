import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const PORTFOLIO = [
  {
    name: 'Tier 1 Customs',
    domain: 'tier1customs.com',
    desc: 'Custom automotive website with gallery and inquiry system',
    image: '/t1.png',
    to: '/case-studies/tier-1-customs',
  },
  {
    name: 'The Ever After Edit',
    domain: 'everaftereditfl.com',
    desc: 'Luxury wedding signage brand with booking and portfolio',
    image: '/ee.png',
    to: '/case-studies/ever-after-edit',
  },
  {
    name: 'Empire Builds AZ',
    domain: 'empirebuildsaz.com',
    desc: 'Custom home builder with project showcase and lead capture',
    image: '/emp.png',
    to: '/case-studies/empire-builds-az',
  },
  {
    name: 'Daniel Rodriguez',
    domain: 'danielrodriguez.org',
    desc: 'Personal brand and author site with blog and content system',
    image: null,
    to: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 0.66, 0.66, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Website Design Scottsdale | Business Systems That Generate Leads — RAH Operations"
        description="RAH Operations builds websites, marketing automation, and business systems for Arizona companies. Custom React sites, AI content, client portals — delivered in days, not months."
        url={absoluteUrl('/')}
      />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
        />

        {/* Dark gradient overlay — ensures text is fully readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/60 via-slate-dark/70 to-slate-dark/90" />

        {/* Hero content sits above gradient */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.33, 0.66, 0.66, 1] }}
            className="max-w-5xl"
          >
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-white/45 font-sans">
              RAH Operations · Scottsdale, AZ
            </p>

            <h1 className="mb-6 font-serif-display text-5xl font-bold leading-[1.02] sm:text-6xl md:text-7xl lg:text-[80px]">
              Your Business Should Run
              <span className="block text-luxury-accent">This Well Online.</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl font-serif-body text-lg leading-relaxed text-white/68 sm:text-xl">
              RAH Operations builds websites, marketing systems, and business automation
              for Arizona companies ready to grow.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/website-intake"
                className="inline-block border border-luxury-red bg-luxury-red px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-luxury-dark hover:bg-luxury-dark"
              >
                Build My Website
              </Link>
              <Link
                to="/marketing/intake"
                className="inline-block border border-white/35 bg-white/8 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/15"
              >
                Grow My Business
              </Link>
            </div>

            <p className="mt-7 text-sm text-white/42">
              <Link
                to="/credit-repair/intake"
                className="underline underline-offset-4 transition-colors hover:text-white/70"
              >
                Credit repair services also available →
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-white"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/35">Scroll</p>
          <div className="mx-auto h-8 w-px bg-white/22" />
        </motion.div>
      </section>

      {/* ── SECTION 2: WHAT WE ACTUALLY BUILD ───────────────────────── */}
      <section className="bg-neutral-950 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p variants={fadeUp} className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-luxury-accent">
              What We Actually Build
            </motion.p>
            <motion.h2 variants={fadeUp} className="max-w-2xl font-serif-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Not templates. Not retainers.
              <span className="block text-neutral-400"> Real systems.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid gap-px bg-neutral-800 sm:grid-cols-3"
          >
            {[
              {
                number: '01',
                title: 'Websites That Convert',
                body: 'Custom React sites with intake forms, booking systems, and client portals built in. Every site is engineered to rank locally and move visitors toward a decision. Not templates — built from your business up.',
              },
              {
                number: '02',
                title: 'Marketing On Autopilot',
                body: 'AI-generated content, scheduled posts, and Google Business management — done for you every month. Your brand stays active and consistent without you lifting a finger.',
              },
              {
                number: '03',
                title: 'Systems That Scale',
                body: 'Credit repair automation, CRM, document management, and automated client emails. The backend infrastructure most businesses never build — delivered in one week.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.number}
                variants={fadeUp}
                className="group flex flex-col bg-neutral-950 p-10 transition-colors duration-300 hover:bg-[#0f0f0f] lg:p-12"
              >
                <p className="mb-6 font-serif-display text-5xl font-bold text-luxury-red/20 transition-colors duration-300 group-hover:text-luxury-red/35">
                  {item.number}
                </p>
                <h3 className="mb-4 font-serif-display text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="font-serif-body text-base leading-relaxed text-neutral-400">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 border-t border-neutral-800 pt-8"
          >
            <p className="font-serif-body text-base text-neutral-500">
              One week of work with RAH replaces what most agencies charge{' '}
              <span className="text-white">$30,000–$50,000</span> to build over 3 months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: PORTFOLIO ─────────────────────────────────────── */}
      <section className="bg-[#f9f7f4] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p variants={fadeUp} className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-luxury-red">
              Our Work
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-display text-4xl font-bold text-slate-dark md:text-5xl">
              Sites We've Built.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid gap-6 sm:grid-cols-2"
          >
            {PORTFOLIO.map((site) => {
              const Card = (
                <motion.article
                  key={site.domain}
                  variants={fadeUp}
                  className="group relative overflow-hidden bg-white"
                >
                  {site.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                      <img
                        src={site.image}
                        alt={site.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/70 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="relative flex aspect-[16/10] items-center justify-center bg-slate-dark">
                      <p className="font-serif-display text-2xl font-bold text-white/20">{site.domain}</p>
                    </div>
                  )}

                  <div className="flex items-end justify-between p-6">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-luxury-red">
                        {site.domain}
                      </p>
                      <h3 className="font-serif-display text-xl font-bold text-slate-dark">{site.name}</h3>
                      <p className="mt-1 text-sm text-neutral-500">{site.desc}</p>
                    </div>
                    {site.to && (
                      <span className="ml-4 shrink-0 text-sm font-semibold text-neutral-400 transition-colors group-hover:text-luxury-red">
                        View →
                      </span>
                    )}
                  </div>
                </motion.article>
              );

              return site.to ? (
                <Link key={site.domain} to={site.to} className="block">
                  {Card}
                </Link>
              ) : (
                <div key={site.domain}>{Card}</div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: THE RAH DIFFERENCE ───────────────────────────── */}
      <section className="bg-slate-dark py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p variants={fadeUp} className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-luxury-accent">
              The RAH Difference
            </motion.p>
            <motion.h2 variants={fadeUp} className="max-w-2xl font-serif-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Most agencies build websites.
              <span className="block text-luxury-red"> We build systems.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                label: 'Built in days, not months',
                body: 'Real sites delivered in 7 days or less. No discovery calls that drag on for weeks. You see a working product fast.',
              },
              {
                label: 'Everything connected',
                body: "Your intake form, your emails, your portal, your content — one system that talks to itself. No patchwork of tools that don't sync.",
              },
              {
                label: 'You stay in control',
                body: "Admin dashboard, client portal, real-time updates. You never have to call us to know what's happening with your business.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="border-l-2 border-luxury-red pl-8 py-2"
              >
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-luxury-red">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mb-3 font-serif-display text-2xl font-bold text-white">
                  {item.label}
                </h3>
                <p className="font-serif-body text-base leading-relaxed text-neutral-400">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: TWO-PATH CTA ──────────────────────────────────── */}
      <section className="grid sm:grid-cols-2">
        {/* Left — Website */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start justify-center bg-neutral-950 px-10 py-20 lg:px-16 lg:py-28"
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-luxury-accent">
            Need a website?
          </p>
          <h2 className="mb-5 font-serif-display text-3xl font-bold leading-snug text-white lg:text-4xl">
            A premium site,
            <br />delivered this week.
          </h2>
          <p className="mb-8 font-serif-body text-base leading-relaxed text-neutral-400">
            Custom React build with SEO, intake forms, and everything your business needs to look credible and convert visitors.
          </p>
          <Link
            to="/website-intake"
            className="border border-luxury-red bg-luxury-red px-7 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-luxury-dark hover:bg-luxury-dark"
          >
            Start Your Project
          </Link>
        </motion.div>

        {/* Right — Marketing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-start justify-center bg-[#111111] px-10 py-20 lg:px-16 lg:py-28"
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-luxury-accent">
            Need more clients?
          </p>
          <h2 className="mb-5 font-serif-display text-3xl font-bold leading-snug text-white lg:text-4xl">
            Marketing that runs
            <br />without you.
          </h2>
          <p className="mb-8 font-serif-body text-base leading-relaxed text-neutral-400">
            AI-powered content, scheduled posts, Google Business management, and a client portal — all handled monthly so you can focus on the work.
          </p>
          <Link
            to="/marketing/intake"
            className="border border-neutral-600 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-slate-dark"
          >
            Grow My Business
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;
