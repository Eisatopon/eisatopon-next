(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[918],{1774:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>l});var i=a(5155),r=a(2115);let o=[{category:"Number Sense",text:"I have difficulty understanding what a number represents (e.g. that 5 is more than 3)."},{category:"Number Sense",text:"I find it hard to tell which of two numbers is larger."},{category:"Number Sense",text:"I confuse similar-looking digits (e.g. 6 and 9, 3 and 8)."},{category:"Number Sense",text:"I struggle to estimate quantities (e.g. how many people are in a room)."},{category:"Number Sense",text:"I have trouble understanding number relationships (e.g. that 10 = 5 + 5)."},{category:"Number Sense",text:"I find it difficult to read or write large numbers."},{category:"Number Sense",text:"I have trouble understanding place value (units, tens, hundreds)."},{category:"Number Sense",text:"I do not easily understand fractions (e.g. 1/2, 3/4)."},{category:"Number Sense",text:"I mix up the + and − signs, or \xd7 and \xf7."},{category:"Number Sense",text:"I find sequential counting difficult (1, 2, 3, 4…)."},{category:"Mental Arithmetic",text:"I struggle to add simple numbers in my head (e.g. 7 + 5)."},{category:"Mental Arithmetic",text:"I still need to count on my fingers even for simple calculations."},{category:"Mental Arithmetic",text:"I cannot do mental subtraction (e.g. 15 − 8)."},{category:"Mental Arithmetic",text:"I lose track of the steps when calculating in my head."},{category:"Mental Arithmetic",text:"I find it hard to work out change when paying in a shop."},{category:"Mental Arithmetic",text:"I need a lot of time to solve even simple math problems."},{category:"Mental Arithmetic",text:"I cannot judge whether an answer is reasonable or not."},{category:"Mental Arithmetic",text:"I get confused when a problem requires more than one step."},{category:"Mental Arithmetic",text:"I find division or multiplication difficult without a calculator."},{category:"Mental Arithmetic",text:"I get wrong answers even when I know the correct method."},{category:"Times Tables",text:"I have not memorised the 2\xd7 table."},{category:"Times Tables",text:"I struggle with the 3\xd7, 4\xd7 and 5\xd7 tables."},{category:"Times Tables",text:"The 6\xd7, 7\xd7, 8\xd7 and 9\xd7 tables are very difficult for me."},{category:"Times Tables",text:"I forget the answers even if I have learnt them before."},{category:"Times Tables",text:"I need to count or calculate each time rather than recall from memory."},{category:"Times Tables",text:"I do not understand the logic behind multiplication."},{category:"Times Tables",text:"I feel anxious when asked to answer times-table questions quickly."},{category:"Times Tables",text:"I avoid tasks that involve multiplication."},{category:"Space & Time",text:"I have difficulty reading the time on an analogue clock."},{category:"Space & Time",text:"I find it hard to judge how much time has passed."},{category:"Space & Time",text:"I get confused following left/right directions."},{category:"Space & Time",text:"I struggle to estimate distances."},{category:"Space & Time",text:"I cannot easily judge the size or weight of objects."},{category:"Space & Time",text:"I mix up the order of events (what happened first, what came next)."},{category:"Space & Time",text:"I find maps or diagrams hard to understand."},{category:"Space & Time",text:"I cannot easily visualise shapes or objects in my mind."},{category:"Money & Daily Life",text:"I find it difficult to count money (coins and notes)."},{category:"Money & Daily Life",text:"I cannot easily calculate the total cost of my shopping."},{category:"Money & Daily Life",text:"I feel anxious when paying or receiving change."},{category:"Money & Daily Life",text:"I struggle to manage a budget or small amounts of money."},{category:"Money & Daily Life",text:'I do not understand concepts such as "discount" or "VAT".'},{category:"Money & Daily Life",text:"I get confused calculating percentages (e.g. 20% off)."},{category:"Money & Daily Life",text:"I find it difficult to plan my schedule based on time."},{category:"Money & Daily Life",text:"I avoid situations that require calculation (e.g. splitting a bill)."},{category:"Emotional Impact",text:"I feel anxious or afraid when I have to do maths."},{category:"Emotional Impact",text:"I avoid classes or activities that involve numbers."},{category:"Emotional Impact",text:'I feel that I am "stupid" at maths.'},{category:"Emotional Impact",text:"My maths grades are much lower than in other subjects."},{category:"Emotional Impact",text:"I need much more time than my classmates to complete maths tasks."},{category:"Emotional Impact",text:"I have lost confidence in myself because of maths."}],s=["Never","Rarely","Sometimes","Often","Always"],n={"Number Sense":"#3b82f6","Mental Arithmetic":"#8b5cf6","Times Tables":"#f59e0b","Space & Time":"#10b981","Money & Daily Life":"#ec4899","Emotional Impact":"#ef4444"};function l(){let[e,t]=(0,r.useState)(0),[a,l]=(0,r.useState)(Array(o.length).fill(null)),[c,p]=(0,r.useState)(!1),[g,m]=(0,r.useState)(0),x=o[e],h=a[e],u=o.length,b=(e+1)/u*100;if(c){let e=a.filter(e=>null!==e).reduce((e,t)=>e+t,0)/(4*u)*100,r=e<=25?{level:"Low Likelihood",icon:"✅",color:"#10b981",bg:"rgba(16,185,129,.08)",border:"rgba(16,185,129,.3)",headline:"Low Likelihood of Dyscalculia",body:"Your responses do not suggest significant mathematical difficulties associated with dyscalculia. Continue practising and developing your skills.",recs:["Keep up regular maths practice","Explore advanced topics that interest you","Support classmates who find maths difficult"]}:e<=50?{level:"Moderate Difficulties",icon:"⚠️",color:"#f59e0b",bg:"rgba(245,158,11,.08)",border:"rgba(245,158,11,.3)",headline:"Some Mathematical Difficulties Detected",body:"Your responses suggest difficulties in certain areas of mathematics. Additional support and targeted practice are recommended.",recs:["Speak with your teacher about targeted help","Use educational tools and maths games","Practise in small, consistent daily steps","Consider tutoring support if needed"]}:e<=75?{level:"Significant Difficulties",icon:"\uD83D\uDD34",color:"#ef4444",bg:"rgba(239,68,68,.08)",border:"rgba(239,68,68,.3)",headline:"Significant Difficulties — Possible Dyscalculia",body:"Your responses indicate significant difficulties across several areas of mathematics. A full assessment by a specialist is strongly recommended.",recs:["Consult a learning disabilities specialist as soon as possible","Inform your teachers about your difficulties","Request an individualised support plan","Use assistive tools (calculator, visual aids)","Remember: dyscalculia does not affect overall intelligence"]}:{level:"High Likelihood",icon:"\uD83D\uDEA8",color:"#ef4444",bg:"rgba(239,68,68,.10)",border:"rgba(239,68,68,.4)",headline:"Very Significant Difficulties — High Likelihood of Dyscalculia",body:"Your responses show very extensive and significant mathematical difficulties. Urgent referral to a specialist for formal assessment and immediate intervention is recommended.",recs:["⚠️ URGENT: See a learning disabilities specialist immediately","Request a formal assessment and diagnosis","Inform your school for specialised educational support","Explore individualised teaching programmes","Remember: many people with dyscalculia excel in other areas"]},s={};return o.forEach((e,t)=>{s[e.category]||(s[e.category]={total:0,count:0}),s[e.category].total+=a[t]??0,s[e.category].count++}),(0,i.jsxs)("div",{className:"dt-root",children:[(0,i.jsxs)("div",{className:"dt-result-wrap",children:[(0,i.jsxs)("div",{className:"dt-result-header",children:[(0,i.jsx)("div",{className:"dt-result-icon",children:r.icon}),(0,i.jsx)("h1",{className:"dt-result-title",children:"Assessment Complete"}),(0,i.jsx)("p",{className:"dt-result-sub",children:"Here is your personalised screening report"})]}),(0,i.jsxs)("div",{className:"dt-score-card",style:{"--ic":r.color},children:[(0,i.jsxs)("div",{className:"dt-score-num",style:{color:r.color},children:[e.toFixed(0),"%"]}),(0,i.jsx)("div",{className:"dt-score-label",children:"Overall Difficulty Score"}),(0,i.jsx)("div",{className:"dt-score-level",style:{color:r.color,background:r.bg,border:`1px solid ${r.border}`},children:r.level})]}),(0,i.jsxs)("div",{className:"dt-interp",style:{background:r.bg,borderColor:r.border},children:[(0,i.jsx)("h2",{className:"dt-interp-title",style:{color:r.color},children:r.headline}),(0,i.jsx)("p",{className:"dt-interp-body",children:r.body})]}),(0,i.jsxs)("div",{className:"dt-cats",children:[(0,i.jsx)("h3",{className:"dt-section-title",children:"Results by Category"}),Object.entries(s).map(([e,t])=>{let a=t.total/(4*t.count)*100,r=n[e]??"#3b82f6";return(0,i.jsxs)("div",{className:"dt-cat-row",children:[(0,i.jsxs)("div",{className:"dt-cat-header",children:[(0,i.jsx)("span",{className:"dt-cat-name",children:e}),(0,i.jsxs)("span",{className:"dt-cat-pct",style:{color:r},children:[a.toFixed(0),"%"]})]}),(0,i.jsx)("div",{className:"dt-cat-track",children:(0,i.jsx)("div",{className:"dt-cat-fill",style:{width:a+"%",background:r}})})]},e)})]}),(0,i.jsxs)("div",{className:"dt-recs",children:[(0,i.jsx)("h3",{className:"dt-recs-title",children:"\uD83D\uDCA1 Recommendations"}),(0,i.jsx)("ul",{className:"dt-recs-list",children:r.recs.map((e,t)=>(0,i.jsx)("li",{children:e},t))})]}),(0,i.jsxs)("div",{className:"dt-disclaimer",children:[(0,i.jsx)("strong",{children:"⚠️ Important Notice"}),"This screening tool is designed for initial awareness only and does NOT constitute a formal diagnosis. Only qualified healthcare or educational professionals can diagnose dyscalculia. If your results concern you, please consult a school psychologist, educational psychologist, or specialist in learning difficulties."]}),(0,i.jsxs)("div",{className:"dt-actions",children:[(0,i.jsx)("button",{className:"dt-btn dt-btn-primary",onClick:()=>window.print(),children:"\uD83D\uDDA8️ Print Results"}),(0,i.jsx)("button",{className:"dt-btn dt-btn-ghost",onClick:()=>{l(Array(u).fill(null)),t(0),p(!1)},children:"\uD83D\uDD04 Retake Test"})]})]}),(0,i.jsx)("style",{children:d})]})}return(0,i.jsxs)("div",{className:"dt-root",children:[(0,i.jsxs)("div",{className:"dt-wrap",children:[(0,i.jsxs)("header",{className:"dt-header",children:[(0,i.jsxs)("a",{href:"/",className:"dt-home-back",children:[(0,i.jsx)("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("path",{d:"M19 12H5M12 5l-7 7 7 7"})}),(0,i.jsx)("span",{children:"EisatoponAI"})]}),(0,i.jsxs)("div",{className:"dt-header-inner",children:[(0,i.jsx)("div",{className:"dt-badge",style:{background:`color-mix(in srgb,${n[x.category]} 15%,transparent)`,color:n[x.category]},children:x.category}),(0,i.jsx)("h1",{className:"dt-title",children:"Dyscalculia Screening Assessment"}),(0,i.jsx)("p",{className:"dt-subtitle",children:"Answer honestly — there are no right or wrong answers"})]})]}),(0,i.jsxs)("div",{className:"dt-progress",children:[(0,i.jsxs)("div",{className:"dt-progress-info",children:[(0,i.jsxs)("span",{children:["Question ",e+1," of ",u]}),(0,i.jsx)("span",{style:{color:n[x.category]},children:x.category})]}),(0,i.jsx)("div",{className:"dt-progress-track",children:(0,i.jsx)("div",{className:"dt-progress-fill",style:{width:b+"%",background:`linear-gradient(90deg,${n[x.category]},${n[x.category]}aa)`}})})]}),(0,i.jsxs)("div",{className:"dt-question",children:[(0,i.jsxs)("div",{className:"dt-q-number",children:["Q",e+1]}),(0,i.jsx)("p",{className:"dt-q-text",children:x.text}),(0,i.jsx)("div",{className:"dt-options",children:s.map((t,a)=>(0,i.jsxs)("button",{className:`dt-option ${h===a?"dt-option-selected":""}`,style:h===a?{"--oc":n[x.category]}:{},onClick:()=>{l(t=>{let i=[...t];return i[e]=a,i})},children:[(0,i.jsx)("div",{className:"dt-option-dot",style:h===a?{background:n[x.category],borderColor:n[x.category]}:{}}),(0,i.jsx)("span",{className:"dt-option-label",children:t}),(0,i.jsx)("span",{className:"dt-option-score",children:a})]},a))})]},g),(0,i.jsxs)("div",{className:"dt-nav",children:[(0,i.jsx)("button",{className:"dt-btn dt-btn-ghost",onClick:function(){e>0&&(t(e=>e-1),m(e=>e+1))},style:{visibility:0===e?"hidden":"visible"},children:"← Previous"}),(0,i.jsx)("div",{className:"dt-dots",children:Array.from({length:Math.ceil(u/10)},(e,t)=>{let r=10*t,o=Math.min(r+10,u),s=a.slice(r,o).filter(e=>null!==e).length;return(0,i.jsx)("div",{className:`dt-dot ${s===o-r?"dt-dot-done":s>0?"dt-dot-partial":""}`},t)})}),(0,i.jsx)("button",{className:"dt-btn dt-btn-primary",onClick:function(){e<u-1?(t(e=>e+1),m(e=>e+1)):p(!0)},disabled:null===h,style:null!==h?{background:n[x.category]}:{},children:e===u-1?"See Results →":"Next →"})]})]}),(0,i.jsx)("style",{children:d})]})}let d=`
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
`},6528:(e,t,a)=>{Promise.resolve().then(a.bind(a,1774))}},e=>{e.O(0,[441,794,358],()=>e(e.s=6528)),_N_E=e.O()}]);