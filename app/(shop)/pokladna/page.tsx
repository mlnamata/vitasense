import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Container from "@/components/ui/Container";
import { CHECKOUT } from "@/lib/content";

export const metadata: Metadata = {
  title: CHECKOUT.title,
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <section aria-labelledby="checkout-title" className="pb-16 pt-8 md:pb-24 md:pt-12">
      <Container>
        <h1
          id="checkout-title"
          className="text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl"
        >
          {CHECKOUT.title}
        </h1>
        <div className="mt-8">
          <CheckoutForm />
        </div>
      </Container>
    </section>
  );
}
