'use client';

import { GalleryTab } from '@/types';
import { motion } from 'framer-motion';

interface GalleryTabsProps {
  tabs: GalleryTab[];
  activeTabId: string;
  onChange: (id: string) => void;
}

export function GalleryTabs({ tabs, activeTabId, onChange }: GalleryTabsProps) {
  return (
    <div 
      role="tablist" 
      aria-label="Gallery Sections"
      className="flex justify-center gap-8 border-b border-zinc-800"
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative pb-4 text-lg font-medium transition-colors ${
              isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="gallery-tab-indicator"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent-500"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
