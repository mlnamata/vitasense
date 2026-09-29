import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/content/ContactForm";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Container from "@/components/ui/Container";
import { COMPANY, CONTACT_PAGE } from "@/lib/content";
import { LEGAL_DOCUMENTS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Kontakt",
  description: CONTACT_PAGE.subtitle,
};

export default function ContactPage() {
  const channels = [
    { icon: Mail, label: "E-mail", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: Phone, label: "Telefon", value: COMPANY.phone, href: null },
    { icon: Clock, label: "Kdy odpovídáme", value: COMPANY.hours, href: null },
  ];

  return (
    <section aria-labelledby="contact-title" className="pb-16 pt-6 md:pb-24 md:pt-10">
      <Container>
        <Breadcrumbs items={[{ label: "Domů", href: "/" }, { label: "Kontakt" }]} />
        <h1
          id="contact-title"
          className="mt-6 text-balance text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl"
        >
          {CONTACT_PAGE.title}
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">
          {CONTACT_PAGE.subtitle}
        </p>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.04] sm:p-8">
            <ContactForm />
          </div>

          <aside className="space-y-4">
            <ul className="space-y-3">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-900/[0.04]">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sage-50 text-sage-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">{label}</p>
                    {href ? (
                      <a href={href} className="font-semibold text-slate-900 hover:text-sage-700">
                        {value}
                      </a>
                    ) : (
                      <p className="font-semibold text-slate-900">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-sand-100 p-5 text-sm leading-relaxed text-slate-600">
              <p className="font-bold text-slate-900">{CONTACT_PAGE.company}</p>
              <p className="mt-2">
                {COMPANY.name}
                <br />
                {COMPANY.address}
                <br />
                IČO {COMPANY.ico}, DIČ {COMPANY.dic}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-900/[0.04]">
              <p className="text-sm font-bold text-slate-900">{CONTACT_PAGE.helpTitle}</p>
              <ul className="mt-2">
                {LEGAL_DOCUMENTS.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      href={`/${doc.slug}`}
                      className="group flex min-h-11 items-center justify-between text-[15px] text-slate-700 hover:text-sage-700"
                    >
                      {doc.title}
                      <ArrowRight
                        className="size-4 text-slate-400 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
