import Link from "next/link";
import Image from "next/image";
import MainNavbar from "@/components/MainNavbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mathematical Problem Banks | EisatoponAI",
  description:
    "Interactive mathematical archives, olympiad problems and AI-powered learning.",
};

/* ══════════════════════════════════════════════════════════
   SOCIAL ICONS (inline SVGs, no external deps)
══════════════════════════════════════════════════════════ */

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

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-base)", color: "var(--color-ink-primary)" }}>

      <MainNavbar />

      <div className="mx-auto px-8 py-10" style={{ maxWidth: "1200px" }}>

        {/* ── FEATURED HERO ────────────────────────────── */}
        <section className="mb-14">
          <Link
            href="/articles/infinity-hotel"
            className="group relative block overflow-hidden"
            style={{ borderRadius: "16px", border: "0.5px solid var(--color-border-dim)" }}
          >
            {/* Image */}
            <div className="relative" style={{ height: "500px" }}>
              <Image
                src="/images/infinity-hotel.jpg"
                alt="Hilbert's Hotel"
                fill
                priority
                sizes="1200px"
                className="object-cover transition duration-700"
                style={{ filter: "brightness(0.65)" }}
              />
              {/* Math grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(127,168,212,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(127,168,212,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                  opacity: 0.08,
                }}
              />
              {/* Blue glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "-40px", left: "33%",
                  width: "400px", height: "300px",
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(127,168,212,0.15) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Content overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end"
              style={{
                padding: "56px 56px 56px 56px",
                background: "linear-gradient(to top, rgba(8,10,15,0.85) 0%, rgba(8,10,15,0.35) 55%, transparent 100%)",
              }}
            >
              <div className="flex gap-2 mb-5">
                <span className="badge badge-gold">Featured</span>
                <span className="badge badge-accent">Number Theory</span>
              </div>

              <h1
                className="font-playfair mb-4"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink-primary)",
                  maxWidth: "720px",
                  textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                }}
              >
                Infinity and Hilbert's Hotel: What Cantor Taught Us About the Infinite
              </h1>

              <p style={{ color: "var(--color-ink-tertiary)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", marginBottom: "20px" }}>
                A journey into transfinite numbers, bijections, and the counterintuitive mathematics of infinite sets.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-ink-muted)" }}>
                <span>By EisatoponAI Team</span>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--color-ink-muted)" }} />
                <span>May 2026</span>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--color-ink-muted)" }} />
                <span>6 min read</span>
              </div>
            </div>
          </Link>
        </section>

        {/* ── TWO COLUMNS ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]" style={{ gap: "48px" }}>

          {/* ── LEFT: ARTICLES ──────────────────────── */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-ink-muted)" }}>
                Latest Articles
              </span>
              <Link
                href="/articles"
                style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-ink-muted)" }}
              >
                Browse All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "20px" }}>

              {/* π */}
              <Link href="/articles/mystery-of-pi" className="group" style={{ borderRadius: "14px", overflow: "hidden", border: "0.5px solid var(--color-border-dim)", background: "var(--color-card)", display: "block", transition: "transform 0.3s ease" }}>
                <div style={{ position: "relative", height: "180px" }}>
                  <Image src="/images/pi.jpg" alt="Pi" fill sizes="300px" className="object-cover" style={{ filter: "brightness(0.65)" }} />
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-cat-red)", marginBottom: "8px" }}>
                    Mathematical Constants · 4 min read
                  </div>
                  <h3 className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.3, color: "var(--color-ink-primary)", marginBottom: "8px" }}>
                    The Mystery of π
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-ink-tertiary)", lineHeight: 1.6 }}>
                    From circles to the Gaussian integral, π surfaces where you least expect it.
                  </p>
                </div>
              </Link>

              {/* Chess */}
              <Link href="/articles/chess-mathematics" className="group" style={{ borderRadius: "14px", overflow: "hidden", border: "0.5px solid var(--color-border-dim)", background: "var(--color-card)", display: "block", transition: "transform 0.3s ease" }}>
                <div style={{ position: "relative", height: "180px" }}>
                  <Image src="/images/chess.jpg" alt="Chess" fill sizes="300px" className="object-cover" style={{ filter: "brightness(0.65)" }} />
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-cat-green)", marginBottom: "8px" }}>
                    Combinatorics · 5 min read
                  </div>
                  <h3 className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.3, color: "var(--color-ink-primary)", marginBottom: "8px" }}>
                    Chess and Mathematics
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-ink-tertiary)", lineHeight: 1.6 }}>
                    Graph theory and the combinatorial explosion behind 32 pieces on 64 squares.
                  </p>
                </div>
              </Link>

              {/* Golden Ratio — χωρίς εικόνα */}
              <Link href="/articles/golden-ratio" className="group" style={{ borderRadius: "14px", overflow: "hidden", border: "0.5px solid var(--color-border-dim)", background: "var(--color-card)", display: "block" }}>
                <div style={{ height: "180px", background: "linear-gradient(135deg, #120a00, #1a1000)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", color: "rgba(196,169,106,0.3)", fontFamily: "var(--font-playfair)" }}>
                  φ
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-cat-amber)", marginBottom: "8px" }}>
                    Algebra · 7 min read
                  </div>
                  <h3 className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.3, color: "var(--color-ink-primary)", marginBottom: "8px" }}>
                    The Golden Ratio — Myth and Mathematics
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-ink-tertiary)", lineHeight: 1.6 }}>
                    What is φ really, and does it truly appear in art and nature?
                  </p>
                </div>
              </Link>

              {/* Euler — χωρίς εικόνα */}
              <Link href="/articles/euler-identity" className="group" style={{ borderRadius: "14px", overflow: "hidden", border: "0.5px solid var(--color-border-dim)", background: "var(--color-card)", display: "block" }}>
                <div style={{ height: "180px", background: "linear-gradient(135deg, #080418, #0d0824)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", color: "rgba(138,112,192,0.4)", fontFamily: "var(--font-jetbrains)" }}>
                  e<sup>iπ</sup> + 1 = 0
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-cat-purple)", marginBottom: "8px" }}>
                    Analysis · 5 min read
                  </div>
                  <h3 className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.3, color: "var(--color-ink-primary)", marginBottom: "8px" }}>
                    Euler's Identity — The Most Beautiful Equation
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-ink-tertiary)", lineHeight: 1.6 }}>
                    Why e<sup>iπ</sup> + 1 = 0 is not just elegant, but inevitable.
                  </p>
                </div>
              </Link>

            </div>
          </section>

          {/* ── RIGHT: SIDEBAR ──────────────────────── */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* PROBLEM OF THE DAY */}
            <div style={{ borderRadius: "14px", border: "0.5px solid var(--color-gold-border)", background: "var(--color-gold-dim)", padding: "20px" }}>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "12px" }}>
                ✦ Problem of the Day
              </div>
              <p className="font-serif" style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#d4c99a", marginBottom: "14px" }}>
                Prove that the sum of the first n odd numbers equals n².
              </p>
              <div style={{ background: "rgba(0,0,0,0.35)", border: "0.5px solid var(--color-border-dim)", borderRadius: "8px", padding: "12px", fontFamily: "var(--font-jetbrains)", fontSize: "0.875rem", color: "#c4b890", textAlign: "center", lineHeight: 1.8, marginBottom: "14px" }}>
                1 + 3 + 5 + … + (2n − 1) = n²
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--color-ink-tertiary)", marginBottom: "14px" }}>
                Use induction or telescoping summation.
              </p>
              <Link href="/articles/problem-of-the-day" style={{ display: "block", textAlign: "center", padding: "8px", borderRadius: "8px", fontSize: "0.8rem", background: "rgba(196,169,106,0.08)", border: "0.5px solid var(--color-gold-border)", color: "var(--color-gold)" }}>
                View Solution →
              </Link>
            </div>

            {/* PROBLEM BANKS */}
            <div>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-ink-muted)", paddingBottom: "10px", borderBottom: "0.5px solid var(--color-border-dim)", marginBottom: "12px" }}>
                Problem Banks
              </div>
              {[
                { href: "/banks/panelladikes", emoji: "🎓", label: "Hellenic Exams", desc: "Mathematics Topics", color: "var(--color-cat-blue)" },
                { href: "/banks/eme",          emoji: "🏛️", label: "HMS Contests",           desc: "Thales · Euclid · Archimedes", color: "var(--color-cat-red)" },
                { href: "/banks/imo",          emoji: "🌍", label: "IMO",           desc: "1959 – 2025", color: "var(--color-cat-green)" },
              ].map((bank) => (
                <Link
                  key={bank.href}
                  href={bank.href}
                  className="bank-link"
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "10px", border: "0.5px solid var(--color-border-dim)", background: "rgba(255,255,255,0.02)", marginBottom: "8px", textDecoration: "none" }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{bank.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, color: bank.color }}>{bank.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-ink-muted)" }}>{bank.desc}</div>
                  </div>
                  <span style={{ color: "var(--color-ink-muted)", fontSize: "1rem" }}>›</span>
                </Link>
              ))}
            </div>

           {/* ARCHIVE CTA */}
