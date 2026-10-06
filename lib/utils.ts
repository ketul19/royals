/** Format a number as Indian Rupees, e.g. 1800 → "₹1,800" */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Get initials from a name for avatar placeholders, e.g. "Priya Sharma" → "PS" */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/** Format an ISO date string to a human-readable string, e.g. "2024-11-15" → "November 2024" */
export function formatReviewDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
  });
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Check if a string matches any keyword (case-insensitive) */
export function matchesKeywords(input: string, keywords: string[]): boolean {
  const lower = input.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

/** Group an array by a key function */
export function groupBy<T, K extends string>(
  items: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
}

