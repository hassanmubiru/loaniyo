import React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Loaniyo - DeFi Lending Platform",
  description: "Save, withdraw, borrow and repay loans on Base blockchain",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Loaniyo - DeFi Lending Platform",
    description: "Save, withdraw, borrow and repay loans on Base blockchain",
    type: "website",
    url: "https://loaniyo.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loaniyo DeFi Lending Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loaniyo - DeFi Lending Platform",
    description: "Save, withdraw, borrow and repay loans on Base blockchain",
    images: ["/og-image.png"],
  },
  keywords: [
    "defi",
    "lending",
    "borrowing",
    "usdc",
    "base",
    "ethereum",
    "yield",
    "interest",
  ],
  authors: [{ name: "Loaniyo Team" }],
  category: "finance",
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
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
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
      </head>
      <body className="font-body antialiased">
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
