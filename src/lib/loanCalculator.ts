// Pure loan calculation functions for the Loaniyo landing page

// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface LoanCalculation {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  principal: number;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 100000;
const MIN_RATE = 1;
const MAX_RATE = 30;
const MIN_MONTHS = 6;
const MAX_MONTHS = 60;

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Clamp a value to the given [min, max] range.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round a number to 2 decimal places.
 */
function roundTo2(value: number): number {
  return Math.round(value * 100) / 100;
}

// ─── Loan Calculator ───────────────────────────────────────────────────────────

/**
 * Calculate loan repayment details using the standard amortization formula:
 * M = P * [r(1+r)^n] / [(1+r)^n – 1]
 *
 * Where:
 * - P = principal (loan amount)
 * - r = monthly interest rate (annual rate / 12 / 100)
 * - n = number of months
 *
 * Edge cases:
 * - 0% rate: Uses simple division (amount / months)
 * - Out-of-range inputs: Clamped to valid boundaries
 */
export function calculateLoan(
  amount: number,
  annualRate: number,
  months: number
): LoanCalculation {
  // Clamp inputs to valid ranges
  const principal = clamp(amount, MIN_AMOUNT, MAX_AMOUNT);
  const rate = clamp(annualRate, 0, MAX_RATE);
  const n = clamp(months, MIN_MONTHS, MAX_MONTHS);

  let monthlyPayment: number;

  if (rate === 0) {
    // 0% rate edge case: simple division
    monthlyPayment = principal / n;
  } else {
    // Standard amortization formula
    const monthlyRate = rate / 100 / 12;
    const factor = Math.pow(1 + monthlyRate, n);
    monthlyPayment = principal * (monthlyRate * factor) / (factor - 1);
  }

  monthlyPayment = roundTo2(monthlyPayment);
  const totalRepayment = roundTo2(monthlyPayment * n);
  const totalInterest = roundTo2(totalRepayment - principal);

  return {
    monthlyPayment,
    totalRepayment,
    totalInterest,
    principal,
  };
}

// ─── Currency Formatter ────────────────────────────────────────────────────────

/**
 * Format a number as a currency string with symbol and 2 decimal places.
 * Example: 1234.5 → "$1,234.50"
 */
export function formatCurrency(value: number): string {
  return '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
