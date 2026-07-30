'use client';

import React from 'react';

interface SectionHeadingProps {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Editorial section heading used across the landing page.
 * Renders an optional monospace section index, a small uppercase eyebrow label,
 * a large tight-tracking title, and an optional muted description. Left-aligned
 * by default for a structured, premium-fintech feel (Stripe / Mercury / Ramp).
 */
export function SectionHeading({
  index,
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
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}>
      {(index || eyebrow) && (
        <div
          className={`flex items-center gap-3 mb-6 ${isCenter ? 'justify-center' : ''}`}
        >
          {index && (
            <span className="font-mono text-sm tabular-nums text-primary">
              {index}
            </span>
          )}
          <span
            className={`h-px w-8 ${isDark ? 'bg-white/20' : 'bg-gray-300 dark:bg-slate-700'}`}
            aria-hidden="true"
          />
          {eyebrow && (
            <span
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-gray-500 dark:text-slate-400'}`}
            >
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <h2
        className={`font-heading font-bold tracking-tight
          text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]
          ${isDark ? 'text-white' : 'text-gray-900 dark:text-white'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed max-w-2xl ${isCenter ? 'mx-auto' : ''}
            ${isDark ? 'text-slate-400' : 'text-muted dark:text-slate-400'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
