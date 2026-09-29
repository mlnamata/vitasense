import type { Metadata } from "next";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Catalog from "@/components/shop/Catalog";
import Container from "@/components/ui/Container";
import { SHOP } from "@/lib/content";
import { getCategories, getProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: SHOP.title,
  description: SHOP.subtitle,
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <section aria-labelledby="shop-title" className="pb-16 pt-6 md:pb-24 md:pt-10">
      <Container>
        <Breadcrumbs items={[{ label: "Domů", href: "/" }, { label: SHOP.title }]} />
        <h1
          id="shop-title"
          className="mt-5 text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl"
        >
          {SHOP.title}
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">
          {SHOP.subtitle}
        </p>
        <div className="mt-8">
          <Catalog categories={categories} active={null} products={products} />
        </div>
      </Container>
    </section>
  );
}
