"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────────────
// Logo SVG — Inline Royal's Inn crest (shield, R, crown, two lions, scrollwork)
// Inline SVG renders immediately — no network fetch, no loading wait.
// Paths are split into logical groups for the draw-on animation sequence.
// ──────────────────────────────────────────────────────────────────────────────
const LOGO_PATHS = [
  // Shield outline
  "M60 15 L100 15 C110 15 120 25 120 35 L120 75 C120 100 80 115 80 115 C80 115 40 100 40 75 L40 35 C40 25 50 15 60 15 Z",
  // Crown top
  "M55 18 L55 10 L65 16 L70 8 L75 16 L85 10 L85 18",
  // Crown base
  "M52 18 L108 18 L106 25 L54 25 Z",
  // Letter R vertical stroke
  "M67 35 L67 85",
  // Letter R bowl
  "M67 35 L81 35 C88 35 93 40 93 48 C93 56 88 61 81 61 L67 61",
  // Letter R leg
  "M76 61 L93 85",
  // Left lion body
  "M20 55 C18 45 22 35 30 32 C25 38 24 45 26 52 C22 52 20 54 20 55 Z",
  "M20 55 C18 60 20 68 26 72 L28 65 L24 58 Z",
  "M26 52 C28 48 33 44 38 44 L38 62 C33 62 28 64 26 68 L22 65 Z",
  // Left lion head
  "M30 32 C33 28 38 26 43 27 C41 30 39 33 40 36 C36 35 32 33 30 32 Z",
  // Right lion body  
  "M140 55 C142 45 138 35 130 32 C135 38 136 45 134 52 C138 52 140 54 140 55 Z",
  "M140 55 C142 60 140 68 134 72 L132 65 L136 58 Z",
  "M134 52 C132 48 127 44 122 44 L122 62 C127 62 132 64 134 68 L138 65 Z",
  // Right lion head
  "M130 32 C127 28 122 26 117 27 C119 30 121 33 120 36 C124 35 128 33 130 32 Z",
  // Scrollwork left
  "M35 90 C30 92 25 95 22 100 C27 98 33 97 38 99",
  "M35 90 C32 95 33 100 38 104 C37 99 39 95 42 92",
  // Scrollwork right
  "M125 90 C130 92 135 95 138 100 C133 98 127 97 122 99",
  "M125 90 C128 95 127 100 122 104 C123 99 121 95 118 92",
  // Bottom ornament
  "M60 112 C65 118 75 120 80 120 C85 120 90 118 100 112",
  "M65 115 L80 122 L95 115",
];

export default function PageLoader() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"draw" | "fill" | "exit" | "done">("draw");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Only show on first session load
    const hasSeen = sessionStorage.getItem("hasSeenLoader");
    if (hasSeen) {
      setPhase("done");
      return;
    }

    setShow(true);

    if (shouldReduceMotion) {
      // Skip draw animation, just show static logo briefly
      const timer = setTimeout(() => {
        setPhase("exit");
        sessionStorage.setItem("hasSeenLoader", "1");
        setTimeout(() => setPhase("done"), 400);
      }, 800);
      return () => clearTimeout(timer);
    }

    // Full animation sequence
    // Phase 1: draw (1200ms) → Phase 2: fill (300ms) → Phase 3: exit (400ms)
    const drawTimer = setTimeout(() => setPhase("fill"), 1300);
    const fillTimer = setTimeout(() => {
      setPhase("exit");
      sessionStorage.setItem("hasSeenLoader", "1");
    }, 1700);
    const exitTimer = setTimeout(() => setPhase("done"), 2200);

    // Safety timeout: never trap user beyond 2500ms
    const safetyTimer = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("hasSeenLoader", "1");
    }, 2500);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(fillTimer);
      clearTimeout(exitTimer);
      clearTimeout(safetyTimer);
    };
  }, [shouldReduceMotion]);

  if (phase === "done" || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: "var(--color-bg-primary)" }}
        aria-label="Loading Royal's Inn"
        role="status"
        aria-live="polite"
      >
          {/* SVG Logo */}
          <motion.svg
            viewBox="0 0 160 130"
            width={shouldReduceMotion ? 120 : 140}
            height={shouldReduceMotion ? 104 : 121}
            aria-hidden="true"
            className="mb-6"
            initial={shouldReduceMotion ? { opacity: 0 } : undefined}
            animate={shouldReduceMotion ? { opacity: 1 } : undefined}
            transition={shouldReduceMotion ? { duration: 0.4 } : undefined}
          >
            {LOGO_PATHS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill={phase === "fill" || phase === "exit" ? "#DB9C4B" : "none"}
                stroke="#DB9C4B"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={shouldReduceMotion ? {} : { pathLength: 0, opacity: 0 }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        pathLength: 1,
                        opacity: 1,
                        fillOpacity: phase === "fill" || phase === "exit" ? 1 : 0,
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {}
                    : {
                        pathLength: {
                          delay: i * 0.04,
                          duration: 0.9,
                          ease: "easeInOut",
                        },
                        opacity: { delay: i * 0.04, duration: 0.01 },
                        fillOpacity: { duration: 0.3, ease: "easeOut" },
                      }
                }
              />
            ))}
          </motion.svg>

          {/* Brand name */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0.1 : 0.6, duration: 0.4 }}
            className="text-sm tracking-[0.3em] uppercase"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-display)" }}
          >
            Royal&apos;s Inn
          </motion.p>
        </motion.div>
    </AnimatePresence>
  );
}
