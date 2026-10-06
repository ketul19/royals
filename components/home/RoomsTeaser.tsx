'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Users, Bed } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants';
import SectionLabel from '@/components/shared/SectionLabel';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import { formatPrice, groupBy } from '@/lib/utils';
import roomsData from '@/data/rooms.json';
import siteConfig from '@/data/site.json';
import type { RoomOption } from '@/types';

const rooms = roomsData as RoomOption[];

// Pick first room from each category for the teaser
const grouped = groupBy(rooms, (r) => r.category);
const teaserRooms = (['AC', 'Non-AC', 'Hostel'] as const)
  .map((cat) => grouped[cat]?.[0])
  .filter(Boolean) as RoomOption[];

export default function RoomsTeaser() {
  const shouldReduce = useReducedMotion();
  const categoryColors = siteConfig.homePage.rooms.categoryColors;

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg-elevated)' }}
      aria-labelledby="rooms-teaser-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel 
              index={siteConfig.homePage.rooms.sectionLabel.index} 
              label={siteConfig.homePage.rooms.sectionLabel.label} 
              className="mb-4" 
            />
            <h2
              id="rooms-teaser-heading"
              className="text-4xl font-semibold lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {siteConfig.homePage.rooms.heading}
            </h2>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-[var(--duration-base)] hover:gap-3"
            style={{ color: 'var(--color-accent)' }}
          >
            {siteConfig.homePage.rooms.linkText} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Room cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={shouldReduce ? undefined : staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {teaserRooms.map((room) => (
            <motion.article
              key={room.id}
              className="overflow-hidden rounded-lg transition-all duration-[var(--duration-base)] hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
              variants={shouldReduce ? undefined : staggerItemVariants}
              whileHover={shouldReduce ? undefined : { y: -4 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Category badge */}
                <span
                  className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(13,13,13,0.85)',
                    color: categoryColors[room.category] ?? 'var(--color-accent)',
                    border: `1px solid ${categoryColors[room.category] ?? 'var(--color-accent)'}`,
                  }}
                >
                  {room.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="mb-1 text-xl font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {room.name}
                </h3>

                {/* Price */}
                <p className="mb-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="text-lg font-semibold" style={{ color: 'var(--color-accent)' }}>
                    {formatPrice(room.pricePerNight)}
                  </span>{' '}
                  / {room.priceUnit}
                </p>

                {/* Stats */}
                <div className="mb-4 flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="flex items-center gap-1">
                    <Users size={12} aria-hidden="true" /> {room.maxGuests} {room.maxGuests === 1 ? siteConfig.homePage.rooms.guestLabel : siteConfig.homePage.rooms.guestsLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bed size={12} aria-hidden="true" /> {room.beds} {room.beds === 1 ? siteConfig.homePage.rooms.bedLabel : siteConfig.homePage.rooms.bedsLabel}
                  </span>
                </div>

                {/* Top amenities */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {room.amenities.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className="rounded-full px-2.5 py-0.5 text-xs"
                      style={{
                        backgroundColor: 'var(--color-border)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-2">
                  <Link
                    href="/rooms"
                    className="flex-1 rounded-md py-2 text-center text-sm font-medium transition-all duration-[var(--duration-base)]"
                    style={{
                      border: '1px solid var(--color-border-accent)',
                      color: 'var(--color-accent)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-border-accent)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {siteConfig.homePage.rooms.viewDetailsText}
                  </Link>
                  <a
                    href={buildWhatsAppLink(room.ctaMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md px-4 py-2 text-sm font-medium transition-all duration-[var(--duration-base)]"
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
                    {siteConfig.homePage.rooms.bookText}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
