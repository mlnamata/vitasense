import "server-only";

import type { Product } from "@/lib/types";
import { products } from "./mock";

/*
 * Catalogue data layer. Components only call these functions — once Supabase
 * is wired in, the bodies change (e.g. `supabase.from("products")
 * .select("*, category:categories(*)")`) and every caller stays as it is.
 */

export async function getBestsellers(limit = 4): Promise<Product[]> {
  return products.filter((product) => product.isBestseller).slice(0, limit);
}

export async function getProductsBySlug(slugs: string[]): Promise<Product[]> {
  return slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
}
