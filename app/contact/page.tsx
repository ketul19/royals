import siteData from '@/data/site.json';
import { ContactPageClient } from '@/components/contact/ContactPageClient';
import { SiteConfig } from '@/types';

export const metadata = {
  title: "Contact Us | Royal's Inn",
  description: "Get in touch with Royal's Inn for bookings, inquiries, and support.",
};

export default function ContactPage() {
  return <ContactPageClient site={siteData as SiteConfig} />;
}
