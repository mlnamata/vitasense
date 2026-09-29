"use client";

import { useEffect, useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { buttonClass } from "@/components/ui/button";
import { PRODUCT_PAGE } from "@/lib/content";
import type { Product } from "@/lib/types";

const MAX = 20;

/** Quantity stepper + add-to-cart on the product page. */
export default function ProductPurchase({ product }: { product: Product }) {
  const { add, open } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2400);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <div>
      <div className="flex gap-3">
        <div className="flex h-14 items-center rounded-2xl bg-white ring-1 ring-inset ring-slate-900/10">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1}
            aria-label="Snížit množství"
            className="inline-flex size-14 items-center justify-center rounded-l-2xl text-slate-600 transition hover:text-slate-900 active:scale-90 disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <output aria-live="polite" className="w-8 text-center text-base font-bold tabular-nums">
            {quantity}
          </output>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(MAX, value + 1))}
            disabled={quantity >= MAX}
            aria-label="Zvýšit množství"
            className="inline-flex size-14 items-center justify-center rounded-r-2xl text-slate-600 transition hover:text-slate-900 active:scale-90 disabled:opacity-40"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            add(product, quantity);
            setAdded(true);
          }}
          className={buttonClass({ className: "flex-1" })}
        >
          {added ? (
            <Check className="size-5" strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <ShoppingBag className="size-5" aria-hidden="true" />
          )}
          {added ? PRODUCT_PAGE.added : PRODUCT_PAGE.addToCart}
        </button>
      </div>

      <p className="mt-3 min-h-6 text-sm" aria-live="polite">
        {added && (
          <button
            type="button"
            onClick={open}
            className="font-semibold text-sage-700 underline underline-offset-4 hover:text-sage-900"
          >
            {PRODUCT_PAGE.viewCart}
          </button>
        )}
      </p>
    </div>
  );
}
