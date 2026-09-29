"use client";

import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

export default function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          add(product);
          setAdded(true);
        }}
        aria-label={`Přidat ${product.name} do košíku`}
        className={cn(
          "inline-flex size-12 shrink-0 items-center justify-center rounded-xl transition duration-300 ease-soft active:scale-90",
          added
            ? "bg-sage-600 text-white"
            : "bg-sage-50 text-sage-700 ring-1 ring-inset ring-sage-200/70 hover:bg-sage-600 hover:text-white hover:ring-sage-600",
          className
        )}
      >
        {added ? (
          <Check className="size-5" strokeWidth={2.4} />
        ) : (
          <Plus className="size-5" strokeWidth={2.2} />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {added ? `${product.name} je v košíku.` : ""}
      </span>
    </>
  );
}
