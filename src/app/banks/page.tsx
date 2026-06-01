"use client";

import Link from "next/link";
import MainNavbar from "@/components/MainNavbar";

const banks = [
  {
    href: "/banks/panelladikes",
    emoji: "📚",
    title: "Πανελλαδικές Εξετάσεις",
    subtitle: "Μαθηματικά 1983–2025",
    description: "ΓΕΛ • ΕΠΑΛ • Επαναληπτικές • Ομογενείς",
    stats: [{ label: "Έτη", value: "43" }, { label: "Θέματα", value: "1000+" }, { label: "Τύποι", value: "4" }],
    gradient: "from-[#0a1a2e] to-[#0d0824]",
    accent: "text-gold",
    border: "hover:border-gold/40",
  },
  {
    href: "/banks/eme",
    emoji: "🏛️",
    title: "Ελληνική Μαθηματική Εταιρεία",
    subtitle: "Διαγωνισμοί ΕΜΕ 1995–2025",
    description: "Θαλής • Ευκλείδης • Αρχιμήδης",
    stats: [{ label: "Διαγωνισμοί", value: "3" }, { label: "Έτη", value: "30+" }, { label: "Θέματα", value: "500+" }],
    gradient: "from-[#1a3a1a] to-[#1a1000]",
    accent: "text-cat-green",
    border: "hover:border-cat-green/40",
  },
  {
    href: "/banks/imo",
    emoji: "🌍",
    title: "Διεθνής Μαθηματική Ολυμπιάδα",
    subtitle: "IMO 1959–2025",
    description: "Όλα τα θέματα από την ίδρυση",
    stats: [{ label: "Έτη", value: "65+" }, { label: "Θέματα", value: "390+" }, { label: "Χώρες", value: "100+" }],
    gradient: "from-[#1a1a3a] to-[#0a0c10]",
    accent: "text-cat-blue",
    border: "hover:border-cat-blue/40",
  },
  {
    href: "/banks/olympiad-bank",
    emoji: "🏆",
    title: "Math Olympiad Bank",
    subtitle: "Εθνικές & Περιφερειακές Ολυμπιάδες",
    description: "National • Regional • TST — Παγκόσμια Αρχεία",
    stats: [{ label: "Ολυμπιάδες", value: "20+" }, { label: "Χώρες", value: "15+" }, { label: "Προβλήματα", value: "4000+" }],
    gradient: "from-[#2a1a0a] to-[#0a0c10]",
    accent: "text-cat-amber",
    border: "hover:border-cat-amber/40",
  },
];

export default function BanksPage() {
  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0c10] via-[#0b1628] to-[#0a0c10]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, rgba(201,162,39,0.3) 1px, transparent 1px),
                              radial-gradient(circle at 75% 50%, rgba(37,99,235,0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }} />
        </div>
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 max-w-[1200px] text-center">
          <div className="text-5xl mb-4">🗃️</div>
          <h1 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-4">
            Τράπεζες <span className="text-gold">Προβλημάτων</span>
          </h1>
          <p className="text-ink-tertiary text-lg md:text-xl max-w-2xl mx-auto">
            Συλλογές μαθηματικών θεμάτων από εξετάσεις και ολυμπιάδες — τοπικές και διεθνείς
          </p>
        </div>
      </section>

      {/* BANKS GRID */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banks.map((bank) => (
            <Link
              key={bank.href}
              href={bank.href}
              className={`group relative rounded-2xl border border-border-dim bg-card overflow-hidden transition-all duration-300 ${bank.border} hover:shadow-xl hover:-translate-y-1`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${bank.gradient} opacity-60`} />

              <div className="relative z-10 p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{bank.emoji}</span>
                  <span className="text-ink-muted text-sm group-hover:text-gold transition-colors">→</span>
                </div>

                <h2 className={`font-playfair text-xl md:text-2xl font-bold mb-1 ${bank.accent}`}>
                  {bank.title}
                </h2>
                <p className="text-ink-secondary font-medium mb-1">{bank.subtitle}</p>
                <p className="text-ink-muted text-sm mb-6">{bank.description}</p>

                {/* Stats */}
                <div className="flex gap-6">
                  {bank.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className={`text-xl font-bold font-playfair ${bank.accent}`}>{stat.value}</div>
                      <div className="text-[0.65rem] uppercase tracking-wider text-ink-muted mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border-dim bg-black/50 mt-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] text-center">
          <Link href="/" className="font-playfair text-lg font-bold text-ink-primary hover:text-gold transition-colors">
            Eisatopon<span className="text-gold">AI</span>
          </Link>
          <p className="text-[0.75rem] text-ink-muted mt-2">© 2026 eisatopon.gr</p>
        </div>
      </footer>
    </main>
  );
}