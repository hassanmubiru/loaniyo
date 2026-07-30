import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from '../ThemeProvider';
import { useTheme } from '@/hooks/useTheme';
import { THEME_STORAGE_KEY } from '@/lib/theme';

// Mock matchMedia for jsdom
function mockMatchMedia(prefersDark: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_event: string, handler: (e: MediaQueryListEvent) => void) => {
        listeners.push(handler);
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function TestConsumer() {
  const { theme, toggleTheme, systemPreference } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="system">{systemPreference}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    mockMatchMedia(false);
  });

  it('defaults to light theme when no stored preference and OS prefers light', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('reads stored dark preference from localStorage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('toggles theme from light to dark', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
    await user.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles theme from dark to light', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    await user.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists toggled theme to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    await user.click(screen.getByText('Toggle'));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    await user.click(screen.getByText('Toggle'));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('adds "dark" class to document.documentElement when dark', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    await user.click(screen.getByText('Toggle'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes "dark" class when toggling back to light', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    await user.click(screen.getByText('Toggle'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('useTheme outside provider', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it('throws when used outside ThemeProvider', () => {
    // Suppress React error boundary console output
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
    spy.mockRestore();
  });
});
