export default function RubikCubePage() {

  const scramble = "R U R' U' F2 L D2";

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
              Rubik
              <br />
              Cube
            </h1>

            <p
              className="mt-8 max-w-[640px] leading-relaxed"
              style={{
                color: "rgba(245,241,232,0.72)",
                fontSize: "1.12rem",
              }}
            >
              Explore combinatorics, algorithms and spatial reasoning
              through one of the most iconic mathematical objects ever created.
            </p>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">

        <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-10">

          {/* LEFT PANEL */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] backdrop-blur-sm p-8">

            {/* glow */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(212,175,55,0.12), transparent 60%)",
              }}
            />

            <div className="relative z-10">

              <div
                className="mb-6 uppercase tracking-[0.22em] text-[0.72rem]"
                style={{
                  color: "#c8a96b",
                }}
              >
                Interactive Cube
              </div>

              {/* CUBE AREA */}
              <div className="relative flex flex-col items-center justify-center rounded-[24px] border border-white/10 bg-black/20 overflow-hidden min-h-[400px] md:min-h-[560px]">

                {/* ambient glow */}
                <div
                  className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-[0.14]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.35), transparent 70%)",
                  }}
                />

                {/* cube wrapper */}
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: "260px",
                    height: "260px",
                    perspective: "1200px",
                  }}
                >

                  {/* rotating cube */}
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      position: "relative",
                      transformStyle: "preserve-3d",
                      animation: "spinCube 10s linear infinite",
                    }}
                  >

                    {/* FRONT */}
                    <div
                      style={{
                        position: "absolute",
                        width: "150px",
                        height: "150px",
                        background: "#d4af37",
                        border: "2px solid rgba(255,255,255,0.15)",
                        transform: "translateZ(75px)",
                        boxShadow: "0 0 40px rgba(212,175,55,0.35)",
                      }}
                    />

                    {/* BACK */}
                    <div
                      style={{
                        position: "absolute",
                        width: "150px",
                        height: "150px",
                        background: "#111827",
                        border: "2px solid rgba(255,255,255,0.1)",
                        transform: "rotateY(180deg) translateZ(75px)",
                      }}
                    />

                    {/* RIGHT */}
                    <div
                      style={{
                        position: "absolute",
                        width: "150px",
                        height: "150px",
                        background: "#1f2937",
                        border: "2px solid rgba(255,255,255,0.1)",
                        transform: "rotateY(90deg) translateZ(75px)",
                      }}
                    />

                    {/* LEFT */}
                    <div
                      style={{
                        position: "absolute",
                        width: "150px",
                        height: "150px",
                        background: "#0f172a",
                        border: "2px solid rgba(255,255,255,0.1)",
                        transform: "rotateY(-90deg) translateZ(75px)",
                      }}
                    />

                    {/* TOP */}
                    <div
                      style={{
                        position: "absolute",
                        width: "150px",
                        height: "150px",
                        background: "#f5e6a8",
                        border: "2px solid rgba(255,255,255,0.1)",
                        transform: "rotateX(90deg) translateZ(75px)",
                      }}
                    />

                    {/* BOTTOM */}
                    <div
                      style={{
                        position: "absolute",
                        width: "150px",
                        height: "150px",
                        background: "#111111",
                        border: "2px solid rgba(255,255,255,0.1)",
                        transform: "rotateX(-90deg) translateZ(75px)",
                      }}
                    />

                  </div>

                </div>

                {/* scramble */}
                <div className="mt-16 text-center">

                  <div
                    className="mb-3 uppercase tracking-[0.22em] text-[0.68rem]"
                    style={{
                      color: "#c8a96b",
                    }}
                  >
                    Generated Scramble
                  </div>

                  <div
                    className="font-mono text-[1rem] md:text-[1.1rem]"
                    style={{
                      color: "#f5f1e8",
                    }}
                  >
                    {scramble}
                  </div>

                </div>

                {/* button */}
                <button
                  className="mt-8 px-5 py-3 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/[0.04] text-[0.78rem] uppercase tracking-[0.22em] transition-all duration-300 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/[0.08]"
                  style={{
                    color: "#c8a96b",
                  }}
                >
                  Generate Scramble
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8">

            {/* THEORY */}
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8">

              <div
                className="mb-5 uppercase tracking-[0.22em] text-[0.72rem]"
                style={{
                  color: "#c8a96b",
                }}
              >
                Basic Notation
              </div>

              <div className="grid grid-cols-3 gap-4">

                {[
                  ["R", "Right"],
                  ["L", "Left"],
                  ["U", "Up"],
                  ["D", "Down"],
                  ["F", "Front"],
                  ["B", "Back"],
                ].map(([symbol, label]) => (

                  <div
                    key={symbol}
                    className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-5 text-center"
                  >

                    <div
                      className="mb-2"
                      style={{
                        fontSize: "1.6rem",
                        color: "#d4af37",
                        fontFamily: "var(--font-playfair)",
                      }}
                    >
                      {symbol}
                    </div>

                    <div
                      className="uppercase tracking-[0.18em] text-[0.62rem]"
                      style={{
                        color: "rgba(245,241,232,0.58)",
                      }}
                    >
                      {label}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      <style>{`
        @keyframes spinCube {
          0% {
            transform: rotateX(-25deg) rotateY(0deg);
          }

          100% {
            transform: rotateX(-25deg) rotateY(360deg);
          }
        }
      `}</style>

    </main>
  );
}