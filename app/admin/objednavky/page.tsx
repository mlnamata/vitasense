import type { Metadata } from "next";
import Link from "next/link";
import Panel from "@/components/admin/Panel";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { PAYMENT_METHODS, SHIPPING_METHODS } from "@/lib/checkout";
import { cn } from "@/lib/cn";
import { ORDER_STATUS_LABELS } from "@/lib/content";
import { getOrders } from "@/lib/data/orders-api";
import { formatDate, formatPrice } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Objednávky" };

type Props = { searchParams: Promise<{ stav?: string }> };

const STATUSES = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[];
const label = (list: readonly { id: string; label: string }[], id: string) =>
  list.find((item) => item.id === id)?.label ?? id;

export default async function AdminOrdersPage({ searchParams }: Props) {
  const { stav } = await searchParams;
  const status = STATUSES.find((item) => item === stav);
  const [orders, all] = await Promise.all([getOrders(status), getOrders()]);

  const filters = [
    { key: undefined, label: "Vše", count: all.length },
    ...STATUSES.map((key) => ({
      key,
      label: ORDER_STATUS_LABELS[key],
      count: all.filter((order) => order.status === key).length,
    })),
  ];

  return (
    <>
      <PageHeader title="Objednávky" description={`${orders.length} z ${all.length}`} />

      <nav aria-label="Filtr stavu" className="no-scrollbar relative -mx-4 mb-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2">
          {filters.map((filter) => {
            const active = filter.key === status;
            return (
              <li key={filter.label}>
                <Link
                  href={filter.key ? `/admin/objednavky?stav=${filter.key}` : "/admin/objednavky"}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
                    active ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-inset ring-slate-900/[0.08] hover:ring-slate-900/20"
                  )}
                >
                  {filter.label}
                  <span className={cn("tabular-nums", active ? "text-white/70" : "text-slate-400")}>{filter.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Panel className="p-0 sm:p-0">
        {/* Cards on phones, a table from md up. */}
        <ul className="divide-y divide-slate-900/[0.06] md:hidden">
          {orders.map((order) => (
            <li key={order.number}>
              <Link href={`/admin/objednavky/${order.number}`} className="block px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-900">{order.number}</span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="mt-1 flex items-center justify-between gap-3 text-sm text-slate-500">
                  <span className="truncate">
                    {order.customer.name} · {formatDate(order.createdAt)}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-slate-900">{formatPrice(order.totalCzk)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-900/[0.06] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {["Číslo", "Datum", "Zákazník", "Položky", "Doprava a platba", "Částka", "Stav"].map((heading, index) => (
                  <th key={heading} scope="col" className={cn("px-5 py-3 font-semibold", index === 5 && "text-right")}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/[0.06]">
              {orders.map((order) => (
                <tr key={order.number} className="transition-colors hover:bg-sand-50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/objednavky/${order.number}`} className="font-semibold text-slate-900 hover:text-sage-700">
                      {order.number}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-600">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-900">{order.customer.name}</p>
                    <p className="text-xs text-slate-500">{order.customer.city}</p>
                  </td>
                  <td className="px-5 py-3 tabular-nums text-slate-600">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} ks
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {label(SHIPPING_METHODS, order.shipping)}
                    <span className="block text-xs text-slate-500">{label(PAYMENT_METHODS, order.payment)}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-semibold tabular-nums text-slate-900">
                    {formatPrice(order.totalCzk)}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && <p className="px-5 py-10 text-center text-slate-500">V tomto stavu nic není.</p>}
      </Panel>
    </>
  );
}
