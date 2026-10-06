'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants';
import SectionLabel from '@/components/shared/SectionLabel';
import siteConfig from '@/data/site.json';

export default function AboutTeaser() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-labelledby="about-teaser-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Text column */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={shouldReduce ? undefined : staggerItemVariants}>
              <SectionLabel 
                index={siteConfig.homePage.about.sectionLabel.index} 
                label={siteConfig.homePage.about.sectionLabel.label} 
                className="mb-6" 
              />
            </motion.div>

            <motion.h2
              id="about-teaser-heading"
              className="mb-6 text-4xl font-semibold leading-tight lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              variants={shouldReduce ? undefined : staggerItemVariants}
            >
              {siteConfig.homePage.about.heading}
            </motion.h2>

            {siteConfig.homePage.about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="mb-4 text-base leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
                variants={shouldReduce ? undefined : staggerItemVariants}
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              className="mt-8"
              variants={shouldReduce ? undefined : staggerItemVariants}
            >
              <Link
                href={siteConfig.homePage.about.linkUrl}
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-[var(--duration-base)] hover:gap-3"
                style={{ color: 'var(--color-accent)' }}
              >
                {siteConfig.homePage.about.linkText}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image column */}
          <motion.div
            className="relative"
            variants={shouldReduce ? undefined : fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div
              className="overflow-hidden rounded-lg"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <Image
                src={siteConfig.homePage.about.image}
                alt={siteConfig.homePage.about.imageAlt}
                width={800}
                height={600}
                className="h-auto w-full object-cover transition-transform duration-[var(--duration-slow)] hover:scale-[1.02]"
              />
            </div>

            {/* Accent number decoration */}
            <div
              className="absolute -left-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg-primary)',
                fontFamily: 'var(--font-display)',
              }}
              aria-hidden="true"
            >
              {siteConfig.googleRating}★
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
