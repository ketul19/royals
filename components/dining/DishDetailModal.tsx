'use client';

/**
 * DishDetailModal — full-detail overlay for a selected menu item.
 * Wraps the shared Modal base component with dish-specific content:
 * large image, veg indicator, price, full description, and a WhatsApp
 * order/enquiry CTA using buildWhatsAppLink.
 */

import Image from 'next/image';
import Modal from '@/components/shared/Modal';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import type { DishItem } from '@/types';
import { MessageCircle } from 'lucide-react';

interface DishDetailModalProps {
  dish: DishItem | null;
  isOpen: boolean;
  onClose: () => void;
}

/** Formats a price in INR — same formatter as DishCard, defined locally to keep the
 *  modal self-contained. */
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DishDetailModal({ dish, isOpen, onClose }: DishDetailModalProps) {
  if (!dish) return null;

  const whatsappUrl = buildWhatsAppLink(
    `Hi! I'd like to order ${dish.name} from The Table at Royal's Inn.`
  );
console.log(dish)
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={dish.name}>
      {/* ── Hero image ── */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col gap-5 p-6">
        {/* Name + badge row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Veg / Non-veg badge */}
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: `1.5px solid ${dish.isVeg ? '#22c55e' : '#ef4444'}`,
              color: dish.isVeg ? '#22c55e' : '#ef4444',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: dish.isVeg ? '#22c55e' : '#ef4444' }}
            />
            {dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          </span>

          {/* Price */}
          <span
            className="ml-auto text-xl font-bold"
            style={{ color: 'var(--color-accent)' }}
          >
            {formatPrice(dish.price)}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {dish.description}
        </p>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2.5
            w-full py-3 px-6 rounded-full
            text-sm font-semibold
            transition-colors duration-[var(--duration-fast)]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[var(--color-accent)]
          "
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              'var(--color-accent-light)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              'var(--color-accent)';
          }}
          aria-label={`Order ${dish.name} on WhatsApp`}
        >
          <MessageCircle size={18} aria-hidden="true" />
          Order / Enquire on WhatsApp
        </a>
      </div>
    </Modal>
  );
}
