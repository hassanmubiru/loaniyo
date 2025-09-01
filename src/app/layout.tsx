import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Loaniyo - DeFi Lending Platform",
  description: "Save, withdraw, borrow and repay loans on Base blockchain",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" }
    ]
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
        alt: "Loaniyo DeFi Lending Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Loaniyo - DeFi Lending Platform",
    description: "Save, withdraw, borrow and repay loans on Base blockchain",
    images: ["/og-image.png"]
  },
  keywords: ["defi", "lending", "borrowing", "usdc", "base", "ethereum", "yield", "interest"],
  authors: [{ name: "Loaniyo Team" }],
  category: "finance"
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#16a34a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
