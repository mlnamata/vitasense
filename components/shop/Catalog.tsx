import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { cn } from "@/lib/cn";
import { SHOP, SHOP_PATH } from "@/lib/content";
import { plural } from "@/lib/format";
import type { Category, CategoryId, Product } from "@/lib/types";

type Props = {
  categories: Category[];
  active: CategoryId | null;
  products: Product[];
};

/** Category chips + result count + grid, shared by /obchod and its categories. */
export default function Catalog({ categories, active, products }: Props) {
  const chips = [
    { id: null, label: SHOP.all, href: SHOP_PATH, accent: null },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
      href: `${SHOP_PATH}/${category.id}`,
      accent: category.accent,
    })),
  ];

  return (
    <>
      <nav
        aria-label="Kategorie"
        className="no-scrollbar relative -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0"
      >
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {chips.map((chip) => {
            const isActive = chip.id === active;
            return (
              <li key={chip.label}>
                <Link
                  href={chip.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition duration-300 ease-soft active:scale-95",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-700 ring-1 ring-inset ring-slate-900/[0.08] hover:ring-slate-900/20"
                  )}
                >
                  {chip.accent && (
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{ backgroundColor: chip.accent }}
                    />
                  )}
                  {chip.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-6 text-sm text-slate-500">
        {plural(products.length, { one: "produkt", few: "produkty", other: "produktů" })}
      </p>
      <div className="mt-4">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
