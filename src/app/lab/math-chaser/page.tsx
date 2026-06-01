'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type Level  = 'easy' | 'medium' | 'hard' | 'chaser';
type Screen = 'landing' | 'levels' | 'game' | 'result' | 'stats';
type PU     = 'time' | 'fifty' | 'skip';

interface Question { q: string; o: string[]; a: number; topic: string; }
interface PlayerData {
  xp: number; streak: number; lastPlayed: string;
  bests: Record<string, number>;
  topicStats: Record<string, { correct: number; total: number }>;
  achievements: string[];
  leaderboard: { score: number; level: Level; date: string; combo: number }[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function rnd(min: number, max: number) { return Math.floor(Math.random()*(max-min+1))+min; }
function shuffle<T>(arr: T[]): T[] {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

// ─── XP / Leveling ───────────────────────────────────────────────────────────
const XP_TIERS = [
  {title:'Novice',   color:'#64748b', min:0},
  {title:'Explorer', color:'#10b981', min:50},
  {title:'Thinker',  color:'#3b82f6', min:150},
  {title:'Scholar',  color:'#8b5cf6', min:300},
  {title:'Expert',   color:'#f59e0b', min:500},
  {title:'Master',   color:'#ef4444', min:800},
  {title:'Legend',   color:'#fbbf24', min:1200},
];
function getXpLevel(xp: number) {
  for(let i=XP_TIERS.length-1;i>=0;i--) {
    if(xp>=XP_TIERS[i].min) {
      const next = XP_TIERS[i+1]?.min ?? XP_TIERS[i].min+1000;
      return {...XP_TIERS[i], next, pct: Math.min(((xp-XP_TIERS[i].min)/(next-XP_TIERS[i].min))*100,100)};
    }
  }
  return {...XP_TIERS[0], next:50, pct:0};
}

// ─── Achievements ────────────────────────────────────────────────────────────
const ACHIEVEMENTS: Record<string,{icon:string;name:string;desc:string}> = {
  first_win:    {icon:'🏆',name:'First Victory',   desc:'Win your first game'},
  perfect:      {icon:'💯',name:'Perfect Run',     desc:'Answer all questions correctly'},
  combo5:       {icon:'🔥',name:'On Fire',         desc:'Reach a 5× combo'},
  combo10:      {icon:'⚡',name:'Lightning',        desc:'Reach a 10× combo'},
  chaser_win:   {icon:'💀',name:'Chaser Slayer',   desc:'Win on Chaser difficulty'},
  streak7:      {icon:'📅',name:'Week Streak',     desc:'Play 7 days in a row'},
  xp500:        {icon:'🧠',name:'Big Brain',       desc:'Reach 500 XP'},
  score20:      {icon:'🎯',name:'Sharp Mind',      desc:'Score 20 in one game'},
};

// ─── Player persistence ───────────────────────────────────────────────────────
const EMPTY_PLAYER: PlayerData = {xp:0,streak:0,lastPlayed:'',bests:{},topicStats:{},achievements:[],leaderboard:[]};
function loadPlayer(): PlayerData {
  try { const d=localStorage.getItem('mc_v2'); if(d) return {...EMPTY_PLAYER,...JSON.parse(d)}; } catch{/**/}
  return {...EMPTY_PLAYER};
}
function savePlayer(p: PlayerData) { try{localStorage.setItem('mc_v2',JSON.stringify(p));}catch{/**/} }

// ─── Sound ───────────────────────────────────────────────────────────────────
function tone(f: number, dur: number, type: OscillatorType='sine', vol=0.18) {
  try {
    const ctx=new (window.AudioContext||(window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext)();
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.type=type; o.connect(g); g.connect(ctx.destination);
    o.frequency.setValueAtTime(f,ctx.currentTime);
    g.gain.setValueAtTime(vol,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    o.start(); o.stop(ctx.currentTime+dur);
  } catch{/**/}
}
function playSound(t:'correct'|'wrong'|'combo'|'pu'|'tick'|'unlock') {
  if(t==='correct'){tone(523,.07);setTimeout(()=>tone(659,.07),70);setTimeout(()=>tone(784,.1),140);}
  else if(t==='wrong'){tone(200,.3,'sawtooth',.12);}
  else if(t==='combo'){[523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.1),i*55));}
  else if(t==='pu'){tone(440,.05);setTimeout(()=>tone(880,.08),50);}
  else if(t==='tick'){tone(800,.03,'square',.04);}
  else if(t==='unlock'){[784,880,1047].forEach((f,i)=>setTimeout(()=>tone(f,.12),i*80));}
}

// ─── Questions ───────────────────────────────────────────────────────────────
const TOPIC_COLOR: Record<string,string> = {
  Arithmetic:'#3b82f6',Powers:'#8b5cf6',Roots:'#10b981',Geometry:'#06b6d4',
  Algebra:'#f59e0b',Calculus:'#ef4444',Trigonometry:'#ec4899','Number Theory':'#f97316',
  Logic:'#14b8a6',Sequences:'#a78bfa',Percentages:'#84cc16',Logarithms:'#fb923c',
  Complex:'#e879f9',Limits:'#38bdf8',Combinatorics:'#4ade80',Constants:'#fbbf24',
};

const POOL: Record<Level,Question[]> = {
  easy: [
    {q:'4 + 7 =',o:['9','11','13'],a:1,topic:'Arithmetic'},
    {q:'8 × 5 =',o:['35','40','45'],a:1,topic:'Arithmetic'},
    {q:'15 − 6 =',o:['7','8','9'],a:2,topic:'Arithmetic'},
    {q:'√64 =',o:['6','7','8'],a:2,topic:'Roots'},
    {q:'25 + 38 =',o:['61','63','65'],a:1,topic:'Arithmetic'},
    {q:'9 × 9 =',o:['72','81','90'],a:1,topic:'Arithmetic'},
    {q:'100 ÷ 4 =',o:['20','25','30'],a:1,topic:'Arithmetic'},
    {q:'Half of 48',o:['20','22','24'],a:2,topic:'Arithmetic'},
    {q:'7² =',o:['42','49','56'],a:1,topic:'Powers'},
    {q:'80 − 37 =',o:['41','43','45'],a:1,topic:'Arithmetic'},
    {q:'√100 =',o:['9','10','11'],a:1,topic:'Roots'},
    {q:'6 × 7 − 8 =',o:['32','34','36'],a:1,topic:'Arithmetic'},
    {q:'Minutes in 2 hours?',o:['100','120','140'],a:1,topic:'Logic'},
    {q:'Equilateral angle?',o:['45°','60°','90°'],a:1,topic:'Geometry'},
    {q:'2³ =',o:['6','8','10'],a:1,topic:'Powers'},
    {q:'Next prime after 7?',o:['9','11','13'],a:1,topic:'Number Theory'},
    {q:'Sides of a hexagon?',o:['5','6','7'],a:1,topic:'Geometry'},
    {q:'14 × 2 =',o:['26','28','30'],a:1,topic:'Arithmetic'},
    {q:'36 ÷ 6 =',o:['5','6','7'],a:1,topic:'Arithmetic'},
    {q:'√49 =',o:['6','7','8'],a:1,topic:'Roots'},
    {q:'1+2+3+4+5 =',o:['13','15','17'],a:1,topic:'Sequences'},
    {q:'Diagonals of a square?',o:['2','3','4'],a:0,topic:'Geometry'},
    {q:'3 × 12 + 9 =',o:['42','45','48'],a:1,topic:'Arithmetic'},
    {q:'12² =',o:['124','144','164'],a:1,topic:'Powers'},
    {q:'Seconds in a minute?',o:['30','60','100'],a:1,topic:'Logic'},
    {q:'½ of 100 =',o:['40','50','60'],a:1,topic:'Arithmetic'},
    {q:'4² =',o:['8','12','16'],a:2,topic:'Powers'},
    {q:'60 ÷ 5 =',o:['10','12','15'],a:1,topic:'Arithmetic'},
    {q:'Sum of angles in a triangle?',o:['90°','180°','270°'],a:1,topic:'Geometry'},
    {q:'10 × 10 =',o:['10','100','1000'],a:1,topic:'Arithmetic'},
  ],
  medium: [
    {q:'12 × 8 =',o:['88','96','104'],a:1,topic:'Arithmetic'},
    {q:'144 ÷ 12 =',o:['10','12','14'],a:1,topic:'Arithmetic'},
    {q:'5² + 3² =',o:['32','34','36'],a:1,topic:'Powers'},
    {q:'20% of 150',o:['25','30','35'],a:1,topic:'Percentages'},
    {q:'(8+4) × 5 =',o:['50','60','70'],a:1,topic:'Arithmetic'},
    {q:'3³ =',o:['21','24','27'],a:2,topic:'Powers'},
    {q:'GCD(12, 18) =',o:['4','6','8'],a:1,topic:'Number Theory'},
    {q:'6² − 4² =',o:['16','20','24'],a:1,topic:'Powers'},
    {q:'√144 =',o:['10','12','14'],a:1,topic:'Roots'},
    {q:'25% of 200 =',o:['40','50','60'],a:1,topic:'Percentages'},
    {q:'72 ÷ 8 + 15 =',o:['22','24','26'],a:1,topic:'Arithmetic'},
    {q:'(20−8) × 3 =',o:['30','36','42'],a:1,topic:'Arithmetic'},
    {q:'2⁵ =',o:['24','32','40'],a:1,topic:'Powers'},
    {q:'LCM(4, 6) =',o:['10','12','24'],a:1,topic:'Number Theory'},
    {q:'π ≈',o:['2.14','3.14','4.14'],a:1,topic:'Constants'},
    {q:'15% of 80 =',o:['10','12','14'],a:1,topic:'Percentages'},
    {q:'√169 =',o:['11','13','15'],a:1,topic:'Roots'},
    {q:'Fibonacci: 1,1,2,3,5,?',o:['7','8','9'],a:1,topic:'Sequences'},
    {q:'Interior angles of pentagon?',o:['360°','540°','720°'],a:1,topic:'Geometry'},
    {q:'(7+8)×(9−4) =',o:['65','75','85'],a:1,topic:'Arithmetic'},
    {q:'0.5² =',o:['0.1','0.25','0.5'],a:1,topic:'Arithmetic'},
    {q:'Primes 10 to 20?',o:['3','4','5'],a:1,topic:'Number Theory'},
    {q:'2⁴ + 3³ =',o:['39','43','47'],a:1,topic:'Powers'},
    {q:'Area of circle r=5?',o:['25π','50π','75π'],a:0,topic:'Geometry'},
    {q:'50% of 84 =',o:['38','42','46'],a:1,topic:'Percentages'},
    {q:'√225 =',o:['13','15','17'],a:1,topic:'Roots'},
    {q:'log₁₀(100) =',o:['1','2','3'],a:1,topic:'Logarithms'},
    {q:'e ≈',o:['1.71','2.71','3.71'],a:1,topic:'Constants'},
    {q:'Fibonacci: 3,5,8,?',o:['11','13','15'],a:1,topic:'Sequences'},
    {q:'75% of 120 =',o:['80','90','100'],a:1,topic:'Percentages'},
  ],
  hard: [
    {q:'LCM(6,8,12) =',o:['24','36','48'],a:0,topic:'Number Theory'},
    {q:'√(144+256) =',o:['18','20','22'],a:1,topic:'Roots'},
    {q:'48÷(3×4)+5² =',o:['25','29','33'],a:1,topic:'Arithmetic'},
    {q:'x²=196 → x=',o:['12','14','16'],a:1,topic:'Algebra'},
    {q:'1+2+…+100 =',o:['5000','5050','5500'],a:1,topic:'Sequences'},
    {q:'0.999… =',o:['≈1','0.999','1'],a:2,topic:'Limits'},
    {q:'2⁸ =',o:['128','256','512'],a:1,topic:'Powers'},
    {q:'Digits of π: 3.?',o:['14159','14256','14358'],a:0,topic:'Constants'},
    {q:'7! =',o:['2040','5040','10080'],a:1,topic:'Combinatorics'},
    {q:'(a+b)²= a²+?+b²',o:['ab','2ab','3ab'],a:1,topic:'Algebra'},
    {q:'log₁₀(1000) =',o:['2','3','4'],a:1,topic:'Logarithms'},
    {q:'sin(30°) =',o:['0.25','0.5','0.75'],a:1,topic:'Trigonometry'},
    {q:'cos(60°) =',o:['0.25','0.5','0.75'],a:1,topic:'Trigonometry'},
    {q:'d/dx(x²) =',o:['x','2x','2'],a:1,topic:'Calculus'},
    {q:'∫x dx =',o:['x+C','x²+C','x²/2+C'],a:2,topic:'Calculus'},
    {q:'Pythagorean 3,4,? =',o:['4','5','6'],a:1,topic:'Geometry'},
    {q:'Prime factors 60?',o:['2²×3×5','2³×5','2×3²×5'],a:0,topic:'Number Theory'},
    {q:'tan(45°) =',o:['0','1','√2'],a:1,topic:'Trigonometry'},
    {q:'Diagonals in hexagon?',o:['6','8','9'],a:2,topic:'Geometry'},
    {q:'2⁴ + 3⁴ =',o:['87','97','107'],a:1,topic:'Powers'},
    {q:'√(17²−8²) =',o:['13','15','17'],a:1,topic:'Roots'},
    {q:'n-gon angles: (n−?)×180°',o:['1','2','3'],a:1,topic:'Geometry'},
    {q:'Primes ≤ 20?',o:['7','8','9'],a:1,topic:'Number Theory'},
    {q:'log₂(64) =',o:['4','6','8'],a:1,topic:'Logarithms'},
    {q:'sin²θ+cos²θ =',o:['0','1','2'],a:1,topic:'Trigonometry'},
    {q:'∫2x dx =',o:['x+C','x²+C','2x²+C'],a:1,topic:'Calculus'},
    {q:'Euler\'s number e ≈',o:['1.71','2.71','3.71'],a:1,topic:'Constants'},
    {q:'Area of ellipse a,b?',o:['πab','2πab','πa²b'],a:0,topic:'Geometry'},
    {q:'n! / (n−2)! =',o:['n','n(n−1)','n²'],a:1,topic:'Combinatorics'},
    {q:'lim x→∞ (1/x) =',o:['1','0','∞'],a:1,topic:'Limits'},
  ],
  chaser: [
    {q:'Primes ≤ 50?',o:['13','15','16'],a:1,topic:'Number Theory'},
    {q:'log₂(1024) =',o:['8','10','12'],a:1,topic:'Logarithms'},
    {q:'∞ − ∞ =',o:['0','∞','Undefined'],a:2,topic:'Limits'},
    {q:'e^(iπ)+1 =',o:['−1','0','1'],a:1,topic:'Complex'},
    {q:'√(−4) =',o:['2','2i','−2'],a:1,topic:'Complex'},
    {q:'i²+i⁴ =',o:['0','−1','2'],a:0,topic:'Complex'},
    {q:'lim x→0 (sinx/x) =',o:['0','1','∞'],a:1,topic:'Limits'},
    {q:'d/dx(eˣ) =',o:['eˣ⁻¹','eˣ','xeˣ'],a:1,topic:'Calculus'},
    {q:'∫eˣ dx =',o:['eˣ⁻¹+C','eˣ+C','xeˣ+C'],a:1,topic:'Calculus'},
    {q:'log₂+log₅ =',o:['0','1','2'],a:1,topic:'Logarithms'},
    {q:'Fibonacci: F(10) =',o:['34','55','89'],a:1,topic:'Sequences'},
    {q:'Euler: V−E+F =',o:['0','1','2'],a:2,topic:'Topology'},
    {q:'lim x→∞ (1+1/x)ˣ =',o:['1','e','∞'],a:1,topic:'Limits'},
    {q:'π²/6 = Σ(1/n²)?',o:['Yes','No','Undefined'],a:0,topic:'Series'},
    {q:'Cantor: |ℝ|>|ℕ|?',o:['True','False','Unknown'],a:0,topic:'Set Theory'},
    {q:'∫₀¹ x² dx =',o:['1/2','1/3','1/4'],a:1,topic:'Calculus'},
    {q:'Ramanujan: 1729 =',o:['12³+1³','10³+9³','Both'],a:2,topic:'Number Theory'},
    {q:'Goldbach (conjecture)?',o:['Proved','Unproved','Disproved'],a:1,topic:'Number Theory'},
    {q:'Platonic solids?',o:['4','5','6'],a:1,topic:'Geometry'},
    {q:'(13²−5²)÷18 =',o:['8','9','10'],a:1,topic:'Algebra'},
    {q:'Taylor: eˣ≈1+x+x²/?',o:['1','2','3'],a:1,topic:'Calculus'},
    {q:'Primes ≤ 100?',o:['23','25','27'],a:1,topic:'Number Theory'},
    {q:'i⁴ =',o:['i','−1','1'],a:2,topic:'Complex'},
    {q:'∫sin(x) dx =',o:['cos(x)+C','−cos(x)+C','sin(x)+C'],a:1,topic:'Calculus'},
    {q:'P(A∪B) if P(A)=P(B)=0.5, independent?',o:['0.5','0.75','1'],a:1,topic:'Probability'},
  ],
};

// Dynamic question generation
function genDynamic(lv: Level, n=8): Question[] {
  return Array.from({length:n}, () => {
    if(lv==='easy') {
      const a=rnd(2,15),b=rnd(2,15),s=a+b;
      const opts=shuffle([String(s),String(s-2),String(s+2)]);
      return {q:`${a} + ${b} =`,o:opts,a:opts.indexOf(String(s)),topic:'Arithmetic'};
    } else if(lv==='medium') {
      const a=rnd(7,15),b=rnd(7,15),p=a*b;
      const opts=shuffle([String(p),String(p-10),String(p+10)]);
      return {q:`${a} × ${b} =`,o:opts,a:opts.indexOf(String(p)),topic:'Arithmetic'};
    } else if(lv==='hard') {
      const b=[2,3,5][rnd(0,2)],e=rnd(4,7),v=Math.pow(b,e);
      const opts=shuffle([String(v),String(v*2),String(Math.round(v*.5))]);
      return {q:`${b}^${e} =`,o:opts,a:opts.indexOf(String(v)),topic:'Powers'};
    } else {
      const a=rnd(10,20),b=rnd(3,9),v=a*a-b*b;
      const opts=shuffle([String(v),String(v+b*2),String(v-a)]);
      return {q:`${a}²−${b}² =`,o:opts,a:opts.indexOf(String(v)),topic:'Algebra'};
    }
  });
}

// Deterministic daily seed
function getDailyQuestions(lv: Level): Question[] {
  const seed=new Date().toISOString().slice(0,10)+lv;
  let h=0; for(let i=0;i<seed.length;i++) h=((h<<5)-h+seed.charCodeAt(i))|0;
  const rng=(n:number)=>{h=((h<<5)-h+n)|0;return Math.abs(h);};
  const pool=[...POOL[lv]];
  for(let i=pool.length-1;i>0;i--){const j=rng(i)%(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,15);
}

function maxSec(lv: Level) { return lv==='easy'?12:lv==='medium'?9:lv==='hard'?7:5; }
function xpPerCorrect(lv: Level) { return lv==='easy'?2:lv==='medium'?4:lv==='hard'?7:12; }

const LV_CFG = [
  {id:'easy'   as Level,label:'Easy',   icon:'🌱',time:'12s',desc:'Build your foundations',      color:'#10b981',glow:'rgba(16,185,129,.3)' },
  {id:'medium' as Level,label:'Medium', icon:'⚡',time:'9s', desc:'Accelerate your thinking',    color:'#3b82f6',glow:'rgba(59,130,246,.3)'  },
  {id:'hard'   as Level,label:'Hard',   icon:'🔥',time:'7s', desc:'Push your limits',            color:'#f59e0b',glow:'rgba(245,158,11,.3)'  },
  {id:'chaser' as Level,label:'Chaser', icon:'💀',time:'5s', desc:'No mercy. No time. No escape.',color:'#ef4444',glow:'rgba(239,68,68,.35)' },
];

// ─── Share helper ─────────────────────────────────────────────────────────────
function buildShareText(score:number, level:Level, combo:number, won:boolean):string {
  const bars = Math.min(score, 10);
  const bar  = '🟨'.repeat(bars)+'⬜'.repeat(Math.max(0,10-bars));
  return `🧠 Math Chaser PRO\n${won?'🏆':'💥'} ${level.toUpperCase()} — Score: ${score}\n${bar}\n🔥 Best combo: ${combo}×\nPlay at eisatopon.gr/lab/math-chaser`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MathChaserPro() {
  const [screen,  setScreen]  = useState<Screen>('landing');
  const [loaded,  setLoaded]  = useState(false);
  const [level,   setLevel]   = useState<Level>('easy');
  const [daily,   setDaily]   = useState(false);
  const [qs,      setQs]      = useState<Question[]>([]);
  const [qIdx,    setQIdx]    = useState(0);
  const [score,   setScore]   = useState(0);
  const [combo,   setCombo]   = useState(0);
  const [maxCom,  setMaxCom]  = useState(0);
  const [timePct, setTimePct] = useState(100);
  const [timeTxt, setTimeTxt] = useState('');
  const [pills,   setPills]   = useState<('idle'|'current'|'correct'|'wrong')[]>([]);
  const [chosen,  setChosen]  = useState<number|null>(null);
  const [elim,    setElim]    = useState<number[]>([]);
  const [won,     setWon]     = useState(false);
  const [flash,   setFlash]   = useState('');
  const [topicF,  setTopicF]  = useState('');
  const [player,  setPlayer]  = useState<PlayerData>(EMPTY_PLAYER);
  const [xpGain,  setXpGain]  = useState(0);
  const [pus,     setPus]     = useState<Record<PU,number>>({time:1,fifty:1,skip:1});
  const [newAch,  setNewAch]  = useState<string[]>([]);
  const [shared,  setShared]  = useState(false);
  const [allRight,setAllRight]= useState(true);

  // Refs for non-stale values in callbacks
  const timerRef    = useRef<ReturnType<typeof setInterval>|null>(null);
  const startRef    = useRef(0); // Date.now() when timer started
  const maxSecRef   = useRef(12);
  const scoreRef    = useRef(0);
  const comboRef    = useRef(0);
  const maxComRef   = useRef(0);
  const levelRef    = useRef<Level>('easy');
  const allRightRef = useRef(true);
  const topicTRef   = useRef<ReturnType<typeof setTimeout>|null>(null);
  const flashTRef   = useRef<ReturnType<typeof setTimeout>|null>(null);

  // Load player on mount
  useEffect(() => {
    const p = loadPlayer();
    const today = new Date().toISOString().slice(0,10);
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    if (p.lastPlayed !== today) {
      if (p.lastPlayed === yesterday) p.streak = (p.streak||0)+1;
      else if (p.lastPlayed && p.lastPlayed !== today) p.streak = 0;
    }
    setPlayer(p);
    setLoaded(true);
  }, []);

  // Sync refs
  useEffect(()=>{scoreRef.current=score;},[score]);
  useEffect(()=>{comboRef.current=combo;},[combo]);
  useEffect(()=>{maxComRef.current=maxCom;},[maxCom]);
  useEffect(()=>{levelRef.current=level;},[level]);
  useEffect(()=>{allRightRef.current=allRight;},[allRight]);

  const stopTimer = useCallback(()=>{if(timerRef.current){clearInterval(timerRef.current);timerRef.current=null;}}, []);

  // Accurate Date.now()-based timer
  const startTimer = useCallback((sec:number)=>{
    stopTimer();
    startRef.current = Date.now();
    maxSecRef.current = sec;
    timerRef.current = setInterval(()=>{
      const elapsed = (Date.now()-startRef.current)/1000;
      const remaining = sec - elapsed;
      const pct = Math.max((remaining/sec)*100,0);
      setTimePct(pct);
      setTimeTxt(Math.max(remaining,0).toFixed(1)+'s');
      if(remaining<=1 && remaining>0) { const t=Math.floor(remaining*10); if(t%3===0) playSound('tick'); }
      if(remaining<=0){stopTimer();endGame(false);}
    },50);
  },[stopTimer]); // endGame added below via ref

  const endGameRef = useRef<(w:boolean)=>void>(()=>{});

  const endGame = useCallback((w:boolean)=>{
    stopTimer();
    const s=scoreRef.current, mc=maxComRef.current, lv=levelRef.current;
    const ar=allRightRef.current;
    setWon(w);

    const p = loadPlayer();
    const today = new Date().toISOString().slice(0,10);
    const xp = s*xpPerCorrect(lv) + (w?25:0) + mc*3;
    p.xp = (p.xp||0)+xp;
    p.lastPlayed = today;
    if(s>(p.bests[lv]||0)) p.bests[lv]=s;

    // Check achievements
    const gained:string[]=[];
    const check=(id:string,cond:boolean)=>{ if(cond&&!p.achievements.includes(id)){p.achievements.push(id);gained.push(id);} };
    check('first_win', w);
    check('perfect', w && ar && s>=5);
    check('combo5', mc>=5);
    check('combo10', mc>=10);
    check('chaser_win', w && lv==='chaser');
    check('streak7', (p.streak||0)>=7);
    check('xp500', p.xp>=500);
    check('score20', s>=20);
    if(gained.length>0) playSound('unlock');
    setNewAch(gained);

    // Leaderboard (local top 10)
    const entry={score:s,level:lv,date:today,combo:mc};
    p.leaderboard=[...( p.leaderboard||[]),entry].sort((a,b)=>b.score-a.score).slice(0,10);

    savePlayer(p);
    setPlayer({...p});
    setXpGain(xp);
    setScreen('result');
  },[stopTimer]);

  useEffect(()=>{endGameRef.current=endGame;},[endGame]);

  // Wrap endGame for use inside startTimer
  useEffect(()=>{
    // Update startTimer to use endGameRef — done via closure capture
  },[]);

  // Override startTimer to use endGameRef
  const startTimerSafe = useCallback((sec:number)=>{
    stopTimer();
    startRef.current = Date.now();
    maxSecRef.current = sec;
    timerRef.current = setInterval(()=>{
      const elapsed=(Date.now()-startRef.current)/1000;
      const rem=sec-elapsed;
      setTimePct(Math.max((rem/sec)*100,0));
      setTimeTxt(Math.max(rem,0).toFixed(1)+'s');
      if(rem<=1&&rem>0){const t=Math.floor(rem*10);if(t%3===0)playSound('tick');}
      if(rem<=0){stopTimer();endGameRef.current(false);}
    },50);
  },[stopTimer]);

  const startGame = useCallback((lv:Level, isDaily=false)=>{
    stopTimer();
    setLevel(lv); levelRef.current=lv;
    setDaily(isDaily);
    const pool = isDaily ? getDailyQuestions(lv) : shuffle([...POOL[lv],...genDynamic(lv,8)]).slice(0,20);
    setQs(pool); setQIdx(0);
    setScore(0); scoreRef.current=0;
    setCombo(0); comboRef.current=0;
    setMaxCom(0); maxComRef.current=0;
    setChosen(null); setElim([]);
    setWon(false); setXpGain(0); setNewAch([]);
    setAllRight(true); allRightRef.current=true;
    setShared(false);
    setPus({time:1,fifty:1,skip:1});
    setPills(pool.map((_,i)=>i===0?'current':'idle'));
    setScreen('game');
  },[stopTimer]);

  // Start timer when question changes
  useEffect(()=>{
    if(screen!=='game'||qs.length===0||qIdx>=qs.length) return;
    setChosen(null); setElim([]);
    const topic = qs[qIdx]?.topic||'';
    setTopicF(topic);
    if(topicTRef.current) clearTimeout(topicTRef.current);
    topicTRef.current=setTimeout(()=>setTopicF(''),1200);
    startTimerSafe(maxSec(levelRef.current));
    return ()=>stopTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[qIdx,screen,qs.length]);

  // Keyboard shortcuts
  useEffect(()=>{
    if(screen!=='game') return;
    const handler=(e:KeyboardEvent)=>{
      if(e.key==='1'||e.key==='a'||e.key==='A') handleAnswer(0);
      else if(e.key==='2'||e.key==='b'||e.key==='B') handleAnswer(1);
      else if(e.key==='3'||e.key==='c'||e.key==='C') handleAnswer(2);
      else if(e.key==='q'||e.key==='Q') usePowerUp('time');
      else if(e.key==='w'||e.key==='W') usePowerUp('fifty');
      else if(e.key==='e'||e.key==='E') usePowerUp('skip');
    };
    window.addEventListener('keydown',handler);
    return ()=>window.removeEventListener('keydown',handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[screen,chosen,qs,qIdx,pus]);

  const setFlashSafe = useCallback((msg:string)=>{
    setFlash(msg);
    if(flashTRef.current) clearTimeout(flashTRef.current);
    flashTRef.current=setTimeout(()=>setFlash(''),900);
  },[]);

  const handleAnswer = useCallback((idx:number)=>{
    if(chosen!==null||elim.includes(idx)) return;
    stopTimer(); setChosen(idx);
    const q=qs[qIdx], ok=idx===q.a;
    setPills(prev=>prev.map((p,i)=>i===qIdx?ok?'correct':'wrong':i===qIdx+1?'current':p));

    if(ok) {
      playSound('correct');
      const ns=scoreRef.current+1, nc=comboRef.current+1, nm=Math.max(maxComRef.current,nc);
      setScore(ns); scoreRef.current=ns;
      setCombo(nc); comboRef.current=nc;
      setMaxCom(nm); maxComRef.current=nm;
      if(nc>=3){playSound('combo');setFlashSafe(`${nc}× COMBO!`);}
      setTimeout(()=>{
        if(qIdx+1>=qs.length) endGameRef.current(true);
        else setQIdx(i=>i+1);
      },360);
    } else {
      playSound('wrong');
      setAllRight(false); allRightRef.current=false;
      setCombo(0); comboRef.current=0;
      setTimeout(()=>endGameRef.current(false),650);
    }
  },[chosen,elim,qs,qIdx,stopTimer,setFlashSafe]);

  const usePowerUp = useCallback((pu:PU)=>{
    if(pus[pu]<=0||chosen!==null) return;
    playSound('pu');
    if(pu==='time'){
      // Shift start time to simulate +5s
      startRef.current -= 5000;
      setFlashSafe('+5 seconds!');
    } else if(pu==='fifty'){
      const q=qs[qIdx];
      const wrong=q.o.map((_,i)=>i).filter(i=>i!==q.a);
      // Remove floor(wrong.length/2) incorrect options
      const toRemove=shuffle(wrong).slice(0,Math.floor(wrong.length/2)||1);
      setElim(toRemove);
    } else if(pu==='skip'){
      stopTimer();
      setPills(prev=>prev.map((p,i)=>i===qIdx?'idle':p));
      if(qIdx+1>=qs.length) endGameRef.current(true);
      else setQIdx(i=>i+1);
    }
    setPus(prev=>({...prev,[pu]:prev[pu]-1}));
  },[pus,chosen,qs,qIdx,stopTimer,setFlashSafe]);

  useEffect(()=>()=>stopTimer(),[stopTimer]);

  // Derived
  const q   = qs[qIdx];
  const lv  = LV_CFG.find(l=>l.id===level)!;
  const lvl = getXpLevel(player.xp||0);
  const danger  = timePct < 15;
  const warning = timePct < 35 && !danger;
  const chaserUnlocked = (player.xp||0) >= 50;

  if (!loaded) return <div style={{minHeight:'100vh',background:'#050810',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{color:'#334155',fontSize:32,fontFamily:'system-ui'}}>⚡</div></div>;

  return (
    <div className="mc">
      {/* Background */}
      <div className="mc-bg">
        <div className="mc-orb o1"/><div className="mc-orb o2"/><div className="mc-orb o3"/>
        <div className="mc-grid"/>
      </div>

      {/* ── LANDING ── */}
      {screen==='landing'&&(
        <div className="mc-land">
          <a href="/lab" className="mc-back-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Lab
          </a>

          <div className="mc-player-card">
            <div>
              <div className="mc-plr-title" style={{color:lvl.color}}>{lvl.title}</div>
              <div className="mc-xp-bar"><div className="mc-xp-fill" style={{width:lvl.pct+'%',background:lvl.color}}/></div>
              <div className="mc-xp-txt">{player.xp||0} XP</div>
            </div>
            <div style={{textAlign:'right'}}>
              {(player.streak||0)>0&&<div className="mc-streak">🔥 {player.streak}d streak</div>}
              <button className="mc-stats-link" onClick={()=>setScreen('stats')}>📊 Stats</button>
            </div>
          </div>

          <div className="mc-hero">
            <div className="mc-hero-icon">🧠</div>
            <h1 className="mc-title">Math<br/>Chaser</h1>
            <span className="mc-pro">PRO</span>
          </div>

          <p className="mc-tagline">Beat the clock. Outsmart the Chaser.</p>

          <div className="mc-land-btns">
            <button className="mc-cta" onClick={()=>setScreen('levels')}>PLAY NOW <span>→</span></button>
            <button className="mc-cta-sec" onClick={()=>setScreen('levels')}>☀️ Daily Challenge</button>
          </div>

          {/* Achievements preview */}
          {(player.achievements||[]).length>0&&(
            <div className="mc-ach-row">
              {player.achievements.map(id=>(
                <span key={id} className="mc-ach-badge" title={ACHIEVEMENTS[id]?.name||id}>
                  {ACHIEVEMENTS[id]?.icon||'🏅'}
                </span>
              ))}
            </div>
          )}

          <div className="mc-bests">
            {LV_CFG.map(l=>(
              <div key={l.id} className="mc-best-chip">
                <span style={{color:l.color}}>{l.icon}</span>
                <span className="mc-best-n">{player.bests?.[l.id]||0}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LEVELS ── */}
      {screen==='levels'&&(
        <div className="mc-levels">
          <button className="mc-nav-back" onClick={()=>setScreen('landing')}>← Back</button>
          <h2 className="mc-levels-h">Choose Your<br/><em>Challenge</em></h2>
          <div className="mc-level-grid">
            {LV_CFG.map(lc=>{
              const locked=lc.id==='chaser'&&!chaserUnlocked;
              return (
                <button key={lc.id} className={`mc-lcard ${locked?'mc-lcard-locked':''}`}
                  style={{'--c':lc.color,'--g':lc.glow} as React.CSSProperties}
                  onClick={()=>!locked&&startGame(lc.id)}
                  title={locked?'Reach 50 XP to unlock Chaser':undefined}>
                  <div className="mc-lc-top">
                    <span className="mc-lc-icon">{lc.icon}</span>
                    <span className="mc-lc-time">{lc.time}</span>
                  </div>
                  <div className="mc-lc-name">{lc.label}{locked&&' 🔒'}</div>
                  <div className="mc-lc-desc">{locked?`Unlock at 50 XP (you have ${player.xp||0})`:lc.desc}</div>
                  <div className="mc-lc-best">Best: <strong>{player.bests?.[lc.id]||0}</strong></div>
                  {!locked&&<div className="mc-lc-arr">→</div>}
                </button>
              );
            })}
          </div>
          <button className="mc-daily-btn" onClick={()=>startGame(level,true)}>
            ☀️ Daily Challenge — same 15 questions for everyone today
          </button>
        </div>
      )}

      {/* ── GAME ── */}
      {screen==='game'&&q&&(
        <div className="mc-game" style={{'--lc':lv.color,'--lg':lv.glow} as React.CSSProperties}>

          <div className="mc-game-top">
            <button className="mc-quit" onClick={()=>setScreen('levels')} aria-label="Quit game">✕</button>
            <div className="mc-pills" role="progressbar" aria-valuenow={qIdx} aria-valuemax={qs.length}>
              {pills.map((p,i)=><div key={i} className={`mc-pill mc-pill-${p}`}/>)}
            </div>
            <div className="mc-score-box" aria-live="polite">{score}</div>
          </div>

          <div className="mc-timer-row">
            <div className="mc-timer-track" role="progressbar" aria-valuenow={Math.round(timePct)} aria-valuemax={100} aria-label="Time remaining">
              <div className="mc-timer-bar" style={{
                width:timePct+'%',
                background:danger?'#ef4444':warning?'#f59e0b':lv.color,
                boxShadow:`0 0 14px ${danger?'#ef4444':warning?'#f59e0b':lv.color}`,
              }}/>
            </div>
            <span className="mc-timer-t" style={{color:danger?'#ef4444':warning?'#f59e0b':'#475569'}}>{timeTxt}</span>
          </div>

          <div className="mc-meta">
            {q.topic&&<span className="mc-topic-pill" style={{background:TOPIC_COLOR[q.topic]+'1a',color:TOPIC_COLOR[q.topic]||'#64748b',borderColor:TOPIC_COLOR[q.topic]+'44'}}>{q.topic}</span>}
            <span className="mc-qcount">{qIdx+1} / {qs.length}</span>
            {daily&&<span className="mc-daily-tag">☀️ Daily</span>}
          </div>

          <div className="mc-question" aria-live="assertive">{q.q}</div>

          <div className="mc-opts" role="group" aria-label="Answer options">
            {q.o.map((opt,i)=>{
              const isElim=elim.includes(i);
              const ok=chosen!==null&&i===q.a;
              const bad=chosen!==null&&i===chosen&&i!==q.a;
              return (
                <button key={i}
                  className={`mc-opt ${ok?'mc-opt-ok':''} ${bad?'mc-opt-bad':''} ${isElim?'mc-opt-elim':''}`}
                  onClick={()=>handleAnswer(i)}
                  disabled={chosen!==null||isElim}
                  aria-label={`Option ${['A','B','C'][i]}: ${opt}`}>
                  <span className="mc-opt-ltr">{['A','B','C'][i]}</span>
                  <span className="mc-opt-val">{opt}</span>
                  {ok&&<span className="mc-opt-mark">✓</span>}
                  {bad&&<span className="mc-opt-mark">✗</span>}
                </button>
              );
            })}
          </div>

          <div className="mc-powerups">
            {([['time','⏱️','+5s'],['fifty','🎯','50/50'],['skip','⏭️','Skip']] as const).map(([id,icon,label])=>(
              <button key={id}
                className={`mc-pu ${pus[id]<=0?'mc-pu-used':''}`}
                onClick={()=>usePowerUp(id as PU)}
                disabled={pus[id]<=0||chosen!==null}
                aria-label={`Use ${label} power-up`}
                title={`${label} (${id==='time'?'Q':id==='fifty'?'W':'E'})`}>
                <span className="mc-pu-icon">{icon}</span>
                <span className="mc-pu-label">{label}</span>
                {pus[id]>0&&<span className="mc-pu-badge">{pus[id]}</span>}
              </button>
            ))}
          </div>

          {combo>=2&&(
            <div className="mc-combo-bar" aria-live="polite">
              <span>🔥</span><span>{combo}× combo</span>
            </div>
          )}

          <div className="mc-kbd-hint">Press 1/2/3 to answer · Q/W/E for power-ups</div>

          {flash&&<div className="mc-flash" aria-live="assertive">{flash}</div>}
          {topicF&&<div className="mc-topic-flash" style={{color:TOPIC_COLOR[topicF]||'#94a3b8'}}>{topicF}</div>}
        </div>
      )}

      {/* ── RESULT ── */}
      {screen==='result'&&(
        <div className="mc-result">
          <div className="mc-res-emoji">{won?'🏆':'💥'}</div>
          <h2 className="mc-res-h">{won?'You Escaped!':'Chaser Got You!'}</h2>
          <p className="mc-res-sub">{won?'Perfect. The Chaser never stood a chance.':'The Chaser is relentless. Try again.'}</p>

          <div className="mc-res-cards">
            <div className="mc-rc"><div className="mc-rc-n" style={{color:'#fbbf24'}}>{score}</div><div className="mc-rc-l">Score</div></div>
            {maxCom>1&&<div className="mc-rc"><div className="mc-rc-n" style={{color:'#f97316'}}>{maxCom}×</div><div className="mc-rc-l">Combo</div></div>}
            <div className="mc-rc"><div className="mc-rc-n" style={{color:'#10b981'}}>{player.bests?.[level]||0}</div><div className="mc-rc-l">Best</div></div>
          </div>

          <div className="mc-xp-row">
            <span className="mc-xp-plus">+{xpGain} XP</span>
            <div className="mc-xp-bar2"><div className="mc-xp-fill2" style={{width:lvl.pct+'%',background:lvl.color}}/></div>
            <span className="mc-lvl-txt" style={{color:lvl.color}}>{lvl.title}</span>
          </div>

          {newAch.length>0&&(
            <div className="mc-new-ach">
              <div className="mc-new-ach-title">🎉 Achievement Unlocked!</div>
              {newAch.map(id=>(
                <div key={id} className="mc-ach-item">
                  <span>{ACHIEVEMENTS[id]?.icon}</span>
                  <div>
                    <div className="mc-ach-name">{ACHIEVEMENTS[id]?.name}</div>
                    <div className="mc-ach-desc">{ACHIEVEMENTS[id]?.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mc-share-row">
            <button className="mc-share-btn"
              onClick={()=>{
                const txt=buildShareText(score,level,maxCom,won);
                if(navigator.share) navigator.share({text:txt}).catch(()=>{});
                else { navigator.clipboard.writeText(txt).catch(()=>{}); }
                setShared(true);
              }}>
              {shared?'✓ Copied!':'📤 Share Score'}
            </button>
          </div>

          <button className="mc-cta" style={{margin:'4px auto 0'}} onClick={()=>startGame(level)}>PLAY AGAIN <span>→</span></button>
          <button className="mc-txt-btn" onClick={()=>setScreen('levels')}>Change Level</button>
          <button className="mc-txt-btn" onClick={()=>setScreen('landing')}>Home</button>
        </div>
      )}

      {/* ── STATS ── */}
      {screen==='stats'&&(
        <div className="mc-stats">
          <button className="mc-nav-back" onClick={()=>setScreen('landing')}>← Back</button>
          <h2 className="mc-stats-h">Your <em>Stats</em></h2>

          <div className="mc-stats-grid">
            <div className="mc-stat-card"><div className="mc-stat-big" style={{color:lvl.color}}>{player.xp||0}</div><div className="mc-stat-lbl">Total XP</div></div>
            <div className="mc-stat-card"><div className="mc-stat-big" style={{color:'#fbbf24'}}>{player.streak||0}</div><div className="mc-stat-lbl">Day Streak</div></div>
          </div>

          <h3 className="mc-section-h">Personal Bests</h3>
          <div className="mc-bests-table">
            {LV_CFG.map(l=>(
              <div key={l.id} className="mc-bt-row">
                <span style={{color:l.color}}>{l.icon} {l.label}</span>
                <span className="mc-bt-n">{player.bests?.[l.id]||0}</span>
              </div>
            ))}
          </div>

          <h3 className="mc-section-h">Achievements</h3>
          <div className="mc-ach-grid">
            {Object.entries(ACHIEVEMENTS).map(([id,ach])=>{
              const unlocked=(player.achievements||[]).includes(id);
              return (
                <div key={id} className={`mc-ach-card ${unlocked?'mc-ach-unlocked':''}`}>
                  <span className="mc-ach-big">{ach.icon}</span>
                  <div className="mc-ach-cname">{ach.name}</div>
                  <div className="mc-ach-cdesc">{ach.desc}</div>
                </div>
              );
            })}
          </div>

          <h3 className="mc-section-h">Recent Games</h3>
          <div className="mc-lb">
            {(player.leaderboard||[]).length===0&&<div className="mc-lb-empty">No games yet</div>}
            {(player.leaderboard||[]).map((e,i)=>(
              <div key={i} className="mc-lb-row">
                <span className="mc-lb-rank">#{i+1}</span>
                <span className="mc-lb-lv" style={{color:LV_CFG.find(l=>l.id===e.level)?.color||'#64748b'}}>{e.level}</span>
                <span className="mc-lb-score">{e.score} pts</span>
                <span className="mc-lb-combo">🔥{e.combo}×</span>
                <span className="mc-lb-date">{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .mc{
          min-height:100vh; background:#050810; color:#e2e8f0;
          font-family:'DM Sans',system-ui,sans-serif;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding:20px 16px; overflow:hidden; position:relative;
        }
        .mc-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
        .mc-orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:.2;animation:orbF 9s ease-in-out infinite;}
        .o1{width:500px;height:500px;background:#7c3aed;top:-150px;left:-100px;}
        .o2{width:380px;height:380px;background:#0ea5e9;bottom:-80px;right:-60px;animation-delay:-3.5s;}
        .o3{width:220px;height:220px;background:#f59e0b;top:45%;left:45%;animation-delay:-6s;}
        @keyframes orbF{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-25px) scale(1.04);}}
        .mc-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:44px 44px;}

        /* LANDING */
        .mc-land{width:100%;max-width:460px;text-align:center;position:relative;z-index:1;}
        .mc-back-link{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:999px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#475569;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:all .2s;margin-bottom:18px;}
        .mc-back-link:hover{color:#94a3b8;border-color:rgba(255,255,255,.14);}
        .mc-player-card{display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:12px 16px;margin-bottom:20px;gap:12px;}
        .mc-plr-title{font-size:12px;font-weight:700;margin-bottom:5px;}
        .mc-xp-bar{width:110px;height:3px;border-radius:2px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:3px;}
        .mc-xp-fill{height:100%;border-radius:2px;transition:width .6s ease;}
        .mc-xp-txt{font-size:10px;color:#334155;}
        .mc-streak{font-size:12px;font-weight:700;color:#fbbf24;margin-bottom:4px;}
        .mc-stats-link{background:none;border:none;color:#334155;font-size:11px;cursor:pointer;font-family:inherit;transition:color .2s;}
        .mc-stats-link:hover{color:#64748b;}
        .mc-hero{margin-bottom:6px;}
        .mc-hero-icon{font-size:52px;margin-bottom:2px;animation:iconB 2.2s ease-in-out infinite;}
        @keyframes iconB{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
        .mc-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(58px,16vw,84px);line-height:.88;letter-spacing:2px;background:linear-gradient(135deg,#fff 30%,#475569);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:6px;}
        .mc-pro{display:inline-block;padding:3px 12px;border-radius:999px;background:linear-gradient(135deg,#fbbf24,#f97316);color:#000;font-size:11px;font-weight:800;letter-spacing:2px;}
        .mc-tagline{color:#475569;font-size:14px;margin:10px 0 24px;}
        .mc-land-btns{display:flex;flex-direction:column;gap:10px;align-items:center;margin-bottom:20px;}
        .mc-cta{display:flex;align-items:center;gap:10px;padding:15px 32px;border-radius:13px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;font-size:15px;font-weight:800;letter-spacing:1.5px;border:none;cursor:pointer;box-shadow:0 8px 28px rgba(124,58,237,.4);transition:all .2s;font-family:inherit;}
        .mc-cta:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(124,58,237,.55);}
        .mc-cta:active{transform:scale(.97);}
        .mc-cta span{transition:transform .2s;}
        .mc-cta:hover span:last-child{transform:translateX(4px);}
        .mc-cta-sec{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#94a3b8;font-size:13px;font-weight:600;padding:11px 22px;border-radius:11px;cursor:pointer;transition:all .2s;font-family:inherit;}
        .mc-cta-sec:hover{background:rgba(255,255,255,.08);color:#e2e8f0;}
        .mc-ach-row{display:flex;gap:8px;justify-content:center;margin-bottom:14px;flex-wrap:wrap;}
        .mc-ach-badge{font-size:22px;filter:drop-shadow(0 0 6px rgba(251,191,36,.4));}
        .mc-bests{display:flex;gap:9px;justify-content:center;}
        .mc-best-chip{display:flex;flex-direction:column;align-items:center;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:11px;padding:9px 14px;gap:3px;}
        .mc-best-n{font-size:18px;font-weight:800;}

        /* LEVELS */
        .mc-levels{width:100%;max-width:560px;position:relative;z-index:1;}
        .mc-nav-back{background:none;border:none;color:#475569;font-size:13px;cursor:pointer;padding:0 0 14px;display:block;transition:color .2s;font-family:inherit;}
        .mc-nav-back:hover{color:#94a3b8;}
        .mc-levels-h{font-family:'Bebas Neue',sans-serif;font-size:clamp(30px,7vw,44px);line-height:1;margin-bottom:20px;letter-spacing:1px;}
        .mc-levels-h em{color:#7c3aed;font-style:normal;}
        .mc-level-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:14px;}
        @media(max-width:440px){.mc-level-grid{grid-template-columns:1fr;}}
        .mc-lcard{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:flex-start;padding:18px;border-radius:18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);color:#e2e8f0;cursor:pointer;text-align:left;transition:all .22s;font-family:inherit;}
        .mc-lcard::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 20%,var(--g),transparent 60%);opacity:0;transition:opacity .3s;}
        .mc-lcard:hover:not(.mc-lcard-locked){transform:translateY(-4px);border-color:var(--c);box-shadow:0 12px 28px var(--g);}
        .mc-lcard:hover:not(.mc-lcard-locked)::before{opacity:1;}
        .mc-lcard-locked{opacity:.55;cursor:not-allowed;}
        .mc-lc-top{display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:9px;}
        .mc-lc-icon{font-size:24px;}
        .mc-lc-time{font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;background:rgba(255,255,255,.08);color:#64748b;}
        .mc-lc-name{font-size:20px;font-weight:800;color:#fff;margin-bottom:3px;}
        .mc-lc-desc{font-size:11px;color:#475569;margin-bottom:10px;line-height:1.4;}
        .mc-lc-best{font-size:10px;color:#334155;}
        .mc-lc-best strong{color:var(--c);}
        .mc-lc-arr{position:absolute;right:14px;bottom:14px;font-size:16px;color:var(--c);opacity:0;transform:translateX(-6px);transition:all .22s;}
        .mc-lcard:hover:not(.mc-lcard-locked) .mc-lc-arr{opacity:1;transform:translateX(0);}
        .mc-daily-btn{width:100%;padding:13px;border-radius:13px;background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.18);color:#fbbf24;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit;}
        .mc-daily-btn:hover{background:rgba(251,191,36,.12);}

        /* GAME */
        .mc-game{width:100%;max-width:540px;display:flex;flex-direction:column;gap:13px;position:relative;z-index:1;}
        .mc-game-top{display:flex;align-items:center;gap:9px;}
        .mc-quit{width:34px;height:34px;border-radius:9px;flex-shrink:0;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);color:#475569;font-size:13px;cursor:pointer;transition:all .2s;font-family:inherit;}
        .mc-quit:hover{color:#e2e8f0;background:rgba(255,255,255,.09);}
        .mc-pills{display:flex;flex-wrap:wrap;gap:4px;flex:1;}
        .mc-pill{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.09);transition:all .3s;}
        .mc-pill-current{background:#fbbf24;transform:scale(1.4);box-shadow:0 0 7px #fbbf24;}
        .mc-pill-correct{background:#10b981;}
        .mc-pill-wrong{background:#ef4444;}
        .mc-score-box{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:5px 13px;font-size:19px;font-weight:800;color:#fbbf24;flex-shrink:0;font-variant-numeric:tabular-nums;}
        .mc-timer-row{display:flex;align-items:center;gap:10px;}
        .mc-timer-track{flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,.07);overflow:hidden;}
        .mc-timer-bar{height:100%;border-radius:3px;transition:width .05s linear,background .4s,box-shadow .4s;}
        .mc-timer-t{font-size:12px;font-variant-numeric:tabular-nums;min-width:36px;text-align:right;transition:color .3s;}
        .mc-meta{display:flex;align-items:center;justify-content:space-between;gap:8px;}
        .mc-topic-pill{font-size:10px;font-weight:700;letter-spacing:.5px;padding:3px 9px;border-radius:999px;border:1px solid;text-transform:uppercase;}
        .mc-qcount{font-size:11px;color:#334155;}
        .mc-daily-tag{font-size:10px;font-weight:700;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.2);padding:2px 8px;border-radius:999px;}
        .mc-question{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,9vw,58px);letter-spacing:1px;text-align:center;min-height:68px;display:flex;align-items:center;justify-content:center;line-height:1;}
        .mc-opts{display:flex;flex-direction:column;gap:8px;}
        .mc-opt{display:flex;align-items:center;gap:13px;padding:13px 17px;border-radius:13px;background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.07);color:#e2e8f0;cursor:pointer;text-align:left;transition:all .15s;font-family:inherit;}
        .mc-opt:not(:disabled):hover{border-color:rgba(255,255,255,.18);background:rgba(255,255,255,.08);transform:translateX(4px);}
        .mc-opt:disabled{cursor:default;}
        .mc-opt-ltr{width:28px;height:28px;border-radius:7px;flex-shrink:0;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.09);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#475569;}
        .mc-opt-val{font-size:18px;font-weight:700;flex:1;}
        .mc-opt-mark{font-size:17px;font-weight:900;}
        .mc-opt-ok{background:rgba(16,185,129,.12)!important;border-color:#10b981!important;animation:slideIn .28s ease;}
        .mc-opt-ok .mc-opt-ltr{background:rgba(16,185,129,.22);color:#6ee7b7;border-color:#10b981;}
        .mc-opt-ok .mc-opt-val{color:#6ee7b7;}
        .mc-opt-bad{background:rgba(239,68,68,.12)!important;border-color:#ef4444!important;animation:shakeX .32s ease;}
        .mc-opt-bad .mc-opt-ltr{background:rgba(239,68,68,.22);color:#fca5a5;border-color:#ef4444;}
        .mc-opt-bad .mc-opt-val{color:#fca5a5;}
        .mc-opt-elim{opacity:.2!important;pointer-events:none!important;}
        @keyframes slideIn{0%{transform:translateX(-5px);opacity:.6}100%{transform:translateX(0);opacity:1}}
        @keyframes shakeX{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}
        .mc-powerups{display:flex;gap:9px;justify-content:center;}
        .mc-pu{display:flex;flex-direction:column;align-items:center;gap:2px;padding:9px 14px;border-radius:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);color:#94a3b8;cursor:pointer;transition:all .18s;position:relative;font-family:inherit;}
        .mc-pu:hover:not(:disabled){background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.13);color:#e2e8f0;transform:translateY(-2px);}
        .mc-pu:disabled{cursor:default;}
        .mc-pu-icon{font-size:18px;}
        .mc-pu-label{font-size:9px;font-weight:700;letter-spacing:.5px;}
        .mc-pu-badge{position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;background:#fbbf24;color:#000;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;}
        .mc-pu-used{opacity:.25;}
        .mc-combo-bar{display:flex;align-items:center;justify-content:center;gap:7px;font-size:13px;font-weight:700;color:#fbbf24;background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.16);border-radius:999px;padding:7px 18px;animation:fadeUp .28s ease;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .mc-kbd-hint{text-align:center;font-size:9px;color:#1e293b;letter-spacing:.3px;}
        .mc-flash{position:fixed;top:34%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:50px;letter-spacing:2px;color:#fbbf24;text-shadow:0 0 36px rgba(251,191,36,.7);animation:comboA .9s ease-out forwards;pointer-events:none;z-index:200;}
        .mc-topic-flash{position:fixed;top:23%;left:50%;transform:translate(-50%,-50%);font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;animation:topicA 1.2s ease-out forwards;pointer-events:none;z-index:200;}
        @keyframes comboA{0%{opacity:0;transform:translate(-50%,-50%) scale(.4);}40%{opacity:1;transform:translate(-50%,-50%) scale(1.08);}100%{opacity:0;transform:translate(-50%,-62%) scale(1);}}
        @keyframes topicA{0%{opacity:0;transform:translate(-50%,-50%) translateY(5px);}30%{opacity:1;transform:translate(-50%,-50%) translateY(0);}100%{opacity:0;transform:translate(-50%,-50%) translateY(-10px);}}

        /* RESULT */
        .mc-result{width:100%;max-width:460px;text-align:center;position:relative;z-index:1;}
        .mc-res-emoji{font-size:68px;margin-bottom:10px;}
        .mc-res-h{font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,8vw,50px);letter-spacing:1px;margin-bottom:6px;}
        .mc-res-sub{color:#475569;font-size:13px;margin-bottom:24px;line-height:1.5;}
        .mc-res-cards{display:flex;gap:10px;justify-content:center;margin-bottom:18px;flex-wrap:wrap;}
        .mc-rc{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:16px 20px;min-width:84px;}
        .mc-rc-n{font-family:'Bebas Neue',sans-serif;font-size:38px;letter-spacing:1px;line-height:1;margin-bottom:3px;}
        .mc-rc-l{font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:.8px;}
        .mc-xp-row{display:flex;align-items:center;gap:10px;margin-bottom:16px;justify-content:center;}
        .mc-xp-plus{font-size:17px;font-weight:800;color:#fbbf24;}
        .mc-xp-bar2{width:100px;height:3px;border-radius:2px;background:rgba(255,255,255,.08);overflow:hidden;}
        .mc-xp-fill2{height:100%;border-radius:2px;transition:width .8s ease;}
        .mc-lvl-txt{font-size:11px;font-weight:700;}
        .mc-new-ach{background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.18);border-radius:14px;padding:14px;margin-bottom:14px;text-align:left;}
        .mc-new-ach-title{font-size:12px;font-weight:800;color:#fbbf24;margin-bottom:10px;text-align:center;}
        .mc-ach-item{display:flex;align-items:center;gap:10px;margin-bottom:6px;}
        .mc-ach-item span{font-size:24px;}
        .mc-ach-name{font-size:13px;font-weight:700;}
        .mc-ach-desc{font-size:11px;color:#475569;}
        .mc-share-row{margin-bottom:14px;}
        .mc-share-btn{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#94a3b8;font-size:13px;font-weight:600;padding:10px 22px;border-radius:11px;cursor:pointer;transition:all .2s;font-family:inherit;}
        .mc-share-btn:hover{background:rgba(255,255,255,.1);color:#e2e8f0;}
        .mc-txt-btn{background:none;border:none;color:#1e293b;font-size:13px;cursor:pointer;display:block;margin:9px auto 0;transition:color .2s;font-family:inherit;}
        .mc-txt-btn:hover{color:#475569;}

        /* STATS */
        .mc-stats{width:100%;max-width:520px;position:relative;z-index:1;}
        .mc-stats-h{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,7vw,42px);letter-spacing:1px;margin-bottom:18px;}
        .mc-stats-h em{color:#7c3aed;font-style:normal;}
        .mc-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
        .mc-stat-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;text-align:center;}
        .mc-stat-big{font-family:'Bebas Neue',sans-serif;font-size:44px;letter-spacing:1px;line-height:1;}
        .mc-stat-lbl{font-size:10px;color:#475569;text-transform:uppercase;letter-spacing:.8px;margin-top:4px;}
        .mc-section-h{font-size:13px;font-weight:800;color:#334155;text-transform:uppercase;letter-spacing:.8px;margin:16px 0 10px;}
        .mc-bests-table{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;overflow:hidden;margin-bottom:4px;}
        .mc-bt-row{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04);}
        .mc-bt-row:last-child{border-bottom:none;}
        .mc-bt-n{font-weight:800;font-size:16px;}
        .mc-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:9px;margin-bottom:4px;}
        .mc-ach-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:12px 10px;text-align:center;opacity:.35;transition:all .2s;}
        .mc-ach-unlocked{opacity:1;border-color:rgba(251,191,36,.25);background:rgba(251,191,36,.05);}
        .mc-ach-big{font-size:26px;display:block;margin-bottom:6px;}
        .mc-ach-cname{font-size:11px;font-weight:700;margin-bottom:2px;}
        .mc-ach-cdesc{font-size:9px;color:#475569;line-height:1.3;}
        .mc-lb{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;overflow:hidden;}
        .mc-lb-empty{padding:16px;text-align:center;color:#334155;font-size:13px;}
        .mc-lb-row{display:flex;align-items:center;gap:10px;padding:9px 14px;border-bottom:1px solid rgba(255,255,255,.04);font-size:12px;}
        .mc-lb-row:last-child{border-bottom:none;}
        .mc-lb-rank{color:#475569;font-weight:700;min-width:24px;}
        .mc-lb-lv{font-weight:700;min-width:52px;text-transform:capitalize;}
        .mc-lb-score{font-weight:800;flex:1;}
        .mc-lb-combo{color:#f97316;}
        .mc-lb-date{color:#334155;font-size:10px;}
      `}</style>
    </div>
  );
}