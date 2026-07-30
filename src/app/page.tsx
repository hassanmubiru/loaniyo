import dynamic from 'next/dynamic';
import { NavigationBar } from '@/components/landing/NavigationBar';
import { HeroSection } from '@/components/landing/HeroSection';

// Code-split below-the-fold sections for performance (Req 17.5)
const TrustedBySection = dynamic(
  () => import('@/components/landing/TrustedBySection').then((mod) => ({ default: mod.TrustedBySection })),
  { ssr: true }
);
const StatisticsSection = dynamic(
  () => import('@/components/landing/StatisticsSection').then((mod) => ({ default: mod.StatisticsSection })),
  { ssr: true }
);
const FeaturesGrid = dynamic(
  () => import('@/components/landing/FeaturesGrid').then((mod) => ({ default: mod.FeaturesGrid })),
  { ssr: true }
);
const LoanCalculator = dynamic(
  () => import('@/components/landing/LoanCalculator').then((mod) => ({ default: mod.LoanCalculator })),
  { ssr: true }
);
const HowItWorksSection = dynamic(
  () => import('@/components/landing/HowItWorksSection').then((mod) => ({ default: mod.HowItWorksSection })),
  { ssr: true }
);
const DashboardShowcase = dynamic(
  () => import('@/components/landing/DashboardShowcase').then((mod) => ({ default: mod.DashboardShowcase })),
  { ssr: true }
);
const MobileAppShowcase = dynamic(
  () => import('@/components/landing/MobileAppShowcase').then((mod) => ({ default: mod.MobileAppShowcase })),
  { ssr: true }
);
const SecuritySection = dynamic(
  () => import('@/components/landing/SecuritySection').then((mod) => ({ default: mod.SecuritySection })),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import('@/components/landing/TestimonialsSection').then((mod) => ({ default: mod.TestimonialsSection })),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import('@/components/landing/FAQSection').then((mod) => ({ default: mod.FAQSection })),
  { ssr: true }
);
const CTASection = dynamic(
  () => import('@/components/landing/CTASection').then((mod) => ({ default: mod.CTASection })),
  { ssr: true }
);
const FooterSection = dynamic(
  () => import('@/components/landing/FooterSection').then((mod) => ({ default: mod.FooterSection })),
  { ssr: true }
);

/**
 * Landing Page — Server Component shell
 *
 * Renders the marketing landing page with all 14 sections.
 * Above-the-fold sections (NavigationBar, HeroSection) are imported directly.
 * Below-the-fold sections are code-split via next/dynamic for performance.
 *
 * Requirements: 15.1, 17.5, 18.1, 18.2, 18.6
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-text dark:text-dark-text">
      {/* Skip navigation link — first focusable element (Req 18.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Navigation — contains <nav> internally with aria-label (Req 18.2, 18.6) */}
      <NavigationBar />

      {/* Main content area (Req 18.2, 18.6) */}
      <main id="main-content" role="main">
        <HeroSection />
        <TrustedBySection />
        <StatisticsSection />
        <FeaturesGrid />
        <LoanCalculator />
        <HowItWorksSection />
        <DashboardShowcase />
        <MobileAppShowcase />
        <SecuritySection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Footer — renders <footer> internally with id="footer" (Req 18.2, 18.6) */}
      <FooterSection />
    </div>
  );
}
