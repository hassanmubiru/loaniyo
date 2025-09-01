'use client'

import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@/components/ConnectButton'
import { LendingInterface } from '@/components/LendingInterface'
import { MiniappInterface } from '@/components/MiniappInterface'
import { GlobalStats } from '@/components/GlobalStats'

export default function Home() {
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [isMiniapp, setIsMiniapp] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Detect if running as miniapp
    const userAgent = navigator.userAgent.toLowerCase()
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isInApp = userAgent.includes('wv') || userAgent.includes('instagram') || userAgent.includes('fbav')
    const hasMiniappParam = new URLSearchParams(window.location.search).get('miniapp') === 'true'
    
    setIsMiniapp(isStandalone || isInApp || hasMiniappParam)
  }, [])

  // Use miniapp interface if detected
  if (isMiniapp) {
    return <MiniappInterface />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                    Loaniyo
                  </h1>
                  <span className="text-sm text-gray-500 font-medium">DeFi Lending</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {mounted && isConnected && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Base Sepolia</span>
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Welcome to Loaniyo
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                Connect your wallet to start earning interest on your deposits or borrow funds using USDC on Base Sepolia
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Earn competitive interest rates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Secure smart contracts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Fast transactions on Base</span>
                </div>
              </div>
              
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
      <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Loaniyo
                </div>
                <div className="text-xs text-gray-500">DeFi Lending Platform</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Base Sepolia</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Fast</span>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-xs mt-6 pt-6 border-t border-gray-200">
            <p>&copy; 2025 Loaniyo. Built with ❤️ on Base blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
