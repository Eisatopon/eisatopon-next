import Link from "next/link";
import MainNavbar from "@/components/MainNavbar";
import { getAllPotd } from "@/lib/potd";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Problem of the Day Archive | EisatoponAI",
  description: "Browse all past Problems of the Day — mathematics, olympiads, number theory and more.",
  alternates: { canonical: "https://eisatopon.gr/potd" },
};

export default function PotdArchivePage() {
  const problems = getAllPotd();

  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-[860px]">

        {/* Header */}
        <div className="mb-10 flex items-baseline justify-between border-b border-border-dim pb-6">
          <div>
            <div className="text-[0.68rem] tracking-widest uppercase text-gold mb-2">✦ Problem of the Day</div>
            <h1 className="font-playfair text-[2rem] font-semibold text-ink-primary">Archive</h1>
          </div>
          <Link href="/" className="text-[0.75rem] tracking-widest uppercase text-ink-muted hover:text-gold transition-colors duration-200">
            ← Home
          </Link>
        </div>

        {/* Problem list */}
        {problems.length === 0 ? (
          <p className="text-ink-muted text-sm">No problems yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {problems.map((p) => (
              <div
                key={p.date}
                className="rounded-xl border border-border-dim bg-card p-5 hover:border-gold/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-[0.62rem] text-ink-muted tracking-wide">{p.date}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[0.65rem] px-2 py-0.5 rounded ${
                      p.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : p.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {p.difficulty}
                    </span>
                    <span className="text-[0.65rem] text-ink-muted">{p.topic}</span>
                  </div>
                </div>
                <h2 className="font-serif text-[0.95rem] font-semibold text-ink-primary mb-2">{p.title}</h2>
                <p className="text-[0.85rem] text-ink-secondary leading-relaxed">{p.problem}</p>
                {p.hint && (
                  <details className="mt-3 group">
                    <summary className="list-none cursor-pointer">
                      <span className="inline-block text-[0.75rem] text-gold hover:text-white transition-colors duration-200 select-none">
                        💡 View Hint
                      </span>
                    </summary>
                    <p className="mt-2 text-[0.8rem] text-ink-tertiary italic p-3 bg-black/20 rounded-lg border border-border-dim">
                      {p.hint}
                    </p>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border-dim bg-black/50 mt-16">
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