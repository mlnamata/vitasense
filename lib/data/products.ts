import "server-only";

import type { Category, Product, RatingSummary, Review } from "@/lib/types";
import { categories, products, reviews } from "./mock";

/*
 * Catalogue data layer. Components only call these functions — once Supabase
 * is wired in, the bodies change (e.g. `supabase.from("products")
 * .select("*, category:categories(*)")`) and every caller stays as it is.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getBestsellers(limit = 4): Promise<Product[]> {
  return products.filter((product) => product.isBestseller).slice(0, limit);
}

export async function getProductsBySlug(slugs: string[]): Promise<Product[]> {
  return slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
}

export async function getCategories(): Promise<Category[]> {
  return Object.values(categories);
}

export async function getCategory(id: string): Promise<Category | null> {
  return Object.values(categories).find((category) => category.id === id) ?? null;
}

export async function getProductsByCategory(id: string): Promise<Product[]> {
  return products.filter((product) => product.category.id === id);
}

export async function getReviews(limit = 6): Promise<Review[]> {
  return reviews.slice(0, limit);
}

/** Store-wide rating, weighted by each product's review count. */
export async function getRatingSummary(): Promise<RatingSummary> {
  let count = 0;
  let weighted = 0;
  for (const product of products) {
    count += product.reviewCount;
    weighted += product.rating * product.reviewCount;
  }
  return { average: count ? weighted / count : 0, count };
}
