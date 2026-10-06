'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants';
import SectionLabel from '@/components/shared/SectionLabel';
import { formatPrice } from '@/lib/utils';
import diningData from '@/data/dining.json';
import siteConfig from '@/data/site.json';
import type { CuisineCategory } from '@/types';

const categories = diningData as CuisineCategory[];
// Show one featured dish from each of the first 3 categories
const featuredDishes = categories.slice(0, 3).map((cat) => ({
  category: cat.name,
  dish: cat.items[0],
}));

export default function DiningTeaser() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-labelledby="dining-teaser-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel 
              index={siteConfig.homePage.dining.sectionLabel.index} 
              label={siteConfig.homePage.dining.sectionLabel.label} 
              className="mb-4" 
            />
            <h2
              id="dining-teaser-heading"
              className="text-4xl font-semibold lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {siteConfig.homePage.dining.heading}
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {siteConfig.homePage.dining.description}
            </p>
          </div>
          <Link
            href="/dining"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-[var(--duration-base)] hover:gap-3"
            style={{ color: 'var(--color-accent)' }}
          >
            {siteConfig.homePage.dining.linkText} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          variants={shouldReduce ? undefined : staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {featuredDishes.map(({ category, dish }) => (
            <motion.article
              key={dish.id}
              className="group overflow-hidden rounded-lg"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
              variants={shouldReduce ? undefined : staggerItemVariants}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Veg indicator */}
                <span
                  className="absolute left-3 top-3 h-4 w-4 rounded-sm border-2"
                  style={{
                    backgroundColor: dish.isVeg ? '#22c55e' : '#ef4444',
                    borderColor: dish.isVeg ? '#22c55e' : '#ef4444',
                  }}
                  title={dish.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
                  aria-label={dish.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
                />
                {/* Category badge */}
                <span
                  className="absolute bottom-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'rgba(13,13,13,0.85)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{dish.name}</h3>
                <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                  {formatPrice(dish.price)}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
