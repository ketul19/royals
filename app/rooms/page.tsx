'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { groupBy } from '@/lib/utils';
import { RoomSection, RoomDetailModal } from '@/components/rooms/RoomComponents';
import roomsData from '@/data/rooms.json';
import type { RoomOption } from '@/types';

const rooms = roomsData as RoomOption[];
const CATEGORY_ORDER: RoomOption['category'][] = ['AC', 'Non-AC', 'Hostel'];

function RoomsPageClient() {
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const grouped = groupBy(rooms, (r) => r.category);

  const handleSelect = (room: RoomOption) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    // Note: selectedRoom is kept in state during exit animation, cleared after
    setTimeout(() => setSelectedRoom(null), 350);
  };

  return (
    <>
      {/* Page header */}
      <div
        className="py-20 text-center"
        style={{ backgroundColor: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border)' }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
          Accommodation
        </p>
        <h1
          className="text-5xl font-semibold lg:text-6xl"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Rooms &amp; Hostel
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base" style={{ color: 'var(--color-text-muted)' }}>
          From premium AC suites to affordable hostel beds — find your perfect stay at Royal&apos;s Inn.
        </p>
      </div>

      {/* Sections by category */}
      <div
        className="divide-y"
        style={{ '--tw-divide-color': 'var(--color-border)' } as React.CSSProperties}
      >
        {CATEGORY_ORDER.map((cat) => {
          const catRooms = grouped[cat];
          if (!catRooms?.length) return null;
          return (
            <RoomSection
              key={cat}
              category={cat}
              rooms={catRooms}
              onSelectRoom={handleSelect}
            />
          );
        })}
      </div>

      {/* Single shared modal instance */}
      <RoomDetailModal room={selectedRoom} isOpen={modalOpen} onClose={handleClose} />
    </>
  );
}

export default function RoomsPage() {
  return <RoomsPageClient />;
}
