'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants';
import { formatPrice } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import Modal from '@/components/shared/Modal';
import CuisineTabs from '@/components/dining/CuisineTabs';
import diningData from '@/data/dining.json';
import type { CuisineCategory, DishItem } from '@/types';

const categories = diningData as CuisineCategory[];

function DishCard({ dish, onViewDetails }: { dish: DishItem; onViewDetails: (d: DishItem) => void }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.article
      className="group overflow-hidden rounded-lg"
      style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
      variants={shouldReduce ? undefined : staggerItemVariants}
      whileHover={shouldReduce ? undefined : { y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <button
        className="relative block w-full overflow-hidden"
        style={{ aspectRatio: '1/1' }}
        onClick={() => onViewDetails(dish)}
        aria-label={`View details for ${dish.name}`}
      >
        <Image
          src={dish.image.replace('.jpg', '.svg')}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Veg indicator */}
        <span
          className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-sm border-2 text-xs font-bold"
          style={{
            backgroundColor: dish.isVeg ? '#22c55e' : '#ef4444',
            borderColor: dish.isVeg ? '#22c55e' : '#ef4444',
            color: '#fff',
          }}
          aria-label={dish.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
          title={dish.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
        >
          {dish.isVeg ? '●' : '●'}
        </span>
      </button>
      <div className="p-4">
        <button className="w-full text-left" onClick={() => onViewDetails(dish)}>
          <h3 className="font-medium text-sm hover:underline" style={{ color: 'var(--color-text-primary)' }}>{dish.name}</h3>
        </button>
        <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>{formatPrice(dish.price)}</p>
      </div>
    </motion.article>
  );
}

function DishDetailModal({ dish, isOpen, onClose }: { dish: DishItem | null; isOpen: boolean; onClose: () => void }) {
  if (!dish) return null;
  const waMsg = `Hi! I'd like to order ${dish.name} from The Table at Royal's Inn. Please confirm availability.`;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={dish.name}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <Image src={dish.image.replace('.jpg', '.svg')} alt={dish.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: dish.isVeg ? '#22c55e' : '#ef4444', color: '#fff' }}
        >
          {dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
        </span>
      </div>
      <div className="p-6">
        <p className="mb-1 text-2xl font-semibold" style={{ color: 'var(--color-accent)' }}>{formatPrice(dish.price)}</p>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{dish.description}</p>
        <a
          href={buildWhatsAppLink(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-[var(--duration-base)]"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-light)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent)'; }}
        >
          Order / Enquire via WhatsApp
        </a>
      </div>
    </Modal>
  );
}

export default function DiningPage() {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  const activeCategory = categories.find((c) => c.id === activeId);

  const handleSelect = (dish: DishItem) => { setSelectedDish(dish); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setTimeout(() => setSelectedDish(null), 350); };

  return (
    <>
      {/* Page header */}
      <div className="py-20 text-center" style={{ backgroundColor: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border)' }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>Our Restaurant</p>
        <h1 className="text-5xl font-semibold lg:text-6xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          The Table
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base" style={{ color: 'var(--color-text-muted)' }}>
          Authentic flavours from across India — freshly prepared, lovingly served.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Tabs */}
        <CuisineTabs categories={categories} activeId={activeId} onSelect={setActiveId} />

        {/* Category description */}
        {activeCategory && (
          <p className="mt-6 mb-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {activeCategory.description}
          </p>
        )}

        {/* Dish grid — animated on category switch */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeId}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              variants={shouldReduce ? undefined : staggerContainerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {activeCategory.items.map((dish) => 
              
             { 
              console.log(dish)
              return (
                <DishCard key={dish.id} dish={dish} onViewDetails={handleSelect} />
              )}
              
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DishDetailModal dish={selectedDish} isOpen={modalOpen} onClose={handleClose} />
    </>
  );
}
