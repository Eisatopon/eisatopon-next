import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  function pageHref(page: number) {
    return page === 1 ? "/" : `/archive/${page}`;
  }

  function getPageNumbers(): (number | "...")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  }

  const pages = getPageNumbers();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="mt-16 flex flex-col items-center gap-5">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="text-[0.7rem] tracking-[0.35em] uppercase text-ink-muted">
        Explore The Archive
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {hasPrev ? (
          <Link href={pageHref(currentPage - 1)} className="text-[0.78rem] tracking-wide uppercase text-ink-muted hover:text-gold transition-colors duration-300">
            ← Newer
          </Link>
        ) : (
          <span className="text-[0.78rem] tracking-wide uppercase text-ink-muted/30 cursor-not-allowed">← Newer</span>
        )}

        <div className="flex items-center gap-2">
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-1 text-ink-muted text-sm">···</span>
            ) : p === currentPage ? (
              <span key={p} aria-current="page"
                className="w-9 h-9 rounded-full border border-gold/40 bg-gold/10 text-gold text-[0.82rem] font-medium flex items-center justify-center shadow-[0_0_18px_rgba(212,175,55,0.18)]">
                {String(p).padStart(2, "0")}
              </span>
            ) : (
              <Link key={p} href={pageHref(p)}
                className="w-9 h-9 rounded-full border border-white/10 text-ink-secondary hover:border-gold/30 hover:text-gold transition-all duration-300 text-[0.82rem] flex items-center justify-center">
                {String(p).padStart(2, "0")}
              </Link>
            )
          )}
        </div>

        {hasNext ? (
          <Link href={pageHref(currentPage + 1)} className="text-[0.78rem] tracking-wide uppercase text-ink-muted hover:text-gold transition-colors duration-300 ml-2">
            Older →
          </Link>
        ) : (
          <span className="text-[0.78rem] tracking-wide uppercase text-ink-muted/30 cursor-not-allowed ml-2">Older →</span>
        )}
      </div>
      <div className="text-[0.68rem] uppercase tracking-[0.25em] text-ink-muted/70">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}