import Link from "next/link";
import Image from "next/image";
import MainNavbar from "@/components/MainNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mathematical Problem Banks | EisatoponAI",
  description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
  openGraph: {
    title: "Mathematical Problem Banks | EisatoponAI",
    description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
    type: "website",
    locale: "en_US",
    siteName: "EisatoponAI",
    images: [{
      url: "/images/og-home.jpg",
      width: 1200,
      height: 630,
      alt: "EisatoponAI - Mathematical Problem Banks"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathematical Problem Banks | EisatoponAI",
    description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
    images: ["/images/og-home.jpg"],
  },
};

const SocialIcons = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Pinterest: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-11.987-12.005-11.987z"/>
    </svg>
  ),
};

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/eisatopon", icon: SocialIcons.Facebook },
  { name: "LinkedIn", href: "https://linkedin.com/company/eisatopon", icon: SocialIcons.LinkedIn },
  { name: "X", href: "https://x.com/eisatopon", icon: SocialIcons.X },
  { name: "Instagram", href: "https://instagram.com/eisatopon", icon: SocialIcons.Instagram },
  { name: "YouTube", href: "https://youtube.com/@eisatopon", icon: SocialIcons.YouTube },
  { name: "Pinterest", href: "https://pinterest.com/eisatopon", icon: SocialIcons.Pinterest },
];

const articles = [
  {
    href: "/articles/mystery-of-pi",
    image: "/images/pi.jpg",
    alt: "Illustration of the mathematical constant Pi",
    category: "Mathematical Constants",
    readTime: "4 min read",
    color: "text-cat-red",
    title: "The Mystery of π",
    description: "From circles to the Gaussian integral, π surfaces where you least expect it.",
  },
  {
    href: "/articles/chess-mathematics",
    image: "/images/chess.jpg",
    alt: "Chess board with mathematical graph overlays",
    category: "Combinatorics",
    readTime: "5 min read",
    color: "text-cat-green",
    title: "Chess and Mathematics",
    description: "Graph theory and the combinatorial explosion behind 32 pieces on 64 squares.",
  },
  {
    href: "/articles/golden-ratio",
    image: null,
    gradient: "from-[#120a00] to-[#1a1000]",
    symbol: "φ",
    symbolColor: "text-[rgba(196,169,106,0.3)]",
    category: "Algebra",
    readTime: "7 min read",
    color: "text-cat-amber",
    title: "The Golden Ratio — Myth and Mathematics",
    description: "What is φ really, and does it truly appear in art and nature?",
  },
  {
    href: "/articles/euler-identity",
    image: null,
    gradient: "from-[#080418] to-[#0d0824]",
    symbol: "e^{iπ} + 1 = 0",
    symbolColor: "text-[rgba(138,112,192,0.4)]",
    isMath: true,
    category: "Analysis",
    readTime: "5 min read",
    color: "text-cat-purple",
    title: "Euler's Identity — The Most Beautiful Equation",
    description: "Why e^{iπ} + 1 = 0 is not just elegant, but inevitable.",
  },
];

