import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── keyframes + scoped classes ─────────────────────────────────────────────
const KF = `
  @keyframes pph-rimBreathe { 0%{opacity:.55} 100%{opacity:.78} }
  @keyframes pph-grain {
    0%{transform:translate(0,0)} 25%{transform:translate(-2%,1%)}
    50%{transform:translate(1%,-2%)} 75%{transform:translate(-1%,2%)} 100%{transform:translate(2%,-1%)}
  }
  @keyframes pph-pane1 {
    from { opacity:0; transform:translateY(40px) rotateY(-7deg) rotateX(2deg); }
    to   { opacity:1; transform:translateY(0)   rotateY(-7deg) rotateX(2deg); }
  }
  @keyframes pph-pane2 {
    from { opacity:0; transform:translateY(40px) rotateY(-5deg); }
    to   { opacity:1; transform:translateY(0)   rotateY(-5deg); }
  }
  @keyframes pph-pane3 {
    from { opacity:0; transform:translateY(40px) rotateY(-9deg); }
    to   { opacity:1; transform:translateY(0)   rotateY(-9deg); }
  }
  @keyframes pph-stackDrift {
    0%   { transform:translate3d(0,0,0); }
    100% { transform:translate3d(-0.8%,0.5%,0); }
  }
  @keyframes pph-sweep {
    0%,20% { transform:translateX(-30%) rotate(8deg); opacity:0; }
    35%    { opacity:1; }
    65%    { transform:translateX(360%) rotate(8deg); opacity:0; }
    100%   { transform:translateX(360%) rotate(8deg); opacity:0; }
  }
  @keyframes pph-bar {
    0%   { transform:scaleY(0.92); }
    100% { transform:scaleY(1.0); }
  }
  @keyframes pph-pulse {
    0%,100% { opacity:.45; transform:scale(.9); }
    50%     { opacity:1;   transform:scale(1.15); }
  }
  @keyframes pph-underline {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }

  .pph-rim   { animation:pph-rimBreathe 11s ease-in-out infinite alternate; mix-blend-mode:screen; }
  .pph-grain { animation:pph-grain 1.4s steps(4) infinite; mix-blend-mode:overlay; }
  .pph-stack { animation:pph-stackDrift 18s ease-in-out infinite alternate; perspective:1600px; }
  .pph-p1    { animation:pph-pane1 1.4s cubic-bezier(.2,.7,.2,1) .4s both; }
  .pph-p2    { animation:pph-pane2 1.4s cubic-bezier(.2,.7,.2,1) .65s both; }
  .pph-p3    { animation:pph-pane3 1.4s cubic-bezier(.2,.7,.2,1) .9s both; }
  .pph-sweep::before {
    content:"";
    position:absolute;
    top:-20%;left:-30%;width:40%;height:140%;
    background:linear-gradient(100deg,
      rgba(255,255,255,0) 30%,
      rgba(170,40,40,.06) 48%,
      rgba(170,40,40,.18) 50%,
      rgba(170,40,40,.06) 52%,
      rgba(255,255,255,0) 70%);
    transform:translateX(-30%) rotate(8deg);
    animation:pph-sweep 18s ease-in-out infinite;
    mix-blend-mode:screen;
  }
  .pph-em::before {
    content:"";
    position:absolute;
    left:-0.06em;right:-0.04em;bottom:0.06em;
    height:1px;
    background:#7a1c1c;
    box-shadow:0 0 8px rgba(170,40,40,.55);
    transform-origin:left;
    transform:scaleX(0);
    animation:pph-underline 1.4s cubic-bezier(.2,.7,.2,1) 1.6s forwards;
  }
  .pph-dot-pulse { animation:pph-pulse 2.4s ease-in-out infinite; }
  .pph-bar-anim  { animation:pph-bar 6s ease-in-out infinite alternate; transform-origin:bottom; }

  .pph-cta {
    position:relative;
    border:1px solid rgba(229,229,229,.22);
    overflow:hidden;
    transition:border-color .4s ease;
  }
  .pph-cta::before {
    content:"";position:absolute;left:0;bottom:0;width:0;height:1px;
    background:#7a1c1c;box-shadow:0 0 6px rgba(170,40,40,.55);
    transition:width .55s cubic-bezier(.2,.7,.2,1);
  }
  .pph-cta:hover { border-color:rgba(245,240,232,.62); }
  .pph-cta:hover::before { width:100%; }

  .pph-ghost {
    font-size:11px;letter-spacing:.28em;text-transform:uppercase;
    color:rgba(245,240,232,.62);font-weight:300;text-decoration:none;
    border-bottom:1px solid transparent;padding-bottom:4px;
    transition:color .3s ease,border-color .3s ease;
  }
  .pph-ghost:hover { color:#f5f0e8;border-color:rgba(229,229,229,.22); }

  @media (prefers-reduced-motion:reduce) {
    .pph-rim,.pph-grain,.pph-stack,.pph-sweep::before,.pph-p1,.pph-p2,.pph-p3,
    .pph-dot-pulse,.pph-bar-anim,.pph-em::before { animation:none !important; }
  }
  @media (max-width:1100px) {
    .pph-stamp  { display:none !important; }
    .pph-stage  { grid-template-columns:1fr !important; padding:120px 32px 100px !important; }
    .pph-right  { min-height:360px !important; }
    .pph-footer { flex-direction:column !important; gap:10px !important; align-items:flex-start !important; padding:16px 28px !important; }
  }
`;

