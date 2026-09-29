import type { Metadata } from "next";
import { Download } from "lucide-react";
import Panel from "@/components/admin/Panel";
import PageHeader from "@/components/admin/PageHeader";
import { buttonClass } from "@/components/ui/button";
import { DEMO_TODAY } from "@/lib/data/orders";
import { getSubscribers } from "@/lib/data/orders-api";
import { formatCount, formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Newsletter" };

const SOURCE_LABELS = { web: "Web", pokladna: "Pokladna", aplikace: "Aplikace" } as const;

export default async function AdminNewsletterPage() {
  const subscribers = await getSubscribers();
  const monthAgo = new Date(new Date(DEMO_TODAY).getTime() - 30 * 86_400_000).toISOString().slice(0, 10);
  const recent = subscribers.filter((item) => item.subscribedAt >= monthAgo).length;

  return (
    <>
      <PageHeader
        title="Newsletter"
        description={`${formatCount(subscribers.length)} odběratelů · ${recent} za posledních 30 dní`}
        action={
          <a href="/admin/newsletter/export" className={buttonClass({ variant: "secondary", size: "md", className: "bg-white" })}>
            <Download className="size-4" aria-hidden="true" />
            Export CSV
          </a>
        }
      />
      <Panel className="p-0 sm:p-0">
        <ul className="divide-y divide-slate-900/[0.06]">
          {subscribers.map((subscriber) => (
            <li key={subscriber.email} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 text-sm">
              <span className="min-w-0 truncate font-medium text-slate-900">{subscriber.email}</span>
              <span className="flex items-center gap-3 text-slate-500">
                <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-200">
                  {SOURCE_LABELS[subscriber.source]}
                </span>
                {formatDate(subscriber.subscribedAt)}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
