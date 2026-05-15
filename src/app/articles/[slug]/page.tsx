import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MainNavbar from "@/components/MainNavbar";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

function findMdxFile(slug: string): string | null {
  const articlesDir = path.join(process.cwd(), "content/articles");

  function searchDir(dir: string): string | null {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = searchDir(fullPath);
        if (found) return found;
      } else if (entry.name === `${slug}.mdx`) {
        return fullPath;
      }
    }
    return null;
  }

  return searchDir(articlesDir);
}

function renderText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: "var(--color-ink-primary)", fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} style={{ fontStyle: "italic", color: "#c8c4bc" }}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default async function ArticlePage({ params }: Props) {
  const filePath = findMdxFile(params.slug);

  if (!filePath) notFound();

  const fileContent = fs.readFileSync(filePath!, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  const paragraphs = content
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : "";

  return (
    <main style={{ background: "var(--color-base)", minHeight: "100vh", color: "var(--color-ink-primary)" }}>

      <MainNavbar />

      {/* HERO */}
      {frontmatter.image && (
        <div style={{ position: "relative", width: "100%", height: "480px", overflow: "hidden" }}>
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill priority sizes="100vw"
            style={{ objectFit: "cover", filter: "brightness(0.35)" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(127,168,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(127,168,212,1) 1px,transparent 1px)",
            backgroundSize: "40px 40px", opacity: 0.04,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(8,10,15,0.97) 0%, rgba(8,10,15,0.5) 55%, transparent 100%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "48px",
          }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                {frontmatter.featured && <span className="badge badge-gold">Featured</span>}
                {frontmatter.category && <span className="badge badge-accent">{frontmatter.category}</span>}
              </div>
              <h1 style={{
                fontFamily: "var(--font-family-playfair)",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 600, lineHeight: 1.2,
                color: "var(--color-ink-primary)",
                maxWidth: "740px", marginBottom: "16px",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}>
                {frontmatter.title}
              </h1>
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                fontSize: "0.72rem", letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--color-ink-muted)",
              }}>
                {frontmatter.author && <span>{frontmatter.author}</span>}
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--color-ink-muted)", display: "inline-block" }} />
                {formattedDate && <span>{formattedDate}</span>}
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--color-ink-muted)", display: "inline-block" }} />
                {frontmatter.readTime && <span>{frontmatter.readTime}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE BODY */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 32px 96px" }}>
        <article style={{ fontFamily: "var(--font-family-serif)", fontSize: "1.1rem", lineHeight: 1.85, color: "#ccc9c0" }}>
          {paragraphs.map((para, i) => {

            if (para.startsWith("## ")) {
              return (
                <h2 key={i} style={{
                  fontFamily: "var(--font-family-playfair)",
                  fontSize: "1.55rem", fontWeight: 600,
                  color: "var(--color-ink-primary)",
                  marginTop: "2.5em", marginBottom: "0.75em", lineHeight: 1.25,
                }}>
                  {para.replace("## ", "")}
                </h2>
              );
            }

            if (para.startsWith("---")) {
              return <hr key={i} style={{ border: "none", borderTop: "0.5px solid var(--color-border-dim)", margin: "2.5em auto", width: "40%" }} />;
            }

            if (para.startsWith("**") && para.endsWith("**") && para.includes("->")) {
              return (
                <div key={i} style={{
                  background: "#0a0c14",
                  border: "0.5px solid var(--color-gold-border)",
                  borderRadius: "8px", padding: "16px",
                  margin: "1.8em 0", textAlign: "center" as const,
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "1.1rem", color: "#c4b890", lineHeight: 1.8,
                }}>
                  {para.replace(/\*\*/g, "").replace("->", "→")}
                </div>
              );
            }

            if (para.startsWith("*") && para.endsWith("*") && !para.startsWith("**")) {
              return (
                <blockquote key={i} style={{
                  margin: "2em 0", padding: "1.25em 1.5em",
                  borderLeft: "3px solid var(--color-accent)",
                  background: "rgba(127,168,212,0.04)",
                  borderRadius: "0 8px 8px 0",
                  fontStyle: "italic", color: "#b8b4ac",
                }}>
                  {para.slice(1, -1)}
                </blockquote>
              );
            }

            return (
              <p key={i} style={{ marginBottom: "1.6em" }}>
                {renderText(para)}
              </p>
            );
          })}
        </article>
      </div>

    </main>
  );
}
