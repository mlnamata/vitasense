import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { PROMOS, SHOP_PATH, SUBSCRIPTION_DISCOUNT, SUBSCRIPTION_PAGE } from "@/lib/content";
import { getProductsBySlug } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Předplatné",
  description: SUBSCRIPTION_PAGE.subtitle,
};

export default async function SubscriptionPage() {
  const [showcase, example] = await Promise.all([
    getProductsBySlug([...PROMOS.subscription.productSlugs]),
    getProductsBySlug([...SUBSCRIPTION_PAGE.exampleSlugs]),
  ]);
  const regular = example.reduce((sum, product) => sum + product.priceCzk, 0);
  const discounted = Math.round(regular * (1 - SUBSCRIPTION_DISCOUNT));
  const perYear = (regular - discounted) * 12;
  const percent = Math.round(SUBSCRIPTION_DISCOUNT * 100);

  return (
    <>
      <section aria-labelledby="subscription-title" className="pt-6 md:pt-10">
        <Container>
          <Breadcrumbs items={[{ label: "Domů", href: "/" }, { label: "Předplatné" }]} />

          <div className="mt-6 grid items-center gap-8 overflow-hidden rounded-3xl bg-sage-100 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-2">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-sage-700">
                {SUBSCRIPTION_PAGE.eyebrow}
              </p>
              <h1
                id="subscription-title"
                className="mt-3 text-balance text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-5xl"
              >
                {SUBSCRIPTION_PAGE.title}
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-slate-700">
                {SUBSCRIPTION_PAGE.subtitle}
              </p>
              <Link href={SHOP_PATH} className={buttonClass({ className: "group mt-8 w-full sm:w-auto" })}>
                {SUBSCRIPTION_PAGE.cta}
                <ArrowRight
                  className="size-5 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div aria-hidden="true" className="relative mx-auto flex w-full max-w-md items-end justify-center gap-3 sm:gap-4">
              {showcase.map((product, index) =>
                product.imageUrl ? (
                  <div
                    key={product.id}
                    className={
                      index === 1
                        ? "relative z-10 aspect-[4/5] w-[38%] overflow-hidden rounded-2xl shadow-lift"
                        : "relative aspect-[4/5] w-[30%] overflow-hidden rounded-2xl shadow-soft"
                    }
                  >
                    <Image src={product.imageUrl} alt="" fill sizes="200px" className="object-cover" />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="steps-title" className="py-12 md:py-20">
        <Container>
          <h2 id="steps-title" className="text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl">
            Jak to funguje
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
            {SUBSCRIPTION_PAGE.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-900/[0.04] sm:p-7">
                <span className="flex size-10 items-center justify-center rounded-full bg-sage-600 font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-[-0.02em] text-slate-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span>Intervaly doručení:</span>
            {SUBSCRIPTION_PAGE.intervals.map((days) => (
              <span key={days} className="rounded-full bg-white px-3 py-1.5 font-semibold text-slate-800 ring-1 ring-inset ring-slate-900/[0.08]">
                každých {days} dní
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="savings-title" className="pb-12 md:pb-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.04] sm:p-8">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-900">Výhody předplatného</h2>
            <ul className="mt-6 space-y-4">
              {PROMOS.subscription.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-[15px] text-slate-700">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-ink-900 p-6 text-white sm:p-8">
            <h2 id="savings-title" className="text-2xl font-bold tracking-[-0.03em]">
              {SUBSCRIPTION_PAGE.exampleTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-[15px]">
              {example.map((product) => (
                <li key={product.id} className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">{product.name}</span>
                  <span className="text-slate-400 line-through">{formatPrice(product.priceCzk)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-5">
              <span className="text-slate-300">Každých 30 dní</span>
              <span className="text-3xl font-extrabold tracking-[-0.03em]">{formatPrice(discounted)}</span>
            </div>
            <p className="mt-4 rounded-2xl bg-white/[0.06] px-4 py-3 text-sm text-sage-200">
              Za rok ušetříte <strong className="font-bold text-white">{formatPrice(perYear)}</strong> a
              dopravu máte vždy zdarma (−{percent} % z každé zásilky).
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="pb-16 md:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-title" className="text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl">
              Časté otázky
            </h2>
            <div className="mt-8 space-y-3">
              {SUBSCRIPTION_PAGE.faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl bg-white px-5 ring-1 ring-slate-900/[0.04] [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
                    {item.q}
                    <Plus
                      aria-hidden="true"
                      className="size-5 shrink-0 text-slate-400 transition-transform duration-300 ease-soft group-open:rotate-45"
                    />
                  </summary>
                  <p className="pb-5 leading-relaxed text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
