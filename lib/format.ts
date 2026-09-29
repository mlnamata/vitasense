const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

/** 1500 → „1 500 Kč" */
export function formatPrice(amount: number) {
  return czk.format(amount);
}

const rating = new Intl.NumberFormat("cs-CZ", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** 4.9 → „4,9" */
export function formatRating(value: number) {
  return rating.format(value);
}

const plurals = new Intl.PluralRules("cs-CZ");

/** Czech plural: plural(3, { one: "položka", few: "položky", other: "položek" }) */
export function plural(
  count: number,
  forms: { one: string; few: string; other: string }
) {
  const rule = plurals.select(count);
  const word = rule === "one" ? forms.one : rule === "few" ? forms.few : forms.other;
  return `${count} ${word}`;
}

const integer = new Intl.NumberFormat("cs-CZ");

/** 2814 → „2 814" */
export function formatCount(value: number) {
  return integer.format(value);
}

const date = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-09-21" → „21. 9. 2026" */
export function formatDate(iso: string) {
  return date.format(new Date(iso));
}
