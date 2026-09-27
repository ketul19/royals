'use client';

import { GalleryCategory } from '@/types';

interface CategoryPillsProps {
  categories: GalleryCategory[];
  activeCategoryId: string;
  onChange: (id: string) => void;
}

export function CategoryPills({ categories, activeCategoryId, onChange }: CategoryPillsProps) {
  return (
    <div 
      className="flex flex-wrap justify-center gap-3"
      role="group"
      aria-label="Filter by category"
    >
      {categories.map((cat) => {
        const isActive = activeCategoryId === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-accent-600 text-white shadow-md' 
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
