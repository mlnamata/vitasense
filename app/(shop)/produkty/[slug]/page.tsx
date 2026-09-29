import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, PackageCheck, Plus, RotateCcw, Truck } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import ProductPurchase from "@/components/product/ProductPurchase";
import ReviewCard from "@/components/product/ReviewCard";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Container from "@/components/ui/Container";
import Stars from "@/components/ui/Stars";
import { cn } from "@/lib/cn";
import { PRODUCT_PAGE, SHOP, SHOP_PATH, SUBSCRIPTION_DISCOUNT, productPath } from "@/lib/content";
import { getProduct, getProductReviews, getProducts, getRelatedProducts } from "@/lib/data/products";
import { formatPrice, formatRating, plural } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

const PERK_ICONS = { truck: Truck, package: PackageCheck, return: RotateCcw } as const;

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.tagline}. ${product.details.description[0]}`,
    alternates: { canonical: productPath(product.slug) },
    openGraph: product.imageUrl ? { images: [{ url: product.imageUrl, width: 900, height: 1125 }] } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    getProductReviews(product.name),
    getRelatedProducts(product),
  ]);
  const { category, details } = product;
  const discount = product.compareAtPriceCzk
    ? Math.round((1 - product.priceCzk / product.compareAtPriceCzk) * 100)
    : 0;
  const perDay = product.priceCzk / details.servings;
  const subscriptionPrice = Math.round(product.priceCzk * (1 - SUBSCRIPTION_DISCOUNT));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    sku: product.id,
    image: product.imageUrl ?? undefined,
    brand: { "@type": "Brand", name: "VitaSense" },
    offers: {
      "@type": "Offer",
      price: product.priceCzk,
      priceCurrency: "CZK",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section aria-labelledby="product-title" className="pb-12 pt-6 md:pb-20 md:pt-10">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Domů", href: "/" },
              { label: SHOP.title, href: SHOP_PATH },
              { label: category.label, href: `${SHOP_PATH}/${category.id}` },
              { label: product.name },
            ]}
          />

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div
                className="relative aspect-square overflow-hidden rounded-3xl sm:aspect-[4/5]"
                style={{ backgroundColor: category.tint }}
              >
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={`${product.name}, ${product.unit}`}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
                {(discount > 0 || product.badge) && (
                  <span
                    className={cn(
                      "absolute left-4 top-4 rounded-full px-3 py-1.5 text-sm font-bold text-white",
                      discount > 0 ? "bg-clay-600" : "bg-ink-900"
                    )}
                  >
                    {discount > 0 ? `−${discount} %` : product.badge}
                  </span>
                )}
              </div>
            </div>

            <div>
              <Link
                href={`${SHOP_PATH}/${category.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-slate-700 ring-1 ring-inset ring-slate-900/[0.06] transition hover:ring-slate-900/20"
              >
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ backgroundColor: category.accent }}
                />
                {category.label}
              </Link>

              <h1
                id="product-title"
                className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-5xl"
              >
                {product.name}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-slate-600">{product.tagline}</p>

              <a href="#recenze" className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600">
                <Stars value={product.rating} />
                <span>
                  <strong className="font-semibold text-slate-900">{formatRating(product.rating)}</strong>
                  {" · "}
                  {plural(product.reviewCount, { one: "recenze", few: "recenze", other: "recenzí" })}
                </span>
              </a>

              <div className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-slate-900/[0.04] sm:p-7">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p
                    className={cn(
                      "text-4xl font-extrabold tracking-[-0.03em]",
                      discount > 0 ? "text-clay-600" : "text-slate-900"
                    )}
                  >
                    {formatPrice(product.priceCzk)}
                  </p>
                  {product.compareAtPriceCzk && (
                    <p className="text-lg text-slate-400 line-through">
                      <span className="sr-only">Původně </span>
                      {formatPrice(product.compareAtPriceCzk)}
                    </p>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {product.unit} · {PRODUCT_PAGE.lasts} {details.servings} dní ·{" "}
                  {perDay.toLocaleString("cs-CZ", { maximumFractionDigits: 1 })} Kč {PRODUCT_PAGE.perDay}
                </p>

                <div className="mt-6">
                  <ProductPurchase product={product} />
                </div>

                <Link
                  href="/predplatne"
                  className="group mt-2 flex items-center justify-between gap-4 rounded-2xl bg-sage-50 px-4 py-3 text-sm ring-1 ring-inset ring-sage-100 transition hover:bg-sage-100"
                >
                  <span className="text-slate-700">
                    {PRODUCT_PAGE.subscription}{" "}
                    <strong className="font-bold text-sage-800">{formatPrice(subscriptionPrice)}</strong>{" "}
                    (−{Math.round(SUBSCRIPTION_DISCOUNT * 100)} %)
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-sage-700">
                    {PRODUCT_PAGE.subscriptionLink}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>

                <ul className="mt-5 grid gap-3 border-t border-slate-900/[0.06] pt-5 text-sm text-slate-600 sm:grid-cols-3">
                  {PRODUCT_PAGE.perks.map((perk) => {
                    const Icon = PERK_ICONS[perk.icon];
                    return (
                      <li key={perk.text} className="flex items-center gap-2">
                        <Icon className="size-4 shrink-0 text-sage-600" aria-hidden="true" />
                        {perk.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900">{PRODUCT_PAGE.benefits}</h2>
                <ul className="mt-4 space-y-3">
                  {details.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 space-y-3">
                <Disclosure title={PRODUCT_PAGE.description} open>
                  {details.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Disclosure>

                <Disclosure title={PRODUCT_PAGE.composition} open>
                  <div className="-mx-1 overflow-x-auto">
                    <table className="w-full min-w-[20rem] text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-900/10 text-xs uppercase tracking-wider text-slate-500">
                          {PRODUCT_PAGE.compositionHeaders.map((header, index) => (
                            <th
                              key={header}
                              scope="col"
                              className={cn("px-1 pb-2 font-semibold", index > 0 && "text-right")}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {details.composition.map((row) => (
                          <tr key={row.name} className="border-b border-slate-900/[0.06] last:border-0">
                            <th scope="row" className="px-1 py-2.5 font-medium text-slate-800">
                              {row.name}
                            </th>
                            <td className="whitespace-nowrap px-1 py-2.5 text-right text-slate-700">{row.amount}</td>
                            <td className="whitespace-nowrap px-1 py-2.5 text-right text-slate-500">
                              {row.nrv ?? "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500">{PRODUCT_PAGE.nrvNote}</p>
                </Disclosure>

                <Disclosure title={PRODUCT_PAGE.usage}>
                  <p>
                    <strong className="font-semibold text-slate-900">{details.dose}.</strong> {details.usage}
                  </p>
                </Disclosure>

                <Disclosure title={PRODUCT_PAGE.ingredients}>
                  <p>{details.ingredients}</p>
                </Disclosure>

                <Disclosure title={PRODUCT_PAGE.warnings}>
                  <p>{PRODUCT_PAGE.warningText}</p>
                </Disclosure>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="recenze" aria-labelledby="product-reviews-title" className="py-12 md:py-16">
        <Container>
          <h2 id="product-reviews-title" className="text-2xl font-bold tracking-[-0.03em] text-slate-900 sm:text-3xl">
            {PRODUCT_PAGE.reviews}
          </h2>
          {reviews.length > 0 ? (
            <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
              {reviews.map((review) => (
                <li key={review.id}>
                  <ReviewCard review={review} showProduct={false} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-slate-600">{PRODUCT_PAGE.noReviews}</p>
          )}
        </Container>
      </section>

      <section aria-labelledby="related-title" className="pb-16 pt-6 md:pb-24">
        <Container>
          <h2 id="related-title" className="text-2xl font-bold tracking-[-0.03em] text-slate-900 sm:text-3xl">
            {PRODUCT_PAGE.related}
          </h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </Container>
      </section>
    </>
  );
}

function Disclosure({
  title,
  open = false,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={open}
      className="group rounded-2xl bg-white px-5 ring-1 ring-slate-900/[0.04] [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
        {title}
        <Plus
          aria-hidden="true"
          className="size-5 shrink-0 text-slate-400 transition-transform duration-300 ease-soft group-open:rotate-45"
        />
      </summary>
      <div className="space-y-3 pb-5 text-[15px] leading-relaxed text-slate-600">{children}</div>
    </details>
  );
}
