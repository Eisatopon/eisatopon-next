'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    AnimCube3: (params: string) => void;
    Cube: {
      new(): { move(alg: string): void; solve(): string };
      initSolver(): void;
    };
  }
}

const ANIMCUBE_SRC = 'https://animcubejs.cubing.net/AnimCube3.js';
const CUBE_SRC     = 'https://unpkg.com/cubejs/lib/cube.js';
const SOLVE_SRC    = 'https://unpkg.com/cubejs/lib/solve.js';
const FACES        = ['R','L','U','D','F','B'] as const;
const MODS         = ["","'","2"] as const;
const AXIS: Record<string,string> = {R:'x',L:'x',U:'y',D:'y',F:'z',B:'z'};

function loadScript(src: string): Promise<void> {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
    const s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = () => res();
    s.onerror = () => rej(new Error('Failed: ' + src));
    document.head.appendChild(s);
  });
}

function clean(s: string) { return (s || '').replace(/\s+/g,' ').trim(); }

function randomScramble(len = 20): string {
  const out: string[] = []; let lastAx = '';
  while (out.length < len) {
    const f = FACES[Math.floor(Math.random() * FACES.length)];
    const ax = AXIS[f];
    if (ax === lastAx) continue;
    out.push(f + MODS[Math.floor(Math.random() * MODS.length)]);
    lastAx = ax;
  }
  return out.join(' ');
}

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return; }
  const el = document.createElement('input');
  el.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  el.value = text;
  document.body.appendChild(el);
  el.focus(); el.select(); el.setSelectionRange(0, text.length);
  const ok = document.execCommand('copy');
  document.body.removeChild(el);
  if (!ok) throw new Error('execCommand failed');
}

const NOTATION = [
  { key: 'R', label: 'Right',  color: '#ef4444' },
  { key: 'L', label: 'Left',   color: '#3b82f6' },
  { key: 'U', label: 'Up',     color: '#fbbf24' },
  { key: 'D', label: 'Down',   color: '#f97316' },
  { key: 'F', label: 'Front',  color: '#10b981' },
  { key: 'B', label: 'Back',   color: '#a78bfa' },
];

