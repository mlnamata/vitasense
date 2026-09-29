import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import ProductForm from "@/components/admin/ProductForm";
import { productPath } from "@/lib/content";
import { getStock } from "@/lib/data/orders-api";
import { getCategories, getProduct } from "@/lib/data/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return { title: product?.name ?? "Produkt" };
}

export default async function AdminProductPage({ params }: Props) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const [categories, stock] = await Promise.all([getCategories(), getStock()]);

  return (
    <>
      <Link href="/admin/produkty" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Produkty
      </Link>
      <PageHeader
        title={product.name}
        action={
          <Link
            href={productPath(product.slug)}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700"
          >
            Zobrazit v e-shopu
            <ExternalLink className="size-4" aria-hidden="true" />
          </Link>
        }
      />
      <ProductForm
        categories={categories.map((category) => ({ value: category.id, label: category.label }))}
        initial={{
          name: product.name,
          slug: product.slug,
          tagline: product.tagline,
          category: product.category.id,
          format: product.format,
          unit: product.unit,
          price: String(product.priceCzk),
          compareAt: product.compareAtPriceCzk ? String(product.compareAtPriceCzk) : "",
          badge: product.badge ?? "",
          stock: String(stock[product.slug] ?? 0),
          bestseller: product.isBestseller,
          description: product.details.description.join("\n\n"),
        }}
      />
    </>
  );
}
