import "server-only";

import type { Customer, Order, OrderStatus, Product, Subscriber } from "@/lib/types";
import { products } from "./mock";
import { DEMO_TODAY, customers, orders, stock, subscribers } from "./orders";

/*
 * Orders, customers and subscribers. Same contract as the catalogue layer —
 * swap the bodies for Supabase queries (with row-level security) later.
 */

export async function getOrders(status?: OrderStatus): Promise<Order[]> {
  return status ? orders.filter((order) => order.status === status) : orders;
}

export async function getOrder(number: string): Promise<Order | null> {
  return orders.find((order) => order.number === number) ?? null;
}

export async function getCustomerOrders(email: string): Promise<Order[]> {
  return orders.filter((order) => order.customer.email === email);
}

export type CustomerSummary = Customer & {
  orderCount: number;
  spentCzk: number;
  lastOrderAt: string | null;
};

export async function getCustomers(): Promise<CustomerSummary[]> {
  return customers
    .map((customer) => {
      const own = orders.filter(
        (order) => order.customer.email === customer.email && order.status !== "zrusena"
      );
      return {
        ...customer,
        orderCount: own.length,
        spentCzk: own.reduce((sum, order) => sum + order.totalCzk, 0),
        lastOrderAt: own[0]?.createdAt ?? null,
      };
    })
    .sort((a, b) => b.spentCzk - a.spentCzk);
}

export async function getDemoCustomer(): Promise<Customer> {
  return customers[0];
}

export async function getSubscribers(): Promise<Subscriber[]> {
  return subscribers;
}

export async function getStock(): Promise<Record<string, number>> {
  return stock;
}

export type DashboardData = {
  revenueCzk: number;
  orderCount: number;
  averageCzk: number;
  newSubscribers: number;
  daily: { date: string; revenueCzk: number; orders: number }[];
  toProcess: Order[];
  lowStock: { product: Product; stock: number }[];
  topProducts: { product: Product; units: number }[];
};

/** Last 30 days, ending at the demo "today". */
export async function getDashboard(): Promise<DashboardData> {
  const end = new Date(DEMO_TODAY);
  const start = new Date(end.getTime() - 29 * 86_400_000);
  const startDay = start.toISOString().slice(0, 10);
  const valid = orders.filter(
    (order) => order.status !== "zrusena" && order.createdAt.slice(0, 10) >= startDay
  );

  const daily = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(start.getTime() + index * 86_400_000).toISOString().slice(0, 10);
    const dayOrders = valid.filter((order) => order.createdAt.slice(0, 10) === date);
    return {
      date,
      revenueCzk: dayOrders.reduce((sum, order) => sum + order.totalCzk, 0),
      orders: dayOrders.length,
    };
  });

  const units = new Map<string, number>();
  for (const order of valid) {
    for (const item of order.items) units.set(item.slug, (units.get(item.slug) ?? 0) + item.quantity);
  }

  const revenueCzk = valid.reduce((sum, order) => sum + order.totalCzk, 0);
  return {
    revenueCzk,
    orderCount: valid.length,
    averageCzk: valid.length ? Math.round(revenueCzk / valid.length) : 0,
    newSubscribers: subscribers.filter((item) => item.subscribedAt >= startDay).length,
    daily,
    toProcess: orders.filter((order) => order.status === "nova" || order.status === "zaplacena"),
    lowStock: products
      .map((product) => ({ product, stock: stock[product.slug] ?? 0 }))
      .filter((item) => item.stock < 15)
      .sort((a, b) => a.stock - b.stock),
    topProducts: products
      .map((product) => ({ product, units: units.get(product.slug) ?? 0 }))
      .sort((a, b) => b.units - a.units)
      .slice(0, 5),
  };
}
