"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  MessageSquareText,
  Package,
  Receipt,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn, isActivePath } from "@/lib/cn";

export const ADMIN_NAV: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Přehled", href: "/admin", icon: LayoutDashboard },
  { label: "Objednávky", href: "/admin/objednavky", icon: Receipt },
  { label: "Produkty", href: "/admin/produkty", icon: Package },
  { label: "Zákazníci", href: "/admin/zakaznici", icon: Users },
  { label: "Recenze", href: "/admin/recenze", icon: MessageSquareText },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
];

/** Vertical in the sidebar, a swipeable pill row on phones. */
export default function AdminNav({ variant }: { variant: "sidebar" | "bar" }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Administrace">
      <ul
        className={cn(
          variant === "sidebar"
            ? "space-y-1"
            : "no-scrollbar relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
        )}
      >
        {ADMIN_NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : isActivePath(pathname, href);
          return (
            <li key={href} className={variant === "bar" ? "shrink-0" : undefined}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl text-[15px] font-semibold transition-colors",
                  variant === "sidebar" ? "h-11 px-3" : "h-10 px-3.5 text-sm",
                  active
                    ? "bg-sage-100 text-sage-900"
                    : variant === "sidebar"
                      ? "text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900"
                      : "bg-white text-slate-600 ring-1 ring-inset ring-slate-900/[0.08]"
                )}
              >
                <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
