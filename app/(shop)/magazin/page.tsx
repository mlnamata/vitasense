import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Container from "@/components/ui/Container";
import { MAGAZINE } from "@/lib/content";
import { getArticles } from "@/lib/data/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Magazín",
  description: MAGAZINE.intro,
};

export default async function MagazinePage() {
  const articles = await getArticles();

  return (
    <section aria-labelledby="magazine-page-title" className="pb-16 pt-6 md:pb-24 md:pt-10">
      <Container>
        <Breadcrumbs items={[{ label: "Domů", href: "/" }, { label: "Magazín" }]} />
        <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-sage-700">
          {MAGAZINE.eyebrow}
        </p>
        <h1
          id="magazine-page-title"
          className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl"
        >
          {MAGAZINE.title}
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">{MAGAZINE.intro}</p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {articles.map((article) => (
            <li key={article.slug}>
              <article
                className="group relative flex h-full flex-col rounded-3xl p-7 transition duration-500 ease-soft hover:-translate-y-1 sm:p-8"
                style={{ backgroundColor: article.tint }}
              >
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="rounded-full bg-white/75 px-2.5 py-1 font-semibold text-slate-700">
                    {article.tag}
                  </span>
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>
                    {article.readingMinutes} {MAGAZINE.minutes}
                  </span>
                </div>
                <h2 className="mt-5 text-balance text-2xl font-bold tracking-[-0.02em] text-slate-900">
                  <Link
                    href={`${MAGAZINE.href}/${article.slug}`}
                    className="after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-pretty leading-relaxed text-slate-700">{article.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                  {MAGAZINE.readMore}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
