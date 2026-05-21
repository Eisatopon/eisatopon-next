import Link from "next/link";

const EXPERIMENTS = [
  {
    href: "/lab/rubik-cube",
    icon: "◈",
    title: "Rubik Cube",
    desc: "Scramble, rotate and solve the classic 3×3 cube with an optimal algorithm — all in your browser.",
    tags: ["3D Puzzle", "Combinatorics", "WCA Notation"],
    cta: "Enter Experiment",
    accent: "#25c491",
    glow: "rgba(37,196,145,0.12)",
    border: "rgba(37,196,145,0.25)",
  },
  {
    href: "/lab/math-chaser",
    icon: "✦",
    title: "Math Chaser",
    desc: "Race against the clock across four difficulty levels. One wrong answer and the Chaser gets you.",
    tags: ["Speed Quiz", "4 Levels", "Beat Your Best"],
    cta: "Enter Experiment",
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
  },
];

export default function LabPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "radial-gradient(circle at top, #0b1020 0%, #05070a 60%)" }}
    >
      {/* ── HERO ── */}
      <section className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-24">
          <div className="max-w-[760px]">

            <div
              className="mb-6 uppercase tracking-[0.35em] text-[0.72rem]"
              style={{ color: "#c8a96b" }}
            >
              EisatoponAI Lab
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(4rem,9vw,8rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.06em",
                color: "#f5f1e8",
              }}
            >
              Interactive
              <br />
              Mathematics
            </h1>

            <p
              className="mt-10 max-w-[640px]"
              style={{
                color: "rgba(245,241,232,0.72)",
                fontSize: "1.2rem",
                lineHeight: 1.8,
              }}
            >
              Where mathematical ideas become interactive experiences —
              combinatorics, logic, reflexes and experimentation.
            </p>

          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">

          {EXPERIMENTS.map((exp) => (
            <Link
              key={exp.href}
              href={exp.href}
              className="group relative overflow-hidden rounded-[32px] border bg-white/[0.03] p-10 transition-all duration-500"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = exp.border;
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >
              {/* glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top left, ${exp.glow}, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full">

                {/* icon */}
                <div
                  className="mb-8 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: `color-mix(in srgb, ${exp.accent} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${exp.accent} 25%, transparent)`,
                    color: exp.accent,
                  }}
                >
                  {exp.icon}
                </div>

                {/* title */}
                <h2
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "2.6rem",
                    lineHeight: 1.1,
                    color: "#f5f1e8",
                    marginBottom: "12px",
                  }}
                >
                  {exp.title}
                </h2>

                {/* tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {exp.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[0.68rem] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                      style={{
                        background: `color-mix(in srgb, ${exp.accent} 10%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${exp.accent} 20%, transparent)`,
                        color: exp.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* description */}
                <p
                  className="flex-1"
                  style={{
                    color: "rgba(245,241,232,0.55)",
                    fontSize: "1rem",
                    lineHeight: 1.75,
                  }}
                >
                  {exp.desc}
                </p>

                {/* cta */}
                <div
                  className="mt-10 flex items-center gap-3 uppercase tracking-[0.3em] text-[0.72rem] font-bold transition-colors duration-300"
                  style={{ color: exp.accent }}
                >
                  {exp.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-2 text-base">
                    →
                  </span>
                </div>

              </div>
            </Link>
          ))}

        </div>

      </section>
    </main>
  );
}