export default function MathChaserPage() {

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
                fontSize: "clamp(4rem,8vw,7rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.06em",
                color: "#f5f1e8",
              }}
            >
              Math
              <br />
              Chaser
            </h1>

            <p
              className="mt-8 max-w-[640px] leading-relaxed"
              style={{
                color: "rgba(245,241,232,0.72)",
                fontSize: "1.12rem",
              }}
            >
              Fast reflexes, mental arithmetic and competitive pressure —
              a mathematical arcade experiment.
            </p>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-10">

          {/* GAME PANEL */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.035]
              backdrop-blur-sm
              p-8
            "
          >

            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(212,175,55,0.12), transparent 60%)",
              }}
            />

            <div className="relative z-10">

              {/* TOP BAR */}
              <div className="flex items-center justify-between mb-8">

                <div>

                  <div
                    className="uppercase tracking-[0.22em] text-[0.72rem]"
                    style={{
                      color: "#c8a96b",
                    }}
                  >
                    Live Session
                  </div>

                  <div
                    className="mt-2"
                    style={{
                      color: "#f5f1e8",
                      fontSize: "2rem",
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    00:42
                  </div>

                </div>

                <div
                  className="
                    px-5
                    py-3
                    rounded-full
                    border
                    border-[#d4af37]/20
                    bg-[#d4af37]/[0.05]
                  "
                  style={{
                    color: "#d4af37",
                    fontSize: "0.8rem",
                    letterSpacing: "0.22em",
                  }}
                >
                  ×7 COMBO
                </div>

              </div>

              {/* TIMER */}
              <div
                className="
                  h-2
                  rounded-full
                  overflow-hidden
                  bg-white/10
                  mb-12
                "
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "72%",
                    background:
                      "linear-gradient(90deg,#d4af37,#f5e6a8)",
                  }}
                />
              </div>

              {/* QUESTION */}
              <div
                className="
                  rounded-[28px]
                  border
                  border-white/10
                  bg-black/20
                  p-10
                  text-center
                "
              >

                <div
                  className="uppercase tracking-[0.22em] text-[0.68rem] mb-5"
                  style={{
                    color: "#c8a96b",
                  }}
                >
                  Solve Quickly
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(3rem,6vw,5rem)",
                    color: "#f5f1e8",
                    letterSpacing: "-0.05em",
                  }}
                >
                  2⁶ ÷ 2³ + 7
                </div>

              </div>

              {/* ANSWERS */}
              <div className="grid grid-cols-2 gap-4 mt-10">

                {["15", "23", "42", "71"].map((answer) => (

                  <button
                    key={answer}
                    className="
                      rounded-[22px]
                      border
                      border-white/10
                      bg-white/[0.03]
                      py-6
                      transition-all
                      duration-300
                      hover:border-[#d4af37]/40
                      hover:bg-[#d4af37]/[0.06]
                    "
                    style={{
                      color: "#f5f1e8",
                      fontSize: "1.5rem",
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    {answer}
                  </button>

                ))}

              </div>

            </div>

          </div>

          {/* SIDE PANEL */}
          <div className="flex flex-col gap-8">

            {/* MODES */}
            <div
              className="
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-sm
                p-8
              "
            >

              <div
                className="mb-6 uppercase tracking-[0.22em] text-[0.72rem]"
                style={{
                  color: "#c8a96b",
                }}
              >
                Modes
              </div>

              <div className="grid grid-cols-2 gap-4">

                {[
                  "Easy",
                  "Medium",
                  "Hard",
                  "Chaser",
                ].map((mode) => (

                  <div
                    key={mode}
                    className="
                      rounded-[18px]
                      border
                      border-white/10
                      bg-black/20
                      px-5
                      py-6
                      text-center
                    "
                  >

                    <div
                      style={{
                        color: "#f5f1e8",
                        fontSize: "1rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      {mode}
                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* INFO */}
            <div
              className="
                rounded-[30px]
                border
                border-[#d4af37]/20
                bg-[#d4af37]/[0.04]
                backdrop-blur-sm
                p-8
              "
            >

              <div
                className="mb-5 uppercase tracking-[0.22em] text-[0.72rem]"
                style={{
                  color: "#c8a96b",
                }}
              >
                Experiment
              </div>

              <p
                style={{
                  color: "rgba(245,241,232,0.74)",
                  lineHeight: 1.9,
                  fontSize: "1rem",
                }}
              >
                Math Chaser explores how speed, stress and pattern recognition
                affect mathematical thinking under pressure.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}