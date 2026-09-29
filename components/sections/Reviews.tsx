import { BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Stars from "@/components/ui/Stars";
import { cn } from "@/lib/cn";
import { REVIEWS, SECTIONS } from "@/lib/content";
import { getRatingSummary, getReviews } from "@/lib/data/products";
import { formatCount, formatDate, formatRating } from "@/lib/format";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .replace(/[^\p{L}]/gu, "")
    .slice(0, 2);
}

export default async function Reviews() {
  const [reviews, summary] = await Promise.all([getReviews(), getRatingSummary()]);

  return (
    <section id={SECTIONS.reviews} aria-labelledby="reviews-title" className="py-12 md:py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="reviews-title" eyebrow={REVIEWS.eyebrow} title={REVIEWS.title} />

          <div className="flex items-center gap-4 self-start rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-900/[0.04] md:self-auto">
            <p className="text-4xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-5xl">
              {formatRating(summary.average)}
            </p>
            <div>
              <Stars value={summary.average} />
              <p className="mt-1 text-sm text-slate-500">
                průměr z {formatCount(summary.count)} hodnocení
              </p>
            </div>
          </div>
        </div>

        {/* Swipeable on phones; three cards on desktop. */}
        <ul className="no-scrollbar relative -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {reviews.map((review, index) => (
            <li
              key={review.id}
              className={cn("w-[85%] shrink-0 snap-start md:w-auto", index >= 3 && "md:hidden")}
            >
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
                    <p className="truncate text-xs text-slate-500">{review.productName}</p>
                  </div>
                  {review.verified && (
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-sage-50 px-2 py-1 text-[11px] font-semibold text-sage-700">
                      <BadgeCheck className="size-3.5" aria-hidden="true" />
                      {REVIEWS.verified}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
