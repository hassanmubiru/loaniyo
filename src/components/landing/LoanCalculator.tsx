'use client';

import React, { useState, useMemo } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeading } from './shared/SectionHeading';
import { ScrollReveal } from './shared/ScrollReveal';
import { calculateLoan, formatCurrency } from '@/lib/loanCalculator';

// ─── Animated Number Display ───────────────────────────────────────────────────

interface AnimatedValueProps {
  value: number;
  formatter?: (v: number) => string;
}

/**
 * Animates numeric transitions over 500ms using a spring-based approach.
 * Formats the displayed value using the provided formatter (defaults to formatCurrency).
 */
function AnimatedValue({ value, formatter = formatCurrency }: AnimatedValueProps) {
  const spring = useSpring(value, { duration: 500 });
  const display = useTransform(spring, (v) => formatter(v));
  const [displayText, setDisplayText] = React.useState(formatter(value));

  React.useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  React.useEffect(() => {
    const unsubscribe = display.on('change', (v) => {
      setDisplayText(v);
    });
    return unsubscribe;
  }, [display]);

  return <span>{displayText}</span>;
}

// ─── Slider Component ──────────────────────────────────────────────────────────

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  id: string;
}

function Slider({ label, value, min, max, step, onChange, formatValue, id }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <span className="text-sm font-semibold text-primary dark:text-accent">
          {formatValue(value)}
        </span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          dark:focus:ring-accent dark:focus:ring-offset-dark-bg
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-primary dark:[&::-webkit-slider-thumb]:bg-accent
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-md
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-primary dark:[&::-moz-range-thumb]:bg-accent
          [&::-moz-range-thumb]:cursor-pointer
          [&::-moz-range-thumb]:border-0"
        style={{
          background: `linear-gradient(to right, var(--slider-fill, #16a34a) ${percentage}%, var(--slider-track, #e5e7eb) ${percentage}%)`,
        }}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={`${label}: ${formatValue(value)}`}
      />
      <div className="flex justify-between text-xs text-muted mt-1">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

// ─── Breakdown Chart ───────────────────────────────────────────────────────────

interface BreakdownChartProps {
  principal: number;
  interest: number;
}

function BreakdownChart({ principal, interest }: BreakdownChartProps) {
  const total = principal + interest;
  const principalPercent = total > 0 ? (principal / total) * 100 : 100;
  const interestPercent = total > 0 ? (interest / total) * 100 : 0;

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Payment Breakdown
      </h4>
      {/* Horizontal stacked bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full bg-success"
          animate={{ width: `${principalPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-hidden="true"
        />
        <motion.div
          className="h-full bg-primary dark:bg-accent"
          animate={{ width: `${interestPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-hidden="true"
        />
      </div>
      {/* Legend */}
      <div className="flex justify-between mt-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-success inline-block" aria-hidden="true" />
          <span className="text-gray-600 dark:text-gray-400">
            Principal: {formatCurrency(principal)} ({principalPercent.toFixed(1)}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary dark:bg-accent inline-block" aria-hidden="true" />
          <span className="text-gray-600 dark:text-gray-400">
            Interest: {formatCurrency(interest)} ({interestPercent.toFixed(1)}%)
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Loan Calculator Section ───────────────────────────────────────────────────

export function LoanCalculator() {
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(8.5);
  const [months, setMonths] = useState(24);

  const result = useMemo(
    () => calculateLoan(amount, rate, months),
    [amount, rate, months]
  );

  return (
    <SectionWrapper id="calculator" className="border-y border-black/5 dark:border-white/5">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Calculator"
          title="Know your payment before you apply"
          description="Adjust the amount, rate, and term to see your monthly payment and total cost — no sign-up required."
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sliders Panel */}
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700">
            <Slider
              id="loan-amount"
              label="Loan Amount"
              value={amount}
              min={1000}
              max={100000}
              step={1000}
              onChange={setAmount}
              formatValue={formatCurrency}
            />
            <Slider
              id="interest-rate"
              label="Interest Rate"
              value={rate}
              min={1}
              max={30}
              step={0.5}
              onChange={setRate}
              formatValue={(v) => `${v.toFixed(1)}%`}
            />
            <Slider
              id="loan-duration"
              label="Loan Duration"
              value={months}
              min={6}
              max={60}
              step={1}
              onChange={setMonths}
              formatValue={(v) => `${v} months`}
            />
          </div>

          {/* Results Panel */}
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
            {/* Monthly Payment - large, prominent */}
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-muted dark:text-gray-400 mb-1">
                Monthly Payment
              </p>
              <p className="text-4xl md:text-5xl font-heading font-bold text-primary dark:text-accent">
                <AnimatedValue value={result.monthlyPayment} />
              </p>
            </div>

            {/* Total Repayment */}
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-muted dark:text-gray-400 mb-1">
                Total Repayment
              </p>
              <p className="text-2xl font-heading font-semibold text-gray-900 dark:text-dark-text">
                <AnimatedValue value={result.totalRepayment} />
              </p>
            </div>

            {/* Breakdown Chart */}
            <BreakdownChart
              principal={result.principal}
              interest={result.totalInterest}
            />
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
