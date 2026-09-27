'use client';

import React from 'react';
import Image from 'next/image';
import { DiningItem } from '@/types';
import { Modal } from '@/components/shared/Modal';
import { formatPrice } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import { X } from 'lucide-react';

interface DishDetailModalProps {
  item: DiningItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DishDetailModal({ item, isOpen, onClose }: DishDetailModalProps) {
  if (!item) return null;

  const orderMessage = `I'd like to order ${item.name} from The Table at Royal's Inn.`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name}>
      <div className="flex justify-between items-center p-4 border-b border-[var(--border)] sticky top-0 bg-[var(--bg)] z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-sm border border-gray-300">
            <div className={`w-3 h-3 rounded-full border ${item.isVeg ? 'border-green-600 bg-green-500' : 'border-red-600 bg-red-500'}`} />
          </div>
          <h2 className="text-xl font-bold">{item.name}</h2>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-muted)] transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative h-64 md:h-80 w-full md:w-1/2 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
            <Image 
              src={item.image || '/images/placeholder.jpg'} 
              alt={item.name} 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-between w-full md:w-1/2 py-2">
            <div>
              <p className="text-3xl font-bold text-[var(--primary)] mb-4">
                {formatPrice(item.price)}
              </p>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-[var(--fg-muted)] leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <a 
              href={buildWhatsAppLink(orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 bg-[#25D366] text-white text-center rounded-xl font-bold hover:bg-opacity-90 transition-colors shadow-sm"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
