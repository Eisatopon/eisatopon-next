'use client';

import { useState, useEffect } from 'react';

/* ─── Types ─────────────────────────────────────────── */
interface Question { category: string; text: string; }
interface CategoryResult { total: number; count: number; }

/* ─── Question bank ──────────────────────────────────── */
const QUESTIONS: Question[] = [
  // Number Sense (10)
  { category: 'Number Sense', text: 'I have difficulty understanding what a number represents (e.g. that 5 is more than 3).' },
  { category: 'Number Sense', text: 'I find it hard to tell which of two numbers is larger.' },
  { category: 'Number Sense', text: 'I confuse similar-looking digits (e.g. 6 and 9, 3 and 8).' },
  { category: 'Number Sense', text: 'I struggle to estimate quantities (e.g. how many people are in a room).' },
  { category: 'Number Sense', text: 'I have trouble understanding number relationships (e.g. that 10 = 5 + 5).' },
  { category: 'Number Sense', text: 'I find it difficult to read or write large numbers.' },
  { category: 'Number Sense', text: 'I have trouble understanding place value (units, tens, hundreds).' },
  { category: 'Number Sense', text: 'I do not easily understand fractions (e.g. 1/2, 3/4).' },
  { category: 'Number Sense', text: 'I mix up the + and − signs, or × and ÷.' },
  { category: 'Number Sense', text: 'I find sequential counting difficult (1, 2, 3, 4…).' },

  // Mental Arithmetic (10)
  { category: 'Mental Arithmetic', text: 'I struggle to add simple numbers in my head (e.g. 7 + 5).' },
  { category: 'Mental Arithmetic', text: 'I still need to count on my fingers even for simple calculations.' },
  { category: 'Mental Arithmetic', text: 'I cannot do mental subtraction (e.g. 15 − 8).' },
  { category: 'Mental Arithmetic', text: 'I lose track of the steps when calculating in my head.' },
  { category: 'Mental Arithmetic', text: 'I find it hard to work out change when paying in a shop.' },
  { category: 'Mental Arithmetic', text: 'I need a lot of time to solve even simple math problems.' },
  { category: 'Mental Arithmetic', text: 'I cannot judge whether an answer is reasonable or not.' },
  { category: 'Mental Arithmetic', text: 'I get confused when a problem requires more than one step.' },
  { category: 'Mental Arithmetic', text: 'I find division or multiplication difficult without a calculator.' },
  { category: 'Mental Arithmetic', text: 'I get wrong answers even when I know the correct method.' },

  // Times Tables (8)
  { category: 'Times Tables', text: 'I have not memorised the 2× table.' },
  { category: 'Times Tables', text: 'I struggle with the 3×, 4× and 5× tables.' },
  { category: 'Times Tables', text: 'The 6×, 7×, 8× and 9× tables are very difficult for me.' },
  { category: 'Times Tables', text: 'I forget the answers even if I have learnt them before.' },
  { category: 'Times Tables', text: 'I need to count or calculate each time rather than recall from memory.' },
  { category: 'Times Tables', text: 'I do not understand the logic behind multiplication.' },
  { category: 'Times Tables', text: 'I feel anxious when asked to answer times-table questions quickly.' },
  { category: 'Times Tables', text: 'I avoid tasks that involve multiplication.' },

  // Space & Time (8)
  { category: 'Space & Time', text: 'I have difficulty reading the time on an analogue clock.' },
  { category: 'Space & Time', text: 'I find it hard to judge how much time has passed.' },
  { category: 'Space & Time', text: 'I get confused following left/right directions.' },
  { category: 'Space & Time', text: 'I struggle to estimate distances.' },
  { category: 'Space & Time', text: 'I cannot easily judge the size or weight of objects.' },
  { category: 'Space & Time', text: 'I mix up the order of events (what happened first, what came next).' },
  { category: 'Space & Time', text: 'I find maps or diagrams hard to understand.' },
  { category: 'Space & Time', text: 'I cannot easily visualise shapes or objects in my mind.' },

  // Money & Daily Life (8)
  { category: 'Money & Daily Life', text: 'I find it difficult to count money (coins and notes).' },
  { category: 'Money & Daily Life', text: 'I cannot easily calculate the total cost of my shopping.' },
  { category: 'Money & Daily Life', text: 'I feel anxious when paying or receiving change.' },
  { category: 'Money & Daily Life', text: 'I struggle to manage a budget or small amounts of money.' },
  { category: 'Money & Daily Life', text: 'I do not understand concepts such as "discount" or "VAT".' },
  { category: 'Money & Daily Life', text: 'I get confused calculating percentages (e.g. 20% off).' },
  { category: 'Money & Daily Life', text: 'I find it difficult to plan my schedule based on time.' },
  { category: 'Money & Daily Life', text: 'I avoid situations that require calculation (e.g. splitting a bill).' },

  // Emotional Impact (6)
  { category: 'Emotional Impact', text: 'I feel anxious or afraid when I have to do maths.' },
  { category: 'Emotional Impact', text: 'I avoid classes or activities that involve numbers.' },
  { category: 'Emotional Impact', text: 'I feel that I am "stupid" at maths.' },
  { category: 'Emotional Impact', text: 'My maths grades are much lower than in other subjects.' },
  { category: 'Emotional Impact', text: 'I need much more time than my classmates to complete maths tasks.' },
  { category: 'Emotional Impact', text: 'I have lost confidence in myself because of maths.' },
];

