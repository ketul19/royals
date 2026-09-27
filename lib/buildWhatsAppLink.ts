/**
 * buildWhatsAppLink — single source of truth for all WhatsApp CTAs.
 * @param message Optional pre-filled message text. If omitted, opens bare WA link.
 * @param number  Optional override number (defaults to Royal's Inn WhatsApp number).
 */
export function buildWhatsAppLink(message?: string | null, number = "919558784840"): string {
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
