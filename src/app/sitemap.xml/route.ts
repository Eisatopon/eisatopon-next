import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/articles";

// ΑΥΤΗ Η ΓΡΑΜΜΗ ΧΡΕΙΑΖΕΤΑΙ ΓΙΑ ΤΟ OUTPUT: EXPORT
export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://www.eisatopon.gr";

  try {
    const allArticles = await getAllArticles();

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

    allArticles.forEach((article) => {
      const date = article.date ? new Date(article.date).toISOString() : new Date().toISOString();
      
      xml += `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    // Επιστρέφουμε το XML. 
    // Σημείωση: Στο static export, τα headers Cache-Control αγνοούνται,
    // αλλά το Content-Type χρειάζεται για να ξέρει ο browser τι διαβάζει.
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}