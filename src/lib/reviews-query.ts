import { queryOptions } from "@tanstack/react-query";
import { listReviews } from "@/lib/reviews.functions";
import { getGoogleReviews } from "@/lib/google-reviews.functions";

export const reviewsQueryOptions = queryOptions({
  queryKey: ["client-reviews"],
  queryFn: () => listReviews(),
});

export const googleReviewsQueryOptions = queryOptions({
  queryKey: ["google-reviews"],
  queryFn: () => getGoogleReviews(),
  staleTime: 10 * 60 * 1000,
});