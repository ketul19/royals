import Link from "next/link";
import { Link2, Globe, MapPin, Phone, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/buildWhatsAppLink";
import type { SiteConfig, NavItem } from "@/types";
import type { LucideIcon } from "lucide-react";

// Lucide-react doesn't include brand icons (Instagram, Facebook, etc.)
// We use Globe/Link2 as generic social link icons.
// To add brand icons, install react-icons and swap here without touching any other file.
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Link2,
  facebook: Globe,
  twitter: Link2,
  youtube: Link2,
};

interface FooterProps {
  site: SiteConfig;
  navItems: NavItem[];
}

export default function Footer({ site, navItems }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{ background: "var(--color-bg-section)", borderTop: "1px solid var(--color-border-subtle)" }}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(to right, transparent, var(--color-accent), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label={`${site.name} — Home`}>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-accent)" }}
              >
                Royal&apos;s Inn
              </h2>
            </Link>
            <p
              className="text-sm mb-6 max-w-xs leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {site.tagline}
            </p>

            {/* Contact info — all hover states via CSS classes, no JS event handlers */}
            <div className="space-y-3">
              <address className="not-italic">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex items-start gap-3 text-sm"
                  aria-label={`Address: ${site.address}`}
                >
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                  <span>{site.address}</span>
                </a>
              </address>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="footer-link flex items-center gap-3 text-sm"
                aria-label={`Phone: ${site.phone}`}
              >
                <Phone
                  size={16}
                  className="shrink-0"
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden="true"
                />
                <span>{site.phone}</span>
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link flex items-center gap-3 text-sm"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle
                  size={16}
                  className="shrink-0"
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden="true"
                />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Social links — only render platforms present in JSON */}
            {site.socials.length > 0 && (
              <div className="flex items-center gap-3 mt-6">
                {site.socials.map(({ platform, url }) => {
                  const Icon = SOCIAL_ICONS[platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon w-9 h-9 flex items-center justify-center rounded-pill border"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-muted)",
                      }}
                      aria-label={`${site.name} on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-accent)" }}
            >
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Policies */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-accent)" }}
            >
              Information
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Rooms & Rates", href: "/rooms" },
                { label: "The Table (Dining)", href: "/dining" },
                { label: "Events & Banquet", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="footer-link text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {/* Placeholder policies — edit content here without touching component logic */}
                Check-in: 12:00 PM · Check-out: 11:00 AM
                <br />
                Cancellation policy: 24-hour notice required.
                <br />
                All prices in INR, inclusive of taxes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8"
          style={{ borderTop: "1px solid var(--color-border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Navsari, Gujarat, India — 4.5★ on Google
          </p>
        </div>
      </div>
    </footer>
  );
}
