import { FREE_SHIPPING_CZK } from "@/lib/content";

/*
 * Delivery and payment options with their prices. Shared by the checkout
 * form (display) and the order action (the source of truth for totals).
 */

export const SHIPPING_METHODS = [
  {
    id: "zasilkovna",
    label: "Zásilkovna",
    description: "Výdejní místo nebo Z-BOX, obvykle do 2 pracovních dnů",
    priceCzk: 69,
  },
  {
    id: "ppl",
    label: "PPL na adresu",
    description: "Kurýr doručí obvykle následující pracovní den",
    priceCzk: 99,
  },
] as const;

export const PAYMENT_METHODS = [
  {
    id: "karta",
    label: "Kartou online",
    description: "Visa, Mastercard, Apple Pay a Google Pay",
    feeCzk: 0,
  },
  {
    id: "prevod",
    label: "Bankovním převodem",
    description: "QR platba, odesíláme po připsání peněz",
    feeCzk: 0,
  },
  {
    id: "dobirka",
    label: "Na dobírku",
    description: "Zaplatíte při převzetí zásilky",
    feeCzk: 39,
  },
] as const;

export type ShippingId = (typeof SHIPPING_METHODS)[number]["id"];
export type PaymentId = (typeof PAYMENT_METHODS)[number]["id"];

export const isShippingId = (value: string): value is ShippingId =>
  SHIPPING_METHODS.some((method) => method.id === value);

export const isPaymentId = (value: string): value is PaymentId =>
  PAYMENT_METHODS.some((method) => method.id === value);

export function shippingPrice(id: ShippingId, subtotal: number) {
  if (subtotal >= FREE_SHIPPING_CZK) return 0;
  return SHIPPING_METHODS.find((method) => method.id === id)?.priceCzk ?? 0;
}

export function computeTotals(subtotal: number, shipping: ShippingId, payment: PaymentId) {
  const shippingCzk = shippingPrice(shipping, subtotal);
  const paymentCzk = PAYMENT_METHODS.find((method) => method.id === payment)?.feeCzk ?? 0;
  return { subtotal, shippingCzk, paymentCzk, total: subtotal + shippingCzk + paymentCzk };
}
