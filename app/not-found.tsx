import Link from "next/link";
import { Sprout } from "lucide-react";
import ShopShell from "@/components/layout/ShopShell";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { SHOP_PATH } from "@/lib/content";

/*
 * Rendered outside the (shop) layout, so it brings the storefront chrome
 * itself. Doubles as the placeholder for pages that are still being built.
 */
export default function NotFound() {
  return (
    <ShopShell>
      <section className="py-20 md:py-32">
        <Container className="flex flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
            <Sprout className="size-8" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-sage-700">
            Stránka nenalezena
          </p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl">
            Tahle stránka tu není.
          </h1>
          <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-slate-600">
            Možná se přesunula, nebo je v odkazu překlep. Zkuste to přes obchod, nebo se vraťte
            na úvod.
          </p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href={SHOP_PATH} className={buttonClass()}>
              Prozkoumat doplňky
            </Link>
            <Link href="/" className={buttonClass({ variant: "secondary" })}>
              Zpět na úvod
            </Link>
          </div>
        </Container>
      </section>
    </ShopShell>
  );
}
