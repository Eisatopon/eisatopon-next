"use client";

export default function EMEPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-950 via-black to-yellow-950 text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[48vh] flex items-center justify-center text-center px-6">

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.15),transparent_60%)]"></div>

        <div className="relative z-10 max-w-5xl">

          <div className="text-6xl mb-6">
            🏛️
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
            Τράπεζα Θεμάτων
            <br />
            Ελληνικής Μαθηματικής Εταιρείας
          </h1>

          <p className="text-2xl text-zinc-300 leading-relaxed">
            Θαλής · Ευκλείδης · Αρχιμήδης
          </p>

          <p className="mt-8 text-lg text-yellow-400 tracking-[0.3em] uppercase">
            Created by EisatoponAI
          </p>

        </div>

      </section>

      {/* COMPETITIONS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:border-yellow-500/40 transition">

            <div className="text-6xl mb-6">
              🥇
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ΘΑΛΗΣ
            </h2>

            <p className="text-zinc-400">
              Θέματα μαθηματικών διαγωνισμών Γυμνασίου και Λυκείου.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:border-green-500/40 transition">

            <div className="text-6xl mb-6">
              🎓
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ΕΥΚΛΕΙΔΗΣ
            </h2>

            <p className="text-zinc-400">
              Προχωρημένα προβλήματα και δεύτερη φάση διαγωνισμών.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:border-blue-500/40 transition">

            <div className="text-6xl mb-6">
              ⚗️
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ΑΡΧΙΜΗΔΗΣ
            </h2>

            <p className="text-zinc-400">
              Η κορυφαία φάση των διαγωνισμών της ΕΜΕ.
            </p>

          </div>

        </div>

      </section>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-4 mt-10 flex-wrap">

        <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-zinc-300">
          {"<< Νεότερες"}          {/* <-- FIX: string literal */}
        </button>

        <a
          href="/"
          className="px-5 py-2 rounded-full border border-white/10 bg-white text-black font-medium hover:scale-105 transition text-sm"
        >
          Αρχική
        </a>

        <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-zinc-300">
          {"Παλαιότερες >"}       {/* <-- FIX: string literal */}
        </button>

      </div>

    </main>
  );
}