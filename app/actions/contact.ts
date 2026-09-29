"use server";

import { CONTACT_PAGE } from "@/lib/content";
import type { FormState } from "@/lib/types";
import { isEmail, normalizeEmail } from "@/lib/validation";

export async function sendContactMessage(
  _previous: FormState,
  formData: FormData
): Promise<FormState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: normalizeEmail(formData.get("email")),
    subject: String(formData.get("subject") ?? ""),
    order: String(formData.get("order") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Jak vám máme říkat?";
  if (!isEmail(values.email)) errors.email = "Zadejte platný e-mail, ať vám můžeme odpovědět.";
  if (!CONTACT_PAGE.subjects.includes(values.subject as (typeof CONTACT_PAGE.subjects)[number])) {
    errors.subject = "Vyberte téma.";
  }
  if (values.message.length < 10) errors.message = "Napište nám prosím trochu víc.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Zkontrolujte prosím označená pole.", values, errors };
  }

  // Supabase: insert into `contact_messages`, then notify the team by e-mail.

  return { status: "success", message: CONTACT_PAGE.success };
}
