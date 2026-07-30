import { renderHook, act } from '@testing-library/react';
import { useReducedMotion } from '../useReducedMotion';

describe('useReducedMotion', () => {
  let listeners: Array<(event: MediaQueryListEvent) => void> = [];
  let mockMatches = false;

  beforeEach(() => {
    listeners = [];
    mockMatches = false;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: mockMatches,
        media: query,
        addEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => {
          listeners.push(cb);
        },
        removeEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => {
          listeners = listeners.filter((l) => l !== cb);
        },
      }),
    });
  });

  it('returns false when reduced motion is not preferred', () => {
    mockMatches = false;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when reduced motion is preferred', () => {
    mockMatches = true;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates when OS setting changes', () => {
    mockMatches = false;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((cb) =>
        cb({ matches: true } as MediaQueryListEvent)
      );
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    mockMatches = false;
    const { unmount } = renderHook(() => useReducedMotion());
    expect(listeners.length).toBe(1);

    unmount();
    expect(listeners.length).toBe(0);
  });
});
