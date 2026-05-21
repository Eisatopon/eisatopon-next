'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Level  = 'easy' | 'medium' | 'hard' | 'chaser';
type Screen = 'landing' | 'levels' | 'game' | 'result';
interface Question { q: string; o: string[]; a: number; }

function rnd(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const STATIC: Record<Level, Question[]> = {
  easy: [
    {q:"4 + 7 =",o:["9","11","13"],a:1},{q:"8 × 5 =",o:["35","40","45"],a:1},
    {q:"15 − 6 =",o:["7","8","9"],a:2},{q:"√64 =",o:["6","7","8"],a:2},
    {q:"25 + 38 =",o:["61","63","65"],a:1},{q:"9 × 9 =",o:["72","81","90"],a:1},
    {q:"100 ÷ 4 =",o:["20","25","30"],a:1},{q:"Half of 48",o:["20","22","24"],a:2},
    {q:"7² =",o:["42","49","56"],a:1},{q:"3 × 12 + 9 =",o:["42","45","48"],a:1},
    {q:"80 − 37 =",o:["41","43","45"],a:1},{q:"√100 =",o:["9","10","11"],a:1},
    {q:"6 × 7 − 8 =",o:["32","34","36"],a:1},{q:"Minutes in 2 hours?",o:["100","120","140"],a:1},
    {q:"Equilateral angle?",o:["30°","60°","90°"],a:1},
  ],
  medium: [
    {q:"12 × 8 =",o:["88","96","104"],a:1},{q:"144 ÷ 12 =",o:["10","12","14"],a:1},
    {q:"5² + 3² =",o:["32","34","36"],a:1},{q:"20% of 150",o:["25","30","35"],a:1},
    {q:"√81 + 7 =",o:["14","15","16"],a:2},{q:"(8+4) × 5 =",o:["50","60","70"],a:1},
    {q:"72 ÷ 8 + 15 =",o:["22","24","26"],a:1},{q:"3³ =",o:["21","24","27"],a:2},
    {q:"GCD(12, 18)",o:["4","6","8"],a:1},{q:"15 × 6 ÷ 3 =",o:["25","30","35"],a:1},
    {q:"√144 =",o:["10","12","14"],a:1},{q:"25 × 4 =",o:["90","100","110"],a:1},
    {q:"(20−8) × 3 =",o:["30","36","42"],a:1},{q:"6² − 4² =",o:["16","20","24"],a:1},
    {q:"10³ ÷ 10 =",o:["90","100","110"],a:1},
  ],
  hard: [
    {q:"LCM(6, 8, 12)",o:["24","36","48"],a:0},{q:"2⁵ =",o:["24","32","40"],a:1},
    {q:"√(144+256) =",o:["18","20","22"],a:1},{q:"48÷(3×4)+5²",o:["25","29","33"],a:1},
    {q:"x² = 196 → x =",o:["12","14","16"],a:1},{q:"3³ × 4 =",o:["96","108","120"],a:1},
    {q:"25 × 3.6 =",o:["80","90","100"],a:1},{q:"√625 =",o:["20","25","30"],a:1},
    {q:"(7+8)×(9−4)",o:["65","75","85"],a:1},{q:"2⁴ + 3⁴ =",o:["87","97","107"],a:1},
    {q:"1+2+…+100 =",o:["5000","5050","5500"],a:1},{q:"0.999… =",o:["≈1","0.999","1"],a:2},
    {q:"15% of 200",o:["25","30","35"],a:1},{q:"Primes ≤ 20?",o:["7","8","9"],a:1},
    {q:"2⁵ + 2⁴ =",o:["40","48","56"],a:1},
  ],
  chaser: [
    {q:"Primes ≤ 50?",o:["13","15","16"],a:1},{q:"96÷(4×3)+11²",o:["121","129","137"],a:1},
    {q:"√(625−225) =",o:["18","20","22"],a:1},{q:"3⁵ ÷ 9 + 7 =",o:["30","34","40"],a:1},
    {q:"Divisors of 60?",o:["10","12","14"],a:1},{q:"√1296 =",o:["34","36","38"],a:1},
    {q:"(13²−5²)÷8",o:["18","20","22"],a:0},{q:"2²⁰²⁶÷2²⁰²⁵+2=",o:["2","4","2026"],a:1},
    {q:"log2 + log5 =",o:["0","1","2"],a:1},{q:"∫x dx =",o:["x+C","x²+C","x²/2+C"],a:2},
    {q:"√(−4) =",o:["2","2i","−2"],a:1},{q:"sin30°+cos60°=",o:["0","1","√2"],a:1},
    {q:"i² + i⁴ =",o:["0","−1","2"],a:0},{q:"∞ − ∞ =",o:["0","∞","Undefined"],a:2},
    {q:"(13²−5²)÷(13+5)=",o:["6","8","10"],a:1},
  ],
};

function genQuestions(level: Level, count: number): Question[] {
  return Array.from({length: count}, () => {
    if (level === 'easy') {
      const a = rnd(3,15), b = rnd(3,15), s = a+b;
      const opts = shuffle([String(s), String(s-2), String(s+2)]);
      return {q:`${a} + ${b} =`, o:opts, a:opts.indexOf(String(s))};
    } else if (level === 'medium') {
      const a = rnd(8,15), b = rnd(8,15), p = a*b;
      const opts = shuffle([String(p), String(p-10), String(p+10)]);
      return {q:`${a} × ${b} =`, o:opts, a:opts.indexOf(String(p))};
    } else if (level === 'hard') {
      const base = [2,3,4,5][rnd(0,3)], exp = rnd(4,6), val = Math.pow(base,exp);
      const opts = shuffle([String(val), String(val*2), String(Math.round(val/2))]);
      return {q:`${base}^${exp} =`, o:opts, a:opts.indexOf(String(val))};
    } else {
      const a = rnd(10,20), b = rnd(3,9), val = a*a-b*b;
      const opts = shuffle([String(val), String(val+b), String(val-a)]);
      return {q:`${a}² − ${b}² =`, o:opts, a:opts.indexOf(String(val))};
    }
  });
}

function maxSec(lv: Level) { return lv==='easy'?12:lv==='medium'?10:lv==='hard'?8:5; }

function playSound(type: 'correct'|'wrong'|'combo') {
  try {
    const ctx = new (window.AudioContext||(window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    if (type==='correct') {
      o.frequency.setValueAtTime(523,ctx.currentTime); o.frequency.exponentialRampToValueAtTime(784,ctx.currentTime+.1);
      g.gain.setValueAtTime(.2,ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.2);
      o.start(); o.stop(ctx.currentTime+.2);
    } else if (type==='wrong') {
      o.frequency.setValueAtTime(200,ctx.currentTime); o.frequency.exponentialRampToValueAtTime(100,ctx.currentTime+.25);
      g.gain.setValueAtTime(.2,ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.25);
      o.start(); o.stop(ctx.currentTime+.25);
    } else {
      o.frequency.setValueAtTime(659,ctx.currentTime); o.frequency.exponentialRampToValueAtTime(1047,ctx.currentTime+.15);
      g.gain.setValueAtTime(.3,ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.3);
      o.start(); o.stop(ctx.currentTime+.3);
    }
  } catch { /* noop */ }
}

const LEVELS: {id:Level; label:string; icon:string; time:string; desc:string; color:string; glow:string}[] = [
  {id:'easy',   label:'Easy',   icon:'🟢', time:'12s', desc:'Warm up your brain',    color:'#10b981', glow:'rgba(16,185,129,.35)'},
  {id:'medium', label:'Medium', icon:'🔵', time:'10s', desc:'Pick up the pace',      color:'#3b82f6', glow:'rgba(59,130,246,.35)'},
  {id:'hard',   label:'Hard',   icon:'🟠', time:'8s',  desc:'No time to hesitate',   color:'#f59e0b', glow:'rgba(245,158,11,.35)'},
  {id:'chaser', label:'Chaser', icon:'⚡', time:'5s',  desc:'The Chaser is coming',  color:'#ef4444', glow:'rgba(239,68,68,.4)'},
];

export default function MathChaserPro() {
  const [screen, setScreen]       = useState<Screen>('landing');
  const [level, setLevel]         = useState<Level>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIdx, setQIdx]           = useState(0);
  const [score, setScore]         = useState(0);
  const [combo, setCombo]         = useState(0);
  const [maxCombo, setMaxCombo]   = useState(0);
  const [timeLeft, setTimeLeft]   = useState(100);
  const [timeText, setTimeText]   = useState('');
  const [pills, setPills]         = useState<('idle'|'current'|'correct'|'wrong')[]>([]);
  const [chosen, setChosen]       = useState<number|null>(null);
  const [won, setWon]             = useState(false);
  const [comboFlash, setComboFlash] = useState('');
  const [bests, setBests]         = useState<Record<string,number>>({});
  const [pulse, setPulse]         = useState(false);

  const timerRef    = useRef<ReturnType<typeof setInterval>|null>(null);
  const rawRef      = useRef(0);
  const scoreRef    = useRef(0);
  const maxComboRef = useRef(0);
  const levelRef    = useRef<Level>('easy');
  const endRef      = useRef<(w:boolean,s:number,mc:number,lv:Level)=>void>(()=>{});

  useEffect(()=>{ scoreRef.current=score; },[score]);
  useEffect(()=>{ maxComboRef.current=maxCombo; },[maxCombo]);
  useEffect(()=>{ levelRef.current=level; },[level]);

  useEffect(()=>{
    const b:Record<string,number>={};
    ['easy','medium','hard','chaser'].forEach(l=>{ b[l]=parseInt(localStorage.getItem(`mc_best_${l}`)||'0'); });
    setBests(b);
  },[]);

  // Landing pulse animation
  useEffect(()=>{
    if (screen!=='landing') return;
    const t=setInterval(()=>setPulse(p=>!p),1800);
    return ()=>clearInterval(t);
  },[screen]);

  const stopTimer = useCallback(()=>{ if(timerRef.current){clearInterval(timerRef.current);timerRef.current=null;} },[]);

  const endGame = useCallback((w:boolean,s:number,mc:number,lv:Level)=>{
    stopTimer(); setWon(w); setScreen('result');
    const key=`mc_best_${lv}`, prev=parseInt(localStorage.getItem(key)||'0');
    if(s>prev){ localStorage.setItem(key,String(s)); setBests(b=>({...b,[lv]:s})); }
  },[stopTimer]);

  useEffect(()=>{ endRef.current=endGame; },[endGame]);

  const startTimer = useCallback((sec:number)=>{
    stopTimer();
    rawRef.current=sec*10;
    timerRef.current=setInterval(()=>{
      rawRef.current--;
      const pct=(rawRef.current/(sec*10))*100;
      setTimeLeft(Math.max(pct,0));
      setTimeText((rawRef.current/10).toFixed(1)+'s');
      if(rawRef.current<=0){ stopTimer(); endRef.current(false,scoreRef.current,maxComboRef.current,levelRef.current); }
    },100);
  },[stopTimer]);

  const startGame = useCallback((lv:Level)=>{
    stopTimer();
    const qs=shuffle([...STATIC[lv],...genQuestions(lv,5)]);
    setLevel(lv); levelRef.current=lv;
    setQuestions(qs); setQIdx(0);
    setScore(0); scoreRef.current=0;
    setCombo(0); setMaxCombo(0); maxComboRef.current=0;
    setChosen(null); setWon(false); setScreen('game');
    setPills(qs.map((_,i)=>i===0?'current':'idle'));
  },[stopTimer]);

  useEffect(()=>{
    if(screen!=='game'||questions.length===0||qIdx>=questions.length) return;
    setChosen(null);
    startTimer(maxSec(levelRef.current));
    return ()=>stopTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[qIdx,screen,questions.length]);

  const handleAnswer = useCallback((idx:number)=>{
    if(chosen!==null) return;
    stopTimer(); setChosen(idx);
    const q=questions[qIdx], correct=idx===q.a;
    setPills(prev=>prev.map((p,i)=>i===qIdx?correct?'correct':'wrong':i===qIdx+1?'current':p));
    if(correct){
      playSound('correct');
      const ns=score+1, nc=combo+1, nm=Math.max(maxCombo,nc);
      setScore(ns); scoreRef.current=ns;
      setCombo(nc); setMaxCombo(nm); maxComboRef.current=nm;
      if(nc>=3){ playSound('combo'); setComboFlash(`${nc}× COMBO!`); setTimeout(()=>setComboFlash(''),800); }
      setTimeout(()=>{ if(qIdx+1>=questions.length) endGame(true,ns,nm,levelRef.current); else setQIdx(i=>i+1); },380);
    } else {
      playSound('wrong');
      setTimeout(()=>endGame(false,score,maxCombo,levelRef.current),600);
    }
  },[chosen,questions,qIdx,score,combo,maxCombo,stopTimer,endGame]);

  useEffect(()=>()=>stopTimer(),[stopTimer]);

  const q = questions[qIdx];
  const lv = LEVELS.find(l=>l.id===level)!;
  const danger = timeLeft < 15;
  const warning = timeLeft < 30 && !danger;

  return (
    <div className="mc">

      {/* ── LANDING ── */}
      {screen==='landing' && (
        <div className="mc-landing">
          <div className="mc-landing-bg">
            <div className="mc-orb mc-orb1" />
            <div className="mc-orb mc-orb2" />
            <div className="mc-orb mc-orb3" />
          </div>
          <div className="mc-landing-content">
            <div className={`mc-icon-ring ${pulse?'mc-pulse':''}`}>
              <span className="mc-brain">🧠</span>
            </div>
            <h1 className="mc-hero-title">Math<br/>Chaser</h1>
            <div className="mc-hero-badge">PRO</div>
            <p className="mc-hero-sub">Beat the clock. Outsmart the Chaser.</p>
            <button className="mc-cta" onClick={()=>setScreen('levels')}>
              <span>PLAY NOW</span>
              <span className="mc-cta-arrow">→</span>
            </button>
            <div className="mc-stats-row">
              {(['easy','medium','hard','chaser'] as Level[]).map(l=>(
                <div key={l} className="mc-stat-chip">
                  <span className="mc-stat-num">{bests[l]||0}</span>
                  <span className="mc-stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── LEVELS ── */}
      {screen==='levels' && (
        <div className="mc-levels">
          <button className="mc-back" onClick={()=>setScreen('landing')}>← Back</button>
          <h2 className="mc-levels-title">Choose Your<br/><span className="mc-accent">Challenge</span></h2>
          <div className="mc-level-grid">
            {LEVELS.map(lv=>(
              <button key={lv.id} className="mc-level-card" style={{'--c':lv.color,'--g':lv.glow} as React.CSSProperties}
                onClick={()=>startGame(lv.id)}>
                <div className="mc-lc-top">
                  <span className="mc-lc-icon">{lv.icon}</span>
                  <span className="mc-lc-time">{lv.time}</span>
                </div>
                <div className="mc-lc-name">{lv.label}</div>
                <div className="mc-lc-desc">{lv.desc}</div>
                <div className="mc-lc-best">Best: {bests[lv.id]||0}</div>
                <div className="mc-lc-arrow">→</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── GAME ── */}
      {screen==='game' && q && (
        <div className="mc-game" style={{'--lc':lv?.color,'--lg':lv?.glow} as React.CSSProperties}>

          {/* top bar */}
          <div className="mc-top-bar">
            <button className="mc-quit" onClick={()=>setScreen('levels')}>✕</button>
            <div className="mc-pills">
              {pills.map((p,i)=><div key={i} className={`mc-pill mc-pill-${p}`}/>)}
            </div>
            <div className="mc-score-badge">{score}</div>
          </div>

          {/* timer */}
          <div className="mc-timer-wrap">
            <div className="mc-timer-track">
              <div className="mc-timer-fill" style={{
                width:timeLeft+'%',
                background: danger ? '#ef4444' : warning ? '#f59e0b' : lv?.color || '#3b82f6',
                boxShadow: danger ? '0 0 12px #ef4444' : warning ? '0 0 12px #f59e0b' : `0 0 12px ${lv?.color}`,
              }}/>
            </div>
            <span className="mc-timer-text" style={{color: danger?'#ef4444':warning?'#f59e0b':'#94a3b8'}}>
              {timeText}
            </span>
          </div>

          {/* counter */}
          <div className="mc-counter">{qIdx+1} <span style={{color:'#475569'}}>/ {questions.length}</span></div>

          {/* question */}
          <div className="mc-question">{q.q}</div>

          {/* options */}
          <div className="mc-options">
            {q.o.map((opt,i)=>{
              const isCorrect = chosen!==null && i===q.a;
              const isWrong   = chosen!==null && i===chosen && i!==q.a;
              return (
                <button key={i}
                  className={`mc-opt ${isCorrect?'mc-opt-correct':''} ${isWrong?'mc-opt-wrong':''}`}
                  onClick={()=>handleAnswer(i)} disabled={chosen!==null}>
                  <span className="mc-opt-letter">{['A','B','C'][i]}</span>
                  <span className="mc-opt-text">{opt}</span>
                  {isCorrect && <span className="mc-opt-icon">✓</span>}
                  {isWrong   && <span className="mc-opt-icon">✗</span>}
                </button>
              );
            })}
          </div>

          {/* combo */}
          {combo>=2 && (
            <div className="mc-combo-bar">
              <span className="mc-fire">🔥</span>
              <span>{combo}× combo</span>
            </div>
          )}

          {comboFlash && <div className="mc-combo-flash">{comboFlash}</div>}
        </div>
      )}

      {/* ── RESULT ── */}
      {screen==='result' && (
        <div className="mc-result">
          <div className="mc-result-icon">{won?'🏆':'💥'}</div>
          <h2 className="mc-result-title">{won?'You Escaped!':'Chaser Got You!'}</h2>
          <p className="mc-result-sub">{won?'Flawless run! The Chaser never stood a chance.':'Better luck next time. The Chaser is relentless.'}</p>

          <div className="mc-result-cards">
            <div className="mc-result-card">
              <div className="mc-result-num" style={{color:'#fbbf24'}}>{score}</div>
              <div className="mc-result-label">Score</div>
            </div>
            {maxCombo>0&&(
              <div className="mc-result-card">
                <div className="mc-result-num" style={{color:'#f97316'}}>{maxCombo}×</div>
                <div className="mc-result-label">Best Combo</div>
              </div>
            )}
            <div className="mc-result-card">
              <div className="mc-result-num" style={{color:'#10b981'}}>{bests[level]||0}</div>
              <div className="mc-result-label">Personal Best</div>
            </div>
          </div>

          <button className="mc-cta" style={{margin:'0 auto'}} onClick={()=>startGame(level)}>
            <span>PLAY AGAIN</span>
            <span className="mc-cta-arrow">→</span>
          </button>
          <button className="mc-text-btn" onClick={()=>setScreen('levels')}>Choose Different Level</button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

        .mc {
          min-height:100vh;
          background:#04080f;
          color:#e2e8f0;
          font-family:'DM Sans',system-ui,sans-serif;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          padding:24px 16px;
          overflow:hidden;
          position:relative;
        }

        /* ── LANDING ── */
        .mc-landing { width:100%; max-width:480px; text-align:center; position:relative; }
        .mc-landing-bg { position:fixed; inset:0; pointer-events:none; z-index:0; }
        .mc-orb { position:absolute; border-radius:50%; filter:blur(80px); opacity:.35; }
        .mc-orb1 { width:400px; height:400px; background:#7c3aed; top:-100px; left:-100px; }
        .mc-orb2 { width:300px; height:300px; background:#0ea5e9; bottom:-50px; right:-50px; }
        .mc-orb3 { width:200px; height:200px; background:#f59e0b; top:50%; left:50%; transform:translate(-50%,-50%); }
        .mc-landing-content { position:relative; z-index:1; }

        .mc-icon-ring {
          width:100px; height:100px; border-radius:50%;
          background:rgba(255,255,255,.06);
          border:2px solid rgba(255,255,255,.12);
          display:flex; align-items:center; justify-content:center;
          margin:0 auto 24px; transition:transform .6s ease, box-shadow .6s ease;
        }
        .mc-pulse { transform:scale(1.08); box-shadow:0 0 40px rgba(124,58,237,.5); }
        .mc-brain { font-size:48px; }

        .mc-hero-title {
          font-family:'Syne',sans-serif;
          font-size:clamp(52px,12vw,80px);
          font-weight:800; line-height:.95;
          letter-spacing:-3px;
          margin:0 0 12px;
          background:linear-gradient(135deg,#fff 40%,#94a3b8);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .mc-hero-badge {
          display:inline-block;
          padding:4px 14px; border-radius:999px;
          background:linear-gradient(135deg,#fbbf24,#f97316);
          color:#000; font-weight:800; font-size:13px; letter-spacing:2px;
          margin-bottom:16px;
        }
        .mc-hero-sub { color:#64748b; font-size:16px; margin:0 0 36px; }

        .mc-cta {
          display:flex; align-items:center; gap:12px;
          padding:18px 36px; border-radius:16px;
          background:linear-gradient(135deg,#7c3aed,#4f46e5);
          color:#fff; font-size:17px; font-weight:800; letter-spacing:1.5px;
          border:none; cursor:pointer;
          box-shadow:0 8px 32px rgba(124,58,237,.45);
          transition:all .2s; margin:0 auto 28px;
        }
        .mc-cta:hover { transform:translateY(-3px); box-shadow:0 14px 40px rgba(124,58,237,.6); }
        .mc-cta:active { transform:scale(.97); }
        .mc-cta-arrow { font-size:20px; transition:transform .2s; }
        .mc-cta:hover .mc-cta-arrow { transform:translateX(4px); }

        .mc-stats-row { display:flex; gap:12px; justify-content:center; }
        .mc-stat-chip {
          display:flex; flex-direction:column; align-items:center;
          background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08);
          border-radius:12px; padding:10px 16px;
        }
        .mc-stat-num { font-size:20px; font-weight:800; color:#fbbf24; }
        .mc-stat-label { font-size:10px; color:#475569; text-transform:uppercase; letter-spacing:.8px; margin-top:2px; }

        /* ── LEVELS ── */
        .mc-levels { width:100%; max-width:560px; }
        .mc-back {
          background:transparent; border:none; color:#475569;
          font-size:14px; cursor:pointer; padding:0 0 16px; display:block;
          transition:color .2s;
        }
        .mc-back:hover { color:#94a3b8; }
        .mc-levels-title {
          font-family:'Syne',sans-serif;
          font-size:clamp(28px,6vw,40px); font-weight:800;
          line-height:1.1; margin:0 0 28px; letter-spacing:-1px;
        }
        .mc-accent { color:#7c3aed; }
        .mc-level-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media(max-width:480px){ .mc-level-grid { grid-template-columns:1fr; } }

        .mc-level-card {
          position:relative; overflow:hidden;
          display:flex; flex-direction:column; align-items:flex-start;
          padding:20px; border-radius:20px;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          color:#e2e8f0; cursor:pointer; text-align:left;
          transition:all .25s;
        }
        .mc-level-card::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle at 80% 20%, var(--g), transparent 60%);
          opacity:0; transition:opacity .3s;
        }
        .mc-level-card:hover { transform:translateY(-4px); border-color:var(--c); box-shadow:0 12px 32px var(--g); }
        .mc-level-card:hover::before { opacity:1; }
        .mc-lc-top { display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:10px; }
        .mc-lc-icon { font-size:24px; }
        .mc-lc-time {
          font-size:11px; font-weight:700; padding:3px 8px;
          border-radius:999px; background:rgba(255,255,255,.08);
          color:#94a3b8; letter-spacing:.5px;
        }
        .mc-lc-name { font-size:20px; font-weight:800; color:#fff; margin-bottom:4px; }
        .mc-lc-desc { font-size:12px; color:#64748b; margin-bottom:12px; }
        .mc-lc-best { font-size:11px; color:#475569; }
        .mc-lc-arrow {
          position:absolute; right:16px; bottom:16px;
          font-size:18px; color:var(--c); opacity:0;
          transform:translateX(-8px); transition:all .25s;
        }
        .mc-level-card:hover .mc-lc-arrow { opacity:1; transform:translateX(0); }

        /* ── GAME ── */
        .mc-game { width:100%; max-width:560px; display:flex; flex-direction:column; gap:16px; }

        .mc-top-bar { display:flex; align-items:center; gap:12px; }
        .mc-quit {
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
          color:#64748b; width:36px; height:36px; border-radius:10px;
          font-size:14px; cursor:pointer; flex-shrink:0; transition:all .2s;
        }
        .mc-quit:hover { color:#e2e8f0; background:rgba(255,255,255,.1); }
        .mc-pills { display:flex; flex-wrap:wrap; gap:4px; flex:1; }
        .mc-pill { width:9px; height:9px; border-radius:50%; background:rgba(255,255,255,.1); transition:all .3s; }
        .mc-pill-current { background:#fbbf24; transform:scale(1.5); box-shadow:0 0 8px #fbbf24; }
        .mc-pill-correct { background:#10b981; }
        .mc-pill-wrong   { background:#ef4444; }
        .mc-score-badge {
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
          border-radius:10px; padding:6px 14px;
          font-size:18px; font-weight:800; color:#fbbf24;
          flex-shrink:0;
        }

        .mc-timer-wrap { display:flex; align-items:center; gap:12px; }
        .mc-timer-track {
          flex:1; height:6px; border-radius:3px;
          background:rgba(255,255,255,.08); overflow:hidden;
        }
        .mc-timer-fill {
          height:100%; border-radius:3px;
          transition:width .1s linear, background .5s, box-shadow .5s;
        }
        .mc-timer-text { font-size:13px; font-variant-numeric:tabular-nums; min-width:38px; text-align:right; transition:color .3s; }

        .mc-counter { font-size:12px; color:#334155; text-align:center; letter-spacing:.5px; }

        .mc-question {
          font-family:'Syne',sans-serif;
          font-size:clamp(32px,7vw,52px); font-weight:800;
          text-align:center; letter-spacing:-1px;
          min-height:80px; display:flex; align-items:center; justify-content:center;
          line-height:1;
        }

        .mc-options { display:flex; flex-direction:column; gap:10px; }
        .mc-opt {
          display:flex; align-items:center; gap:16px;
          padding:16px 20px; border-radius:16px;
          background:rgba(255,255,255,.05);
          border:1.5px solid rgba(255,255,255,.08);
          color:#e2e8f0; cursor:pointer; text-align:left;
          transition:all .18s; position:relative; overflow:hidden;
        }
        .mc-opt::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.04),transparent);
          opacity:0; transition:opacity .2s;
        }
        .mc-opt:not(:disabled):hover { border-color:rgba(255,255,255,.25); background:rgba(255,255,255,.09); transform:translateX(4px); }
        .mc-opt:not(:disabled):hover::before { opacity:1; }
        .mc-opt:disabled { cursor:default; }
        .mc-opt-letter {
          width:32px; height:32px; border-radius:10px; flex-shrink:0;
          background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.1);
          display:flex; align-items:center; justify-content:center;
          font-size:13px; font-weight:800; color:#64748b;
        }
        .mc-opt-text { font-size:20px; font-weight:700; flex:1; }
        .mc-opt-icon { font-size:20px; font-weight:900; }

        .mc-opt-correct {
          background:rgba(16,185,129,.15) !important;
          border-color:#10b981 !important;
          animation:slideIn .3s ease;
        }
        .mc-opt-correct .mc-opt-letter { background:rgba(16,185,129,.3); color:#6ee7b7; border-color:#10b981; }
        .mc-opt-correct .mc-opt-text { color:#6ee7b7; }

        .mc-opt-wrong {
          background:rgba(239,68,68,.15) !important;
          border-color:#ef4444 !important;
          animation:shake .35s ease;
        }
        .mc-opt-wrong .mc-opt-letter { background:rgba(239,68,68,.3); color:#fca5a5; border-color:#ef4444; }
        .mc-opt-wrong .mc-opt-text { color:#fca5a5; }

        @keyframes slideIn { 0%{transform:translateX(-8px);opacity:.5} 100%{transform:translateX(0);opacity:1} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }

        .mc-combo-bar {
          display:flex; align-items:center; justify-content:center; gap:8px;
          font-size:14px; font-weight:700; color:#fbbf24;
          background:rgba(251,191,36,.08); border:1px solid rgba(251,191,36,.2);
          border-radius:999px; padding:8px 20px;
          animation:fadeUp .3s ease;
        }
        .mc-fire { font-size:18px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        .mc-combo-flash {
          position:fixed; top:40%; left:50%; transform:translate(-50%,-50%);
          font-family:'Syne',sans-serif;
          font-size:56px; font-weight:800; color:#fbbf24;
          text-shadow:0 0 40px rgba(251,191,36,.7);
          animation:comboAnim .8s ease-out forwards;
          pointer-events:none; z-index:100;
        }
        @keyframes comboAnim {
          0%  { opacity:0; transform:translate(-50%,-50%) scale(.5); }
          40% { opacity:1; transform:translate(-50%,-50%) scale(1.1); }
          100%{ opacity:0; transform:translate(-50%,-70%) scale(1); }
        }

        /* ── RESULT ── */
        .mc-result { width:100%; max-width:480px; text-align:center; }
        .mc-result-icon { font-size:80px; margin-bottom:16px; }
        .mc-result-title {
          font-family:'Syne',sans-serif;
          font-size:clamp(32px,7vw,48px); font-weight:800;
          margin:0 0 8px; letter-spacing:-1px;
        }
        .mc-result-sub { color:#475569; font-size:14px; margin:0 0 32px; }
        .mc-result-cards { display:flex; gap:12px; justify-content:center; margin-bottom:32px; flex-wrap:wrap; }
        .mc-result-card {
          background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08);
          border-radius:20px; padding:20px 24px; min-width:100px;
        }
        .mc-result-num { font-family:'Syne',sans-serif; font-size:36px; font-weight:800; line-height:1; margin-bottom:4px; }
        .mc-result-label { font-size:11px; color:#475569; text-transform:uppercase; letter-spacing:.8px; }
        .mc-text-btn {
          background:transparent; border:none; color:#334155;
          font-size:14px; cursor:pointer; margin-top:12px; display:block; margin-left:auto; margin-right:auto;
          transition:color .2s;
        }
        .mc-text-btn:hover { color:#64748b; }
      `}</style>
    </div>
  );
}