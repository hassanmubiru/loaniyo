'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Check } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TRUST_POINTS = [
  '$50M+ funded',
  '5-minute approvals',
  'Bank-grade security',
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : i * 0.08,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-gray-100 dark:border-slate-800"
    >
      {/* Subtle, restrained backdrop — a faint radial wash, no animated blobs */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_0%,rgba(22,163,74,0.08),transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_75%_0%,rgba(20,184,166,0.10),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center py-20 md:py-28">
          {/* Left: editorial copy */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 px-3 py-1"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-green-700 dark:text-green-400">
                Digital lending, simplified
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 font-heading font-bold tracking-tight text-gray-900 dark:text-white
                text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] lg:leading-[0.98]"
            >
              Loans in minutes.
              <br />
              <span className="text-primary">Not days.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted dark:text-slate-400"
            >
              Apply, get approved, and receive funds the same day — with transparent
              rates and no hidden fees.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/connect"
                className="group inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl bg-primary text-white shadow-sm hover:bg-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Get started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <button
                onClick={handleScrollToHowItWorks}
                className="inline-flex items-center justify-center font-semibold px-6 py-3.5 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                See how it works
              </button>
            </motion.div>

            {/* Trust row — thin, factual, no cards */}
            <motion.ul
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: clean product-style card */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.15, ease: 'easeOut' }}
            className="relative"
          >
            {/* stacked card behind for depth (solid, not glass) */}
            <div
              className="absolute -right-3 -top-3 hidden sm:block w-full h-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40"
              aria-hidden="true"
            />

            <div className="relative rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl shadow-green-900/5 overflow-hidden">
              {/* card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
                <span className="text-sm font-medium text-muted dark:text-slate-400">Your loan</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-900/30 px-2.5 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Approved
                </span>
              </div>

              {/* balance */}
              <div className="px-6 pt-6">
                <p className="text-sm text-muted dark:text-slate-400">Approved amount</p>
                <p className="mt-1 font-heading text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  $12,500<span className="text-muted dark:text-slate-500">.00</span>
                </p>
              </div>

              {/* progress */}
              <div className="px-6 pt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted dark:text-slate-400">Repaid</span>
                  <span className="font-medium text-gray-900 dark:text-white">68%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: prefersReducedMotion ? '68%' : 0 }}
                    animate={{ width: '68%' }}
                    transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* stat row */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-slate-700 border-t border-gray-100 dark:border-slate-700 mt-6">
                <Stat label="Rate" value="4.5%" hint="APR" />
                <Stat label="Term" value="24" hint="months" />
                <Stat label="Next" value="$450" hint="Jan 15" />
              </div>

              {/* footer chips */}
              <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 dark:bg-slate-800/60 border-t border-gray-100 dark:border-slate-700">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" /> Insured
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-slate-400">
                  <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" /> Building credit
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="px-5 py-4">
      <p className="text-xs text-muted dark:text-slate-500">{label}</p>
      <p className="mt-1 font-heading text-lg font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-muted dark:text-slate-500">{hint}</p>
    </div>
  );
}
