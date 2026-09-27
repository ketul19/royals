import testimonialsData from '@/data/testimonials.json';
import siteData from '@/data/site.json';
import { TestimonialsClient } from '@/components/testimonials/TestimonialsClient';
import { Testimonial, SiteConfig } from '@/types';

export const metadata = {
  title: "Guest Reviews | Royal's Inn",
  description: "Read what our guests have to say about their stay.",
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <section className="h-[35vh] flex flex-col items-center justify-center bg-zinc-900 border-b border-zinc-800 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center">What Our Guests Say</h1>
      </section>
      <TestimonialsClient testimonials={testimonialsData as Testimonial[]} site={siteData as SiteConfig} />
    </div>
  );
}
