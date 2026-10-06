'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Users, Bed, Check, ChevronLeft, ChevronRight, X, MessageCircle } from 'lucide-react';
import Modal from '@/components/shared/Modal';
import { formatPrice } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants';
import type { RoomOption } from '@/types';

// ── Room Card ─────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  AC: 'var(--color-accent)',
  'Non-AC': '#7eb8c4',
  Hostel: '#a078c4',
};

interface RoomCardProps {
  room: RoomOption;
  onViewDetails: (room: RoomOption) => void;
}

export function RoomCard({ room, onViewDetails }: RoomCardProps) {
  const shouldReduce = useReducedMotion();
  const imgSrc = room.images[0];

  return (
    <motion.article
      className="group overflow-hidden rounded-lg"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
      variants={shouldReduce ? undefined : staggerItemVariants}
      whileHover={shouldReduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Image */}
      <button
        className="relative block w-full overflow-hidden text-left"
        style={{ aspectRatio: '4/3' }}
        onClick={() => onViewDetails(room)}
        aria-label={`View details for ${room.name}`}
      >
        <Image
          src={imgSrc}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            backgroundColor: 'rgba(13,13,13,0.85)',
            color: CATEGORY_COLORS[room.category] ?? 'var(--color-accent)',
            border: `1px solid ${CATEGORY_COLORS[room.category] ?? 'var(--color-accent)'}`,
          }}
        >
          {room.category}
        </span>
      </button>

      <div className="p-5">
        <button
          className="w-full text-left"
          onClick={() => onViewDetails(room)}
          aria-label={`View details for ${room.name}`}
        >
          <h3
            className="mb-1 text-xl font-semibold hover:underline"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {room.name}
          </h3>
        </button>

        <p className="mb-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <span className="text-lg font-semibold" style={{ color: 'var(--color-accent)' }}>
            {formatPrice(room.pricePerNight)}
          </span>
          {' '}/ {room.priceUnit}
        </p>

        <div className="mb-3 flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span className="flex items-center gap-1"><Users size={12} aria-hidden="true" /> {room.maxGuests} guests</span>
          <span className="flex items-center gap-1"><Bed size={12} aria-hidden="true" /> {room.beds} {room.beds === 1 ? 'bed' : 'beds'}</span>
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((a) => (
            <span key={a} className="rounded-full px-2.5 py-0.5 text-xs"
              style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
              {a}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(room)}
            className="flex-1 rounded-md py-2 text-center text-sm font-medium transition-all duration-[var(--duration-base)]"
            style={{ border: '1px solid var(--color-border-accent)', color: 'var(--color-accent)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-border-accent)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
          >
            View Details
          </button>
          <a
            href={buildWhatsAppLink(room.ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-4 py-2 text-sm font-medium transition-all duration-[var(--duration-base)]"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-light)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent)'; }}
          >
            Book
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ── Room Detail Modal ─────────────────────────────────────────────────────────

interface RoomDetailModalProps {
  room: RoomOption | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RoomDetailModal({ room, isOpen, onClose }: RoomDetailModalProps) {
  const [imgIndex, setImgIndex] = useState(0);

  if (!room) return null;

  const images = room.images.map((img) => img);
  const prev = () => setImgIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIndex((i) => (i + 1) % images.length);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={room.name}>
      {/* Image gallery */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={imgIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={images[imgIndex]}
              alt={`${room.name} — image ${imgIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(13,13,13,0.7)', color: 'var(--color-text-primary)' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(13,13,13,0.7)', color: 'var(--color-text-primary)' }}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
            <span
              className="absolute bottom-3 right-3 rounded-full px-2 py-0.5 text-xs"
              style={{ backgroundColor: 'rgba(13,13,13,0.7)', color: 'var(--color-text-primary)' }}
            >
              {imgIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <span className="text-2xl font-semibold" style={{ color: 'var(--color-accent)' }}>
            {formatPrice(room.pricePerNight)}
          </span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>/ {room.priceUnit}</span>
          <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <Users size={14} aria-hidden="true" /> {room.maxGuests} guests
          </span>
          <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <Bed size={14} aria-hidden="true" /> {room.beds} {room.beds === 1 ? 'bed' : 'beds'}
          </span>
        </div>

        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {room.description}
        </p>

        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
          Amenities
        </h4>
        <ul className="mb-6 grid grid-cols-2 gap-2">
          {room.amenities.map((a) => (
            <li key={a} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <Check size={12} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>

        <a
          href={buildWhatsAppLink(room.ctaMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-[var(--duration-base)]"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-light)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent)'; }}
        >
          <MessageCircle size={16} aria-hidden="true" />
          Book This Room via WhatsApp
        </a>
      </div>
    </Modal>
  );
}

// ── Room Section ──────────────────────────────────────────────────────────────

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  AC: 'Climate-controlled comfort for the discerning traveller',
  'Non-AC': 'Clean, comfortable value accommodation with all the essentials',
  Hostel: 'Social, affordable, and always welcoming — our hostel wing',
};

interface RoomSectionProps {
  category: RoomOption['category'];
  rooms: RoomOption[];
  onSelectRoom: (room: RoomOption) => void;
}

export function RoomSection({ category, rooms, onSelectRoom }: RoomSectionProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-16"
      aria-labelledby={`room-section-${category.toLowerCase().replace(' ', '-')}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            id={`room-section-${category.toLowerCase().replace(' ', '-')}`}
            className="text-3xl font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {category} Rooms
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={shouldReduce ? undefined : staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onViewDetails={onSelectRoom} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
