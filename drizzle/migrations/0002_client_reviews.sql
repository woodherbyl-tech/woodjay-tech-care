CREATE TABLE public.client_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 80),
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL CHECK (char_length(btrim(comment)) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.client_reviews TO anon, authenticated;
GRANT ALL ON public.client_reviews TO service_role;
ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can read published reviews" ON public.client_reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Visitors can submit valid reviews" ON public.client_reviews FOR INSERT TO anon, authenticated WITH CHECK (rating BETWEEN 1 AND 5 AND char_length(btrim(display_name)) BETWEEN 1 AND 80 AND char_length(btrim(comment)) BETWEEN 1 AND 2000);
CREATE INDEX client_reviews_created_at_idx ON public.client_reviews (created_at DESC);