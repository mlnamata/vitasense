import Link from "next/link";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Container from "@/components/ui/Container";
import { formatDate } from "@/lib/format";
import { LEGAL_DOCUMENTS, type LegalDocument } from "@/lib/legal";

export default function LegalPage({ doc }: { doc: LegalDocument }) {
  const others = LEGAL_DOCUMENTS.filter((item) => item.slug !== doc.slug);

  return (
    <section aria-labelledby="legal-title" className="pb-16 pt-6 md:pb-24 md:pt-10">
      <Container>
        <Breadcrumbs items={[{ label: "Domů", href: "/" }, { label: doc.title }]} />

        <div className="mt-6 grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="text-sm font-bold text-slate-900">Na této stránce</p>
            <ol className="mt-3 space-y-1 border-l border-slate-900/10">
              {doc.sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#cast-${index + 1}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-slate-600 transition-colors hover:border-sage-600 hover:text-slate-900"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="max-w-3xl">
            <h1
              id="legal-title"
              className="text-balance text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl"
            >
              {doc.title}
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Aktualizováno <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
            </p>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-slate-700">{doc.intro}</p>

            <div className="mt-10 space-y-10">
              {doc.sections.map((section, index) => (
                <section key={section.heading} id={`cast-${index + 1}`}>
                  <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
                    <span className="mr-2 text-sage-600">{index + 1}.</span>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-700 sm:text-base">
                    {section.body.map((block, blockIndex) =>
                      typeof block === "string" ? (
                        <p key={blockIndex}>{block}</p>
                      ) : (
                        <ul key={blockIndex} className="space-y-2">
                          {block.list.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-sage-500"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </div>
                </section>
              ))}
            </div>

            <nav
              aria-label="Další dokumenty"
              className="mt-14 border-t border-slate-900/[0.08] pt-8"
            >
              <p className="text-sm font-bold text-slate-900">Mohlo by vás zajímat</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className="inline-flex h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-900/[0.08] transition hover:ring-slate-900/20"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </article>
        </div>
      </Container>
    </section>
  );
}
