"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CircleAlert, LoaderCircle, Lock, ShoppingBag } from "lucide-react";
import { placeOrder } from "@/app/actions/checkout";
import { useCart } from "@/components/cart/CartProvider";
import ProductThumb from "@/components/product/ProductThumb";
import { buttonClass } from "@/components/ui/button";
import { TextAreaField, TextField } from "@/components/ui/TextField";
import { useHydrated } from "@/hooks/useHydrated";
import {
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  computeTotals,
  isPaymentId,
  isShippingId,
  shippingPrice,
  type PaymentId,
  type ShippingId,
} from "@/lib/checkout";
import { cn } from "@/lib/cn";
import { CHECKOUT, SHOP_PATH } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import type { FormState } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };

export default function CheckoutForm() {
  const hydrated = useHydrated();
  const { lines, subtotal } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  const [shipping, setShipping] = useState<ShippingId>(
    isShippingId(values.shipping ?? "") ? (values.shipping as ShippingId) : "zasilkovna"
  );
  const [payment, setPayment] = useState<PaymentId>(
    isPaymentId(values.payment ?? "") ? (values.payment as PaymentId) : "karta"
  );

  // The cart lives in localStorage — wait for it instead of flashing "empty".
  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-3xl bg-white/60" aria-busy="true" />;
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-slate-900/[0.04]">
        <span className="flex size-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
          <ShoppingBag className="size-7" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-slate-900">{CHECKOUT.empty}</h2>
        <p className="mt-2 max-w-sm text-slate-600">{CHECKOUT.emptyBody}</p>
        <Link href={SHOP_PATH} className={buttonClass({ size: "md", className: "mt-7" })}>
          Prozkoumat doplňky
        </Link>
      </div>
    );
  }

  const totals = computeTotals(subtotal, shipping, payment);
  const items = JSON.stringify(
    lines.map((line) => ({ slug: line.product.slug, quantity: line.quantity }))
  );

  return (
    <form action={formAction} noValidate className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-12">
      <input type="hidden" name="items" value={items} />

      <div className="space-y-6">
        {state.status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-800 ring-1 ring-inset ring-red-200"
          >
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {errors.items ?? state.message}
          </div>
        )}

        <Step number={1} title={CHECKOUT.sections.contact}>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="vas@email.cz"
              defaultValue={values.email}
              error={errors.email}
            />
            <TextField
              label="Telefon"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+420 777 123 456"
              defaultValue={values.phone}
              error={errors.phone}
            />
          </div>
        </Step>

        <Step number={2} title={CHECKOUT.sections.address}>
          <div className="grid gap-4 sm:grid-cols-6">
            <TextField
              label="Jméno a příjmení"
              name="name"
              autoComplete="name"
              defaultValue={values.name}
              error={errors.name}
              className="sm:col-span-6"
            />
            <TextField
              label="Ulice a číslo popisné"
              name="street"
              autoComplete="street-address"
              defaultValue={values.street}
              error={errors.street}
              className="sm:col-span-6"
            />
            <TextField
              label="Město"
              name="city"
              autoComplete="address-level2"
              defaultValue={values.city}
              error={errors.city}
              className="sm:col-span-4"
            />
            <TextField
              label="PSČ"
              name="zip"
              autoComplete="postal-code"
              inputMode="numeric"
              placeholder="110 00"
              defaultValue={values.zip}
              error={errors.zip}
              className="sm:col-span-2"
            />
          </div>
        </Step>

        <Step number={3} title={CHECKOUT.sections.shipping}>
          <fieldset>
            <legend className="sr-only">{CHECKOUT.sections.shipping}</legend>
            <div className="grid gap-3">
              {SHIPPING_METHODS.map((method) => {
                const price = shippingPrice(method.id, subtotal);
                return (
                  <OptionCard
                    key={method.id}
                    name="shipping"
                    value={method.id}
                    checked={shipping === method.id}
                    onChange={() => setShipping(method.id)}
                    label={method.label}
                    description={method.description}
                    price={price === 0 ? CHECKOUT.free : formatPrice(price)}
                  />
                );
              })}
            </div>
          </fieldset>
        </Step>

        <Step number={4} title={CHECKOUT.sections.payment}>
          <fieldset>
            <legend className="sr-only">{CHECKOUT.sections.payment}</legend>
            <div className="grid gap-3">
              {PAYMENT_METHODS.map((method) => (
                <OptionCard
                  key={method.id}
                  name="payment"
                  value={method.id}
                  checked={payment === method.id}
                  onChange={() => setPayment(method.id)}
                  label={method.label}
                  description={method.description}
                  price={method.feeCzk === 0 ? CHECKOUT.free : `+ ${formatPrice(method.feeCzk)}`}
                />
              ))}
            </div>
          </fieldset>
        </Step>

        <TextAreaField
          label={CHECKOUT.sections.note}
          name="note"
          defaultValue={values.note}
          placeholder="Nepovinné — např. kdy vás kurýr zastihne"
        />
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-900/[0.04] sm:p-6">
          <h2 className="text-lg font-bold tracking-[-0.02em] text-slate-900">{CHECKOUT.summary}</h2>

          <ul className="mt-4 divide-y divide-slate-900/[0.06]">
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-3 py-3">
                <ProductThumb product={product} size={56} className="size-14" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">
                    {quantity} × {formatPrice(product.priceCzk)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {formatPrice(product.priceCzk * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-2 space-y-2 border-t border-slate-900/[0.06] pt-4 text-sm">
            <Row label={CHECKOUT.subtotal} value={formatPrice(totals.subtotal)} />
            <Row
              label={CHECKOUT.shipping}
              value={totals.shippingCzk === 0 ? CHECKOUT.free : formatPrice(totals.shippingCzk)}
            />
            {totals.paymentCzk > 0 && (
              <Row label={CHECKOUT.paymentFee} value={formatPrice(totals.paymentCzk)} />
            )}
            <div className="flex items-baseline justify-between border-t border-slate-900/[0.06] pt-3">
              <dt className="font-semibold text-slate-900">{CHECKOUT.total}</dt>
              <dd className="text-2xl font-extrabold tracking-[-0.03em] text-slate-900">
                {formatPrice(totals.total)}
              </dd>
            </div>
          </dl>
          <p className="mt-1 text-right text-xs text-slate-500">{CHECKOUT.vat}</p>

          <div className="mt-5 space-y-3">
            <Checkbox name="terms" defaultChecked={values.terms === "on"} error={errors.terms}>
              {CHECKOUT.terms.before}
              <Link
                href="/obchodni-podminky"
                target="_blank"
                className="font-semibold text-sage-700 underline underline-offset-2"
              >
                {CHECKOUT.terms.link}
              </Link>
              {CHECKOUT.terms.after}
            </Checkbox>
            <Checkbox name="newsletter" defaultChecked={values.newsletter === "on"}>
              {CHECKOUT.newsletter}
            </Checkbox>
          </div>

          <button
            type="submit"
            disabled={pending}
            className={buttonClass({ className: "mt-6 w-full" })}
          >
            {pending && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
            {CHECKOUT.submit}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Lock className="size-3.5" aria-hidden="true" />
            {CHECKOUT.secure}
          </p>
        </div>
      </aside>
    </form>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white/60 p-5 ring-1 ring-slate-900/[0.04] sm:p-6">
      <h2 className="flex items-center gap-3 text-lg font-bold tracking-[-0.02em] text-slate-900">
        <span className="flex size-7 items-center justify-center rounded-full bg-sage-600 text-sm text-white">
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function OptionCard({
  name,
  value,
  checked,
  onChange,
  label,
  description,
  price,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
  price: string;
}) {
  return (
    <label
      className={cn(
        "flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-inset transition duration-300",
        checked ? "ring-2 ring-sage-600" : "ring-slate-900/10 hover:ring-slate-900/20"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="size-5 shrink-0 accent-sage-600"
      />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-slate-900">{label}</span>
        <span className="block text-sm text-slate-500">{description}</span>
      </span>
      <span className={cn("shrink-0 text-sm font-semibold", price === CHECKOUT.free ? "text-sage-700" : "text-slate-900")}>
        {price}
      </span>
    </label>
  );
}

function Checkbox({
  name,
  defaultChecked,
  error,
  children,
}: {
  name: string;
  defaultChecked?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-600">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-5 shrink-0 rounded accent-sage-600"
        />
        <span>{children}</span>
      </label>
      {error && <p className="ml-8 mt-1 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-slate-600">{label}</dt>
      <dd className={cn("font-medium", value === CHECKOUT.free ? "text-sage-700" : "text-slate-900")}>
        {value}
      </dd>
    </div>
  );
}
