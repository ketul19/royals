'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants';
import SectionLabel from '@/components/shared/SectionLabel';
import galleryData from '@/data/gallery.json';
import siteConfig from '@/data/site.json';
import type { GalleryTab, GalleryImage } from '@/types';

const tabs = galleryData as GalleryTab[];

// Pick 6 preview images from different categories
const previewImages: GalleryImage[] = [];
tabs.forEach((tab) => {
  tab.categories.forEach((cat) => {
    if (cat.images.length > 0 && previewImages.length < 6) {
      previewImages.push(cat.images[0]);
      if (cat.images[1] && previewImages.length < 6) {
        previewImages.push(cat.images[1]);
      }
    }
  });
});

export default function GalleryTeaser() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg-elevated)' }}
      aria-labelledby="gallery-teaser-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel 
              index={siteConfig.homePage.gallery.sectionLabel.index} 
              label={siteConfig.homePage.gallery.sectionLabel.label} 
              className="mb-4" 
            />
            <h2
              id="gallery-teaser-heading"
              className="text-4xl font-semibold lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {siteConfig.homePage.gallery.heading}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-[var(--duration-base)] hover:gap-3"
            style={{ color: 'var(--color-accent)' }}
          >
            {siteConfig.homePage.gallery.linkText} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Masonry-style preview grid */}
        <motion.div
          className="columns-2 gap-4 sm:columns-3"
          variants={shouldReduce ? undefined : staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {previewImages.slice(0, 6).map((img, i) => (
            <motion.div
              key={i}
              className="group mb-4 break-inside-avoid overflow-hidden rounded-lg"
              variants={shouldReduce ? undefined : staggerItemVariants}
            >
              <Link href="/gallery" aria-label={`View gallery — ${img.alt}`}>
                <div className="relative overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={i % 3 === 0 ? 500 : 300}
                    className="w-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end p-3 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
                  >
                    {img.caption && (
                      <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {img.caption}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
