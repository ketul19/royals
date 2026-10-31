'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { fadeUpVariants } from '@/lib/animationVariants';
import SectionLabel from '@/components/shared/SectionLabel';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import siteConfig from '@/data/site.json';

// Load Leaflet map client-side only (requires DOM)
const MapEmbed = dynamic(() => import('@/components/contact/MapEmbed'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center overflow-hidden rounded-lg"
      style={{
        height: '400px',
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Loading map…
      </span>
    </div>
  ),
});

export default function LocationTeaser() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg-elevated)' }}
      aria-labelledby="location-teaser-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Text */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionLabel 
              index={siteConfig.homePage.location.sectionLabel.index} 
              label={siteConfig.homePage.location.sectionLabel.label} 
              className="mb-6" 
            />
            <h2
              id="location-teaser-heading"
              className="mb-6 text-4xl font-semibold lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {siteConfig.homePage.location.heading}
            </h2>

            <div className="mb-6 flex items-start gap-3">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
                style={{ color: 'var(--color-accent)' }}
              />
              <address
                className="not-italic text-base leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {siteConfig.address}
              </address>
            </div>

            <div className="mb-8 flex items-center gap-3">
              <Phone
                size={18}
                className="shrink-0"
                aria-hidden="true"
                style={{ color: 'var(--color-accent)' }}
              />
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="text-base transition-colors duration-[var(--duration-fast)]"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)';
                }}
              >
                {siteConfig.phone}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={buildWhatsAppLink(siteConfig.homePage.location.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-[var(--duration-base)] hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-bg-primary)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-light)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent)';
                }}
              >
                <MessageCircle size={16} aria-hidden="true" />
                {siteConfig.homePage.location.whatsappButtonText}
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-[var(--duration-base)] hover:gap-3"
                style={{ color: 'var(--color-accent)' }}
              >
                {siteConfig.homePage.location.viewMapText} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Real Leaflet map — same component as Contact page */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <MapEmbed />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
