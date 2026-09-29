import Link from "next/link";
import { Mail } from "lucide-react";
import NewsletterForm from "@/components/layout/NewsletterForm";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";
import { BRAND, FOOTER, NEWSLETTER, SECTIONS } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 bg-sand-100 pb-tabbar md:mt-16 md:pb-0">
      <Container className="py-14 md:py-20">
        <div
          id={SECTIONS.newsletter}
          className="grid gap-8 rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.04] sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-12"
        >
          <div>
            <span className="flex size-12 items-center justify-center rounded-xl bg-sage-50 text-sage-700 ring-1 ring-inset ring-sage-100">
              <Mail className="size-[22px]" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-balance text-2xl font-bold tracking-[-0.03em] text-slate-900 sm:text-3xl">
              {NEWSLETTER.title}
            </h2>
            <p className="mt-3 max-w-md text-pretty leading-relaxed text-slate-600">
              {NEWSLETTER.body}
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[1.3fr_2fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">{FOOTER.tagline}</p>
            <ul className="mt-6 flex gap-2">
              {FOOTER.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-900/[0.06] transition duration-300 ease-soft hover:bg-sage-600 hover:text-white hover:ring-sage-600"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Odkazy v patičce" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {FOOTER.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold text-slate-900">{column.title}</h3>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center text-[15px] text-slate-600 transition-colors hover:text-sage-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-900/[0.08] pt-8 text-xs leading-relaxed text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BRAND.company}. Všechna práva vyhrazena.
          </p>
          <p>{FOOTER.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
