import { notFound } from "next/navigation";
import Image from "next/image";
import MainNavbar from "@/components/MainNavbar";
import ShareButtons from "@/components/ShareButtons";
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
  
  if (!result) {
    return { 
      title: "Not Found | EisatoponAI",
      description: "The article you requested was not found." 
    };
  }

  const { article } = result;

  return {
    title: `${article.title} | EisatoponAI`,
    description: article.summary || "",
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      images: article.image 
        ? [{ url: article.image, alt: article.title, width: 1200, height: 630 }] 
        : [],
    },
    twitter: {
      card: "summary_large_image",
      images: article.image ? [article.image] : [],
    },
  };
}

function renderText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
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
      return <h2 key={i}>{para.replace("## ", "")}</h2>;
    }
    if (para.startsWith("### ")) {
      return <h3 key={i}>{para.replace("### ", "")}</h3>;
    }
    if (para.startsWith("---")) {
      return <hr key={i} />;
    }
    if (para.startsWith("*") && para.endsWith("*") && !para.startsWith("**")) {
      return <blockquote key={i}>{para.slice(1, -1)}</blockquote>;
    }
    return <p key={i}>{renderText(para)}</p>;
  });
}

// ==================== MAIN PAGE COMPONENT ====================
const ArticlePage = async (
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const result = getArticleBySlug(slug);
  if (!result) notFound();

  const { article, content } = result;

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", { 
        month: "long", 
        day: "numeric", 
        year: "numeric" 
      })
    : "";

  const dotSep = <span className="inline-block w-1 h-1 rounded-full bg-ink-muted" />;

  const byline = (
    <div className="flex items-center gap-3 flex-wrap text-[0.72rem] tracking-widest uppercase text-ink-muted">
      {article.author && <span>{article.author}</span>}
      {formattedDate && <>{dotSep}<span>{formattedDate}</span></>}
      {article.readTime && <>{dotSep}<span>{article.readTime}</span></>}
    </div>
  );

  return (
    <main className="bg-base text-ink-primary min-h-screen">
      <MainNavbar />

      {/* Hero Image */}
      {article.image ? (
        <div className="relative w-full h-[280px] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-end">
            <div className="max-w-[1200px] mx-auto w-full px-8 pb-12">
              <div className="flex gap-2 mb-4">
                {article.featured && <span className="badge badge-gold">Featured</span>}
                {article.category && <span className="badge badge-accent">{article.category}</span>}
              </div>
              <h1 className="font-playfair text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-tight max-w-[740px] text-white drop-shadow-lg">
                {article.title}
              </h1>
              {byline}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[740px] mx-auto pt-16 px-8">
          <div className="flex gap-2 mb-6">
            {article.featured && <span className="badge badge-gold">Featured</span>}
            {article.category && <span className="badge badge-accent">{article.category}</span>}
          </div>
          <h1 className="font-playfair text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-tight">
            {article.title}
          </h1>
          <div className="mt-6">{byline}</div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-[680px] mx-auto px-8 py-16">
        <article className="prose prose-invert max-w-none font-serif text-[1.1rem] leading-relaxed text-[#ccc9c0]">
          {renderContent(content)}
        </article>

        <ShareButtons title={article.title} summary={article.summary} />
      </div>
    </main>
  );
};

export default ArticlePage;