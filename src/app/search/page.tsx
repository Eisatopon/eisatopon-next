import SearchClient from "./SearchClient";

import { getAllArticles } from "@/lib/articles";

export default async function SearchPage() {

  const articles = await getAllArticles();

  return <SearchClient articles={articles} />;
}