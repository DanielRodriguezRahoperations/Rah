import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HEADLINE = [
  { text: 'Start ',    delay: 0.55, em: false },
  { text: 'with ',    delay: 0.70, em: false },
  { text: 'a ',       delay: 0.85, em: false },
  { text: 'better',   delay: 1.00, em: true  },
  { text: '\n',       delay: 1.00, em: false },
  { text: 'foundation.', delay: 1.15, em: false },
];

const KEYFRAMES = `
  @keyframes cch-drift {
    from { transform: translate3d(-1%,-0.5%,0) scale(1.02); }
    to   { transform: translate3d(1%,0.5%,0) scale(1.04); }
  }
  @keyframes cch-rim {
    from { opacity: 0.65; transform: translateX(-2%); }
    to   { opacity: 0.95; transform: translateX(2%); }
  }
  @keyframes cch-sweep {
    0%,100% { transform: translateX(-30%); }
    50%     { transform: translateX(30%); }
  }
  @keyframes cch-grain {
    0%  { transform: translate(0,0); }
    20% { transform: translate(-1%,1%); }
    40% { transform: translate(1%,-1%); }
    60% { transform: translate(-1%,-1%); }
    80% { transform: translate(1%,1%); }
    100%{ transform: translate(0,0); }
  }
  @keyframes cch-pulse {
    0%,100% { box-shadow: 0 0 0 4px rgba(122,28,28,0.18); }
    50%     { box-shadow: 0 0 0 8px rgba(122,28,28,0.05); }
  }
  @keyframes cch-rule {
    to { transform: scaleX(1); }
  }

  .cch-film  { animation: cch-drift 22s ease-in-out infinite alternate; }
  .cch-rim   { animation: cch-rim 10s ease-in-out infinite alternate; }
  .cch-sweep { animation: cch-sweep 14s ease-in-out infinite; }
  .cch-grain { animation: cch-grain 1.4s steps(6) infinite; }
  .cch-dot   { animation: cch-pulse 2.4s ease-in-out infinite; }

  .cch-em {
    font-style: italic;
    position: relative;
  }
  .cch-em::after {
    content: "";
    position: absolute;
    left: 6%; right: 6%;
    bottom: -0.06em;
    height: 2px;
    background: #7a1c1c;
    transform: scaleX(0);
    transform-origin: left center;
    animation: cch-rule 1.1s 1.6s ease-out forwards;
  }

  .cch-cta {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 18px 26px;
    font-size: 11px;
    letter-spacing: 0.30em;
    text-transform: uppercase;
    font-weight: 500;
    color: #f5f0e8;
    text-decoration: none;
    border: 1px solid rgba(245,240,232,0.62);
    transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }
  .cch-cta:hover { background: #7a1c1c; border-color: #7a1c1c; color: #f5f0e8; }
  .cch-cta-ghost { border-color: rgba(245,240,232,0.12); color: rgba(245,240,232,0.62); }
  .cch-cta-ghost:hover { background: transparent; border-color: rgba(245,240,232,0.62); color: #f5f0e8; }

  .cch-arr {
    width: 22px; height: 1px;
    background: currentColor;
    position: relative;
    display: inline-block;
    flex-shrink: 0;
  }
  .cch-arr::after {
    content: "";
    position: absolute; right: 0; top: -3px;
    width: 8px; height: 8px;
    border-top: 1px solid currentColor;
    border-right: 1px solid currentColor;
    transform: rotate(45deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .cch-film,.cch-rim,.cch-sweep,.cch-grain,.cch-dot { animation: none !important; }
    .cch-em::after { transform: scaleX(1); animation: none; }
  }
  @media (max-width: 1100px) {
    .cch-frag { display: none !important; }
    .cch-rail { display: none !important; }
  }
  @media (max-width: 720px) {
    .cch-rail { display: none !important; }
    .cch-clock { display: none !important; }
    .cch-reassure-rule { display: none !important; }
  }
`;

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Phoenix',
        hour: '2-digit', minute: '2-digit', hour12: false,
      });
      setTime(`Scottsdale · ${t} MST`);
    };
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function ContactHero() {
  const clock = useClock();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <section
        style={{
          position: 'relative', width: '100%', minHeight: '100vh',
          background: '#0e0e0e', overflow: 'hidden', isolation: 'isolate',
          color: '#f5f0e8',
        }}
      >
        {/* ── CINEMATIC FILM LAYER ── */}
        <div
          className="cch-film"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden',
            background: `
              radial-gradient(ellipse at 70% 60%, rgba(245,240,232,0.06) 0%, transparent 55%),
              radial-gradient(ellipse at 50% 80%, rgba(245,240,232,0.04) 0%, transparent 50%),
              #0e0e0e
            `,
          }}
        >
          {/* MacBook SVG desk */}
          <div style={{ position: 'absolute', left: '55%', top: '54%', width: '60%', transform: 'translate(-50%,-50%)', opacity: 0.68 }}>
            <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <rect x="0" y="520" width="1200" height="180" fill="#101010"/>
              <rect x="0" y="520" width="1200" height="1" fill="rgba(245,240,232,0.05)"/>
              <g transform="translate(300,140)">
                <rect x="0" y="0" width="600" height="380" rx="10" fill="#0a0a0a" stroke="rgba(245,240,232,0.08)"/>
                <rect x="14" y="14" width="572" height="352" fill="#0e0e0e"/>
                <rect x="40" y="40" width="120" height="6" fill="rgba(245,240,232,0.10)"/>
                <rect x="40" y="80" width="320" height="14" fill="rgba(245,240,232,0.16)"/>
                <rect x="40" y="104" width="220" height="14" fill="rgba(245,240,232,0.12)"/>
                <rect x="40" y="150" width="500" height="6" fill="rgba(245,240,232,0.06)"/>
                <rect x="40" y="166" width="460" height="6" fill="rgba(245,240,232,0.06)"/>
                <rect x="40" y="182" width="420" height="6" fill="rgba(245,240,232,0.06)"/>
                <rect x="40" y="220" width="100" height="22" fill="rgba(122,28,28,0.6)"/>
                <g transform="translate(360,220)" opacity="0.7">
                  <rect x="0" y="60" width="14" height="40" fill="rgba(245,240,232,0.18)"/>
                  <rect x="22" y="40" width="14" height="60" fill="rgba(245,240,232,0.22)"/>
                  <rect x="44" y="20" width="14" height="80" fill="rgba(245,240,232,0.28)"/>
                  <rect x="66" y="50" width="14" height="50" fill="rgba(245,240,232,0.20)"/>
                  <rect x="88" y="10" width="14" height="90" fill="rgba(122,28,28,0.7)"/>
                  <rect x="110" y="30" width="14" height="70" fill="rgba(245,240,232,0.22)"/>
                </g>
                <rect x="0" y="368" width="600" height="12" fill="#080808"/>
              </g>
              <g transform="translate(300,520)" opacity="0.18">
                <defs>
                  <linearGradient id="cch-refl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(245,240,232,0.5)"/>
                    <stop offset="100%" stopColor="rgba(245,240,232,0)"/>
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="600" height="60" fill="url(#cch-refl)"/>
              </g>
            </svg>
          </div>

          {/* Floating form-hint overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', left: '58%', top: '42%', width: '34%',
              border: '1px solid rgba(245,240,232,0.05)',
              background: 'rgba(245,240,232,0.012)',
              padding: '18px 22px',
              transform: 'rotate(-1.5deg)',
              opacity: 0.55,
            }}
          >
            <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(245,240,232,0.32)', textTransform: 'uppercase', marginBottom: 14 }}>Brief · 02 of 04</div>
            {['84%','60%','96%','72%'].map((w, i) => (
              <div key={i} style={{ height: 10, background: 'rgba(245,240,232,0.05)', margin: '8px 0', width: w }} />
            ))}
            <div style={{ marginTop: 16, display: 'inline-block', padding: '8px 14px', fontFamily: '"Inter",sans-serif', fontSize: 9, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.62)', border: '1px solid rgba(245,240,232,0.12)' }}>Continue</div>
          </div>
        </div>

        {/* ── BURGUNDY RIM ── */}
        <div
          className="cch-rim"
          aria-hidden="true"
          style={{
            position: 'absolute', left: '-10%', top: '-10%', width: '60%', height: '120%',
            background: 'radial-gradient(ellipse at center, rgba(122,28,28,0.18) 0%, rgba(122,28,28,0) 55%)',
            pointerEvents: 'none', zIndex: 1,
          }}
        />

        {/* ── LIGHT SWEEP ── */}
        <div
          className="cch-sweep"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: '-20%', zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(110deg, transparent 38%, rgba(245,240,232,0.05) 50%, transparent 62%)',
          }}
        />

        {/* ── VIGNETTE ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* ── FILM GRAIN ── */}
        <div
          className="cch-grain"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
            mixBlendMode: 'overlay', opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.85'/></svg>")`,
          }}
        />

        {/* ── EDGE RAILS ── */}
        <div className="cch-rail" aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: 48, width: 1, background: 'rgba(245,240,232,0.12)', zIndex: 4 }} />
        <div className="cch-rail" aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: 48, width: 1, background: 'rgba(245,240,232,0.12)', zIndex: 4 }} />

        {/* ── DECORATIVE NUMERAL ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)',
            zIndex: 1, pointerEvents: 'none',
            fontFamily: '"Playfair Display",serif', fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(180px,28vw,380px)', lineHeight: 0.9,
            color: 'rgba(245,240,232,0.04)', letterSpacing: '-0.03em',
          }}
        >
          N°
        </div>

        {/* ── TOP CHROME ── */}
        <div
          style={{
            position: 'absolute', top: 42, left: 96, right: 96, zIndex: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: '"Inter",sans-serif', fontWeight: 300, fontSize: 12,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.62)',
          }}
        >
          <div style={{ fontFamily: '"Playfair Display",serif', fontWeight: 600, fontSize: 18, letterSpacing: '0.06em', textTransform: 'none', color: '#f5f0e8' }}>
            RAH<span style={{ color: '#7a1c1c' }}>.</span>
          </div>
          <div className="cch-clock" style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'none' }}>
            {clock}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div
          style={{
            position: 'relative', zIndex: 6,
            maxWidth: 1200, margin: '0 auto',
            padding: 'clamp(140px,18vh,180px) clamp(28px,8vw,96px) 140px',
            minHeight: '100vh',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          {/* Eyebrow */}
          <motion.div
            style={{ display: 'inline-flex', alignItems: 'center', gap: 18, marginBottom: 30 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          >
            <span style={{ height: 1, width: 54, background: '#7a1c1c', flexShrink: 0, display: 'block' }} />
            <span style={{ fontFamily: '"Inter",sans-serif', fontWeight: 400, fontSize: 12, letterSpacing: '0.40em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.62)' }}>
              Contact · Start a Project
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            aria-label="Start with a better foundation."
            style={{
              fontFamily: '"Playfair Display",serif', fontWeight: 500,
              fontSize: 'clamp(48px,6.4vw,108px)', lineHeight: 1.02,
              letterSpacing: '-0.018em', color: '#f5f0e8',
              maxWidth: 920,
            }}
          >
            {HEADLINE.map(({ text, delay, em }, i) =>
              text === '\n' ? <br key={i} /> : (
                <motion.span
                  key={i}
                  className={em ? 'cch-em' : undefined}
                  style={{ display: 'inline-block' }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay, ease: 'easeOut' }}
                >
                  {text}
                </motion.span>
              )
            )}
          </h1>

          {/* Sub copy */}
          <motion.p
            style={{
              fontFamily: '"Inter",sans-serif', fontWeight: 300, fontSize: 18,
              lineHeight: 1.65, color: 'rgba(245,240,232,0.62)',
              maxWidth: 560, marginTop: 36,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.6, ease: 'easeOut' }}
          >
            A short, private brief. We read every one. If your project is a fit, we reply within forty-eight hours with a clear path forward — no decks, no discovery theatre.
          </motion.p>

          {/* CTAs */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 48, flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.85, ease: 'easeOut' }}
          >
            <a href="#brief" className="cch-cta">
              <span>Start a Brief</span>
              <span className="cch-arr" />
            </a>
            <a href="tel:+16236408884" className="cch-cta cch-cta-ghost">
              <span>Call (623) 640-8884</span>
            </a>
          </motion.div>

          {/* Reassurance row */}
          <motion.div
            style={{
              display: 'flex', alignItems: 'center', gap: 36,
              marginTop: 64, flexWrap: 'wrap', rowGap: 14,
              fontFamily: '"JetBrains Mono",monospace', fontSize: 11,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.32)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.1 }}
          >
            {[
              'Replies within 48 hours',
              'Since MMXIX',
              'Scottsdale · Phoenix',
            ].map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: i === 0 ? 0 : 36 }}>
                {i > 0 && <span className="cch-reassure-rule" style={{ height: 1, width: 42, background: 'rgba(245,240,232,0.12)', display: 'block' }} />}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span className="cch-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#7a1c1c', display: 'inline-block', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── FLOATING BOOKING CARD ── */}
        <motion.aside
          className="cch-frag"
          aria-hidden="true"
          style={{
            position: 'absolute', right: 96, top: '50%', transform: 'translateY(-50%)',
            zIndex: 6, width: 300, padding: '28px 26px',
            border: '1px solid rgba(245,240,232,0.12)',
            background: 'rgba(20,20,20,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.3 }}
        >
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '0.30em', textTransform: 'uppercase', color: '#7a1c1c', marginBottom: 14 }}>Now Accepting Briefs</div>
          <div style={{ fontFamily: '"Playfair Display",serif', fontWeight: 500, fontSize: 22, lineHeight: 1.3, color: '#f5f0e8' }}>A 15-minute introduction.</div>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8, fontFamily: '"Inter",sans-serif', fontSize: 13, fontWeight: 300, color: 'rgba(245,240,232,0.62)' }}>
            {[
              ['Format', 'Private call'],
              ['Duration', '15 min'],
              ['Reply within', '48 hours'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: 'rgba(245,240,232,0.32)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{k}</span>
                <span style={{ color: '#f5f0e8' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: 'rgba(245,240,232,0.12)', margin: '18px 0' }} />
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.32)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="cch-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#7a1c1c', boxShadow: '0 0 0 3px rgba(122,28,28,0.18)', display: 'inline-block', flexShrink: 0 }} />
            <span>Two slots open this week</span>
          </div>
        </motion.aside>

        {/* ── BOTTOM CHROME ── */}
        <div
          style={{
            position: 'absolute', left: 96, right: 96, bottom: 42, zIndex: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: '"Inter",sans-serif', fontWeight: 300, fontSize: 12,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.62)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="cch-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#7a1c1c', boxShadow: '0 0 0 4px rgba(122,28,28,0.18)', display: 'inline-block', flexShrink: 0 }} />
            <span>RAH Operations · Studio</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '0.18em', color: 'rgba(245,240,232,0.32)' }}>
            <span>Scroll for brief</span>
            <span style={{ width: 24, height: 1, background: 'rgba(245,240,232,0.32)', display: 'block' }} />
          </div>
        </div>
      </section>
    </>
  );
}
