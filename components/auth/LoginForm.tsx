"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle, MailCheck } from "lucide-react";
import { requestMagicLink } from "@/app/actions/auth";
import { buttonClass } from "@/components/ui/button";
import EmailInput from "@/components/ui/EmailInput";
import type { FormState } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(requestMagicLink, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="mt-8 rounded-2xl bg-sage-50 p-6 ring-1 ring-inset ring-sage-100">
        <MailCheck className="size-7 text-sage-600" aria-hidden="true" />
        <p className="mt-4 text-lg font-bold text-slate-900">Zkontrolujte e-mail</p>
        <p className="mt-1 leading-relaxed text-slate-600">
          Na adresu <strong className="font-semibold text-slate-900">{state.message}</strong> jsme
          poslali přihlašovací odkaz. Platí 60 minut.
        </p>
      </div>
    );
  }

  const hasError = state.status === "error";

  return (
    <form action={formAction} noValidate className="mt-8">
      <EmailInput
        id="login-email"
        label="E-mail"
        defaultValue={state.values?.email}
        invalid={hasError}
        describedBy={hasError ? "login-error" : undefined}
      />
      {hasError && (
        <p id="login-error" role="alert" className="mt-2 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className={buttonClass({ className: "group mt-5 w-full" })}
      >
        {pending ? (
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        ) : null}
        Poslat přihlašovací odkaz
        {!pending && (
          <ArrowRight
            className="size-5 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </button>
    </form>
  );
}
