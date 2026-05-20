import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";

interface Problem {
  id?: string;
  year?: number;
  olympiad?: string;
  country?: string;
  day?: number;
  problem_id: string;
  topic: string[];
  statement: string;
  has_figure?: boolean;
  figure_description?: string | null;
  official_solution_available?: boolean;
  language?: string;
  source?: string;
}

const FIRST_YEAR = 1969;
const LAST_YEAR = 2025;

const years = Array.from(
  { length: LAST_YEAR - FIRST_YEAR + 1 },
  (_, i) => String(LAST_YEAR - i)
);

export function generateStaticParams() {
  return years.map((year) => ({
    year,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { year: string };
}): Promise<Metadata> {
  return {
    title: `Canada Mathematical Olympiad ${params.year}`,
    description: `Problems and solutions from the Canada Mathematical Olympiad ${params.year}.`,
  };
}

async function getProblems(year: string): Promise<Problem[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "canada",
      "olympiad",
      `${year}.json`
    );

    const file = await fs.readFile(filePath, "utf8");
    return JSON.parse(file);
  } catch {
    return [];
  }
}

export default async function CanadaOlympiadYearPage({
  params,
}: {
  params: { year: string };
}) {
  const { year } = params;

  const problems = await getProblems(year);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "60px 24px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#ef4444",
            marginBottom: "16px",
          }}
        >
          Canada Mathematical Olympiad
        </div>

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "700",
            marginBottom: "16px",
            color: "#ef4444",
          }}
        >
          Canada Olympiad {year}
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#b8b4ad",
            marginBottom: "50px",
          }}
        >
          {problems.length} problems loaded
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {problems.map((problem) => (
            <div
              key={problem.problem_id}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "28px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
              }}
            >
              <div
                style={{
                  color: "#ef4444",
                  fontWeight: "700",
                  marginBottom: "12px",
                  fontSize: "18px",
                }}
              >
                {problem.problem_id}
              </div>

              <div
                style={{
                  color: "#9ca3af",
                  marginBottom: "16px",
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                {problem.topic.join(", ")}
              </div>

              <div
                style={{
                  color: "#e5e7eb",
                  lineHeight: "1.8",
                  fontSize: "17px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {problem.statement}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}