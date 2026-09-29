import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_ICONS } from "@/components/product/categoryIcons";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Catalog from "@/components/shop/Catalog";
import Container from "@/components/ui/Container";
import { SHOP, SHOP_PATH } from "@/lib/content";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/data/products";

type Props = { params: Promise<{ kategorie: string }> };

/* Every category is prerendered; anything else is a 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ kategorie: category.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory((await params).kategorie);
  return category ? { title: category.label, description: category.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory((await params).kategorie);
  if (!category) notFound();

  const [products, categories] = await Promise.all([
    getProductsByCategory(category.id),
    getCategories(),
  ]);
  const Icon = CATEGORY_ICONS[category.id];

  return (
    <section aria-labelledby="category-title" className="pb-16 pt-6 md:pb-24 md:pt-10">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Domů", href: "/" },
            { label: SHOP.title, href: SHOP_PATH },
            { label: category.label },
          ]}
        />

        <header
          className="relative mt-5 overflow-hidden rounded-3xl px-6 py-8 sm:px-10 sm:py-12"
          style={{ backgroundColor: category.tint }}
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.2}
            className="absolute -bottom-8 -right-6 size-44 opacity-[0.12] sm:size-56"
            style={{ color: category.accent }}
          />
          <span
            className="flex size-12 items-center justify-center rounded-2xl bg-white/80"
            style={{ color: category.accent }}
          >
            <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <h1
            id="category-title"
            className="mt-5 text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl"
          >
            {category.label}
          </h1>
          <p className="relative mt-3 max-w-xl text-lg leading-relaxed text-slate-700">
            {category.description}
          </p>
        </header>

        <div className="mt-8">
          <Catalog categories={categories} active={category.id} products={products} />
        </div>
      </Container>
    </section>
  );
}
