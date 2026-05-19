import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/articles";

export async function GET() {
  const baseUrl = "https://www.eisatopon.gr";

  try {
    // Φέρνουμε όλα τα άρθρα (async)
    const allArticles = await getAllArticles();

    // 1. Ξεκινάμε να χτίζουμε το XML string με τις στατικές σελίδες
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/articles</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/banks</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/banks/imo</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

    // 2. Προσθέτουμε δυναμικά όλα τα άρθρα (40.000+) μέσα στο XML
    allArticles.forEach((article) => {
      // Μετατρέπουμε την ημερομηνία σε ISO string (π.χ. 2026-05-19T...)
      const date = article.date ? new Date(article.date).toISOString() : new Date().toISOString();
      
      xml += `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Κλείνουμε το urlset tag
    xml += `\n</urlset>`;

    // 3. Επιστρέφουμε το XML με το σωστό Content-Type header
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        // Προαιρετικό caching για να μην ξανατρέχει η getAllArticles σε κάθε refresh
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}