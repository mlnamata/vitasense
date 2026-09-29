import "server-only";

import type { Article } from "@/lib/types";
import { articles } from "./articles";

/* Editorial content. Swap for a CMS or a Supabase table when needed. */

export async function getArticles(): Promise<Article[]> {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticle(slug: string): Promise<Article | null> {
  return articles.find((article) => article.slug === slug) ?? null;
}
