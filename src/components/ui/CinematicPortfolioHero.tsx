import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HEADLINE_WORDS = [
  { text: 'Work ', delay: 0.55, em: false },
  { text: 'that ', delay: 0.70, em: false },
  { text: 'speaks', delay: 0.85, em: true },
  { text: ' before ', delay: 1.00, em: false },
  { text: 'you ', delay: 1.15, em: false },
  { text: 'do.', delay: 1.30, em: false },
];

const KEYFRAMES = `
  @keyframes cph-drift {
    0%   { transform: translate3d(0,0,0) scale(1.02); }
    100% { transform: translate3d(-1.2%,0.6%,0) scale(1.05); }
  }
  @keyframes cph-rim {
    0%   { opacity: 0.42; }
    100% { opacity: 0.62; }
  }
  @keyframes cph-streak {
    0%,15% { transform: translateX(-30%) rotate(8deg); opacity: 0; }
    25%    { opacity: 1; }
    55%    { transform: translateX(220%) rotate(8deg); opacity: 0; }
    100%   { transform: translateX(220%) rotate(8deg); opacity: 0; }
  }
  @keyframes cph-float {
    0%   { transform: translateY(0) translateX(0); }
    100% { transform: translateY(-14px) translateX(6px); }
  }
  @keyframes cph-grain {
    0%   { transform: translate(0,0); }
    25%  { transform: translate(-2%,1%); }
    50%  { transform: translate(1%,-2%); }
    75%  { transform: translate(-1%,2%); }
    100% { transform: translate(2%,-1%); }
  }
  @keyframes cph-pulse {
    0%,100% { opacity: 0.45; transform: scale(0.9); }
    50%     { opacity: 1; transform: scale(1.15); }
  }
  @keyframes cph-scroll {
    0%   { transform: scaleY(0.2); opacity: 0.2; }
    50%  { transform: scaleY(1); opacity: 1; }
    100% { transform: scaleY(0.2); opacity: 0.2; }
  }
  .cph-desk   { animation: cph-drift 22s ease-in-out infinite alternate; }
  .cph-rim    { animation: cph-rim 9s ease-in-out infinite alternate; mix-blend-mode: screen; }
  .cph-streak { animation: cph-streak 14s ease-in-out infinite; mix-blend-mode: screen; }
  .cph-f1 { animation: cph-float 18s ease-in-out infinite alternate; animation-delay: -3s; }
  .cph-f2 { animation: cph-float 18s ease-in-out infinite alternate; animation-delay: -9s; }
  .cph-f3 { animation: cph-float 18s ease-in-out infinite alternate; animation-delay: -6s; }
  .cph-grain  { animation: cph-grain 1.2s steps(4) infinite; mix-blend-mode: overlay; }
  .cph-dot    { animation: cph-pulse 2.4s ease-in-out infinite; }
  .cph-sline  { animation: cph-scroll 2.4s ease-in-out infinite; transform-origin: top; }
  .cph-em::after {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 0.6ch;
    height: 0.06em;
    background: #7a1c1c;
    margin: 0 0.18ch 0.18em 0.18ch;
    box-shadow: 0 0 10px rgba(170,40,40,0.55);
  }
  .cph-cta {
    position: relative;
    border: 1px solid rgba(245,240,232,0.14);
    transition: border-color 0.4s ease;
  }
  .cph-cta::before {
    content: "";
    position: absolute;
    left: 0; top: 50%;
    width: 0; height: 1px;
    background: #7a1c1c;
    box-shadow: 0 0 6px rgba(170,40,40,0.55);
    transition: width 0.5s cubic-bezier(0.2,0.7,0.2,1);
  }
  .cph-cta:hover { border-color: rgba(245,240,232,0.32); }
  .cph-cta:hover::before { width: 100%; }
  .cph-ghost {
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.62);
    font-weight: 300;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 4px;
    transition: color 0.3s ease, border-color 0.3s ease;
  }
  .cph-ghost:hover { color: #f5f0e8; border-color: rgba(245,240,232,0.14); }
  @media (prefers-reduced-motion: reduce) {
    .cph-desk,.cph-rim,.cph-streak,.cph-f1,.cph-f2,.cph-f3,.cph-grain,.cph-dot,.cph-sline { animation: none !important; }
  }
  @media (max-width: 900px) {
    .cph-rail { display: none !important; }
    .cph-numeral { display: none !important; }
    .cph-f3 { display: none !important; }
    .cph-content-inner { margin-left: 0 !important; transform: none !important; padding-top: 90px; }
    .cph-footer { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; padding: 20px 24px 22px !important; }
    .cph-shell { padding: 0 24px !important; }
  }
`;

