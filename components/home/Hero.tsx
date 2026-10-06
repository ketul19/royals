'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import { heroTextContainerVariants, heroTextLetterVariants, fadeUpVariants } from '@/lib/animationVariants';
import SectionLabel from '@/components/shared/SectionLabel';
import siteConfig from '@/data/site.json';

export default function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.homePage.hero.backgroundImage}
          alt={siteConfig.homePage.hero.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          id="hero-background-image"
        />
        {/* Dark gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.3) 40%, rgba(13,13,13,0.8) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Section label */}
          <SectionLabel 
            index={siteConfig.homePage.hero.sectionLabel.index} 
            label={siteConfig.homePage.hero.sectionLabel.label} 
            className="mb-10 justify-center" 
          />

          {/* Oversized display title */}
          <h1 className="select-none" aria-label="Royal's Inn">
            <motion.span
              className="block"
              variants={shouldReduce ? undefined : heroTextContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {siteConfig.homePage.hero.words.map((word, wi) => (
                <motion.span
                  key={word}
                  className="block leading-none"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(4rem, 12vw, 10rem)',
                    color: 'var(--color-text-primary)',
                    letterSpacing: '0.08em',
                    textShadow: '0 4px 32px rgba(0,0,0,0.5)',
                  }}
                  variants={shouldReduce ? undefined : heroTextLetterVariants}
                  custom={wi}
                >
                  {word === siteConfig.homePage.hero.accentWord ? (
                    <span style={{ color: 'var(--color-accent)' }}>{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            className="mt-6 max-w-md text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
            variants={shouldReduce ? undefined : fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-10"
            variants={shouldReduce ? undefined : fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.0 }}
          >
            <a
              href={buildWhatsAppLink(siteConfig.homePage.hero.ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold tracking-wide transition-all duration-[var(--duration-base)] hover:scale-[1.03]"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg-primary)',
                boxShadow: 'var(--shadow-accent)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-light)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent)';
              }}
            >
              <MessageCircle size={18} aria-hidden="true" />
              {siteConfig.homePage.hero.ctaText}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={shouldReduce ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ChevronDown size={28} style={{ color: 'var(--color-accent)', opacity: 0.7 }} />
      </motion.div>
    </section>
  );
}
