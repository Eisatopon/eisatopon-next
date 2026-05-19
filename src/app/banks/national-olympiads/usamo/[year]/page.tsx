const years = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
];

export function generateStaticParams() {
  return years.map((year) => ({
    year,
  }));
}

export default async function USAMOYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;

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
          USAMO {year}
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#b8b4ad",
            maxWidth: "700px",
            lineHeight: "1.7",
          }}
        >
          Problems and olympiad training material for the year {year}.
        </p>
      </div>
    </main>
  );
}