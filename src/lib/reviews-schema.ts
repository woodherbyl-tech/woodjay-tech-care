import { z } from "zod";

export const reviewSchema = z.object({
  display_name: z.string().trim().min(1, "Please enter your display name.").max(80),
  rating: z.number().int().min(1, "Choose a star rating.").max(5),
  comment: z.string().trim().min(1, "Please share your experience.").max(2000),
});

export type ClientReview = z.infer<typeof reviewSchema> & { id: string; created_at: string };