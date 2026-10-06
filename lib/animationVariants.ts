/**
 * Shared Framer Motion animation variants.
 * Import named variants in components instead of redefining them inline.
 * This keeps animation timing and easing consistent across the entire site.
 *
 * Motion timing scale (matches design tokens in globals.css):
 *   fast:   150ms  — micro-interactions (hover states)
 *   base:   250ms  — most transitions
 *   slow:   400ms  — modal entrances, overlay fades
 *   hero:   800ms+ — page loader, hero text stagger
 */

import type { Variants } from 'framer-motion';

// ─── Fade Up ────────────────────────────────────────────────────────────────
/** Standard scroll-reveal: fade in + slide up from below */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Stagger Container ───────────────────────────────────────────────────────
/** Parent container that staggers children 0.1s apart */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/** Child item for stagger container — pairs with staggerContainerVariants */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Hero Text Stagger ───────────────────────────────────────────────────────
/** Slower stagger for oversized hero display text */
export const heroTextContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export const heroTextLetterVariants: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Modal ───────────────────────────────────────────────────────────────────
/** Centered dialog modal entrance (desktop) */
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 16,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

/** Bottom-sheet slide-up (mobile modal) */
export const bottomSheetVariants: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

/** Overlay/backdrop fade */
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Page Transition ─────────────────────────────────────────────────────────
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ─── Drawer (Mobile Nav) ─────────────────────────────────────────────────────
export const drawerVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

// ─── Chatbot Panel ───────────────────────────────────────────────────────────
export const chatPanelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

