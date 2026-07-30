'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { STEPS } from '@/lib/constants';
import { SectionWrapper } from '@/components/landing/shared/SectionWrapper';
import { SectionHeading } from '@/components/landing/shared/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Displays the 7-step loan application process in a vertical timeline layout.
 * Each step has a numbered circle indicator, title, and description.
 * Steps animate sequentially on viewport entry with a stagger delay.
 * Uses semantic <ol> for assistive technology support.
 */
export function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25, // 250ms stagger (≤300ms)
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <SectionWrapper id="how-it-works">
      {/* Section heading */}
      <SectionHeading
        index="03"
        eyebrow="How it works"
        title="From application to funded in seven steps"
        description="A guided path with no paperwork runarounds — most applicants are approved in minutes."
        className="mb-12 md:mb-16"
      />

      {/* Vertical timeline */}
      <motion.ol
        className="relative max-w-3xl mx-auto"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
        aria-label="Loan application steps"
      >
        {STEPS.map((step, index) => {
          const isLast = index === STEPS.length - 1;

          return (
            <motion.li
              key={step.number}
              className="relative flex items-start gap-6 pb-10 last:pb-0"
              variants={prefersReducedMotion ? undefined : stepVariants}
            >
              {/* Connector line + numbered circle */}
              <div className="relative flex flex-col items-center">
                {/* Numbered circle */}
                <div
                  className="
                    relative z-10 flex items-center justify-center 
                    w-10 h-10 md:w-12 md:h-12 
                    rounded-full 
                    bg-primary text-white 
                    font-heading font-bold text-sm md:text-base
                    shadow-md shadow-primary/20
                  "
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                {/* Vertical connector line (hidden for last step) */}
                {!isLast && (
                  <div
                    className="
                      w-0.5 flex-1 min-h-[32px]
                      bg-gradient-to-b from-primary/60 to-primary/20
                      dark:from-primary/50 dark:to-primary/10
                    "
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Step content */}
              <div className="pt-1 md:pt-2 pb-2">
                <h3 className="text-lg md:text-xl font-heading font-bold text-gray-900 dark:text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted dark:text-gray-400 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </SectionWrapper>
  );
}
