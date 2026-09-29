import { FlaskConical, Leaf, Recycle, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SECTIONS, VISION } from "@/lib/content";

const ICONS = {
  leaf: Leaf,
  flask: FlaskConical,
  shield: ShieldCheck,
  recycle: Recycle,
} as const;

export default function Vision() {
  return (
    <section id={SECTIONS.vision} aria-labelledby="vision-title" className="py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="vision-title" eyebrow={VISION.eyebrow} title={VISION.title} />
          {VISION.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {VISION.values.map((value) => {
            const Icon = ICONS[value.icon];
            return (
              <li
                key={value.title}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-900/[0.04] sm:p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-sage-50 text-sage-700 ring-1 ring-inset ring-sage-100">
                  <Icon className="size-[22px]" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-bold tracking-[-0.02em] text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">{value.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
