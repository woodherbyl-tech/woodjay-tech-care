import { createServerFn } from "@tanstack/react-start";

const ACCOUNT = "accounts/112697315423357188616";
const LOCATION = "locations/12827823259337579020";
const GATEWAY = "https://connector-gateway.lovable.dev/google_business_profile";
const STARS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

export type GoogleReview = { id: string; name: string; rating: number; comment: string; createdAt: string };
export type GoogleReviewsResult = { reviewUrl: string | null; reviews: GoogleReview[]; average: number | null; total: number };

let cache: { at: number; value: GoogleReviewsResult } | null = null;

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(async (): Promise<GoogleReviewsResult> => {
  if (cache && Date.now() - cache.at < 10 * 60 * 1000) return cache.value;
  const empty: GoogleReviewsResult = { reviewUrl: null, reviews: [], average: null, total: 0 };
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const gbpKey = process.env["GOOGLE_BUSINESS_PROFILE_API_KEY"];
  if (!lovableKey || !gbpKey) return empty;
  const headers = { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": gbpKey };
  try {
    const metaRes = await fetch(`${GATEWAY}/business_information/v1/${LOCATION}?readMask=metadata`, { headers });
    let reviewUrl: string | null = null;
    if (metaRes.ok) {
      const meta = (await metaRes.json()) as { metadata?: { newReviewUri?: string; placeId?: string } };
      reviewUrl = meta.metadata?.newReviewUri ?? (meta.metadata?.placeId ? `https://search.google.com/local/writereview?placeid=${meta.metadata.placeId}` : null);
    } else {
      console.error(`Google location read failed [${metaRes.status}]: ${await metaRes.text()}`);
    }
    const revRes = await fetch(`${GATEWAY}/my_business/v4/${ACCOUNT}/${LOCATION}/reviews?pageSize=50`, { headers });
    let reviews: GoogleReview[] = [];
    let average: number | null = null;
    let total = 0;
    if (revRes.ok) {
      const body = (await revRes.json()) as {
        reviews?: { reviewId: string; reviewer?: { displayName?: string }; starRating?: string; comment?: string; createTime?: string }[];
        averageRating?: number;
        totalReviewCount?: number;
      };
      reviews = (body.reviews ?? []).map((r) => ({
        id: r.reviewId,
        name: r.reviewer?.displayName ?? "Google user",
        rating: STARS[r.starRating ?? ""] ?? 0,
        comment: (r.comment ?? "").split("(Translated by Google)")[0].trim(),
        createdAt: r.createTime ?? "",
      }));
      average = body.averageRating ?? null;
      total = body.totalReviewCount ?? reviews.length;
    } else {
      console.error(`Google reviews read failed [${revRes.status}]: ${await revRes.text()}`);
    }
    const value = { reviewUrl, reviews, average, total };
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    console.error("Google reviews unavailable", err);
    return empty;
  }
});
