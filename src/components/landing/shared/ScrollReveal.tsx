'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  once?: boolean;
  disabled?: boolean;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

/**
 * Wrapper component that animates children into view on scroll using Framer Motion.
 * Respects the user's reduced motion preference — if enabled, renders children
 * in their final state immediately without animation.
 */
export function ScrollReveal({
  children,
  threshold = 0.2,
  delay = 0,
  once = true,
  disabled = false,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold, once });
  const prefersReducedMotion = useReducedMotion();

  const shouldDisableAnimation = disabled || prefersReducedMotion;

  if (shouldDisableAnimation) {
    return (
      <div ref={ref}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: 0.5,
        delay: delay / 1000,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
