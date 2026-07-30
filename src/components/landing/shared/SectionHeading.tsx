'use client';

import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Editorial section heading used across the landing page.
 * Renders a small uppercase eyebrow label, a large tight-tracking title,
 * and an optional muted description. Left-aligned by default for a
 * structured, premium-fintech feel (Mercury/Ramp/Stripe style).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const isDark = tone === 'dark';

  return (
    <div
      className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-2 mb-4 ${isCenter ? 'justify-center' : ''}`}
        >
          <span className="h-px w-6 bg-primary" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-heading font-bold tracking-tight text-balance
          text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]
          ${isDark ? 'text-white' : 'text-gray-900 dark:text-white'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed
            ${isDark ? 'text-slate-300' : 'text-muted dark:text-slate-400'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
