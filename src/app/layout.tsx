import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Loaniyo - DeFi Lending Platform",
  description: "Save, withdraw, borrow and repay loans on Base blockchain",
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
