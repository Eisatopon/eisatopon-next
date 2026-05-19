const olympiads = [
  {
    name: "USAMO",
    subtitle: "USA Mathematical Olympiad",
    years: "1972 – 2025",
    color: "#3b82f6",
    flag: "🇺🇸",
  },
  {
    name: "CMO",
    subtitle: "Chinese Mathematical Olympiad",
    years: "1986 – 2025",
    color: "#ef4444",
    flag: "🇨🇳",
  },
  {
    name: "RMM",
    subtitle: "Romanian Master of Mathematics",
    years: "2008 – 2025",
    color: "#f59e0b",
    flag: "🇷🇴",
  },
];

export default function NationalOlympiadsPage() {
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
            color: "#c4a96a",
            marginBottom: "16px",
          }}
        >
          EisatoponAI
        </div>

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          National Olympiads
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
          Elite mathematical training archives from the world’s strongest
          national olympiad traditions.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {olympiads.map((o) => (
            <div
              key={o.name}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "28px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "16px",
                }}
              >
                {o.flag}
              </div>

              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  marginBottom: "10px",
                  color: o.color,
                }}
              >
                {o.name}
              </h2>

              <div
                style={{
                  color: "#d1d5db",
                  marginBottom: "10px",
                  fontSize: "16px",
                }}
              >
                {o.subtitle}
              </div>

              <div
                style={{
                  color: "#9ca3af",
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                {o.years}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}