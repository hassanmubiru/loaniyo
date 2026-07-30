'use client';

import React from 'react';
import { SectionWrapper } from '@/components/landing/shared/SectionWrapper';
import { TRUSTED_LOGOS } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * TrustedBySection displays partner/client logos in a scrolling marquee.
 * - Renders 8 company name badges in grayscale
 * - Continuous right-to-left marquee animation (≤30s cycle, seamless loop)
 * - Pauses on hover, resumes on pointer leave
 * - Falls back to static layout when prefers-reduced-motion is enabled
 */
export function TrustedBySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="trusted-by" className="overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Trusted By
        </h2>
      </div>

      {prefersReducedMotion ? (
        /* Static layout for reduced motion preference */
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {TRUSTED_LOGOS.map((logo) => (
            <LogoBadge key={logo.name} name={logo.name} alt={logo.alt} />
          ))}
        </div>
      ) : (
        /* Animated marquee with duplicated strip for seamless loop */
        <div
          className="relative overflow-hidden"
          aria-label="Scrolling list of trusted partner companies"
        >
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {/* First set of logos */}
            {TRUSTED_LOGOS.map((logo) => (
              <LogoBadge key={`first-${logo.name}`} name={logo.name} alt={logo.alt} />
            ))}
            {/* Duplicated set for seamless looping */}
            {TRUSTED_LOGOS.map((logo) => (
              <LogoBadge key={`second-${logo.name}`} name={logo.name} alt={logo.alt} />
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

/** Individual logo badge rendered as a styled text element */
function LogoBadge({ name, alt }: { name: string; alt: string }) {
  return (
    <span
      className="inline-flex items-center justify-center min-h-[32px] px-6 py-2 mx-4 text-xl font-semibold text-gray-400 dark:text-gray-600 select-none opacity-50 hover:opacity-75 transition-opacity duration-300"
      aria-label={alt}
      role="img"
    >
      {name}
    </span>
  );
}