// ─── reusable chrome bar for panes ──────────────────────────────────────────
function PaneChrome({ url }: { url: string }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:6,
      height:28, padding:'0 12px',
      background:'rgba(245,240,232,0.025)',
      borderBottom:'1px solid rgba(229,229,229,0.10)',
      flexShrink:0,
    }}>
      {[0,1,2].map(i => (
        <span key={i} style={{ width:7, height:7, borderRadius:'50%', background:'rgba(245,240,232,0.18)', display:'block' }} />
      ))}
      <span style={{
        marginLeft:14, height:14, flex:'0 0 54%',
        background:'rgba(245,240,232,0.04)', borderRadius:2,
        display:'flex', alignItems:'center', padding:'0 8px',
        fontFamily:'"JetBrains Mono",ui-monospace,monospace',
        fontSize:9, color:'rgba(245,240,232,0.32)', letterSpacing:'0.08em',
        overflow:'hidden', whiteSpace:'nowrap',
      }}>
        {url}
      </span>
    </div>
  );
}

// ─── tick marks ─────────────────────────────────────────────────────────────
function Ticks() {
  const n = 13;
  return (
    <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none' }}>
      {(['top','bottom'] as const).map(pos => (
        <div key={pos} style={{
          position:'absolute', left:0, right:0,
          [pos === 'top' ? 'top' : 'bottom']:14,
          display:'flex', justifyContent:'space-between', padding:'0 56px',
        }}>
          {Array.from({length:n}).map((_,i) => (
            <span key={i} style={{ width:1, height:8, background:'rgba(245,240,232,0.18)', display:'block' }} />
          ))}
        </div>
      ))}
      {(['left','right'] as const).map(side => (
        <div key={side} style={{
          position:'absolute', top:0, bottom:0, [side]:14,
          display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'56px 0',
        }}>
          {Array.from({length:7}).map((_,i) => (
            <span key={i} style={{ width:8, height:1, background:'rgba(245,240,232,0.18)', display:'block' }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── fade-up variant ────────────────────────────────────────────────────────
const fadeUp = (delay: number) => ({
  initial:{ opacity:0, y:20 },
  animate:{ opacity:1, y:0 },
  transition:{ duration:1.2, delay, ease:[0.2,0.7,0.2,1] as const },
});

// ─── main component ─────────────────────────────────────────────────────────
export default function CinematicPortfolioHero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KF }} />

      <section style={{
        position:'relative', width:'100vw', height:'100vh', minHeight:780,
        overflow:'hidden', isolation:'isolate',
        background:`
          radial-gradient(ellipse 70% 50% at 78% 42%, rgba(38,30,28,0.7), rgba(26,26,26,0) 70%),
          radial-gradient(ellipse 60% 60% at 8% 90%, rgba(20,18,16,0.85), rgba(26,26,26,0) 60%),
          linear-gradient(180deg,#161514 0%,#1a1a1a 50%,#0e0d0c 100%)
        `,
      }}>
        {/* ── editorial frame ticks ── */}
        <Ticks />

        {/* ── rim light (top-left) ── */}
        <div className="pph-rim" aria-hidden="true" style={{
          position:'absolute', inset:0, zIndex:3, pointerEvents:'none', opacity:.7,
          background:`
            radial-gradient(ellipse 28% 60% at 0% 30%, rgba(122,28,28,0.32) 0%, rgba(122,28,28,0) 60%),
            radial-gradient(ellipse 22% 50% at 95% 95%, rgba(122,28,28,0.18) 0%, rgba(122,28,28,0) 60%)
          `,
        }} />

        {/* ── vignette ── */}
        <div aria-hidden="true" style={{
          position:'absolute', inset:0, zIndex:6, pointerEvents:'none',
          background:'radial-gradient(ellipse 95% 75% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.85) 100%)',
        }} />

        {/* ── film grain ── */}
        <div className="pph-grain" aria-hidden="true" style={{
          position:'absolute', inset:'-50%', zIndex:7, pointerEvents:'none', opacity:.05,
          backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }} />

        {/* ── coordinate stamp (right rail) ── */}
        <div className="pph-stamp" aria-hidden="true" style={{
          position:'absolute', right:64, top:'50%', transform:'translateY(-50%)',
          zIndex:14, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:14,
          fontFamily:'"JetBrains Mono",ui-monospace,monospace',
          fontSize:9, letterSpacing:'0.18em', color:'rgba(245,240,232,0.32)',
          pointerEvents:'none',
        }}>
          <div style={{ display:'flex', flexDirection:'column', gap:3, textAlign:'right' }}>
            <span>40.7128° N</span><span>74.0060° W</span>
          </div>
          <span style={{ width:24, height:1, background:'rgba(229,229,229,0.22)', display:'block' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:3, textAlign:'right' }}>
            <span style={{ color:'rgba(245,240,232,0.62)' }}>REEL — 02</span>
            <span>SELECTED · 24</span>
          </div>
          <span style={{ width:24, height:1, background:'rgba(229,229,229,0.22)', display:'block' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:3, textAlign:'right' }}>
            <span>F · 2.8</span><span>1/24 · 35MM</span>
          </div>
        </div>

        {/* ═══════════════ STAGE ═══════════════ */}
        <div className="pph-stage" style={{
          position:'absolute', inset:0, zIndex:10,
          display:'grid', gridTemplateColumns:'1.05fr 1fr',
          alignItems:'center',
          padding:'140px 64px 120px',
          gap:60,
        }}>

          {/* ── LEFT column ── */}
          <div style={{ position:'relative', maxWidth:680 }}>

            {/* eyebrow */}
            <motion.div {...fadeUp(0.25)} style={{
              display:'flex', alignItems:'center', gap:18, marginBottom:38,
              fontSize:11, letterSpacing:'0.32em', textTransform:'uppercase',
              color:'rgba(245,240,232,0.62)', fontWeight:300,
            }}>
              <span style={{ width:38, height:1, background:'#7a1c1c', boxShadow:'0 0 6px rgba(170,40,40,0.55)', flexShrink:0, display:'block' }} />
              <span>Portfolio / Selected Work</span>
              <span style={{ marginLeft:'auto', fontSize:10, color:'rgba(245,240,232,0.32)', fontFamily:'"JetBrains Mono",monospace', letterSpacing:'0.08em' }}>
                02 — 2026
              </span>
            </motion.div>

            {/* headline — three-line clip reveal */}
            <h1 style={{
              fontFamily:'"Playfair Display",serif',
              fontWeight:400,
              fontSize:'clamp(44px, 5.6vw, 88px)',
              lineHeight:1.04,
              letterSpacing:'-0.014em',
              color:'#f5f0e8',
            }}>
              {[
                { text: 'Websites Built', delay: 0.45 },
                { text: 'to Make Businesses', delay: 0.65 },
              ].map(({ text, delay }) => (
                <span key={text} style={{ display:'block', overflow:'hidden' }}>
                  <motion.span
                    style={{ display:'inline-block' }}
                    initial={{ opacity:0, y:38 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ duration:1.4, delay, ease:[0.2,0.7,0.2,1] }}
                  >
                    {text}
                  </motion.span>
                </span>
              ))}
              {/* italic line with animated underline */}
              <span style={{ display:'block', overflow:'hidden' }}>
                <motion.span
                  style={{ display:'inline-block' }}
                  initial={{ opacity:0, y:38 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:1.4, delay:0.85, ease:[0.2,0.7,0.2,1] }}
                >
                  Look More{' '}
                  <span className="pph-em" style={{ fontStyle:'italic', fontWeight:500, position:'relative' }}>
                    Valuable.
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* sub copy */}
            <motion.p {...fadeUp(1.6)} style={{
              marginTop:34, maxWidth:480,
              fontSize:15, lineHeight:1.7, fontWeight:300,
              color:'rgba(245,240,232,0.62)',
            }}>
              This is not a gallery of pretty screens. Every project is shaped around trust, service clarity, local search intent, and the path from visitor to inquiry.
            </motion.p>

            {/* stat row */}
            <motion.div {...fadeUp(1.85)} style={{
              marginTop:46, display:'flex', gap:48, alignItems:'center',
            }}>
              {[
                { k:'Selected', v:'24 projects' },
                { k:'Avg. Lift', v:'+218%' },
                { k:'Since', v:'2019' },
              ].map(({ k, v }, i) => (
                <div key={k} style={{ display:'flex', alignItems:'center', gap:48 }}>
                  {i > 0 && <span style={{ width:1, height:36, background:'rgba(229,229,229,0.22)', display:'block' }} />}
                  <div>
                    <div style={{ fontSize:10, letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(245,240,232,0.32)', fontWeight:400, marginBottom:8 }}>{k}</div>
                    <div style={{ fontFamily:'"Playfair Display",serif', fontWeight:400, fontStyle:'italic', fontSize:30, color:'#f5f0e8', lineHeight:1 }}>{v}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(2.05)} style={{ marginTop:52, display:'flex', alignItems:'center', gap:32 }}>
              <a
                href="#work"
                className="pph-cta"
                style={{
                  display:'inline-flex', alignItems:'center', gap:14,
                  padding:'18px 28px',
                  fontSize:11, letterSpacing:'0.28em', textTransform:'uppercase',
                  color:'#f5f0e8', fontWeight:400, textDecoration:'none',
                  background:'transparent',
                }}
              >
                <span>Browse the Index</span>
                <span style={{ display:'inline-block', width:18, height:1, background:'currentColor', position:'relative', flexShrink:0 }}>
                  <span style={{ position:'absolute', right:0, top:-3, width:7, height:7, borderTop:'1px solid currentColor', borderRight:'1px solid currentColor', transform:'rotate(45deg)', display:'block' }} />
                </span>
              </a>
              <Link to="/case-studies" className="pph-ghost">View Case Studies →</Link>
            </motion.div>
          </div>

          {/* ── RIGHT column — layered screen stack ── */}
          <div className="pph-right" style={{ position:'relative', height:'100%', minHeight:560 }}>
            <div className="pph-stack" style={{ position:'absolute', inset:0 }}>
              {/* burgundy sweep */}
              <div className="pph-sweep" aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:5, pointerEvents:'none', overflow:'hidden' }} />

              {/* ── Pane 1 — editorial site (back) ── */}
              <div className="pph-p1" aria-hidden="true" style={{
                position:'absolute', top:'6%', right:'8%', width:'62%', height:'70%', zIndex:1,
                background:'#0a0a0a',
                border:'1px solid rgba(229,229,229,0.22)',
                boxShadow:'0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,240,232,0.02) inset',
                overflow:'hidden', display:'flex', flexDirection:'column',
              }}>
                <PaneChrome url="— studio / werner &amp; halloran" />
                <div style={{ padding:'28px 32px', display:'flex', flexDirection:'column', gap:14, flex:1 }}>
                  <div style={{ fontFamily:'"Playfair Display",serif', fontStyle:'italic', fontSize:22, color:'rgba(245,240,232,0.85)', lineHeight:1.1, letterSpacing:'-0.01em' }}>
                    A practice of quiet conviction.
                  </div>
                  {[36, 64, 78].map((w,i) => (
                    <div key={i} style={{ height:6, background:'rgba(245,240,232,0.06)', borderRadius:1, width:`${w}%` }} />
                  ))}
                  <div style={{
                    marginTop:12, flex:1,
                    background:'linear-gradient(135deg,rgba(245,240,232,0.04),rgba(245,240,232,0.01)), repeating-linear-gradient(45deg,rgba(245,240,232,0.04) 0 1px,transparent 1px 8px)',
                    border:'1px solid rgba(245,240,232,0.05)',
                  }} />
                  <div style={{
                    alignSelf:'flex-start', padding:'8px 14px',
                    fontSize:9, letterSpacing:'0.24em', textTransform:'uppercase',
                    color:'rgba(245,240,232,0.65)', border:'1px solid rgba(245,240,232,0.18)',
                  }}>
                    Engage the studio →
                  </div>
                </div>
              </div>

              {/* ── Pane 2 — analytics dashboard (mid) ── */}
              <div className="pph-p2" aria-hidden="true" style={{
                position:'absolute', bottom:'8%', left:'4%', width:'48%', height:'48%', zIndex:2,
                background:'#0a0a0a',
                border:'1px solid rgba(229,229,229,0.22)',
                boxShadow:'0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,240,232,0.02) inset',
                overflow:'hidden', display:'flex', flexDirection:'column',
              }}>
                <PaneChrome url="— analytics / inquiry-flow" />
                <div style={{ padding:'8px 14px 14px', display:'flex', flexDirection:'column', gap:8, flex:1 }}>
                  <div style={{ display:'flex', gap:8 }}>
                    {['ORGANIC','90D'].map(p => (
                      <span key={p} style={{
                        fontFamily:'"JetBrains Mono",monospace', fontSize:8, letterSpacing:'0.12em',
                        color:'rgba(245,240,232,0.45)', border:'1px solid rgba(245,240,232,0.12)', padding:'3px 7px',
                      }}>{p}</span>
                    ))}
                  </div>
                  <div style={{ fontFamily:'"Playfair Display",serif', fontSize:32, color:'#f5f0e8', lineHeight:1 }}>
                    +342<small style={{ fontSize:11, color:'rgba(245,240,232,0.62)', fontFamily:'Inter,sans-serif', fontWeight:300, marginLeft:8, letterSpacing:'0.08em' }}>qualified inquiries</small>
                  </div>
                  <div style={{ flex:1, display:'flex', alignItems:'flex-end', gap:5, paddingTop:8 }}>
                    {[32,48,38,62,54,78,68,88,74].map((h,i) => (
                      <span
                        key={i}
                        className="pph-bar-anim"
                        style={{
                          flex:1,
                          height:`${h}%`,
                          background: i === 7 ? '#7a1c1c' : 'rgba(245,240,232,0.18)',
                          boxShadow: i === 7 ? '0 0 12px rgba(170,40,40,0.55)' : undefined,
                          display:'block',
                          animationDelay:`${-i * 0.4}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Pane 3 — code / wireframe (front) ── */}
              <div className="pph-p3" aria-hidden="true" style={{
                position:'absolute', top:'32%', right:'0%', width:'34%', height:'42%', zIndex:3,
                background:'#070707',
                border:'1px solid rgba(229,229,229,0.22)',
                boxShadow:'0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,240,232,0.02) inset',
                overflow:'hidden', display:'flex', flexDirection:'column',
              }}>
                <PaneChrome url="— index.tsx" />
                <div style={{
                  padding:'10px 16px 16px', flex:1, overflow:'hidden',
                  fontFamily:'"JetBrains Mono",ui-monospace,monospace',
                  fontSize:10, lineHeight:1.7, color:'rgba(245,240,232,0.5)',
                }}>
                  {[
                    { type:'c', text:'// shape of an inquiry' },
                    { type:'n', text:<><span style={{color:'rgba(170,40,40,0.85)'}}>export const</span> <span style={{color:'rgba(245,240,232,0.78)'}}>trust</span> = {'{'}</> },
                    { type:'n', text:<>&nbsp;&nbsp;clarity: <span style={{color:'rgba(245,240,232,0.78)'}}>true</span>,</> },
                    { type:'n', text:<>&nbsp;&nbsp;authority: <span style={{color:'rgba(245,240,232,0.78)'}}>&#39;earned&#39;</span>,</> },
                    { type:'n', text:<>&nbsp;&nbsp;intent: <span style={{color:'rgba(245,240,232,0.78)'}}>&#39;local&#39;</span>,</> },
                    { type:'n', text:<>&nbsp;&nbsp;path: <span style={{color:'rgba(245,240,232,0.78)'}}>&#39;visitor → brief&#39;</span></> },
                    { type:'n', text:'};' },
                    { type:'c', text:' ' },
                    { type:'c', text:'// rendered with restraint.' },
                  ].map(({ type, text }, i) => (
                    <span key={i} style={{ display:'block', color: type === 'c' ? 'rgba(245,240,232,0.28)' : undefined }}>
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ PORTFOLIO STANDARD panel ═══════════════ */}
        <motion.aside {...fadeUp(2.25)} aria-label="Portfolio standard" style={{
          position:'absolute', left:64, bottom:80, zIndex:14,
          width:340,
          borderTop:'1px solid rgba(229,229,229,0.22)',
          paddingTop:22,
        }}>
          <div style={{
            display:'flex', alignItems:'baseline', gap:10, marginBottom:18,
            fontSize:10, letterSpacing:'0.34em', textTransform:'uppercase',
            color:'#7a1c1c', fontWeight:500,
          }}>
            <span>Portfolio Standard</span>
            <span style={{ color:'rgba(245,240,232,0.32)', fontFamily:'"JetBrains Mono",monospace', letterSpacing:'0.08em', fontWeight:400 }}>/ 03</span>
          </div>
          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { n:'01', t:'Premium first impression' },
              { n:'02', t:'Clearer business positioning' },
              { n:'03', t:'Stronger conversion structure' },
            ].map(({ n, t }, i) => (
              <li key={n} style={{
                display:'grid', gridTemplateColumns:'34px 1fr', gap:14, alignItems:'baseline',
                paddingBottom:10,
                borderBottom: i < 2 ? '1px solid rgba(229,229,229,0.10)' : undefined,
              }}>
                <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'rgba(245,240,232,0.32)', letterSpacing:'0.06em' }}>{n}</span>
                <span style={{ fontFamily:'"Playfair Display",serif', fontWeight:400, fontStyle:'italic', fontSize:18, color:'#f5f0e8', lineHeight:1.2 }}>{t}</span>
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* ═══════════════ FOOTER STRIP ═══════════════ */}
        <div className="pph-footer" style={{
          position:'absolute', left:0, right:0, bottom:0, zIndex:16,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'18px 64px',
          fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase',
          color:'rgba(245,240,232,0.32)', fontWeight:300,
          borderTop:'1px solid rgba(229,229,229,0.10)',
          background:'linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, color:'rgba(245,240,232,0.62)' }}>
            <span className="pph-dot-pulse" style={{ width:6, height:6, borderRadius:'50%', background:'#7a1c1c', boxShadow:'0 0 10px rgba(170,40,40,0.55)', display:'inline-block', flexShrink:0 }} />
            <span>Reel 02 — Selected Works · 24 entries</span>
          </div>
          <span style={{ fontFamily:'"JetBrains Mono",monospace', letterSpacing:'0.12em' }}>
            N 40.7128° · W 74.0060° &nbsp;/&nbsp; INDEX · 02 · MMXXVI
          </span>
          <span>SEO · Brand · Web</span>
        </div>
      </section>
    </>
  );
}
