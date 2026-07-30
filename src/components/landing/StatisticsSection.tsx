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
    <SectionWrapper id="statistics">
      <ScrollReveal threshold={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 divide-x divide-y md:divide-y-0 divide-gray-200 dark:divide-slate-700 overflow-hidden">
          {STATISTICS.map((stat, index) => (
            <div key={index} className="p-6 md:p-8">
              <div className="font-heading text-4xl md:text-5xl font-bold tracking-tight tabular-nums text-gray-900 dark:text-white">
                {stat.isNumeric ? (
                  <AnimatedCounter
                    target={stat.value as number}
                    suffix={stat.suffix}
                    decimals={stat.value === 99.9 ? 1 : 0}
                  />
                ) : (
                  <span>
                    {stat.value}
                    <span className="text-muted dark:text-slate-500">{stat.suffix}</span>
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
