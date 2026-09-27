'use client';

import React, { useState } from 'react';
import { RoomOption } from '@/types';
import RoomSection from './RoomSection';
import RoomDetailModal from './RoomDetailModal';
import { motion } from 'framer-motion';
import { heroLetter, heroWords } from '@/lib/animationVariants';

interface RoomsPageClientProps {
  rooms: RoomOption[];
}

export default function RoomsPageClient({ rooms }: RoomsPageClientProps) {
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null);

  const acRooms = rooms.filter(room => room.category === 'AC');
  const nonAcRooms = rooms.filter(room => room.category === 'Non-AC');
  const hostelRooms = rooms.filter(room => room.category === 'Hostel');

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="z-20 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={heroWords}
            initial="hidden"
            animate="visible"
          >
            {'Our Rooms & Stays'.split('').map((char, index) => (
              <motion.span key={index} variants={heroLetter} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Experience comfort and luxury tailored to your needs.
          </p>
        </div>
      </section>

      {/* Room Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24">
        {acRooms.length > 0 && (
          <RoomSection 
            category="AC" 
            rooms={acRooms} 
            onOpenModal={setSelectedRoom} 
          />
        )}
        {nonAcRooms.length > 0 && (
          <RoomSection 
            category="Non-AC" 
            rooms={nonAcRooms} 
            onOpenModal={setSelectedRoom} 
          />
        )}
        {hostelRooms.length > 0 && (
          <RoomSection 
            category="Hostel" 
            rooms={hostelRooms} 
            onOpenModal={setSelectedRoom} 
          />
        )}
      </div>

      {/* Shared Modal */}
      <RoomDetailModal 
        room={selectedRoom} 
        isOpen={!!selectedRoom} 
        onClose={() => setSelectedRoom(null)} 
      />
    </div>
  );
}
