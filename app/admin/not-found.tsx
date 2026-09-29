import Link from "next/link";
import { buttonClass } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-900/[0.06]">
      <h1 className="text-2xl font-bold text-slate-900">Záznam nenalezen</h1>
      <p className="mt-2 text-slate-500">Objednávka nebo produkt s tímto označením neexistuje.</p>
      <Link href="/admin" className={buttonClass({ size: "md", className: "mt-6" })}>
        Zpět na přehled
      </Link>
    </div>
  );
}
