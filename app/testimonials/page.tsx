'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants';
import { formatReviewDate, getInitials } from '@/lib/utils';
import testimonialsData from '@/data/testimonials.json';
import siteConfig from '@/data/site.json';
import type { Testimonial } from '@/types';

const allTestimonials = testimonialsData as Testimonial[];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? 'var(--color-accent)' : 'none'}
          stroke={i < rating ? 'var(--color-accent)' : 'var(--color-border-accent)'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

type SortKey = 'newest' | 'highest';

export default function TestimonialsPage() {
  const [sortKey, setSortKey] = useState<SortKey>('highest');
  const shouldReduce = useReducedMotion();

  const sorted = [...allTestimonials].sort((a, b) => {
    if (sortKey === 'highest') return b.rating - a.rating || new Date(b.date).getTime() - new Date(a.date).getTime();
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      {/* Page header */}
      <div className="py-20 text-center" style={{ backgroundColor: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border)' }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
          Guest Reviews
        </p>
        <h1 className="mb-4 text-5xl font-semibold lg:text-6xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          What Our Guests Say
        </h1>

        {/* Google rating badge */}
        <a
          href={siteConfig.googleProfileUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-[var(--duration-base)]"
          style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-accent)', color: 'var(--color-text-primary)' }}
          aria-label={`Royal's Inn is rated ${siteConfig.googleRating} stars on Google`}
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < Math.round(siteConfig.googleRating) ? 'var(--color-accent)' : 'none'} stroke="var(--color-accent)" aria-hidden="true" />
            ))}
          </div>
          <span>Rated {siteConfig.googleRating} on Google</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>↗</span>
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Sort controls */}
        <div className="mb-10 flex items-center gap-4">
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Sort by:</span>
          {(['highest', 'newest'] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-[var(--duration-fast)]"
              style={{
                backgroundColor: sortKey === key ? 'var(--color-accent)' : 'transparent',
                color: sortKey === key ? 'var(--color-bg-primary)' : 'var(--color-text-muted)',
                border: sortKey === key ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
              }}
            >
              {key === 'highest' ? 'Highest Rated' : 'Most Recent'}
            </button>
          ))}
        </div>

        {/* Review cards */}
        <motion.div
          className="columns-1 gap-6 sm:columns-2 lg:columns-3"
          variants={shouldReduce ? undefined : staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {sorted.map((t) => (
            <motion.article
              key={t.id}
              className="mb-6 break-inside-avoid rounded-lg p-6"
              style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
              variants={shouldReduce ? undefined : staggerItemVariants}
            >
              <StarRating rating={t.rating} />
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
                  aria-hidden="true"
                >
                  {getInitials(t.authorName)}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t.authorName}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {formatReviewDate(t.date)} · Google
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Attribution */}
        <p className="mt-12 text-center text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
          Reviews sourced from Google Business Profile. To leave a review, use the ★ button on this page.
        </p>
      </div>
    </>
  );
}
