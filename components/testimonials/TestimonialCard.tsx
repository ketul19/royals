'use client';

import { Testimonial } from '@/types';
import { motion } from 'framer-motion';
import { slideUp } from '@/lib/animationVariants';
import { Star, Quote } from 'lucide-react';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.authorName.substring(0, 2).toUpperCase();

  return (
    <motion.div 
      variants={slideUp}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative group hover:-translate-y-1 transition-transform duration-300"
    >
      <Quote className="absolute top-6 right-6 text-zinc-800 w-12 h-12 rotate-180" />
      
      <div className="flex gap-1 mb-4 text-accent-500">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < testimonial.rating ? 'fill-current' : 'text-zinc-700'} 
          />
        ))}
      </div>
      
      <p className="text-zinc-300 mb-6 relative z-10 leading-relaxed text-sm md:text-base">
        "{testimonial.text}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        {testimonial.authorPhotoUrl ? (
          <img 
            src={testimonial.authorPhotoUrl} 
            alt={testimonial.authorName} 
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold tracking-wider">
            {initials}
          </div>
        )}
        
        <div>
          <h4 className="text-white font-medium">{testimonial.authorName}</h4>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>{new Date(testimonial.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            {testimonial.source === 'google' && (
              <>
                <span>•</span>
                <span className="text-blue-400/80">Verified Google Review</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
