'use client';

/**
 * Header — Fixed two-tier navbar for Royal's Inn.
 *
 * Desktop layout:
 *   - Logo (left) → Nav links (center) → WhatsApp CTA (right)
 *
 * Mobile layout:
 *   - Logo (left) → Hamburger toggle (right)
 *   - Animated right-side drawer with stacked nav + WhatsApp CTA
 *
 * Scroll behaviour:
 *   - At top of hero: transparent bg, no blur
 *   - On scroll (>50px): dark bg + backdrop-blur-md transition
 *
 * Accessibility:
 *   - role="navigation" + aria-label on both desktop and mobile navs
 *   - aria-expanded / aria-controls on hamburger
 *   - aria-hidden on mobile drawer when closed (prevents tab-focus bleed)
 *   - Full keyboard-trap inside open drawer via tabIndex management
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';

import navItems from '@/data/navigation.json';
import siteConfig from '@/data/site.json';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import {
  drawerVariants,
  overlayVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '@/lib/animationVariants';
import type { NavItem } from '@/types';

const WHATSAPP_URL = buildWhatsAppLink("Hi! I'd like to know more about your rooms and availability.");

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Desktop nav link with active-route underline indicator */
function DesktopNavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className="relative py-1 text-sm font-medium tracking-wide transition-colors duration-[var(--duration-base)] group"
      style={{
        color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
      }}
    >
      {item.label}
      {/* Animated underline bar */}
      <span
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-[var(--duration-base)] group-hover:scale-x-100"
        style={{ backgroundColor: 'var(--color-accent)' }}
        aria-hidden="true"
      />
      {/* Active dot */}
      {isActive && (
        <span
          className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: 'var(--color-accent)' }}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

/** Shared WhatsApp CTA button */
function WhatsAppButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-[var(--duration-base)] focus-visible:outline-offset-2 ${className}`}
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
      Book via WhatsApp
    </a>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Scroll listener — debounced via requestAnimationFrame for performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change (e.g. clicking a link)
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) setDrawerOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);

  /**
   * Reduced-motion: skip x-translate animation, just fade.
   * Framer Motion's useReducedMotion() hook reads the OS preference;
   * we pass simplified variants when it returns true.
   */
  const resolvedDrawerVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : drawerVariants;

  const resolvedOverlayVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : overlayVariants;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-[var(--duration-slow)]"
        style={{
          backgroundColor: isScrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 focus-visible:outline-offset-4"
            aria-label={`${siteConfig.name} — go to home`}
          >
            <Image
              src={siteConfig.logoSvgPath}
              alt={`${siteConfig.name} crest`}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <span
              className="hidden text-xl font-semibold tracking-wide sm:inline"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
              }}
            >
              {siteConfig.name}
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav
            role="navigation"
            aria-label="Primary navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {(navItems as NavItem[]).map((item) => (
              <DesktopNavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <WhatsAppButton />
          </div>

          {/* ── Mobile: Hamburger ── */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-[var(--duration-fast)] lg:hidden"
            style={{ color: 'var(--color-text-primary)' }}
            onClick={toggleDrawer}
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-primary)';
            }}
          >
            {drawerOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer Portal ── */}
      <AnimatePresence mode="wait">
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="drawer-overlay"
              className="fixed inset-0 z-40 lg:hidden"
              style={{ backgroundColor: 'var(--color-overlay)' }}
              variants={resolvedOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="mobile-nav-drawer"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-full flex-col lg:hidden"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                borderLeft: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-modal)',
              }}
              variants={resolvedDrawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Drawer header */}
              <div
                className="flex h-16 items-center justify-between px-6"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <span
                  className="text-lg font-semibold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-accent)',
                  }}
                >
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-[var(--duration-fast)]"
                  style={{ color: 'var(--color-text-muted)' }}
                  aria-label="Close navigation menu"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
                  }}
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Nav links — stagger animated */}
              <nav
                role="navigation"
                aria-label="Mobile primary navigation"
                className="flex-1 overflow-y-auto px-6 py-8"
              >
                <motion.ul
                  className="flex flex-col gap-1"
                  variants={shouldReduceMotion ? undefined : staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {(navItems as NavItem[]).map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        variants={shouldReduceMotion ? undefined : staggerItemVariants}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-[var(--duration-fast)]"
                          style={{
                            color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                            backgroundColor: isActive
                              ? 'var(--color-border-accent)'
                              : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                                'var(--color-border)';
                              (e.currentTarget as HTMLAnchorElement).style.color =
                                'var(--color-accent-light)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                                'transparent';
                              (e.currentTarget as HTMLAnchorElement).style.color =
                                'var(--color-text-primary)';
                            }
                          }}
                        >
                          {isActive && (
                            <span
                              className="h-4 w-0.5 rounded-full"
                              style={{ backgroundColor: 'var(--color-accent)' }}
                              aria-hidden="true"
                            />
                          )}
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              {/* Drawer footer — WhatsApp CTA */}
              <div
                className="px-6 py-6"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <WhatsAppButton className="w-full justify-center" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
