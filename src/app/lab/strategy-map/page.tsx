"use client";
import Link from "next/link";
import { strategies } from "./strategies-data";

export default function StrategyMapPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "radial-gradient(circle at top, #0b1020 0%, #05070a 60%)" }}
    >
      {/* ── HERO ── */}
      <section className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-24">
          <div className="max-w-[760px]">
            <div className="mb-6 uppercase tracking-[0.35em] text-[0.72rem]" style={{ color: "#c8a96b" }}>
              EisatoponAI · Strategy Map
            </div>
            <h1 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3rem,7vw,6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              color: "#f5f1e8"
            }}>
              Mathematical<br />Problem-Solving<br />Strategies
            </h1>
            <p className="mt-10 max-w-[640px]" style={{ color: "rgba(245,241,232,0.72)", fontSize: "1.1rem", lineHeight: 1.8 }}>
              Twelve fundamental strategies used by olympiad mathematicians — from the Extremal Element to Mathematical Induction. Each comes with worked examples at three levels of difficulty.
            </p>
            <div className="mt-8 flex gap-6 text-sm" style={{ color: "rgba(245,241,232,0.45)" }}>
              <span>12 Strategies</span>
              <span>·</span>
              <span>36 Problems</span>
              <span>·</span>
              <span>3 Levels each</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((s) => (
            <Link
              key={s.id}
              href={`/lab/strategy-map/${s.id}`}
              className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-1 block"
              style={{
                ["--hover-color" as string]: s.color,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at top left, ${s.color}18, transparent 60%)` }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[28px]"
                style={{ boxShadow: `0 0 0 1px ${s.color}28` }}
              />
              <div className="relative z-10">
                {/* Number + icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{
                      background: `${s.color}14`,
                      border: `1px solid ${s.color}28`,
                      color: s.color
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    className="text-[0.65rem] font-bold uppercase tracking-[0.25em]"
                    style={{ color: `${s.color}80` }}
                  >
                    {String(s.number).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    lineHeight: 1.2,
                    color: "#f5f1e8",
                    marginBottom: "8px"
                  }}
                >
                  {s.title}
                </h2>
                <p className="text-[0.8rem] mb-5" style={{ color: "rgba(245,241,232,0.45)" }}>
                  {s.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[0.63rem] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                      style={{
                        background: `${s.color}0d`,
                        border: `1px solid ${s.color}20`,
                        color: `${s.color}cc`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p
                  className="text-[0.88rem] leading-relaxed line-clamp-3"
                  style={{ color: "rgba(245,241,232,0.58)" }}
                >
                  {s.description}
                </p>

                {/* CTA */}
                <div
                  className="mt-6 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.25em]"
                  style={{ color: s.color }}
                >
                  Explore Strategy
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}