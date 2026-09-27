import { MapPin, Shield, Clock, Heart, Users } from 'lucide-react';
import Link from 'next/link';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';

export const metadata = {
  title: "About Us | Royal's Inn",
  description: "Learn about the history, values, and mission of Royal's Inn.",
};

export default function AboutPage() {
  const whyChooseUs = [
    { icon: MapPin, title: "Prime Location", desc: "Located in the heart of Navsari, near top attractions." },
    { icon: Shield, title: "Safe & Secure", desc: "24/7 security ensuring a peaceful stay." },
    { icon: Heart, title: "Royal Hospitality", desc: "Our team treats every guest like family." },
    { icon: Clock, title: "24/7 Support", desc: "Reception and room service available around the clock." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 text-zinc-300">
      <section className="h-[40vh] flex flex-col items-center justify-center bg-zinc-900 border-b border-zinc-800 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">About Royal's Inn</h1>
        <p className="text-lg max-w-2xl text-zinc-400">A legacy of comfort, convenience, and unparalleled hospitality in Navsari.</p>
      </section>

      <div className="container mx-auto px-4 mt-16 max-w-4xl space-y-24">
        
        {/* Our Story */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <p className="leading-relaxed text-lg">
            Established with a vision to redefine hospitality in Navsari, Royal's Inn started as a humble idea to create a space where modern amenities meet traditional warmth. Over the years, we've hosted countless travelers, families, and corporate guests, always striving to deliver an experience that feels truly royal.
          </p>
          <p className="leading-relaxed text-lg">
            Our mission is simple: To provide exceptional comfort, top-notch service, and a memorable stay for everyone who walks through our doors. Whether you are here for a quick business trip or a leisurely family vacation, we ensure your needs are met with the utmost care.
          </p>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {whyChooseUs.map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
                <feature.icon className="w-8 h-8 text-accent-500 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Team */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">The Team</h2>
          <div className="flex justify-center mb-8">
            <Users className="w-16 h-16 text-zinc-700" />
          </div>
          <p className="leading-relaxed text-lg max-w-2xl mx-auto">
            Behind every comfortable stay is our dedicated team of hospitality professionals. From our warm receptionists to our meticulous housekeeping staff and expert chefs, we work tirelessly behind the scenes to make your stay effortless and enjoyable.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-zinc-900 rounded-3xl p-10 text-center border border-zinc-800">
          <h2 className="text-3xl font-bold text-white mb-6">Experience the Royalty</h2>
          <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto">Ready to book your stay or have a question? We're here to help you plan the perfect visit.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/rooms" className="px-8 py-3 bg-white text-zinc-950 font-medium rounded-full hover:bg-zinc-200 transition-colors">
              View Rooms
            </Link>
            <a 
              href={buildWhatsAppLink("Hi, I'd like to know more about booking a room at Royal's Inn.")} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-accent-600 text-white font-medium rounded-full hover:bg-accent-700 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
