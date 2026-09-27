import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Typography Scale ─────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],      // 11px
        xs: ["0.75rem", { lineHeight: "1rem" }],           // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }],       // 14px
        base: ["1rem", { lineHeight: "1.5rem" }],          // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],       // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }],        // 20px
        "2xl": ["1.75rem", { lineHeight: "2.25rem" }],     // 28px
        "3xl": ["2.5rem", { lineHeight: "3rem" }],         // 40px
        "4xl": ["4rem", { lineHeight: "4.5rem" }],         // 64px
        "5xl": ["6rem", { lineHeight: "6.5rem" }],         // 96px
        "hero": ["clamp(4rem, 12vw, 9rem)", { lineHeight: "0.9" }], // Fluid hero type
      },

      // ─── Color tokens — swappable without touching component code ─────────────
      // WCAG AA contrast note: confirm all text/bg combos pass 4.5:1 (normal) or 3:1 (large text)
      // when palette values are finalised.
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          elevated: "var(--color-bg-elevated)",
          overlay: "var(--color-overlay)",
        },
        text: {
          primary: "var(--color-text-primary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          muted: "var(--color-accent-muted)",
          foreground: "var(--color-accent-foreground)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          subtle: "var(--color-border-subtle)",
        },
      },

      // ─── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        card: "var(--radius-card)",
        modal: "var(--radius-modal)",
        pill: "var(--radius-pill)",
      },

      // ─── Box Shadow ───────────────────────────────────────────────────────────
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        modal: "var(--shadow-modal)",
      },

      // ─── Animation / Motion ──────────────────────────────────────────────────
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
        hero: "800ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 250ms ease-out forwards",
        "slide-up": "slide-up 400ms ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
