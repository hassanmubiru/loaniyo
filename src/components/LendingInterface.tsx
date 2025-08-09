'use client'

import React, { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { CONTRACTS } from '@/lib/contracts'
import { transactionHistory } from '@/lib/transactionHistory'

type TabType = 'save' | 'withdraw' | 'borrow' | 'repay'

export function LendingInterface() {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState<TabType>('save')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { writeContract, data: hash, error, reset } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Get user data
  const { data: userData, refetch: refetchUserData } = useReadContract({
    address: CONTRACTS.LOANIYO_LENDING.address,
    abi: CONTRACTS.LOANIYO_LENDING.abi,
    functionName: 'getUserData',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // Get user USDC balance
  const { data: usdcBalance, refetch: refetchBalance } = useReadContract({
    address: CONTRACTS.USDC.address,
    abi: CONTRACTS.USDC.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // Get USDC allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.USDC.address,
    abi: CONTRACTS.USDC.abi,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.LOANIYO_LENDING.address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // Remove demo data fallbacks - now only use real contract data
  const displayUserData = userData
  const displayUsdcBalance = usdcBalance
  const displayAllowance = allowance

  useEffect(() => {
    if (isConfirmed) {
      setAmount('')
      setIsLoading(false)
      refetchUserData()
      refetchBalance()
      refetchAllowance()
      
      // Track successful transaction
      if (hash && address && amount) {
        const transactionType = activeTab === 'save' ? 'deposit' : activeTab as 'withdraw' | 'borrow' | 'repay'
        transactionHistory.addTransaction(address, {
          hash,
          type: transactionType,
          amount: parseUnits(amount, 6),
          status: 'confirmed',
          timestamp: Date.now()
        })
      }
      
      reset()
    }
  }, [isConfirmed, refetchUserData, refetchBalance, refetchAllowance, reset, hash, address, amount, activeTab])

  // Track pending transactions
  useEffect(() => {
    if (hash && address && amount) {
      const transactionType = activeTab === 'save' ? 'deposit' : activeTab as 'withdraw' | 'borrow' | 'repay'
      transactionHistory.addTransaction(address, {
        hash,
        type: transactionType,
        amount: parseUnits(amount, 6),
        status: 'pending',
        timestamp: Date.now()
      })
    }
  }, [hash, address, amount, activeTab])

  // Handle failed transactions
  useEffect(() => {
    if (error && hash && address && amount) {
      const transactionType = activeTab === 'save' ? 'deposit' : activeTab as 'withdraw' | 'borrow' | 'repay'
      transactionHistory.updateTransactionStatus(address, hash, 'failed')
    }
  }, [error, hash, address, amount, activeTab])

  const handleApprove = async () => {
    if (!amount) return
    
    setIsLoading(true)
    try {
      writeContract({
        address: CONTRACTS.USDC.address,
        abi: CONTRACTS.USDC.abi,
        functionName: 'approve',
        args: [CONTRACTS.LOANIYO_LENDING.address, parseUnits(amount, 6)],
      })
    } catch (err) {
      setIsLoading(false)
    }
  }

  const handleTransaction = async () => {
    if (!amount || !address) return
    
    setIsLoading(true)
    try {
      const amountWei = parseUnits(amount, 6)
      
      // Map UI tab names to contract function names
      const functionName = activeTab === 'save' ? 'deposit' : activeTab
      
      // Add to pending transactions
      const transactionType = activeTab === 'save' ? 'deposit' : activeTab as 'withdraw' | 'borrow' | 'repay'
      
      writeContract({
        address: CONTRACTS.LOANIYO_LENDING.address,
        abi: CONTRACTS.LOANIYO_LENDING.abi,
        functionName: functionName,
        args: [amountWei],
      })
    } catch (err) {
      setIsLoading(false)
    }
  }

  if (!address) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Wallet</h3>
        <p className="text-gray-500">Connect your wallet to start lending and borrowing</p>
      </div>
    )
  }

  if (!displayUserData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const [deposited, borrowed, accruedInterest, totalOwed, maxBorrow, maxWithdraw] = displayUserData
  const needsApproval = (activeTab === 'save' || activeTab === 'repay') && 
    displayAllowance !== undefined && 
    amount && 
    parseUnits(amount, 6) > displayAllowance

  const isValidAmount = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return false
    
    const amountBN = parseUnits(amount, 6)
    
    switch (activeTab) {
      case 'save':
        return displayUsdcBalance ? amountBN <= displayUsdcBalance : false
      case 'withdraw':
        return amountBN <= maxWithdraw
      case 'borrow':
        return amountBN <= maxBorrow
      case 'repay':
        return displayUsdcBalance ? amountBN <= displayUsdcBalance && amountBN <= totalOwed : false
      default:
        return false
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* User Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Your Position</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <span className="font-medium text-green-800">Deposited</span>
            <span className="text-lg font-bold text-green-600">
              ${formatUnits(deposited, 6)} USDC
            </span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
            <span className="font-medium text-red-800">Borrowed</span>
            <span className="text-lg font-bold text-red-600">
              ${formatUnits(borrowed, 6)} USDC
            </span>
          </div>
          
          {accruedInterest > 0 && (
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
              <span className="font-medium text-yellow-800">Accrued Interest</span>
              <span className="text-lg font-bold text-yellow-600">
                ${formatUnits(accruedInterest, 6)} USDC
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500">Max Borrow</p>
              <p className="font-semibold">${formatUnits(maxBorrow, 6)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Max Withdraw</p>
              <p className="font-semibold">${formatUnits(maxWithdraw, 6)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-1 mb-6">
          {(['save', 'withdraw', 'borrow', 'repay'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setAmount('')
              }}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USDC)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="text-sm text-gray-500">
            {activeTab === 'save' && (
              <p>Balance: ${displayUsdcBalance ? formatUnits(displayUsdcBalance, 6) : '0'} USDC</p>
            )}
            {activeTab === 'withdraw' && (
              <p>Max withdraw: ${formatUnits(maxWithdraw, 6)} USDC</p>
            )}
            {activeTab === 'borrow' && (
              <p>Max borrow: ${formatUnits(maxBorrow, 6)} USDC</p>
            )}
            {activeTab === 'repay' && (
              <p>Total owed: ${formatUnits(totalOwed, 6)} USDC</p>
            )}
          </div>

          {needsApproval ? (
            <button
              onClick={handleApprove}
              disabled={!isValidAmount() || isLoading || isConfirming}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading || isConfirming ? 'Approving...' : 'Approve USDC'}
            </button>
          ) : (
            <button
              onClick={handleTransaction}
              disabled={!isValidAmount() || isLoading || isConfirming}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading || isConfirming 
                ? `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}ing...` 
                : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
              }
            </button>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                Error: {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
