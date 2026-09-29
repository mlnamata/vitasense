import Link from "next/link";
import { ArrowRight, Check, TestTubeDiagonal } from "lucide-react";
import Packshot from "@/components/product/Packshot";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { PROMOS, SECTIONS } from "@/lib/content";
import { getProductsBySlug } from "@/lib/data/products";

/* Each card ends in a visual that bleeds off its bottom edge. */
export default async function Promos() {
  const { subscription, test } = PROMOS;
  const packs = await getProductsBySlug([...subscription.productSlugs]);

  return (
    <section aria-label="Předplatné a domácí test" className="py-6 md:py-10">
      <Container className="grid gap-4 md:grid-cols-2 md:gap-6">
        <article className="flex flex-col overflow-hidden rounded-3xl bg-sage-100 px-6 pt-8 sm:px-10 sm:pt-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-sage-700">
            {subscription.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-slate-900 sm:text-4xl">
            {subscription.title}
          </h2>
          <ul className="mt-6 space-y-3">
            {subscription.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[15px] text-slate-700">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-sage-700">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
          <Link
            href={subscription.href}
            className={buttonClass({
              variant: "secondary",
              size: "md",
              className: "group mt-8 self-start bg-white",
            })}
          >
            {subscription.cta}
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <div aria-hidden="true" className="-mb-6 mt-auto flex items-end justify-center gap-[4%] pt-10">
            {packs.map((product, index) => (
              <Packshot
                key={product.id}
                product={product}
                showLabel={false}
                className={cn(index === 1 ? "w-[26%]" : "w-[21%]")}
              />
            ))}
          </div>
        </article>

        <article className="flex flex-col overflow-hidden rounded-3xl bg-clay-600 px-6 pt-8 text-white sm:px-10 sm:pt-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-clay-100">
            {test.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
            {test.title}
          </h2>
          <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-clay-50/90">
            {test.body}
          </p>
          <Link
            href={`/#${SECTIONS.ecosystem}`}
            className={buttonClass({ variant: "light", size: "md", className: "group mt-8 self-start" })}
          >
            {test.cta}
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          {/* Illustrative results screen, not real data. */}
          <div aria-hidden="true" className="mt-auto pt-10">
            <div className="-mb-4 rounded-t-2xl bg-white p-5 text-slate-800 shadow-lift sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-clay-50 text-clay-600">
                  <TestTubeDiagonal className="size-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Vaše výsledky</p>
                  <p className="text-xs text-slate-500">Domácí test · vyhodnoceno</p>
                </div>
              </div>
              <ul className="mt-5 space-y-4">
                {test.results.map((result) => {
                  const low = result.status !== "v optimu";
                  return (
                    <li key={result.label}>
                      <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-semibold text-slate-800">{result.label}</span>
                        <span className="text-slate-500">
                          {result.value}
                          <span
                            className={cn(
                              "ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                              low ? "bg-clay-50 text-clay-700" : "bg-sage-50 text-sage-700"
                            )}
                          >
                            {result.status}
                          </span>
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                        <div
                          className={cn("h-full rounded-full", low ? "bg-clay-500" : "bg-sage-500")}
                          style={{ width: `${result.level * 100}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
