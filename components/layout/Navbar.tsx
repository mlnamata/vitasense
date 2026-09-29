"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn, isActivePath } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/content";

const SECTION_IDS = NAV_LINKS.flatMap((link) => (link.section ? [link.section] : []));

const iconButton =
  "relative inline-flex size-11 items-center justify-center rounded-full text-slate-700 transition duration-300 ease-soft hover:bg-white hover:text-slate-900 active:scale-95";

export default function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS, pathname === "/");
  const { count, open } = useCart();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-cream/75 backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow] duration-300",
        scrolled
          ? "border-slate-900/[0.06] shadow-[0_8px_24px_-18px_rgb(30_41_59/0.35)]"
          : "border-transparent"
      )}
    >
      <Container className="grid h-16 grid-cols-[1fr_auto] items-center md:h-[72px] md:grid-cols-[1fr_auto_1fr]">
        <Logo className="justify-self-start" />

        <nav aria-label="Hlavní navigace" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.section
                ? active === link.section
                : isActivePath(pathname, link.href);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? (link.section ? "location" : "page") : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center rounded-full px-4 text-[15px] font-medium transition-colors duration-300",
                      isActive
                        ? "text-slate-900"
                        : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-sage-600 transition duration-300 ease-soft",
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 justify-self-end">
          {/* On phones the account lives in the bottom tab bar. */}
          <Link
            href="/prihlaseni"
            aria-label="Můj účet"
            className={cn(iconButton, "hidden md:inline-flex")}
          >
            <UserRound className="size-[22px]" strokeWidth={1.8} />
          </Link>

          <button
            type="button"
            onClick={open}
            aria-label={count > 0 ? `Košík, ${count} ks` : "Košík je prázdný"}
            className={iconButton}
          >
            <ShoppingBag className="size-[22px]" strokeWidth={1.8} />
            {count > 0 && (
              <span
                key={count}
                aria-hidden="true"
                className="absolute right-0.5 top-0.5 flex h-5 min-w-5 animate-bump items-center justify-center rounded-full bg-sage-600 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-cream"
              >
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        </div>
      </Container>
    </header>
  );
}