<div style={{ borderRadius: "14px", border: "0.5px solid var(--color-border-dim)", background: "rgba(255,255,255,0.02)", padding: "20px", textAlign: "center" }}>
  <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📚</div>
  <h3 className="font-playfair" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-ink-primary)", marginBottom: "6px" }}>
    The Original Archive
  </h3>
  <p style={{ fontSize: "0.8rem", color: "var(--color-ink-tertiary)", lineHeight: 1.6, marginBottom: "14px" }}>
    Over 40,000 mathematical articles since 2010.
  </p>
  
    href="https://www.eisatopon.gr"
    target="_blank"
   rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "8px", borderRadius: "8px", fontSize: "0.8rem", background: "rgba(255,255,255,0.05)", border: "0.5px solid var(--color-border-soft)", color: "var(--color-ink-secondary)" }}>
  Explore eisatopon.gr
</a>
</div>
          </aside>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
         FOOTER — SOCIAL MEDIA
      ══════════════════════════════════════════════════════════ */}
      <footer
        style={{
          borderTop: "0.5px solid var(--color-border-dim)",
          background: "rgba(8,10,15,0.5)",
        }}
      >
        <div
          className="mx-auto px-8 py-12"
          style={{ maxWidth: "1200px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="font-playfair text-xl font-bold"
              style={{ color: "var(--color-ink-primary)" }}
            >
              Eisatopon<span style={{ color: "var(--color-gold)" }}>AI</span>
            </Link>

            {/* Tagline */}
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-ink-tertiary)",
                textAlign: "center",
                maxWidth: "400px",
                lineHeight: 1.6,
              }}
            >
              Interactive mathematical archives, olympiad problems and AI-powered learning.
            </p>

            {/* Social Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="social-icon"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    color: "var(--color-ink-muted)",
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid var(--color-border-dim)",
                    transition: "color 0.2s ease, background 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "0.5px",
                background: "var(--color-border-dim)",
              }}
            />

            {/* Copyright */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "0.75rem",
                color: "var(--color-ink-muted)",
                letterSpacing: "0.05em",
              }}
            >
              <span>© 2026 EisatoponAI</span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--color-ink-muted)" }} />
              <span>All rights reserved</span>
            </div>

          </div>
        </div>
      </footer>

    </main>
  );
}

