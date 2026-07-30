'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Bell, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SectionWrapper } from './shared/SectionWrapper';

const screens = [
  {
    id: 'login',
    label: 'Login',
    content: (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <Fingerprint className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-white text-sm font-semibold mb-4">Welcome Back</h3>
        <div className="w-full space-y-3">
          <div className="bg-white/10 rounded-lg px-3 py-2.5">
            <span className="text-white/40 text-xs">Username</span>
          </div>
          <div className="bg-white/10 rounded-lg px-3 py-2.5">
            <span className="text-white/40 text-xs">Password</span>
          </div>
          <div className="bg-primary rounded-lg px-3 py-2.5 text-center">
            <span className="text-white text-xs font-semibold">Sign In</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Fingerprint className="w-4 h-4 text-white/60" />
            </div>
            <span className="text-white/40 text-xs">Use Biometrics</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    content: (
      <div className="flex flex-col h-full px-4">
        <p className="text-white/60 text-xs mb-1">Total Balance</p>
        <p className="text-white text-xl font-bold font-heading mb-4">$24,850.00</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <span className="text-xs text-white/60 block">Send</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <span className="text-xs text-white/60 block">Receive</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <span className="text-xs text-white/60 block">Pay</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <span className="text-xs text-white/60 block">History</span>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-white/60 text-xs mb-2">Active Loan</p>
          <div className="flex justify-between items-center">
            <span className="text-white text-xs font-semibold">$5,000</span>
            <span className="text-success text-xs">On Track</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
            <div className="w-3/5 h-full bg-success rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'apply',
    label: 'Apply',
    content: (
      <div className="flex flex-col h-full px-4">
        <h3 className="text-white text-sm font-semibold mb-4">Apply for Loan</h3>
        <div className="space-y-3">
          <div>
            <span className="text-white/60 text-xs block mb-1">Loan Amount</span>
            <div className="bg-white/10 rounded-lg px-3 py-2.5">
              <span className="text-white text-xs">$10,000</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2">
              <div className="w-2/3 h-full bg-primary rounded-full" />
            </div>
          </div>
          <div>
            <span className="text-white/60 text-xs block mb-1">Duration</span>
            <div className="bg-white/10 rounded-lg px-3 py-2.5">
              <span className="text-white text-xs">12 months</span>
            </div>
          </div>
          <div>
            <span className="text-white/60 text-xs block mb-1">Purpose</span>
            <div className="bg-white/10 rounded-lg px-3 py-2.5">
              <span className="text-white/40 text-xs">Select purpose...</span>
            </div>
          </div>
          <div className="bg-primary rounded-lg px-3 py-2.5 text-center mt-2">
            <span className="text-white text-xs font-semibold">Submit Application</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'repayment',
    label: 'Repayment',
    content: (
      <div className="flex flex-col h-full px-4">
        <h3 className="text-white text-sm font-semibold mb-3">Repayment Schedule</h3>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full border-4 border-success/30 relative flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-success"
                strokeDasharray="60 40"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-white text-xs font-semibold">60%</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="bg-white/10 rounded-lg p-2.5 flex justify-between items-center">
            <span className="text-white/60 text-xs">Next Payment</span>
            <span className="text-white text-xs font-semibold">$450</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5 flex justify-between items-center">
            <span className="text-white/60 text-xs">Due Date</span>
            <span className="text-white text-xs">Jan 15</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5 flex justify-between items-center">
            <span className="text-white/60 text-xs">Remaining</span>
            <span className="text-white text-xs">$2,000</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    content: (
      <div className="flex flex-col h-full px-4">
        <h3 className="text-white text-sm font-semibold mb-3">Notifications</h3>
        <div className="space-y-2">
          <div className="bg-success/20 border border-success/30 rounded-lg p-2.5">
            <p className="text-success text-xs font-semibold">Loan Approved!</p>
            <p className="text-white/60 text-[10px] mt-0.5">Your $5,000 loan has been approved</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5">
            <p className="text-white text-xs font-semibold">Payment Reminder</p>
            <p className="text-white/60 text-[10px] mt-0.5">$450 due in 3 days</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5">
            <p className="text-white text-xs font-semibold">Funds Received</p>
            <p className="text-white/60 text-[10px] mt-0.5">$5,000 deposited to your account</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5">
            <p className="text-white text-xs font-semibold">Security Alert</p>
            <p className="text-white/60 text-[10px] mt-0.5">New login from Chrome on Mac</p>
          </div>
        </div>
      </div>
    ),
  },
];

const floatingElements = [
  {
    icon: Fingerprint,
    label: 'Biometric Login',
    position: 'top-12 -left-4 md:-left-16',
    delay: 0.2,
  },
  {
    icon: Bell,
    label: 'Push Notifications',
    position: 'top-1/2 -right-4 md:-right-16 -translate-y-1/2',
    delay: 0.4,
  },
  {
    icon: ArrowUpRight,
    label: 'Instant Transfers',
    position: 'bottom-16 -left-4 md:-left-16',
    delay: 0.6,
  },
];

export function MobileAppShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [activeScreen, setActiveScreen] = useState(0);

  const cycleScreens = useCallback(() => {
    setActiveScreen((prev) => (prev + 1) % screens.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(cycleScreens, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, cycleScreens]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  const floatingCardVariants = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: 'easeOut',
      },
    },
  });

  const floatingAnimation = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          y: [0, -6, 0],
          transition: {
            duration: 3,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };

  const screenTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4, ease: 'easeInOut' },
  };

  return (
    <SectionWrapper id="mobile-app">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Banking in Your Pocket
            </h2>
            <p className="mt-4 text-lg text-muted dark:text-gray-400 max-w-md mx-auto lg:mx-0">
              Manage loans, track repayments, and get instant notifications — all from your mobile device. Experience seamless banking anywhere, anytime.
            </p>

            {/* Screen indicators */}
            <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start">
              {screens.map((screen, index) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(index)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    index === activeScreen
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-300 dark:hover:bg-white/20'
                  }`}
                  aria-label={`Show ${screen.label} screen`}
                  aria-pressed={index === activeScreen}
                >
                  {screen.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="flex-1 relative flex justify-center">
            <div className="relative w-64 h-[500px] md:w-72 md:h-[560px]">
              {/* Phone body */}
              <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl border-4 border-gray-700 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />

                {/* Screen content */}
                <div className="absolute inset-2 top-8 rounded-[2.25rem] bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden pt-8">
                  {/* Status bar */}
                  <div className="flex justify-between items-center text-white/60 text-xs px-4 mb-4">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 border border-white/60 rounded-sm">
                        <div className="w-3/4 h-full bg-success rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Animated screen content */}
                  <div className="relative h-[calc(100%-2rem)] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={screens[activeScreen].id}
                        initial={prefersReducedMotion ? false : screenTransition.initial}
                        animate={screenTransition.animate}
                        exit={prefersReducedMotion ? undefined : screenTransition.exit}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : screenTransition.transition
                        }
                        className="absolute inset-0"
                      >
                        {screens[activeScreen].content}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              {floatingElements.map((element) => {
                const Icon = element.icon;
                return (
                  <motion.div
                    key={element.label}
                    className={`absolute ${element.position} z-20`}
                    variants={floatingCardVariants(element.delay)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    animate={floatingAnimation(element.delay)}
                  >
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-lg dark:bg-white/10 dark:border-white/20 bg-gray-100/80 dark:bg-white/10 border-gray-200 dark:border-white/20">
                      <Icon className="w-4 h-4 text-primary dark:text-white" />
                      <span className="text-gray-700 dark:text-white text-xs font-medium whitespace-nowrap">
                        {element.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
