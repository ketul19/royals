'use client';

/**
 * NearbyLocations — shared section component.
 *
 * Renders an animated grid of proximity cards for landmarks near Royal's Inn.
 * Used on both the Home page and the About page.
 *
 * Data source: data/site.json → nearbyLocations
 * Each card:
 *  - Icon (lucide-react, mapped from string key in JSON)
 *  - Value (distance/time) — extra-large display font, accent colour
 *  - Highlighted cards (highlight: true): distinct gold accent colour + glow border
 *  - Non-highlighted cards: text-primary colour for value
 *  - Label — small muted descriptor below the value
 *
 * Animation:
 *  - Section heading fades up on scroll (fadeUpVariants)
 *  - Cards stagger in on scroll (staggerItemVariants, whileInView, once)
 *
 * Layout: 2 cols mobile → 3 cols tablet → 6 cols desktop
 * Auto-scalable: adding a new entry to site.json nearbyLocations.locations
 * automatically renders a new card — zero code changes required.
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  Train,
  GraduationCap,
  Wheat,
  Umbrella,
  Plane,
  Bus,
  Building2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import siteConfig from '@/data/site.json';
import SectionLabel from '@/components/shared/SectionLabel';
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '@/lib/animationVariants';
import type { NearbyLocation } from '@/types';

// ── Icon Map ─────────────────────────────────────────────────────────────────
/**
 * Maps the string icon key in site.json to the corresponding lucide-react component.
 * Add new entries here when new icon types are added to the data.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  train:         Train,
  graduationCap: GraduationCap,
  wheat:         Wheat,
  umbrella:      Umbrella,
  plane:         Plane,
  bus:           Bus,
  building:      Building2,
};

// ── Card Component ────────────────────────────────────────────────────────────

function NearbyCard({ location }: { location: NearbyLocation }) {
  const Icon = ICON_MAP[location.icon] ?? Building2;

  return (
    <motion.div
      variants={staggerItemVariants}
      className="nearby-card group flex flex-col items-center gap-3 rounded-xl p-6 text-center"
      style={{
        backgroundColor: location.highlight
          ? 'var(--color-bg-card)'
          : 'var(--color-bg-elevated)',
        border: location.highlight
          ? '1px solid var(--color-accent)'
          : '1px solid var(--color-border)',
        boxShadow: location.highlight
          ? 'var(--shadow-accent)'
          : 'var(--shadow-card)',
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
    >
      {/* Icon container */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          backgroundColor: location.highlight
            ? 'rgba(201,168,76,0.15)'
            : 'var(--color-bg-card)',
          border: '1px solid var(--color-border-accent)',
        }}
      >
        <Icon
          size={22}
          aria-hidden="true"
          style={{
            color: location.highlight
              ? 'var(--color-accent)'
              : 'var(--color-text-muted)',
          }}
        />
      </div>

      {/* Value — highlighted: large display font + accent colour + glow */}
      {/* Non-highlighted: regular display font + text-primary colour */}
      <p
        className="leading-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: location.highlight ? '2rem' : '1.6rem',
          fontWeight: 600,
          fontStyle: 'italic',
          color: location.highlight
            ? 'var(--color-accent)'
            : 'var(--color-text-primary)',
          textShadow: location.highlight
            ? '0 0 24px rgba(201,168,76,0.25)'
            : 'none',
        }}
      >
        {location.value}
      </p>

      {/* Label */}
      <p
        className="text-xs font-medium leading-snug"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {location.label}
      </p>
    </motion.div>
  );
}

// ── Section Component ─────────────────────────────────────────────────────────

export default function NearbyLocations() {
  const shouldReduce = useReducedMotion();
  const { nearbyLocations } = siteConfig;

  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-labelledby="nearby-locations-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          variants={shouldReduce ? undefined : fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <SectionLabel
            index={nearbyLocations.sectionLabel.index}
            label={nearbyLocations.sectionLabel.label}
            className="mb-4 justify-center"
          />
          <h2
            id="nearby-locations-heading"
            className="mb-4 text-3xl font-semibold lg:text-4xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            {nearbyLocations.heading}
          </h2>
          <p
            className="mx-auto max-w-2xl text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {nearbyLocations.description}
          </p>
        </motion.div>

        {/* Cards grid — 2 → 3 → 6 cols, auto-scalable */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          variants={shouldReduce ? undefined : staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {nearbyLocations.locations.map((location) => (
            <NearbyCard key={location.label} location={location as NearbyLocation} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
