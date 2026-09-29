import Image from "next/image";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/product/AddToCartButton";
import Packshot from "@/components/product/Packshot";
import { cn } from "@/lib/cn";
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

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white p-2 ring-1 ring-slate-900/[0.04] transition duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift",
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

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ backgroundColor: category.accent }}
          />
          {category.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
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

        <h3 className="mt-2 text-lg font-bold tracking-[-0.02em] text-slate-900">
          {product.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-slate-500">{product.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xl font-bold tracking-[-0.02em] text-slate-900">
              {formatPrice(product.priceCzk)}
            </p>
            <p className="text-xs text-slate-500">{product.unit}</p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
