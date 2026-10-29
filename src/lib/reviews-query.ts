import { queryOptions } from "@tanstack/react-query";
import { listReviews } from "@/lib/reviews.functions";

export const reviewsQueryOptions = queryOptions({
  queryKey: ["client-reviews"],
  queryFn: () => listReviews(),
});