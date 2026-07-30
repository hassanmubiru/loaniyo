import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useScrollReveal } from '../useScrollReveal';

// Test component that uses the hook and attaches the ref
function TestComponent({ threshold, once }: { threshold?: number; once?: boolean }) {
  const { ref, isVisible } = useScrollReveal({ threshold, once });
  return (
    <div ref={ref} data-testid="target">
      {isVisible ? 'visible' : 'hidden'}
    </div>
  );
}

describe('useScrollReveal', () => {
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockUnobserve: ReturnType<typeof vi.fn>;
  let observerCallback: IntersectionObserverCallback;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();

    global.IntersectionObserver = vi.fn((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: vi.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: () => [],
      };
    });
  });

  it('starts with isVisible=false', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('target')).toHaveTextContent('hidden');
  });

  it('uses default threshold of 0.2', () => {
    render(<TestComponent />);
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.2 }
    );
  });

  it('accepts custom threshold', () => {
    render(<TestComponent threshold={0.5} />);
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.5 }
    );
  });

  it('sets isVisible to true when element intersects', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('target')).toHaveTextContent('hidden');

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(screen.getByTestId('target')).toHaveTextContent('visible');
  });

  it('unobserves element after intersection when once=true', () => {
    render(<TestComponent once={true} />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(mockUnobserve).toHaveBeenCalled();
  });

  it('observes the target element', () => {
    render(<TestComponent />);
    expect(mockObserve).toHaveBeenCalled();
  });
});
