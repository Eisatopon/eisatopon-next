import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface PotdProblem {
  date: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  problem: string;
  hint: string;
  formula?: string;
  slug: string;
}

const POTD_DIR = path.join(process.cwd(), "content/potd");

// Ψάχνει αναδρομικά για το MDX αρχείο
async function findMdxFile(date: string): Promise<string | null> {
  const searchDir = async (dir: string): Promise<string | null> => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = await searchDir(fullPath);
        if (found) return found;
      } else if (entry.name === `${date}.mdx`) {
        return fullPath;
      }
    }
    return null;
  };
  return searchDir(POTD_DIR);
}

// Βρίσκει όλα τα MDX αναδρομικά
async function getAllMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(entry.name);
    }
  }
  return files;
}

export async function getTodayProblem(): Promise<PotdProblem | null> {
  const today = new Date().toISOString().split("T")[0];
  return getProblemByDate(today);
}

export async function getProblemByDate(date: string): Promise<PotdProblem | null> {
  const filePath = await findMdxFile(date);
  if (!filePath) return getMostRecentProblem();
  
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  
  return {
    date: data.date,
    title: data.title,
    difficulty: data.difficulty,
    topic: data.topic,
    problem: content.trim(),
    hint: data.hint,
    formula: data.formula,
    slug: date,
  };
}

async function getMostRecentProblem(): Promise<PotdProblem | null> {
  const files = await getAllMdxFiles(POTD_DIR);
  if (files.length === 0) return null;
  
  const mostRecent = files.sort().reverse()[0];
  const date = mostRecent.replace(".mdx", "");
  return getProblemByDate(date);
}