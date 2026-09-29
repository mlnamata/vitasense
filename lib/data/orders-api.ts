import "server-only";

import type { Customer, Order, OrderStatus, Subscriber } from "@/lib/types";
import { customers, orders, stock, subscribers } from "./orders";

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
