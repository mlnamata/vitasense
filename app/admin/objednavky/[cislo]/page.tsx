import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
import Panel from "@/components/admin/Panel";
import PageHeader from "@/components/admin/PageHeader";
import ProductThumb from "@/components/product/ProductThumb";
import StatusBadge from "@/components/ui/StatusBadge";
import { PAYMENT_METHODS, SHIPPING_METHODS } from "@/lib/checkout";
import { getOrder } from "@/lib/data/orders-api";
import { getProductsBySlug } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

type Props = { params: Promise<{ cislo: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Objednávka ${(await params).cislo}` };
}

const dateTime = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Prague",
});

export default async function AdminOrderPage({ params }: Props) {
  const order = await getOrder((await params).cislo);
  if (!order) notFound();
  const products = await getProductsBySlug(order.items.map((item) => item.slug));
  const shipping = SHIPPING_METHODS.find((method) => method.id === order.shipping);
  const payment = PAYMENT_METHODS.find((method) => method.id === order.payment);
  const subtotal = order.items.reduce((sum, item) => sum + item.priceCzk * item.quantity, 0);

  return (
    <>
      <Link href="/admin/objednavky" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Objednávky
      </Link>
      <PageHeader
        title={order.number}
        description={dateTime.format(new Date(order.createdAt))}
        action={<StatusBadge status={order.status} className="text-sm" />}
      />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-4">
          <Panel title="Položky">
            <ul className="divide-y divide-slate-900/[0.06]">
              {order.items.map((item) => {
                const product = products.find((candidate) => candidate.slug === item.slug);
                return (
                  <li key={item.slug} className="flex items-center gap-3 py-3">
                    {product && <ProductThumb product={product} size={48} className="size-12" />}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        {item.quantity} × {formatPrice(item.priceCzk)}
                      </p>
                    </div>
                    <p className="font-semibold tabular-nums text-slate-900">
                      {formatPrice(item.priceCzk * item.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <dl className="mt-2 space-y-1.5 border-t border-slate-900/[0.06] pt-4 text-sm">
              <Row label="Mezisoučet" value={formatPrice(subtotal)} />
              <Row label={`Doprava — ${shipping?.label}`} value={order.shippingCzk ? formatPrice(order.shippingCzk) : "Zdarma"} />
              <Row label={`Platba — ${payment?.label}`} value={order.paymentCzk ? formatPrice(order.paymentCzk) : "Zdarma"} />
              <div className="flex justify-between pt-2 text-base">
                <dt className="font-bold text-slate-900">Celkem</dt>
                <dd className="font-extrabold tabular-nums text-slate-900">{formatPrice(order.totalCzk)}</dd>
              </div>
            </dl>
          </Panel>

          {order.note && (
            <Panel title="Poznámka zákazníka">
              <p className="text-slate-700">{order.note}</p>
            </Panel>
          )}
        </div>

        <div className="space-y-4">
          <Panel title="Změnit stav">
            <OrderStatusForm number={order.number} status={order.status} />
          </Panel>
          <Panel title="Zákazník">
            <p className="font-semibold text-slate-900">{order.customer.name}</p>
            <p className="mt-1 text-sm">
              <a href={`mailto:${order.customer.email}`} className="text-sage-700 hover:underline">
                {order.customer.email}
              </a>
            </p>
            <p className="text-sm text-slate-600">{order.customer.phone}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {order.customer.street}
              <br />
              {order.customer.zip} {order.customer.city}
            </p>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-600">{label}</dt>
      <dd className="tabular-nums text-slate-900">{value}</dd>
    </div>
  );
}