const problemBanks = [
  { href: "/banks/panelladikes", emoji: "🎓", label: "Hellenic Exams", desc: "Mathematics Topics", color: "text-cat-blue" },
  { href: "/banks/eme", emoji: "🏛️", label: "HMS Contests", desc: "Thales · Euclid · Archimedes", color: "text-cat-red" },
  { href: "/banks/imo", emoji: "🌍", label: "IMO", desc: "1959 - 2025", color: "text-cat-green" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-base text-ink-primary">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "EisatoponAI",
            url: "https://eisatopon.ai",
            description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
            publisher: {
              "@type": "Organization",
              name: "EisatoponAI",
              logo: {
                "@type": "ImageObject",
                url: "https://eisatopon.ai/logo.png"
              }
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: articles.map((article, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://eisatopon.ai${article.href}`,
                name: article.title,
                description: article.description,
              }))
            }
          })
        }}
      />

      <MainNavbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] md:min-h-[500px] mb-14" aria-label="Featured article">
        <Image 
          src="/images/infinity-hotel.jpg" 
          alt="Hilbert's Hotel - Artistic representation of infinite rooms" 
          fill 
          className="object-cover brightness-50" 
          priority 
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <span className="text-gold text-[5rem] md:text-[7rem] font-bold opacity-10 select-none font-playfair">Rooms 1, 2, 3, ∞</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-[clamp(24px,5vw,56px)]">
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="bg-gold/90 text-black px-3 py-1 rounded text-[0.65rem] font-semibold tracking-wide uppercase">Featured</span>
            <span className="border border-gold/60 text-gold px-3 py-1 rounded text-[0.65rem] font-semibold tracking-wide uppercase">Number Theory</span>
          </div>
          <h1 className="font-playfair font-semibold text-[clamp(1.4rem,5vw,2.6rem)] leading-tight max-w-3xl text-ink-primary drop-shadow-lg mb-3">
            Infinity and Hilbert's Hotel: What Cantor Taught Us About the Infinite
          </h1>
          <p className="text-[clamp(0.9rem,3vw,1rem)] md:text-[1.1rem] text-ink-tertiary max-w-2xl leading-relaxed mb-4">
            A journey into transfinite numbers, bijections, and the counterintuitive mathematics of infinite sets.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[0.7rem] tracking-widest text-ink-muted">
            <span>BY EISATOPONAI TEAM</span>
            <span className="w-1 h-1 rounded-full bg-ink-muted" aria-hidden="true" />
            <span>MAY 2026</span>
            <span className="w-1 h-1 rounded-full bg-ink-muted" aria-hidden="true" />
            <span>6 min read</span>
          </div>
        </div>
      </section>

      {/* ARTICLES GRID + SIDEBAR */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        
        {/* LEFT: ARTICLES */}
        <section aria-labelledby="latest-articles-heading">
          <div className="flex justify-between items-center mb-6">
            <h2 id="latest-articles-heading" className="text-[0.68rem] tracking-widest uppercase text-ink-muted font-normal">
              Latest Articles
            </h2>
            <Link 
              href="/articles" 
              className="text-[0.75rem] tracking-widest uppercase text-ink-muted hover:text-gold transition-colors duration-200"
              aria-label="Browse all mathematical articles"
            >
              Browse All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {articles.map((article) => (
              <article key={article.href}>
                <Link 
                  href={article.href} 
                  className="group block rounded-xl overflow-hidden border border-border-dim bg-card hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                  aria-label={`Read article: ${article.title} — ${article.category}, ${article.readTime}`}
                >
                  {article.image ? (
                    <div className="relative h-[180px]">
                      <Image 
                        src={article.image} 
                        alt={article.alt || ""} 
                        fill 
                        className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-500" 
                        sizes="(max-width: 640px) 100vw, 300px"
                      />
                    </div>
                  ) : (
                    <div className={`h-[180px] flex items-center justify-center bg-gradient-to-tr ${article.gradient}`}>
                      <span className={`text-[3rem] ${article.symbolColor} font-playfair ${article.isMath ? 'text-[1.4rem] font-jetbrains' : ''}`}>
                        {article.symbol}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className={`text-[0.68rem] tracking-wide uppercase ${article.color} mb-2`}>
                      {article.category} · {article.readTime}
                    </div>
                    <h3 className="font-playfair text-[1.15rem] font-semibold leading-snug mb-2 text-ink-primary group-hover:text-gold transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-[0.85rem] leading-relaxed text-ink-tertiary">
                      {article.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* RIGHT: SIDEBAR */}
        <aside className="flex flex-col gap-7">
          
          {/* PROBLEM OF THE DAY */}
          <div className="rounded-xl border border-gold-border bg-gold-dim p-5">
            <h2 className="text-[0.68rem] tracking-wide uppercase text-gold mb-3 font-normal">✦ Problem of the Day</h2>
            <p className="font-serif text-[0.9rem] leading-relaxed text-[#d4c99a] mb-3">
              Prove that the sum of the first n odd numbers equals n².
            </p>
            <div className="bg-black/35 border border-border-dim rounded-lg px-3 py-3 font-jetbrains text-[0.875rem] text-[#c4b890] text-center mb-3" role="math" aria-label="Mathematical formula: 1 + 3 + 5 + ... + (2n - 1) = n squared">
              1 + 3 + 5 + ... + (2n - 1) = n²
            </div>
            <p className="text-[0.8rem] text-ink-tertiary mb-3">Use induction or telescoping summation.</p>
            <Link 
              href="/articles/problem-of-the-day" 
              className="block text-center text-[0.8rem] rounded-lg px-3 py-2.5 bg-gold/10 border border-gold/40 text-gold hover:bg-gold/20 hover:border-gold transition-all duration-200"
              aria-label="View solution for today's problem of the day"
            >
              View Solution
            </Link>
          </div>

          {/* PROBLEM BANKS */}
          <nav aria-labelledby="problem-banks-heading">
            <h2 id="problem-banks-heading" className="text-[0.68rem] tracking-wide uppercase text-ink-muted pb-2 border-b border-border-dim mb-3 font-normal">
              Problem Banks
            </h2>
            {problemBanks.map((bank) => (
              <Link 
                key={bank.href} 
                href={bank.href} 
                className="flex items-center gap-3 p-3 mb-2 rounded-lg border border-border-dim bg-card hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-200 no-underline group"
                aria-label={`Explore ${bank.label} — ${bank.desc}`}
              >
                <span className="text-[1.4rem]" aria-hidden="true">{bank.emoji}</span>
                <div className="flex-1">
                  <div className={`text-[0.875rem] font-medium ${bank.color} group-hover:text-gold transition-colors duration-200`}>
                    {bank.label}
                  </div>
                  <div className="text-[0.75rem] text-ink-muted">{bank.desc}</div>
                </div>
                <span className="text-ink-muted text-lg group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" aria-hidden="true">›</span>
              </Link>
            ))}
          </nav>

          {/* ARCHIVE CTA */}
          <div className="rounded-xl border border-border-dim bg-card p-5 text-center">
            <div className="text-2xl mb-2" aria-hidden="true">📚</div>
            <h2 className="font-playfair text-[1rem] font-semibold text-ink-primary mb-1">The Original Archive</h2>
            <p className="text-[0.8rem] text-ink-tertiary leading-relaxed mb-3">
              Over 40,000 mathematical articles since 2010.
            </p>
            <a 
              href="https://eisatopon.blogspot.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-center text-[0.8rem] px-3 py-2.5 bg-white/5 border border-border-soft rounded-lg text-ink-secondary hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all duration-200"
              aria-label="Explore the original Eisatopon archive on Blogspot (opens in new tab)"
            >
              Explore eisatopon.gr
            </a>
          </div>

        </aside>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-border-dim bg-black/50 mt-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-[1200px] flex flex-col items-center gap-6">
          <Link href="/" className="font-playfair text-xl font-bold text-ink-primary hover:text-gold transition-colors duration-200">
            Eisatopon<span className="text-gold">AI</span>
          </Link>
          <p className="text-[0.85rem] text-ink-tertiary text-center max-w-[400px] leading-relaxed">
            Interactive mathematical archives, olympiad problems and AI-powered learning.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Visit EisatoponAI on ${social.name} (opens in new tab)`}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-border-dim bg-white/5 text-ink-muted hover:text-gold hover:bg-gold/10 hover:border-gold/30 transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="w-full max-w-[200px] h-[0.5px] bg-border-dim" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-center gap-4 text-[0.75rem] text-ink-muted">
            <span>© 2026 EisatoponAI</span>
            <span className="w-1 h-1 rounded-full bg-ink-muted" aria-hidden="true" />
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </main>
  );
}