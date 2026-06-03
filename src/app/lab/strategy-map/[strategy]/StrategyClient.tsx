"use client";
import { useState } from "react";
import Link from "next/link";
import { strategies } from "../strategies-data";
import { notFound } from "next/navigation";

type Level = "Basic" | "Intermediate" | "Advanced";

function ProblemCard({
  problem,
  color,
}: {
  problem: {
    level: Level;
    emoji: string;
    statement: string;
    hint: string;
    hintKey: string;
    solution: string;
  };
  color: string;
}) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const levelColors: Record<Level, string> = {
    Basic: "#10b981",
    Intermediate: "#f59e0b",
    Advanced: "#ef4444",
  };
  const lc = levelColors[problem.level];

  return (
    <div
      className="rounded-2xl p-7 mb-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid rgba(255,255,255,0.07)`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">{problem.emoji}</span>
        <span
          className="text-[0.65rem] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
          style={{ background: `${lc}18`, border: `1px solid ${lc}30`, color: lc }}
        >
          {problem.level}
        </span>
      </div>

      <div
        className="mb-6 text-[1rem] leading-relaxed"
        style={{ color: "rgba(245,241,232,0.88)", fontFamily: "var(--font-serif, Georgia, serif)" }}
        dangerouslySetInnerHTML={{
          __html: problem.statement
            .replace(/\$\$(.+?)\$\$/g, '<span class="math-block">\\[$1\\]</span>')
            .replace(/\$(.+?)\$/g, '<span class="math-inline">\\($1\\)</span>'),
        }}
      />

      <div className="mb-4">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-lg transition-all duration-200"
          style={{
            background: showHint ? `${color}18` : "rgba(255,255,255,0.05)",
            border: `1px solid ${showHint ? color + "30" : "rgba(255,255,255,0.08)"}`,
            color: showHint ? color : "rgba(245,241,232,0.5)",
          }}
        >
          💡 {showHint ? "Hide Hint" : "Show Hint"}
        </button>
        {showHint && (
          <div
            className="mt-3 p-4 rounded-xl text-[0.88rem] leading-relaxed"
            style={{ background: `${color}0c`, border: `1px solid ${color}20`, color: "rgba(245,241,232,0.75)" }}
          >
            <p>{problem.hint}</p>
            <p className="mt-2 font-semibold" style={{ color }}>Key: {problem.hintKey}</p>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-lg transition-all duration-200"
          style={{
            background: showSolution ? `${color}18` : "rgba(255,255,255,0.05)",
            border: `1px solid ${showSolution ? color + "30" : "rgba(255,255,255,0.08)"}`,
            color: showSolution ? color : "rgba(245,241,232,0.5)",
          }}
        >
          📝 {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
        {showSolution && (
          <div
            className="mt-3 p-5 rounded-xl text-[0.88rem] leading-relaxed"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(245,241,232,0.82)",
              fontFamily: "var(--font-serif, Georgia, serif)",
            }}
            dangerouslySetInnerHTML={{
              __html: problem.solution
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br/>")
                .replace(/\$\$(.+?)\$\$/g, '<span class="math-block">\\[$1\\]</span>')
                .replace(/\$(.+?)\$/g, '<span class="math-inline">\\($1\\)</span>'),
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function StrategyClient({ strategyId }: { strategyId: string }) {
  const strategy = strategies.find((s) => s.id === strategyId);
  if (!strategy) notFound();

  const currentIndex = strategies.indexOf(strategy);
  const prev = currentIndex > 0 ? strategies[currentIndex - 1] : null;
  const next = currentIndex < strategies.length - 1 ? strategies[currentIndex + 1] : null;

  return (
    <>
      <script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
      <main className="min-h-screen" style={{ background: "radial-gradient(circle at top, #0b1020 0%, #05070a 60%)" }}>
        <section className="border-b border-white/10" style={{ background: `linear-gradient(180deg, ${strategy.color}08 0%, transparent 100%)` }}>
          <div className="max-w-[900px] mx-auto px-6 py-20 pt-28">
            <Link href="/lab/strategy-map" className="inline-flex items-center gap-2 mb-10 text-[0.72rem] font-bold uppercase tracking-[0.25em] opacity-50 hover:opacity-100 transition-opacity" style={{ color: strategy.color }}>
              ← All Strategies
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${strategy.color}18`, border: `1px solid ${strategy.color}30`, color: strategy.color }}>
                {strategy.icon}
              </div>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em]" style={{ color: `${strategy.color}70` }}>
                Strategy {String(strategy.number).padStart(2, "0")} of 12
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem,6vw,4.5rem)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#f5f1e8", marginBottom: "12px" }}>
              {strategy.title}
            </h1>
            <p className="text-xl mb-8" style={{ color: `${strategy.color}cc` }}>{strategy.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {strategy.tags.map((tag) => (
                <span key={tag} className="text-[0.65rem] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full" style={{ background: `${strategy.color}0d`, border: `1px solid ${strategy.color}22`, color: `${strategy.color}bb` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[900px] mx-auto px-6 py-16">
          <div className="mb-14 p-8 rounded-2xl text-[1.05rem] leading-relaxed" style={{ background: `${strategy.color}0a`, border: `1px solid ${strategy.color}20`, color: "rgba(245,241,232,0.82)", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            {strategy.description}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", color: "#f5f1e8", marginBottom: "16px" }}>When to use it</h2>
              <ul className="space-y-3">
                {strategy.whenToUse.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[0.9rem]" style={{ color: "rgba(245,241,232,0.65)" }}>
                    <span style={{ color: strategy.color, flexShrink: 0 }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", color: "#f5f1e8", marginBottom: "16px" }}>How to think (step by step)</h2>
              <ol className="space-y-3">
                {strategy.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-[0.9rem]" style={{ color: "rgba(245,241,232,0.65)" }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0 mt-0.5" style={{ background: `${strategy.color}22`, color: strategy.color }}>
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mb-14">
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", color: "#f5f1e8", marginBottom: "8px" }}>Practice Problems</h2>
            <p className="mb-8 text-sm" style={{ color: "rgba(245,241,232,0.4)" }}>Three problems at increasing difficulty — try each before revealing the hint or solution.</p>
            {strategy.problems.map((problem, i) => (
              <ProblemCard key={i} problem={problem} color={strategy.color} />
            ))}
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-white/10">
            {prev ? (
              <Link href={`/lab/strategy-map/${prev.id}`} className="flex items-center gap-3 group">
                <span style={{ color: prev.color }} className="group-hover:-translate-x-1 transition-transform">←</span>
                <div>
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] mb-1" style={{ color: "rgba(245,241,232,0.35)" }}>Previous</div>
                  <div className="text-[0.9rem] font-semibold" style={{ color: "rgba(245,241,232,0.75)" }}>{prev.title}</div>
                </div>
              </Link>
            ) : <div />}
            <Link href="/lab/strategy-map" className="text-[0.7rem] font-bold uppercase tracking-[0.25em] opacity-40 hover:opacity-80 transition-opacity" style={{ color: "#f5f1e8" }}>
              All Strategies
            </Link>
            {next ? (
              <Link href={`/lab/strategy-map/${next.id}`} className="flex items-center gap-3 group text-right">
                <div>
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] mb-1" style={{ color: "rgba(245,241,232,0.35)" }}>Next</div>
                  <div className="text-[0.9rem] font-semibold" style={{ color: "rgba(245,241,232,0.75)" }}>{next.title}</div>
                </div>
                <span style={{ color: next.color }} className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>
    </>
  );
}