'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type Theme,
  resolveTheme,
  readStoredTheme,
  writeStoredTheme,
} from '@/lib/theme';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  systemPreference: Theme;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Detect OS color scheme preference
  const [systemPreference, setSystemPreference] = useState<Theme>('light');

  // Initialize theme to 'light' on BOTH server and the client's first render so
  // that hydration matches. The real theme (localStorage → OS preference) is
  // resolved after mount in the effect below. The inline script in layout.tsx
  // already applies the correct `dark` class before paint, so there is no
  // visual flash — only React's initial render must stay consistent. (Req 16.7)
  const [theme, setTheme] = useState<Theme>('light');

  // Resolve the real theme after mount and listen for OS color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const osPreference: Theme = mediaQuery.matches ? 'dark' : 'light';
    setSystemPreference(osPreference);

    // Resolve the actual theme now that we can safely read client-only APIs
    const stored = readStoredTheme();
    const resolved = resolveTheme(stored, mediaQuery.matches);
    setTheme(resolved);
    applyThemeClass(resolved);

    const handler = (e: MediaQueryListEvent) => {
      const newPreference: Theme = e.matches ? 'dark' : 'light';
      setSystemPreference(newPreference);

      // If no stored preference, follow the OS
      const currentStored = readStoredTheme();
      if (currentStored !== 'dark' && currentStored !== 'light') {
        setTheme(newPreference);
        applyThemeClass(newPreference);
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Apply dark class on mount (in case SSR didn't match)
  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      writeStoredTheme(next);
      applyThemeClass(next);
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme, systemPreference }),
    [theme, toggleTheme, systemPreference]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Adds or removes the 'dark' class on document.documentElement.
 */
function applyThemeClass(theme: Theme): void {
  if (typeof document === 'undefined') return;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
