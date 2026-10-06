'use client';

/**
 * Footer — bottom-of-page layout for Royal's Inn.
 *
 * Grid: 2-col on mobile → 4-col on desktop.
 * Social icons: only renders platforms present in site.socials (null-safety).
 */

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, MapPin, Phone } from 'lucide-react';

import navItems from '@/data/navigation.json';
import siteConfig from '@/data/site.json';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import type { NavItem } from '@/types';

// Inline SVG brand icons — lucide-react does not include brand icons
function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
function IconFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function IconTwitter({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function IconYoutube({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  twitter: IconTwitter,
  youtube: IconYoutube,
};

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-3" aria-label="Royal's Inn home">
              <Image
                src={siteConfig.logoSvgPath}
                alt="Royal's Inn crest"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <span
                className="text-2xl font-semibold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
              >
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {siteConfig.tagline}
            </p>
            {/* Social icons */}
            {siteConfig.socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {siteConfig.socials.map(({ platform, url }) => {
                  const Icon = SOCIAL_ICONS[platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${platform}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-[var(--duration-fast)]"
                      style={{
                        border: '1px solid var(--color-border-accent)',
                        color: 'var(--color-text-muted)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-accent)';
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-accent)';
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)';
                      }}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className="mb-5 text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-accent)' }}
            >
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {(navItems as NavItem[]).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors duration-[var(--duration-fast)]"
                      style={{ color: 'var(--color-text-muted)' }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)';
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3
              className="mb-5 text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-accent)' }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                  style={{ color: 'var(--color-accent)' }}
                />
                <address
                  className="not-italic text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {siteConfig.address}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="shrink-0"
                  aria-hidden="true"
                  style={{ color: 'var(--color-accent)' }}
                />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="text-sm transition-colors duration-[var(--duration-fast)]"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)';
                  }}
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp CTA */}
          <div>
            <h3
              className="mb-5 text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-accent)' }}
            >
              Reservations
            </h3>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Book directly via WhatsApp for the fastest response and best availability.
            </p>
            <a
              href={buildWhatsAppLink("Hi! I'd like to enquire about room availability at Royal's Inn.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-[var(--duration-base)]"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg-primary)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-light)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent)';
              }}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span>Terms &amp; Conditions</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Navsari, Gujarat</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
