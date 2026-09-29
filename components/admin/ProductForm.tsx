"use client";

import { useActionState } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { saveProduct } from "@/app/actions/admin";
import Panel from "@/components/admin/Panel";
import { buttonClass } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/TextField";
import type { FormState } from "@/lib/types";

export type ProductFormValues = {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  format: string;
  unit: string;
  price: string;
  compareAt: string;
  badge: string;
  stock: string;
  bestseller: boolean;
  description: string;
};

const FORMATS = [
  { value: "capsules", label: "Kapsle (dóza)" },
  { value: "drops", label: "Kapky (kapátko)" },
  { value: "powder", label: "Prášek (dóza)" },
];

const initialState: FormState = { status: "idle", message: "" };

export default function ProductForm({
  initial,
  categories,
}: {
  initial: ProductFormValues;
  categories: { value: string; label: string }[];
}) {
  const [state, formAction, pending] = useActionState(saveProduct, initialState);
  const errors = state.errors ?? {};
  // After a submit, keep what the admin typed rather than the original values.
  const value = (key: Exclude<keyof ProductFormValues, "bestseller">) => state.values?.[key] ?? initial[key];

  return (
    <form action={formAction} noValidate className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-4">
        <Panel title="Základní údaje">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
            <TextField label="Název" name="name" defaultValue={value("name")} error={errors.name} className="sm:col-span-2" />
            <TextField
              label="URL (slug)"
              name="slug"
              defaultValue={value("slug")}
              error={errors.slug}
              hint="Např. magnesium-complex"
            />
            <SelectField label="Kategorie" name="category" options={categories} defaultValue={value("category")} />
            <TextField
              label="Krátký popis na kartě"
              name="tagline"
              defaultValue={value("tagline")}
              error={errors.tagline}
              className="sm:col-span-2"
            />
            <TextAreaField
              label="Popis produktu"
              name="description"
              rows={5}
              defaultValue={value("description")}
              className="sm:col-span-2"
            />
          </div>
        </Panel>

        <Panel title="Balení">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
            <SelectField label="Forma" name="format" options={FORMATS} defaultValue={value("format")} />
            <TextField label="Obsah balení" name="unit" defaultValue={value("unit")} error={errors.unit} hint="Např. 60 kapslí" />
          </div>
        </Panel>
      </div>

      <div className="space-y-4">
        <Panel title="Cena a sklad">
          <div className="space-y-4">
            <TextField label="Cena (Kč)" name="price" inputMode="numeric" defaultValue={value("price")} error={errors.price} />
            <TextField
              label="Původní cena (Kč)"
              name="compareAt"
              inputMode="numeric"
              defaultValue={value("compareAt")}
              error={errors.compareAt}
              hint="Vyplňte jen u slevy"
            />
            <TextField label="Skladem (ks)" name="stock" inputMode="numeric" defaultValue={value("stock")} error={errors.stock} />
            <TextField label="Štítek" name="badge" defaultValue={value("badge")} hint="Např. Novinka" />
            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                name="bestseller"
                defaultChecked={state.values ? state.values.bestseller === "on" : initial.bestseller}
                className="size-5 accent-sage-600"
              />
              Zobrazit mezi bestsellery
            </label>
          </div>
        </Panel>

        <button type="submit" disabled={pending} className={buttonClass({ className: "w-full" })}>
          {pending && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
          Uložit produkt
        </button>
        {state.status !== "idle" && (
          <p
            role="status"
            className={
              state.status === "success"
                ? "flex items-start gap-2 rounded-xl bg-sage-50 p-3 text-sm text-sage-900"
                : "rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800"
            }
          >
            {state.status === "success" && <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
