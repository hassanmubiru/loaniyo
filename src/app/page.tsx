'use client'

import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@/components/ConnectButton'
import { LendingInterface } from '@/components/LendingInterface'
import { GlobalStats } from '@/components/GlobalStats'

export default function Home() {
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Loaniyo</h1>
                  <span className="text-sm text-gray-500">Grow Your Money</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {mounted && isConnected && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Base Sepolia</span>
                </div>
              )}
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {!mounted ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse">
              <div className="w-72 sm:w-96 h-48 sm:h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ) : !isConnected ? (
          <div className="flex items-center justify-center min-h-[70vh] px-4">
            {/* Connect Wallet Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base">
                Connect your wallet to start saving and borrowing money using USDC on Base Sepolia
              </p>
              <ConnectButton />
            </div>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <GlobalStats />
            
            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
              <LendingInterface />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500">
            <p className="text-sm">&copy; 2025 Loaniyo. Built on Base Sepolia blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
