import { Metadata } from 'next';
import diningData from '@/data/dining.json';
import { CuisineCategory } from '@/types';
import DiningPageClient from '@/components/dining/DiningPageClient';

export const metadata: Metadata = {
  title: 'The Table | Royal\'s Inn',
  description: 'Experience Flavours of India, Served with Heart at The Table.',
};

export default function DiningPage() {
  const categories = diningData as CuisineCategory[];

  return (
    <DiningPageClient categories={categories} />
  );
}
