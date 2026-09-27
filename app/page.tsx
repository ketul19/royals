import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

import siteDataJson from '@/data/site.json';
import testimonialsDataJson from '@/data/testimonials.json';
import roomsDataJson from '@/data/rooms.json';
import type { SiteConfig, Testimonial, RoomOption } from '@/types';

import { sortByRating } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';

import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/shared/Button';
import { Container } from '@/components/shared/Container';
import { HeroText } from '@/components/home/HeroText';
import { AnimatedSection } from '@/components/home/AnimatedSection';
import { ArrowDown, MapPin, Wind, Wifi, Coffee } from 'lucide-react';

const site = siteDataJson as SiteConfig;
const testimonials = testimonialsDataJson as Testimonial[];
const rooms = roomsDataJson as RoomOption[];

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.tagline,
};

export default function HomePage() {
  const topTestimonials = sortByRating(testimonials).slice(0, 3);
  const whatsappUrl = buildWhatsAppLink('Hello, I would like to inquire about booking a room.', site.whatsappNumber);

  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full flex flex-col justify-end pb-12 sm:pb-20 pt-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Royal's Inn Hotel Navsari"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-black/40 to-black/20" />
        </div>

        <Container className="relative z-10 w-full flex flex-col items-start">
          <HeroText text1="ROYAL'S" text2="INN" />
          
          <div className="w-full flex justify-between items-end mt-12 sm:mt-24">
            <AnimatedSection>
              <SectionLabel index="01" label="Authentic Comfort" />
            </AnimatedSection>
            
            <AnimatedSection className="hidden sm:flex flex-col items-center opacity-70 animate-bounce">
              <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
              <ArrowDown size={16} />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-24 sm:py-32 w-full relative">
        <Container>
          <AnimatedSection>
            <SectionLabel index="02" label="Our Story" className="mb-8" />
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase leading-tight mb-8">
                Where Every Stay <br /> Feels Like <span className="text-accent">Royalty</span>
              </h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-2xl">
                {site.tagline}. Located in the heart of Navsari, Royal's Inn offers a unique blend of modern comfort and traditional hospitality. Whether you're visiting for business, a family getaway, or a peaceful retreat, our carefully curated spaces ensure an unforgettable experience.
              </p>
              <Button href="/about" variant="secondary">Discover Our Journey</Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Rooms Teaser */}
      <section className="py-24 sm:py-32 w-full relative bg-[var(--section)]">
        <Container>
          <AnimatedSection className="mb-16">
            <SectionLabel index="03" label="Accommodation" className="mb-8" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <h2 className="text-3xl sm:text-4xl font-display uppercase max-w-lg">A Room for Every Journey</h2>
              <Button href="/rooms" variant="ghost">View All Rooms</Button>
            </div>
          </AnimatedSection>

          <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.slice(0, 3).map((room) => (
              <Link key={room.id} href="/rooms" className="group block relative overflow-hidden rounded-2xl bg-[var(--bg)] border border-white/5 transition-colors hover:border-accent/30 flex flex-col h-full">
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-800" /> {/* Placeholder */}
                  {room.images?.[0] && (
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                    From ₹{room.pricePerNight}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display mb-2">{room.name}</h3>
                  <p className="text-white/60 text-sm mb-6 flex-grow">{room.description}</p>
                  <div className="flex gap-4 text-white/40">
                    {room.category === 'AC' && <Wind size={18} />}
                    {room.category === 'Non-AC' && <Wind size={18} className="opacity-50" />}
                    <Wifi size={18} />
                    <Coffee size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* Dining Teaser */}
      <section className="py-24 sm:py-32 w-full relative overflow-hidden">
        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-display font-bold uppercase text-white/5 pointer-events-none whitespace-nowrap select-none z-0">
          DINE
        </div>
        
        <Container className="relative z-10">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <SectionLabel index="04" label="The Table" className="mb-8 justify-center" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase leading-tight mb-8">
              Flavours of India, <br /> Under One Roof
            </h2>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">
              Experience culinary excellence at our in-house restaurant, where traditional recipes meet contemporary presentation. From rich curries to aromatic biryanis, every dish is crafted with passion.
            </p>
            <Button href="/dining" variant="primary">Explore Menu</Button>
          </AnimatedSection>
        </Container>
      </section>

      {/* Gallery Teaser */}
      <section className="py-24 sm:py-32 w-full relative bg-[var(--section)]">
        <Container>
          <AnimatedSection className="mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <SectionLabel index="05" label="Gallery" className="mb-8" />
              <h2 className="text-3xl sm:text-4xl font-display uppercase">A Glimpse of Royal's Inn</h2>
            </div>
            <Button href="/gallery" variant="ghost">View Full Gallery</Button>
          </AnimatedSection>

          <AnimatedSection className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {/* Placeholders for masonry gallery */}
            {[
              { h: 'h-64', bg: 'bg-neutral-800' },
              { h: 'h-96', bg: 'bg-neutral-900' },
              { h: 'h-72', bg: 'bg-neutral-800' },
              { h: 'h-80', bg: 'bg-neutral-900' },
              { h: 'h-64', bg: 'bg-neutral-800' },
            ].map((item, i) => (
              <div key={i} className={`w-full rounded-2xl overflow-hidden ${item.bg} ${item.h} relative group`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* Testimonials Teaser */}
      <section className="py-24 sm:py-32 w-full relative">
        <Container>
          <AnimatedSection className="mb-16 flex flex-col items-center text-center">
            <SectionLabel index="06" label="What Guests Say" className="mb-8 justify-center" />
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
              <span className="text-yellow-400">★</span>
              <span className="font-medium">{site.googleRating} on Google</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display uppercase max-w-2xl">
              Memories Made Here
            </h2>
          </AnimatedSection>

          <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                <div className="flex gap-1 mb-6 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < testimonial.rating ? 'opacity-100' : 'opacity-30'}>★</span>
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 flex-grow">"{testimonial.text}"</p>
                <div>
                  <p className="font-medium uppercase tracking-wide text-sm">{testimonial.authorName}</p>
                  <p className="text-white/40 text-xs mt-1">{new Date(testimonial.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</p>
                </div>
              </div>
            ))}
          </AnimatedSection>
          
          <div className="mt-16 flex justify-center">
             <Button href="/testimonials" variant="secondary">Read More Reviews</Button>
          </div>
        </Container>
      </section>

      {/* Location Teaser */}
      <section className="py-24 sm:py-32 w-full relative bg-[var(--section)]">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto bg-[var(--bg)] border border-white/10 rounded-[2rem] p-8 sm:p-16 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            <div className="flex-1">
              <SectionLabel index="07" label="Find Us" className="mb-6 justify-center md:justify-start" />
              <h2 className="text-3xl sm:text-4xl font-display uppercase mb-6">Start Your Journey</h2>
              <div className="flex items-start gap-4 text-white/70 justify-center md:justify-start mb-8">
                <MapPin className="shrink-0 text-accent mt-1" size={20} />
                <p className="max-w-sm">{site.address}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button 
                href={`https://www.google.com/maps/dir/?api=1&destination=${site.mapCoordinates.lat},${site.mapCoordinates.lng}`}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Get Directions
              </Button>
              <Button href={whatsappUrl} variant="primary" className="w-full sm:w-auto">
                Enquire on WhatsApp
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  );
}
