import Link from "next/link";
import NewsletterForm from "@/components/layout/NewsletterForm";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";
import { BRAND, FOOTER, NEWSLETTER, SECTIONS, SHOP_PATH } from "@/lib/content";
import { getCategories } from "@/lib/data/products";

const linkClass =
  "inline-flex min-h-10 items-center text-[15px] text-slate-400 transition-colors hover:text-white";

export default async function Footer() {
  const categories = await getCategories();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: FOOTER.goalsTitle,
      links: categories.map((category) => ({
        label: category.label,
        href: `${SHOP_PATH}/${category.id}`,
      })),
    },
    ...FOOTER.columns,
  ];

  return (
    <footer className="relative overflow-hidden bg-ink-950 pb-tabbar text-slate-300 md:pb-0">
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 size-[30rem] rounded-full bg-sage-500/15 blur-3xl"
      />

      <Container className="relative py-14 md:py-20">
        <div
          id={SECTIONS.newsletter}
          className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16"
        >
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
              {NEWSLETTER.title}
            </h2>
            <p className="mt-3 max-w-md text-pretty leading-relaxed text-slate-400">
              {NEWSLETTER.body}
            </p>
          </div>
          <NewsletterForm tone="dark" />
        </div>

        <div className="mt-14 grid gap-12 border-t border-white/10 pt-12 md:mt-16 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">{FOOTER.tagline}</p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-6 inline-flex text-lg font-semibold text-white underline decoration-sage-400/50 underline-offset-[6px] transition-colors hover:decoration-sage-300"
            >
              {BRAND.email}
            </a>
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
                      className="inline-flex size-11 items-center justify-center rounded-full bg-white/[0.06] text-white ring-1 ring-inset ring-white/10 transition duration-300 ease-soft hover:bg-sage-600 hover:ring-sage-600"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav
            aria-label="Odkazy v patičce"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs leading-relaxed text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BRAND.company}. Všechna práva vyhrazena.
          </p>
          <p>{FOOTER.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
