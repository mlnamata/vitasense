import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/product/AddToCartButton";
import Packshot from "@/components/product/Packshot";
import { cn } from "@/lib/cn";
import { productPath } from "@/lib/content";
import { formatPrice, formatRating, plural } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { category } = product;
  const discount = product.compareAtPriceCzk
    ? Math.round((1 - product.priceCzk / product.compareAtPriceCzk) * 100)
    : 0;
  const badge = discount > 0 ? `−${discount} %` : product.badge;

  return (
    <article
      className={cn(
        "@container group relative flex flex-col rounded-2xl bg-white p-2 ring-1 ring-slate-900/[0.04] transition duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-xl"
        style={{ backgroundColor: category.tint }}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
            className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 0%, rgb(255 255 255 / 0.65), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pt-6">
              <Packshot
                product={product}
                className={cn(
                  "transition-transform duration-700 ease-soft group-hover:-translate-y-1 group-hover:scale-[1.04]",
                  product.format === "drops" ? "w-[34%]" : "w-[50%]"
                )}
              />
            </div>
          </>
        )}

        {/* Narrow grid cards (two per row on phones) drop the tag — the tint carries it. */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur @max-3xs:hidden">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ backgroundColor: category.accent }}
          />
          {category.label}
        </span>

        {badge && (
          <span
            className={cn(
              "absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold @max-3xs:right-2 @max-3xs:top-2",
              discount > 0 ? "bg-clay-600 text-white" : "bg-ink-900 text-white"
            )}
          >
            {discount > 0 && <span className="sr-only">Sleva </span>}
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-4 @max-3xs:px-1.5 @max-3xs:pb-1.5 @max-3xs:pt-3">
        <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
          <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
          <span>
            <span className="sr-only">Hodnocení </span>
            {formatRating(product.rating)}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {plural(product.reviewCount, { one: "recenze", few: "recenze", other: "recenzí" })}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.02em] text-slate-900 @max-3xs:text-[15px]">
          {/* Stretched link: the whole card opens the product; the cart button sits above it. */}
          <Link
            href={productPath(product.slug)}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-500 @max-3xs:text-[13px]">
          {product.tagline}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-5 @max-3xs:pt-4">
          <div className="min-w-0">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span
                className={cn(
                  "text-xl font-bold tracking-[-0.02em] @max-3xs:text-lg",
                  discount > 0 ? "text-clay-600" : "text-slate-900"
                )}
              >
                {formatPrice(product.priceCzk)}
              </span>
              {product.compareAtPriceCzk && (
                <span className="text-sm text-slate-400 line-through @max-3xs:text-xs">
                  <span className="sr-only">Původně </span>
                  {formatPrice(product.compareAtPriceCzk)}
                </span>
              )}
            </p>
            <p className="text-xs text-slate-500">{product.unit}</p>
          </div>
          <AddToCartButton product={product} className="relative z-10 @max-3xs:size-11" />
        </div>
      </div>
    </article>
  );
}
