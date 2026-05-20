import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { getTodayProblem, PotdProblem } from "@/lib/potd";
import Link from "next/link";
import Image from "next/image";
import MainNavbar from "@/components/MainNavbar";
import type { Metadata } from "next";
import { getAllArticles, Article } from "@/lib/articles";

// ─── Static generation ─────────────────────────────────────
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mathematical Problem Banks | EisatoponAI",
  description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
  openGraph: {
    title: "Mathematical Problem Banks | EisatoponAI",
    description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
    type: "website",
    locale: "en_US",
    siteName: "EisatoponAI",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "EisatoponAI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathematical Problem Banks | EisatoponAI",
    description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
    images: ["/images/og-home.jpg"],
  },
  alternates: { canonical: "https://eisatopon.gr" },
  robots: {
    index: true, 
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// ─── Static Data ─────────────────────────────────────────────────
interface ProblemBank { 
  href: string; 
  emoji: string; 
  label: string; 
  desc: string; 
  color: string; 
}

interface Topic { 
  label: string; 
  emoji: string; 
  color: string; 
  bg: string; 
}

const problemBanks: ProblemBank[] = [
  { href: "/banks/panelladikes", emoji: "🎓", label: "Hellenic Exams",                desc: "Mathematics Topics",           color: "text-cat-blue"  },
  { href: "/banks/eme",          emoji: "🏛️", label: "Hellenic Math Society Contests", desc: "Thales · Euclid · Archimedes", color: "text-cat-red"   },
  { href: "/banks/imo",          emoji: "🌍", label: "International Math Olympiad",    desc: "1959 – 2025",                  color: "text-cat-green" },
];

const topics: Topic[] = [

  {
    label: "Mathematics",
    emoji: "∞",
    color: "text-[#d4af37]",
    bg: "bg-[#d4af37]/10 border-[#d4af37]/20",
  },

  {
    label: "Olympiads",
    emoji: "🏆",
    color: "text-[#93c5fd]",
    bg: "bg-[#93c5fd]/10 border-[#93c5fd]/20",
  },

  {
    label: "Physics",
    emoji: "⚛️",
    color: "text-[#67e8f9]",
    bg: "bg-[#67e8f9]/10 border-[#67e8f9]/20",
  },

  {
    label: "Artificial Intelligence",
    emoji: "◉",
    color: "text-[#a5b4fc]",
    bg: "bg-[#a5b4fc]/10 border-[#a5b4fc]/20",
  },

  {
    label: "Number Theory",
    emoji: "ℤ",
    color: "text-[#facc15]",
    bg: "bg-[#facc15]/10 border-[#facc15]/20",
  },

  {
    label: "Geometry",
    emoji: "△",
    color: "text-[#86efac]",
    bg: "bg-[#86efac]/10 border-[#86efac]/20",
  },

  {
    label: "Puzzles & Paradoxes",
    emoji: "◈",
    color: "text-[#f9a8d4]",
    bg: "bg-[#f9a8d4]/10 border-[#f9a8d4]/20",
  },

  {
    label: "History of Science",
    emoji: "⌛",
    color: "text-[#c6a16e]",
    bg: "bg-[#c6a16e]/10 border-[#c6a16e]/20",
  },

  {
    label: "Logic & Philosophy",
    emoji: "◌",
    color: "text-[#c4b5fd]",
    bg: "bg-[#c4b5fd]/10 border-[#c4b5fd]/20",
  },

  {
    label: "Society & Technology",
    emoji: "◍",
    color: "text-[#fb923c]",
    bg: "bg-[#fb923c]/10 border-[#fb923c]/20",
  },

];

const socialLinks = [
  { name: "Facebook",  href: "https://facebook.com/eisatopon",          hoverColor: "#1877F2" },
  { name: "LinkedIn",  href: "https://linkedin.com/company/eisatopon",  hoverColor: "#0A66C2" },
  { name: "X",         href: "https://x.com/eisatopon",                 hoverColor: "#ffffff" },
  { name: "Instagram", href: "https://instagram.com/eisatopon",         hoverColor: "#E1306C" },
  { name: "YouTube",   href: "https://youtube.com/@eisatopon",          hoverColor: "#FF0000" },
  { name: "Pinterest", href: "https://pinterest.com/eisatopon",         hoverColor: "#E60023" },
];

const CARD_GRADIENTS = [
  "from-[#0a1a2e] to-[#080a0f]",
  "from-[#120a00] to-[#1a1000]",
  "from-[#0a1a0a] to-[#0d1a0d]",
  "from-[#1a0a0a] to-[#1a0d0d]",
  "from-[#0d0824] to-[#080418]",
  "from-[#1a1000] to-[#0a0c10]",
];

// ─── Components ───────────────────────────────────────────────────
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Facebook:  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    LinkedIn:  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    X:         <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    Instagram: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
    YouTube:   <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    Pinterest: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-11.987-12.005-11.987z"/></svg>,
  };
  return <>{icons[name] ?? null}</>;
}

