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
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Everything You Need
        </h2>
        <p className="text-muted dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Powerful features designed to make lending simple, fast, and secure.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.1 }}
      >
        {FEATURES.map((feature, index) => {
          const IconComponent = ICON_MAP[feature.icon];
          const isFeatured = feature.variant === 'featured';

          return (
            <motion.div
              key={index}
              className={`
                group relative rounded-xl p-6 
                bg-white dark:bg-slate-800 
                border border-gray-100 dark:border-slate-700
                transition-colors
                ${isFeatured ? 'sm:col-span-2' : ''}
              `}
              variants={prefersReducedMotion ? undefined : cardVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -6,
                      boxShadow: '0 8px 30px rgba(37, 99, 235, 0.15)',
                      transition: { duration: 0.25 },
                    }
              }
            >
              {/* Icon */}
              <div
                className={`
                  inline-flex items-center justify-center rounded-lg mb-4
                  bg-blue-50 dark:bg-blue-900/20
                  ${isFeatured ? 'w-12 h-12' : 'w-10 h-10'}
                `}
              >
                {IconComponent && (
                  <IconComponent
                    className="text-primary"
                    size={isFeatured ? 28 : 24}
                  />
                )}
              </div>

              {/* Title */}
              <h3
                className={`
                  font-heading font-semibold text-gray-900 dark:text-white mb-2
                  ${isFeatured ? 'text-lg' : 'text-base'}
                `}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
