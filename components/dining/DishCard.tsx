'use client';

import React from 'react';
import Image from 'next/image';
import { DiningItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import { staggerItem } from '@/lib/animationVariants';

interface DishCardProps {
  item: DiningItem;
  onOpenModal: (item: DiningItem) => void;
}

export default function DishCard({ item, onOpenModal }: DishCardProps) {
  return (
    <motion.div 
      variants={staggerItem}
      className="group flex flex-col bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <Image 
          src={item.image || '/images/placeholder.jpg'} 
          alt={item.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white p-1 rounded-sm shadow-sm">
          <div className={`w-3 h-3 rounded-full border ${item.isVeg ? 'border-green-600 bg-green-500' : 'border-red-600 bg-red-500'}`} />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold text-[var(--fg)] line-clamp-1" title={item.name}>{item.name}</h3>
          <span className="font-semibold text-[var(--primary)] whitespace-nowrap">{formatPrice(item.price)}</span>
        </div>
        
        <p className="text-sm text-[var(--fg-muted)] line-clamp-2 mb-4 flex-grow">
          {item.description}
        </p>

        <button 
          onClick={() => onOpenModal(item)}
          className="w-full py-2 border border-[var(--border)] text-[var(--fg)] rounded-lg text-sm font-medium hover:bg-[var(--bg-muted)] transition-colors"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}
