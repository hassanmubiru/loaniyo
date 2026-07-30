'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import { SectionWrapper } from '@/components/landing/shared/SectionWrapper';
import { SectionHeading } from '@/components/landing/shared/SectionHeading';
import { ScrollReveal } from '@/components/landing/shared/ScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const AUTO_ADVANCE_INTERVAL = 5000; // 5 seconds
const RESUME_DELAY = 10000; // 10 seconds after user interaction

/**
 * Testimonials carousel section displaying user reviews.
 * Features auto-advance every 5s, pause on interaction, resume after 10s inactivity.
 * Loops continuously from last back to first.
 */
export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const resumeRef = useRef<NodeJS.Timeout | null>(null);

  const totalTestimonials = TESTIMONIALS.length;

  const clearTimers = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
      resumeRef.current = null;
    }
  }, []);

  const startAutoAdvance = useCallback(() => {
    if (prefersReducedMotion) return;
    clearTimers();
    setIsPaused(false);
    autoAdvanceRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    }, AUTO_ADVANCE_INTERVAL);
  }, [prefersReducedMotion, totalTestimonials, clearTimers]);

  const pauseAndScheduleResume = useCallback(() => {
    clearTimers();
    setIsPaused(true);
    resumeRef.current = setTimeout(() => {
      startAutoAdvance();
    }, RESUME_DELAY);
  }, [clearTimers, startAutoAdvance]);

  // Start auto-advance on mount
  useEffect(() => {
    if (!prefersReducedMotion) {
      startAutoAdvance();
    }
    return clearTimers;
  }, [prefersReducedMotion, startAutoAdvance, clearTimers]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
    pauseAndScheduleResume();
  }, [totalTestimonials, pauseAndScheduleResume]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    pauseAndScheduleResume();
  }, [totalTestimonials, pauseAndScheduleResume]);

  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      pauseAndScheduleResume();
    },
    [currentIndex, pauseAndScheduleResume]
  );

  const currentTestimonial = TESTIMONIALS[currentIndex];

  // Get initials from name for avatar placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Avatar colors based on testimonial id
  const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
  ];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <SectionWrapper id="testimonials" className="border-y border-black/5 dark:border-white/5">
      <ScrollReveal>
        <SectionHeading
          index="06"
          eyebrow="Testimonials"
          title="Trusted by people who needed it fast"
          description="Real borrowers who got funded when it mattered — from business owners to freelancers."
          className="mb-12 md:mb-16"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Testimonial Card */}
          <div className="overflow-hidden px-8 md:px-16 min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={prefersReducedMotion ? undefined : slideVariants}
                initial={prefersReducedMotion ? undefined : 'enter'}
                animate={prefersReducedMotion ? undefined : 'center'}
                exit={prefersReducedMotion ? undefined : 'exit'}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: 'easeInOut' }
                }
                className="w-full"
              >
                <div className="bg-white dark:bg-slate-800/70 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-700/50">
                  {/* Header: Avatar + Name + Occupation */}
                  <div className="flex items-center gap-4 mb-6">
                    {/* Avatar placeholder with initials */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${avatarColors[currentIndex % avatarColors.length]}`}
                      aria-hidden="true"
                    >
                      {getInitials(currentTestimonial.name)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {currentTestimonial.name}
                      </p>
                      <p className="text-sm text-muted dark:text-gray-400">
                        {currentTestimonial.occupation}
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4" aria-label={`Rating: ${currentTestimonial.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Position Indicator */}
        <div
          className="flex items-center justify-center gap-2 mt-8"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to testimonial ${index + 1} of ${totalTestimonials}`}
              onClick={() => goToIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                index === currentIndex
                  ? 'bg-primary dark:bg-green-400 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Current position text for screen readers */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing testimonial {currentIndex + 1} of {totalTestimonials}
        </p>
      </ScrollReveal>
    </SectionWrapper>
  );
}
