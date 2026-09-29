"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import Packshot from "@/components/product/Packshot";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { FREE_SHIPPING_CZK, SHOP_PATH } from "@/lib/content";
import { formatPrice, plural } from "@/lib/format";

/** Bottom sheet on phones, side panel from md up. */
export default function CartDrawer() {
  const { lines, count, subtotal, isOpen, close, setQuantity, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isOpen, close]);

  const remaining = Math.max(FREE_SHIPPING_CZK - subtotal, 0);
  const progress = Math.min(subtotal / FREE_SHIPPING_CZK, 1);

  return (
    <div className="fixed inset-0 z-50" inert={!isOpen}>
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "absolute inset-0 bg-ink-950/30 backdrop-blur-[2px] transition-opacity duration-500 ease-soft",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[28px] bg-cream shadow-2xl transition-[translate,visibility] duration-500 ease-soft",
          "md:inset-y-0 md:left-auto md:max-h-none md:w-[440px] md:rounded-l-[28px] md:rounded-tr-none",
          // Hidden once off-screen, or its shadow bleeds onto the viewport edge.
          isOpen
            ? "visible translate-y-0 md:translate-x-0"
            : "invisible translate-y-full md:translate-x-full md:translate-y-0"
        )}
      >
        <div aria-hidden="true" className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-slate-300 md:hidden" />

        <header className="flex items-center justify-between px-5 pb-4 pt-3 md:px-7 md:pt-7">
          <h2 id="cart-title" className="text-xl font-bold tracking-[-0.02em] text-slate-900">
            Košík
            {count > 0 && (
              <span className="ml-2 text-base font-medium text-slate-500">
                {plural(count, { one: "položka", few: "položky", other: "položek" })}
              </span>
            )}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Zavřít košík"
            className="inline-flex size-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 active:scale-95"
          >
            <X className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 pt-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
              <ShoppingBag className="size-7" strokeWidth={1.8} />
            </span>
            <p className="mt-5 text-lg font-bold text-slate-900">Košík je zatím prázdný</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
              Vyberte si z našich bestsellerů — doprava je zdarma od{" "}
              {formatPrice(FREE_SHIPPING_CZK)}.
            </p>
            <Link
              href={SHOP_PATH}
              onClick={close}
              className={buttonClass({ size: "md", className: "mt-7" })}
            >
              Prozkoumat doplňky
            </Link>
          </div>
        ) : (
          <>
            <div className="mx-5 rounded-2xl bg-white p-4 ring-1 ring-slate-900/[0.04] md:mx-7">
              <p className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Truck className="size-4 text-sage-600" aria-hidden="true" />
                {remaining > 0 ? (
                  <span>
                    Do dopravy zdarma zbývá{" "}
                    <strong className="font-bold text-slate-900">{formatPrice(remaining)}</strong>
                  </span>
                ) : (
                  <span>Máte dopravu zdarma</span>
                )}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sage-100">
                <div
                  className="h-full rounded-full bg-sage-600 transition-[width] duration-700 ease-soft"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            <ul className="mt-2 flex-1 divide-y divide-slate-900/[0.06] overflow-y-auto overscroll-contain px-5 md:px-7">
              {lines.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-4">
                  <div
                    className="flex size-20 shrink-0 items-center justify-center rounded-xl pt-2"
                    style={{ backgroundColor: product.category.tint }}
                  >
                    <Packshot
                      product={product}
                      showLabel={false}
                      className={product.format === "drops" ? "w-[26%]" : "w-[40%]"}
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.unit}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        aria-label={`Odebrat ${product.name}`}
                        className="-mr-2 -mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-white hover:text-slate-700"
                      >
                        <Trash2 className="size-[18px]" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-xl bg-white ring-1 ring-slate-900/[0.08]">
                        <button
                          type="button"
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          aria-label={`Snížit množství ${product.name}`}
                          className="inline-flex size-10 items-center justify-center rounded-l-xl text-slate-600 transition hover:text-slate-900 active:scale-90"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          aria-label={`Zvýšit množství ${product.name}`}
                          className="inline-flex size-10 items-center justify-center rounded-r-xl text-slate-600 transition hover:text-slate-900 active:scale-90"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <p className="font-bold text-slate-900">
                        {formatPrice(product.priceCzk * quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-slate-900/[0.06] px-5 pt-5 pb-safe md:px-7 md:pb-7">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-600">Mezisoučet</span>
                <span className="text-xl font-bold tracking-[-0.02em] text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Doprava a platba se dopočítají v pokladně.</p>
              <Link
                href="/pokladna"
                onClick={close}
                className={buttonClass({ className: "mt-5 w-full" })}
              >
                Pokračovat k pokladně
              </Link>
            </footer>
          </>
        )}
      </section>
    </div>
  );
}
