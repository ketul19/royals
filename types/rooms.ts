export interface RoomOption {
  id: string;
  category: 'AC' | 'Non-AC' | 'Hostel';
  name: string;
  pricePerNight: number;
  priceUnit: 'per room' | 'per bed';
  maxGuests: number;
  beds: number;
  description: string;
  amenities: string[];
  images: string[];
  /**
   * Pre-filled WhatsApp text specific to this room, or null to use the base wa.me link.
   * See lib/buildWhatsAppLink.ts for URL construction logic.
   */
  ctaMessage: string | null;
}

