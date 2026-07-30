'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@/components/ConnectButton';
import { LendingInterface } from '@/components/LendingInterface';
import { GlobalStats } from '@/components/GlobalStats';
import { ArrowLeft, Shield, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant deposits',
    description: 'Earn interest on your USDC deposits immediately.',
  },
  {
    icon: Shield,
    title: 'Secure smart contracts',
    description: '150% collateralization ratio protects all positions.',
  },
  {
    icon: TrendingUp,
    title: '5% annual yield',
    description: 'Competitive interest rates on Base blockchain.',
  },
];

export default function ConnectPage() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FBFBF9] dark:bg-dark-bg flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-xl" />
          <div className="w-48 h-4 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    );
  }

  // Connected — show the DeFi app
  if (isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm text-muted dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </Link>
                <div className="h-5 w-px bg-gray-200 dark:bg-slate-700" />
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                  </span>
                  <span className="font-heading text-lg font-bold text-gray-900 dark:text-white">
                    Loaniyo
                  </span>
                </div>
              </div>
              <ConnectButton />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <GlobalStats />
          <div className="max-w-4xl mx-auto mt-8">
            <LendingInterface />
          </div>
        </main>
      </div>
    );
  }

  // Not connected — show connect page
  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-dark-bg flex flex-col">
      {/* Minimal top bar */}
      <header className="border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </span>
            <span className="font-heading text-lg font-bold text-gray-900 dark:text-white">
              Loaniyo
            </span>
          </div>
        </div>
      </header>

      {/* Center content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/20">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Connect your wallet
            </h1>
            <p className="text-center text-sm text-muted dark:text-slate-400 mb-8">
              Connect to start earning interest, borrowing, and managing your
              loans on Base.
            </p>

            {/* Connect button */}
            <div className="flex justify-center">
              <ConnectButton />
            </div>

            {/* Network info */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted dark:text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Base Sepolia Testnet
            </div>
          </div>

          {/* Features below card */}
          <div className="mt-8 space-y-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-3"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </p>
                    <p className="text-sm text-muted dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
