import dynamic from 'next/dynamic';
import { NavigationBar } from '@/components/landing/NavigationBar';
import { HeroSection } from '@/components/landing/HeroSection';

// Code-split below-the-fold sections
const FeaturesGrid = dynamic(
  () => import('@/components/landing/FeaturesGrid').then((mod) => ({ default: mod.FeaturesGrid })),
  { ssr: true }
);
const HowItWorksSection = dynamic(
  () => import('@/components/landing/HowItWorksSection').then((mod) => ({ default: mod.HowItWorksSection })),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import('@/components/landing/FAQSection').then((mod) => ({ default: mod.FAQSection })),
  { ssr: true }
);
const FooterSection = dynamic(
  () => import('@/components/landing/FooterSection').then((mod) => ({ default: mod.FooterSection })),
  { ssr: true }
);

/**
 * Landing Page — Server Component shell
 * Lean 6-section layout: Hero, Stats, Features, How It Works, FAQ, Footer.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-dark-bg text-text dark:text-dark-text">
      {/* Skip navigation link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <NavigationBar />

      <main id="main-content" role="main">
        <HeroSection />
        <FeaturesGrid />
        <HowItWorksSection />
        <FAQSection />
      </main>

      <FooterSection />
    </div>
  );
}
