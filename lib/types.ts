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
  /** Goal-oriented line for tiles and the category page header. */
  description: string;
  /** Pastel background behind the packshot. */
  tint: string;
  /** Cap / accent colour of the packaging. */
  accent: string;
};

/** Drops ship in a dropper bottle; everything else in a jar. */
export type ProductFormat = "capsules" | "drops" | "powder";

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
  /** Price before discount; null when the product isn't on sale. */
  compareAtPriceCzk: number | null;
  /** Short marketing label on the image, e.g. „Novinka". */
  badge: string | null;
  /** Local path or Supabase Storage URL; null falls back to the drawn packshot. */
  imageUrl: string | null;
  rating: number;
  reviewCount: number;
  isBestseller: boolean;
};

export type Nutrient = {
  name: string;
  amount: string;
  /** Share of the EU reference intake, when one exists. */
  nrv?: string;
};

export type ProductDetails = {
  description: string[];
  benefits: string[];
  /** Per daily dose. */
  composition: Nutrient[];
  dose: string;
  usage: string;
  ingredients: string;
  /** Days one pack lasts at the recommended dose. */
  servings: number;
};

export type ProductWithDetails = Product & { details: ProductDetails };

export type Article = {
  slug: string;
  title: string;
  tag: string;
  /** Card background. */
  tint: string;
  /** ISO date. */
  date: string;
  readingMinutes: number;
  /** One-paragraph takeaway shown on the home page card. */
  tip: string;
  excerpt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  /** ISO date. */
  date: string;
  productName: string;
  text: string;
  verified: boolean;
};

export type RatingSummary = {
  average: number;
  count: number;
};

export type OrderStatus = "nova" | "zaplacena" | "odeslana" | "dorucena" | "zrusena";

export type OrderItem = {
  slug: string;
  name: string;
  quantity: number;
  priceCzk: number;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
};

export type Order = {
  number: string;
  /** ISO date-time. */
  createdAt: string;
  customer: Customer;
  items: OrderItem[];
  shipping: "zasilkovna" | "ppl";
  payment: "karta" | "prevod" | "dobirka";
  shippingCzk: number;
  paymentCzk: number;
  totalCzk: number;
  status: OrderStatus;
  note?: string;
};

export type Subscriber = {
  email: string;
  /** ISO date. */
  subscribedAt: string;
  source: "web" | "pokladna" | "aplikace";
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
  /** Field name → message, for inline validation. */
  errors?: Record<string, string>;
};
