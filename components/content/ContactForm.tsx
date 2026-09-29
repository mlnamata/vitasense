"use client";

import { useActionState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";
import { buttonClass } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/TextField";
import { CONTACT_PAGE } from "@/lib/content";
import type { FormState } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex items-start gap-4 rounded-3xl bg-sage-50 p-6 ring-1 ring-inset ring-sage-100">
        <CircleCheck className="mt-0.5 size-6 shrink-0 text-sage-600" aria-hidden="true" />
        <p className="font-semibold text-slate-900">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-4 sm:grid-cols-2">
      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-700 sm:col-span-2">
          {state.message}
        </p>
      )}
      <TextField label="Jméno" name="name" autoComplete="name" defaultValue={values.name} error={errors.name} />
      <TextField
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        defaultValue={values.email}
        error={errors.email}
      />
      <SelectField
        label="Téma"
        name="subject"
        options={CONTACT_PAGE.subjects}
        defaultValue={values.subject}
        error={errors.subject}
      />
      <TextField
        label="Číslo objednávky"
        name="order"
        placeholder="Nepovinné"
        defaultValue={values.order}
      />
      <TextAreaField
        label="Zpráva"
        name="message"
        rows={6}
        defaultValue={values.message}
        error={errors.message}
        className="sm:col-span-2"
      />
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={buttonClass({ className: "w-full sm:w-auto" })}>
          {pending ? (
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-5" aria-hidden="true" />
          )}
          Odeslat zprávu
        </button>
      </div>
    </form>
  );
}
