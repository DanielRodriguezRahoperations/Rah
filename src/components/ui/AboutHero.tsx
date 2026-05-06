import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const KEYFRAMES = `
  @keyframes abh-fade { to { opacity: 1; transform: translateY(0); } }
  @keyframes abh-rule { to { transform: scaleX(1); } }
  @keyframes abh-sweep { 0%{transform:translateX(-30%)} 50%{transform:translateX(30%)} 100%{transform:translateX(-30%)} }
  @keyframes abh-rim { from{opacity:0.55;transform:translateX(2%)} to{opacity:1;transform:translateX(-2%)} }
  @keyframes abh-grain { 0%{transform:translate(0,0)} 50%{transform:translate(1%,-1%)} 100%{transform:translate(0,0)} }
  @keyframes abh-stackBreath { from{transform:translateY(-50%) scale(1.00) translateX(0)} to{transform:translateY(-50%) scale(1.025) translateX(-0.6%)} }
  @keyframes abh-pulse { 0%,100%{box-shadow:0 0 0 4px rgba(122,28,28,0.18)} 50%{box-shadow:0 0 0 8px rgba(122,28,28,0.05)} }

  .abh-word-em { font-style: italic; font-weight: 500; position: relative; }
  .abh-word-em::after {
    content: ""; position: absolute; left: 4%; right: 4%; bottom: -0.05em;
    height: 2px; background: #7a1c1c; display: block;
    transform: scaleX(0); transform-origin: left center;
    animation: abh-rule 1.1s 1.7s ease-out forwards;
  }

  .abh-pane {
    position: absolute;
    background: rgba(20,20,20,0.92);
    border: 1px solid rgba(245,240,232,0.12);
    box-shadow: 0 30px 80px -30px rgba(0,0,0,0.7), 0 1px 0 rgba(245,240,232,0.04) inset;
    transition: transform 1.2s cubic-bezier(.2,.7,.2,1), opacity .8s ease;
    will-change: transform;
  }
  .abh-pane-page  { transform: rotateY(-14deg) rotateX(2deg) translateZ(-80px); }
  .abh-pane-section { transform: rotateY(-16deg) rotateX(4deg) translateZ(60px); }
  .abh-pane-cta   { transform: rotateY(-10deg) rotateX(2deg) translateZ(160px); }
  .abh-pane-data  { transform: rotateY(-12deg) rotateX(6deg) translateZ(120px); }

  .abh-hero:hover .abh-pane-page    { transform: rotateY(-12deg) rotateX(2deg) translateZ(-60px); }
  .abh-hero:hover .abh-pane-section { transform: rotateY(-14deg) rotateX(4deg) translateZ(80px) translateX(-8px); }
  .abh-hero:hover .abh-pane-cta    { transform: rotateY(-8deg) rotateX(2deg) translateZ(180px) translateY(-6px); }
  .abh-hero:hover .abh-pane-data   { transform: rotateY(-10deg) rotateX(6deg) translateZ(140px) translateY(-4px); }

  .abh-grid-fine { transition: transform 1.2s cubic-bezier(.2,.7,.2,1); }
  .abh-hero:hover .abh-rim { opacity: 1; }
  .abh-hero:hover .abh-grid-fine { transform: scale(1.02); }

  .abh-cta-link { transition: background .3s ease, border-color .3s ease, color .3s ease; }
  .abh-cta-link:hover { background: #7a1c1c !important; border-color: #7a1c1c !important; color: #f5f0e8 !important; }
  .abh-cta-ghost:hover { background: transparent !important; border-color: rgba(245,240,232,0.62) !important; color: #f5f0e8 !important; }

  @media (max-width: 1200px) {
    .abh-rank  { display: none !important; }
    .abh-stack { width: 54% !important; right: 4% !important; }
  }
  @media (max-width: 980px) {
    .abh-stack   { opacity: 0.45 !important; }
    .abh-content { padding: 120px 64px !important; }
    .abh-chrome  { left: 64px !important; right: 64px !important; }
    .abh-rail-l  { left: 32px !important; }
    .abh-rail-r  { right: 32px !important; }
    .abh-stamp   { display: none !important; }
  }
  @media (max-width: 720px) {
    .abh-nav-links { display: none !important; }
    .abh-clock     { display: none !important; }
    .abh-stack     { display: none !important; }
    .abh-content   { padding: 140px 28px 120px !important; }
    .abh-chrome    { left: 28px !important; right: 28px !important; }
    .abh-rail-l, .abh-rail-r { display: none !important; }
    .abh-ctas-wrap { flex-direction: column !important; align-items: flex-start !important; }
    .abh-built-wrap { grid-template-columns: 1fr !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .abh-pane, .abh-grid-fine { animation: none !important; transition: none !important; }
    .abh-word-em::after { transform: scaleX(1) !important; animation: none !important; }
  }
`;

