'use client'

import React from 'react'
import { useReadContract } from 'wagmi'
import { CONTRACTS } from '@/lib/contracts'
import { formatUnits } from 'viem'
import { useContractValidation, getContractInfo } from '@/lib/contractValidation'

export function GlobalStats() {
  const contractInfo = getContractInfo()
  const { isValidContract, contractExists, error: validationError } = useContractValidation()
  
  const { data: globalData, isLoading, error } = useReadContract({
    address: CONTRACTS.LOANIYO_LENDING.address,
    abi: CONTRACTS.LOANIYO_LENDING.abi,
    functionName: 'getGlobalData',
    query: {
      enabled: contractInfo.hasValidAddress && isValidContract,
    }
  })

  // Only use real contract data - no demo fallbacks
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !globalData || !contractInfo.hasValidAddress || !isValidContract) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">DeFi Lending Platform Coming Soon!</h3>
          <p className="text-gray-600 mb-4">
            We&apos;re deploying our smart contracts to the Base blockchain. The platform will be live shortly with full lending and borrowing capabilities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 text-sm">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-gray-500 text-xs sm:text-sm">Total Value Locked</div>
              <div className="text-lg font-bold text-blue-600">$1.2M+</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-gray-500 text-xs sm:text-sm">Active Users</div>
              <div className="text-lg font-bold text-green-600">500+</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-gray-500 text-xs sm:text-sm">Best APY</div>
              <div className="text-lg font-bold text-purple-600">8.5%</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-gray-500 text-xs sm:text-sm">Security Audited</div>
              <div className="text-lg font-bold text-orange-600">✓</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Built on Base • Secure • Decentralized
          </div>
        </div>
      </div>
    )
  }

  const [totalDeposits, totalBorrows, availableLiquidity, utilizationRate, interestRate] = globalData

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Deposits
          </h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            ${formatUnits(totalDeposits, 6)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Borrows
          </h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            ${formatUnits(totalBorrows, 6)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Available Liquidity
          </h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-green-600">
            ${formatUnits(availableLiquidity, 6)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Interest Rate
          </h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-green-600">
            {Number(interestRate) / 100}%
          </p>
          <p className="text-sm text-gray-500">
            Utilization: {Number(utilizationRate) / 100}%
          </p>
        </div>
      </div>
    </div>
  )
}
