import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleCheck } from "lucide-react";
import ClearCart from "@/components/checkout/ClearCart";
import { buttonClass } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { CHECKOUT, SHOP_PATH } from "@/lib/content";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Děkujeme za objednávku",
  robots: { index: false },
};

type Props = {
  searchParams: Promise<{ objednavka?: string; platba?: string; castka?: string }>;
};

export default async function ThankYouPage({ searchParams }: Props) {
  const { objednavka, platba, castka } = await searchParams;
  if (!objednavka || !/^VS\d{10}$/.test(objednavka)) redirect(SHOP_PATH);

  const amount = Number(castka);
  const { thanks, bank } = CHECKOUT;

  return (
    <section aria-labelledby="thanks-title" className="pb-16 pt-10 md:pb-24 md:pt-16">
      <ClearCart />
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
              <CircleCheck className="size-8" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h1
              id="thanks-title"
              className="mt-6 text-balance text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl"
            >
              {thanks.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{thanks.body}</p>
            <p className="mt-6 rounded-full bg-white px-5 py-2 text-sm text-slate-600 ring-1 ring-slate-900/[0.06]">
              {thanks.number}{" "}
              <strong className="font-bold tracking-wide text-slate-900">{objednavka}</strong>
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.04] sm:p-8">
            {platba === "prevod" ? (
              <>
                <p className="font-semibold text-slate-900">{thanks.transfer}</p>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <Detail label="Číslo účtu" value={bank.account} />
                  <Detail label="IBAN" value={bank.iban} />
                  <Detail label="Variabilní symbol" value={objednavka.slice(2)} />
                  {Number.isFinite(amount) && amount > 0 && (
                    <Detail label="Částka" value={formatPrice(amount)} />
                  )}
                </dl>
              </>
            ) : (
              <p className="font-semibold text-slate-900">
                {platba === "dobirka" ? thanks.cod : thanks.card}
              </p>
            )}

            <ol className="mt-8 space-y-5 border-t border-slate-900/[0.06] pt-6">
              {thanks.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage-50 text-sm font-bold text-sage-700">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{step.title}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={SHOP_PATH} className={buttonClass()}>
              {thanks.continue}
            </Link>
            <Link href="/" className={buttonClass({ variant: "secondary" })}>
              Zpět na úvod
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-cream px-4 py-3">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-0.5 font-semibold tabular-nums text-slate-900">{value}</dd>
    </div>
  );
}
