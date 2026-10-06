import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import AboutTeaser from '@/components/home/AboutTeaser';
import RoomsTeaser from '@/components/home/RoomsTeaser';
import DiningTeaser from '@/components/home/DiningTeaser';
import GalleryTeaser from '@/components/home/GalleryTeaser';
import TestimonialsTeaser from '@/components/home/TestimonialsTeaser';
import LocationTeaser from '@/components/home/LocationTeaser';

export const metadata: Metadata = {
  title: "Royal's Inn Hotel & Hostel | Navsari, Gujarat",
  description:
    "Royal's Inn is a premier hotel and hostel in Navsari, Gujarat. Offering comfortable AC rooms, budget accommodation, and a full-service restaurant. Book directly via WhatsApp.",
  openGraph: {
    title: "Royal's Inn Hotel & Hostel | Navsari, Gujarat",
    description: "Hotel & Hostel in Navsari. AC rooms from ₹1,800/night. Hostel beds from ₹350/bed. Restaurant, event spaces, and warm Gujarat hospitality.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <RoomsTeaser />
      <DiningTeaser />
      <GalleryTeaser />
      <TestimonialsTeaser />
      <LocationTeaser />
    </>
  );
}