const OPTIONS = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];

const CATEGORY_COLORS: Record<string, string> = {
  'Number Sense':      '#3b82f6',
  'Mental Arithmetic': '#8b5cf6',
  'Times Tables':      '#f59e0b',
  'Space & Time':      '#10b981',
  'Money & Daily Life':'#ec4899',
  'Emotional Impact':  '#ef4444',
};

/* ─── Helpers ────────────────────────────────────────── */
function getInterpretation(pct: number) {
  if (pct <= 25) return {
    level: 'Low Likelihood',
    icon: '✅',
    color: '#10b981',
    bg: 'rgba(16,185,129,.08)',
    border: 'rgba(16,185,129,.3)',
    headline: 'Low Likelihood of Dyscalculia',
    body: 'Your responses do not suggest significant mathematical difficulties associated with dyscalculia. Continue practising and developing your skills.',
    recs: [
      'Keep up regular maths practice',
      'Explore advanced topics that interest you',
      'Support classmates who find maths difficult',
    ],
  };
  if (pct <= 50) return {
    level: 'Moderate Difficulties',
    icon: '⚠️',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,.08)',
    border: 'rgba(245,158,11,.3)',
    headline: 'Some Mathematical Difficulties Detected',
    body: 'Your responses suggest difficulties in certain areas of mathematics. Additional support and targeted practice are recommended.',
    recs: [
      'Speak with your teacher about targeted help',
      'Use educational tools and maths games',
      'Practise in small, consistent daily steps',
      'Consider tutoring support if needed',
    ],
  };
  if (pct <= 75) return {
    level: 'Significant Difficulties',
    icon: '🔴',
    color: '#ef4444',
    bg: 'rgba(239,68,68,.08)',
    border: 'rgba(239,68,68,.3)',
    headline: 'Significant Difficulties — Possible Dyscalculia',
    body: 'Your responses indicate significant difficulties across several areas of mathematics. A full assessment by a specialist is strongly recommended.',
    recs: [
      'Consult a learning disabilities specialist as soon as possible',
      'Inform your teachers about your difficulties',
      'Request an individualised support plan',
      'Use assistive tools (calculator, visual aids)',
      'Remember: dyscalculia does not affect overall intelligence',
    ],
  };
  return {
    level: 'High Likelihood',
    icon: '🚨',
    color: '#ef4444',
    bg: 'rgba(239,68,68,.10)',
    border: 'rgba(239,68,68,.4)',
    headline: 'Very Significant Difficulties — High Likelihood of Dyscalculia',
    body: 'Your responses show very extensive and significant mathematical difficulties. Urgent referral to a specialist for formal assessment and immediate intervention is recommended.',
    recs: [
      '⚠️ URGENT: See a learning disabilities specialist immediately',
      'Request a formal assessment and diagnosis',
      'Inform your school for specialised educational support',
      'Explore individualised teaching programmes',
      'Remember: many people with dyscalculia excel in other areas',
    ],
  };
}

