'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';
import { SectionWrapper } from '@/components/landing/shared/SectionWrapper';
import { SectionHeading } from '@/components/landing/shared/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * FAQ Section with accordion behavior.
 * - All items collapsed initially
 * - Exclusive-open: only one item can be expanded at a time
 * - Animated expand/collapse with height transition (200-300ms)
 * - Keyboard accessible (Enter/Space) with aria-expanded attributes
 * - Respects reduced motion preference
 */
export function FAQSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <SectionWrapper id="faq">
      <SectionHeading
        index="07"
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you need to know before you apply. Can't find it here? Reach out to our team."
        className="mb-12 md:mb-16"
      />

      <div className="max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <div
              key={index}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden"
            >
              {/* Question button */}
              <button
                id={buttonId}
                type="button"
                className="w-full flex items-center justify-between text-left px-6 py-5
                  font-medium text-gray-900 dark:text-white
                  hover:bg-gray-50 dark:hover:bg-slate-700/50
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset
                  transition-colors"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
              >
                <span className="pr-4">{item.question}</span>
                {prefersReducedMotion ? (
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-muted dark:text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                ) : (
                  <motion.span
                    className="flex-shrink-0 text-muted dark:text-slate-400"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                )}
              </button>

              {/* Answer panel */}
              {prefersReducedMotion ? (
                isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-5"
                  >
                    <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )
              ) : (
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
