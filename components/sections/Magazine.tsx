import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { MAGAZINE, SECTIONS } from "@/lib/content";
import { getArticles } from "@/lib/data/content";

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

export default async function Magazine() {
  const articles = await getArticles();

  return (
    <section id={SECTIONS.magazine} aria-labelledby="magazine-title" className="py-12 md:py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading id="magazine-title" eyebrow={MAGAZINE.eyebrow} title={MAGAZINE.title} />
          <MagazineLink className="hidden shrink-0 sm:inline-flex" />
        </div>

        <ul className="no-scrollbar relative -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {articles.slice(0, 4).map((article) => (
            <li key={article.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <article
                className="group relative flex h-full flex-col rounded-2xl p-6 transition duration-500 ease-soft hover:-translate-y-1"
                style={{ backgroundColor: article.tint }}
              >
                <span className="self-start rounded-full bg-white/75 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {article.tag}
                </span>
                <p className="mt-5 flex-1 text-pretty text-[17px] font-medium leading-relaxed text-slate-800">
                  {article.tip}
                </p>
                <Link
                  href={`${MAGAZINE.href}/${article.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                >
                  {MAGAZINE.readMore}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">: {article.title}</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <MagazineLink className="mt-4 sm:hidden" />
      </Container>
    </section>
  );
}
