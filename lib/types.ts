/*
 * Domain types. They mirror the planned Supabase tables (snake_case columns
 * are mapped to camelCase in lib/data), so components never see raw rows.
 */

export type CategoryId =
  | "spanek"
  | "energie"
  | "imunita"
  | "rovnovaha"
  | "srdce"
  | "traveni";

export type Category = {
  id: CategoryId;
  label: string;
  /** Pastel background behind the packshot. */
  tint: string;
  /** Cap / accent colour of the packaging. */
  accent: string;
};

export type ProductFormat = "capsules" | "drops";

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** One line on the card — composition, not a health claim. */
  tagline: string;
  category: Category;
  format: ProductFormat;
  /** Pack size as printed on the label, e.g. „60 kapslí". */
  unit: string;
  priceCzk: number;
  /** Supabase Storage URL; null falls back to the drawn packshot. */
  imageUrl: string | null;
  rating: number;
  reviewCount: number;
  isBestseller: boolean;
};

export type CartLine = {
  product: Product;
  quantity: number;
};

/** Shape returned by every form server action (useActionState). */
export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Submitted values, echoed back so the form keeps them after an error. */
  values?: Record<string, string>;
};
