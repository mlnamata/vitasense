import { computeTotals, type PaymentId, type ShippingId } from "@/lib/checkout";
import type { Customer, Order, OrderStatus, Subscriber } from "@/lib/types";
import { products } from "./mock";

/*
 * Demo orders, customers and subscribers for the account and admin pages.
 * Generated from the catalogue with a fixed seed, so every build shows the
 * same data. Replace with the `orders` / `profiles` tables.
 */

export const DEMO_TODAY = "2026-09-28T12:00:00.000Z";

export const customers: Customer[] = [
  { name: "Jana Nováková", email: "jana.novakova@example.cz", phone: "+420 777 201 334", street: "Údolní 12", city: "Brno", zip: "602 00" },
  { name: "Tomáš Horák", email: "tomas.horak@example.cz", phone: "+420 603 118 540", street: "Korunní 88", city: "Praha 2", zip: "120 00" },
  { name: "Petra Svobodová", email: "petra.s@example.cz", phone: "+420 736 902 117", street: "Nádražní 5", city: "Olomouc", zip: "779 00" },
  { name: "Martin Veselý", email: "martin.vesely@example.cz", phone: "+420 608 334 221", street: "Masarykova 41", city: "Plzeň", zip: "301 00" },
  { name: "Lucie Dvořáková", email: "lucie.d@example.cz", phone: "+420 724 556 870", street: "Lipová 3", city: "Liberec", zip: "460 01" },
  { name: "Ondřej Beneš", email: "ondrej.benes@example.cz", phone: "+420 775 410 992", street: "Palackého 17", city: "Ostrava", zip: "702 00" },
  { name: "Kateřina Marková", email: "katka.markova@example.cz", phone: "+420 732 118 004", street: "Husova 9", city: "České Budějovice", zip: "370 01" },
  { name: "Jakub Černý", email: "jakub.cerny@example.cz", phone: "+420 604 771 350", street: "Jiráskova 22", city: "Hradec Králové", zip: "500 03" },
];

/** Tiny deterministic PRNG (mulberry32). */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildOrders(): Order[] {
  const next = random(20260928);
  const pick = <T,>(items: readonly T[]) => items[Math.floor(next() * items.length)];
  const today = new Date(DEMO_TODAY).getTime();
  const orders: Order[] = [];

  for (let i = 0; i < 24; i++) {
    const daysAgo = Math.floor((i / 24) * 30 + next() * 1.2);
    const created = new Date(today - daysAgo * 86_400_000 - Math.floor(next() * 36_000_000));
    const customer = i % 5 === 0 ? customers[0] : pick(customers);

    const lineCount = 1 + Math.floor(next() * 3);
    const chosen = new Set<string>();
    while (chosen.size < lineCount) chosen.add(pick(products).slug);
    const items = [...chosen].map((slug) => {
      const product = products.find((item) => item.slug === slug)!;
      return {
        slug,
        name: product.name,
        quantity: next() > 0.75 ? 2 : 1,
        priceCzk: product.priceCzk,
      };
    });

    const shipping: ShippingId = next() > 0.4 ? "zasilkovna" : "ppl";
    const payment: PaymentId = pick(["karta", "karta", "karta", "prevod", "dobirka"] as const);
    const subtotal = items.reduce((sum, item) => sum + item.priceCzk * item.quantity, 0);
    const totals = computeTotals(subtotal, shipping, payment);

    let status: OrderStatus;
    if (daysAgo > 6) status = next() > 0.94 ? "zrusena" : "dorucena";
    else if (daysAgo > 2) status = "odeslana";
    else if (daysAgo > 0) status = payment === "prevod" ? "nova" : "zaplacena";
    else status = "nova";

    const date = created.toISOString().slice(2, 10).replaceAll("-", "");
    orders.push({
      number: `VS${date}${String(1000 + ((i * 7919) % 9000)).padStart(4, "0")}`,
      createdAt: created.toISOString(),
      customer,
      items,
      shipping,
      payment,
      shippingCzk: totals.shippingCzk,
      paymentCzk: totals.paymentCzk,
      totalCzk: totals.total,
      status,
      note: i === 3 ? "Prosím zazvonit u sousedů, zvonek nefunguje." : undefined,
    });
  }

  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const orders = buildOrders();

export const subscribers: Subscriber[] = [
  ...customers.map((customer, index): Subscriber => ({
    email: customer.email,
    subscribedAt: new Date(new Date(DEMO_TODAY).getTime() - (index * 9 + 3) * 86_400_000)
      .toISOString()
      .slice(0, 10),
    source: index % 2 ? "pokladna" : "web",
  })),
  ...([
    { email: "eva.kralova@example.cz", subscribedAt: "2026-09-26", source: "web" },
    { email: "adam.pokorny@example.cz", subscribedAt: "2026-09-21", source: "aplikace" },
    { email: "tereza.fialova@example.cz", subscribedAt: "2026-09-14", source: "web" },
    { email: "vojtech.ruzicka@example.cz", subscribedAt: "2026-09-02", source: "aplikace" },
  ] satisfies Subscriber[]),
].sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));

/** Units on hand per product. */
export const stock: Record<string, number> = {
  "magnesium-complex": 184,
  "b-komplex-active": 96,
  "vitamin-d3-k2": 12,
  "ashwagandha-ksm-66": 58,
  "omega-3-z-ras": 41,
  "probiotika-12-kmenu": 8,
  "klidna-noc": 73,
  "zelezo-vitamin-c": 64,
  "koenzym-q10-ubiquinol": 0,
  "zinek-selen": 120,
  "vitamin-c-500": 88,
  "rhodiola-focus": 35,
  "lions-mane": 27,
  "psyllium-vlaknina": 52,
};
