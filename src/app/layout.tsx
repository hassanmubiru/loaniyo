import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Loaniyo - Fast Digital Loans & Lending Platform",
  description:
    "Apply for fast, transparent digital loans with Loaniyo. Get approved in minutes with competitive rates, bank-grade security, and 24/7 availability.",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Loaniyo - Fast Digital Loans & Lending Platform",
    description:
      "Apply for fast, transparent digital loans with Loaniyo. Get approved in minutes with competitive rates, bank-grade security, and 24/7 availability.",
    type: "website",
    url: "https://loaniyo.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loaniyo - Fast Digital Loans & Lending Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loaniyo - Fast Digital Loans & Lending Platform",
    description:
      "Apply for fast, transparent digital loans with Loaniyo. Get approved in minutes with competitive rates, bank-grade security, and 24/7 availability.",
    images: ["/og-image.png"],
  },
  keywords: [
    "loans",
    "lending",
    "digital loans",
    "fast approval",
    "online lending",
    "fintech",
    "personal loans",
    "loan calculator",
  ],
  authors: [{ name: "Loaniyo Team" }],
  category: "finance",
  alternates: {
    canonical: "https://loaniyo.vercel.app",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* Fonts loaded via link (non-blocking, degrades to system fonts if
            the network is unavailable) instead of next/font's build-time fetch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('loaniyo-theme');
                  var theme = stored === 'dark' || stored === 'light' ? stored : null;
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Loaniyo",
              url: "https://loaniyo.vercel.app",
              logo: "https://loaniyo.vercel.app/icon.svg",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ErrorBoundary>
          <ThemeProvider>
            <Providers>{children}</Providers>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
