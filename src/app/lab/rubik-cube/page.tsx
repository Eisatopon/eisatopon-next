'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ── window types ── */
declare global {
  interface Window {
    AnimCube3: (params: string) => void;
    Cube: {
      new(): { move(alg: string): void; solve(): string };
      initSolver(): void;
    };
  }
}

/* ── constants ── */
const ANIMCUBE_SRC = 'https://animcubejs.cubing.net/AnimCube3.js';
const CUBE_SRC     = 'https://unpkg.com/cubejs/lib/cube.js';
const SOLVE_SRC    = 'https://unpkg.com/cubejs/lib/solve.js';
const FACES        = ['R','L','U','D','F','B'] as const;
const MODS         = ["","'","2"] as const;
const AXIS: Record<string,string> = {R:'x',L:'x',U:'y',D:'y',F:'z',B:'z'};

/* ── helpers ── */
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

/* ── component ── */
export default function RubikCubeSolver() {
  const hostRef     = useRef<HTMLDivElement>(null);
  const solverReady = useRef(false);

  const [scramble, setScramble] = useState('');
  const [solution, setSolution] = useState<string | null>(null);
  const [status,   setStatus]   = useState('Loading 3D engine…');
  const [busy,     setBusy]     = useState(true);
  const [ready,    setReady]    = useState(false);
  const [copied,   setCopied]   = useState(false);

  /* render AnimCube3 */
  const renderCube = useCallback((scr: string, sol = '') => {
    const host = hostRef.current;
    if (!host || typeof window.AnimCube3 !== 'function') return;
    host.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:100%;height:100%';
    host.appendChild(wrap);
    const base   = 'edit=1&snap=1&speed=10&bgcolor=ffffff&cubecolor=111111&buttonbar=0&hint=0&movetext=1&textsize=12&position=lluu';
    const params = `initmove=${encodeURIComponent(scr)}&move=${encodeURIComponent(sol)}&initrevmove=#`;
    const sc = document.createElement('script');
    sc.text = `AnimCube3('${(base+'&'+params).replace(/'/g,"\\'")}')`;
    wrap.appendChild(sc);
  }, []);

  /* boot: load all 3 scripts in sequence */
  useEffect(() => {
    (async () => {
      try {
        await loadScript(ANIMCUBE_SRC);
        setStatus('Loading solver…');
        await loadScript(CUBE_SRC);
        await loadScript(SOLVE_SRC);
        setReady(true);
        setBusy(false);
        setStatus('');
      } catch (e) {
        setStatus('Load error: ' + (e instanceof Error ? e.message : e));
        setBusy(false);
      }
    })();
  }, []);

  /* first scramble once ready */
  useEffect(() => {
    if (!ready) return;
    const scr = randomScramble();
    setScramble(scr);
    renderCube(scr, '');
  }, [ready, renderCube]);

  /* handlers */
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
    setBusy(true); setStatus('Solving…');
    setTimeout(() => {
      try {
        if (!solverReady.current) { window.Cube.initSolver(); solverReady.current = true; }
        const c = new window.Cube();
        c.move(scr);
        const sol = c.solve();
        setSolution(sol);
        renderCube(scr, sol);
        setStatus('Solved ✓  Click Copy to copy.');
      } catch (e) {
        setSolution('Invalid scramble – use standard WCA notation.\n\n' + e);
        setStatus('Error: invalid scramble.');
      } finally {
        setBusy(false);
      }
    }, 30);
  };

  const handleReset = () => {
    const scr = randomScramble();
    setScramble(scr); setSolution(null); setStatus('');
    renderCube(scr, '');
  };

  const handleCopy = async () => {
    if (!solution) { setStatus('Press Solve first.'); return; }
    try { await navigator.clipboard.writeText(solution); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = solution; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true); setStatus('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── render ── */
  return (
    <div className="rubik-root">

      {/* header */}
      <header className="rubik-header">
        <div className="rubik-brand">
          <span className="rubik-logo">⬛</span>
          <div>
            <h1 className="rubik-title">Rubik&apos;s Cube Solver</h1>
            <p className="rubik-sub">Interactive 3D · WCA Notation · Instant Solution</p>
          </div>
        </div>

        <div className="rubik-controls">
          <input
            className="rubik-input"
            value={scramble}
            onChange={e => setScramble(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleScramble()}
            placeholder="e.g. R U R' U' F2"
            spellCheck={false}
            autoComplete="off"
            disabled={busy}
          />
          <div className="rubik-btns">
            <button onClick={handleRandom}   disabled={busy} className="btn btn-dark">Random</button>
            <button onClick={handleScramble} disabled={busy} className="btn btn-blue">Scramble</button>
            <button onClick={handleSolve}    disabled={busy} className="btn btn-red">Solve</button>
            <button onClick={handleReset}    disabled={busy} className="btn btn-ghost">Reset</button>
          </div>
        </div>
      </header>

      {/* main grid */}
      <div className="rubik-grid">

        {/* cube */}
        <section className="rubik-panel">
          <div ref={hostRef} className="rubik-cube" aria-label="Interactive 3D Rubik's Cube" />
          <p className="rubik-tip">💡 Drag to rotate · Scramble → Solve</p>
        </section>

        {/* solution */}
        <section className="rubik-panel rubik-sol">
          <div className="rubik-sol-header">
            <h2 className="rubik-sol-title">Solution Algorithm</h2>
            <button onClick={handleCopy} disabled={!solution || busy} className="btn btn-copy">
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          <pre className="rubik-out">
            {busy && !solution
              ? 'Working…'
              : solution ?? (ready ? 'Press "Solve" to generate an optimal solution.' : 'Loading…')}
          </pre>

          {status && <p className="rubik-status">{status}</p>}

          {/* notation help */}
          <details className="rubik-help">
            <summary>Cube notation / Οδηγός συμβολισμού</summary>
            <div className="rubik-help-grid">
              <div className="rubik-help-block">
                <strong>🇬🇷 Ελληνικά</strong>
                <p><b>R</b> δεξιά · <b>L</b> αριστερά · <b>U</b> πάνω · <b>D</b> κάτω · <b>F</b> μπροστά · <b>B</b> πίσω.</p>
                <p>Το <b>&#39;</b> = 90° αριστερόστροφα · το <b>2</b> = 180°.</p>
              </div>
              <div className="rubik-help-block">
                <strong>🇬🇧 English</strong>
                <p><b>R</b>ight · <b>L</b>eft · <b>U</b>p · <b>D</b>own · <b>F</b>ront · <b>B</b>ack.</p>
                <p>Prime (<b>&#39;</b>) = 90° counter-clockwise · <b>2</b> = 180° turn.</p>
              </div>
            </div>
          </details>
        </section>
      </div>

      {/* footer */}
      <footer className="rubik-footer">
        <strong>EisatoponAI</strong> &nbsp;|&nbsp; Your Daily Experience of Math Adventures
      </footer>

      <style>{`
        .rubik-root {
          --teal2:#25c491; --gold:#c9a227; --red:#DC2626; --blue:#2563EB;
          --text:#e8edf5; --muted:#8394b0;
          --border:rgba(255,255,255,.09); --card:rgba(255,255,255,.04);
          font-family:'Geist','DM Sans',ui-sans-serif,system-ui,sans-serif;
          color:var(--text); max-width:1100px; margin:0 auto;
        }
        .rubik-header {
          display:flex; flex-wrap:wrap; gap:16px;
          align-items:center; justify-content:space-between;
          background:var(--card); border:1px solid var(--border);
          border-radius:20px; padding:18px 22px; margin-bottom:16px;
          backdrop-filter:blur(12px);
        }
        .rubik-brand { display:flex; align-items:center; gap:14px; }
        .rubik-logo  { font-size:32px; }
        .rubik-title {
          margin:0; font-size:clamp(16px,2.2vw,22px); font-weight:800; letter-spacing:-.5px;
          background:linear-gradient(90deg,var(--teal2),var(--gold));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .rubik-sub { margin:3px 0 0; font-size:12px; color:var(--muted); }
        .rubik-controls { display:flex; flex-wrap:wrap; gap:10px; align-items:center; flex:1; justify-content:flex-end; }
        .rubik-input {
          flex:1; min-width:220px; max-width:380px; padding:11px 14px; border-radius:12px;
          border:1px solid var(--border); background:rgba(255,255,255,.07);
          color:var(--text); font-size:14px; outline:none; transition:border-color .2s;
          font-family:'JetBrains Mono','Fira Code',monospace;
        }
        .rubik-input:focus { border-color:#1D9E75; }
        .rubik-input::placeholder { color:var(--muted); }
        .rubik-btns { display:flex; flex-wrap:wrap; gap:8px; }
        .btn {
          padding:10px 14px; border-radius:12px; border:1px solid transparent;
          font-weight:700; font-size:13px; cursor:pointer;
          transition:opacity .2s,transform .1s; white-space:nowrap;
        }
        .btn:disabled { opacity:.4; cursor:not-allowed; }
        .btn:not(:disabled):active { transform:scale(.96); }
        .btn-dark  { background:#1a2540; color:var(--text); border-color:var(--border); }
        .btn-blue  { background:var(--blue); color:#fff; }
        .btn-red   { background:var(--red);  color:#fff; }
        .btn-ghost { background:transparent; color:var(--muted); border-color:var(--border); }
        .btn-copy  { background:rgba(29,158,117,.15); color:var(--teal2); border-color:rgba(29,158,117,.3); padding:8px 14px; }
        .btn-copy:disabled { opacity:.3; }
        .rubik-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media(max-width:760px){
          .rubik-grid { grid-template-columns:1fr; }
          .rubik-controls { justify-content:flex-start; }
          .rubik-input { max-width:100%; }
        }
        .rubik-panel { background:var(--card); border:1px solid var(--border); border-radius:20px; padding:16px; }
        .rubik-sol   { display:flex; flex-direction:column; gap:10px; }
        .rubik-cube  { width:100%; height:460px; border-radius:14px; overflow:hidden; background:#fff; border:1px solid rgba(255,255,255,.1); cursor:grab; }
        .rubik-cube:active { cursor:grabbing; }
        .rubik-tip   { margin-top:10px; font-size:12px; color:var(--muted); text-align:center; }
        .rubik-sol-header { display:flex; justify-content:space-between; align-items:center; }
        .rubik-sol-title  { margin:0; font-size:15px; font-weight:800; color:var(--gold); }
        .rubik-out {
          flex:1; margin:0; padding:14px; border-radius:14px;
          background:rgba(255,255,255,.96); color:#0f1a30;
          font-family:'JetBrains Mono','Fira Code',monospace;
          font-size:13px; line-height:1.6; white-space:pre-wrap;
          min-height:120px; border:1px solid rgba(0,0,0,.06);
        }
        .rubik-status { margin:0; font-size:12px; color:var(--teal2); min-height:16px; }
        .rubik-help   { border:1px solid var(--border); border-radius:14px; background:rgba(255,255,255,.03); padding:10px 14px; }
        .rubik-help summary { cursor:pointer; font-size:13px; font-weight:700; color:var(--muted); list-style:none; user-select:none; }
        .rubik-help summary::-webkit-details-marker { display:none; }
        .rubik-help[open] summary { color:var(--text); }
        .rubik-help-grid  { margin-top:12px; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .rubik-help-block { background:rgba(255,255,255,.05); border-radius:10px; padding:10px 12px; font-size:12.5px; line-height:1.5; color:var(--text); }
        .rubik-help-block strong { display:block; margin-bottom:6px; color:var(--gold); }
        @media(max-width:480px){ .rubik-help-grid { grid-template-columns:1fr; } }
        .rubik-footer { margin-top:16px; text-align:center; font-size:12px; color:var(--muted); padding:12px; }
      `}</style>
    </div>
  );
}