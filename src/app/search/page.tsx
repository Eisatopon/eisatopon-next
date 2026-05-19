"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { getAllArticles } from "@/lib/articles";

const articles = getAllArticles();

export default function SearchPage() {

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {

    if (!query.trim()) return [];

    return articles.filter((article) => {

      const q = query.toLowerCase();

      return (
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q)
      );
    });

  }, [query]);

  return (
    <main className="min-h-screen bg-background px-6 py-24">

      <div className="mx-auto max-w-[900px]">

        <h1
          className="mb-10"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "3rem",
            color: "var(--color-ink-primary)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          Search
        </h1>

        <input
          type="text"
          placeholder="Search articles, olympiads, AI, number theory..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            px-6
            py-5
            text-lg
            outline-none
            transition-all
          "
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "var(--color-border-dim)",
            color: "var(--color-ink-primary)",
          }}
        />

        <div className="mt-10 flex flex-col gap-6">

          {filtered.map((article) => (

            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="
                rounded-2xl
                border
                p-6
                transition-all
                hover:border-gold/40
                hover:bg-white/[0.02]
              "
              style={{
                borderColor: "var(--color-border-dim)",
              }}
            >

              <div
                className="mb-2 text-sm uppercase tracking-[0.18em]"
                style={{
                  color: "var(--color-gold)",
                }}
              >
                {article.category}
              </div>

              <h2
                className="mb-3"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  color: "var(--color-ink-primary)",
                }}
              >
                {article.title}
              </h2>

              <p
                style={{
                  color: "var(--color-ink-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {article.summary}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}