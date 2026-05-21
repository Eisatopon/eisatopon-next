import Link from "next/link";

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
            <div className="mb-6 uppercase tracking-[0.35em] text-[0.72rem]" style={{ color: "#c8a96b" }}>
              EisatoponAI Lab
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(4rem,9vw,8rem)", lineHeight: 0.92, letterSpacing: "-0.06em", color: "#f5f1e8" }}>
              Interactive<br />Mathematics
            </h1>
            <p className="mt-10 max-w-[640px]" style={{ color: "rgba(245,241,232,0.72)", fontSize: "1.2rem", lineHeight: 1.8 }}>
              Where mathematical ideas become interactive experiences —
              combinatorics, logic, reflexes and experimentation.
            </p>
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-24">
        <div className="max-w-[900px]">

          {/* top 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

            {/* RUBIK — teal */}
            <Link href="/lab/rubik-cube"
              className="group relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.03] p-10 transition-all duration-500 hover:border-[#25c491]/30 hover:bg-white/[0.05] block">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(circle at top left, rgba(37,196,145,0.12), transparent 60%)" }} />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(37,196,145,0.1)", border: "1px solid rgba(37,196,145,0.2)", color: "#25c491" }}>◈</div>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "2.6rem", lineHeight: 1.1, color: "#f5f1e8", marginBottom: "12px" }}>Rubik Cube</h2>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["3D Puzzle","Combinatorics","WCA Notation"].map(tag => (
                    <span key={tag} className="text-[0.68rem] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                      style={{ background: "rgba(37,196,145,0.08)", border: "1px solid rgba(37,196,145,0.18)", color: "#25c491" }}>{tag}</span>
                  ))}
                </div>
                <p className="flex-1" style={{ color: "rgba(245,241,232,0.55)", fontSize: "1rem", lineHeight: 1.75 }}>
                  Scramble, rotate and solve the classic 3×3 cube with an optimal algorithm — all in your browser.
                </p>
                <div className="mt-10 flex items-center gap-3 uppercase tracking-[0.3em] text-[0.72rem] font-bold" style={{ color: "#25c491" }}>
                  Enter Experiment <span className="transition-transform duration-300 group-hover:translate-x-2 text-base">→</span>
                </div>
              </div>
            </Link>

            {/* MATH CHASER — amber */}
            <Link href="/lab/math-chaser"
              className="group relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.03] p-10 transition-all duration-500 hover:border-[#f59e0b]/30 hover:bg-white/[0.05] block">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(circle at top left, rgba(245,158,11,0.12), transparent 60%)" }} />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b" }}>✦</div>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "2.6rem", lineHeight: 1.1, color: "#f5f1e8", marginBottom: "12px" }}>Math Chaser</h2>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Speed Quiz","4 Levels","Beat Your Best"].map(tag => (
                    <span key={tag} className="text-[0.68rem] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                      style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.18)", color: "#f59e0b" }}>{tag}</span>
                  ))}
                </div>
                <p className="flex-1" style={{ color: "rgba(245,241,232,0.55)", fontSize: "1rem", lineHeight: 1.75 }}>
                  Race against the clock across four difficulty levels. One wrong answer and the Chaser gets you.
                </p>
                <div className="mt-10 flex items-center gap-3 uppercase tracking-[0.3em] text-[0.72rem] font-bold" style={{ color: "#f59e0b" }}>
                  Enter Experiment <span className="transition-transform duration-300 group-hover:translate-x-2 text-base">→</span>
                </div>
              </div>
            </Link>
          </div>

          {/* DYSCALCULIA — purple, full width horizontal */}
          <Link href="/dyscalculia-test"
            className="group relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.03] p-10 transition-all duration-500 hover:border-[#8b5cf6]/30 hover:bg-white/[0.05] block">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: "radial-gradient(circle at top left, rgba(139,92,246,0.12), transparent 60%)" }} />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#8b5cf6" }}>⚡</div>
              <div className="flex-1">
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "2.2rem", lineHeight: 1.1, color: "#f5f1e8", marginBottom: "10px" }}>
                  Dyscalculia Screening Test
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["50 Questions","6 Categories","Free Screening","Research-Based"].map(tag => (
                    <span key={tag} className="text-[0.68rem] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                      style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)", color: "#8b5cf6" }}>{tag}</span>
                  ))}
                </div>
                <p style={{ color: "rgba(245,241,232,0.55)", fontSize: "1rem", lineHeight: 1.75 }}>
                  A free, research-based screening tool to identify potential signs of dyscalculia across six key areas of mathematical cognition.
                </p>
              </div>
              <div className="flex items-center gap-3 uppercase tracking-[0.3em] text-[0.72rem] font-bold flex-shrink-0" style={{ color: "#8b5cf6" }}>
                Take the Test <span className="transition-transform duration-300 group-hover:translate-x-2 text-base">→</span>
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}