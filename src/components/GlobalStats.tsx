'use client'

import React from 'react'
import { useReadContract } from 'wagmi'
import { CONTRACTS } from '@/lib/contracts'
import { formatUnits } from 'viem'
import { useContractValidation, getContractInfo } from '@/lib/contractValidation'

interface StatItemProps {
  label: string
  value: string
  accent?: boolean
  sub?: string
}

function StatItem({ label, value, accent, sub }: StatItemProps) {
  return (
    <div className="p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">
        {label}
      </p>
      <p className={`font-heading text-2xl sm:text-3xl font-bold tracking-tight ${accent ? 'text-primary' : 'text-white'}`}>
        {value}
      </p>
      {sub && (
        <p className="text-xs text-slate-500 mt-1">{sub}</p>
      )}
    </div>
  )
}

export function GlobalStats() {
  const contractInfo = getContractInfo()
  const { isValidContract } = useContractValidation()
  
  const { data: globalData, isLoading, error } = useReadContract({
    address: CONTRACTS.LOANIYO_LENDING.address,
    abi: CONTRACTS.LOANIYO_LENDING.abi,
    functionName: 'getGlobalData',
    query: {
      enabled: contractInfo.hasValidAddress && isValidContract,
    }
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-white/[0.08] divide-x divide-y lg:divide-y-0 divide-white/[0.08] bg-white/[0.02]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-5 sm:p-6 animate-pulse">
            <div className="h-3 bg-white/10 rounded w-20 mb-3" />
            <div className="h-7 bg-white/10 rounded w-24" />
          </div>
        ))}
      </div>
    )
  }

  if (error || !globalData || !contractInfo.hasValidAddress || !isValidContract) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-white/[0.08] divide-x divide-y lg:divide-y-0 divide-white/[0.08] bg-white/[0.02]">
        <StatItem label="Total Deposits" value="$0.00" />
        <StatItem label="Total Borrows" value="$0.00" />
        <StatItem label="Available Liquidity" value="$0.00" accent />
        <StatItem label="Interest Rate" value="0.00%" accent sub="Utilization: 0.00%" />
      </div>
    )
  }

  const [totalDeposits, totalBorrows, availableLiquidity, utilizationRate, interestRate] = globalData

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-white/[0.08] divide-x divide-y lg:divide-y-0 divide-white/[0.08] bg-white/[0.02]">
      <StatItem label="Total Deposits" value={`$${formatUnits(totalDeposits, 6)}`} />
      <StatItem label="Total Borrows" value={`$${formatUnits(totalBorrows, 6)}`} />
      <StatItem label="Available Liquidity" value={`$${formatUnits(availableLiquidity, 6)}`} accent />
      <StatItem label="Interest Rate" value={`${Number(interestRate) / 100}%`} accent sub={`Utilization: ${Number(utilizationRate) / 100}%`} />
    </div>
  )
}
