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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Deposits
          </h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            $0.00
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Borrows
          </h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            $0.00
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Available Liquidity
          </h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-green-600">
            $0.00
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Interest Rate
          </h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-green-600">
            0.00%
          </p>
          <p className="text-sm text-gray-500">
            Utilization: 0.00%
          </p>
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