const DashedLine = () => (
  <span style={{ display: 'block', height: '1px', backgroundImage: 'linear-gradient(90deg, currentColor 50%, transparent 50%)', backgroundSize: '6px 1px', backgroundRepeat: 'repeat-x' }} />
);

export default function AboutHero() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Phoenix', hour: '2-digit', minute: '2-digit', hour12: false }));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const ink      = '#f5f0e8';
  const inkDim   = 'rgba(245,240,232,0.62)';
  const inkFaint = 'rgba(245,240,232,0.32)';
  const ruleSoft = 'rgba(229,229,229,0.06)';
  const rule     = 'rgba(245,240,232,0.12)';
  const burg     = '#7a1c1c';
  const mono     = "'JetBrains Mono', monospace";
  const serif    = "'Playfair Display', serif";
  const sans     = "'Inter', sans-serif";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <section className="abh-hero" style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#1a1a1a', overflow: 'hidden', color: ink, isolation: 'isolate' }}>

        {/* ── SCENE ── */}
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 0, overflow: 'hidden' }} aria-hidden="true">

          {/* Blueprint grid */}
          <div className="abh-grid-fine" style={{ position: 'absolute', inset: '-5%', pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(229,229,229,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(229,229,229,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 85%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 85%)' }} />

          {/* SERP rank column */}
          <div className="abh-rank" style={{ position: 'absolute', left: '6%', top: '14%', width: '18%', display: 'flex', flexDirection: 'column', gap: '14px', opacity: 0.55, pointerEvents: 'none' }}>
            <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.30em', color: inkFaint, textTransform: 'uppercase', marginBottom: '6px' }}>Search · Org. ranking</div>
            {/* #01 — you */}
            <div style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: '10px', alignItems: 'center', padding: '8px 10px', border: `1px solid rgba(122,28,28,0.55)`, background: 'rgba(122,28,28,0.06)', transform: 'translateX(-8px)' }}>
              <span style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.16em', color: burg, textAlign: 'center' }}>01</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ height: '3px', background: 'rgba(245,240,232,0.45)', borderRadius: '1px', width: '88%' }} />
                <div style={{ height: '3px', background: 'rgba(245,240,232,0.45)', borderRadius: '1px', width: '74%' }} />
              </div>
            </div>
            {/* 02–05 */}
            {[['02','88%','48%'],['03','74%','48%'],['04','74%','48%'],['05','48%','48%']].map(([pos,b1,b2]) => (
              <div key={pos} style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: '10px', alignItems: 'center', padding: '8px 10px', border: `1px solid ${ruleSoft}`, background: 'rgba(245,240,232,0.018)' }}>
                <span style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.16em', color: inkFaint, textAlign: 'center' }}>{pos}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ height: '3px', background: 'rgba(245,240,232,0.18)', borderRadius: '1px', width: b1 }} />
                  <div style={{ height: '3px', background: 'rgba(245,240,232,0.18)', borderRadius: '1px', width: b2 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Wireframe stack */}
          <div className="abh-stack" style={{ position: 'absolute', right: '8%', top: '50%', width: '48%', maxWidth: '780px', height: '78%', perspective: '1600px', perspectiveOrigin: '30% 50%', pointerEvents: 'none', animation: 'abh-stackBreath 22s ease-in-out infinite alternate both' }}>

            {/* Pane: full page wireframe (deepest) */}
            <div className="abh-pane abh-pane-page" style={{ left: 0, top: 0, width: '100%', height: '100%', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: '12px', alignItems: 'center', paddingBottom: '14px', borderBottom: `1px solid ${ruleSoft}` }}>
                <div style={{ height: '14px', background: 'linear-gradient(90deg, rgba(245,240,232,0.6), rgba(245,240,232,0.25))', borderRadius: '1px' }} />
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end' }}>
                  {[0,1,2,3].map(i => <span key={i} style={{ display: 'block', width: '36px', height: '6px', background: 'rgba(245,240,232,0.18)', borderRadius: '1px' }} />)}
                </div>
                <div style={{ height: '22px', width: '78px', border: `1px solid ${inkDim}`, borderRadius: '1px' }} />
              </div>
              <div style={{ marginTop: '6px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '24px', padding: '18px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ height: '14px', background: 'rgba(245,240,232,0.55)', borderRadius: '1px' }} />
                  <div style={{ height: '14px', width: '90%', background: 'rgba(245,240,232,0.45)', borderRadius: '1px' }} />
                  <div style={{ height: '14px', width: '62%', background: 'rgba(245,240,232,0.30)', borderRadius: '1px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {['96%','88%','54%'].map((w,i) => <div key={i} style={{ height: '5px', background: 'rgba(245,240,232,0.18)', borderRadius: '1px', width: w }} />)}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                    <div style={{ height: '24px', width: '90px', background: 'rgba(122,28,28,0.55)', border: '1px solid rgba(122,28,28,0.55)', borderRadius: '1px' }} />
                    <div style={{ height: '24px', width: '90px', border: `1px solid ${inkDim}`, borderRadius: '1px' }} />
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, rgba(245,240,232,0.04) 0%, rgba(245,240,232,0.01) 100%)', border: `1px solid ${ruleSoft}`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: '30%', background: 'rgba(245,240,232,0.08)', clipPath: 'polygon(10% 80%, 30% 50%, 50% 65%, 75% 30%, 90% 50%, 90% 80%)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', padding: '14px 0', borderTop: `1px solid ${ruleSoft}`, borderBottom: `1px solid ${ruleSoft}` }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ height: '80px', border: `1px solid ${ruleSoft}`, background: 'rgba(245,240,232,0.015)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '8px', gap: '5px' }}>
                    <div style={{ width: '14px', height: '14px', border: '1px solid rgba(245,240,232,0.35)', alignSelf: 'flex-start' }} />
                    <div style={{ height: '4px', background: 'rgba(245,240,232,0.30)', borderRadius: '1px' }} />
                    <div style={{ height: '4px', width: '60%', background: 'rgba(245,240,232,0.30)', borderRadius: '1px' }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingTop: '12px', borderTop: `1px solid ${ruleSoft}` }}>
                {[0,1].map(i => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ height: '4px', background: 'rgba(245,240,232,0.16)', borderRadius: '1px', width: '70%' }} />
                    <div style={{ height: '4px', background: 'rgba(245,240,232,0.16)', borderRadius: '1px', width: '48%' }} />
                    <div style={{ height: '4px', background: 'rgba(245,240,232,0.16)', borderRadius: '1px', width: '48%' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Pane: section card (mid) */}
            <div className="abh-pane abh-pane-section" style={{ left: '-8%', top: '38%', width: '62%', height: '34%', padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '14px', alignItems: 'center' }}>
              <span style={{ position: 'absolute', top: '8px', left: '14px', fontFamily: mono, fontSize: '9px', letterSpacing: '0.30em', color: inkFaint, textTransform: 'uppercase' }}>02 · Section / Trust</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '18px' }}>
                <div style={{ height: '9px', background: 'rgba(245,240,232,0.45)', borderRadius: '1px' }} />
                <div style={{ height: '9px', width: '80%', background: 'rgba(245,240,232,0.30)', borderRadius: '1px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '6px' }}>
                  <div style={{ height: '4px', background: 'rgba(245,240,232,0.18)', borderRadius: '1px' }} />
                  <div style={{ height: '4px', width: '78%', background: 'rgba(245,240,232,0.18)', borderRadius: '1px' }} />
                  <div style={{ height: '4px', width: '54%', background: 'rgba(245,240,232,0.18)', borderRadius: '1px' }} />
                </div>
                <div style={{ marginTop: '10px', height: '22px', width: '96px', border: `1px solid ${burg}`, background: 'rgba(122,28,28,0.18)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', fontFamily: mono, fontSize: '9px', letterSpacing: '0.20em', color: inkFaint, textTransform: 'uppercase' }}>
                <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '30px', lineHeight: 1, color: ink, letterSpacing: '-0.01em' }}>+218<em style={{ fontSize: '18px' }}>%</em></span>
                <span>Conv. uplift</span>
              </div>
            </div>

            {/* Pane: CTA block (top, sharpest) */}
            <div className="abh-pane abh-pane-cta" style={{ right: '-6%', top: '8%', width: '38%', height: '22%', padding: '14px 16px' }}>
              <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.30em', color: burg, textTransform: 'uppercase', marginBottom: '10px' }}>04 · CTA Block</div>
              <div style={{ fontFamily: serif, fontWeight: 500, fontSize: '18px', lineHeight: 1.1, color: ink }}>Begin a <em>brief.</em></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px' }}>
                <div style={{ height: '26px', width: '96px', background: burg, border: `1px solid ${burg}` }} />
                <div style={{ height: '4px', width: '60px', background: 'rgba(245,240,232,0.45)', borderRadius: '1px' }} />
              </div>
            </div>

            {/* Pane: data block (bottom-right) */}
            <div className="abh-pane abh-pane-data" style={{ right: '-2%', bottom: '6%', width: '30%', height: '18%', padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              {[{ k:'Sessions', v:'12.4k', b:false },{ k:'CR', v:'3.8%', b:true },{ k:'Leads', v:'+218', b:false }].map(c => (
                <div key={c.k} style={{ display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'flex-end' }}>
                  <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.22em', color: inkFaint, textTransform: 'uppercase' }}>{c.k}</span>
                  <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '24px', lineHeight: 1, color: c.b ? burg : ink, letterSpacing: '-0.01em' }}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing guides */}
          <div style={{ position: 'absolute', right: '18%', top: '20%', width: '140px', color: inkFaint, pointerEvents: 'none', fontFamily: mono, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            <span>Hero · 720px</span><DashedLine />
          </div>
          <div style={{ position: 'absolute', right: '6%', top: '46%', width: '110px', textAlign: 'right', color: inkFaint, pointerEvents: 'none', fontFamily: mono, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            <DashedLine /><span>Section · auto</span>
          </div>
          <div style={{ position: 'absolute', right: '24%', bottom: '18%', width: '120px', color: inkFaint, pointerEvents: 'none', fontFamily: mono, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            <span>CTA · 96 / 26</span><DashedLine />
          </div>

          {/* Rail stamp */}
          <div className="abh-stamp" style={{ position: 'absolute', right: '74px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'right center', fontFamily: mono, fontSize: '10px', letterSpacing: '0.30em', color: inkFaint, textTransform: 'uppercase', whiteSpace: 'nowrap', zIndex: 5 }}>SYS · BUILD N° 02 · ASSEMBLY · MMXIX</div>

          {/* Light sweep */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', bottom: '-20%', left: '-10%', pointerEvents: 'none', background: 'linear-gradient(105deg, transparent 30%, rgba(245,240,232,0.04) 48%, rgba(245,240,232,0.07) 50%, rgba(245,240,232,0.04) 52%, transparent 70%)', animation: 'abh-sweep 14s ease-in-out infinite' }} />

          {/* Burgundy rim */}
          <div className="abh-rim" style={{ position: 'absolute', right: '-12%', top: 0, bottom: 0, width: '48%', pointerEvents: 'none', background: 'radial-gradient(ellipse at right center, rgba(122,28,28,0.16) 0%, rgba(122,28,28,0) 60%)', animation: 'abh-rim 13s ease-in-out infinite alternate' }} />

          {/* Vignette */}
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)', zIndex: 4 }} />

          {/* Grain */}
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.07, zIndex: 5, backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.85'/></svg>")`, animation: 'abh-grain 1.4s steps(6) infinite' }} />
        </div>

        {/* Edge rails */}
        <div className="abh-rail-l" style={{ position: 'absolute', top: 0, bottom: 0, left: '48px', width: '1px', background: rule, zIndex: 7 }} aria-hidden="true" />
        <div className="abh-rail-r" style={{ position: 'absolute', top: 0, bottom: 0, right: '48px', width: '1px', background: rule, zIndex: 7 }} aria-hidden="true" />

        {/* Top chrome */}
        <div className="abh-chrome" style={{ position: 'absolute', left: '96px', right: '96px', top: '42px', zIndex: 9, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: serif, fontWeight: 600, fontSize: '18px', letterSpacing: '0.06em', color: ink }}>RAH<span style={{ color: burg }}>.</span></div>
          <nav className="abh-nav-links" style={{ display: 'flex', gap: '34px' }}>
            {[{ l:'Work', to:'/portfolio' },{ l:'About', to:'/about', active:true },{ l:'Services', to:'/services' },{ l:'Notes', to:'/blog' },{ l:'Contact', to:'/contact' }].map(link => (
              <Link key={link.l} to={link.to} style={{ color: link.active ? ink : inkDim, textDecoration: 'none', fontFamily: sans, fontWeight: 300, fontSize: '12px', letterSpacing: '0.32em', textTransform: 'uppercase' }}>{link.l}</Link>
            ))}
          </nav>
          <div className="abh-clock" style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.18em', color: inkDim }}>Est. MMXIX · {time || 'Scottsdale'}</div>
        </div>

        {/* ── CONTENT ── */}
        <div className="abh-content" style={{ position: 'relative', zIndex: 8, maxWidth: '1080px', padding: '0 96px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '140px', paddingBottom: '140px' }}>

          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '18px', fontFamily: sans, fontWeight: 400, fontSize: '12px', letterSpacing: '0.40em', textTransform: 'uppercase', color: inkDim, opacity: 0, transform: 'translateY(8px)', animation: 'abh-fade .9s .25s ease-out forwards' }}>
            <span style={{ height: '1px', width: '54px', background: burg, display: 'block', flexShrink: 0 }} />
            <span>About RAH Operations</span>
            <span style={{ marginLeft: '18px', fontFamily: mono, fontSize: '10px', letterSpacing: '0.24em', color: inkFaint }}>N° 02 · Studio</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(54px, 5.6vw, 100px)', lineHeight: 1.02, letterSpacing: '-0.018em', color: ink, marginTop: '34px', maxWidth: '720px', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}>
            {[{ w:'We ', d:'.55s' },{ w:'build ', d:'.70s' }].map(({ w, d }) => (
              <span key={w} style={{ display: 'inline-block', opacity: 0, transform: 'translateY(14px)', animation: `abh-fade .9s ${d} ease-out forwards` }}>{w}</span>
            ))}
            <span className="abh-word-em" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(14px)', animation: 'abh-fade .9s .85s ease-out forwards' }}>websites</span>
            <br />
            {[{ w:'that ', d:'1.00s' },{ w:'work.', d:'1.15s' }].map(({ w, d }) => (
              <span key={w} style={{ display: 'inline-block', opacity: 0, transform: 'translateY(14px)', animation: `abh-fade .9s ${d} ease-out forwards` }}>{w}</span>
            ))}
          </h1>

          {/* Sub */}
          <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '18px', lineHeight: 1.7, color: inkDim, maxWidth: '520px', marginTop: '36px', opacity: 0, transform: 'translateY(8px)', animation: 'abh-fade .9s 1.7s ease-out forwards', textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}>
            RAH Operations was built on a simple belief: <strong style={{ color: ink, fontWeight: 500 }}>your website should be a business asset, not a liability.</strong> A system that generates visibility, builds trust, and produces qualified leads.
          </p>

          {/* CTAs */}
          <div className="abh-ctas-wrap" style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '48px', opacity: 0, transform: 'translateY(8px)', animation: 'abh-fade .9s 2.0s ease-out forwards' }}>
            <Link to="/portfolio" className="abh-cta-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', padding: '18px 26px', fontFamily: sans, fontSize: '11px', letterSpacing: '0.30em', textTransform: 'uppercase', fontWeight: 500, color: ink, textDecoration: 'none', border: `1px solid ${inkDim}`, backdropFilter: 'blur(2px)' }}>
              <span>See Our Work</span>
              <span style={{ width: '22px', height: '1px', background: 'currentColor', position: 'relative', display: 'inline-block', flexShrink: 0 }}>
                <span style={{ position: 'absolute', right: 0, top: '-3px', width: '8px', height: '8px', borderTop: '1px solid currentColor', borderRight: '1px solid currentColor', transform: 'rotate(45deg)', display: 'block' }} />
              </span>
            </Link>
            <Link to="/contact" className="abh-cta-link abh-cta-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', padding: '18px 26px', fontFamily: sans, fontSize: '11px', letterSpacing: '0.30em', textTransform: 'uppercase', fontWeight: 500, color: inkDim, textDecoration: 'none', border: `1px solid ${rule}` }}>
              <span>Start a Project</span>
            </Link>
          </div>

          {/* Built Around */}
          <div className="abh-built-wrap" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '34px', alignItems: 'flex-start', maxWidth: '520px', opacity: 0, animation: 'abh-fade 1.2s 2.2s ease-out forwards' }}>
            <div style={{ fontFamily: sans, fontWeight: 500, fontSize: '11px', letterSpacing: '0.36em', textTransform: 'uppercase', color: burg, writingMode: 'vertical-rl', transform: 'rotate(180deg)', padding: '4px 0 4px 14px', borderLeft: `1px solid ${burg}` }}>Built around</div>
            <div>
              {[{ n:'01', t:'Visibility' },{ n:'02', t:'Trust' },{ n:'03', t:'Qualified Leads' }].map((row, i) => (
                <div key={row.n} style={{ display: 'grid', gridTemplateColumns: '42px 1fr', alignItems: 'baseline', gap: '18px', padding: '14px 0', borderTop: `1px solid ${rule}`, ...(i === 2 ? { borderBottom: `1px solid ${rule}` } : {}) }}>
                  <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.18em', color: inkFaint }}>{row.n}</span>
                  <span style={{ fontFamily: serif, fontWeight: 500, fontSize: '20px', letterSpacing: '-0.005em', color: ink }}>{row.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom chrome */}
        <div className="abh-chrome" style={{ position: 'absolute', left: '96px', right: '96px', bottom: '42px', zIndex: 9, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: burg, animation: 'abh-pulse 2.4s ease-in-out infinite', display: 'block', flexShrink: 0 }} />
            <span style={{ fontFamily: sans, fontWeight: 300, fontSize: '12px', letterSpacing: '0.32em', textTransform: 'uppercase', color: inkDim }}>Founder-led · Scottsdale Studio</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: mono, fontSize: '11px', letterSpacing: '0.18em', color: inkFaint }}>
            <span>Scroll · Our Approach</span>
            <span style={{ width: '24px', height: '1px', background: inkFaint, display: 'block' }} />
          </div>
        </div>
      </section>
    </>
  );
}
