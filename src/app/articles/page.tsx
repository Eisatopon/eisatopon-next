import { getAllArticles } from "@/lib/articles";
import Link from "next/link";
import Image from "next/image";
import MainNavbar from "@/components/MainNavbar";

export default async function ArticlesPage() {
  const allArticles = getAllArticles();

  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px]">
        <h1 className="font-playfair text-[2rem] font-semibold mb-2">
          All Articles
        </h1>

        <p className="text-ink-muted text-[0.85rem] mb-8">
          {allArticles.length} article
          {allArticles.length !== 1 ? "s" : ""} found
        </p>

        {allArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-muted text-lg mb-2">
              No articles found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block rounded-xl overflow-hidden border border-border-dim bg-card hover:border-gold/30 transition-all duration-300"
              >
                {article.image && (
                  <div className="relative h-[180px] bg-black overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover brightness-50 group-hover:brightness-70 transition-all duration-500"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="text-[0.68rem] tracking-wide uppercase text-gold mb-2">
                    {article.category}
                  </div>

                  <h3 className="font-playfair text-[1.1rem] font-semibold leading-snug mb-2 text-ink-primary group-hover:text-gold transition-colors duration-200">
                    {article.title}
                  </h3>

                  {article.summary && (
                    <p className="text-[0.83rem] leading-relaxed text-ink-secondary line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}