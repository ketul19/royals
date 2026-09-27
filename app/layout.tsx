import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import FloatingActionStack from "@/components/layout/FloatingActionStack";
import siteData from "@/data/site.json";
import navData from "@/data/navigation.json";
import chatbotData from "@/data/chatbot.json";
import type { SiteConfig, NavItem, ChatbotConfig } from "@/types";

const site = siteData as SiteConfig;
const navItems = navData as NavItem[];
const chatbot = chatbotData as ChatbotConfig;

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://royalsinn.in"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Royal's Inn Hotel & Hostel in Navsari, Gujarat — AC rooms, Non-AC rooms, hostel dormitory, restaurant, banquet hall. Book via WhatsApp.",
  keywords: [
    "Royal's Inn Hotel",
    "hotel in Navsari",
    "hostel Navsari",
    "Gujarat hotel",
    "Navsari accommodation",
    "budget hotel Navsari",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Royal's Inn Hotel & Hostel in Navsari, Gujarat — AC rooms, dining, and event spaces.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <PageLoader />
        <Header site={site} navItems={navItems} />
        <main id="main-content">{children}</main>
        <Footer site={site} navItems={navItems} />
        <FloatingActionStack site={site} chatbot={chatbot} />
      </body>
    </html>
  );
}