export default function RubikCubeSolver() {
  const hostRef      = useRef<HTMLDivElement>(null);
  const solverReady  = useRef(false);

  const [scramble, setScramble] = useState('');
  const [solution, setSolution] = useState<string | null>(null);
  const [status,   setStatus]   = useState('');
  const [busy,     setBusy]     = useState(true);
  const [ready,    setReady]    = useState(false);
  const [copied,   setCopied]   = useState(false);
  const [loading,  setLoading]  = useState<'engine'|'solver'|null>('engine');
  const [showHelp, setShowHelp] = useState(false);

  const renderCube = useCallback((scr: string, sol = '') => {
    const host = hostRef.current;
    if (!host || typeof window.AnimCube3 !== 'function') return;
    while (host.firstChild) host.removeChild(host.firstChild);
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:100%;height:100%';
    host.appendChild(wrap);
    /* ✅ white background + black edges = classic Rubik look */
    const base   = 'edit=1&snap=1&speed=10&bgcolor=ffffff&cubecolor=000000&buttonbar=0&hint=0&movetext=1&textsize=12&position=lluu';
    const params = `initmove=${encodeURIComponent(scr)}&move=${encodeURIComponent(sol)}&initrevmove=#`;
    const sc = document.createElement('script');
    sc.text = `AnimCube3('${(base+'&'+params).replace(/'/g,"\\'")}')`;
    wrap.appendChild(sc);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading('engine');
        await loadScript(ANIMCUBE_SRC);
        if (cancelled) return;
        setLoading('solver');
        await loadScript(CUBE_SRC);
        await loadScript(SOLVE_SRC);
        if (cancelled) return;
        solverReady.current = false;
        setLoading(null);
        setReady(true);
        setBusy(false);
      } catch (e) {
        if (!cancelled) { setStatus('Load error: ' + (e instanceof Error ? e.message : e)); setBusy(false); setLoading(null); }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const scr = randomScramble();
    setScramble(scr);
    renderCube(scr, '');
  }, [ready, renderCube]);

  useEffect(() => {
    return () => {
      const host = hostRef.current;
      if (host) while (host.firstChild) host.removeChild(host.firstChild);
    };
  }, []);

  const handleRandom = () => {
    const scr = randomScramble();
    setScramble(scr); setSolution(null); setStatus('');
    renderCube(scr, '');
  };

  const handleScramble = () => {
    setSolution(null); setStatus('');
    renderCube(clean(scramble), '');
  };

  const handleSolve = () => {
    const scr = clean(scramble);
    if (!scr) return;
    setBusy(true); setStatus('Computing solution…');
    setTimeout(() => {
      try {
        if (!solverReady.current) { window.Cube.initSolver(); solverReady.current = true; }
        const c = new window.Cube();
        c.move(scr);
        const sol = c.solve();
        setSolution(sol);
        renderCube(scr, sol);
        setStatus('');
      } catch (e) {
        setSolution('Invalid scramble – use standard WCA notation.\n\n' + e);
        setStatus('Invalid scramble.');
      } finally {
        setBusy(false);
      }
    }, 50);
  };

  const handleReset = () => {
    const scr = randomScramble();
    setScramble(scr); setSolution(null); setStatus('');
    renderCube(scr, '');
  };

  const handleCopy = async () => {
    if (!solution) { setStatus('Press Solve first.'); return; }
    try {
      await copyToClipboard(solution);
      setCopied(true); setStatus('');
      setTimeout(() => setCopied(false), 2000);
    } catch { setStatus('Copy failed – please select manually.'); }
  };

  return (
    <div className="rk-root">

      <div className="rk-bg">
        <div className="rk-orb rk-orb1" />
        <div className="rk-orb rk-orb2" />
        <div className="rk-orb rk-orb3" />
      </div>

      <header className="rk-header">
        <div className="rk-header-left">
          <a href="/" className="rk-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            <span>EisatoponAI</span>
          </a>
          <div className="rk-brand">
            <div className="rk-cube-icon"><span>⬛</span></div>
            <div>
              <h1 className="rk-title">Rubik&apos;s Cube<br/><span className="rk-title-accent">Solver</span></h1>
              <p className="rk-sub">Interactive 3D · WCA Notation · Optimal Solution</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="rk-loading-pill">
            <div className="rk-spinner" />
            <span>{loading === 'engine' ? 'Loading 3D engine…' : 'Loading solver…'}</span>
          </div>
        )}

        {!loading && (
          <div className="rk-controls">
            <input
              className="rk-input"
              value={scramble}
              onChange={e => setScramble(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleScramble()}
              placeholder="R U R' U' F2 …"
              spellCheck={false}
              autoComplete="off"
              disabled={busy}
            />
            <div className="rk-btns">
              <button onClick={handleRandom}   disabled={busy} className="rk-btn rk-btn-ghost">Random</button>
              <button onClick={handleScramble} disabled={busy} className="rk-btn rk-btn-teal">Scramble</button>
              <button onClick={handleSolve}    disabled={busy} className="rk-btn rk-btn-primary">Solve →</button>
              <button onClick={handleReset}    disabled={busy} className="rk-btn rk-btn-ghost">Reset</button>
            </div>
          </div>
        )}
      </header>

      <div className="rk-grid">
        <section className="rk-panel rk-cube-panel">
          <div className="rk-panel-label">3D Viewer</div>
          <div ref={hostRef} className="rk-cube" aria-label="Interactive 3D Rubik's Cube" />
          <p className="rk-tip">Drag to rotate · Scroll to zoom</p>
        </section>

        <div className="rk-right">
          <section className="rk-panel rk-sol-panel">
            <div className="rk-sol-header">
              <div>
                <div className="rk-panel-label">Solution Algorithm</div>
                {solution && (
                  <div className="rk-move-count">
                    {solution.trim().split(/\s+/).length} moves
                  </div>
                )}
              </div>
              <button onClick={handleCopy} disabled={!solution || busy} className={`rk-copy-btn ${copied ? 'rk-copied' : ''}`}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="rk-out">
              {busy ? '⏳ Computing…' : solution ? solution : ready ? 'Press "Solve" to generate an optimal solution.' : 'Loading…'}
            </pre>
            {status && (
              <div className={`rk-status ${status.includes('error')||status.includes('Invalid')||status.includes('failed') ? 'rk-status-err' : ''}`}>
                {status}
              </div>
            )}
          </section>

          <section className="rk-panel rk-notation">
            <button className="rk-notation-toggle" onClick={() => setShowHelp(h => !h)}>
              <span className="rk-panel-label">Notation Guide</span>
              <span className="rk-chevron" style={{transform: showHelp ? 'rotate(180deg)' : 'rotate(0deg)'}}>▾</span>
            </button>
            {showHelp && (
              <div className="rk-notation-body">
                <div className="rk-notation-grid">
                  {NOTATION.map(n => (
                    <div key={n.key} className="rk-notation-chip" style={{'--nc': n.color} as React.CSSProperties}>
                      <span className="rk-nk">{n.key}</span>
                      <span className="rk-nl">{n.label}</span>
                    </div>
                  ))}
                </div>
                <div className="rk-notation-mods">
                  <div className="rk-mod-chip"><code>R</code> <span>= 90° clockwise</span></div>
                  <div className="rk-mod-chip"><code>R&apos;</code> <span>= 90° counter-clockwise</span></div>
                  <div className="rk-mod-chip"><code>R2</code> <span>= 180° turn</span></div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="rk-footer">
        <strong>EisatoponAI</strong> &nbsp;·&nbsp; Your Daily Experience of Math Adventures
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .rk-root {
          min-height:100vh; background:#04080f; color:#e2e8f0;
          font-family:'DM Sans',system-ui,sans-serif;
          padding:24px 20px; position:relative; overflow-x:hidden;
        }
        .rk-bg { position:fixed; inset:0; pointer-events:none; z-index:0; }
        .rk-orb { position:absolute; border-radius:50%; filter:blur(100px); opacity:.25; }
        .rk-orb1 { width:500px; height:500px; background:#1D9E75; top:-150px; right:-100px; }
        .rk-orb2 { width:400px; height:400px; background:#2563eb; bottom:-100px; left:-100px; }
        .rk-orb3 { width:250px; height:250px; background:#c9a227; top:50%; left:40%; opacity:.15; }
        .rk-header {
          position:relative; z-index:1;
          max-width:1200px; margin:0 auto 20px;
          display:flex; flex-wrap:wrap; gap:16px;
          align-items:center; justify-content:space-between;
          background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07);
          border-radius:24px; padding:20px 28px; backdrop-filter:blur(20px);
        }
        .rk-brand { display:flex; align-items:center; gap:16px; }
        .rk-cube-icon {
          width:56px; height:56px; border-radius:16px;
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
          display:flex; align-items:center; justify-content:center; font-size:28px;
        }
        .rk-title {
          font-family:'Syne',sans-serif; font-size:clamp(18px,2.5vw,26px);
          font-weight:800; line-height:1.1; letter-spacing:-.5px; margin:0 0 4px; color:#fff;
        }
        .rk-title-accent {
          background:linear-gradient(90deg,#25c491,#c9a227);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .rk-sub { margin:0; font-size:12px; color:#475569; }
        .rk-loading-pill {
          display:flex; align-items:center; gap:10px;
          background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08);
          border-radius:999px; padding:10px 20px; font-size:13px; color:#64748b;
        }
        .rk-spinner {
          width:16px; height:16px; border-radius:50%;
          border:2px solid rgba(255,255,255,.1); border-top-color:#25c491;
          animation:spin .8s linear infinite;
        }
        @keyframes spin { to{transform:rotate(360deg)} }
        .rk-controls { display:flex; flex-wrap:wrap; gap:10px; align-items:center; flex:1; justify-content:flex-end; }
        .rk-input {
          flex:1; min-width:200px; max-width:360px; padding:12px 16px; border-radius:14px;
          border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.06);
          color:#e2e8f0; font-size:14px; outline:none; transition:border-color .2s;
          font-family:'JetBrains Mono','Fira Code',monospace; letter-spacing:.5px;
        }
        .rk-input:focus { border-color:#25c491; background:rgba(255,255,255,.08); }
        .rk-input::placeholder { color:#334155; }
        .rk-btns { display:flex; flex-wrap:wrap; gap:8px; }
        .rk-btn {
          padding:11px 18px; border-radius:12px; font-weight:700; font-size:13px;
          cursor:pointer; transition:all .2s; white-space:nowrap; border:1px solid transparent;
        }
        .rk-btn:disabled { opacity:.35; cursor:not-allowed; }
        .rk-btn:not(:disabled):active { transform:scale(.96); }
        .rk-btn-ghost { background:rgba(255,255,255,.05); border-color:rgba(255,255,255,.08); color:#64748b; }
        .rk-btn-ghost:not(:disabled):hover { background:rgba(255,255,255,.09); color:#94a3b8; }
        .rk-btn-teal { background:rgba(37,196,145,.15); border-color:rgba(37,196,145,.3); color:#25c491; }
        .rk-btn-teal:not(:disabled):hover { background:rgba(37,196,145,.25); }
        .rk-btn-primary {
          background:linear-gradient(135deg,#25c491,#1D9E75); color:#001a10; font-weight:800;
          box-shadow:0 4px 16px rgba(37,196,145,.3);
        }
        .rk-btn-primary:not(:disabled):hover { box-shadow:0 6px 24px rgba(37,196,145,.45); transform:translateY(-1px); }
        .rk-grid {
          position:relative; z-index:1; max-width:1200px; margin:0 auto;
          display:grid; grid-template-columns:1fr 420px; gap:16px;
        }
        @media(max-width:900px){ .rk-grid { grid-template-columns:1fr; } }
        .rk-panel {
          background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07);
          border-radius:24px; padding:20px; backdrop-filter:blur(16px);
        }
        .rk-panel-label {
          font-size:10px; font-weight:700; letter-spacing:1.5px;
          text-transform:uppercase; color:#334155; margin-bottom:12px;
        }
        .rk-cube-panel { display:flex; flex-direction:column; }
        .rk-cube {
          flex:1; min-height:440px; border-radius:16px; overflow:hidden;
          border:1px solid rgba(0,0,0,.1);
          background:#ffffff; /* ✅ white to match AnimCube3 bgcolor */
          cursor:grab;
        }
        .rk-cube:active { cursor:grabbing; }
        .rk-tip { margin:10px 0 0; font-size:11px; color:#1e293b; text-align:center; }
        .rk-right { display:flex; flex-direction:column; gap:12px; }
        .rk-sol-panel { display:flex; flex-direction:column; gap:12px; flex:1; }
        .rk-sol-header { display:flex; justify-content:space-between; align-items:flex-start; }
        .rk-move-count {
          font-family:'Syne',sans-serif; font-size:28px; font-weight:800;
          color:#25c491; line-height:1; margin-top:2px;
        }
        .rk-copy-btn {
          padding:8px 16px; border-radius:10px; cursor:pointer;
          font-size:12px; font-weight:700; transition:all .2s;
          background:rgba(37,196,145,.1); border:1px solid rgba(37,196,145,.25); color:#25c491;
        }
        .rk-copy-btn:disabled { opacity:.3; cursor:default; }
        .rk-copy-btn:not(:disabled):hover { background:rgba(37,196,145,.2); }
        .rk-copied { background:rgba(37,196,145,.25) !important; border-color:#25c491 !important; }
        .rk-out {
          flex:1; margin:0; padding:16px; border-radius:16px;
          background:rgba(255,255,255,.96); color:#0a0f1e;
          font-family:'JetBrains Mono','Fira Code',monospace;
          font-size:13px; line-height:1.8; white-space:pre-wrap;
          min-height:100px; border:none; word-break:break-all;
        }
        .rk-status { font-size:12px; color:#25c491; padding:4px 0; }
        .rk-status-err { color:#ef4444; }
        .rk-notation { padding:16px 20px; }
        .rk-notation-toggle {
          width:100%; display:flex; justify-content:space-between; align-items:center;
          background:transparent; border:none; cursor:pointer; padding:0;
        }
        .rk-chevron { color:#334155; font-size:16px; transition:transform .2s; }
        .rk-notation-body { margin-top:14px; }
        .rk-notation-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:12px; }
        .rk-notation-chip {
          display:flex; align-items:center; gap:8px;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          border-radius:10px; padding:8px 10px;
        }
        .rk-nk {
          width:28px; height:28px; border-radius:8px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          font-family:'Syne',sans-serif; font-size:14px; font-weight:800;
          background:color-mix(in srgb,var(--nc) 20%,transparent);
          color:var(--nc); border:1px solid color-mix(in srgb,var(--nc) 35%,transparent);
        }
        .rk-nl { font-size:11px; color:#475569; }
        .rk-notation-mods { display:flex; flex-direction:column; gap:6px; }
        .rk-mod-chip { display:flex; align-items:center; gap:10px; font-size:12px; color:#475569; }
        .rk-mod-chip code {
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
          border-radius:6px; padding:3px 8px;
          font-family:'JetBrains Mono',monospace; font-size:12px; color:#94a3b8;
        }
        .rk-footer {
          position:relative; z-index:1; max-width:1200px; margin:16px auto 0;
          text-align:center; font-size:12px; color:#1e293b; padding:12px;
        }
        .rk-footer strong { color:#334155; }
        .rk-header-left {
          display:flex; flex-direction:column; gap:12px;
        }
        .rk-back {
          display:inline-flex; align-items:center; gap:6px;
          padding:6px 14px; border-radius:999px;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          color:#64748b; text-decoration:none;
          font-size:11px; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase;
          transition:all .2s ease;
          width:fit-content;
        }
        .rk-back svg { transition:transform .2s ease; }
        .rk-back:hover {
          border-color:rgba(37,196,145,.4);
          color:#25c491;
          background:rgba(37,196,145,.08);
        }
        .rk-back:hover svg { transform:translateX(-3px); }
        @media(max-width:600px){
          .rk-header { padding:16px; }
          .rk-controls { justify-content:flex-start; }
          .rk-input { max-width:100%; }
          .rk-notation-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>
    </div>
  );
}