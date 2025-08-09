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
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-sm font-medium text-red-800">Contract Error</h3>
        </div>
        <p className="text-sm text-red-700 mt-1">
          Unable to load contract data. Please ensure the contract is deployed and the address is correct.
        </p>
        <div className="mt-3 text-xs text-red-600 bg-red-100 p-2 rounded">
          <p><strong>Contract Address:</strong> {contractInfo.address}</p>
          <p><strong>Network:</strong> {contractInfo.network} (Chain ID: {contractInfo.chainId})</p>
          <p><strong>USDC Address:</strong> {contractInfo.usdcAddress}</p>
          {error && <p><strong>Error:</strong> {error.message}</p>}
          {validationError && <p><strong>Validation Error:</strong> {validationError.message}</p>}
          <p className="mt-2 text-red-700"><strong>Status:</strong> {
            !contractInfo.hasValidAddress ? 'Invalid contract address' :
            !contractExists ? 'Contract not found on blockchain' :
            !isValidContract ? 'Contract validation failed' :
            'Unknown error'
          }</p>
        </div>
      </div>
    )
  }

  const [totalDeposits, totalBorrows, availableLiquidity, utilizationRate, interestRate] = globalData

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Deposits
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${formatUnits(totalDeposits, 6)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Borrows
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${formatUnits(totalBorrows, 6)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Available Liquidity
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ${formatUnits(availableLiquidity, 6)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Interest Rate
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
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