/* ─── Component ──────────────────────────────────────── */
export default function DyscalculiaTest() {
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState<(number|null)[]>(Array(QUESTIONS.length).fill(null));
  const [done, setDone]         = useState(false);
  const [animKey, setAnimKey]   = useState(0);

  const q   = QUESTIONS[current];
  const ans = answers[current];
  const total = QUESTIONS.length;
  const pct  = ((current + 1) / total) * 100;

  function select(i: number) {
    setAnswers(prev => { const a = [...prev]; a[current] = i; return a; });
  }

  function next() {
    if (current < total - 1) {
      setCurrent(c => c + 1);
      setAnimKey(k => k + 1);
    } else {
      setDone(true);
    }
  }

  function prev() {
    if (current > 0) { setCurrent(c => c - 1); setAnimKey(k => k + 1); }
  }

  /* ── RESULTS ── */
  if (done) {
    const filled = answers.filter(a => a !== null) as number[];
    const totalScore = filled.reduce((s, a) => s + a, 0);
    const maxScore   = total * 4;
    const scorePct   = (totalScore / maxScore) * 100;
    const interp     = getInterpretation(scorePct);

    const cats: Record<string, CategoryResult> = {};
    QUESTIONS.forEach((q, i) => {
      if (!cats[q.category]) cats[q.category] = { total: 0, count: 0 };
      cats[q.category].total += (answers[i] ?? 0);
      cats[q.category].count++;
    });

    return (
      <div className="dt-root">
        <div className="dt-result-wrap">
          <div className="dt-result-header">
            <div className="dt-result-icon">{interp.icon}</div>
            <h1 className="dt-result-title">Assessment Complete</h1>
            <p className="dt-result-sub">Here is your personalised screening report</p>
          </div>

          {/* score */}
          <div className="dt-score-card" style={{'--ic': interp.color} as React.CSSProperties}>
            <div className="dt-score-num" style={{color: interp.color}}>{scorePct.toFixed(0)}%</div>
            <div className="dt-score-label">Overall Difficulty Score</div>
            <div className="dt-score-level" style={{color: interp.color, background: interp.bg, border: `1px solid ${interp.border}`}}>
              {interp.level}
            </div>
          </div>

          {/* interpretation */}
          <div className="dt-interp" style={{background: interp.bg, borderColor: interp.border}}>
            <h2 className="dt-interp-title" style={{color: interp.color}}>{interp.headline}</h2>
            <p className="dt-interp-body">{interp.body}</p>
          </div>

          {/* category breakdown */}
          <div className="dt-cats">
            <h3 className="dt-section-title">Results by Category</h3>
            {Object.entries(cats).map(([cat, data]) => {
              const cpct = (data.total / (data.count * 4)) * 100;
              const col  = CATEGORY_COLORS[cat] ?? '#3b82f6';
              return (
                <div key={cat} className="dt-cat-row">
                  <div className="dt-cat-header">
                    <span className="dt-cat-name">{cat}</span>
                    <span className="dt-cat-pct" style={{color: col}}>{cpct.toFixed(0)}%</span>
                  </div>
                  <div className="dt-cat-track">
                    <div className="dt-cat-fill" style={{width: cpct+'%', background: col}} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* recommendations */}
          <div className="dt-recs">
            <h3 className="dt-recs-title">💡 Recommendations</h3>
            <ul className="dt-recs-list">
              {interp.recs.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          {/* disclaimer */}
          <div className="dt-disclaimer">
            <strong>⚠️ Important Notice</strong>
            This screening tool is designed for initial awareness only and does NOT constitute a formal diagnosis. Only qualified healthcare or educational professionals can diagnose dyscalculia. If your results concern you, please consult a school psychologist, educational psychologist, or specialist in learning difficulties.
          </div>

          {/* actions */}
          <div className="dt-actions">
            <button className="dt-btn dt-btn-primary" onClick={() => window.print()}>🖨️ Print Results</button>
            <button className="dt-btn dt-btn-ghost" onClick={() => { setAnswers(Array(total).fill(null)); setCurrent(0); setDone(false); }}>🔄 Retake Test</button>
          </div>
        </div>

        <style>{STYLES}</style>
      </div>
    );
  }

  /* ── QUIZ ── */
  return (
    <div className="dt-root">
      <div className="dt-wrap">

        {/* header */}
        <header className="dt-header">
          <a href="/" className="dt-home-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            <span>EisatoponAI</span>
          </a>
          <div className="dt-header-inner">
            <div className="dt-badge" style={{background: `color-mix(in srgb,${CATEGORY_COLORS[q.category]} 15%,transparent)`, color: CATEGORY_COLORS[q.category]}}>
              {q.category}
            </div>
            <h1 className="dt-title">Dyscalculia Screening Assessment</h1>
            <p className="dt-subtitle">Answer honestly — there are no right or wrong answers</p>
          </div>
        </header>

        {/* progress */}
        <div className="dt-progress">
          <div className="dt-progress-info">
            <span>Question {current + 1} of {total}</span>
            <span style={{color: CATEGORY_COLORS[q.category]}}>{q.category}</span>
          </div>
          <div className="dt-progress-track">
            <div className="dt-progress-fill" style={{width: pct+'%', background: `linear-gradient(90deg,${CATEGORY_COLORS[q.category]},${CATEGORY_COLORS[q.category]}aa)`}} />
          </div>
        </div>

        {/* question */}
        <div key={animKey} className="dt-question">
          <div className="dt-q-number">Q{current + 1}</div>
          <p className="dt-q-text">{q.text}</p>

          <div className="dt-options">
            {OPTIONS.map((opt, i) => (
              <button key={i} className={`dt-option ${ans === i ? 'dt-option-selected' : ''}`}
                style={ans === i ? {'--oc': CATEGORY_COLORS[q.category]} as React.CSSProperties : {}}
                onClick={() => select(i)}>
                <div className="dt-option-dot" style={ans === i ? {background: CATEGORY_COLORS[q.category], borderColor: CATEGORY_COLORS[q.category]} : {}} />
                <span className="dt-option-label">{opt}</span>
                <span className="dt-option-score">{i}</span>
              </button>
            ))}
          </div>
        </div>

        {/* nav */}
        <div className="dt-nav">
          <button className="dt-btn dt-btn-ghost" onClick={prev} style={{visibility: current === 0 ? 'hidden' : 'visible'}}>← Previous</button>
          <div className="dt-dots">
            {Array.from({length: Math.ceil(total/10)}, (_, i) => {
              const start = i * 10, end = Math.min(start + 10, total);
              const filled = answers.slice(start, end).filter(a => a !== null).length;
              return <div key={i} className={`dt-dot ${filled === end-start ? 'dt-dot-done' : filled > 0 ? 'dt-dot-partial' : ''}`} />;
            })}
          </div>
          <button className="dt-btn dt-btn-primary" onClick={next} disabled={ans === null}
            style={ans !== null ? {background: CATEGORY_COLORS[q.category]} : {}}>
            {current === total - 1 ? 'See Results →' : 'Next →'}
          </button>
        </div>

      </div>
      <style>{STYLES}</style>
    </div>
  );
}

/* ─── Styles ─────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

  .dt-root {
    min-height:100vh;
    background:#04080f;
    color:#e2e8f0;
    font-family:'DM Sans',system-ui,sans-serif;
    padding:24px 16px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
  }

  .dt-wrap {
    width:100%;
    max-width:720px;
    display:flex;
    flex-direction:column;
    gap:0;
  }

  /* header */
  .dt-header {
    background:linear-gradient(135deg,rgba(59,130,246,.15),rgba(139,92,246,.1));
    border:1px solid rgba(255,255,255,.07);
    border-radius:24px 24px 0 0;
    padding:36px 32px 28px;
    display:flex; flex-direction:column; align-items:flex-start;
  }
  .dt-header-inner { width:100%; text-align:center; }
  .dt-home-back {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 14px; border-radius:999px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    color:#64748b; text-decoration:none;
    font-size:11px; font-weight:700;
    letter-spacing:.1em; text-transform:uppercase;
    transition:all .2s ease;
    margin-bottom:20px;
  }
  .dt-home-back svg { transition:transform .2s ease; }
  .dt-home-back:hover {
    border-color:rgba(59,130,246,.4);
    color:#60a5fa;
    background:rgba(59,130,246,.08);
  }
  .dt-home-back:hover svg { transform:translateX(-3px); }
  .dt-badge {
    display:inline-block;
    padding:5px 16px;
    border-radius:999px;
    font-size:12px;
    font-weight:700;
    letter-spacing:.5px;
    text-transform:uppercase;
    margin-bottom:14px;
    transition:all .3s;
  }
  .dt-title {
    font-family:'Syne',sans-serif;
    font-size:clamp(20px,4vw,28px);
    font-weight:800;
    letter-spacing:-.5px;
    margin:0 0 8px;
    background:linear-gradient(135deg,#fff,#94a3b8);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .dt-subtitle { font-size:13px; color:#475569; margin:0; }

  /* progress */
  .dt-progress {
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    border-top:none;
    padding:16px 32px;
  }
  .dt-progress-info {
    display:flex;
    justify-content:space-between;
    font-size:12px;
    color:#64748b;
    margin-bottom:10px;
    font-weight:600;
    text-transform:uppercase;
    letter-spacing:.5px;
  }
  .dt-progress-track {
    height:4px;
    background:rgba(255,255,255,.08);
    border-radius:2px;
    overflow:hidden;
  }
  .dt-progress-fill {
    height:100%;
    border-radius:2px;
    transition:width .4s ease;
  }

  /* question */
  .dt-question {
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    border-top:none;
    padding:32px;
    animation:dtFade .35s ease;
  }
  @keyframes dtFade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  .dt-q-number {
    font-family:'Syne',sans-serif;
    font-size:11px;
    font-weight:800;
    letter-spacing:2px;
    color:#334155;
    text-transform:uppercase;
    margin-bottom:12px;
  }
  .dt-q-text {
    font-size:clamp(16px,3vw,20px);
    font-weight:500;
    line-height:1.55;
    color:#e2e8f0;
    margin:0 0 28px;
  }

  /* options */
  .dt-options { display:flex; flex-direction:column; gap:10px; }
  .dt-option {
    display:flex;
    align-items:center;
    gap:14px;
    padding:14px 18px;
    border-radius:14px;
    border:1.5px solid rgba(255,255,255,.08);
    background:rgba(255,255,255,.04);
    color:#94a3b8;
    cursor:pointer;
    transition:all .18s;
    text-align:left;
  }
  .dt-option:hover { border-color:rgba(255,255,255,.2); background:rgba(255,255,255,.08); color:#e2e8f0; }
  .dt-option-selected {
    border-color:var(--oc) !important;
    background:color-mix(in srgb,var(--oc) 12%,transparent) !important;
    color:#e2e8f0 !important;
  }
  .dt-option-dot {
    width:18px; height:18px; border-radius:50%; flex-shrink:0;
    border:2px solid #334155;
    transition:all .18s;
  }
  .dt-option-label { flex:1; font-size:15px; font-weight:500; }
  .dt-option-score { font-size:11px; color:#334155; }

  /* nav */
  .dt-nav {
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    border-top:none;
    border-radius:0 0 24px 24px;
    padding:20px 32px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:16px;
  }
  .dt-dots { display:flex; gap:6px; }
  .dt-dot {
    width:8px; height:8px; border-radius:50%;
    background:rgba(255,255,255,.1);
    transition:all .3s;
  }
  .dt-dot-partial { background:rgba(255,255,255,.3); }
  .dt-dot-done { background:#10b981; }

  /* buttons */
  .dt-btn {
    padding:11px 22px; border-radius:12px;
    font-weight:700; font-size:13px; cursor:pointer;
    transition:all .2s; border:1px solid transparent;
    white-space:nowrap;
  }
  .dt-btn:disabled { opacity:.3; cursor:not-allowed; }
  .dt-btn-primary {
    background:#3b82f6; color:#fff;
    box-shadow:0 4px 14px rgba(59,130,246,.3);
    transition:background .3s, box-shadow .2s;
  }
  .dt-btn-primary:not(:disabled):hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(59,130,246,.4); }
  .dt-btn-ghost {
    background:transparent;
    border-color:rgba(255,255,255,.1);
    color:#64748b;
  }
  .dt-btn-ghost:hover { color:#94a3b8; border-color:rgba(255,255,255,.2); }

  /* ── RESULTS ── */
  .dt-result-wrap {
    width:100%; max-width:720px;
    display:flex; flex-direction:column; gap:16px;
  }
  .dt-result-header {
    text-align:center; padding:36px 32px 24px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    border-radius:24px;
  }
  .dt-result-icon { font-size:56px; margin-bottom:12px; }
  .dt-result-title {
    font-family:'Syne',sans-serif;
    font-size:clamp(24px,5vw,36px); font-weight:800; letter-spacing:-.5px;
    margin:0 0 8px; color:#fff;
  }
  .dt-result-sub { font-size:14px; color:#475569; margin:0; }

  .dt-score-card {
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    border-radius:20px;
    padding:32px;
    text-align:center;
  }
  .dt-score-num {
    font-family:'Syne',sans-serif;
    font-size:72px; font-weight:800; line-height:1;
    margin-bottom:8px;
  }
  .dt-score-label { font-size:13px; color:#475569; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px; }
  .dt-score-level {
    display:inline-block;
    padding:6px 20px; border-radius:999px;
    font-size:13px; font-weight:700;
  }

  .dt-interp {
    padding:24px 28px; border-radius:16px; border:1px solid;
  }
  .dt-interp-title { font-size:18px; font-weight:800; margin:0 0 10px; }
  .dt-interp-body { font-size:14px; color:#94a3b8; line-height:1.65; margin:0; }

  .dt-cats {
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    border-radius:20px; padding:24px 28px;
  }
  .dt-section-title { font-size:14px; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:1px; margin:0 0 18px; }
  .dt-cat-row { margin-bottom:14px; }
  .dt-cat-row:last-child { margin-bottom:0; }
  .dt-cat-header { display:flex; justify-content:space-between; margin-bottom:6px; }
  .dt-cat-name { font-size:13px; color:#94a3b8; }
  .dt-cat-pct { font-size:13px; font-weight:700; }
  .dt-cat-track { height:6px; background:rgba(255,255,255,.08); border-radius:3px; overflow:hidden; }
  .dt-cat-fill { height:100%; border-radius:3px; transition:width 1s ease; }

  .dt-recs {
    background:rgba(16,185,129,.06);
    border:1px solid rgba(16,185,129,.2);
    border-radius:16px; padding:24px 28px;
  }
  .dt-recs-title { font-size:15px; font-weight:800; color:#10b981; margin:0 0 14px; }
  .dt-recs-list { margin:0 0 0 18px; padding:0; color:#94a3b8; font-size:14px; line-height:1.7; }

  .dt-disclaimer {
    background:rgba(239,68,68,.06);
    border:1px solid rgba(239,68,68,.2);
    border-radius:14px; padding:20px 24px;
    font-size:13px; color:#94a3b8; line-height:1.65;
  }
  .dt-disclaimer strong { display:block; color:#ef4444; margin-bottom:8px; font-size:14px; }

  .dt-actions {
    display:flex; gap:12px; justify-content:center; flex-wrap:wrap;
    padding-bottom:40px;
  }

  @media(max-width:480px){
    .dt-header, .dt-question, .dt-nav { padding:24px 20px; }
    .dt-progress { padding:14px 20px; }
    .dt-score-num { font-size:56px; }
  }

  @media print {
    .dt-root { background:#fff; color:#000; }
    .dt-actions { display:none; }
  }
`;