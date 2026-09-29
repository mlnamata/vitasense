import { getSubscribers } from "@/lib/data/orders-api";

/* Protected by proxy.ts together with the rest of /admin. */
export async function GET() {
  const subscribers = await getSubscribers();
  const rows = [
    ["email", "prihlaseno", "zdroj"],
    ...subscribers.map((item) => [item.email, item.subscribedAt, item.source]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\r\n");

  // BOM so Excel opens the Czech characters correctly.
  return new Response(`﻿${csv}\r\n`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="vitasense-newsletter.csv"',
      "cache-control": "no-store",
    },
  });
}
