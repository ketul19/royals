import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Heart, Star, Sparkles, Shield } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import siteConfig from '@/data/site.json';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Royal's Inn Hotel & Hostel in Navsari, Gujarat — our story, our values, and why travellers from across India choose us for a warm, authentic hospitality experience.",
  openGraph: {
    title: "About Royal's Inn | Hotel & Hostel in Navsari",
    description:
      "Our story, our values, and what makes Royal's Inn a favourite for travellers in Navsari, Gujarat.",
  },
};

const VALUES = [
  {
    icon: Heart,
    title: 'Warm Hospitality',
    description:
      "We treat every guest like family. From the moment you arrive to the moment you leave, our team goes out of its way to make you feel at home.",
  },
  {
    icon: Star,
    title: 'Consistent Quality',
    description:
      "Clean rooms, hot water, fast Wi-Fi, and attentive service — every time, for every guest, regardless of room type or budget.",
  },
  {
    icon: Sparkles,
    title: 'Great Value',
    description:
      "Whether you book a premium AC suite or an affordable hostel bed, you get honest value for money — no hidden charges, no unpleasant surprises.",
  },
  {
    icon: Shield,
    title: 'Safety & Cleanliness',
    description:
      "We maintain stringent hygiene standards across all rooms, bathrooms, and common areas. Your safety and comfort are non-negotiable.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <div
        className="relative py-24 text-center"
        style={{ backgroundColor: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border)' }}
      >
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)' }}
        >
          Our Story
        </p>
        <h1
          className="text-5xl font-semibold lg:text-7xl"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          About Us
        </h1>
      </div>

      {/* ── Story Section ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Text */}
            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-accent)' }}
              >
                The Royal's Inn Story
              </p>
              <h2
                className="mb-6 text-3xl font-semibold leading-tight lg:text-4xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                A Home Away From Home in the Heart of Navsari
              </h2>
              <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                <p>
                  Royal&apos;s Inn was founded with a simple but powerful belief: every traveller deserves
                  a comfortable, clean, and welcoming place to rest — regardless of their budget. Located
                  in Navsari, Gujarat, we set out to create an establishment that combines the warmth of
                  Indian hospitality with modern comforts.
                </p>
                <p>
                  What started as a modest hotel has grown into a combined hotel and hostel, serving
                  families, business professionals, solo backpackers, and pilgrims with equal care and
                  attention. Our on-site restaurant, The Table, brings together authentic Gujarati, Punjabi,
                  South Indian, and Chinese cuisines — all freshly prepared each day.
                </p>
                <p>
                  Over the years, we have hosted thousands of guests, earned a{' '}
                  <span style={{ color: 'var(--color-accent)' }}>
                    {siteConfig.googleRating}★ Google rating
                  </span>{' '}
                  from our community, and built a reputation for genuine care in a city known for its
                  warmth and rich cultural heritage. We are proud to be Navsari&apos;s go-to destination for
                  both short stays and extended visits.
                </p>
              </div>
            </div>

            {/* Image */}
            <div
              className="overflow-hidden rounded-lg"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <Image
                src="/images/gallery/spaces/G2.jpg"
                alt="Royal's Inn lobby and reception area"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ─── */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: 'var(--color-bg-elevated)' }}
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-accent)' }}
            >
              What We Stand For
            </p>
            <h2
              id="values-heading"
              className="text-3xl font-semibold lg:text-4xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-lg p-6"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.3)',
                  }}
                >
                  <Icon size={22} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                </div>
                <h3
                  className="mb-3 text-lg font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hotel + Hostel concept ─── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Image */}
            <div
              className="overflow-hidden rounded-lg"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <Image
                src="/images/gallery/spaces/G1.jpg"
                alt="Royal's Inn hostel dormitory with bunk beds"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-accent)' }}
              >
                Hotel & Hostel Under One Roof
              </p>
              <h2
                className="mb-6 text-3xl font-semibold leading-tight lg:text-4xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                Every Traveller, Perfectly Accommodated
              </h2>
              <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                <p>
                  Royal&apos;s Inn is unique in Navsari for offering both hotel-grade rooms and budget
                  hostel accommodation in the same property — sharing the same kitchen, the same
                  service standards, and the same genuine hospitality.
                </p>
                <p>
                  Our hotel wing offers comfortable AC and Non-AC rooms with private bathrooms, room
                  service, and all the amenities you&apos;d expect from a quality hotel stay.
                </p>
                <p>
                  Our hostel wing offers clean dormitory beds with personal lockers, a social common
                  area, and access to The Table restaurant — making it the ideal base for solo
                  backpackers, students, and budget-conscious explorers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team placeholder ─── */}
      <section
        className="py-20 lg:py-24"
        style={{ backgroundColor: 'var(--color-bg-elevated)' }}
        aria-labelledby="team-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-accent)' }}
              >
                The People Behind Royal&apos;s Inn
              </p>
              <h2
                id="team-heading"
                className="mb-4 text-3xl font-semibold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                Our Dedicated Team
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Behind every comfortable stay is a team of dedicated individuals who take pride in
                their work. Our staff — from front desk and housekeeping to kitchen and maintenance —
                are trained to anticipate needs, resolve issues quickly, and always greet guests with
                a smile. At Royal&apos;s Inn, the team isn&apos;t just employees — they&apos;re the heart
                of the experience.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="rounded-lg p-10 text-center"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p
                  className="mb-2 text-5xl font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
                >
                  {siteConfig.googleRating}★
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Average Google Rating
                </p>
                <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
                  Earned through consistent, genuine hospitality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
        aria-labelledby="about-cta-heading"
      >
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2
            id="about-cta-heading"
            className="mb-4 text-3xl font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            Come Experience It Yourself
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Words can only say so much. The real Royal&apos;s Inn experience — the smiles, the food, the
            comfort — is waiting for you in Navsari.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={buildWhatsAppLink(
                "Hi! I'd like to book a stay at Royal's Inn. Please share availability and room options.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="about-cta-btn inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-[var(--duration-base)] hover:scale-[1.03]"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg-primary)',
                boxShadow: 'var(--shadow-accent)',
              }}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Book Your Stay
            </a>
            <Link
              href="/rooms"
              className="text-sm font-semibold transition-all duration-[var(--duration-base)] hover:underline"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Browse Rooms →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
