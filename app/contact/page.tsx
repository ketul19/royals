'use client';

import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import siteConfig from '@/data/site.json';
import dynamic from 'next/dynamic';

/**
 * Contact form design decision (documented per brief §12):
 * On submit, this form constructs a pre-filled WhatsApp message from the form
 * fields and opens wa.me in a new tab. There is NO form POST to any server
 * endpoint — there is no backend to receive it. This is intentional and
 * consistent with the site's WhatsApp-first contact model.
 *
 * Upgrade path: if email delivery is needed in future, add a Vercel/Netlify
 * serverless function to handle POST requests.
 */

// Dynamic import for Leaflet (browser-only — SSR not supported)
const MapEmbed = dynamic(() => import('@/components/contact/MapEmbed'), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-80 items-center justify-center rounded-lg"
      style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
    >
      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading map…</span>
    </div>
  ),
});

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = 'Name is required';
    if (!values.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(values.email)) e.email = 'Valid email address required';
    if (!values.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    // Construct pre-filled WhatsApp message from form fields
    const waMsg = `Hi! I'm ${values.name} (${values.email}). \n\n${values.message}`;
    const url = buildWhatsAppLink(waMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const inputStyle = {
    backgroundColor: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: 'var(--radius-md)',
  };

  if (submitted) {
    return (
      <div className="rounded-lg p-8 text-center" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-accent)' }}>
        <p className="mb-2 text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>Message Sent!</p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          WhatsApp opened with your pre-filled message. Our team will respond shortly.
        </p>
        <button
          className="mt-4 text-xs underline"
          style={{ color: 'var(--color-text-muted)' }}
          onClick={() => { setSubmitted(false); setValues({ name: '', email: '', message: '' }); }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          Full Name <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Your name"
          required
          aria-required="true"
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full px-4 py-3 text-sm outline-none transition-all duration-[var(--duration-fast)] focus:ring-2"
          style={{ ...inputStyle, outlineColor: 'var(--color-accent)' }}
          onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-accent)'; }}
          onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-border)'; }}
        />
        {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs" style={{ color: '#ef4444' }}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          Email Address <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="you@example.com"
          required
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="w-full px-4 py-3 text-sm outline-none transition-all duration-[var(--duration-fast)]"
          style={{ ...inputStyle }}
          onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-accent)'; }}
          onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-border)'; }}
        />
        {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs" style={{ color: '#ef4444' }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          Message <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <textarea
          id="contact-message"
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          placeholder="Your enquiry or message…"
          rows={5}
          required
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full resize-none px-4 py-3 text-sm outline-none transition-all duration-[var(--duration-fast)]"
          style={{ ...inputStyle }}
          onFocus={(e) => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--color-accent)'; }}
          onBlur={(e) => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--color-border)'; }}
        />
        {errors.message && <p id="message-error" role="alert" className="mt-1 text-xs" style={{ color: '#ef4444' }}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-[var(--duration-base)] hover:scale-[1.01]"
        style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent-light)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent)'; }}
      >
        <MessageCircle size={16} aria-hidden="true" />
        Send via WhatsApp
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <div className="py-20 text-center" style={{ backgroundColor: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border)' }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>Get in Touch</p>
        <h1 className="text-5xl font-semibold lg:text-6xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          Contact Us
        </h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: Info + Form */}
          <div className="flex flex-col gap-10">
            {/* Contact info */}
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-accent)' }}>
                  <MapPin size={18} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>Address</p>
                  <address className="not-italic text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {siteConfig.address}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-accent)' }}>
                  <Phone size={18} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>Phone / WhatsApp</p>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-accent)' }}>
                  <Clock size={18} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>Reception Hours</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Open 24 hours, 7 days a week</p>
                </div>
              </div>

              <a
                href={buildWhatsAppLink("Hi! I'd like to contact Royal's Inn.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-[var(--duration-base)] hover:scale-[1.02]"
                style={{ backgroundColor: '#25D366', color: '#fff' }}
              >
                <MessageCircle size={16} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Right: Map */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              Find Us
            </h2>
            <MapEmbed />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${siteConfig.mapCoordinates.lat},${siteConfig.mapCoordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-[var(--duration-base)] hover:gap-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Get Directions on Google Maps ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
