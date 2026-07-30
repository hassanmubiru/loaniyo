# Implementation Plan: Landing Page Redesign

## Overview

Transform the existing Loaniyo DeFi wallet-connect page into a premium fintech marketing landing page. The implementation follows a component-per-section architecture with a Server Component shell, Client Component islands, Framer Motion animations, dark/light theming, and property-based testing for core logic. Each task builds incrementally — starting with foundational infrastructure, then core sections, then cross-cutting concerns, and finally integration wiring.

## Tasks

- [ ] 1. Set up project infrastructure and shared utilities
  - [x] 1.1 Install dependencies and configure Tailwind dark mode
    - Install `framer-motion`, `lucide-react`, `fast-check` (dev), `vitest` (dev), `@testing-library/react` (dev), `@testing-library/user-event` (dev), `jsdom` (dev)
    - Update `tailwind.config.js`: add `darkMode: 'class'`, extend theme with design colors (primary, secondary, accent, success, warning, muted), spacing scale, font families
    - Configure `next/font` for Space Grotesk and Inter in `layout.tsx`
    - Set up Vitest config file (`vitest.config.ts`) with jsdom environment and path aliases
    - _Requirements: 19.1, 19.2, 19.3, 17.1_

  - [-] 1.2 Create ThemeProvider and useTheme hook
    - Create `src/providers/ThemeProvider.tsx` with context providing `theme`, `toggleTheme`, `systemPreference`
    - Implement localStorage read/write with try-catch for unavailable storage (Req 16.6)
    - Implement priority chain: localStorage → OS `prefers-color-scheme` → 'light' fallback
    - Add inline script in `layout.tsx` that sets `<html>` class before paint to prevent flash (Req 16.7)
    - Create `src/hooks/useTheme.ts` consuming ThemeProvider context
    - Create `src/lib/theme.ts` with theme constants (dark bg #0F172A, light bg #FFFFFF, etc.)
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_

  - [-] 1.3 Create shared animation hooks and components
    - Create `src/hooks/useScrollReveal.ts` using IntersectionObserver with configurable threshold (default 0.2), fires once per page load
    - Create `src/hooks/useReducedMotion.ts` using `window.matchMedia('(prefers-reduced-motion: reduce)')`
    - Create `src/components/landing/shared/ScrollReveal.tsx` wrapper component using Framer Motion with `useReducedMotion` disable support
    - Create `src/components/landing/shared/AnimatedCounter.tsx` — counts from 0 to target over 2s, triggers once on viewport entry
    - Create `src/components/landing/shared/SectionWrapper.tsx` — adds consistent padding, max-width, section id for navigation
    - _Requirements: 17.1, 17.2, 17.3, 4.2, 4.4_

  - [-] 1.4 Create static data constants and loan calculator logic
    - Create `src/lib/constants.ts` with all static data: NAV_LINKS, FEATURES, STATISTICS, SECURITY_FEATURES, STEPS, TESTIMONIALS, FAQ_ITEMS, TRUSTED_LOGOS
    - Create `src/lib/loanCalculator.ts` with pure `calculateLoan(amount, rate, months)` function, 0% rate edge case, input clamping, and `formatCurrency()` utility
    - _Requirements: 6.1, 6.2, 6.3, 6.7, 7.1, 12.2_

  - [ ]* 1.5 Write property tests for loan calculator and theme resolution
    - **Property 1: Loan calculation mathematical consistency** — For any valid params, monthlyPayment × months ≈ totalRepayment (±$0.01), and totalRepayment >= principal
    - **Validates: Requirements 6.3**
    - **Property 2: Currency formatting correctness** — For any non-negative number, output has exactly one currency symbol and two decimal digits
    - **Validates: Requirements 6.7**
    - **Property 4: Theme resolution follows priority chain** — For any combination of localStorage/OS preference, resolved theme matches documented priority
    - **Validates: Requirements 16.1**
    - **Property 5: Theme toggle persistence round-trip** — After toggle, localStorage equals active theme; re-reading resolves to same theme
    - **Validates: Requirements 16.5**
    - Test files: `src/lib/__tests__/loanCalculator.property.test.ts`, `src/hooks/__tests__/useTheme.property.test.ts`

- [~] 2. Checkpoint - Ensure infrastructure tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Implement Navigation Bar and Hero Section
  - [~] 3.1 Implement NavigationBar component
    - Create `src/components/landing/NavigationBar.tsx` as Client Component
    - Render logo, nav links from constants, Sign In link, Get Started button, ThemeToggle
    - Implement sticky behavior with semi-transparent bg + backdrop-blur on scroll (Req 1.2)
    - Implement mobile hamburger menu with full-screen overlay at <768px (Req 1.4, 1.5, 1.6)
    - Implement smooth-scroll on link click using `scrollIntoView({ behavior: 'smooth' })` (Req 1.3)
    - Add keyboard navigation with visible focus indicators (Req 1.7)
    - Create `src/components/landing/shared/ThemeToggle.tsx` with sun/moon icon toggle
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 16.2_

  - [~] 3.2 Implement HeroSection component
    - Create `src/components/landing/HeroSection.tsx` as Client Component
    - Render H1 headline "Loans in Minutes. Not Days." with Space Grotesk, responsive sizing (48px desktop, 32px mobile)
    - Render subheadline (≤120 chars) and two CTA buttons (Get Started → wallet flow, See How It Works → scroll)
    - Build phone mockup with floating cards (Approval, Credit Score, Payment Reminder, Verified Identity)
    - Animate phone + cards with Framer Motion fade-up (opacity 0→1, translateY 20→0, 400-800ms, stagger 100-200ms)
    - Add continuous floating loop animation on cards (≤10px vertical, 2-4s cycle)
    - Add background gradient (#2563EB → #4F46E5) with animated blob shapes (≥6s cycle)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ] 4. Implement social proof and metrics sections
  - [~] 4.1 Implement TrustedBySection component
    - Create `src/components/landing/TrustedBySection.tsx` as Client Component
    - Render "Trusted By" heading and 6+ grayscale logos (min 32px height)
    - Implement CSS marquee animation (right-to-left, ≤30s cycle, seamless loop via duplicated logo strip)
    - Pause on hover, resume on pointer leave (Req 3.3)
    - Disable marquee for `prefers-reduced-motion` — show static layout (Req 3.4)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [~] 4.2 Implement StatisticsSection component
    - Create `src/components/landing/StatisticsSection.tsx` as Client Component
    - Render 4 metric cards: "99.9% Platform Uptime", "5 min Average Application Time", "Bank-grade Security", "24/7 Availability"
    - Use AnimatedCounter for numeric values (99.9, 5) — triggered once at 50% viewport intersection
    - Display non-numeric metrics as static text
    - Show "0" for numeric values until section enters viewport (Req 4.5)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Implement Features Grid and Loan Calculator
  - [~] 5.1 Implement FeaturesGrid component
    - Create `src/components/landing/FeaturesGrid.tsx` as Client Component
    - Render 10 feature cards with Lucide icons, titles (≤30 chars), descriptions (≤80 chars)
    - Implement 2 card size variants (standard + featured) with no more than 4 consecutive same-size cards
    - Add hover effect: translate-y -4 to -8px, box-shadow glow (spread ≤8px, opacity ≤0.15), 200-300ms via Framer Motion
    - Add stagger entrance animation (50-100ms delay between cards, 300-500ms per card)
    - Reflow to single column <640px, ≥2 columns at 640px+ (Req 5.6)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [~] 5.2 Implement LoanCalculator component
    - Create `src/components/landing/LoanCalculator.tsx` as Client Component
    - Render sliders: amount (1,000–100,000), rate (1%–30%, step 0.5%), duration (6–60 months)
    - Wire sliders to `calculateLoan()` from `src/lib/loanCalculator.ts`, update output within 100ms
    - Display monthly payment and total repayment with currency formatting (symbol + 2 decimals)
    - Build principal vs interest breakdown chart (simple bar/donut visualization)
    - Animate numeric transitions on value change (500ms)
    - Ensure full keyboard operability with visible focus indicators (Req 6.6)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [ ] 6. Implement How It Works and Showcase sections
  - [~] 6.1 Implement HowItWorksSection component
    - Create `src/components/landing/HowItWorksSection.tsx` as Client Component
    - Render 7 steps in vertical timeline: Create Account, Verify Identity, Apply for Loan, Review, Approval, Receive Funds, Repay Easily
    - Each step: numbered indicator (1-7), title, description (≤120 chars)
    - Animate steps + connectors sequentially on viewport entry (stagger ≤300ms)
    - Use semantic ordered list (`<ol>`) for assistive technology support (Req 7.5)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [~] 6.2 Implement DashboardShowcase component
    - Create `src/components/landing/DashboardShowcase.tsx` as Client Component
    - Render dashboard preview spanning ≥80% content width on desktop
    - Include labeled card elements: Loan Summary, Upcoming Payments, Recent Activity, Notifications, Repayment Progress, Charts
    - Apply border-radius ≥12px, box-shadow ≤30% opacity, visible card separation
    - Animate with fade-up + scale on first viewport entry (≤600ms via Framer Motion)
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [~] 6.3 Implement MobileAppShowcase component
    - Create `src/components/landing/MobileAppShowcase.tsx` as Client Component
    - Render animated phone mockup frame cycling through 5+ screens (Login, Dashboard, Apply, Repayment, Notifications) every 3s
    - Add 3+ floating UI elements: biometric login, push notifications, instant transfers
    - Animate phone + floating elements on viewport entry via Framer Motion
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 7. Implement Security, Testimonials, and FAQ sections
  - [~] 7.1 Implement SecuritySection component
    - Create `src/components/landing/SecuritySection.tsx` as Client Component
    - Render 7 security measure cards with Lucide icons, titles, short descriptions (15-80 chars)
    - Expand on hover to reveal additional text (40-200 chars) with Framer Motion scale+fade
    - Handle touch/keyboard: expand on tap or focus activation (Req 10.4)
    - Display 3+ certification badges/trust indicators
    - Use dark background variant for visual differentiation (Req 10.5)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [~] 7.2 Implement TestimonialsSection component
    - Create `src/components/landing/TestimonialsSection.tsx` as Client Component
    - Render testimonial cards: avatar, name, occupation, star rating (1-5), review text
    - Include 4+ testimonial entries from constants
    - Implement carousel with prev/next controls and position indicator
    - Auto-advance every 5s, pause on user interaction, resume after 10s inactivity
    - Loop continuously (last → first)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [~] 7.3 Implement FAQSection component
    - Create `src/components/landing/FAQSection.tsx` as Client Component
    - Render accordion with 5+ questions from constants, all collapsed initially
    - Implement exclusive-open: expand one collapses any other (Req 12.5)
    - Animate expand/collapse with height transition (200-300ms)
    - Support keyboard (Enter/Space) and aria-expanded attributes (Req 12.6)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [ ] 8. Implement CTA and Footer sections
  - [~] 8.1 Implement CTASection component
    - Create `src/components/landing/CTASection.tsx` as Client Component
    - Render headline "Ready to access smarter loans?", subheadline (≤120 chars)
    - Render "Apply Now" (primary) and "Contact Sales" (secondary) buttons
    - Apply gradient background (#2563EB → #4F46E5)
    - Animate fade-up on first viewport entry (≤600ms)
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [~] 8.2 Implement FooterSection component
    - Create `src/components/landing/FooterSection.tsx` as Client Component
    - Render Loaniyo logo + tagline (≤120 chars)
    - Render link groups: Company (About, Blog, Careers), Support (Help Center, Privacy Policy, Terms, Contact), 3+ social media icons
    - Implement newsletter email input with validation (Req 14.3, 14.4), confirmation message on success (Req 14.5)
    - Display copyright with current year
    - Keyboard navigable with focus indicators (Req 14.7)
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

- [~] 9. Checkpoint - Ensure all section components render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Wire page shell, accessibility, SEO, and responsive integration
  - [~] 10.1 Create the landing page shell (page.tsx)
    - Rewrite `src/app/page.tsx` as a Server Component shell
    - Import all 14 section components in order
    - Add skip-navigation link as first focusable element (Req 18.1)
    - Wrap sections with semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>` (Req 18.2)
    - Add ARIA landmarks: banner, navigation, main, contentinfo (Req 18.6)
    - Apply section `id` attributes for navigation anchoring
    - Code-split below-the-fold sections with `next/dynamic` for performance (Req 17.5)
    - _Requirements: 18.1, 18.2, 18.6, 17.5, 15.1_

  - [~] 10.2 Update layout.tsx with SEO metadata and structured data
    - Update page title (30-60 chars, includes "Loaniyo" + lending keyword)
    - Update meta description (120-160 chars)
    - Add Open Graph tags: og:title, og:description, og:image, og:type, og:url
    - Add canonical URL meta tag (Req 20.5)
    - Add JSON-LD Organization schema (name, url, logo) and FAQPage schema (from FAQ constants)
    - Ensure all metadata renders in initial HTML without client JS (Req 20.6)
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_

  - [~] 10.3 Implement responsive design and accessibility finishing touches
    - Verify no horizontal overflow from 320px–2560px (Req 15.1)
    - Ensure single-column stacking below 768px (Req 15.2)
    - Set minimum touch targets 44×44px on mobile (Req 15.3)
    - Apply fluid typography with clamp() (min 14px body, max 18px) (Req 15.4)
    - Add descriptive alt text for informational images, aria-hidden for decorative (Req 18.3)
    - Verify color contrast ≥4.5:1 body text, ≥3:1 large text (Req 18.4)
    - Ensure logical tab order with visible focus indicators (Req 18.5)
    - Ensure all form inputs have labels/aria-label (Req 18.6)
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 18.3, 18.4, 18.5, 18.6_

  - [ ]* 10.4 Write property test for responsive overflow
    - **Property 3: No horizontal overflow at any viewport width** — For any viewport width in [320, 2560], document scrollWidth ≤ clientWidth
    - **Validates: Requirements 15.1**
    - Test file: `src/components/landing/__tests__/responsive.property.test.tsx`

- [~] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document (Properties 1–5)
- The existing DeFi wallet-connect functionality in the current `page.tsx` will be relocated or accessed via a separate route — the landing page replaces the root route
- All section components are independent Client Components that don't share props between each other
- Theme state is shared via ThemeProvider context; scroll state is per-component via useScrollReveal

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4"] },
    { "id": 2, "tasks": ["1.5", "3.1", "3.2"] },
    { "id": 3, "tasks": ["4.1", "4.2", "5.1", "5.2"] },
    { "id": 4, "tasks": ["6.1", "6.2", "6.3"] },
    { "id": 5, "tasks": ["7.1", "7.2", "7.3"] },
    { "id": 6, "tasks": ["8.1", "8.2"] },
    { "id": 7, "tasks": ["10.1", "10.2"] },
    { "id": 8, "tasks": ["10.3", "10.4"] }
  ]
}
```
