import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string | null;
  featured: boolean;
  readTime: string;
  author: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

// Βρίσκει όλα τα .mdx αρχεία αναδρομικά
function findMdxFiles(dir: string): string[] {
  const results: string[] = [];
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

// Διαβάζει όλα τα άρθρα και τα επιστρέφει ταξινομημένα από νεότερο
export function getAllArticles(): Article[] {
  const files = findMdxFiles(ARTICLES_DIR);

  const articles = files.map((filePath): Article => {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    const slug = path.basename(filePath, ".mdx");

    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      category: data.category ?? "",
      summary: data.summary ?? "",
      image: data.image ?? null,
      featured: data.featured ?? false,
      readTime: data.readTime ?? "",
      author: data.author ?? "EisatoponAI Team",
    };
  });

  return articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Βρίσκει ένα άρθρο με βάση το slug
export function getArticleBySlug(slug: string): { article: Article; content: string } | null {
  const files = findMdxFiles(ARTICLES_DIR);
  const filePath = files.find((f) => path.basename(f, ".mdx") === slug);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    article: {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      category: data.category ?? "",
      summary: data.summary ?? "",
      image: data.image ?? null,
      featured: data.featured ?? false,
      readTime: data.readTime ?? "",
      author: data.author ?? "EisatoponAI Team",
    },
    content,
  };
}