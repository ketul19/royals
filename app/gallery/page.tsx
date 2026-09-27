import galleryData from '@/data/gallery.json';
import { GalleryPageClient } from '@/components/gallery/GalleryPageClient';
import { GalleryTab } from '@/types';

export const metadata = {
  title: "Gallery | Royal's Inn",
  description: "Explore our beautiful rooms, events, and amenities.",
};

export default function GalleryPage() {
  // Ensure the type cast matches the structure of galleryData
  const tabs = (galleryData as any) as GalleryTab[];
  // Handle case where id is different like 'tab-events'
  const formattedTabs = tabs.map(tab => ({
    ...tab,
    id: tab.id.replace('tab-', '') as 'events' | 'spaces'
  }));

  return <GalleryPageClient tabs={formattedTabs} />;
}
