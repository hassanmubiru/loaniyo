'use client'

import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { transactionHistory, TransactionData } from '@/lib/transactionHistory'

export function TransactionHistory() {
  const { address } = useAccount()
  const [transactions, setTransactions] = useState<TransactionData[]>([])
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw' | 'borrow' | 'repay'>('all')

  useEffect(() => {
    if (address) {
      const history = transactionHistory.getTransactionHistory(address)
      setTransactions(history)
    }
  }, [address])

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || tx.type === filter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'failed':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600 bg-green-50'
      case 'withdraw':
        return 'text-blue-600 bg-blue-50'
      case 'borrow':
        return 'text-orange-600 bg-orange-50'
      case 'repay':
        return 'text-purple-600 bg-purple-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (!address) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Connect your wallet to view transaction history</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Transaction History</h2>
        <div className="flex flex-wrap gap-2">
          {(['all', 'deposit', 'withdraw', 'borrow', 'repay'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'Start by making your first deposit or borrow'
              : `No ${filter} transactions found`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((tx) => {
            const formatted = transactionHistory.formatTransaction(tx)
            return (
              <div
                key={tx.hash}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(tx.type)}`}>
                    {formatted.type}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{formatted.amount}</p>
                    <p className="text-sm text-gray-500">{formatted.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                  <a
                    href={`https://basescan.org/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 transition-colors"
                    title="View on Basescan"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
