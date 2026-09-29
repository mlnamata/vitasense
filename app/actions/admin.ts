"use server";

import { requireAdmin } from "@/lib/admin-guard";
import { ORDER_STATUS_LABELS } from "@/lib/content";
import type { FormState, OrderStatus } from "@/lib/types";

/*
 * Admin mutations. They validate like the real thing, but until Supabase is
 * connected nothing is persisted — each success message says so.
 */

const DEMO_NOTE = "Demo režim: změna se uloží po připojení databáze.";

const isStatus = (value: string): value is OrderStatus => value in ORDER_STATUS_LABELS;

export async function updateOrderStatus(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const number = String(formData.get("number") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!/^VS\d{10}$/.test(number) || !isStatus(status)) {
    return { status: "error", message: "Neplatná objednávka nebo stav." };
  }

  // Supabase: update orders set status = … where number = …; notify the customer.

  return {
    status: "success",
    message: `Stav objednávky ${number} je teď „${ORDER_STATUS_LABELS[status]}“. ${DEMO_NOTE}`,
  };
}

const PRODUCT_FIELDS = [
  "name",
  "slug",
  "tagline",
  "category",
  "format",
  "unit",
  "price",
  "compareAt",
  "badge",
  "stock",
  "bestseller",
  "description",
] as const;

export async function saveProduct(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const values = Object.fromEntries(
    PRODUCT_FIELDS.map((field) => [field, String(formData.get(field) ?? "").trim()])
  ) as Record<(typeof PRODUCT_FIELDS)[number], string>;

  const errors: Record<string, string> = {};
  const price = Number(values.price);
  const compareAt = values.compareAt ? Number(values.compareAt) : null;
  const stock = Number(values.stock);

  if (values.name.length < 2) errors.name = "Vyplňte název.";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(values.slug)) errors.slug = "Jen malá písmena bez diakritiky, čísla a pomlčky.";
  if (!values.tagline) errors.tagline = "Krátký popis se zobrazuje na kartě produktu.";
  if (!values.unit) errors.unit = "Např. „60 kapslí“.";
  if (!Number.isInteger(price) || price <= 0) errors.price = "Cena v celých korunách.";
  if (compareAt !== null && (!Number.isInteger(compareAt) || compareAt <= price)) {
    errors.compareAt = "Původní cena musí být vyšší než prodejní.";
  }
  if (!Number.isInteger(stock) || stock < 0) errors.stock = "Počet kusů skladem.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Zkontrolujte označená pole.", values, errors };
  }

  // Supabase: upsert into products (+ product_details) and revalidatePath("/obchod").

  return { status: "success", message: `Produkt „${values.name}“ je uložený. ${DEMO_NOTE}`, values };
}

export async function moderateReview(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  if (!id || !["publish", "hide"].includes(decision)) {
    return { status: "error", message: "Neplatný požadavek." };
  }

  // Supabase: update reviews set is_published = … where id = ….

  return {
    status: "success",
    message: `${decision === "hide" ? "Recenze skrytá" : "Recenze zveřejněná"}. ${DEMO_NOTE}`,
    values: { id, decision },
  };
}
