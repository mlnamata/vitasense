import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Info, LogOut, MapPin, Package, Repeat } from "lucide-react";
import ProductThumb from "@/components/product/ProductThumb";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import StatusBadge from "@/components/ui/StatusBadge";
import { ACCOUNT, SUBSCRIPTION_DISCOUNT, productPath } from "@/lib/content";
import { DEMO_TODAY } from "@/lib/data/orders";
import { getCustomerOrders, getDemoCustomer } from "@/lib/data/orders-api";
import { getProductsBySlug } from "@/lib/data/products";
import { formatDate, formatPrice, plural } from "@/lib/format";

export const metadata: Metadata = {
  title: ACCOUNT.title,
  robots: { index: false },
};

export default async function AccountPage() {
  // Demo: once Supabase auth is in place, read the signed-in user here.
  const customer = await getDemoCustomer();
  const [orders, subscription] = await Promise.all([
    getCustomerOrders(customer.email),
    getProductsBySlug(["magnesium-complex", "vitamin-d3-k2"]),
  ]);
  const subscriptionTotal = Math.round(
    subscription.reduce((sum, product) => sum + product.priceCzk, 0) * (1 - SUBSCRIPTION_DISCOUNT)
  );
  const nextDelivery = new Date(new Date(DEMO_TODAY).getTime() + 6 * 86_400_000).toISOString();

  return (
    <section aria-labelledby="account-title" className="pb-16 pt-8 md:pb-24 md:pt-12">
      <Container>
        <p className="flex items-start gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {ACCOUNT.demo}
        </p>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-slate-500">{ACCOUNT.greeting},</p>
            <h1 id="account-title" className="text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl">
              {customer.name.split(" ")[0]}
            </h1>
          </div>
          <Link href="/prihlaseni" className={buttonClass({ variant: "secondary", size: "md" })}>
            <LogOut className="size-4" aria-hidden="true" />
            {ACCOUNT.logout}
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-900/[0.04] sm:p-7">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-[-0.02em] text-slate-900">
              <Package className="size-5 text-sage-600" aria-hidden="true" />
              {ACCOUNT.orders}
            </h2>
            <ul className="mt-4 divide-y divide-slate-900/[0.06]">
              {orders.map((order) => (
                <li key={order.number} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">{order.number}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatDate(order.createdAt)} ·{" "}
                      {plural(
                        order.items.reduce((sum, item) => sum + item.quantity, 0),
                        { one: "položka", few: "položky", other: "položek" }
                      )}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-600">
                      {order.items.map((item) => item.name).join(", ")}
                    </p>
                  </div>
                  <p className="shrink-0 text-lg font-bold text-slate-900">{formatPrice(order.totalCzk)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-sage-100 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-[-0.02em] text-slate-900">
                <Repeat className="size-5 text-sage-700" aria-hidden="true" />
                {ACCOUNT.subscription}
              </h2>
              <ul className="mt-4 space-y-3">
                {subscription.map((product) => (
                  <li key={product.id}>
                    <Link href={productPath(product.slug)} className="flex items-center gap-3">
                      <ProductThumb product={product} size={48} className="size-12" />
                      <span className="text-sm font-semibold text-slate-900">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 border-t border-sage-200 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-600">
                    <CalendarClock className="size-4" aria-hidden="true" />
                    {ACCOUNT.nextDelivery}
                  </dt>
                  <dd className="font-semibold text-slate-900">{formatDate(nextDelivery)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">{ACCOUNT.interval}</dt>
                  <dd className="font-semibold text-slate-900">30 dní</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Cena zásilky</dt>
                  <dd className="font-semibold text-slate-900">{formatPrice(subscriptionTotal)}</dd>
                </div>
              </dl>
              <Link href="/predplatne" className={buttonClass({ variant: "secondary", size: "md", className: "mt-5 w-full bg-white" })}>
                {ACCOUNT.manage}
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-900/[0.04] sm:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-[-0.02em] text-slate-900">
                <MapPin className="size-5 text-sage-600" aria-hidden="true" />
                {ACCOUNT.details}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {customer.name}
                <br />
                {customer.street}
                <br />
                {customer.zip} {customer.city}
                <br />
                {customer.email}
                <br />
                {customer.phone}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
