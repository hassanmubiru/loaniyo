'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  BarChart3,
  History,
  ShieldCheck,
  Upload,
  FileSignature,
  Bell,
  Clock,
  Calculator,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';
import { FEATURES } from '@/lib/constants';
import { SectionWrapper } from '@/components/landing/shared/SectionWrapper';
import { SectionHeading } from '@/components/landing/shared/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Map icon string names from constants to actual Lucide components */
const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  BarChart3,
  History,
  ShieldCheck,
  Upload,
  FileSignature,
  Bell,
  Clock,
  Calculator,
  LayoutDashboard,
};

/**
 * Warm per-card accent palette echoing the original Loaniyo action cards
 * (green / blue / orange / purple / teal / rose). Cycled across the grid so
 * each feature gets a distinct icon tint while staying on-brand.
 */
const ACCENTS = [
  { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' },
  { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
  { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400' },
  { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
  { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-600 dark:text-teal-400' },
  { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400' },
];

/**
 * Displays 10 feature cards in a responsive grid with two size variants
 * (standard and featured). Featured cards span 2 columns on larger viewports.
 * Includes stagger entrance animation and hover lift/glow via Framer Motion.
 */
export function FeaturesGrid() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.075, // 75ms between cards (50-100ms range)
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // 400ms per card (300-500ms range)
        ease: 'easeOut',
      },
    },
  };

  return (
    <SectionWrapper id="features">
      <SectionHeading
        index="01"
        eyebrow="Features"
        title="Everything you need to borrow with confidence"
        description="A complete lending toolkit — from instant applications to repayment tracking — built to be simple, fast, and secure."
        className="mb-12 md:mb-16"
      />

      {/* Bordered divider grid — hairline-separated cells, no gaps */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl overflow-hidden border-t border-l border-black/[0.07] dark:border-white/10 bg-white dark:bg-slate-800/50"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.1 }}
      >
        {FEATURES.map((feature, index) => {
          const IconComponent = ICON_MAP[feature.icon];
          const accent = ACCENTS[index % ACCENTS.length];

          return (
            <motion.div
              key={index}
              className="group flex gap-4 p-7 lg:p-8 border-b border-r border-black/[0.07] dark:border-white/10 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              variants={prefersReducedMotion ? undefined : cardVariants}
            >
              {/* Icon */}
              <div
                className={`shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl ${accent.bg}`}
              >
                {IconComponent && (
                  <IconComponent className={accent.text} size={22} />
                )}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="font-heading text-base font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
