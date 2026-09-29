import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import Panel from "@/components/admin/Panel";
import PageHeader from "@/components/admin/PageHeader";
import ProductThumb from "@/components/product/ProductThumb";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { getStock } from "@/lib/data/orders-api";
import { getProducts } from "@/lib/data/products";
import { formatPrice, formatRating } from "@/lib/format";

export const metadata: Metadata = { title: "Produkty" };

function StockBadge({ units }: { units: number }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ring-1 ring-inset",
        units === 0
          ? "bg-red-50 text-red-700 ring-red-200"
          : units < 15
            ? "bg-amber-50 text-amber-800 ring-amber-200"
            : "bg-slate-50 text-slate-700 ring-slate-200"
      )}
    >
      {units === 0 ? "Vyprodáno" : `${units} ks`}
    </span>
  );
}

export default async function AdminProductsPage() {
  const [products, stock] = await Promise.all([getProducts(), getStock()]);

  return (
    <>
      <PageHeader
        title="Produkty"
        description={`${products.length} v katalogu`}
        action={
          <Link href="/admin/produkty/novy" className={buttonClass({ size: "md" })}>
            <Plus className="size-4" aria-hidden="true" />
            Nový produkt
          </Link>
        }
      />

      <Panel className="p-0 sm:p-0">
        <ul className="divide-y divide-slate-900/[0.06]">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                href={`/admin/produkty/${product.slug}`}
                className="grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 transition-colors hover:bg-sand-50 md:grid-cols-[3rem_minmax(0,2fr)_minmax(0,1fr)_6rem_6rem_5rem]"
              >
                <ProductThumb product={product} size={48} className="size-12" />
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-slate-900">
                    {product.name}
                    {product.isBestseller && (
                      <span className="ml-2 rounded-full bg-ink-900 px-1.5 py-0.5 align-middle text-[10px] font-bold text-white">
                        TOP
                      </span>
                    )}
                  </span>
                  <span className="block truncate text-sm text-slate-500">{product.unit}</span>
                </span>
                <span className="hidden truncate text-sm text-slate-600 md:block">{product.category.label}</span>
                <span className="hidden items-center gap-1 text-sm text-slate-600 md:flex">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  {formatRating(product.rating)}
                </span>
                <span className="text-right text-sm md:text-left">
                  <span className="block font-semibold tabular-nums text-slate-900">{formatPrice(product.priceCzk)}</span>
                  <span className="md:hidden">
                    <StockBadge units={stock[product.slug] ?? 0} />
                  </span>
                </span>
                <span className="hidden md:block">
                  <StockBadge units={stock[product.slug] ?? 0} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
