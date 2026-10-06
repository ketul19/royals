import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageLoader from '@/components/layout/PageLoader';
import FloatingActionStack from '@/components/layout/FloatingActionStack';
import siteConfig from '@/data/site.json';

// ── Fonts ────────────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ── Base Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} — a combined hotel and hostel in Navsari, Gujarat offering AC rooms, non-AC rooms, and affordable hostel dorms. Dining, event spaces, and warm hospitality.`,
  keywords: ['Royal\'s Inn', 'hotel Navsari', 'hostel Navsari', 'hotel Gujarat', 'accommodation Navsari'],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: `Hotel & Hostel in Navsari, Gujarat. AC rooms, non-AC rooms, hostel dorms, restaurant, and event spaces.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-inter, ui-sans-serif, system-ui, sans-serif)',
        }}
      >
        {/* Page loader — first session only (see PageLoader.tsx for trigger logic) */}
        <PageLoader />

        {/* Fixed header */}
        <Header />

        {/* Main content — all route pages render here */}
        <main className="flex-1 pt-16" id="main-content">
          {children}
        </main>

        {/* Floating action stack — review + chat widget (present on every page) */}
        <FloatingActionStack />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