function ProblemBankItem({ bank }: { bank: ProblemBank }) {
  return (
    <Link prefetch href={bank.href} className="flex items-center gap-3 p-3 mb-2 rounded-lg border border-border-dim bg-card hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50" aria-label={`Explore ${bank.label} — ${bank.desc}`}>
      <span className="text-[1.4rem]" aria-hidden="true">{bank.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className={`text-[0.875rem] font-medium ${bank.color} group-hover:text-gold transition-colors duration-200 truncate`}>{bank.label}</div>
        <div className="text-[0.75rem] text-ink-muted truncate">{bank.desc}</div>
      </div>
      <span className="text-ink-muted text-lg group-hover:text-gold group-hover:translate-x-1 transition-all duration-200 shrink-0" aria-hidden="true">›</span>
    </Link>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "";

  return (
    <article>
      <Link prefetch href={`/articles/${article.slug}`} className="group block rounded-xl overflow-hidden border border-border-dim bg-card hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50" aria-label={`Read: ${article.title}`}>
        {article.image ? (
          <div className="relative h-[180px] bg-black overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover brightness-50 group-hover:brightness-70 transition-all duration-500"
            />
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
          <h3 className="font-playfair text-[1.1rem] font-semibold leading-snug mb-2 text-ink-primary group-hover:text-gold transition-colors duration-200 line-clamp-2">{article.title}</h3>
          {article.summary && <p className="text-[0.83rem] leading-relaxed text-ink-secondary line-clamp-2">{article.summary}</p>}
          {formattedDate && <p className="text-[0.72rem] text-ink-muted mt-3 uppercase tracking-wide">{formattedDate}</p>}
        </div>
      </Link>
    </article>
  );
}

// ─── Main Page (Server Component) ────────────────────────────────
export default async function Home() {
  const articles = getAllArticles();
  const heroArticle = articles[0] ?? null;
  const cardArticles = articles.slice(1, 7);
  const potd = await getTodayProblem();

  const heroDate = heroArticle?.date
    ? new Date(heroArticle.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "";

  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      {/* ═══ HERO — 16:9 for Google Discover ═══ */}
      {heroArticle ? (
        <Link
          prefetch
          href={`/articles/${heroArticle.slug}`}
          className="block relative w-full mb-10 group cursor-pointer overflow-hidden"
          style={{ aspectRatio: "16/9", maxHeight: "580px" }}
          aria-label={`Read featured article: ${heroArticle.title}`}
        >
          {heroArticle.image ? (
            <Image
              src={heroArticle.image}
              alt={heroArticle.title}
              fill
              priority
              sizes="100vw"
              className="object-cover brightness-50 group-hover:brightness-60 transition-all duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2e] to-[#080a0f]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
            {heroArticle.category && (
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="bg-gold/90 text-black px-2.5 py-0.5 rounded text-[0.6rem] font-semibold tracking-wide uppercase">Featured</span>
                <span className="border border-gold/60 text-gold px-2.5 py-0.5 rounded text-[0.6rem] font-semibold tracking-wide uppercase">{heroArticle.category}</span>
              </div>
            )}
            <h1 className="font-playfair font-semibold text-[clamp(1.3rem,4vw,2.2rem)] leading-tight max-w-3xl text-ink-primary drop-shadow-lg mb-2 group-hover:text-gold transition-colors duration-300">
              {heroArticle.title}
            </h1>
            {heroArticle.summary && (
              <p className="text-[clamp(0.85rem,2.5vw,0.95rem)] text-ink-secondary max-w-2xl leading-relaxed mb-3 line-clamp-2">{heroArticle.summary}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 text-[0.65rem] tracking-widest text-ink-muted">
              <span>BY {heroArticle.author.toUpperCase()}</span>
              {heroDate && <><span className="w-1 h-1 rounded-full bg-ink-muted" aria-hidden="true" /><span>{heroDate.toUpperCase()}</span></>}
              {heroArticle.readTime && <><span className="w-1 h-1 rounded-full bg-ink-muted" aria-hidden="true" /><span>{heroArticle.readTime.toUpperCase()}</span></>}
            </div>
          </div>
        </Link>
      ) : (
        <div className="relative w-full mb-10 overflow-hidden" style={{ aspectRatio: "16/9", maxHeight: "580px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2e] via-[#0d1525] to-[#080a0f]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="text-[5rem] text-white/5 font-playfair select-none">∞</span>
            <p className="text-ink-muted text-sm">No articles yet — add your first MDX file to content/articles/</p>
          </div>
        </div>
      )}

      {/* ═══ ARTICLES + SIDEBAR ═══ */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        <section aria-labelledby="latest-heading">
          <div className="flex justify-between items-center mb-6">
            <h2 id="latest-heading" className="text-[0.68rem] tracking-widest uppercase text-ink-muted font-normal">Latest Articles</h2>
            <Link prefetch href="/articles" className="text-[0.75rem] tracking-widest uppercase text-ink-muted hover:text-gold transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50">Browse All</Link>
          </div>

          {cardArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cardArticles.map((article, i) => <ArticleCard key={article.slug} article={article} index={i} />)}
            </div>
          ) : (
            <p className="text-ink-muted text-sm py-10 text-center">No articles yet.</p>
          )}

          {/* TOPICS */}
          <div className="mt-12">
            <h2 className="text-[0.68rem] tracking-widest uppercase text-ink-muted font-normal mb-5">Browse by Topic</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {topics.map((topic) => (
                <Link key={topic.label} href={`/articles?category=${encodeURIComponent(topic.label)}`} className={`group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border ${topic.bg} hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50`} aria-label={`Browse ${topic.label} articles`}>
                  <span className={`text-2xl font-playfair ${topic.color} group-hover:text-gold transition-colors duration-200`} aria-hidden="true">{topic.emoji}</span>
                  <span className={`text-[0.75rem] font-medium tracking-wide ${topic.color} group-hover:text-gold transition-colors duration-200`}>{topic.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SIDEBAR */}
<aside className="flex flex-col gap-7">

  {/* Problem of the Day */}
  <div className="rounded-xl border border-gold-border bg-gold-dim p-5">

    {potd ? (
      <>

        <h2 className="text-[0.68rem] tracking-wide uppercase text-gold mb-3 font-normal">
          ✦ Problem of the Day
        </h2>

        <p className="font-serif text-[0.9rem] leading-relaxed text-[#d4c99a] mb-3">
          {potd.title}
        </p>

        <p className="text-[0.85rem] text-ink-secondary mb-3">
          {potd.problem}
        </p>

       {potd.formula && (
  <div
    className="
      relative z-10
      bg-black/45
      border border-border-dim
      rounded-xl
      px-5 py-5
      mb-4
      overflow-x-auto
      shadow-[0_0_30px_rgba(0,0,0,0.25)]
    "
    role="math"
  >
    <BlockMath math={potd.formula} />
  </div>
)}

        {/* Hint toggle */}
        <div className="mb-3">

          <details className="group">

            <summary className="list-none cursor-pointer">
              <span className="block text-center text-[0.8rem] rounded-lg px-3 py-2.5 bg-gold/10 border border-gold/40 text-gold hover:bg-gold/20 hover:border-gold transition-all duration-200 select-none">
                💡 View Hint
              </span>
            </summary>

            <p className="mt-3 text-[0.8rem] text-ink-tertiary italic p-3 bg-black/20 rounded-lg border border-border-dim">
              {potd.hint}
            </p>

          </details>

        </div>

        {/* Difficulty + topic + date */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center gap-2">

            <span
              className={`text-[0.65rem] px-2 py-0.5 rounded ${
                potd.difficulty === "Easy"
                  ? "bg-green-500/20 text-green-400"
                  : potd.difficulty === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {potd.difficulty}
            </span>

            <span className="text-[0.65rem] text-ink-muted">
              {potd.topic}
            </span>

          </div>

          <span className="text-[0.62rem] text-ink-muted opacity-70">
            {potd.date}
          </span>

        </div>

        {/* Previous POTD */}
        <div className="mt-4 pt-4 border-t border-border-dim">

          <Link
            href="/problems"
            className="
              block
              text-center
              text-[0.72rem]
              tracking-wide
              text-gold
              hover:text-white
              transition-colors
              duration-300
            "
          >
            Browse Previous POTD →
          </Link>

        </div>

      </>
    ) : (
      <>

        <h2 className="text-[0.68rem] tracking-wide uppercase text-gold mb-3 font-normal">
          ✦ Problem of the Day
        </h2>

        <p className="text-[0.85rem] text-ink-secondary">
          No problem available today.
        </p>

      </>
    )}

  </div>

          {/* Problem Banks */}
          <nav aria-labelledby="banks-heading">
            <h2 id="banks-heading" className="text-[0.68rem] tracking-wide uppercase text-ink-muted pb-2 border-b border-border-dim mb-3 font-normal">Problem Banks</h2>
            {problemBanks.map((bank) => <ProblemBankItem key={bank.href} bank={bank} />)}
          </nav>

          {/* Archive CTA */}
<div className="rounded-xl border border-border-dim bg-card p-5 text-center">

  <div
    className="text-2xl mb-2"
    aria-hidden="true"
  >
    📚
  </div>

  <h2 className="font-playfair text-[1rem] font-semibold text-ink-primary mb-1">
    The Original Archive
  </h2>

  <p className="text-[0.8rem] text-ink-tertiary leading-relaxed mb-3">
    Over 40,000 mathematical articles since 2010.
  </p>

  <a
    href="https://eisatopon.blogspot.com"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-center text-[0.8rem] px-3 py-2.5 bg-white/5 border border-border-soft rounded-lg text-ink-secondary hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all duration-200"
  >
    Explore Old Site
  </a>

</div>

</aside>
</div>

{/* FOOTER */}
<footer className="border-t border-border-dim bg-black/50 mt-auto">

  <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-[1200px] flex flex-col items-center gap-6">

    <Link
      href="/"
      style={{
        fontFamily: "var(--font-family-playfair)",
        fontSize: "1.75rem",
        fontWeight: 600,
        color: "var(--color-ink-primary)",
        letterSpacing: "-0.01em",
        textDecoration: "none",
      }}
      className="hover:text-gold transition-colors duration-200"
    >
      Eisatopon
      <span style={{ color: "var(--color-gold)" }}>
        AI
      </span>
    </Link>

    <p className="text-[0.85rem] text-ink-tertiary text-center max-w-[460px] leading-relaxed">
      Interactive mathematical archives, olympiad problems and AI-powered learning.
    </p>

    {/* FOOTER NAV */}
    <div className="flex items-center gap-6 flex-wrap justify-center text-[0.82rem] tracking-wide uppercase">

      <Link
        href="/about"
        className="text-ink-secondary hover:text-gold transition-colors duration-300"
      >
        About
      </Link>

      <Link
        href="/banks"
        className="text-ink-secondary hover:text-gold transition-colors duration-300"
      >
        Problem Banks
      </Link>

      <a
        href="https://eisatopon.blogspot.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink-secondary hover:text-gold transition-colors duration-300"
      >
        Archive
      </a>

      <Link
        href="https://www.eisatopon.gr/banks/imo"
        className="text-ink-secondary hover:text-gold transition-colors duration-300"
      >
        Olympiads
      </Link>

      <Link
        href="/articles"
        className="text-ink-secondary hover:text-gold transition-colors duration-300"
      >
        Articles
      </Link>

    </div>

    {/* SOCIALS */}
    <div className="flex items-center gap-4 flex-wrap justify-center">

      {socialLinks.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit EisatoponAI on ${s.name}`}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-border-dim bg-white/5 text-ink-secondary hover:text-gold hover:bg-gold/10 hover:border-gold/30 transition-all duration-200"
        >
          <SocialIcon name={s.name} />
        </a>
      ))}

    </div>

    <div
      className="w-full max-w-[220px] h-[0.5px] bg-border-dim"
      aria-hidden="true"
    />

    <div className="flex flex-wrap items-center justify-center gap-4 text-[0.75rem] text-ink-muted">

      <span>© 2026 EisatoponAI</span>

      <span
        className="w-1 h-1 rounded-full bg-ink-muted"
        aria-hidden="true"
      />

      <span>Mathematics • Problems • Ideas</span>

    </div>

  </div>

</footer>

</main>
  );
}