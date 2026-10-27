export interface NearbyLocation {
  /** Icon key — maps to a lucide-react icon in NearbyLocations component */
  icon: 'train' | 'graduationCap' | 'wheat' | 'umbrella' | 'plane' | 'bus' | 'building';
  /** Highlighted distance or time value, e.g. "10 Min" or "2 Km" */
  value: string;
  /** Descriptor label shown below the value */
  label: string;
  /**
   * When true: value rendered extra-large in display font with accent colour +
   * a distinct highlighted card style. When false: normal card style.
   */
  highlight: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  /** Path to SVG asset for the logo (e.g. "/images/logo.svg") */
  logoSvgPath: string;
  address: string;
  /** Display-formatted phone number, e.g. "+91 95587 84840" */
  phone: string;
  /** International digits only, no spaces or symbols, e.g. "919558784840" */
  whatsappNumber: string;
  googleRating: number;
  /**
   * Deep-link to "leave a review" on the Google Business Profile.
   * null until client provides the URL.
   * IMPORTANT: This is a link OUT to Google — the site does not capture reviews itself.
   */
  googleReviewUrl: string | null;
  /** Link to the Google Business Profile listing (for the rating badge) */
  googleProfileUrl: string | null;
  /** Short Google Maps URL for the property — used in "View Map" buttons */
  googleMapsUrl: string;
  socials: {
    platform: 'instagram' | 'facebook' | 'twitter' | 'youtube';
    url: string;
  }[];
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  /** Nearby landmarks section — shared between Home and About pages */
  nearbyLocations: {
    sectionLabel: { index: string; label: string };
    heading: string;
    description: string;
    locations: NearbyLocation[];
  };
  homePage: {
    hero: {
      sectionLabel: { index: string; label: string };
      words: string[];
      accentWord: string;
      backgroundImage: string;
      imageAlt: string;
      ctaText: string;
      ctaMessage: string;
    };
    about: {
      sectionLabel: { index: string; label: string };
      heading: string;
      paragraphs: string[];
      image: string;
      imageAlt: string;
      linkText: string;
      linkUrl: string;
    };
    rooms: {
      sectionLabel: { index: string; label: string };
      heading: string;
      linkText: string;
      viewDetailsText: string;
      bookText: string;
      guestsLabel: string;
      guestLabel: string;
      bedsLabel: string;
      bedLabel: string;
      categoryColors: Record<string, string>;
    };
    dining: {
      sectionLabel: { index: string; label: string };
      heading: string;
      description: string;
      linkText: string;
    };
    gallery: {
      sectionLabel: { index: string; label: string };
      heading: string;
      linkText: string;
    };
    testimonials: {
      sectionLabel: { index: string; label: string };
      heading: string;
      badgeText: string;
      linkText: string;
    };
    location: {
      sectionLabel: { index: string; label: string };
      heading: string;
      whatsappButtonText: string;
      whatsappMessage: string;
      viewMapText: string;
      mapPlaceholderPrimary: string;
      mapPlaceholderSecondary: string;
    };
  };
}
