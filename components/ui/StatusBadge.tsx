import { cn } from "@/lib/cn";
import { ORDER_STATUS_LABELS } from "@/lib/content";
import type { OrderStatus } from "@/lib/types";

const STYLES: Record<OrderStatus, string> = {
  nova: "bg-amber-50 text-amber-800 ring-amber-200",
  zaplacena: "bg-sky-50 text-sky-800 ring-sky-200",
  odeslana: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  dorucena: "bg-sage-50 text-sage-800 ring-sage-200",
  zrusena: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        STYLES[status],
        className
      )}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
