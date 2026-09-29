import type { Metadata } from "next";
import { ChartLine, Package, UserRound } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Přihlaste se do svého účtu VitaSense.",
};

const PERKS = [
  { icon: Package, text: "Přehled objednávek a předplatného" },
  { icon: ChartLine, text: "Výsledky testů a váš progres" },
] as const;

export default function LoginPage() {
  return (
    <section aria-labelledby="login-title" className="py-10 md:py-20">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-900/[0.04] sm:p-10">
            <span className="flex size-12 items-center justify-center rounded-xl bg-sage-50 text-sage-700 ring-1 ring-inset ring-sage-100">
              <UserRound className="size-[22px]" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h1
              id="login-title"
              className="mt-6 text-3xl font-bold tracking-[-0.03em] text-slate-900"
            >
              Vítejte zpět
            </h1>
            <p className="mt-2 leading-relaxed text-slate-600">
              Přihlaste se e-mailem. Pošleme vám bezpečný odkaz, žádné heslo si nemusíte
              pamatovat.
            </p>

            <LoginForm />

            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              Nemáte účet? Založíme vám ho automaticky při prvním přihlášení.
            </p>
          </div>

          <ul className="mt-6 space-y-3 px-2">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-slate-600">
                <Icon className="size-[18px] text-sage-600" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
