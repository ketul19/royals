'use client';

import React from 'react';
import Image from 'next/image';
import { RoomOption } from '@/types';
import { Users, Bed } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import { motion } from 'framer-motion';
import { staggerItem } from '@/lib/animationVariants';

interface RoomCardProps {
  room: RoomOption;
  onOpenModal: (room: RoomOption) => void;
}

export default function RoomCard({ room, onOpenModal }: RoomCardProps) {
  const mainImage = room.images[0] || '/images/placeholder.jpg';

  return (
    <motion.div 
      variants={staggerItem}
      className="group flex flex-col bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        <Image 
          src={mainImage} 
          alt={room.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
            {room.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-[var(--fg)]">{room.name}</h3>
        <p className="text-2xl font-semibold mb-4 text-[var(--primary)]">
          {formatPrice(room.pricePerNight)}<span className="text-sm font-normal text-[var(--fg-muted)]">/{room.priceUnit}</span>
        </p>
        
        <div className="flex items-center gap-4 text-sm text-[var(--fg-muted)] mb-4">
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>Up to {room.maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed size={16} />
            <span>{room.beds} {room.beds === 1 ? 'bed' : 'beds'}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs px-2.5 py-1 bg-[var(--bg-muted)] text-[var(--fg-muted)] rounded-md">
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs px-2.5 py-1 bg-[var(--bg-muted)] text-[var(--fg-muted)] rounded-md">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <button 
            onClick={() => onOpenModal(room)}
            className="flex-1 py-2.5 border border-[var(--border)] text-[var(--fg)] rounded-lg font-medium hover:bg-[var(--bg-muted)] transition-colors"
          >
            View Details
          </button>
          <a 
            href={buildWhatsAppLink(room.ctaMessage || `Hi, I am interested in ${room.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-[var(--accent)] text-white text-center rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}
