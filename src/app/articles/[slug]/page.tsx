import { notFound } from "next/navigation";
import MainNavbar from "@/components/MainNavbar";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const result = getArticleBySlug(slug);
  if (!result) return { title: "Not Found" };
  const { article } = result;
  return {
    title: `${article.title} | EisatoponAI`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      images: article.image ? [{ url: article.image }] : [],
    },
  };
}

function renderText(text: string): React.ReactNode[] {
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

function renderContent(content: string) {
  const paragraphs = content
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return paragraphs.map((para, i) => {
    if (para.startsWith("## ")) {
      return (
        <h2 key={i} style={{ fontFamily: "var(--font-family-playfair)", fontSize: "1.55rem", fontWeight: 600, color: "var(--color-ink-primary)", marginTop: "2.5em", marginBottom: "0.75em", lineHeight: 1.25 }}>
          {para.replace("## ", "")}
        </h2>
      );
    }
    if (para.startsWith("### ")) {
      return (
        <h3 key={i} style={{ fontSize: "1rem", fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--color-ink-secondary)", marginTop: "2em", marginBottom: "0.6em" }}>
          {para.replace("### ", "")}
        </h3>
      );
    }
    if (para.startsWith("---")) {
      return <hr key={i} style={{ border: "none", borderTop: "0.5px solid var(--color-border-dim)", margin: "2.5em auto", width: "40%" }} />;
    }
    if (para.startsWith("*") && para.endsWith("*") && !para.startsWith("**")) {
      return (
        <blockquote key={i} style={{ margin: "2em 0", padding: "1.25em 1.5em", borderLeft: "3px solid var(--color-accent)", background: "rgba(127,168,212,0.04)", borderRadius: "0 8px 8px 0", fontStyle: "italic", color: "#b8b4ac" }}>
          {para.slice(1, -1)}
        </blockquote>
      );
    }
    return <p key={i} style={{ marginBottom: "1.6em" }}>{renderText(para)}</p>;
  });
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const result = getArticleBySlug(slug);
  if (!result) notFound();

  const { article, content } = result;

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  const dotSep = <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--color-ink-muted)", display: "inline-block" }} />;

  const byline = (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-ink-muted)" }}>
      {article.author && <span>{article.author}</span>}
      {formattedDate && <>{dotSep}<span>{formattedDate}</span></>}
      {article.readTime && <>{dotSep}<span>{article.readTime}</span></>}
    </div>
  );

  const badges = (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
      {article.featured && <span className="badge badge-gold">Featured</span>}
      {article.category && <span className="badge badge-accent">{article.category}</span>}
    </div>
  );

  return (
    <main style={{ background: "var(--color-base)", minHeight: "100vh", color: "var(--color-ink-primary)" }}>
      <MainNavbar />

      {article.image ? (
        <div style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,10,15,0.97) 0%, rgba(8,10,15,0.5) 55%, transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "48px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
              {badges}
              <h1 style={{ fontFamily: "var(--font-family-playfair)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, color: "var(--color-ink-primary)", maxWidth: "740px", marginBottom: "16px", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
                {article.title}
              </h1>
              {byline}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: "740px", margin: "64px auto 0", padding: "0 32px" }}>
          {badges}
          <h1 style={{ fontFamily: "var(--font-family-playfair)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, color: "var(--color-ink-primary)", marginBottom: "16px" }}>
            {article.title}
          </h1>
          <div style={{ marginBottom: "32px" }}>{byline}</div>
        </div>
      )}

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 32px 96px" }}>
        <article style={{ fontFamily: "var(--font-family-serif)", fontSize: "1.1rem", lineHeight: 1.85, color: "#ccc9c0" }}>
          {renderContent(content)}
        </article>
      </div>
    </main>
  );
}