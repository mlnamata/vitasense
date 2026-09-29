import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/product/categoryIcons";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { GOALS, SECTIONS, SHOP_PATH } from "@/lib/content";
import { getCategories } from "@/lib/data/products";

export default async function Goals() {
  const categories = await getCategories();

  return (
    <section id={SECTIONS.goals} aria-labelledby="goals-title" className="py-12 md:py-16">
      <Container>
        <SectionHeading id="goals-title" eyebrow={GOALS.eyebrow} title={GOALS.title} />

        {/* Swipeable row on phones, six tiles in a row on desktop. */}
        <ul className="no-scrollbar relative -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            return (
              <li key={category.id} className="w-[42%] shrink-0 snap-start sm:w-auto">
                <Link
                  href={`${SHOP_PATH}/${category.id}`}
                  className="group relative flex h-full flex-col rounded-2xl bg-white p-4 ring-1 ring-slate-900/[0.04] transition duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift sm:p-5"
                >
                  <span
                    className="flex size-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: category.tint, color: category.accent }}
                  >
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="mt-5 text-base font-bold tracking-[-0.02em] text-slate-900">
                    {category.label}
                  </span>
                  <span className="mt-1 text-[13px] leading-snug text-slate-500">
                    {category.description}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="absolute right-4 top-4 size-4 text-slate-300 transition duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
