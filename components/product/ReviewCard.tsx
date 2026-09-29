import { BadgeCheck } from "lucide-react";
import Stars from "@/components/ui/Stars";
import { REVIEWS } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Review } from "@/lib/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .replace(/[^\p{L}]/gu, "")
    .slice(0, 2);
}

export default function ReviewCard({
  review,
  showProduct = true,
}: {
  review: Review;
  showProduct?: boolean;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-900/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <Stars value={review.rating} />
        <time dateTime={review.date} className="text-xs text-slate-400">
          {formatDate(review.date)}
        </time>
      </div>
      <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-slate-700">
        „{review.text}“
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-900/[0.06] pt-4">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sm font-bold text-sage-800"
        >
          {initials(review.author)}
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">{review.author}</p>
          {showProduct && <p className="truncate text-xs text-slate-500">{review.productName}</p>}
        </div>
        {review.verified && (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-sage-50 px-2 py-1 text-[11px] font-semibold text-sage-700">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            {REVIEWS.verified}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
