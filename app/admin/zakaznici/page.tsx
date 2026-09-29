import type { Metadata } from "next";
import Panel from "@/components/admin/Panel";
import PageHeader from "@/components/admin/PageHeader";
import { getCustomers } from "@/lib/data/orders-api";
import { formatDate, formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Zákazníci" };

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <>
      <PageHeader title="Zákazníci" description="Seřazeno podle útraty" />
      <Panel className="p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-slate-900/[0.06] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Zákazník</th>
                <th scope="col" className="px-5 py-3 font-semibold">Město</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Objednávky</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Útrata</th>
                <th scope="col" className="px-5 py-3 font-semibold">Poslední objednávka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/[0.06]">
              {customers.map((customer) => (
                <tr key={customer.email} className="hover:bg-sand-50">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-slate-900">{customer.name}</p>
                    <a href={`mailto:${customer.email}`} className="text-xs text-sage-700 hover:underline">
                      {customer.email}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{customer.city}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-slate-700">{customer.orderCount}</td>
                  <td className="px-5 py-3 text-right font-semibold tabular-nums text-slate-900">
                    {formatPrice(customer.spentCzk)}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {customer.lastOrderAt ? formatDate(customer.lastOrderAt) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
