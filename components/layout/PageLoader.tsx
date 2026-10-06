'use client';

/**
 * PageLoader — first-session animated crest reveal.
 *
 * Trigger rule: only on the first browser session load.
 * Sets sessionStorage.hasSeenLoader after first play.
 * Subsequent route navigations do NOT replay this.
 *
 * Animation sequence:
 *  1. SVG paths draw from pathLength 0→1 (stroke-draw, ~1000ms)
 *  2. 200ms pause
 *  3. Stroke-only cross-fades to filled (~250ms)
 *  4. Overlay fades out (~400ms)
 *
 * prefers-reduced-motion: skips draw, shows static filled logo, fades out after 500ms.
 * Hard max timeout: 2500ms — forces completion if animation logic fails.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const LOADER_KEY = 'hasSeenLoader';

export default function PageLoader() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'drawing' | 'filling' | 'done'>('drawing');
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    // Check if this is the first load this session
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem(LOADER_KEY);
    if (seen === 'true') return; // Already shown — skip entirely
    setShow(true);

    // Hard max timeout — never trap the user
    const maxTimer = setTimeout(() => complete(), 2500);

    if (shouldReduce) {
      // Reduced motion: skip draw animation, just show and fade
      setTimeout(() => complete(), 600);
      return () => clearTimeout(maxTimer);
    }

    // Normal sequence
    // Drawing phase: 1000ms
    const fillTimer = setTimeout(() => setPhase('filling'), 1000);
    // Filling phase: 250ms
    const doneTimer = setTimeout(() => complete(), 1350);

    return () => {
      clearTimeout(maxTimer);
      clearTimeout(fillTimer);
      clearTimeout(doneTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function complete() {
    setPhase('done');
    setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(LOADER_KEY, 'true');
    }, 450); // allow exit animation
  }

  if (!show) return null;

  const isFilling = phase === 'filling' || phase === 'done';

  // Stroke draw transition
  const drawTransition = { duration: 1.0, ease: 'easeInOut' as const };
  const fillTransition = { duration: 0.25, ease: 'easeOut' as const };

  return (
    <AnimatePresence>
      {show && phase !== 'done' && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-bg-primary)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Royal's Inn Crest SVG — inline for zero network request */}
          <svg
            viewBox="0 0 200 220"
            width="160"
            height="176"
            aria-label="Royal's Inn crest"
            role="img"
            style={{ display: 'block' }}
          >
            {/* ── Crown ── */}
            <motion.path
              d="M100 8 L88 28 L80 18 L76 38 L72 22 L68 45 H132 L128 22 L124 38 L120 18 L112 28 Z"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isFilling ? 'var(--color-accent)' : 'none'}
              initial={shouldReduce ? { opacity: 1 } : { pathLength: 0 }}
              animate={shouldReduce ? { opacity: 1 } : { pathLength: 1 }}
              transition={drawTransition}
              style={{
                transition: isFilling ? `fill ${fillTransition.duration}s ${fillTransition.ease}` : undefined,
              }}
            />
            {/* Crown jewels */}
            {[88, 100, 112].map((cx) => (
              <motion.circle
                key={cx}
                cx={cx}
                cy={22}
                r="3"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                fill={isFilling ? 'var(--color-accent)' : 'none'}
                initial={shouldReduce ? { opacity: 1 } : { pathLength: 0 }}
                animate={shouldReduce ? { opacity: 1 } : { pathLength: 1 }}
                transition={{ ...drawTransition, delay: 0.3 }}
              />
            ))}

            {/* ── Shield ── */}
            <motion.path
              d="M60 52 H140 V130 Q140 160 100 178 Q60 160 60 130 Z"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isFilling ? 'var(--color-accent)' : 'none'}
              initial={shouldReduce ? { opacity: 1 } : { pathLength: 0 }}
              animate={shouldReduce ? { opacity: 1 } : { pathLength: 1 }}
              transition={{ ...drawTransition, delay: 0.15 }}
              style={{
                transition: isFilling ? `fill ${fillTransition.duration}s ${fillTransition.ease}` : undefined,
              }}
            />

            {/* Shield inner border */}
            <motion.path
              d="M66 58 H134 V130 Q134 156 100 172 Q66 156 66 130 Z"
              stroke="var(--color-accent)"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
              initial={shouldReduce ? { opacity: 0.5 } : { pathLength: 0 }}
              animate={shouldReduce ? { opacity: 0.5 } : { pathLength: 1 }}
              transition={{ ...drawTransition, delay: 0.2 }}
            />

            {/* ── Letter R ── */}
            <motion.text
              x="100"
              y="128"
              textAnchor="middle"
              fontSize="52"
              fontFamily="Georgia, serif"
              fontWeight="bold"
              stroke={isFilling ? 'none' : 'var(--color-accent)'}
              strokeWidth="1"
              fill={isFilling ? 'var(--color-bg-primary)' : 'none'}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              R
            </motion.text>

            {/* ── Left Lion ── */}
            <motion.g
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isFilling ? 'var(--color-accent)' : 'none'}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {/* Body */}
              <ellipse cx="35" cy="110" rx="14" ry="22" />
              {/* Head */}
              <circle cx="35" cy="80" r="10" />
              {/* Mane */}
              <circle cx="35" cy="80" r="13" opacity="0.5" />
              {/* Front paw up */}
              <path d="M42 95 Q52 82 54 75" strokeWidth="2" />
              <ellipse cx="55" cy="73" rx="4" ry="3" />
              {/* Hind leg */}
              <path d="M28 125 Q24 138 22 148" />
              <path d="M38 125 Q42 140 44 148" />
              {/* Tail */}
              <path d="M49 120 Q60 108 58 95 Q56 85 62 82" />
              {/* Eye */}
              <circle cx="38" cy="78" r="1.5" fill="var(--color-accent)" />
            </motion.g>

            {/* ── Right Lion (mirrored) ── */}
            <motion.g
              transform="translate(200,0) scale(-1,1)"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isFilling ? 'var(--color-accent)' : 'none'}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <ellipse cx="35" cy="110" rx="14" ry="22" />
              <circle cx="35" cy="80" r="10" />
              <circle cx="35" cy="80" r="13" opacity="0.5" />
              <path d="M42 95 Q52 82 54 75" strokeWidth="2" />
              <ellipse cx="55" cy="73" rx="4" ry="3" />
              <path d="M28 125 Q24 138 22 148" />
              <path d="M38 125 Q42 140 44 148" />
              <path d="M49 120 Q60 108 58 95 Q56 85 62 82" />
              <circle cx="38" cy="78" r="1.5" fill="var(--color-accent)" />
            </motion.g>

            {/* ── Scrollwork / Flourishes ── */}
            <motion.g
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              initial={shouldReduce ? { opacity: 1 } : { pathLength: 0 }}
              animate={shouldReduce ? { opacity: 1 } : { pathLength: 1 }}
              transition={{ ...drawTransition, delay: 0.7 }}
            >
              {/* Center scroll */}
              <path d="M85 190 Q100 195 115 190" />
              <path d="M80 196 Q100 204 120 196" />
              {/* Left scroll */}
              <path d="M60 192 Q72 185 75 190 Q72 195 60 192 Q52 190 50 182 Q55 175 62 178" />
              {/* Right scroll */}
              <path d="M140 192 Q128 185 125 190 Q128 195 140 192 Q148 190 150 182 Q145 175 138 178" />
            </motion.g>

            {/* Hotel name below crest */}
            <motion.text
              x="100"
              y="215"
              textAnchor="middle"
              fontSize="9"
              fontFamily="Georgia, serif"
              letterSpacing="3"
              fill="var(--color-accent)"
              opacity="0.8"
              initial={shouldReduce ? { opacity: 0.8 } : { opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              ROYAL&apos;S INN
            </motion.text>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
