// Theme constants and utilities for Loaniyo landing page

export const THEME_STORAGE_KEY = 'loaniyo-theme';

export type Theme = 'light' | 'dark';

export const THEME_COLORS = {
  dark: {
    background: '#0F172A',
    text: '#F8FAFC',
  },
  light: {
    background: '#FFFFFF',
    text: '#111827',
  },
} as const;

export const THEME_TRANSITION_MS = 300;

/**
 * Resolves the active theme based on priority chain:
 * 1. localStorage value (if valid)
 * 2. OS preferred color scheme
 * 3. 'light' fallback
 *
 * This is a pure function used by both the ThemeProvider and property tests.
 */
export function resolveTheme(
  storedValue: string | null,
  osPrefersDark: boolean
): Theme {
  if (storedValue === 'dark' || storedValue === 'light') {
    return storedValue;
  }
  if (osPrefersDark) {
    return 'dark';
  }
  return 'light';
}

/**
 * Safely reads the theme value from localStorage.
 * Returns null if localStorage is unavailable or the value is invalid.
 */
export function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Safely writes the theme value to localStorage.
 * Silently fails if localStorage is unavailable (Req 16.6).
 */
export function writeStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable — continue without persisting (Req 16.6)
  }
}
