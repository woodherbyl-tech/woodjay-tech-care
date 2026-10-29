import { createServerFn } from "@tanstack/react-start";
import { reviewSchema } from "@/lib/reviews-schema";

export const listReviews = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { createReviewsClient } = await import("@/lib/reviews.server");
    const { data, error } = await createReviewsClient()
      .from("client_reviews")
      .select("id, display_name, rating, comment, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) return { reviews: [], error: "Reviews could not be loaded. Please try again." };
    return { reviews: data ?? [], error: null };
  } catch {
    return { reviews: [], error: "Reviews are temporarily unavailable. Please try again." };
  }
});

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => reviewSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { createReviewsClient } = await import("@/lib/reviews.server");
      const { error } = await createReviewsClient().from("client_reviews").insert(data);
      if (error) return { success: false, error: "Your review could not be saved. Please try again." };
      return { success: true, error: null };
    } catch {
      return { success: false, error: "Reviews are temporarily unavailable. Please try again." };
    }
  });