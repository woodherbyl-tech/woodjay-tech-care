import { useState, type FormEvent } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, MessageSquare, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviewSchema } from "@/lib/reviews-schema";
import { reviewsQueryOptions } from "@/lib/reviews-query";
import { submitReview } from "@/lib/reviews.functions";

export function ClientReviews() {
  const { data, refetch } = useSuspenseQuery(reviewsQueryOptions);
  const queryClient = useQueryClient();
  const saveReview = useServerFn(submitReview);
  const [rating, setRating] = useState(0);
  const [previewRating, setPreviewRating] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const parsed = reviewSchema.safeParse({ display_name: fields.get("display_name"), rating, comment: fields.get("comment") });
    setSaved(false);
    setError("");
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your review.");
      return;
    }
    setSending(true);
    try {
      const result = await saveReview({ data: parsed.data });
      if (!result.success) {
        setError(result.error ?? "Your review could not be saved.");
        return;
      }
      form.reset();
      setRating(0);
      setSaved(true);
      await queryClient.invalidateQueries({ queryKey: reviewsQueryOptions.queryKey });
    } catch {
      setError("Your review could not be saved. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const fieldClass = "w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-c1 focus:ring-2 focus:ring-c1/30";

  return (
    <section id="reviews" className="scroll-mt-20 border-t bg-muted/20">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-4xl font-extrabold md:text-5xl">Client <span className="text-gradient">Reviews</span></h2>
          <div className="flex gap-1 text-c7" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="size-6" />)}
          </div>
        </div>
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <form onSubmit={handleSubmit} className="min-w-0 space-y-5">
            <h3 className="text-2xl font-bold">Share your experience</h3>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Display name</span>
              <input name="display_name" required maxLength={80} autoComplete="name" placeholder="Your name" className={fieldClass} disabled={sending} />
            </label>
            <fieldset disabled={sending}>
              <legend className="mb-2 text-sm font-semibold">Your rating</legend>
              <div className="flex items-center gap-1" onMouseLeave={() => setPreviewRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button key={star} type="button" variant="ghost" size="icon" className="size-11 text-c7 hover:bg-c7/10 hover:text-c7" aria-label={`${star} ${star === 1 ? "star" : "stars"}`} aria-pressed={rating === star} onClick={() => setRating(star)} onMouseEnter={() => setPreviewRating(star)}>
                    <Star className={`!size-8 ${star <= (previewRating || rating) ? "fill-current" : "fill-none"}`} aria-hidden="true" />
                  </Button>
                ))}
                <span className="ml-2 min-w-10 text-sm text-muted-foreground" aria-live="polite">{rating > 0 ? `${rating}/5` : ""}</span>
              </div>
            </fieldset>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Your experience</span>
              <textarea name="comment" required maxLength={2000} rows={5} placeholder="How was your experience with WOOD-JAY?" className={fieldClass} disabled={sending} />
            </label>
            {error && <p role="alert" className="text-sm font-semibold text-c2">{error}</p>}
            {saved && <p role="status" className="flex items-center gap-2 text-sm font-semibold text-c4"><CheckCircle2 className="size-5 shrink-0" />Thank you! Your review has been posted.</p>}
            <Button type="submit" disabled={sending} size="lg" className="h-12 bg-gradient-brand font-bold text-primary-foreground">
              {sending ? <Loader2 className="animate-spin motion-reduce:animate-none" /> : <Send />}
              {sending ? "Posting…" : "Post review"}
            </Button>
          </form>
          <div className="min-w-0">
            <h3 className="mb-5 text-xl font-bold">Client experiences</h3>
            {data.error ? (
              <div role="alert" className="border-y py-8">
                <p className="text-muted-foreground">{data.error}</p>
                <Button variant="outline" className="mt-4" onClick={() => refetch()}>Try again</Button>
              </div>
            ) : data.reviews.length === 0 ? (
              <div className="border-y py-10">
                <MessageSquare className="mb-4 size-8 text-c1" aria-hidden="true" />
                <p className="font-semibold">No reviews yet</p>
                <p className="mt-2 text-sm text-muted-foreground">Be the first to share your experience.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.reviews.slice(0, visibleCount).map((review) => (
                  <article key={review.id} className="rounded-lg border bg-card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="min-w-0 break-words font-bold [overflow-wrap:anywhere]">{review.display_name}</h4>
                      <div className="flex shrink-0 gap-1 text-c7" aria-label={`${review.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => <Star key={star} aria-hidden="true" className={`size-4 ${star <= review.rating ? "fill-current" : "fill-none opacity-40"}`} />)}
                      </div>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">{review.comment}</p>
                  </article>
                ))}
                {visibleCount < data.reviews.length && <Button variant="outline" onClick={() => setVisibleCount((count) => count + 6)}>More reviews</Button>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}