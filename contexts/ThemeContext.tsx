'use client';

/**
 * ThemeContext — Global dark/light theme provider for Royal's Inn.
 *
 * Architecture:
 *  - Theme stored as 'dark' | 'light' in localStorage under key THEME_KEY.
 *  - Applied as data-theme="dark|light" attribute on <html> element.
 *  - CSS custom properties in globals.css respond to [data-theme="light"] selector.
 *  - Switching theme changes the attribute → browser repaints via CSS cascade
 *    with ZERO React re-renders of any content component.
 *  - Two-pass mounting pattern prevents React SSR hydration mismatches:
 *    default is 'dark' on server and initial client pass; client storage syncs
 *    in useEffect after hydration completes.
 *  - A flash-prevention inline script in layout.tsx reads localStorage and sets
 *    the attribute before React hydrates (eliminates FOUT).
 *
 * Usage:
 *  const { theme, toggleTheme, mounted } = useTheme();
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

// ── Constants ─────────────────────────────────────────────────────────────────

const THEME_KEY = 'royals-inn-theme';
type Theme = 'dark' | 'light';

// ── Context ───────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  mounted: false,
});

// ── Provider ──────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always initialize with 'dark' on SSR and initial client pass
  // to ensure server-rendered markup matches client initial render 100%.
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Read stored preference once mounted on the client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY) as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
      }
    } catch {
      // localStorage may be disabled in private browsing
    }
    setMounted(true);
  }, []);

  // Keep the <html> data-theme attribute in sync whenever theme changes
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/** Consume theme context — must be used inside <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

/**
 * Inline script string injected into <head> BEFORE React hydrates.
 * Reads localStorage and sets data-theme immediately to prevent FOUT
 * (Flash of Unstyled Theme). This runs synchronously in the browser.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){}})();`;
