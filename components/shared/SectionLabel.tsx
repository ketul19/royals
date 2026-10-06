'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fadeUpVariants } from '@/lib/animationVariants';

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

/**
 * SectionLabel — numbered micro-label used consistently across pages.
 * Example: <SectionLabel index="01" label="Authentic Comfort" />
 * Renders: 01 ──── Authentic Comfort
 */
export default function SectionLabel({ index, label, className = '' }: SectionLabelProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      variants={shouldReduce ? undefined : fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <span
        className="text-xs font-semibold tabular-nums tracking-widest"
        style={{ color: 'var(--color-accent)' }}
      >
        {index}
      </span>
      <span
        className="h-px w-8 flex-shrink-0"
        style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }}
        aria-hidden="true"
      />
      <span
        className="text-xs font-medium uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
