'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size    = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: never;
  target?: string;
  rel?: string;
}

interface ButtonProps extends BaseProps {
  href?: never;
  onClick?: () => void;
  target?: never;
  rel?: never;
}

type ButtonComponentProps = LinkProps | ButtonProps;

// ─── Style maps ──────────────────────────────────────────────────────────────

/**
 * CSS-variable-safe inline style objects for each variant.
 * We use inline styles because Tailwind's JIT cannot interpolate CSS variables
 * at arbitrary colour stops without the @property trick.
 */
const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-accent)',
    color:           'var(--color-bg-primary)',
    border:          '1.5px solid var(--color-accent)',
  },
  secondary: {
    backgroundColor: 'transparent',
    color:           'var(--color-accent)',
    border:          '1.5px solid var(--color-accent)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color:           'var(--color-text-muted)',
    border:          '1.5px solid transparent',
  },
  /** WhatsApp green is brand-dictated — not a design token, intentional. */
  whatsapp: {
    backgroundColor: '#25D366',
    color:           '#ffffff',
    border:          '1.5px solid #25D366',
  },
};

/** Minimum 44 × 44 px touch targets per WCAG 2.5.5 */
const SIZE_CLASSES: Record<Size, string> = {
  sm: 'min-h-[44px] px-4 py-2 text-xs',
  md: 'min-h-[44px] px-6 py-3 text-sm',
  lg: 'min-h-[44px] px-8 py-4 text-base',
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Polymorphic button / anchor with four design variants.
 * Renders an `<a>` when `href` is provided, otherwise a `<button>`.
 * Hover animation uses Framer Motion's whileHover/whileTap for 60 fps transforms.
 */
export default function Button({
  variant  = 'primary',
  size     = 'md',
  children,
  className = '',
  disabled  = false,
  'aria-label': ariaLabel,
  href,
  onClick,
  target,
  rel,
}: ButtonComponentProps) {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'rounded-sm font-sans font-medium tracking-wide',
    'transition-colors duration-[var(--duration-fast)]',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-bg-primary)]',
    'select-none cursor-pointer',
    disabled ? 'opacity-40 pointer-events-none' : '',
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap:   disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.15, ease: 'easeOut' as const },
    style:      VARIANT_STYLES[variant],
  };

  const inner = (
    <>
      {variant === 'whatsapp' && (
        <MessageCircle size={16} aria-hidden="true" strokeWidth={2.5} />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        className={baseClasses}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={baseClasses}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
