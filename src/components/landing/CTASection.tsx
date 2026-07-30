'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SectionWrapper } from './shared/SectionWrapper';

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <SectionWrapper id="cta" className="bg-gradient-to-br from-[#2563EB] to-[#4F46E5]">
      <motion.div
        className="flex flex-col items-center text-center"
        variants={fadeUpVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
          Ready to access smarter loans?
        </h2>

        <p className="mt-4 text-white/80 text-lg max-w-xl">
          Join thousands who already enjoy fast, transparent lending. Start your application today.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="/connect"
            className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg bg-white text-primary hover:bg-white/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
          >
            Apply Now
          </a>
          <button
            className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg border-2 border-white/30 text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
          >
            Contact Sales
          </button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
