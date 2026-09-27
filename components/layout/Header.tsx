"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/buildWhatsAppLink";
import type { SiteConfig, NavItem } from "@/types";

// Inline crest SVG logo (simplified, rendered from the provided reference)
function CrestLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      <g fill="#DB9C4B">
        {/* Shield */}
        <path d="M20 12 L100 12 C108 12 114 18 114 26 L114 62 C114 82 60 96 60 96 C60 96 6 82 6 62 L6 26 C6 18 12 12 20 12 Z" opacity="0.15" />
        <path d="M20 12 L100 12 C108 12 114 18 114 26 L114 62 C114 82 60 96 60 96 C60 96 6 82 6 62 L6 26 C6 18 12 12 20 12 Z" fill="none" stroke="#DB9C4B" strokeWidth="2.5" />
        {/* Crown */}
        <path d="M36 14 L36 7 L48 13 L54 5 L60 13 L66 5 L72 13 L84 7 L84 14" fill="none" stroke="#DB9C4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="33" y="14" width="54" height="8" rx="2" opacity="0.8" />
        {/* R letter */}
        <text x="40" y="75" fontFamily="Georgia, serif" fontSize="44" fontWeight="bold" fill="#DB9C4B">R</text>
        {/* Left lion simplified */}
        <ellipse cx="18" cy="52" rx="10" ry="14" fill="none" stroke="#DB9C4B" strokeWidth="1.5" opacity="0.7" />
        <circle cx="18" cy="42" r="6" fill="none" stroke="#DB9C4B" strokeWidth="1.5" opacity="0.7" />
        {/* Right lion simplified */}
        <ellipse cx="102" cy="52" rx="10" ry="14" fill="none" stroke="#DB9C4B" strokeWidth="1.5" opacity="0.7" />
        <circle cx="102" cy="42" r="6" fill="none" stroke="#DB9C4B" strokeWidth="1.5" opacity="0.7" />
        {/* Scrollwork */}
        <path d="M22 84 C16 86 10 90 8 95" fill="none" stroke="#DB9C4B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <path d="M98 84 C104 86 110 90 112 95" fill="none" stroke="#DB9C4B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <path d="M35 94 C45 98 55 100 60 100 C65 100 75 98 85 94" fill="none" stroke="#DB9C4B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}

interface HeaderProps {
  site: SiteConfig;
  navItems: NavItem[];
}

export default function Header({ site, navItems }: HeaderProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const headerBg = isScrolled || !isHome || menuOpen
    ? "rgba(14, 13, 11, 0.95)"
    : "transparent";

  const headerBlur = isScrolled || !isHome ? "blur(12px)" : "none";
  const headerBorder = isScrolled || !isHome ? "var(--color-border-subtle)" : "transparent";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          background: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          borderBottom: `1px solid ${headerBorder}`,
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-smooth)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 focus-visible:outline-accent"
              aria-label={`${site.name} — Home`}
            >
              <CrestLogo className="w-10 h-10 md:w-12 md:h-12" />
              <span
                className="text-lg font-semibold tracking-wide hidden sm:block"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-accent)" }}
              >
                Royal&apos;s Inn
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium rounded-pill transition-colors relative group"
                    style={{
                      color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                      transitionDuration: "var(--duration-fast)",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-pill"
                        style={{ background: "var(--color-accent-muted)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {/* Hover underline */}
                    <span
                      className="absolute bottom-0.5 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform"
                      style={{
                        background: "var(--color-accent)",
                        transformOrigin: "left",
                        transitionDuration: "var(--duration-fast)",
                      }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <a
              href={buildWhatsAppLink("Hi! I'd like to enquire about Royal's Inn.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-pill transition-all"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-inverse)",
                transitionDuration: "var(--duration-fast)",
              }}
              aria-label="Enquire via WhatsApp"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Enquire Now
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg"
              style={{ color: "var(--color-text-primary)" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 30 }
            }
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: "var(--color-bg-primary)", paddingTop: "5rem" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex-1 flex flex-col px-6 py-8 gap-2" aria-label="Mobile navigation">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-4 text-xl font-medium rounded-card transition-colors"
                      style={{
                        color: isActive ? "var(--color-accent)" : "var(--color-text-primary)",
                        background: isActive ? "var(--color-accent-muted)" : "transparent",
                        fontFamily: "var(--font-display)",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="px-6 pb-12">
              <a
                href={buildWhatsAppLink("Hi! I'd like to enquire about Royal's Inn.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-semibold rounded-pill"
                style={{ background: "var(--color-accent)", color: "var(--color-text-inverse)" }}
              >
                <MessageCircle size={18} aria-hidden="true" />
                Enquire via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
