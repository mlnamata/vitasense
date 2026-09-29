/*
 * HTTP Basic auth for /admin until Supabase auth with an admin role exists.
 * Credentials come from ADMIN_USER and ADMIN_PASSWORD. Without them the
 * admin is open in development only and closed everywhere else.
 */

export const ADMIN_REALM = 'Basic realm="VitaSense admin", charset="UTF-8"';

export type AdminCheck = "ok" | "unauthorized" | "unconfigured";

function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export function checkAdminAuth(authorization: string | null): AdminCheck {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) {
    return process.env.NODE_ENV === "development" ? "ok" : "unconfigured";
  }

  const [scheme, encoded] = (authorization ?? "").split(" ");
  if (scheme !== "Basic" || !encoded) return "unauthorized";

  let decoded = "";
  try {
    decoded = atob(encoded);
  } catch {
    return "unauthorized";
  }
  const separator = decoded.indexOf(":");
  const givenUser = decoded.slice(0, separator);
  const givenPassword = decoded.slice(separator + 1);
  return separator > 0 && safeEqual(givenUser, user) && safeEqual(givenPassword, password)
    ? "ok"
    : "unauthorized";
}
