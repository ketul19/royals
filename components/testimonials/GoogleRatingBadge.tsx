import { Star } from 'lucide-react';

interface GoogleRatingBadgeProps {
  rating: number;
  reviewUrl: string | null;
  profileUrl: string | null;
}

export function GoogleRatingBadge({ rating, profileUrl }: GoogleRatingBadgeProps) {
  return (
    <a 
      href={profileUrl || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3 hover:bg-zinc-800 transition-colors"
      aria-label={`Rated ${rating} stars on Google`}
    >
      <div className="flex flex-col">
        <span className="text-white font-bold text-lg leading-none mb-1">
          {rating.toFixed(1)}
          <span className="text-sm font-normal text-zinc-400 ml-1">/ 5</span>
        </span>
        <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Google Rating</span>
      </div>
      
      <div className="flex gap-1 text-accent-500">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={20} 
            className={i < Math.floor(rating) ? 'fill-current' : i < rating ? 'fill-current opacity-50' : 'text-zinc-700'} 
          />
        ))}
      </div>
    </a>
  );
}
