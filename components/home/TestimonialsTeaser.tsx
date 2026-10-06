'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants';
import SectionLabel from '@/components/shared/SectionLabel';
import { formatReviewDate, getInitials } from '@/lib/utils';
import testimonialsData from '@/data/testimonials.json';
import siteConfig from '@/data/site.json';
import type { Testimonial } from '@/types';

const allTestimonials = testimonialsData as Testimonial[];
// Top 3: highest rated, then newest
const topThree = [...allTestimonials]
  .sort((a, b) => b.rating - a.rating || new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
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

export default function TestimonialsTeaser() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-labelledby="testimonials-teaser-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel 
              index={siteConfig.homePage.testimonials.sectionLabel.index} 
              label={siteConfig.homePage.testimonials.sectionLabel.label} 
              className="mb-4" 
            />
            <h2
              id="testimonials-teaser-heading"
              className="text-4xl font-semibold lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {siteConfig.homePage.testimonials.heading}
            </h2>
          </div>
          {/* Google rating badge */}
          <div className="flex flex-col items-end gap-3">
            <a
              href={siteConfig.googleProfileUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-[var(--duration-base)]"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-accent)',
                color: 'var(--color-text-primary)',
              }}
              aria-label={`Rated ${siteConfig.googleRating} stars on Google`}
            >
              <Star size={14} fill="var(--color-accent)" stroke="var(--color-accent)" aria-hidden="true" />
              <span>{siteConfig.googleRating}★ {siteConfig.homePage.testimonials.badgeText}</span>
            </a>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-[var(--duration-base)] hover:gap-3"
              style={{ color: 'var(--color-accent)' }}
            >
              {siteConfig.homePage.testimonials.linkText} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={shouldReduce ? undefined : staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {topThree.map((t) => (
            <motion.article
              key={t.id}
              className="flex flex-col gap-4 rounded-lg p-6"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
              variants={shouldReduce ? undefined : staggerItemVariants}
            >
              <StarRating rating={t.rating} />
              <p
                className="flex-1 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                &ldquo;{t.text.length > 160 ? `${t.text.slice(0, 157)}…` : t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg-primary)',
                  }}
                  aria-hidden="true"
                >
                  {getInitials(t.authorName)}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {t.authorName}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {formatReviewDate(t.date)}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
