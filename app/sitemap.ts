import type { MetadataRoute } from "next";
import { MAGAZINE, SHOP_PATH, productPath } from "@/lib/content";
import { getArticles } from "@/lib/data/content";
import { getCategories, getProducts } from "@/lib/data/products";
import { LEGAL_DOCUMENTS } from "@/lib/legal";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [products, categories, articles] = await Promise.all([
    getProducts(),
    getCategories(),
    getArticles(),
  ]);

  const paths = [
    "/",
    SHOP_PATH,
    "/predplatne",
    MAGAZINE.href,
    "/kontakt",
    ...categories.map((category) => `${SHOP_PATH}/${category.id}`),
    ...products.map((product) => productPath(product.slug)),
    ...articles.map((article) => `${MAGAZINE.href}/${article.slug}`),
    ...LEGAL_DOCUMENTS.map((doc) => `/${doc.slug}`),
  ];

  return paths.map((path) => ({ url: `${base}${path}` }));
}
