"use client";

import { useActionState } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { buttonClass } from "@/components/ui/button";
import EmailInput from "@/components/ui/EmailInput";
import { cn } from "@/lib/cn";
import { NEWSLETTER } from "@/lib/content";
import type { FormState } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-4 rounded-2xl bg-sage-50 p-5 ring-1 ring-inset ring-sage-100"
      >
        <CircleCheck className="mt-0.5 size-6 shrink-0 text-sage-600" aria-hidden="true" />
        <div>
          <p className="font-bold text-slate-900">Hotovo, jste na seznamu.</p>
          <p className="mt-1 text-sm text-slate-600">{state.message}</p>
        </div>
      </div>
    );
  }

  const hasError = state.status === "error";

  return (
    <form action={formAction} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <EmailInput
          id="newsletter-email"
          hideLabel
          defaultValue={state.values?.email}
          invalid={hasError}
          describedBy="newsletter-hint"
          className="sm:flex-1"
        />
        <button
          type="submit"
          disabled={pending}
          className={buttonClass({ className: "w-full sm:w-auto" })}
        >
          {pending && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
          Odebírat
        </button>
      </div>
      <p
        id="newsletter-hint"
        aria-live="polite"
        className={cn(
          "mt-3 text-sm leading-relaxed",
          hasError ? "font-medium text-red-700" : "text-slate-500"
        )}
      >
        {hasError ? state.message : NEWSLETTER.consent}
      </p>
    </form>
  );
}
