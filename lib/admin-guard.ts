import "server-only";

import { headers } from "next/headers";
import { checkAdminAuth } from "@/lib/admin-auth";

/**
 * Server actions can be invoked from any URL, so /admin's proxy check is
 * not enough — every admin action calls this first.
 */
export async function requireAdmin() {
  const result = checkAdminAuth((await headers()).get("authorization"));
  if (result !== "ok") throw new Error("Nepřihlášený přístup do administrace.");
}
