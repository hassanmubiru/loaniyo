'use client';

import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

/**
 * Provides consistent section padding, max-width container, and an id prop
 * for navigation anchoring. Ensures uniform spacing across all landing page sections.
 */
export function SectionWrapper({ children, id, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
