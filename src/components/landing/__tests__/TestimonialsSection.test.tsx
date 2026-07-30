import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestimonialsSection } from '../TestimonialsSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
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

// Mock useReducedMotion
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}));

describe('TestimonialsSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with section id "testimonials"', () => {
    const { container } = render(<TestimonialsSection />);
    const section = container.querySelector('section#testimonials');
    expect(section).toBeInTheDocument();
  });

  it('renders the testimonials section heading', () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByText('Trusted by people who needed it fast')
    ).toBeInTheDocument();
  });

  it('renders the first testimonial initially', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Small Business Owner')).toBeInTheDocument();
  });

  it('renders avatar with initials', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('SJ')).toBeInTheDocument();
  });

  it('renders star rating for testimonial', () => {
    render(<TestimonialsSection />);
    const ratingElement = screen.getByLabelText(/Rating: 5 out of 5 stars/);
    expect(ratingElement).toBeInTheDocument();
  });

  it('renders review text in quotes', () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByText(/Loaniyo made getting a business loan incredibly simple/)
    ).toBeInTheDocument();
  });

  it('renders prev/next navigation buttons with aria-labels', () => {
    render(<TestimonialsSection />);
    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
  });

  it('renders position indicator dots for all testimonials', () => {
    render(<TestimonialsSection />);
    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(5);
  });

  it('first dot is selected initially', () => {
    render(<TestimonialsSection />);
    const dots = screen.getAllByRole('tab');
    expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    expect(dots[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('advances to next testimonial on next button click', () => {
    render(<TestimonialsSection />);
    const nextButton = screen.getByLabelText('Next testimonial');

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(screen.getByText('Michael Chen')).toBeInTheDocument();
  });

  it('goes to previous testimonial on prev button click', () => {
    render(<TestimonialsSection />);
    const nextButton = screen.getByLabelText('Next testimonial');
    const prevButton = screen.getByLabelText('Previous testimonial');

    act(() => {
      fireEvent.click(nextButton);
    });
    expect(screen.getByText('Michael Chen')).toBeInTheDocument();

    act(() => {
      fireEvent.click(prevButton);
    });
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
  });

  it('loops from last testimonial back to first on next', () => {
    render(<TestimonialsSection />);
    const nextButton = screen.getByLabelText('Next testimonial');

    // Click next 5 times to go past the last testimonial (5 entries total)
    for (let i = 0; i < 5; i++) {
      act(() => {
        fireEvent.click(nextButton);
      });
    }

    // Should loop back to first
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
  });

  it('loops from first testimonial to last on previous', () => {
    render(<TestimonialsSection />);
    const prevButton = screen.getByLabelText('Previous testimonial');

    act(() => {
      fireEvent.click(prevButton);
    });

    // Should show last testimonial (Lisa Thompson)
    expect(screen.getByText('Lisa Thompson')).toBeInTheDocument();
  });

  it('auto-advances every 5 seconds', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText('Michael Chen')).toBeInTheDocument();
  });

  it('pauses auto-advance on user interaction and resumes after 10s', () => {
    render(<TestimonialsSection />);
    const nextButton = screen.getByLabelText('Next testimonial');

    // User clicks next
    act(() => {
      fireEvent.click(nextButton);
    });
    expect(screen.getByText('Michael Chen')).toBeInTheDocument();

    // Advance 5s — should NOT auto-advance (paused)
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('Michael Chen')).toBeInTheDocument();

    // After 10s inactivity, auto-advance resumes
    act(() => {
      vi.advanceTimersByTime(5000); // total 10s since interaction
    });

    // Then the next auto-advance tick at 5s
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('Amara Okafor')).toBeInTheDocument();
  });

  it('navigates directly via position indicator dots', () => {
    render(<TestimonialsSection />);
    const dots = screen.getAllByRole('tab');

    act(() => {
      fireEvent.click(dots[3]);
    });

    expect(screen.getByText('David Martinez')).toBeInTheDocument();
    expect(dots[3]).toHaveAttribute('aria-selected', 'true');
  });

  it('has accessible screen reader announcement for current position', () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByText('Showing testimonial 1 of 5')
    ).toBeInTheDocument();
  });

  it('renders the testimonial tablist with proper aria-label', () => {
    render(<TestimonialsSection />);
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'Testimonial navigation');
  });
});
