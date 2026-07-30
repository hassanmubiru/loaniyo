'use client';

import React from 'react';
import { STATISTICS } from '@/lib/constants';
import { AnimatedCounter } from '@/components/landing/shared/AnimatedCounter';
import { SectionWrapper } from '@/components/landing/shared/SectionWrapper';
import { ScrollReveal } from '@/components/landing/shared/ScrollReveal';

/**
 * Displays 4 key platform metrics in a grid layout.
 * Numeric values animate from 0 to target on viewport entry.
 * Non-numeric values are displayed as static text.
 */
export function StatisticsSection() {
  return (
    <SectionWrapper id="statistics" className="bg-green-50/50 dark:bg-slate-900/40">
      <ScrollReveal threshold={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATISTICS.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-slate-800/50 shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                {stat.isNumeric ? (
                  <AnimatedCounter
                    target={stat.value as number}
                    suffix={stat.suffix}
                    decimals={stat.value === 99.9 ? 1 : 0}
                  />
                ) : (
                  <span>
                    {stat.value}{stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm md:text-base text-muted dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
