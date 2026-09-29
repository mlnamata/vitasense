import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { MAGAZINE, SHOP_PATH } from "@/lib/content";
import { getArticle, getArticles } from "@/lib/data/content";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const others = (await getArticles()).filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <article aria-labelledby="article-title" className="pb-16 pt-6 md:pb-24 md:pt-10">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Domů", href: "/" },
            { label: "Magazín", href: MAGAZINE.href },
            { label: article.title },
          ]}
        />

        <header
          className="mt-6 rounded-3xl px-6 py-10 sm:px-12 sm:py-14"
          style={{ backgroundColor: article.tint }}
        >
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-white/75 px-3 py-1 font-semibold text-slate-700">{article.tag}</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>
              {article.readingMinutes} {MAGAZINE.minutes}
            </span>
          </div>
          <h1
            id="article-title"
            className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-5xl"
          >
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-700">{article.excerpt}</p>
        </header>

        <div className="mx-auto mt-10 max-w-2xl">
          <aside className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-900/[0.04]">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-sage-600" aria-hidden="true" />
            <p className="text-[15px] font-medium leading-relaxed text-slate-800">{article.tip}</p>
          </aside>

          <div className="mt-10 space-y-9">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-900">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-pretty text-[17px] leading-[1.75] text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-2xl bg-sand-100 px-5 py-4 text-sm leading-relaxed text-slate-600">
            Článek má informativní charakter a nenahrazuje konzultaci s lékařem. Doplněk stravy není
            náhradou pestré a vyvážené stravy.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={SHOP_PATH} className={buttonClass()}>
              Prozkoumat doplňky
            </Link>
            <Link href={MAGAZINE.href} className={buttonClass({ variant: "secondary" })}>
              Všechny články
            </Link>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900">Další čtení</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${MAGAZINE.href}/${item.slug}`}
                    className="group flex h-full flex-col rounded-2xl p-6 transition duration-500 ease-soft hover:-translate-y-1"
                    style={{ backgroundColor: item.tint }}
                  >
                    <span className="text-xs font-semibold text-slate-600">{item.tag}</span>
                    <span className="mt-2 text-lg font-bold leading-snug text-slate-900">{item.title}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                      {MAGAZINE.readMore}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </article>
  );
}
