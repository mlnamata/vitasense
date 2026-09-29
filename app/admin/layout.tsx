import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: { default: "Administrace", template: "%s | Administrace VitaSense" },
  robots: { index: false, follow: false },
};

function AdminLogo() {
  return (
    <Link href="/admin" className="inline-flex items-baseline gap-2 text-xl font-extrabold tracking-[-0.03em] text-slate-900">
      <span>
        Vita<span className="text-sage-600">Sense</span>
      </span>
      <span className="rounded-md bg-ink-900 px-1.5 py-0.5 text-[11px] font-bold tracking-normal text-white">
        Admin
      </span>
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-sand-50 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="hidden border-r border-slate-900/[0.06] bg-white lg:flex lg:h-dvh lg:flex-col lg:sticky lg:top-0">
        <div className="px-6 pb-6 pt-7">
          <AdminLogo />
        </div>
        <div className="flex-1 px-3">
          <AdminNav variant="sidebar" />
        </div>
        <div className="border-t border-slate-900/[0.06] p-3">
          <Link
            href="/"
            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900"
          >
            <ExternalLink className="size-[18px]" aria-hidden="true" />
            Zobrazit e-shop
          </Link>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-slate-900/[0.06] bg-white/85 px-4 pb-3 pt-4 backdrop-blur-xl lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <AdminLogo />
            <Link href="/" className="text-sm font-semibold text-sage-700">
              E-shop
            </Link>
          </div>
          <AdminNav variant="bar" />
        </header>

        <main className="px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-8">
          <p className="mb-6 flex items-start gap-2.5 rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Demo režim — data jsou ukázková a změny se neukládají, dokud nepřipojíte databázi.
          </p>
          {children}
        </main>
      </div>
    </div>
  );
}
