"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, MessageSquare, X, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import type { SiteConfig, ChatbotConfig } from "@/types";

const ChatPanel = dynamic(() => import("@/components/chatbot/ChatPanel"), { ssr: false });

interface Props { site: SiteConfig; chatbot: ChatbotConfig; }

export default function FloatingActionStack({ site, chatbot }: Props) {
  const [chatOpen, setChatOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const chatBtnRef = useRef<HTMLButtonElement>(null);
  const reviewBtnRef = useRef<HTMLButtonElement>(null);
  const shouldReduce = useReducedMotion();

  // Stack positioned fixed bottom-right, z-40
  // Two buttons: review (top) and chat (bottom)
  // Both have min-w-[44px] min-h-[44px] for tap targets
  // Review button opens a small popover
  // Chat button opens ChatPanel
  
  return (
    <>
      {/* Floating buttons stack */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Review button */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <button
            ref={reviewBtnRef}
            type="button"
            onClick={() => { setReviewOpen(v => !v); setChatOpen(false); }}
            className="flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-pill shadow-modal transition-all"
            style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}
            aria-label="Leave a review on Google"
            aria-expanded={reviewOpen}
          >
            <Star size={18} aria-hidden="true" fill="currentColor" />
            <span className="text-xs font-semibold hidden sm:block whitespace-nowrap">Leave a Review</span>
          </button>
          
          {/* Review Popover */}
          <AnimatePresence>
            {reviewOpen && (
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-3 w-64 p-4 rounded-card shadow-modal"
                style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
                role="dialog"
                aria-label="Review options"
              >
                <button
                  type="button"
                  onClick={() => setReviewOpen(false)}
                  className="absolute top-2 right-2 p-1 rounded"
                  style={{ color: 'var(--color-text-muted)' }}
                  aria-label="Close review popover"
                >
                  <X size={14} aria-hidden="true" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={18} aria-hidden="true"
                      fill={s <= 4 ? 'var(--color-accent)' : 'none'}
                      stroke="var(--color-accent)" />
                  ))}
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>4.5</span>
                </div>
                <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>Rated 4.5★ on Google. Share your experience!</p>
                {site.googleReviewUrl ? (
                  <a
                    href={site.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-card text-xs font-semibold text-center justify-center"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-text-inverse)' }}
                  >
                    <ExternalLink size={12} aria-hidden="true" />
                    Review us on Google
                  </a>
                ) : (
                  <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>Review link coming soon</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Chat button */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <button
            ref={chatBtnRef}
            type="button"
            onClick={() => { setChatOpen(v => !v); setReviewOpen(false); }}
            className="flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-pill shadow-modal transition-all"
            style={{
              background: chatOpen ? 'var(--color-bg-elevated)' : 'var(--color-accent)',
              border: '1px solid var(--color-accent)',
              color: chatOpen ? 'var(--color-accent)' : 'var(--color-text-inverse)'
            }}
            aria-label={chatOpen ? 'Close chat' : 'Open chat assistant'}
            aria-expanded={chatOpen}
            aria-controls="chat-panel"
          >
            {chatOpen ? <X size={18} aria-hidden="true" /> : <MessageSquare size={18} aria-hidden="true" />}
            <span className="text-xs font-semibold hidden sm:block whitespace-nowrap">
              {chatOpen ? 'Close' : 'Chat with Us'}
            </span>
          </button>
        </motion.div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <ChatPanel
            chatbot={chatbot}
            site={site}
            onClose={() => { setChatOpen(false); chatBtnRef.current?.focus(); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
