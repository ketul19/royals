'use client';

import Image from 'next/image';
import { GalleryImage } from '@/types';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animationVariants';

interface MasonryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function MasonryGrid({ images, onImageClick }: MasonryGridProps) {
  return (
    <motion.div 
      className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {images.map((img, idx) => (
        <motion.article 
          key={idx}
          variants={staggerItem}
          className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group"
          onClick={() => onImageClick(idx)}
        >
          <div className="relative w-full aspect-[4/3] bg-zinc-800">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          {img.caption && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-sm">{img.caption}</span>
            </div>
          )}
        </motion.article>
      ))}
    </motion.div>
  );
}
