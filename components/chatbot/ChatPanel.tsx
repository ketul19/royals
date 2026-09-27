"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import type { ChatbotConfig, SiteConfig } from "@/types";
import { buildWhatsAppLink } from "@/lib/buildWhatsAppLink";
import { chatPanelVariants } from "@/lib/animationVariants";
import MessageBubble from "./MessageBubble";

interface Props {
  chatbot: ChatbotConfig;
  site: SiteConfig;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export default function ChatPanel({ chatbot, site, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-welcome", sender: "bot", text: chatbot.welcomeMessage }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    let botResponse = chatbot.fallbackResponse;
    const lowerInput = text.toLowerCase();
    const words: string[] = lowerInput.match(/\b(\w+)\b/g) ?? [];

    const matchedRule = chatbot.rules.find((rule) =>
      rule.keywords.some((keyword) => words.includes(keyword.toLowerCase()))
    );

    if (matchedRule) {
      botResponse = matchedRule.response;
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now() + 1}`, sender: "bot", text: botResponse }
      ]);
    }, 400);
  };

  const waLink = buildWhatsAppLink(site.whatsappNumber, "Hello, I have a question from the website.");

  return (
    <motion.div
      variants={chatPanelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed z-50 flex flex-col overflow-hidden backdrop-blur-md rounded-modal shadow-modal"
      style={{
        bottom: "7rem",
        right: "1.5rem",
        width: "360px",
        height: "480px",
        maxHeight: "80vh",
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--color-border)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-panel-title"
      id="chat-panel"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{
          background: "var(--color-bg-secondary)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <h2 id="chat-panel-title" className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
          {site.name} Assistant
        </h2>
        <div className="flex items-center gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full transition-colors"
            style={{ background: "var(--color-accent)", color: "var(--color-text-inverse)" }}
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={14} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Close chat"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col scrollbar-thin">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Quick Replies */}
        {messages.length === 1 && chatbot.quickReplies && (
          <div className="flex flex-wrap gap-2 mt-2">
            {chatbot.quickReplies.map((reply, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(reply)}
                className="text-xs px-3 py-1.5 rounded-pill transition-colors text-left"
                style={{
                  background: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)"
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputValue);
        }}
        className="p-3 shrink-0"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-card"
          style={{ background: "var(--color-bg-primary)", border: "1px solid var(--color-border-subtle)" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
            style={{ color: "var(--color-text-primary)" }}
            aria-label="Chat message"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-1 rounded-full transition-opacity disabled:opacity-50"
            style={{ color: "var(--color-accent)" }}
            aria-label="Send message"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
