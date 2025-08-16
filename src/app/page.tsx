'use client'

import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@/components/ConnectButton'
import { LendingInterface } from '@/components/LendingInterface'
import { GlobalStats } from '@/components/GlobalStats'
import { TransactionHistory } from '@/components/TransactionHistory'
import { DataHistoryChart } from '@/components/DataHistoryChart'

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
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            {/* Welcome Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Welcome to Loaniyo
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                Choose an action to get started
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Unverified</span>
              </div>
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-4xl w-full">
              {/* Save Money */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Save Money</h3>
                  <p className="text-sm text-gray-600">Earn interest on your savings</p>
                </div>
              </div>

              {/* Borrow Money */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Borrow Money</h3>
                  <p className="text-sm text-gray-600">Get a loan with collateral</p>
                </div>
              </div>

              {/* Withdraw */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Withdraw</h3>
                  <p className="text-sm text-gray-600">Take out your savings</p>
                </div>
              </div>

              {/* Pay Back */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Pay Back</h3>
                  <p className="text-sm text-gray-600">Repay your loans</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-md w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Quick Actions</h3>
              <div className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </div>
            </div>

            {/* Connect Wallet Button */}
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
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Lending Interface */}
              <div className="lg:col-span-2">
                <LendingInterface />
              </div>

              {/* Quick Stats Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Position</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Deposited</span>
                      <span className="font-medium text-sm sm:text-base">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Borrowed</span>
                      <span className="font-medium text-sm sm:text-base">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Net APY</span>
                      <span className="font-medium text-green-600 text-sm sm:text-base">0.00%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Health Factor</span>
                      <span className="font-medium text-green-600 text-sm sm:text-base">∞</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Transaction History */}
              <TransactionHistory />

              {/* Data History Chart */}
              <DataHistoryChart />
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
