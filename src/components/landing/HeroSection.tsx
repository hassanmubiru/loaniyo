'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, Clock, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const floatingCards = [
  { label: 'Approval', icon: CheckCircle, position: 'top-4 -left-8 md:-left-12', delay: 0 },
  { label: 'Credit Score', icon: BarChart3, position: 'top-20 -right-6 md:-right-10', delay: 0.5 },
  { label: 'Payment Reminder', icon: Clock, position: 'bottom-24 -left-6 md:-left-10', delay: 1.0 },
  { label: 'Verified Identity', icon: ShieldCheck, position: 'bottom-8 -right-4 md:-right-8', delay: 1.5 },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

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

  const phoneVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay * 0.15 + 0.4,
        ease: 'easeOut',
      },
    },
  });

  const floatingAnimation = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          y: [0, -8, 0],
          transition: {
            duration: 3,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary to-secondary"
    >
      {/* Background animated blobs */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -25, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full bg-white/5 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 20, 0],
              y: [0, -25, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* Static blobs for reduced motion */}
      {prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Text content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              variants={fadeUpVariants}
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Loans in Minutes. Not Days.
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mt-6 text-lg md:text-xl text-white/80 max-w-lg mx-auto md:mx-0"
            >
              Get fast, transparent digital loans with competitive rates. Apply in minutes and receive funds the same day.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="/connect"
                className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg bg-white text-primary hover:bg-white/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
              >
                Get Started
              </a>
              <button
                onClick={handleScrollToHowItWorks}
                className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg border-2 border-white/30 text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
              >
                See How It Works
              </button>
            </motion.div>
          </div>

          {/* Right: Phone mockup with floating cards */}
          <motion.div
            className="flex-1 relative flex justify-center"
            variants={phoneVariants}
          >
            {/* Phone frame */}
            <div className="relative w-64 h-[500px] md:w-72 md:h-[560px]">
              {/* Phone body — decorative illustration (Req 18.3) */}
              <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl border-4 border-gray-700 overflow-hidden" aria-hidden="true">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />

                {/* Screen content */}
                <div className="absolute inset-2 top-8 rounded-[2.25rem] bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden p-4 pt-8">
                  {/* Status bar */}
                  <div className="flex justify-between items-center text-white/60 text-xs mb-6">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 border border-white/60 rounded-sm">
                        <div className="w-3/4 h-full bg-success rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Loan balance */}
                  <div className="text-center mb-6">
                    <p className="text-white/60 text-xs">Available Balance</p>
                    <p className="text-white text-2xl font-heading font-bold mt-1">$12,500.00</p>
                  </div>

                  {/* Progress ring mock */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-success/30 relative flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-success"
                          strokeDasharray="70 30"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-white text-sm font-semibold">70%</span>
                    </div>
                  </div>

                  {/* Mini cards */}
                  <div className="space-y-2">
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs">Next Payment</span>
                        <span className="text-white text-xs font-semibold">$450.00</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs">Approval Status</span>
                        <span className="text-success text-xs font-semibold">Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    className={`absolute ${card.position} z-20`}
                    variants={cardVariants(index)}
                    animate={floatingAnimation(card.delay)}
                  >
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-lg">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-white text-xs font-medium whitespace-nowrap">
                        {card.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
