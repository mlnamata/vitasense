import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import ProductForm from "@/components/admin/ProductForm";
import { getCategories } from "@/lib/data/products";

export const metadata: Metadata = { title: "Nový produkt" };

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <>
      <Link href="/admin/produkty" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Produkty
      </Link>
      <PageHeader title="Nový produkt" />
      <ProductForm
        categories={categories.map((category) => ({ value: category.id, label: category.label }))}
        initial={{
          name: "",
          slug: "",
          tagline: "",
          category: categories[0]?.id ?? "",
          format: "capsules",
          unit: "",
          price: "",
          compareAt: "",
          badge: "",
          stock: "0",
          bestseller: false,
          description: "",
        }}
      />
    </>
  );
}
