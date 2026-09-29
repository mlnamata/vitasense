import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import SectionHeading from "@/components/ui/SectionHeading";
import { MAGAZINE, SECTIONS } from "@/lib/content";

function MagazineLink({ className }: { className?: string }) {
  return (
    <Link
      href={MAGAZINE.href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-sage-700 transition-colors hover:text-sage-900",
        className
      )}
    >
      {MAGAZINE.link}
      <ArrowRight
        className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function Magazine() {
  return (
    <section id={SECTIONS.magazine} aria-labelledby="magazine-title" className="py-12 md:py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading id="magazine-title" eyebrow={MAGAZINE.eyebrow} title={MAGAZINE.title} />
          <MagazineLink className="hidden shrink-0 sm:inline-flex" />
        </div>

        <ul className="no-scrollbar relative -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {MAGAZINE.tips.map((tip) => (
            <li key={tip.tag} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <article
                className="flex h-full flex-col rounded-2xl p-6"
                style={{ backgroundColor: tip.tint }}
              >
                <span className="self-start rounded-full bg-white/75 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {tip.tag}
                </span>
                <p className="mt-5 text-pretty text-[17px] font-medium leading-relaxed text-slate-800">
                  {tip.text}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <MagazineLink className="mt-4 sm:hidden" />
      </Container>
    </section>
  );
}
