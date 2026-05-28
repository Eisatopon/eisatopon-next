import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PotdProblem {
  date: string;
  title: string;
  problem: string;
  hint: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  formula?: string;
}

const POTD_DIR = path.join(process.cwd(), "content/potd");

function findMdxFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }
  return results;
}

export function getAllPotd(): PotdProblem[] {
  const files = findMdxFiles(POTD_DIR);

  const problems = files.map((filePath): PotdProblem => {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      date: data.date ?? "",
      title: data.title ?? "Untitled",
      problem: content.trim(),
      hint: data.hint ?? "",
      difficulty: data.difficulty ?? "Medium",
      topic: data.topic ?? "",
      formula: data.formula ?? undefined,
    };
  });

  return problems
    .filter((p) => p.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getTodayProblem(): Promise<PotdProblem | null> {
  const today = new Date().toISOString().split("T")[0];
  const all = getAllPotd();
  return all.find((p) => p.date === today) ?? null;
}