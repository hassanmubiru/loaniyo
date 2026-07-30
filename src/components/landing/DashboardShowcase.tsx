'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  CalendarClock,
  Activity,
  Bell,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { SectionWrapper } from '@/components/landing/shared/SectionWrapper';
import { SectionHeading } from '@/components/landing/shared/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * A visual-only showcase of the Loaniyo platform dashboard.
 * Renders 6 labeled cards representing dashboard widgets with
 * fade-up + scale entrance animation on first viewport entry.
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4
 */
export function DashboardShowcase() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6, // ≤600ms
        ease: 'easeOut',
      },
    },
  };

  return (
    <SectionWrapper id="dashboard" className="bg-green-50/50 dark:bg-slate-900/40">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Your Dashboard, At a Glance
        </h2>
        <p className="text-muted dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Manage loans, track payments, and monitor progress — all in one place.
        </p>
      </div>

      {/* Dashboard container — ≥80% width on desktop */}
      <motion.div
        className="w-full lg:w-[85%] mx-auto rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-green-900/5 p-4 sm:p-6 lg:p-8"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Loan Summary */}
          <DashboardCard
            icon={<Wallet className="text-primary" size={20} />}
            label="Loan Summary"
          >
            <div className="mt-3">
              <p className="text-xs text-muted dark:text-gray-500 uppercase tracking-wide">
                Total Balance
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                $24,500.00
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                3 active loans
              </p>
            </div>
          </DashboardCard>

          {/* Upcoming Payments */}
          <DashboardCard
            icon={<CalendarClock className="text-primary" size={20} />}
            label="Upcoming Payments"
          >
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Jan 15, 2025
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  $450.00
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Feb 01, 2025
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  $320.00
                </span>
              </div>
            </div>
          </DashboardCard>

          {/* Recent Activity */}
          <DashboardCard
            icon={<Activity className="text-primary" size={20} />}
            label="Recent Activity"
          >
            <div className="mt-3 space-y-2">
              <ActivityLine label="Loan disbursed" amount="+$5,000" positive />
              <ActivityLine label="Payment made" amount="-$450" />
              <ActivityLine label="Interest charged" amount="-$32.50" />
            </div>
          </DashboardCard>

          {/* Notifications */}
          <DashboardCard
            icon={<Bell className="text-primary" size={20} />}
            label="Notifications"
          >
            <div className="mt-3 flex items-center gap-3">
              <div className="relative">
                <Bell className="text-gray-400 dark:text-gray-500" size={28} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Payment reminder due tomorrow</p>
                <p className="text-xs text-muted dark:text-gray-500 mt-0.5">
                  2 more unread
                </p>
              </div>
            </div>
          </DashboardCard>

          {/* Repayment Progress */}
          <DashboardCard
            icon={<TrendingUp className="text-primary" size={20} />}
            label="Repayment Progress"
          >
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">68% complete</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  $16,660 / $24,500
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: '68%' }}
                  aria-label="68% repayment progress"
                />
              </div>
            </div>
          </DashboardCard>

          {/* Charts */}
          <DashboardCard
            icon={<BarChart3 className="text-primary" size={20} />}
            label="Charts"
          >
            <div className="mt-3 flex items-end gap-1.5 h-16">
              {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary/80 to-secondary/60 rounded-sm"
                  style={{ height: `${height}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-xs text-muted dark:text-gray-500 mt-2">
              Monthly repayment trend
            </p>
          </DashboardCard>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

/** Individual dashboard card with consistent styling */
function DashboardCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-md border border-gray-100 dark:border-slate-700"
      style={{
        borderRadius: '14px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </h3>
      </div>
      {children}
    </div>
  );
}

/** Activity line item for the Recent Activity card */
function ActivityLine({
  label,
  amount,
  positive = false,
}: {
  label: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span
        className={
          positive
            ? 'text-green-600 dark:text-green-400 font-medium'
            : 'text-gray-900 dark:text-white font-medium'
        }
      >
        {amount}
      </span>
    </div>
  );
}
