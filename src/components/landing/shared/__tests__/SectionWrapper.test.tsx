import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SectionWrapper } from '../SectionWrapper';

describe('SectionWrapper', () => {
  it('renders children', () => {
    render(
      <SectionWrapper>
        <p>Test content</p>
      </SectionWrapper>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies section id for navigation anchoring', () => {
    const { container } = render(
      <SectionWrapper id="features">
        <p>Features</p>
      </SectionWrapper>
    );
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'features');
  });

  it('applies consistent padding classes', () => {
    const { container } = render(
      <SectionWrapper>
        <p>Content</p>
      </SectionWrapper>
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('py-16');
    expect(section?.className).toContain('md:py-24');
  });

  it('applies max-width and horizontal padding', () => {
    const { container } = render(
      <SectionWrapper>
        <p>Content</p>
      </SectionWrapper>
    );
    const innerDiv = container.querySelector('section > div');
    expect(innerDiv?.className).toContain('max-w-7xl');
    expect(innerDiv?.className).toContain('mx-auto');
    expect(innerDiv?.className).toContain('px-4');
  });

  it('accepts additional className', () => {
    const { container } = render(
      <SectionWrapper className="bg-black">
        <p>Content</p>
      </SectionWrapper>
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('bg-black');
  });
});
