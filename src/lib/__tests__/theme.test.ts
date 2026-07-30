import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  resolveTheme,
  readStoredTheme,
  writeStoredTheme,
  THEME_STORAGE_KEY,
  THEME_COLORS,
  THEME_TRANSITION_MS,
} from '../theme';

describe('theme constants', () => {
  it('has correct dark mode colors', () => {
    expect(THEME_COLORS.dark.background).toBe('#0F172A');
    expect(THEME_COLORS.dark.text).toBe('#F8FAFC');
  });

  it('has correct light mode colors', () => {
    expect(THEME_COLORS.light.background).toBe('#FFFFFF');
    expect(THEME_COLORS.light.text).toBe('#111827');
  });

  it('has 300ms transition duration', () => {
    expect(THEME_TRANSITION_MS).toBe(300);
  });

  it('uses correct localStorage key', () => {
    expect(THEME_STORAGE_KEY).toBe('loaniyo-theme');
  });
});

describe('resolveTheme', () => {
  it('returns stored "dark" when localStorage has "dark"', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('dark', true)).toBe('dark');
  });

  it('returns stored "light" when localStorage has "light"', () => {
    expect(resolveTheme('light', false)).toBe('light');
    expect(resolveTheme('light', true)).toBe('light');
  });

  it('returns "dark" when no stored value and OS prefers dark', () => {
    expect(resolveTheme(null, true)).toBe('dark');
  });

  it('returns "light" when no stored value and OS prefers light', () => {
    expect(resolveTheme(null, false)).toBe('light');
  });

  it('ignores invalid stored values and falls through to OS', () => {
    expect(resolveTheme('invalid', true)).toBe('dark');
    expect(resolveTheme('invalid', false)).toBe('light');
    expect(resolveTheme('', true)).toBe('dark');
    expect(resolveTheme('', false)).toBe('light');
  });
});

describe('readStoredTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when no value stored', () => {
    expect(readStoredTheme()).toBeNull();
  });

  it('returns stored value', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    expect(readStoredTheme()).toBe('dark');
  });

  it('returns null when localStorage throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(readStoredTheme()).toBeNull();
    spy.mockRestore();
  });
});

describe('writeStoredTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('writes theme to localStorage', () => {
    writeStoredTheme('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('does not throw when localStorage is unavailable', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceeded');
    });
    expect(() => writeStoredTheme('dark')).not.toThrow();
    spy.mockRestore();
  });
});
