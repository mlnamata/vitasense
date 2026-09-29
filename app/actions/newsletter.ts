"use server";

import type { FormState } from "@/lib/types";
import { isEmail, normalizeEmail } from "@/lib/validation";

export async function subscribeToNewsletter(
  _previous: FormState,
  formData: FormData
): Promise<FormState> {
  const email = normalizeEmail(formData.get("email"));

  if (!isEmail(email)) {
    return {
      status: "error",
      message: "Zadejte prosím platnou e-mailovou adresu.",
      values: { email },
    };
  }

  // Supabase: await supabase.from("newsletter_subscribers").upsert({ email });

  return {
    status: "success",
    message: `První tipy vám pošleme na ${email}.`,
  };
}
