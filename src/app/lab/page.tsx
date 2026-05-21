import Link from "next/link";

export default function LabPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top, #0b1020 0%, #05070a 60%)",
      }}
    >
      {/* HERO */}
      <section className="border-b border-white/10">

        <div className="max-w-[1280px] mx-auto px-6 py-24">

          <div className="max-w-[760px]">

            <div
              className="mb-6 uppercase tracking-[0.35em] text-[0.72rem]"
              style={{
                color: "#c8a96b",
              }}
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

      {/* GRID */}
      <section className="max-w-[1280px] mx-auto px-6 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* RUBIK */}
          <Link
            href="/lab/rubik-cube"
            className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              p-10
              transition-all
              duration-500
              hover:border-[#d4af37]/30
              hover:bg-white/[0.05]
            "
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(212,175,55,0.12), transparent 60%)",
              }}
            />

            <div className="relative z-10">

              <div
                className="mb-10"
                style={{
                  color: "#d4af37",
                  fontSize: "2rem",
                }}
              >
                ◈
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "3rem",
                  color: "#f5f1e8",
                }}
              >
                Rubik Cube
              </h2>

              <p
                className="mt-4"
                style={{
                  color: "rgba(245,241,232,0.68)",
                  fontSize: "1.02rem",
                }}
              >
                Combinatorics in motion.
              </p>

              <div
                className="
                  mt-14
                  flex
                  items-center
                  gap-3
                  uppercase
                  tracking-[0.3em]
                  text-[0.72rem]
                "
                style={{
                  color: "#d4af37",
                }}
              >
                Enter Experiment
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>

            </div>

          </Link>

          {/* CHASER */}
          <Link
            href="/lab/math-chaser"
            className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              p-10
              transition-all
              duration-500
              hover:border-[#d4af37]/30
              hover:bg-white/[0.05]
            "
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(212,175,55,0.12), transparent 60%)",
              }}
            />

            <div className="relative z-10">

              <div
                className="mb-10"
                style={{
                  color: "#d4af37",
                  fontSize: "2rem",
                }}
              >
                ✦
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "3rem",
                  color: "#f5f1e8",
                }}
              >
                Math Chaser
              </h2>

              <p
                className="mt-4"
                style={{
                  color: "rgba(245,241,232,0.68)",
                  fontSize: "1.02rem",
                }}
              >
                Reflexes meet mathematics.
              </p>

              <div
                className="
                  mt-14
                  flex
                  items-center
                  gap-3
                  uppercase
                  tracking-[0.3em]
                  text-[0.72rem]
                "
                style={{
                  color: "#d4af37",
                }}
              >
                Enter Experiment
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>

            </div>

          </Link>

        </div>

      </section>

    </main>
  );
}