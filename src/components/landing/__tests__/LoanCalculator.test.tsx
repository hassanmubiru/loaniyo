import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoanCalculator } from '../LoanCalculator';

// Mock framer-motion to avoid animation timing issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useSpring: (value: number) => {
    const listeners: Array<(v: string) => void> = [];
    return {
      set: () => {},
      get: () => value,
      on: (_event: string, cb: (v: string) => void) => {
        listeners.push(cb);
        return () => {};
      },
    };
  },
  useTransform: (_spring: any, formatter: (v: number) => string) => {
    return {
      on: (_event: string, _cb: (v: string) => void) => {
        return () => {};
      },
    };
  },
}));

// Mock ScrollReveal to render children directly
vi.mock('../shared/ScrollReveal', () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock SectionWrapper to render children with the id
vi.mock('../shared/SectionWrapper', () => ({
  SectionWrapper: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <section id={id}>{children}</section>
  ),
}));

describe('LoanCalculator', () => {
  it('renders with section id "calculator"', () => {
    const { container } = render(<LoanCalculator />);
    const section = container.querySelector('section#calculator');
    expect(section).toBeInTheDocument();
  });

  it('renders the calculator section heading', () => {
    render(<LoanCalculator />);
    expect(
      screen.getByText('Know your payment before you apply')
    ).toBeInTheDocument();
  });

  it('renders all three slider controls with labels', () => {
    render(<LoanCalculator />);
    expect(screen.getByLabelText(/Loan Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interest Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Loan Duration/i)).toBeInTheDocument();
  });

  it('renders sliders with correct min/max ranges', () => {
    render(<LoanCalculator />);

    const amountSlider = screen.getByLabelText(/Loan Amount/i);
    expect(amountSlider).toHaveAttribute('min', '1000');
    expect(amountSlider).toHaveAttribute('max', '100000');

    const rateSlider = screen.getByLabelText(/Interest Rate/i);
    expect(rateSlider).toHaveAttribute('min', '1');
    expect(rateSlider).toHaveAttribute('max', '30');
    expect(rateSlider).toHaveAttribute('step', '0.5');

    const durationSlider = screen.getByLabelText(/Loan Duration/i);
    expect(durationSlider).toHaveAttribute('min', '6');
    expect(durationSlider).toHaveAttribute('max', '60');
    expect(durationSlider).toHaveAttribute('step', '1');
  });

  it('displays Monthly Payment and Total Repayment labels', () => {
    render(<LoanCalculator />);
    expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
    expect(screen.getByText('Total Repayment')).toBeInTheDocument();
  });

  it('displays Payment Breakdown chart section', () => {
    render(<LoanCalculator />);
    expect(screen.getByText('Payment Breakdown')).toBeInTheDocument();
  });

  it('has keyboard-accessible sliders with focus indicators', () => {
    render(<LoanCalculator />);
    const amountSlider = screen.getByLabelText(/Loan Amount/i);

    // Verify sliders are focusable (type="range" elements are inherently focusable)
    expect(amountSlider).toHaveAttribute('type', 'range');

    // Check focus ring classes exist
    expect(amountSlider.className).toContain('focus:ring-2');
  });

  it('updates slider value on change', () => {
    render(<LoanCalculator />);
    const amountSlider = screen.getByLabelText(/Loan Amount/i) as HTMLInputElement;

    // Initial value is 25000
    expect(amountSlider.value).toBe('25000');

    // Change to 50000
    fireEvent.change(amountSlider, { target: { value: '50000' } });
    expect(amountSlider.value).toBe('50000');
  });

  it('renders principal and interest in the breakdown legend', () => {
    render(<LoanCalculator />);
    // Check for legend text patterns
    expect(screen.getByText(/Principal:/)).toBeInTheDocument();
    expect(screen.getByText(/Interest:/)).toBeInTheDocument();
  });

  it('has proper aria attributes on sliders', () => {
    render(<LoanCalculator />);
    const amountSlider = screen.getByLabelText(/Loan Amount/i);

    expect(amountSlider).toHaveAttribute('aria-valuemin', '1000');
    expect(amountSlider).toHaveAttribute('aria-valuemax', '100000');
    expect(amountSlider).toHaveAttribute('aria-valuenow', '25000');
  });
});
