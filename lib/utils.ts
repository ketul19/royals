/**
 * General utility functions for Royal's Inn website.
 */

/** Format price in Indian Rupee notation */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Sort testimonials by date descending (newest first) */
export function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Sort testimonials by rating descending */
export function sortByRating<T extends { rating: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.rating - a.rating);
}

/** Format a date string to a human-readable format */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
  }).format(new Date(dateString));
}

/** Generate a Google Maps directions URL */
export function buildMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Check if we're in a browser environment */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
