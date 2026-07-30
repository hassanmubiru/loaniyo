import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FooterSection } from '../FooterSection';

describe('FooterSection', () => {
  it('renders with footer element and id="footer"', () => {
    const { container } = render(<FooterSection />);
    const footer = container.querySelector('footer#footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders the Loaniyo logo text', () => {
    render(<FooterSection />);
    expect(screen.getByText('Loaniyo')).toBeInTheDocument();
  });

  it('renders tagline with 120 chars or fewer', () => {
    render(<FooterSection />);
    const tagline = screen.getByText(
      'Empowering individuals and businesses with fast, transparent digital lending solutions.'
    );
    expect(tagline).toBeInTheDocument();
    expect(tagline.textContent!.length).toBeLessThanOrEqual(120);
  });

  it('renders Company link group with About, Blog, Careers', () => {
    render(<FooterSection />);
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
  });

  it('renders Support link group with Help Center, Privacy Policy, Terms of Service, Contact', () => {
    render(<FooterSection />);
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders at least 3 social media icons with proper aria-labels', () => {
    render(<FooterSection />);
    const twitter = screen.getByLabelText('Twitter');
    const github = screen.getByLabelText('GitHub');
    const linkedin = screen.getByLabelText('LinkedIn');

    expect(twitter).toBeInTheDocument();
    expect(github).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();
  });

  it('social links open in new tab with noopener noreferrer', () => {
    render(<FooterSection />);
    const twitter = screen.getByLabelText('Twitter');
    expect(twitter).toHaveAttribute('target', '_blank');
    expect(twitter).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders newsletter form with aria-label', () => {
    render(<FooterSection />);
    const form = screen.getByRole('form', { name: /newsletter subscription/i });
    expect(form).toBeInTheDocument();
  });

  it('renders email input with placeholder', () => {
    render(<FooterSection />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('shows error for invalid email on submit', () => {
    render(<FooterSection />);
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(input, { target: { value: 'invalidemail' } });
    fireEvent.click(button);

    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('shows error for email without dot', () => {
    render(<FooterSection />);
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(input, { target: { value: 'user@domain' } });
    fireEvent.click(button);

    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('shows success message for valid email and hides form', () => {
    render(<FooterSection />);
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(input, { target: { value: 'user@example.com' } });
    fireEvent.click(button);

    expect(screen.getByText('Thank you for subscribing!')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Enter your email')).not.toBeInTheDocument();
  });

  it('displays copyright with current year', () => {
    render(<FooterSection />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Loaniyo. All rights reserved.`)).toBeInTheDocument();
  });

  it('all links have focus-visible ring classes for keyboard navigation', () => {
    const { container } = render(<FooterSection />);
    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      expect(link.className).toContain('focus-visible:ring-2');
    });
  });

  it('submit button has focus-visible ring classes', () => {
    render(<FooterSection />);
    const button = screen.getByRole('button', { name: /subscribe/i });
    expect(button.className).toContain('focus-visible:ring-2');
  });
});