function UiFrag({ cls, style }: { cls: string; style: React.CSSProperties }) {
  return (
    <div
      className={cls}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        border: '1px solid rgba(245,240,232,0.06)',
        background: 'rgba(245,240,232,0.015)',
        backdropFilter: 'blur(2px)',
        zIndex: 2,
        ...style,
      }}
      aria-hidden="true"
    >
      <span style={{ position: 'absolute', left: 14, top: 14, height: 4, width: '28%', borderRadius: 2, background: 'rgba(245,240,232,0.10)', display: 'block' }} />
      <span style={{ position: 'absolute', left: 14, top: 24, height: 4, width: '46%', borderRadius: 2, background: 'rgba(245,240,232,0.10)', display: 'block' }} />
      <span style={{ position: 'absolute', left: 14, bottom: 14, height: 3, width: '60%', background: 'rgba(122,28,28,0.45)', display: 'block' }} />
    </div>
  );
}

export default function CinematicPortfolioHero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <section
        style={{ position: 'relative', width: '100vw', height: '100vh', minHeight: 780, overflow: 'hidden', isolation: 'isolate', background: '#0e0e0e' }}
      >
        {/* ── CINEMATIC BG ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: `
              radial-gradient(ellipse 60% 45% at 72% 38%, rgba(40,32,28,0.9), rgba(14,14,14,0) 70%),
              radial-gradient(ellipse 80% 55% at 18% 80%, rgba(24,20,18,0.85), rgba(14,14,14,0) 65%),
              linear-gradient(180deg,#0a0a0a 0%,#131211 50%,#080808 100%)
            `,
            filter: 'saturate(0.7)',
          }}
        />

        {/* ── MACBOOK SVG ── */}
        <svg
          className="cph-desk"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, zIndex: 1, width: '100%', height: '100%', opacity: 0.85 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="cph-sg" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#221c19" stopOpacity="1"/>
              <stop offset="60%" stopColor="#141211" stopOpacity="1"/>
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/>
            </radialGradient>
            <linearGradient id="cph-dg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e0d0c"/>
              <stop offset="100%" stopColor="#040404"/>
            </linearGradient>
            <linearGradient id="cph-rf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(245,240,232,0.08)"/>
              <stop offset="100%" stopColor="rgba(245,240,232,0)"/>
            </linearGradient>
            <filter id="cph-sf"><feGaussianBlur stdDeviation="0.6"/></filter>
          </defs>
          <rect width="1600" height="900" fill="url(#cph-sg)"/>
          <rect x="0" y="600" width="1600" height="300" fill="url(#cph-dg)"/>
          <g transform="translate(820,320)" filter="url(#cph-sf)">
            <rect x="0" y="0" width="560" height="340" rx="10" fill="#0a0a0a" stroke="rgba(245,240,232,0.06)"/>
            <rect x="20" y="22" width="520" height="22" fill="rgba(245,240,232,0.05)"/>
            <rect x="20" y="60" width="280" height="58" fill="rgba(245,240,232,0.07)"/>
            <rect x="20" y="128" width="200" height="10" fill="rgba(245,240,232,0.05)"/>
            <rect x="20" y="146" width="240" height="10" fill="rgba(245,240,232,0.04)"/>
            <rect x="20" y="180" width="120" height="32" fill="rgba(122,28,28,0.55)"/>
            <rect x="320" y="60" width="220" height="240" fill="rgba(245,240,232,0.03)" stroke="rgba(245,240,232,0.06)"/>
            <g opacity="0.55">
              <rect x="340" y="240" width="14" height="40" fill="rgba(245,240,232,0.18)"/>
              <rect x="362" y="220" width="14" height="60" fill="rgba(245,240,232,0.22)"/>
              <rect x="384" y="200" width="14" height="80" fill="rgba(245,240,232,0.28)"/>
              <rect x="406" y="170" width="14" height="110" fill="rgba(170,40,40,0.6)"/>
              <rect x="428" y="210" width="14" height="70" fill="rgba(245,240,232,0.22)"/>
              <rect x="450" y="190" width="14" height="90" fill="rgba(245,240,232,0.26)"/>
              <rect x="472" y="220" width="14" height="60" fill="rgba(245,240,232,0.22)"/>
              <rect x="494" y="250" width="14" height="30" fill="rgba(245,240,232,0.18)"/>
            </g>
            <path d="M-30 348 L590 348 L560 364 L0 364 Z" fill="#0c0b0a" stroke="rgba(245,240,232,0.05)"/>
            <g transform="translate(0,368) scale(1,-0.45)" opacity="0.35" filter="url(#cph-sf)">
              <rect x="0" y="0" width="560" height="340" rx="10" fill="url(#cph-rf)"/>
            </g>
          </g>
          <ellipse cx="1300" cy="300" rx="280" ry="160" fill="rgba(170,40,40,0.10)"/>
          <ellipse cx="240" cy="700" rx="340" ry="80" fill="rgba(245,240,232,0.025)"/>
        </svg>

        {/* ── FLOATING UI FRAGMENTS ── */}
        <UiFrag cls="cph-f1" style={{ top: '18%', left: '6%', width: 220, height: 130 }} />
        <UiFrag cls="cph-f2" style={{ top: '62%', left: '11%', width: 160, height: 96, opacity: 0.7 }} />
        <UiFrag cls="cph-f3" style={{ top: '24%', right: '8%', width: 280, height: 170, opacity: 0.55 }} />

        {/* ── LIGHT STREAK ── */}
        <div
          className="cph-streak"
          aria-hidden="true"
          style={{
            position: 'absolute', top: '-10%', left: '-30%',
            width: '60%', height: '140%', zIndex: 3, pointerEvents: 'none',
            background: `linear-gradient(100deg,
              rgba(255,255,255,0) 40%,
              rgba(245,240,232,0.05) 49%,
              rgba(245,240,232,0.10) 50%,
              rgba(245,240,232,0.05) 51%,
              rgba(255,255,255,0) 60%)`,
          }}
        />

        {/* ── BURGUNDY RIM ── */}
        <div
          className="cph-rim"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: 0.55,
            background: `
              radial-gradient(ellipse 30% 70% at 100% 50%, rgba(170,40,40,0.55) 0%, rgba(122,28,28,0) 60%),
              radial-gradient(ellipse 12% 80% at 0% 60%, rgba(122,28,28,0.18) 0%, rgba(122,28,28,0) 55%)
            `,
          }}
        />

        {/* ── VIGNETTE ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* ── FILM GRAIN ── */}
        <div
          className="cph-grain"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: '-50%', zIndex: 5, pointerEvents: 'none', opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          }}
        />

        {/* ── DECORATIVE NUMERAL ── */}
        <motion.div
          className="cph-numeral"
          aria-hidden="true"
          style={{
            position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)',
            zIndex: 11, pointerEvents: 'none',
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(160px, 22vw, 360px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(245,240,232,0.10)',
            lineHeight: 1, letterSpacing: '-0.04em',
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.6 }}
        >
          N°1
        </motion.div>

        {/* ── SIDE RAILS ── */}
        <div
          className="cph-rail"
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: 22, transform: 'translateY(-50%)',
            writingMode: 'vertical-rl', zIndex: 14,
            fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.32)', fontWeight: 300,
          }}
        >
          RAH / Operations — Est. MMXIX
        </div>
        <div
          className="cph-rail"
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', right: 22, transform: 'translateY(-50%)',
            writingMode: 'vertical-rl', zIndex: 14,
            fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.62)', fontWeight: 300,
          }}
        >
          Reel 01 — Selected Works
        </div>

        {/* ── MAIN CONTENT ── */}
        <div
          className="cph-shell"
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', alignItems: 'center',
            padding: '0 56px',
          }}
        >
          <div
            className="cph-content-inner"
            style={{ maxWidth: 920, marginLeft: '8%', transform: 'translateY(-2vh)' }}
          >
            {/* eyebrow */}
            <motion.div
              style={{
                display: 'flex', alignItems: 'center', gap: 18,
                marginBottom: 42,
                fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.62)', fontWeight: 300,
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.3 }}
            >
              <span style={{ width: 48, height: 1, background: '#7a1c1c', opacity: 0.85, boxShadow: '0 0 8px rgba(170,40,40,0.55)', flexShrink: 0, display: 'block' }} />
              <span>A Digital Operations Studio</span>
              <span style={{ color: 'rgba(245,240,232,0.32)' }}>— 001 / Portfolio</span>
            </motion.div>

            {/* headline */}
            <h1
              aria-label="Work that speaks before you do."
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 400,
                fontSize: 'clamp(48px, 7.2vw, 112px)',
                lineHeight: 1.02,
                letterSpacing: '-0.012em',
                color: '#f5f0e8',
              }}
            >
              {HEADLINE_WORDS.map(({ text, delay, em }, i) => (
                <motion.span
                  key={i}
                  className={em ? 'cph-em' : undefined}
                  style={{ display: 'inline-block', fontStyle: em ? 'italic' : 'normal' }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  {text}
                </motion.span>
              ))}
            </h1>

            {/* sub copy */}
            <motion.p
              style={{
                marginTop: 38, maxWidth: 480,
                fontSize: 15, lineHeight: 1.7, fontWeight: 300,
                color: 'rgba(245,240,232,0.62)',
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 1.6 }}
            >
              These are not portfolio pieces. They are business systems — built to rank, convert, and generate qualified leads for businesses that compete seriously online.
            </motion.p>

            {/* CTAs */}
            <motion.div
              style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 36 }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 1.9 }}
            >
              <a
                href="#work"
                className="cph-cta"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                  padding: '18px 28px',
                  fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: '#f5f0e8', fontWeight: 400, textDecoration: 'none',
                  background: 'transparent',
                }}
              >
                <span>View the Work</span>
                <span style={{ display: 'inline-block', width: 18, height: 1, background: 'currentColor', position: 'relative' }}>
                  <span style={{ position: 'absolute', right: 0, top: -3, width: 7, height: 7, borderTop: '1px solid currentColor', borderRight: '1px solid currentColor', transform: 'rotate(45deg)', display: 'block' }} />
                </span>
              </a>
              <Link to="/contact" className="cph-ghost">
                Begin a Brief →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── FOOTER STRIP ── */}
        <div
          className="cph-footer"
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 15,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            padding: '28px 56px 30px',
            fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.32)', fontWeight: 300,
            borderTop: '1px solid rgba(245,240,232,0.14)',
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)',
          }}
        >
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'rgba(245,240,232,0.62)' }}>
              <span className="cph-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#7a1c1c', boxShadow: '0 0 10px rgba(170,40,40,0.55)', display: 'inline-block', flexShrink: 0 }} />
              <span>Now booking — Q3 / 2026</span>
            </div>
            <span>Selective engagements</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <span>Scroll</span>
            <span className="cph-sline" style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(245,240,232,0.32), transparent)', display: 'block' }} />
          </div>

          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            <span>SEO · Brand · Web</span>
            <span>© RAH MMXXVI</span>
          </div>
        </div>
      </section>
    </>
  );
}
