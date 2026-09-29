import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_REALM, checkAdminAuth } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const result = checkAdminAuth(request.headers.get("authorization"));
  if (result === "ok") return NextResponse.next();

  if (result === "unconfigured") {
    return new NextResponse(
      "Administrace není nastavená. Doplňte proměnné prostředí ADMIN_USER a ADMIN_PASSWORD.",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  return new NextResponse("Pro vstup do administrace se přihlaste.", {
    status: 401,
    headers: { "WWW-Authenticate": ADMIN_REALM, "content-type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
