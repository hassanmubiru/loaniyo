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

  // Resolve initial theme: localStorage → OS preference → 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = readStoredTheme();
    const osPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return resolveTheme(stored, osPrefersDark);
  });

  // Listen for OS color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const osPreference: Theme = mediaQuery.matches ? 'dark' : 'light';
    setSystemPreference(osPreference);

    const handler = (e: MediaQueryListEvent) => {
      const newPreference: Theme = e.matches ? 'dark' : 'light';
      setSystemPreference(newPreference);

      // If no stored preference, follow the OS
      const stored = readStoredTheme();
      if (stored !== 'dark' && stored !== 'light') {
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
