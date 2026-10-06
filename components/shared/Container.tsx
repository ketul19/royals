import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  /** Additional Tailwind / utility classes */
  className?: string;
  /**
   * Renders as any valid HTML element. Defaults to 'div'.
   * Useful when semantics require <section>, <article>, <main>, etc.
   * without an extra wrapping div.
   */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Responsive page-width container.
 * Max-width 1280 px, centred, with breakpoint-aware horizontal padding:
 *   mobile  → px-4  (16 px)
 *   sm      → px-6  (24 px)
 *   lg      → px-8  (32 px)
 *   xl      → px-10 (40 px)
 */
export default function Container({
  children,
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={[
        'mx-auto w-full max-w-[1280px]',
        'px-4 sm:px-6 lg:px-8 xl:px-10',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
