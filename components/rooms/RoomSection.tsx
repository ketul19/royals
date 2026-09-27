'use client';

import React from 'react';
import { RoomOption } from '@/types';
import RoomCard from './RoomCard';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animationVariants';

interface RoomSectionProps {
  category: 'AC' | 'Non-AC' | 'Hostel';
  rooms: RoomOption[];
  onOpenModal: (room: RoomOption) => void;
}

export default function RoomSection({ category, rooms, onOpenModal }: RoomSectionProps) {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">{category} Rooms</h2>
        <hr className="border-[var(--border)]" />
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} onOpenModal={onOpenModal} />
        ))}
      </motion.div>
    </section>
  );
}
