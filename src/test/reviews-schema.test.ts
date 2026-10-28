import { describe, expect, it } from "vitest";
import { reviewSchema } from "@/lib/reviews-schema";

describe("Client review ratings", () => {
  it("accepts every whole-star rating from 1 through 5 and rejects other ratings", () => {
    const review = { display_name: "Client", comment: "Reliable technical support." };
    for (const rating of [1, 2, 3, 4, 5]) {
      expect(reviewSchema.safeParse({ ...review, rating }).success).toBe(true);
    }
    for (const rating of [0, 6, 2.5]) {
      expect(reviewSchema.safeParse({ ...review, rating }).success).toBe(false);
    }
  });
});