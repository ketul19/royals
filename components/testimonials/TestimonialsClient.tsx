'use client';
import { useState } from 'react';
import { Testimonial, SiteConfig } from '@/types';
import { TestimonialCard } from './TestimonialCard';
import { GoogleRatingBadge } from './GoogleRatingBadge';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animationVariants';

export function TestimonialsClient({ testimonials, site }: { testimonials: Testimonial[], site: SiteConfig }) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'highest'>('newest');

  const sortedTestimonials = [...testimonials].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    return b.rating - a.rating;
  });

  return (
    <div className="container mx-auto px-4 mt-12 max-w-5xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <GoogleRatingBadge 
          rating={site.googleRating} 
          reviewUrl={site.googleReviewUrl} 
          profileUrl={site.googleProfileUrl} 
        />
        
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="text-sm">Sort by:</span>
          <select 
            className="bg-zinc-800 border border-zinc-700 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:border-accent-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'highest')}
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rated</option>
          </select>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {sortedTestimonials.map(t => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </motion.div>
      
      {/* §10 of build spec for the technical rationale for curated reviews:
          Curated reviews are statically generated for SEO and privacy, while still directing
          users to Google for authentic read/write access. */}
      
      <div className="mt-16 text-center">
        <a 
          href={site.googleReviewUrl || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-accent-600 hover:bg-accent-700 text-white font-medium py-3 px-8 rounded-full transition-colors"
        >
          Leave a Review on Google
        </a>
      </div>
    </div>
  );
}
