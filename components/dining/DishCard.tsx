'use client';

/**
 * DishCard — individual menu item card.
 * Displays thumbnail, veg/non-veg indicator (green/red dot), name, price,
 * and a short description. Clicking the card or "Details" button fires the
 * onViewDetails callback, which opens the DishDetailModal in the page.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerItemVariants } from '@/lib/animationVariants';
import type { DishItem } from '@/types';

interface DishCardProps {
  dish: DishItem;
  onViewDetails: (dish: DishItem) => void;
}

/** Formats a price in INR without a network call — simple locale formatter. */
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DishCard({ dish, onViewDetails }: DishCardProps) {
  return (
    <motion.article
      variants={staggerItemVariants}
      layout
      className="
        group relative flex flex-col overflow-hidden rounded-xl
        cursor-pointer focus-within:ring-2 focus-within:ring-[var(--color-accent)]
      "
      style={{
        backgroundColor: 'var(--color-bg-card)',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--color-border)',
      }}
      onClick={() => onViewDetails(dish)}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
        />

        {/* Veg / Non-veg indicator — top-right corner */}
        <span
          role="img"
          aria-label={dish.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
          className="
            absolute top-2 right-2 w-5 h-5 rounded-sm flex items-center justify-center
          "
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            border: `1.5px solid ${dish.isVeg ? '#22c55e' : '#ef4444'}`,
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: dish.isVeg ? '#22c55e' : '#ef4444' }}
          />
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-display text-base font-semibold leading-snug"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            {dish.name}
          </h3>
          <span
            className="shrink-0 text-sm font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            {formatPrice(dish.price)}
          </span>
        </div>

        <p
          className="text-sm leading-relaxed line-clamp-2 flex-1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {dish.description}
        </p>

        {/* Details button — prevents propagation so the onClick on article doesn't double-fire */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(dish);
          }}
          className="
            mt-auto self-start text-xs font-medium px-3 py-1.5 rounded-full
            transition-colors duration-[var(--duration-fast)]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[var(--color-accent)]
          "
          style={{
            color: 'var(--color-accent)',
            border: '1px solid var(--color-accent)',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-bg-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
          }}
          aria-label={`View details for ${dish.name}`}
        >
          Details
        </button>
      </div>
    </motion.article>
  );
}
