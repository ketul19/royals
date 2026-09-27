'use client';

import { useState, useMemo } from 'react';
import { GalleryTab, GalleryCategory, GalleryImage } from '@/types';
import { GalleryTabs } from './GalleryTabs';
import { CategoryPills } from './CategoryPills';
import { MasonryGrid } from './MasonryGrid';
import { Lightbox } from './Lightbox';
import { AnimatePresence } from 'framer-motion';

export function GalleryPageClient({ tabs }: { tabs: GalleryTab[] }) {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || 'events');
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const validCategories = useMemo(() => {
    return activeTab?.categories.filter(c => c.images.length > 0) || [];
  }, [activeTab]);

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    validCategories[0]?.id || ''
  );

  // Keep category in sync when switching tabs
  const currentCategory = validCategories.find(c => c.id === activeCategoryId) || validCategories[0];
  
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    const newTab = tabs.find(t => t.id === tabId);
    const newValid = newTab?.categories.filter(c => c.images.length > 0) || [];
    if (newValid.length > 0) {
      setActiveCategoryId(newValid[0].id);
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-zinc-950">
      <section className="h-[35vh] flex items-center justify-center bg-zinc-900 border-b border-zinc-800">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Gallery</h1>
      </section>

      <div className="container mx-auto px-4 mt-8">
        <GalleryTabs tabs={tabs} activeTabId={activeTabId} onChange={handleTabChange} />
        
        {validCategories.length > 0 && (
          <div className="mt-8 flex justify-center">
            <CategoryPills 
              categories={validCategories} 
              activeCategoryId={currentCategory?.id} 
              onChange={setActiveCategoryId} 
            />
          </div>
        )}

        <div className="mt-12">
          {currentCategory && (
            <MasonryGrid 
              key={currentCategory.id}
              images={currentCategory.images} 
              onImageClick={(idx) => setLightboxIndex(idx)} 
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && currentCategory && (
          <Lightbox 
            images={currentCategory.images} 
            initialIndex={lightboxIndex} 
            onClose={() => setLightboxIndex(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
