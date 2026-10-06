/**
 * Builds a WhatsApp deep-link URL.
 *
 * All "Book Now" / "Reserve" / "Contact" CTAs in this site route to WhatsApp,
 * never to an internal booking form. This utility is the single source of truth
 * for that URL construction — do not hardcode wa.me URLs in component files.
 *
 * @param message - Optional pre-filled message text. Pass null/undefined for a bare link.
 * @returns Full wa.me URL, e.g. "https://wa.me/919558784840?text=Hi%21..."
 */
export function buildWhatsAppLink(message?: string | null): string {
  const BASE = 'https://wa.me/919558784840';
  if (!message) return BASE;
  return `${BASE}?text=${encodeURIComponent(message)}`;
}

