"use server";

import type { FormState } from "@/lib/types";
import { isEmail, normalizeEmail } from "@/lib/validation";

/** Passwordless sign-in — maps 1:1 onto Supabase magic links. */
export async function requestMagicLink(
  _previous: FormState,
  formData: FormData
): Promise<FormState> {
  const email = normalizeEmail(formData.get("email"));

  if (!isEmail(email)) {
    return {
      status: "error",
      message: "Tahle adresa nevypadá správně. Zkontrolujte ji prosím.",
      values: { email },
    };
  }

  // Supabase: await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo } });

  return { status: "success", message: email };
}
