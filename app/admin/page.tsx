import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import Panel from "@/components/admin/Panel";
import PageHeader from "@/components/admin/PageHeader";
import RevenueChart from "@/components/admin/RevenueChart";
import ProductThumb from "@/components/product/ProductThumb";
import StatusBadge from "@/components/ui/StatusBadge";
import { getDashboard } from "@/lib/data/orders-api";
import { formatCount, formatDate, formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Přehled" };

export default async function AdminDashboard() {
  const data = await getDashboard();

  return (
    <>
      <PageHeader title="Přehled" description="Posledních 30 dní" />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Panel>
          <p className="text-sm font-semibold text-slate-500">Tržby</p>
          <p className="mt-1 text-5xl font-extrabold tracking-[-0.04em] text-slate-900">
            {formatPrice(data.revenueCzk)}
          </p>
          <p className="mt-1 text-sm text-slate-500">bez zrušených objednávek, včetně DPH a dopravy</p>
        </Panel>
        <div className="grid grid-cols-3 gap-4">
          <Metric label="Objednávky" value={formatCount(data.orderCount)} />
          <Metric label="Průměrná objednávka" value={formatPrice(data.averageCzk)} />
          <Metric label="Noví odběratelé" value={formatCount(data.newSubscribers)} />
        </div>
      </div>

      <Panel title="Denní tržby" className="mt-4">
        <RevenueChart days={data.daily} />
      </Panel>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 xl:grid-cols-3">
        <Panel
          title="K vyřízení"
          className="xl:col-span-2"
          action={
            <Link href="/admin/objednavky" className="inline-flex items-center gap-1 text-sm font-semibold text-sage-700">
              Všechny objednávky
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        >
          {data.toProcess.length === 0 ? (
            <p className="text-slate-500">Vše vyřízeno.</p>
          ) : (
            <ul className="divide-y divide-slate-900/[0.06]">
              {data.toProcess.map((order) => (
                <li key={order.number}>
                  <Link
                    href={`/admin/objednavky/${order.number}`}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 hover:text-sage-800"
                  >
                    <span className="min-w-0">
                      <span className="font-semibold text-slate-900">{order.number}</span>
                      <span className="ml-2 text-sm text-slate-500">
                        {order.customer.name} · {formatDate(order.createdAt)}
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <span className="font-semibold tabular-nums text-slate-900">{formatPrice(order.totalCzk)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <div className="space-y-4">
          <Panel title="Dochází skladem">
            {data.lowStock.length === 0 ? (
              <p className="text-slate-500">Všeho je dost.</p>
            ) : (
              <ul className="space-y-3">
                {data.lowStock.map(({ product, stock }) => (
                  <li key={product.id}>
                    <Link href={`/admin/produkty/${product.slug}`} className="flex items-center gap-3">
                      <ProductThumb product={product} size={40} className="size-10" />
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">
                        {product.name}
                      </span>
                      <span
                        className={
                          stock === 0
                            ? "inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-200"
                            : "rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-200"
                        }
                      >
                        {stock === 0 && <AlertTriangle className="size-3" aria-hidden="true" />}
                        {stock === 0 ? "Vyprodáno" : `${stock} ks`}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Nejprodávanější">
            <ol className="space-y-3">
              {data.topProducts.map(({ product, units }, index) => (
                <li key={product.id} className="flex items-center gap-3 text-sm">
                  <span className="w-4 text-right font-semibold text-slate-400">{index + 1}</span>
                  <span className="min-w-0 flex-1 truncate font-semibold text-slate-900">{product.name}</span>
                  <span className="tabular-nums text-slate-600">{units} ks</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-4 ring-1 ring-slate-900/[0.06]">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">{value}</p>
    </div>
  );
}
