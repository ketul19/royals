'use client';

import { useState } from 'react';
import { SiteConfig } from '@/types';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapEmbed = dynamic(() => import('./MapEmbed'), { ssr: false });

export function ContactPageClient({ site }: { site: SiteConfig }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    const message = `Hello, I am ${formData.name} (${formData.email}).\n\n${formData.message}`;
    const url = buildWhatsAppLink(message, site.whatsappNumber);
    
    // Form uses WhatsApp redirect on submit (no backend). See §12 of build spec for rationale.
    window.open(url, '_blank');
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <section className="h-[35vh] flex flex-col items-center justify-center bg-zinc-900 border-b border-zinc-800 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center">Get in Touch</h1>
      </section>

      <div className="container mx-auto px-4 mt-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: Contact Form */}
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-800 rounded-lg text-green-400">
                Thanks! We'll reply to your message on WhatsApp shortly.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors resize-none"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Send via WhatsApp
              </button>
            </form>
          </div>

          {/* RIGHT: Info & Map */}
          <div className="space-y-8">
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
              <h2 className="text-2xl font-bold text-white">Contact Information</h2>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Address</h3>
                  <p className="text-zinc-400 leading-relaxed">{site.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-accent-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Phone</h3>
                  <p className="text-zinc-400">{site.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-accent-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Reception Hours</h3>
                  <p className="text-zinc-400">24/7 Available</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-zinc-800">
                <a 
                  href={buildWhatsAppLink(null, site.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-500 hover:text-accent-400 font-medium transition-colors"
                >
                  <MessageCircle size={20} />
                  Chat with us on WhatsApp directly
                </a>
              </div>
            </div>

            <MapEmbed site={site} />
          </div>

        </div>
      </div>
    </div>
  );
}
