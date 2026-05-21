import Link from "next/link";
import Image from "next/image";
import MainNavbar from "@/components/MainNavbar";
import Pagination from "@/components/Pagination";
import { getAllArticles, Article } from "@/lib/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

const POSTS_PER_PAGE = 6;

// ── Static params: generate /page/2, /page/3 … ──────────────────
export async function generateStaticParams() {
  const articles = getAllArticles();
  // page 1 = homepage (/), so we start from page 2
  const totalPages = Math.ceil((articles.length - 1) / POSTS_PER_PAGE) + 1;
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ page: string }> }
): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number(page);
  return {
    title: `Archive – Page ${pageNum} | EisatoponAI`,
    description: `Browse mathematical articles, olympiad problems and AI-powered learning — page ${pageNum}.`,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://eisatopon.gr/page/${pageNum}` },
  };
}

const CARD_GRADIENTS = [
  "from-[#0a1a2e] to-[#080a0f]",
  "from-[#120a00] to-[#1a1000]",
  "from-[#0a1a0a] to-[#0d1a0d]",
  "from-[#1a0a0a] to-[#1a0d0d]",
  "from-[#0d0824] to-[#080418]",
  "from-[#1a1000] to-[#0a0c10]",
];

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "";

  return (
    <article>
      <Link prefetch href={`/articles/${article.slug}`}
        className="group block rounded-xl overflow-hidden border border-border-dim bg-card hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        aria-label={`Read: ${article.title}`}>
        {article.image ? (
          <div className="relative h-[180px] bg-black overflow-hidden">
            <Image src={article.image} alt={article.title} fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover brightness-50 group-hover:brightness-70 transition-all duration-500" />
          </div>
        ) : (
          <div className={`h-[180px] flex items-center justify-center bg-gradient-to-tr ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]}`}>
            <span className="text-[2.5rem] text-white/10 font-playfair select-none">∞</span>
          </div>
        )}
        <div className="p-5">
          {article.category && (
            <div className="text-[0.68rem] tracking-wide uppercase text-gold mb-2 truncate">
              {article.category}{article.readTime && ` · ${article.readTime}`}
            </div>
          )}
          <h3 className="font-playfair text-[1.1rem] font-semibold leading-snug mb-2 text-ink-primary group-hover:text-gold transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>
          {article.summary && (
            <p className="text-[0.83rem] leading-relaxed text-ink-secondary line-clamp-2">{article.summary}</p>
          )}
          {formattedDate && (
            <p className="text-[0.72rem] text-ink-muted mt-3 uppercase tracking-wide">{formattedDate}</p>
          )}
        </div>
      </Link>
    </article>
  );
}

export default async function ArchivePage(
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params;
  const pageNum = Number(page);

  const allArticles = getAllArticles();

  // page 1 = homepage (hero + articles[1..6])
  // page 2 = articles[7..12], page 3 = articles[13..18] …
  const firstPageArticles = 6; // hero(1) + cards(6) = 7 total, cards start at index 1
  const offset = firstPageArticles + (pageNum - 2) * POSTS_PER_PAGE;
  const pageArticles = allArticles.slice(offset + 1, offset + 1 + POSTS_PER_PAGE);

  const totalPages = Math.ceil((allArticles.length - 1) / POSTS_PER_PAGE) + 1;

  if (pageNum < 2 || pageNum > totalPages || pageArticles.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-[1200px]">

        {/* Header */}
        <div className="mb-10 flex items-baseline justify-between border-b border-border-dim pb-6">
          <div>
            <div className="text-[0.68rem] tracking-widest uppercase text-ink-muted mb-2">Archive</div>
            <h1 className="font-playfair text-[2rem] font-semibold text-ink-primary">
              All Articles
            </h1>
          </div>
          <Link href="/" className="text-[0.75rem] tracking-widest uppercase text-ink-muted hover:text-gold transition-colors duration-200">
            ← Home
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pageArticles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={pageNum} totalPages={totalPages} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border-dim bg-black/50 mt-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] flex flex-col items-center gap-4">
          <Link href="/" className="font-playfair text-[1.5rem] font-semibold text-ink-primary hover:text-gold transition-colors duration-200">
            Eisatopon<span className="text-gold">AI</span>
          </Link>
          <div className="text-[0.75rem] text-ink-muted">© 2026 EisatoponAI · Mathematics • Problems • Ideas</div>
        </div>
      </footer>
    </main>
  );
}