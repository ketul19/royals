'use client';

/**
 * FloatingActionStack — fixed bottom-right on every page.
 *
 * Stack (bottom to top):
 *  1. Chat launcher → opens ChatPanel
 *  2. Leave a Review → opens popover linking to Google Reviews
 *
 * Accessibility:
 *  - aria-label on all icon buttons
 *  - min 44×44px touch targets
 *  - Visible focus states (from :focus-visible in globals.css)
 */

import { useState, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Star, X } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants, chatPanelVariants } from '@/lib/animationVariants';
import { buildWhatsAppLink } from '@/lib/buildWhatsAppLink';
import { matchesKeywords } from '@/lib/utils';
import chatbotData from '@/data/chatbot.json';
import siteConfig from '@/data/site.json';
import type { ChatbotConfig } from '@/types';

const chatbot = chatbotData as ChatbotConfig;

// ── Review Popover ────────────────────────────────────────────────────────────

function ReviewPopover({ onClose }: { onClose: () => void }) {
  const shouldReduce = useReducedMotion();
  const googleUrl = siteConfig.googleReviewUrl;

  return (
    <motion.div
      className="absolute bottom-16 right-0 w-72 rounded-lg p-5"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-accent)',
        boxShadow: 'var(--shadow-modal)',
      }}
      variants={shouldReduce ? undefined : chatPanelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="dialog"
      aria-label="Leave a review"
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
            Enjoyed your stay?
          </p>
          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.round(siteConfig.googleRating) ? 'var(--color-accent)' : 'none'}
                stroke="var(--color-accent)"
                aria-hidden="true"
              />
            ))}
            <span className="ml-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {siteConfig.googleRating} on Google
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-2 rounded p-1"
          aria-label="Close review prompt"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <X size={14} />
        </button>
      </div>
      <p className="mb-4 text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
        Share your experience on Google to help other travellers discover Royal&apos;s Inn.
      </p>
      {googleUrl ? (
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-md py-2.5 text-center text-sm font-semibold transition-all duration-[var(--duration-base)]"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
          onClick={onClose}
        >
          Review us on Google ↗
        </a>
      ) : (
        <p className="rounded-md py-2.5 text-center text-xs" style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
          Review link coming soon
        </p>
      )}
    </motion.div>
  );
}

// ── Chat Panel ────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

function getTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const shouldReduce = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'bot', text: chatbot.welcomeMessage, time: getTime() },
  ]);
  const [input, setInput] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim(), time: getTime() };

    // Find matching rule
    const matched = chatbot.rules.find((r) => matchesKeywords(text, r.keywords));
    const botReply = matched?.response ?? chatbot.fallbackResponse;

    const botMsg: Message = { id: Date.now() + 1, role: 'bot', text: botReply, time: getTime() };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
    setShowQuickReplies(false);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <motion.div
      className="absolute bottom-16 right-0 flex flex-col overflow-hidden rounded-lg"
      style={{
        width: 'min(360px, 90vw)',
        maxHeight: '480px',
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-accent)',
        boxShadow: 'var(--shadow-modal)',
      }}
      variants={shouldReduce ? undefined : chatPanelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="dialog"
      aria-label="Royal's Inn chat assistant"
    >
      {/* Header */}
      <div
        className="flex shrink-0 items-center justify-between px-4 py-3"
        style={{ backgroundColor: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)', fontFamily: 'var(--font-display)' }}
            aria-hidden="true"
          >
            R
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>Royal&apos;s Inn Assistant</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Ask me anything</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* WhatsApp handoff */}
          <a
            href={buildWhatsAppLink("Hi! I'd like to chat with someone at Royal's Inn.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-[var(--duration-fast)]"
            style={{ backgroundColor: '#25D366', color: '#fff' }}
            aria-label="Chat on WhatsApp for human assistance"
            title="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-[var(--duration-fast)]"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className="max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed"
              style={{
                backgroundColor: msg.role === 'bot' ? 'var(--color-bg-card)' : 'var(--color-accent)',
                color: msg.role === 'bot' ? 'var(--color-text-primary)' : 'var(--color-bg-primary)',
              }}
            >
              {msg.text}
            </div>
            <span className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
              {msg.time}
            </span>
          </div>
        ))}

        {/* Quick replies */}
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2 pt-1">
            {chatbot.quickReplies.map((qr) => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-[var(--duration-fast)]"
                style={{
                  border: '1px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-bg-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
                }}
              >
                {qr}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="flex shrink-0 items-center gap-2 px-3 py-3"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Type a message…"
          className="flex-1 rounded-full px-4 py-2 text-sm outline-none"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
          aria-label="Type your message"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-[var(--duration-fast)] disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 2L11 13M22 2L15 22 11 13M22 2L2 9l9 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// ── FloatingActionStack ───────────────────────────────────────────────────────

export default function FloatingActionStack() {
  const [chatOpen, setChatOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
    setReviewOpen(false);
  };

  const toggleReview = () => {
    setReviewOpen((prev) => !prev);
    setChatOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
      </AnimatePresence>

      {/* Review popover */}
      <AnimatePresence>
        {reviewOpen && <ReviewPopover onClose={() => setReviewOpen(false)} />}
      </AnimatePresence>

      {/* Button stack */}
      <motion.div
        className="flex flex-col items-center gap-3"
        variants={shouldReduce ? undefined : staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Review button */}
        <motion.button
          className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-[var(--duration-base)] hover:scale-110"
          style={{
            backgroundColor: reviewOpen ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
            color: reviewOpen ? 'var(--color-bg-primary)' : 'var(--color-accent)',
            border: '2px solid var(--color-accent)',
            boxShadow: 'var(--shadow-accent)',
          }}
          onClick={toggleReview}
          aria-label={reviewOpen ? 'Close review prompt' : 'Leave a review on Google'}
          aria-expanded={reviewOpen}
          variants={shouldReduce ? undefined : staggerItemVariants}
        >
          <Star size={20} aria-hidden="true" />
        </motion.button>

        {/* Chat button */}
        <motion.button
          className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-[var(--duration-base)] hover:scale-110"
          style={{
            backgroundColor: chatOpen ? 'var(--color-accent)' : 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
            boxShadow: 'var(--shadow-accent)',
          }}
          onClick={toggleChat}
          aria-label={chatOpen ? 'Close chat' : 'Open chat assistant'}
          aria-expanded={chatOpen}
          variants={shouldReduce ? undefined : staggerItemVariants}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent-light)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent)';
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {chatOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={22} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle size={22} aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
}
