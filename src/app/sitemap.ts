import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

// Αν η getAllArticles() δεν είναι async (π.χ. είναι απλό readFileSync), 
// αφαιρείς το async/await, αλλά συνήθως χρειάζεται.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.eisatopon.gr";

  // 1. Φέρνουμε τα άρθρα με await
  const allArticles = await getAllArticles();

  const articles = allArticles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 2. Επιστρέφουμε το array (με σωστά types για το changeFrequency)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/banks`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/banks/imo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...articles,
  ];
}