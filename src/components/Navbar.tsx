export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="text-2xl font-bold tracking-tight">
          EisatoponAI
        </div>

        <nav className="hidden md:flex gap-8 text-zinc-300">
          <a href="#" className="hover:text-white transition">
            Articles
          </a>

          <a href="#" className="hover:text-white transition">
            Olympiad
          </a>

          <a href="#" className="hover:text-white transition">
            Geometry
          </a>

          <a href="#" className="hover:text-white transition">
            Archive
          </a>
        </nav>

      </div>
    </header>
  );
}