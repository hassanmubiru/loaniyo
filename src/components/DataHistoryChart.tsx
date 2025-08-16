'use client'

import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { transactionHistory, HistoricalData } from '@/lib/transactionHistory'

export function DataHistoryChart() {
  const { address } = useAccount()
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [selectedMetric, setSelectedMetric] = useState<'tvl' | 'utilization' | 'interestRate'>('tvl')

  useEffect(() => {
    if (address) {
      const data = transactionHistory.getHistoricalData(address)
      setHistoricalData(data)
    }
  }, [address])

  const getMetricValue = (data: HistoricalData, metric: string) => {
    switch (metric) {
      case 'tvl':
        return Number(data.totalDeposited) / 1e6 // Convert bigint to number and scale for USDC
      case 'utilization':
        return data.utilizationRate
      case 'interestRate':
        return data.borrowRate
      default:
        return 0
    }
  }

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'tvl':
        return 'Total Value Locked'
      case 'utilization':
        return 'Utilization Rate'
      case 'interestRate':
        return 'Borrow Rate'
      default:
        return ''
    }
  }

  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case 'tvl':
        return `$${value.toLocaleString()}`
      case 'utilization':
      case 'interestRate':
        return `${value.toFixed(2)}%`
      default:
        return value.toString()
    }
  }

  const maxValue = Math.max(...historicalData.map(d => getMetricValue(d, selectedMetric)))
  const minValue = Math.min(...historicalData.map(d => getMetricValue(d, selectedMetric)))

  if (!address) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
        <p className="text-gray-500 text-sm sm:text-base">Connect your wallet to view data history</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Data History</h2>
        <div className="flex space-x-2">
          {(['tvl', 'utilization', 'interestRate'] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedMetric === metric
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {getMetricLabel(metric)}
            </button>
          ))}
        </div>
      </div>

      {historicalData.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data history yet</h3>
          <p className="text-gray-500">Historical data will appear as you use the platform</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Chart Container */}
          <div className="h-64 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="h-full relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                <span>{formatValue(maxValue, selectedMetric)}</span>
                <span>{formatValue((maxValue + minValue) / 2, selectedMetric)}</span>
                <span>{formatValue(minValue, selectedMetric)}</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-16 h-full relative">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="400"
                      y2={i * 50}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Data line */}
                  {historicalData.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2"
                      points={historicalData
                        .map((data, index) => {
                          const x = (index / (historicalData.length - 1)) * 400
                          const value = getMetricValue(data, selectedMetric)
                          const y = 200 - ((value - minValue) / (maxValue - minValue)) * 200
                          return `${x},${y}`
                        })
                        .join(' ')}
                    />
                  )}
                  
                  {/* Data points */}
                  {historicalData.map((data, index) => {
                    const x = (index / Math.max(historicalData.length - 1, 1)) * 400
                    const value = getMetricValue(data, selectedMetric)
                    const y = 200 - ((value - minValue) / Math.max(maxValue - minValue, 1)) * 200
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#059669"
                        className="hover:r-6 transition-all cursor-pointer"
                      >
                        <title>{`${new Date(data.timestamp).toLocaleDateString()}: ${formatValue(value, selectedMetric)}`}</title>
                      </circle>
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-800 mb-1">Current Value</h3>
              <p className="text-lg font-bold text-green-900">
                {historicalData.length > 0 
                  ? formatValue(getMetricValue(historicalData[historicalData.length - 1], selectedMetric), selectedMetric)
                  : '-'
                }
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-1">24h Change</h3>
              <p className="text-lg font-bold text-blue-900">
                {historicalData.length >= 2 
                  ? (() => {
                      const current = getMetricValue(historicalData[historicalData.length - 1], selectedMetric)
                      const previous = getMetricValue(historicalData[historicalData.length - 2], selectedMetric)
                      const change = ((current - previous) / previous) * 100
                      return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
                    })()
                  : '-'
                }
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-800 mb-1">All Time High</h3>
              <p className="text-lg font-bold text-purple-900">
                {historicalData.length > 0 
                  ? formatValue(maxValue, selectedMetric)
                  : '-'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
