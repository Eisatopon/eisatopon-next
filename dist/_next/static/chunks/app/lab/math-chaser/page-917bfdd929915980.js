(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[67],{536:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>m});var r=a(5155),s=a(2115);function o(e,t){return Math.floor(Math.random()*(t-e+1))+e}function n(e){let t=[...e];for(let e=t.length-1;e>0;e--){let a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}let c={easy:[{q:"4 + 7 =",o:["9","11","13"],a:1},{q:"8 \xd7 5 =",o:["35","40","45"],a:1},{q:"15 − 6 =",o:["7","8","9"],a:2},{q:"√64 =",o:["6","7","8"],a:2},{q:"25 + 38 =",o:["61","63","65"],a:1},{q:"9 \xd7 9 =",o:["72","81","90"],a:1},{q:"100 \xf7 4 =",o:["20","25","30"],a:1},{q:"Half of 48",o:["20","22","24"],a:2},{q:"7\xb2 =",o:["42","49","56"],a:1},{q:"3 \xd7 12 + 9 =",o:["42","45","48"],a:1},{q:"80 − 37 =",o:["41","43","45"],a:1},{q:"√100 =",o:["9","10","11"],a:1},{q:"6 \xd7 7 − 8 =",o:["32","34","36"],a:1},{q:"Minutes in 2 hours?",o:["100","120","140"],a:1},{q:"Equilateral angle?",o:["30\xb0","60\xb0","90\xb0"],a:1}],medium:[{q:"12 \xd7 8 =",o:["88","96","104"],a:1},{q:"144 \xf7 12 =",o:["10","12","14"],a:1},{q:"5\xb2 + 3\xb2 =",o:["32","34","36"],a:1},{q:"20% of 150",o:["25","30","35"],a:1},{q:"√81 + 7 =",o:["14","15","16"],a:2},{q:"(8+4) \xd7 5 =",o:["50","60","70"],a:1},{q:"72 \xf7 8 + 15 =",o:["22","24","26"],a:1},{q:"3\xb3 =",o:["21","24","27"],a:2},{q:"GCD(12, 18)",o:["4","6","8"],a:1},{q:"15 \xd7 6 \xf7 3 =",o:["25","30","35"],a:1},{q:"√144 =",o:["10","12","14"],a:1},{q:"25 \xd7 4 =",o:["90","100","110"],a:1},{q:"(20−8) \xd7 3 =",o:["30","36","42"],a:1},{q:"6\xb2 − 4\xb2 =",o:["16","20","24"],a:1},{q:"10\xb3 \xf7 10 =",o:["90","100","110"],a:1}],hard:[{q:"LCM(6, 8, 12)",o:["24","36","48"],a:0},{q:"2⁵ =",o:["24","32","40"],a:1},{q:"√(144+256) =",o:["18","20","22"],a:1},{q:"48\xf7(3\xd74)+5\xb2",o:["25","29","33"],a:1},{q:"x\xb2 = 196 → x =",o:["12","14","16"],a:1},{q:"3\xb3 \xd7 4 =",o:["96","108","120"],a:1},{q:"25 \xd7 3.6 =",o:["80","90","100"],a:1},{q:"√625 =",o:["20","25","30"],a:1},{q:"(7+8)\xd7(9−4)",o:["65","75","85"],a:1},{q:"2⁴ + 3⁴ =",o:["87","97","107"],a:1},{q:"1+2+…+100 =",o:["5000","5050","5500"],a:1},{q:"0.999… =",o:["≈1","0.999","1"],a:2},{q:"15% of 200",o:["25","30","35"],a:1},{q:"Primes ≤ 20?",o:["7","8","9"],a:1},{q:"2⁵ + 2⁴ =",o:["40","48","56"],a:1}],chaser:[{q:"Primes ≤ 50?",o:["13","15","16"],a:1},{q:"96\xf7(4\xd73)+11\xb2",o:["121","129","137"],a:1},{q:"√(625−225) =",o:["18","20","22"],a:1},{q:"3⁵ \xf7 9 + 7 =",o:["30","34","40"],a:1},{q:"Divisors of 60?",o:["10","12","14"],a:1},{q:"√1296 =",o:["34","36","38"],a:1},{q:"(13\xb2−5\xb2)\xf78",o:["18","20","22"],a:0},{q:"2\xb2⁰\xb2⁶\xf72\xb2⁰\xb2⁵+2=",o:["2","4","2026"],a:1},{q:"log2 + log5 =",o:["0","1","2"],a:1},{q:"∫x dx =",o:["x+C","x\xb2+C","x\xb2/2+C"],a:2},{q:"√(−4) =",o:["2","2i","−2"],a:1},{q:"sin30\xb0+cos60\xb0=",o:["0","1","√2"],a:1},{q:"i\xb2 + i⁴ =",o:["0","−1","2"],a:0},{q:"∞ − ∞ =",o:["0","∞","Undefined"],a:2},{q:"(13\xb2−5\xb2)\xf7(13+5)=",o:["6","8","10"],a:1}]};function i(e){try{let t=new(window.AudioContext||window.webkitAudioContext),a=t.createOscillator(),r=t.createGain();a.connect(r),r.connect(t.destination),"correct"===e?(a.frequency.setValueAtTime(523,t.currentTime),a.frequency.exponentialRampToValueAtTime(784,t.currentTime+.1),r.gain.setValueAtTime(.2,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.2),a.start(),a.stop(t.currentTime+.2)):"wrong"===e?(a.frequency.setValueAtTime(200,t.currentTime),a.frequency.exponentialRampToValueAtTime(100,t.currentTime+.25),r.gain.setValueAtTime(.2,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.25),a.start(),a.stop(t.currentTime+.25)):(a.frequency.setValueAtTime(659,t.currentTime),a.frequency.exponentialRampToValueAtTime(1047,t.currentTime+.15),r.gain.setValueAtTime(.3,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.3),a.start(),a.stop(t.currentTime+.3))}catch{}}let l=[{id:"easy",label:"Easy",icon:"\uD83D\uDFE2",time:"12s",desc:"Warm up your brain",color:"#10b981",glow:"rgba(16,185,129,.35)"},{id:"medium",label:"Medium",icon:"\uD83D\uDD35",time:"10s",desc:"Pick up the pace",color:"#3b82f6",glow:"rgba(59,130,246,.35)"},{id:"hard",label:"Hard",icon:"\uD83D\uDFE0",time:"8s",desc:"No time to hesitate",color:"#f59e0b",glow:"rgba(245,158,11,.35)"},{id:"chaser",label:"Chaser",icon:"⚡",time:"5s",desc:"The Chaser is coming",color:"#ef4444",glow:"rgba(239,68,68,.4)"}];function m(){let[e,t]=(0,s.useState)("landing"),[a,m]=(0,s.useState)("easy"),[d,p]=(0,s.useState)([]),[x,u]=(0,s.useState)(0),[f,g]=(0,s.useState)(0),[b,h]=(0,s.useState)(0),[v,w]=(0,s.useState)(0),[y,j]=(0,s.useState)(100),[q,N]=(0,s.useState)(""),[k,S]=(0,s.useState)([]),[T,z]=(0,s.useState)(null),[C,A]=(0,s.useState)(!1),[E,$]=(0,s.useState)(""),[M,R]=(0,s.useState)({}),[I,V]=(0,s.useState)(!1),O=(0,s.useRef)(null),_=(0,s.useRef)(0),X=(0,s.useRef)(0),Y=(0,s.useRef)(0),B=(0,s.useRef)("easy"),L=(0,s.useRef)(()=>{});(0,s.useEffect)(()=>{X.current=f},[f]),(0,s.useEffect)(()=>{Y.current=v},[v]),(0,s.useEffect)(()=>{B.current=a},[a]),(0,s.useEffect)(()=>{let e={};["easy","medium","hard","chaser"].forEach(t=>{e[t]=parseInt(localStorage.getItem(`mc_best_${t}`)||"0")}),R(e)},[]),(0,s.useEffect)(()=>{if("landing"!==e)return;let t=setInterval(()=>V(e=>!e),1800);return()=>clearInterval(t)},[e]);let P=(0,s.useCallback)(()=>{O.current&&(clearInterval(O.current),O.current=null)},[]),G=(0,s.useCallback)((e,a,r,s)=>{P(),A(e),t("result");let o=`mc_best_${s}`;a>parseInt(localStorage.getItem(o)||"0")&&(localStorage.setItem(o,String(a)),R(e=>({...e,[s]:a})))},[P]);(0,s.useEffect)(()=>{L.current=G},[G]);let D=(0,s.useCallback)(e=>{P(),_.current=10*e,O.current=setInterval(()=>{_.current--,j(Math.max(_.current/(10*e)*100,0)),N((_.current/10).toFixed(1)+"s"),_.current<=0&&(P(),L.current(!1,X.current,Y.current,B.current))},100)},[P]),U=(0,s.useCallback)(e=>{P();let a=n([...c[e],...Array.from({length:5},()=>{if("easy"===e){let e=o(3,15),t=o(3,15),a=e+t,r=n([String(a),String(a-2),String(a+2)]);return{q:`${e} + ${t} =`,o:r,a:r.indexOf(String(a))}}if("medium"===e){let e=o(8,15),t=o(8,15),a=e*t,r=n([String(a),String(a-10),String(a+10)]);return{q:`${e} \xd7 ${t} =`,o:r,a:r.indexOf(String(a))}}if("hard"===e){let e=[2,3,4,5][o(0,3)],t=o(4,6),a=Math.pow(e,t),r=n([String(a),String(2*a),String(Math.round(a/2))]);return{q:`${e}^${t} =`,o:r,a:r.indexOf(String(a))}}{let e=o(10,20),t=o(3,9),a=e*e-t*t,r=n([String(a),String(a+t),String(a-e)]);return{q:`${e}\xb2 − ${t}\xb2 =`,o:r,a:r.indexOf(String(a))}}})]);m(e),B.current=e,p(a),u(0),g(0),X.current=0,h(0),w(0),Y.current=0,z(null),A(!1),t("game"),S(a.map((e,t)=>0===t?"current":"idle"))},[P]);(0,s.useEffect)(()=>{if("game"===e&&0!==d.length&&!(x>=d.length)){var t;return z(null),D("easy"===(t=B.current)?12:"medium"===t?10:"hard"===t?8:5),()=>P()}},[x,e,d.length]);let F=(0,s.useCallback)(e=>{if(null!==T)return;P(),z(e);let t=e===d[x].a;if(S(e=>e.map((e,a)=>a===x?t?"correct":"wrong":a===x+1?"current":e)),t){i("correct");let e=f+1,t=b+1,a=Math.max(v,t);g(e),X.current=e,h(t),w(a),Y.current=a,t>=3&&(i("combo"),$(`${t}\xd7 COMBO!`),setTimeout(()=>$(""),800)),setTimeout(()=>{x+1>=d.length?G(!0,e,a,B.current):u(e=>e+1)},380)}else i("wrong"),setTimeout(()=>G(!1,f,v,B.current),600)},[T,d,x,f,b,v,P,G]);(0,s.useEffect)(()=>()=>P(),[P]);let H=d[x],W=l.find(e=>e.id===a),J=y<15,K=y<30&&!J;return(0,r.jsxs)("div",{className:"mc",children:["landing"===e&&(0,r.jsxs)("div",{className:"mc-landing",children:[(0,r.jsxs)("div",{className:"mc-landing-bg",children:[(0,r.jsx)("div",{className:"mc-orb mc-orb1"}),(0,r.jsx)("div",{className:"mc-orb mc-orb2"}),(0,r.jsx)("div",{className:"mc-orb mc-orb3"})]}),(0,r.jsxs)("div",{className:"mc-landing-content",children:[(0,r.jsx)("div",{className:`mc-icon-ring ${I?"mc-pulse":""}`,children:(0,r.jsx)("span",{className:"mc-brain",children:"\uD83E\uDDE0"})}),(0,r.jsxs)("h1",{className:"mc-hero-title",children:["Math",(0,r.jsx)("br",{}),"Chaser"]}),(0,r.jsx)("div",{className:"mc-hero-badge",children:"PRO"}),(0,r.jsx)("p",{className:"mc-hero-sub",children:"Beat the clock. Outsmart the Chaser."}),(0,r.jsxs)("button",{className:"mc-cta",onClick:()=>t("levels"),children:[(0,r.jsx)("span",{children:"PLAY NOW"}),(0,r.jsx)("span",{className:"mc-cta-arrow",children:"→"})]}),(0,r.jsx)("div",{className:"mc-stats-row",children:["easy","medium","hard","chaser"].map(e=>(0,r.jsxs)("div",{className:"mc-stat-chip",children:[(0,r.jsx)("span",{className:"mc-stat-num",children:M[e]||0}),(0,r.jsx)("span",{className:"mc-stat-label",children:e})]},e))})]})]}),"levels"===e&&(0,r.jsxs)("div",{className:"mc-levels",children:[(0,r.jsx)("button",{className:"mc-back",onClick:()=>t("landing"),children:"← Back"}),(0,r.jsxs)("h2",{className:"mc-levels-title",children:["Choose Your",(0,r.jsx)("br",{}),(0,r.jsx)("span",{className:"mc-accent",children:"Challenge"})]}),(0,r.jsx)("div",{className:"mc-level-grid",children:l.map(e=>(0,r.jsxs)("button",{className:"mc-level-card",style:{"--c":e.color,"--g":e.glow},onClick:()=>U(e.id),children:[(0,r.jsxs)("div",{className:"mc-lc-top",children:[(0,r.jsx)("span",{className:"mc-lc-icon",children:e.icon}),(0,r.jsx)("span",{className:"mc-lc-time",children:e.time})]}),(0,r.jsx)("div",{className:"mc-lc-name",children:e.label}),(0,r.jsx)("div",{className:"mc-lc-desc",children:e.desc}),(0,r.jsxs)("div",{className:"mc-lc-best",children:["Best: ",M[e.id]||0]}),(0,r.jsx)("div",{className:"mc-lc-arrow",children:"→"})]},e.id))})]}),"game"===e&&H&&(0,r.jsxs)("div",{className:"mc-game",style:{"--lc":W?.color,"--lg":W?.glow},children:[(0,r.jsxs)("div",{className:"mc-top-bar",children:[(0,r.jsx)("button",{className:"mc-quit",onClick:()=>t("levels"),children:"✕"}),(0,r.jsx)("div",{className:"mc-pills",children:k.map((e,t)=>(0,r.jsx)("div",{className:`mc-pill mc-pill-${e}`},t))}),(0,r.jsx)("div",{className:"mc-score-badge",children:f})]}),(0,r.jsxs)("div",{className:"mc-timer-wrap",children:[(0,r.jsx)("div",{className:"mc-timer-track",children:(0,r.jsx)("div",{className:"mc-timer-fill",style:{width:y+"%",background:J?"#ef4444":K?"#f59e0b":W?.color||"#3b82f6",boxShadow:J?"0 0 12px #ef4444":K?"0 0 12px #f59e0b":`0 0 12px ${W?.color}`}})}),(0,r.jsx)("span",{className:"mc-timer-text",style:{color:J?"#ef4444":K?"#f59e0b":"#94a3b8"},children:q})]}),(0,r.jsxs)("div",{className:"mc-counter",children:[x+1," ",(0,r.jsxs)("span",{style:{color:"#475569"},children:["/ ",d.length]})]}),(0,r.jsx)("div",{className:"mc-question",children:H.q}),(0,r.jsx)("div",{className:"mc-options",children:H.o.map((e,t)=>{let a=null!==T&&t===H.a,s=null!==T&&t===T&&t!==H.a;return(0,r.jsxs)("button",{className:`mc-opt ${a?"mc-opt-correct":""} ${s?"mc-opt-wrong":""}`,onClick:()=>F(t),disabled:null!==T,children:[(0,r.jsx)("span",{className:"mc-opt-letter",children:["A","B","C"][t]}),(0,r.jsx)("span",{className:"mc-opt-text",children:e}),a&&(0,r.jsx)("span",{className:"mc-opt-icon",children:"✓"}),s&&(0,r.jsx)("span",{className:"mc-opt-icon",children:"✗"})]},t)})}),b>=2&&(0,r.jsxs)("div",{className:"mc-combo-bar",children:[(0,r.jsx)("span",{className:"mc-fire",children:"\uD83D\uDD25"}),(0,r.jsxs)("span",{children:[b,"\xd7 combo"]})]}),E&&(0,r.jsx)("div",{className:"mc-combo-flash",children:E})]}),"result"===e&&(0,r.jsxs)("div",{className:"mc-result",children:[(0,r.jsx)("div",{className:"mc-result-icon",children:C?"\uD83C\uDFC6":"\uD83D\uDCA5"}),(0,r.jsx)("h2",{className:"mc-result-title",children:C?"You Escaped!":"Chaser Got You!"}),(0,r.jsx)("p",{className:"mc-result-sub",children:C?"Flawless run! The Chaser never stood a chance.":"Better luck next time. The Chaser is relentless."}),(0,r.jsxs)("div",{className:"mc-result-cards",children:[(0,r.jsxs)("div",{className:"mc-result-card",children:[(0,r.jsx)("div",{className:"mc-result-num",style:{color:"#fbbf24"},children:f}),(0,r.jsx)("div",{className:"mc-result-label",children:"Score"})]}),v>0&&(0,r.jsxs)("div",{className:"mc-result-card",children:[(0,r.jsxs)("div",{className:"mc-result-num",style:{color:"#f97316"},children:[v,"\xd7"]}),(0,r.jsx)("div",{className:"mc-result-label",children:"Best Combo"})]}),(0,r.jsxs)("div",{className:"mc-result-card",children:[(0,r.jsx)("div",{className:"mc-result-num",style:{color:"#10b981"},children:M[a]||0}),(0,r.jsx)("div",{className:"mc-result-label",children:"Personal Best"})]})]}),(0,r.jsxs)("button",{className:"mc-cta",style:{margin:"0 auto"},onClick:()=>U(a),children:[(0,r.jsx)("span",{children:"PLAY AGAIN"}),(0,r.jsx)("span",{className:"mc-cta-arrow",children:"→"})]}),(0,r.jsx)("button",{className:"mc-text-btn",onClick:()=>t("levels"),children:"Choose Different Level"})]}),(0,r.jsx)("style",{children:`
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
      `})]})}},1939:(e,t,a)=>{Promise.resolve().then(a.bind(a,536))}},e=>{e.O(0,[441,794,358],()=>e(e.s=1939)),_N_E=e.O()}]);