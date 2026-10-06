'use client';

/**
 * CuisineTabs — horizontally scrollable pill filter for cuisine categories.
 * Active pill uses gold background; inactive uses transparent with gold border.
 * Fully keyboard-accessible: arrow keys cycle between pills.
 */

import { useRef, KeyboardEvent } from 'react';
import type { CuisineCategory } from '@/types';

interface CuisineTabsProps {
  categories: CuisineCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function CuisineTabs({ categories, activeId, onSelect }: CuisineTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  /** Arrow-key navigation within the pill list */
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('button');
    if (!buttons) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      buttons[(index + 1) % buttons.length]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      buttons[(index - 1 + buttons.length) % buttons.length]?.focus();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Cuisine categories"
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map((cat, i) => {
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(cat.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="
              shrink-0 px-5 py-2 rounded-full text-sm font-medium
              transition-all whitespace-nowrap
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[var(--color-accent)]
            "
            style={
              isActive
                ? {
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg-primary)',
                    border: '1.5px solid var(--color-accent)',
                    transitionDuration: 'var(--duration-base)',
                  }
                : {
                    backgroundColor: 'transparent',
                    color: 'var(--color-accent)',
                    border: '1.5px solid var(--color-accent)',
                    transitionDuration: 'var(--duration-base)',
                  }
            }
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
