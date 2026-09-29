"use server";

import { redirect } from "next/navigation";
import { computeTotals, isPaymentId, isShippingId } from "@/lib/checkout";
import { getProductsBySlug } from "@/lib/data/products";
import type { FormState } from "@/lib/types";
import { isEmail, normalizeEmail } from "@/lib/validation";

const FIELDS = [
  "email",
  "phone",
  "name",
  "street",
  "city",
  "zip",
  "note",
  "shipping",
  "payment",
  "terms",
  "newsletter",
] as const;

type Item = { slug: string; quantity: number };

function parseItems(raw: FormDataEntryValue | null): Item[] {
  try {
    const parsed: unknown = JSON.parse(String(raw ?? "[]"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is Item =>
          typeof item?.slug === "string" &&
          Number.isInteger(item?.quantity) &&
          item.quantity > 0 &&
          item.quantity <= 20
      )
      .slice(0, 50);
  } catch {
    return [];
  }
}

function orderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replaceAll("-", "");
  return `VS${date}${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * Validates the checkout, prices it from the catalogue (never from the
 * browser) and creates the order.
 */
export async function placeOrder(_previous: FormState, formData: FormData): Promise<FormState> {
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "").trim()])
  ) as Record<(typeof FIELDS)[number], string>;
  values.email = normalizeEmail(values.email);

  const errors: Record<string, string> = {};
  if (!isEmail(values.email)) errors.email = "Zadejte platný e-mail.";
  if (values.phone.replace(/[\s+]/g, "").length < 9) errors.phone = "Zadejte telefon, ať vás kurýr zastihne.";
  if (values.name.split(/\s+/).length < 2) errors.name = "Uveďte jméno i příjmení.";
  if (!values.street) errors.street = "Vyplňte ulici a číslo popisné.";
  if (!values.city) errors.city = "Vyplňte město.";
  if (!/^\d{3}\s?\d{2}$/.test(values.zip)) errors.zip = "PSČ má 5 číslic.";
  if (!isShippingId(values.shipping)) errors.shipping = "Vyberte dopravu.";
  if (!isPaymentId(values.payment)) errors.payment = "Vyberte platbu.";
  if (values.terms !== "on") errors.terms = "Bez souhlasu s obchodními podmínkami objednávku nelze odeslat.";

  const items = parseItems(formData.get("items"));
  const products = await getProductsBySlug(items.map((item) => item.slug));
  if (products.length === 0) errors.items = "Košík je prázdný.";

  if (Object.keys(errors).length > 0 || !isShippingId(values.shipping) || !isPaymentId(values.payment)) {
    return {
      status: "error",
      message: "Zkontrolujte prosím označená pole.",
      values,
      errors,
    };
  }

  const subtotal = products.reduce((sum, product) => {
    const quantity = items.find((item) => item.slug === product.slug)?.quantity ?? 0;
    return sum + product.priceCzk * quantity;
  }, 0);
  const totals = computeTotals(subtotal, values.shipping, values.payment);
  const number = orderNumber();

  // Supabase: insert into `orders` and `order_items` with `totals`, then for
  // card payments create the gateway session and redirect to it instead.

  const params = new URLSearchParams({
    objednavka: number,
    platba: values.payment,
    castka: String(totals.total),
  });
  redirect(`/pokladna/dekujeme?${params}`);
}
