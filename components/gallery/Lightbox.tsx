'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types';
import { motion } from 'framer-motion';
import { backdropVariants, modalVariants } from '@/lib/animationVariants';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev: number) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev: number) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleNext, handlePrev, onClose]);

  const currentImage = images[currentIndex];

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
        aria-label="Close Lightbox"
      >
        <X size={32} />
      </button>

      <div className="absolute top-6 left-6 text-white/70 font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      <motion.div 
        variants={modalVariants}
        className="relative w-full max-w-5xl aspect-video mx-4"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain"
          quality={90}
          priority
        />
        
        {currentImage.caption && (
          <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/90 text-sm">
            {currentImage.caption}
          </div>
        )}
      </motion.div>

      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition"
        aria-label="Previous image"
      >
        <ChevronLeft size={36} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition"
        aria-label="Next image"
      >
        <ChevronRight size={36} />
      </button>
    </motion.div>
  );
}
