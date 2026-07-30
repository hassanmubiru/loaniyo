'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  UserCheck,
  Fingerprint,
  KeyRound,
  ShieldAlert,
  Eye,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { SECURITY_FEATURES } from '@/lib/constants';
import { SectionWrapper } from '@/components/landing/shared/SectionWrapper';
import { SectionHeading } from '@/components/landing/shared/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Map icon string names from constants to actual Lucide components */
const ICON_MAP: Record<string, LucideIcon> = {
  Lock,
  UserCheck,
  Fingerprint,
  KeyRound,
  ShieldAlert,
  Eye,
  Scale,
};

/** Certification badges displayed below the security cards */
const CERTIFICATION_BADGES = [
  { label: 'SOC 2 Compliant', icon: ShieldCheck },
  { label: 'GDPR Ready', icon: ShieldCheck },
  { label: 'PCI DSS', icon: ShieldCheck },
  { label: 'ISO 27001', icon: ShieldCheck },
] as const;

/**
 * Displays 7 security measure cards that expand on hover/focus/tap to reveal
 * additional descriptions. Uses a dark background for visual differentiation.
 * Includes certification badges as trust indicators.
 */
export function SecuritySection() {
  const prefersReducedMotion = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle(index);
      }
    },
    [handleToggle]
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <SectionWrapper id="security" className="bg-slate-900 text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Your Security Is Our Priority
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          We employ industry-leading security measures to keep your data and funds safe.
        </p>
      </div>

      {/* Security feature cards grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.1 }}
      >
        {SECURITY_FEATURES.map((feature, index) => {
          const IconComponent = ICON_MAP[feature.icon];
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              className="relative rounded-xl p-6 bg-white/5 border border-slate-700 cursor-pointer
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
                transition-colors hover:bg-white/10"
              variants={prefersReducedMotion ? undefined : cardVariants}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              aria-label={`${feature.title}: ${feature.shortDescription}`}
              onClick={() => handleToggle(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center rounded-lg w-10 h-10 bg-primary/20 mb-4">
                {IconComponent && (
                  <IconComponent className="text-primary" size={24} />
                )}
              </div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-white mb-2 text-base">
                {feature.title}
              </h3>

              {/* Short description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {feature.shortDescription}
              </p>

              {/* Expanded description — animated or immediate based on reduced motion */}
              {prefersReducedMotion ? (
                isExpanded && (
                  <p className="text-sm text-slate-400 leading-relaxed mt-3 border-t border-slate-700 pt-3">
                    {feature.expandedDescription}
                  </p>
                )
              ) : (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.p
                      className="text-sm text-slate-400 leading-relaxed mt-3 border-t border-slate-700 pt-3"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      {feature.expandedDescription}
                    </motion.p>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Certification badges */}
      <div className="border-t border-slate-700 pt-10">
        <p className="text-center text-sm text-slate-400 uppercase tracking-wider mb-6">
          Certifications &amp; Compliance
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {CERTIFICATION_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-slate-700 text-sm text-slate-300"
            >
              <badge.icon size={16} className="text-green-400" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
