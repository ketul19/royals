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
  /**
   * Null-safety rule: any category whose `images` array is empty,
   * or whose category object is missing/null, must not render its pill/tab at all.
   * Filter before rendering — never show empty tabs.
   */
  categories: GalleryCategory[];
}

