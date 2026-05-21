'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function RubikCubeSolver() {
  const cubeHostRef = useRef<HTMLDivElement>(null);
  const [scramble, setScramble] = useState('');
  const [solution, setSolution] = useState('');
  const [status, setStatus] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  // Δημιουργία τυχαίου scramble
  const randomScramble = (len = 20): string => {
    const moves = ["R", "L", "U", "D", "F", "B"];
    const mods = ["", "'", "2"];
    const axis: any = { R: "x", L: "x", U: "y", D: "y", F: "z", B: "z" };
    let out: string[] = [];
    let lastAxis: string | null = null;

    while (out.length < len) {
      const m = moves[Math.floor(Math.random() * moves.length)];
      if (axis[m] === lastAxis) continue;
      out.push(m + mods[Math.floor(Math.random() * mods.length)]);
      lastAxis = axis[m];
    }
    return out.join(" ");
  };

  const cleanAlg = (s: string) => (s || "").replace(/\s+/g, " ").trim();

  const renderCube = (scr: string, sol: string = '') => {
    if (!cubeHostRef.current) return;

    cubeHostRef.current.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width:100%; height:100%;';
    cubeHostRef.current.appendChild(container);

    const base = "edit=1&snap=1&speed=10&bgcolor=ffffff&cubecolor=111111&buttonbar=0&hint=0&movetext=1&textsize=12&position=lluu";
    const params = `initmove=${encodeURIComponent(scr)}&move=${encodeURIComponent(sol)}&initrevmove=#`;

    const script = document.createElement('script');
    script.textContent = `AnimCube3('${base}&${params}')`;
    container.appendChild(script);
  };

  const generateNew = () => {
    const newScr = randomScramble(20);
    setScramble(newScr);
    setSolution('');
    setStatus('');
    setIsSolved(false);
    renderCube(newScr);
  };

  const solveNow = async () => {
    const clean = cleanAlg(scramble);
    if (!clean) {
      setStatus("Please enter a scramble first");
      return;
    }

    setStatus("Solving...");
    setIsSolved(false);

    try {
      await import('https://unpkg.com/cubejs/lib/cube.js');
      await import('https://unpkg.com/cubejs/lib/solve.js');

      // @ts-ignore
      if (typeof window.Cube !== 'undefined') {
        window.Cube.initSolver();
        // @ts-ignore
        const c = new window.Cube();
        c.move(clean);
        const sol = c.solve();

        setSolution(sol);
        setIsSolved(true);
        setStatus("✅ Solved successfully!");
        renderCube(clean, sol);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: Invalid scramble");
    }
  };

  const copySolution = async () => {
    if (!solution) return;
    await navigator.clipboard.writeText(solution);
    setStatus("✅ Copied to clipboard!");
    setTimeout(() => setStatus(''), 2500);
  };

  // Αρχική φόρτωση
  useEffect(() => {
    generateNew();
  }, []);

  return (
    <>
      <Script src="https://animcubejs.cubing.net/AnimCube3.js" strategy="afterInteractive" />

      <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#05070a] to-[#0b1020] py-10 px-4">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl p-6 mb-8 shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Rubik&apos;s Cube Solver</h1>
              <p className="text-gray-600 mt-1">Interactive 3D • Works in Browser</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <input
                value={scramble}
                onChange={(e) => setScramble(e.target.value)}
                placeholder="R U R' U' F2 ..."
                className="w-96 px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                onClick={generateNew}
                className="px-7 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition"
              >
                Random
              </button>
              <button
                onClick={solveNow}
                className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition"
              >
                Solve
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cube */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <div
                ref={cubeHostRef}
                className="w-full aspect-[480/510] max-w-[480px] mx-auto bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-inner"
              />
              <p className="text-center text-sm text-gray-500 mt-5">
                🖱️ Drag to rotate • Scroll to zoom
              </p>
            </div>

            {/* Solution */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-gray-900">Solution Algorithm</h2>
                <button
                  onClick={copySolution}
                  disabled={!solution}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-2xl font-medium flex items-center gap-2"
                >
                  📋 Copy
                </button>
              </div>

              <pre className="flex-1 bg-gray-50 p-6 rounded-2xl font-mono text-sm leading-relaxed overflow-auto border border-gray-100 text-gray-800">
                {solution || 'Press "Solve" to get the optimal solution...'}
              </pre>

              {status && (
                <p className={`mt-5 text-sm font-medium ${isSolved ? 'text-green-600' : 'text-amber-600'}`}>
                  {status}
                </p>
              )}
            </div>
          </div>

          <div className="text-center text-white/60 text-sm mt-12">
            <b>EisatoponAI</b> — Your Daily Experience of Math Adventures
          </div>
        </div>
      </div>
    </>
  );
}