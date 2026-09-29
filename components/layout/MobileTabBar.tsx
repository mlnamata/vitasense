"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Smartphone, Sprout, Store, UserRound } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn, isActivePath } from "@/lib/cn";
import { SECTIONS, SHOP_PATH } from "@/lib/content";

const TABS = [
  { label: "Domů", href: `/#${SECTIONS.home}`, section: SECTIONS.home, icon: House },
  { label: "Obchod", href: SHOP_PATH, section: null, icon: Store },
  { label: "Vize", href: `/#${SECTIONS.vision}`, section: SECTIONS.vision, icon: Sprout },
  { label: "Ekosystém", href: `/#${SECTIONS.ecosystem}`, section: SECTIONS.ecosystem, icon: Smartphone },
  { label: "Účet", href: "/prihlaseni", section: null, icon: UserRound },
] as const;

const SECTION_IDS = TABS.flatMap((tab) => (tab.section ? [tab.section] : []));

/** App-style bottom navigation, phones only. */
export default function MobileTabBar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(SECTION_IDS, onHome);

  return (
    <nav
      aria-label="Mobilní navigace"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-900/[0.06] bg-cream/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 md:hidden"
    >
      <ul className="mx-auto grid h-[4.5rem] max-w-md grid-cols-5 px-2">
        {TABS.map(({ label, href, section, icon: Icon }) => {
          const isActive = section
            ? onHome && (active ?? SECTIONS.home) === section
            : isActivePath(pathname, href);

          return (
            <li key={label} className="flex">
              <Link
                href={href}
                aria-current={isActive ? (section ? "location" : "page") : undefined}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors duration-300 active:scale-95",
                  isActive ? "text-sage-800" : "text-slate-500"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-300 ease-soft",
                    isActive ? "bg-sage-100" : "bg-transparent"
                  )}
                >
                  <Icon className="size-[22px]" strokeWidth={isActive ? 2.1 : 1.7} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
