import type { Metadata } from "next";
import Panel from "@/components/admin/Panel";
import PageHeader from "@/components/admin/PageHeader";
import ReviewActions from "@/components/admin/ReviewActions";
import Stars from "@/components/ui/Stars";
import { getReviews } from "@/lib/data/products";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Recenze" };

export default async function AdminReviewsPage() {
  const reviews = await getReviews(100);

  return (
    <>
      <PageHeader title="Recenze" description="Nové recenze se zveřejní až po schválení" />
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <Panel key={review.id}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Stars value={review.rating} />
              <span className="text-xs text-slate-500">{formatDate(review.date)}</span>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-700">„{review.text}“</p>
            <p className="mt-3 text-sm text-slate-500">
              <span className="font-semibold text-slate-900">{review.author}</span> · {review.productName}
            </p>
            <div className="mt-4 border-t border-slate-900/[0.06] pt-4">
              <ReviewActions id={review.id} />
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
