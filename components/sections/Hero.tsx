import Link from "next/link";
import { ArrowRight, BellRing, Check, Leaf, Smartphone, TrendingUp } from "lucide-react";
import Packshot from "@/components/product/Packshot";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { HERO, SECTIONS } from "@/lib/content";
import { getProductsBySlug } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export default async function Hero() {
  const products = await getProductsBySlug([...HERO.productSlugs]);

  return (
    <section id={SECTIONS.home} aria-labelledby="hero-title">
      <Container className="grid items-center gap-10 pb-6 pt-8 sm:gap-12 sm:pt-12 md:pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-14">
        <div className="max-w-xl lg:max-w-none">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[13px] font-semibold text-sage-800 ring-1 ring-inset ring-sage-200">
            <Leaf className="size-3.5" aria-hidden="true" />
            {HERO.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-slate-900 sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]"
          >
            {HERO.title[0]} <span className="text-sage-600">{HERO.title[1]}</span>
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl sm:leading-relaxed">
            {HERO.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/#${SECTIONS.shop}`}
              className={buttonClass({ className: "group w-full sm:w-auto" })}
            >
              {HERO.primaryCta}
              <ArrowRight
                className="size-5 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={`/#${SECTIONS.ecosystem}`}
              className={buttonClass({ variant: "secondary", className: "w-full sm:w-auto" })}
            >
              <Smartphone className="size-5 text-sage-700" aria-hidden="true" />
              {HERO.secondaryCta}
            </Link>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-[15px] text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {HERO.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual products={products} />
      </Container>
    </section>
  );
}

/*
 * Product still-life on an organic backdrop. When the brand shoot exists,
 * swap the packshots for a single next/image and keep the blob behind it.
 */
function HeroVisual({ products }: { products: Product[] }) {
  const [main, side] = products;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div
        aria-hidden="true"
        className="absolute inset-[3%] animate-blob bg-linear-to-br from-sage-200 via-sage-100 to-sand-200"
      />
      <div
        aria-hidden="true"
        className="absolute right-[4%] top-[4%] size-[34%] animate-blob rounded-full bg-sand-200/90 [animation-delay:-8s]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[20%] rounded-full bg-white/50 blur-3xl"
      />

      {/* Left-weighted below lg so the metric card never covers a label. */}
      <div className="absolute inset-x-0 bottom-[17%] flex items-end justify-start pl-[9%] lg:justify-center lg:pl-0">
        {main && <Packshot product={main} className="w-[36%]" />}
        {side && <Packshot product={side} className="-ml-[4%] w-[21%]" />}
      </div>

      <Capsule className="bottom-[13%] left-[17%] w-[11%] -rotate-[24deg]" />
      <Capsule className="bottom-[9%] left-[29%] w-[9%] rotate-[12deg]" />
      <Capsule className="bottom-[11%] right-[20%] w-[10%] rotate-[34deg]" />

      <div className="absolute left-0 top-[9%] w-[64%] animate-float sm:w-auto sm:max-w-[290px] lg:-left-[6%]">
        <div className="flex items-start gap-3 rounded-2xl bg-white/85 p-3 pr-4 shadow-lift ring-1 ring-slate-900/5 backdrop-blur-md sm:p-4 sm:pr-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sage-600 text-white sm:size-10">
            <BellRing className="size-[18px]" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-500">
              {HERO.reminder.app} · {HERO.reminder.time}
            </p>
            <p className="mt-0.5 text-[13px] font-bold leading-tight text-slate-900 sm:text-sm">
              {HERO.reminder.title}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-slate-500 sm:text-xs">
              {HERO.reminder.body}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-[40%] animate-float-slow lg:-right-[4%]">
        <div className="rounded-2xl bg-white/85 p-3 shadow-lift ring-1 ring-slate-900/5 backdrop-blur-md sm:p-4">
          <div className="flex items-center justify-between gap-6">
            <p className="text-[11px] font-medium text-slate-500 sm:text-xs">{HERO.metric.label}</p>
            <TrendingUp className="size-4 text-sage-600" aria-hidden="true" />
          </div>
          <p className="mt-1 text-base font-bold tracking-[-0.02em] text-slate-900 sm:text-lg">
            {HERO.metric.value}
          </p>
          <svg viewBox="0 0 96 28" className="mt-1 h-6 w-20 sm:w-24" aria-hidden="true">
            <path
              d="M2 24 C 16 22, 22 18, 32 19 S 50 12, 60 12 S 80 5, 94 4"
              fill="none"
              stroke="var(--color-sage-500)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="94" cy="4" r="3" fill="var(--color-sage-600)" />
          </svg>
          <p className="mt-1 inline-flex rounded-full bg-sage-50 px-2 py-0.5 text-[10px] font-semibold text-sage-700 sm:text-[11px]">
            {HERO.metric.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function Capsule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute aspect-[2.4/1] rounded-full shadow-[0_6px_12px_-6px_rgb(30_41_59/0.45)]",
        className
      )}
      style={{
        background:
          "linear-gradient(180deg, rgb(255 255 255 / 0.45), transparent 45%), linear-gradient(90deg, var(--color-sage-600) 0 50%, #EFEBE3 50% 100%)",
      }}
    />
  );
}
