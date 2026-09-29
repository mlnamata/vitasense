import Link from "next/link";
import { ArrowRight, Pill, Smartphone, TestTubeDiagonal } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ECOSYSTEM, SECTIONS } from "@/lib/content";

const ICONS = {
  test: TestTubeDiagonal,
  capsule: Pill,
  phone: Smartphone,
} as const;

export default function Ecosystem() {
  return (
    <section
      id={SECTIONS.ecosystem}
      aria-labelledby="ecosystem-title"
      className="px-3 py-6 sm:px-5 md:py-10"
    >
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-ink-900 text-white sm:rounded-[2.5rem]">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-sage-500/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-ink-700/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
          style={{
            backgroundImage: "radial-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <Container className="relative py-16 md:py-24">
          <SectionHeading
            id="ecosystem-title"
            tone="dark"
            eyebrow={ECOSYSTEM.eyebrow}
            title={ECOSYSTEM.title}
            subtitle={ECOSYSTEM.subtitle}
          />

          <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
            {ECOSYSTEM.steps.map((step, index) => {
              const Icon = ICONS[step.icon];
              const isLast = index === ECOSYSTEM.steps.length - 1;

              return (
                <li
                  key={step.title}
                  className="relative rounded-2xl bg-white/[0.04] p-6 ring-1 ring-inset ring-white/10 backdrop-blur-sm sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-sage-400/15 text-sage-200 ring-1 ring-inset ring-sage-300/20">
                      <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-white/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-bold tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-300">{step.body}</p>

                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-[26px] top-1/2 z-10 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full bg-ink-800 text-sage-200 ring-1 ring-white/15 md:flex"
                    >
                      <ArrowRight className="size-3.5" />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-pretty leading-relaxed text-slate-300">{ECOSYSTEM.note}</p>
            <Link
              href={`/#${SECTIONS.newsletter}`}
              className={buttonClass({ className: "group w-full shrink-0 sm:w-auto" })}
            >
              {ECOSYSTEM.cta}
              <ArrowRight
                className="size-5 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
