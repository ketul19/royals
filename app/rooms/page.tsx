import { Metadata } from 'next';
import roomsData from '@/data/rooms.json';
import { RoomOption } from '@/types';
import RoomsPageClient from '@/components/rooms/RoomsPageClient';

export const metadata: Metadata = {
  title: 'Our Rooms & Stays | Royal\'s Inn',
  description: 'Explore our comfortable and luxurious rooms at Royal\'s Inn.',
};

export default function RoomsPage() {
  const rooms = roomsData as RoomOption[];

  return (
    <RoomsPageClient rooms={rooms} />
  );
}
