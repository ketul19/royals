// TypeScript interfaces for all data domains
// These must match /data/*.json shapes exactly

export interface SiteConfig {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  googleRating: number;
  googleReviewUrl: string | null;
  googleProfileUrl: string | null;
  socials: { platform: 'instagram' | 'facebook' | 'twitter' | 'youtube'; url: string }[];
  mapCoordinates: { lat: number; lng: number };
}

export interface NavItem {
  label: string;
  href: string;
}

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
  ctaMessage: string | null;
}

export interface DiningItem {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
  description: string;
  image: string;
}

export interface CuisineCategory {
  id: string;
  name: string;
  description: string;
  items: DiningItem[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  images: GalleryImage[];
}

export interface GalleryTab {
  id: 'events' | 'spaces';
  label: string;
  categories: GalleryCategory[];
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorPhotoUrl?: string | null;
  rating: number;
  text: string;
  date: string;
  source: 'google';
}

export interface ChatRule {
  keywords: string[];
  response: string;
}

export interface ChatbotConfig {
  welcomeMessage: string;
  fallbackResponse: string;
  quickReplies: string[];
  rules: ChatRule[];
}
