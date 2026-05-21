(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[746],{1029:(e,r,t)=>{Promise.resolve().then(t.bind(t,9990))},9990:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>b});var n=t(5155),o=t(2115);let i=["R","L","U","D","F","B"],a=["","'","2"],s={R:"x",L:"x",U:"y",D:"y",F:"z",B:"z"};function l(e){return new Promise((r,t)=>{if(document.querySelector(`script[src="${e}"]`))return void r();let n=document.createElement("script");n.src=e,n.async=!0,n.onload=()=>r(),n.onerror=()=>t(Error("Failed: "+e)),document.head.appendChild(n)})}function d(e){return(e||"").replace(/\s+/g," ").trim()}function c(e=20){let r=[],t="";for(;r.length<e;){let e=i[Math.floor(Math.random()*i.length)],n=s[e];n!==t&&(r.push(e+a[Math.floor(Math.random()*a.length)]),t=n)}return r.join(" ")}async function p(e){if(navigator.clipboard?.writeText)return void await navigator.clipboard.writeText(e);let r=document.createElement("input");r.style.cssText="position:fixed;opacity:0;top:0;left:0",r.value=e,document.body.appendChild(r),r.focus(),r.select(),r.setSelectionRange(0,e.length);let t=document.execCommand("copy");if(document.body.removeChild(r),!t)throw Error("execCommand failed")}let x=[{key:"R",label:"Right",color:"#ef4444"},{key:"L",label:"Left",color:"#3b82f6"},{key:"U",label:"Up",color:"#fbbf24"},{key:"D",label:"Down",color:"#f97316"},{key:"F",label:"Front",color:"#10b981"},{key:"B",label:"Back",color:"#a78bfa"}];function b(){let e=(0,o.useRef)(null),r=(0,o.useRef)(!1),[t,i]=(0,o.useState)(""),[a,s]=(0,o.useState)(null),[b,u]=(0,o.useState)(""),[g,m]=(0,o.useState)(!0),[k,f]=(0,o.useState)(!1),[h,y]=(0,o.useState)(!1),[v,j]=(0,o.useState)("engine"),[w,N]=(0,o.useState)(!1),C=(0,o.useCallback)((r,t="")=>{let n=e.current;if(!n||"function"!=typeof window.AnimCube3)return;for(;n.firstChild;)n.removeChild(n.firstChild);let o=document.createElement("div");o.style.cssText="width:100%;height:100%",n.appendChild(o);let i=`initmove=${encodeURIComponent(r)}&move=${encodeURIComponent(t)}&initrevmove=#`,a=document.createElement("script");a.text=`AnimCube3('${("edit=1&snap=1&speed=10&bgcolor=ffffff&cubecolor=000000&buttonbar=0&hint=0&movetext=1&textsize=12&position=lluu&"+i).replace(/'/g,"\\'")}')`,o.appendChild(a)},[]);(0,o.useEffect)(()=>{let e=!1;return(async()=>{try{if(j("engine"),await l("https://animcubejs.cubing.net/AnimCube3.js"),e||(j("solver"),await l("https://unpkg.com/cubejs/lib/cube.js"),await l("https://unpkg.com/cubejs/lib/solve.js"),e))return;r.current=!1,j(null),f(!0),m(!1)}catch(r){e||(u("Load error: "+(r instanceof Error?r.message:r)),m(!1),j(null))}})(),()=>{e=!0}},[]),(0,o.useEffect)(()=>{if(!k)return;let e=c();i(e),C(e,"")},[k,C]),(0,o.useEffect)(()=>()=>{let r=e.current;if(r)for(;r.firstChild;)r.removeChild(r.firstChild)},[]);let z=()=>{s(null),u(""),C(d(t),"")},S=async()=>{if(!a)return void u("Press Solve first.");try{await p(a),y(!0),u(""),setTimeout(()=>y(!1),2e3)}catch{u("Copy failed – please select manually.")}};return(0,n.jsxs)("div",{className:"rk-root",children:[(0,n.jsxs)("div",{className:"rk-bg",children:[(0,n.jsx)("div",{className:"rk-orb rk-orb1"}),(0,n.jsx)("div",{className:"rk-orb rk-orb2"}),(0,n.jsx)("div",{className:"rk-orb rk-orb3"})]}),(0,n.jsxs)("header",{className:"rk-header",children:[(0,n.jsxs)("div",{className:"rk-brand",children:[(0,n.jsx)("div",{className:"rk-cube-icon",children:(0,n.jsx)("span",{children:"⬛"})}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("h1",{className:"rk-title",children:["Rubik's Cube",(0,n.jsx)("br",{}),(0,n.jsx)("span",{className:"rk-title-accent",children:"Solver"})]}),(0,n.jsx)("p",{className:"rk-sub",children:"Interactive 3D \xb7 WCA Notation \xb7 Optimal Solution"})]})]}),v&&(0,n.jsxs)("div",{className:"rk-loading-pill",children:[(0,n.jsx)("div",{className:"rk-spinner"}),(0,n.jsx)("span",{children:"engine"===v?"Loading 3D engine…":"Loading solver…"})]}),!v&&(0,n.jsxs)("div",{className:"rk-controls",children:[(0,n.jsx)("input",{className:"rk-input",value:t,onChange:e=>i(e.target.value),onKeyDown:e=>"Enter"===e.key&&z(),placeholder:"R U R' U' F2 …",spellCheck:!1,autoComplete:"off",disabled:g}),(0,n.jsxs)("div",{className:"rk-btns",children:[(0,n.jsx)("button",{onClick:()=>{let e=c();i(e),s(null),u(""),C(e,"")},disabled:g,className:"rk-btn rk-btn-ghost",children:"Random"}),(0,n.jsx)("button",{onClick:z,disabled:g,className:"rk-btn rk-btn-teal",children:"Scramble"}),(0,n.jsx)("button",{onClick:()=>{let e=d(t);e&&(m(!0),u("Computing solution…"),setTimeout(()=>{try{r.current||(window.Cube.initSolver(),r.current=!0);let t=new window.Cube;t.move(e);let n=t.solve();s(n),C(e,n),u("")}catch(e){s("Invalid scramble – use standard WCA notation.\n\n"+e),u("Invalid scramble.")}finally{m(!1)}},50))},disabled:g,className:"rk-btn rk-btn-primary",children:"Solve →"}),(0,n.jsx)("button",{onClick:()=>{let e=c();i(e),s(null),u(""),C(e,"")},disabled:g,className:"rk-btn rk-btn-ghost",children:"Reset"})]})]})]}),(0,n.jsxs)("div",{className:"rk-grid",children:[(0,n.jsxs)("section",{className:"rk-panel rk-cube-panel",children:[(0,n.jsx)("div",{className:"rk-panel-label",children:"3D Viewer"}),(0,n.jsx)("div",{ref:e,className:"rk-cube","aria-label":"Interactive 3D Rubik's Cube"}),(0,n.jsx)("p",{className:"rk-tip",children:"Drag to rotate \xb7 Scroll to zoom"})]}),(0,n.jsxs)("div",{className:"rk-right",children:[(0,n.jsxs)("section",{className:"rk-panel rk-sol-panel",children:[(0,n.jsxs)("div",{className:"rk-sol-header",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"rk-panel-label",children:"Solution Algorithm"}),a&&(0,n.jsxs)("div",{className:"rk-move-count",children:[a.trim().split(/\s+/).length," moves"]})]}),(0,n.jsx)("button",{onClick:S,disabled:!a||g,className:`rk-copy-btn ${h?"rk-copied":""}`,children:h?"✓ Copied!":"Copy"})]}),(0,n.jsx)("pre",{className:"rk-out",children:g?"⏳ Computing…":a||(k?'Press "Solve" to generate an optimal solution.':"Loading…")}),b&&(0,n.jsx)("div",{className:`rk-status ${b.includes("error")||b.includes("Invalid")||b.includes("failed")?"rk-status-err":""}`,children:b})]}),(0,n.jsxs)("section",{className:"rk-panel rk-notation",children:[(0,n.jsxs)("button",{className:"rk-notation-toggle",onClick:()=>N(e=>!e),children:[(0,n.jsx)("span",{className:"rk-panel-label",children:"Notation Guide"}),(0,n.jsx)("span",{className:"rk-chevron",style:{transform:w?"rotate(180deg)":"rotate(0deg)"},children:"▾"})]}),w&&(0,n.jsxs)("div",{className:"rk-notation-body",children:[(0,n.jsx)("div",{className:"rk-notation-grid",children:x.map(e=>(0,n.jsxs)("div",{className:"rk-notation-chip",style:{"--nc":e.color},children:[(0,n.jsx)("span",{className:"rk-nk",children:e.key}),(0,n.jsx)("span",{className:"rk-nl",children:e.label})]},e.key))}),(0,n.jsxs)("div",{className:"rk-notation-mods",children:[(0,n.jsxs)("div",{className:"rk-mod-chip",children:[(0,n.jsx)("code",{children:"R"})," ",(0,n.jsx)("span",{children:"= 90\xb0 clockwise"})]}),(0,n.jsxs)("div",{className:"rk-mod-chip",children:[(0,n.jsx)("code",{children:"R'"})," ",(0,n.jsx)("span",{children:"= 90\xb0 counter-clockwise"})]}),(0,n.jsxs)("div",{className:"rk-mod-chip",children:[(0,n.jsx)("code",{children:"R2"})," ",(0,n.jsx)("span",{children:"= 180\xb0 turn"})]})]})]})]})]})]}),(0,n.jsxs)("footer",{className:"rk-footer",children:[(0,n.jsx)("strong",{children:"EisatoponAI"}),"\xa0\xb7\xa0 Your Daily Experience of Math Adventures"]}),(0,n.jsx)("style",{children:`
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
        @media(max-width:600px){
          .rk-header { padding:16px; }
          .rk-controls { justify-content:flex-start; }
          .rk-input { max-width:100%; }
          .rk-notation-grid { grid-template-columns:repeat(2,1fr); }
        }
      `})]})}}},e=>{e.O(0,[441,794,358],()=>e(e.s=1029)),_N_E=e.O()}]);