import { Variants } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────────────
// Shared Framer Motion variants — use across all components for consistency.
// All animations include a reducedMotion variant via the 'custom' prop pattern
// or the useReducedMotion hook in the component itself.
// ──────────────────────────────────────────────────────────────────────────────

/** Simple fade in */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/** Fade + slide up — used for section reveals */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

/** Stagger container — parent variant for staggered children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Stagger item — child variant */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

/** Hero letter reveal — for large staggered text */
export const heroLetter: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Hero word stagger container */
export const heroWords: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

/** Modal slide-up + scale */
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/** Overlay backdrop */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/** Page transition */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
};

/** Chat panel slide in from right */
export const chatPanelVariants: Variants = {
  hidden: { opacity: 0, x: 48, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 24,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/** Gallery image grid item */
export const galleryItem: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/** Loader path draw */
export const pathDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.2, ease: "easeInOut" }, opacity: { duration: 0.01 } },
  },
};

/** Loader fill reveal */
export const pathFill: Variants = {
  hidden: { fillOpacity: 0 },
  visible: { fillOpacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};
