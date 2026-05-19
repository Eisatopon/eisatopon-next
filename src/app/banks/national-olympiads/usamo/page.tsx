const years = [
  2025, 2024, 2023, 2022, 2021,
  2020, 2019, 2018, 2017, 2016,
];

export default function USAMOPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "60px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#3b82f6",
            marginBottom: "16px",
          }}
        >
          USA Mathematical Olympiad
        </div>

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "700",
            marginBottom: "16px",
            color: "#3b82f6",
          }}
        >
          USAMO
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#b8b4ad",
            maxWidth: "700px",
            lineHeight: "1.7",
            marginBottom: "60px",
          }}
        >
          Archive of USA Mathematical Olympiad problems and olympiad training
          material.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          {years.map((year) => (
            <div
              key={year}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "28px 20px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#60a5fa",
                  marginBottom: "10px",
                }}
              >
                {year}
              </div>

              <div
                style={{
                  color: "#9ca3af",
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                6 Problems
              </div>
            </div>
          ))}
        </div>

        <a
          href="/banks/national-olympiads"
          style={{
            display: "inline-block",
            padding: "14px 24px",
            borderRadius: "14px",
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.35)",
            color: "#60a5fa",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to National Olympiads
        </a>
      </div>
    </main>
  );
}