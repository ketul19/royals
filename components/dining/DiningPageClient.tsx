'use client';

import React, { useState } from 'react';
import { CuisineCategory, DiningItem } from '@/types';
import DishCard from './DishCard';
import DishDetailModal from './DishDetailModal';
import { motion, AnimatePresence } from 'framer-motion';
import { heroLetter, heroWords, staggerContainer } from '@/lib/animationVariants';

interface DiningPageClientProps {
  categories: CuisineCategory[];
}

export default function DiningPageClient({ categories }: DiningPageClientProps) {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || '');
  const [selectedDish, setSelectedDish] = useState<DiningItem | null>(null);

  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="z-20 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 font-serif"
            variants={heroWords}
            initial="hidden"
            animate="visible"
          >
            {'The Table'.split('').map((char, index) => (
              <motion.span key={index} variants={heroLetter} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-xl md:text-2xl font-light opacity-90 italic">
            Flavours of India, Served with Heart
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Filter Tab Bar */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-[var(--border)] mb-12">
          <div className="flex space-x-8 px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`relative pb-4 text-lg font-medium whitespace-nowrap transition-colors ${activeTab === category.id ? 'text-[var(--primary)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'}`}
              >
                {category.name}
                {activeTab === category.id && (
                  <motion.div 
                    layoutId="diningTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dish Grid */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10 max-w-3xl">
                <p className="text-lg text-[var(--fg-muted)]">{activeCategory.description}</p>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {activeCategory.items.map(item => (
                  <DishCard key={item.id} item={item} onOpenModal={setSelectedDish} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shared Modal */}
      <DishDetailModal 
        item={selectedDish} 
        isOpen={!!selectedDish} 
        onClose={() => setSelectedDish(null)} 
      />
    </div>
  );
}
