'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RoomOption } from '@/types';
import { Modal } from '@/components/shared/Modal';
import { Users, Bed, Check, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';

interface RoomDetailModalProps {
  room: RoomOption | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomDetailModal({ room, isOpen, onClose }: RoomDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  // Reset active image when modal opens for a new room
  React.useEffect(() => {
    if (isOpen) {
      setActiveImage(0);
    }
  }, [isOpen, room]);

  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Details for ${room.name}`}>
      <div className="flex justify-between items-center p-4 border-b border-[var(--border)] sticky top-0 bg-[var(--bg)] z-10">
        <h2 className="text-xl font-bold">{room.name}</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-muted)] transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="overflow-y-auto p-4 sm:p-6 custom-scrollbar">
        {/* Gallery */}
        <div className="mb-8">
          <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-gray-200 mb-3">
            <Image 
              src={room.images[activeImage] || '/images/placeholder.jpg'} 
              alt={room.name} 
              fill 
              className="object-cover"
            />
          </div>
          {room.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {room.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-[var(--primary)]' : 'border-transparent'}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-[var(--fg-muted)] leading-relaxed">{room.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-muted)] rounded-full text-sm">
                    <Check size={14} className="text-[var(--primary)]" />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)] h-fit">
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-[var(--fg-muted)]">Price</span>
              <p className="text-3xl font-bold text-[var(--primary)] mt-1">
                {formatPrice(room.pricePerNight)}<span className="text-base font-normal text-[var(--fg-muted)]">/{room.priceUnit}</span>
              </p>
            </div>
            
            <hr className="border-[var(--border)] my-4" />
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--fg-muted)]">
                  <Users size={18} /> <span>Max Guests</span>
                </div>
                <span className="font-medium">{room.maxGuests}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--fg-muted)]">
                  <Bed size={18} /> <span>Beds</span>
                </div>
                <span className="font-medium">{room.beds}</span>
              </div>
            </div>

            <a 
              href={buildWhatsAppLink(room.ctaMessage || `Hi, I am interested in ${room.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-[var(--accent)] text-white text-center rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
