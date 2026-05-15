import Link from "next/link";

export default function MainNavbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        borderColor: "var(--color-border-dim)",
        background: "rgba(5,7,10,0.72)",
      }}
    >
      <div
        className="mx-auto px-12 flex items-center justify-between"
        style={{ maxWidth: "1200px", height: "64px" }}
      >

        {/* LOGO — wordmark only */}
        <Link
          href="/"
          style={{ textDecoration: "none" }}
        >
          <div style={{
            fontSize: "1.75rem",
            fontFamily: "var(--font-family-playfair)",
            fontWeight: 600,
            color: "var(--color-ink-primary)",
            letterSpacing: "-0.01em",
          }}>
            Eisatopon<span style={{ color: "var(--color-gold)" }}>AI</span>
          </div>
        </Link>

        {/* CATEGORIES */}
        <nav aria-label="Article categories" className="hidden md:flex items-center gap-1">
          {["All", "Number Theory", "Geometry", "Analysis", "Combinatorics", "Algebra"].map((cat, i) => (
            <Link
              key={cat}
              href={i === 0 ? "/" : `/category/${cat.toLowerCase().replace(" ", "-")}`}
              style={{
                padding: "8px 14px",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: i === 0 ? "var(--color-accent)" : "var(--color-ink-secondary)",
                fontWeight: i === 0 ? 600 : 400,
                borderBottom: i === 0 ? "2px solid var(--color-accent)" : "2px solid transparent",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* SEARCH */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105"
          style={{
            color: "var(--color-ink-muted)",
            borderColor: "var(--color-border-dim)",
            background: "rgba(255,255,255,0.03)",
          }}
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </button>

      </div>
    </header>
  );
}