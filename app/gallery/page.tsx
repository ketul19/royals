'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants, overlayVariants } from '@/lib/animationVariants';
import galleryData from '@/data/gallery.json';
import type { GalleryTab, GalleryCategory, GalleryImage } from '@/types';

const tabs = galleryData as GalleryTab[];

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: GalleryImage[];
  startIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

function Lightbox({ images, startIndex, isOpen, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);

  // Sync start index
  useEffect(() => { setCurrent(startIndex); }, [startIndex]);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, prev, next]);

  if (!isOpen || images.length === 0) return null;

  const img = images[current];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {/* Nav prev */}
          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Image */}
          <motion.div
            className="relative mx-16 max-h-[85vh] max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1200}
              height={800}
              className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain"
              priority
            />
            {img.caption && (
              <p className="mt-3 text-center text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {img.caption}
              </p>
            )}
          </motion.div>

          {/* Nav next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <span
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              {current + 1} / {images.length}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Gallery Page ──────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id ?? 'events');
  const [activeCat, setActiveCat] = useState<string>('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxStart, setLightboxStart] = useState(0);
  const shouldReduce = useReducedMotion();

  const currentTab = tabs.find((t) => t.id === activeTab);

  // Filter out categories with empty images (null-safety requirement)
  const validCategories = (currentTab?.categories ?? []).filter(
    (cat): cat is GalleryCategory => !!cat && cat.images.length > 0,
  );

  // When tab changes, reset to first valid category
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    const tab = tabs.find((t) => t.id === id);
    const firstValid = (tab?.categories ?? []).find((c) => c.images.length > 0);
    setActiveCat(firstValid?.id ?? '');
  };

  useEffect(() => {
    setActiveCat(validCategories[0]?.id ?? '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const activeCatObj = validCategories.find((c) => c.id === activeCat);
  const displayImages = activeCatObj?.images ?? [];

  const openLightbox = (images: GalleryImage[], index: number) => {
    setLightboxImages(images);
    setLightboxStart(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Page header */}
      <div className="py-20 text-center" style={{ backgroundColor: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border)' }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>Visual Tour</p>
        <h1 className="text-5xl font-semibold lg:text-6xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          Gallery
        </h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top-level tabs (Events / Spaces) */}
        <div className="mb-8 flex gap-4 border-b" style={{ borderColor: 'var(--color-border)' }} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={tab.id === activeTab}
              onClick={() => handleTabChange(tab.id)}
              className="pb-3 text-sm font-semibold transition-all duration-[var(--duration-base)]"
              style={{
                color: tab.id === activeTab ? 'var(--color-accent)' : 'var(--color-text-muted)',
                borderBottom: tab.id === activeTab ? '2px solid var(--color-accent)' : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category pills — only show categories with images */}
        {validCategories.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {validCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-[var(--duration-base)]"
                style={{
                  backgroundColor: cat.id === activeCat ? 'var(--color-accent)' : 'transparent',
                  color: cat.id === activeCat ? 'var(--color-bg-primary)' : 'var(--color-accent)',
                  border: '1px solid var(--color-accent)',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Image grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${activeCat}`}
            className="columns-2 gap-4 sm:columns-3 lg:columns-3"
            variants={shouldReduce ? undefined : staggerContainerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {displayImages.map((img, i) => (
              <motion.div
                key={i}
                className="group mb-4 break-inside-avoid overflow-hidden rounded-lg"
                variants={shouldReduce ? undefined : staggerItemVariants}
              >
                <button
                  className="relative block w-full overflow-hidden text-left"
                  onClick={() => openLightbox(displayImages, i)}
                  aria-label={`Open lightbox: ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={i % 3 === 0 ? 750 : 450}
                    className="w-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-3 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
                  >
                    {img.caption && (
                      <span className="text-xs font-medium" style={{ color: '#fff' }}>{img.caption}</span>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {displayImages.length === 0 && (
          <p className="py-20 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            No images in this category yet — please check back soon.
          </p>
        )}
      </div>

      <Lightbox
        images={lightboxImages}
        startIndex={lightboxStart}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
