'use client';

import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  compact?: boolean;
}

/**
 * Provides consistent section padding, max-width container, and an id prop
 * for navigation anchoring. Ensures uniform spacing across all landing page sections.
 * `compact` uses tighter vertical padding for supporting bands (e.g. logo strips).
 */
export function SectionWrapper({
  children,
  id,
  className = '',
  compact = false,
}: SectionWrapperProps) {
  const padding = compact
    ? 'py-10 md:py-14'
    : 'py-20 md:py-28 lg:py-32';

  return (
    <section id={id} className={`${padding} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
