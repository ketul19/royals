/**
 * A curated review from Google Business Profile.
 *
 * Content-maintenance note: Copy actual review text from the Google Business Profile
 * periodically. This is a manual content task, not a technical limitation of the site.
 *
 * Upgrade path (for future reference):
 * To auto-sync live reviews, introduce a minimal serverless function (e.g. Vercel Edge
 * Function) as a secure proxy to the Google Places API. This is the only safe way to
 * call that API without exposing the key client-side. Out of scope for this no-backend build.
 */
export interface Testimonial {
  id: string;
  authorName: string;
  /** Photo URL. If null/undefined, render a generated avatar initials placeholder. */
  authorPhotoUrl?: string | null;
  /** Star rating 1–5 */
  rating: number;
  text: string;
  /** ISO 8601 date string, used for newest-first sorting */
  date: string;
  source: 'google';
}

