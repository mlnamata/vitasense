import ReviewCard from "@/components/product/ReviewCard";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Stars from "@/components/ui/Stars";
import { cn } from "@/lib/cn";
import { REVIEWS, SECTIONS } from "@/lib/content";
import { getRatingSummary, getReviews } from "@/lib/data/products";
import { formatCount, formatRating } from "@/lib/format";

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
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
