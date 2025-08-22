'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi'
import { getWalletConnectErrorMessage } from '@/lib/walletUtils'
import { formatEther } from 'viem'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const [mounted, setMounted] = useState(false)
  const [showWallets, setShowWallets] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Get ETH balance
  const { data: balance } = useBalance({
    address: address,
    query: {
      enabled: !!address && isConnected,
    }
  })

  // Get network name
  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 84532: return 'Base Sepolia'
      case 8453: return 'Base'
      case 1: return 'Ethereum'
      default: return 'Unknown Network'
    }
  }

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowWallets(false)
        setShowAccountMenu(false)
      }
    }

    if (showWallets || showAccountMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showWallets, showAccountMenu])

  if (!mounted) {
    return (
      <button
        disabled
        className="bg-gray-400 text-white font-medium py-2 px-6 rounded-xl"
      >
        Loading...
      </button>
    )
  }

  if (isConnected) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowAccountMenu(!showAccountMenu)}
          className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              {balance && (
                <div className="text-xs opacity-90">
                  {Number(formatEther(balance.value)).toFixed(4)} ETH
                </div>
              )}
            </div>
          </div>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAccountMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 min-w-[280px] z-50">
            <div className="p-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Connected Wallet</div>
                  <div className="text-sm text-gray-500">{address?.slice(0, 8)}...{address?.slice(-6)}</div>
                </div>
              </div>
              
              <div className="py-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Network</span>
                  <span className="text-sm font-medium text-gray-900">{getNetworkName(chainId)}</span>
                </div>
                {balance && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Balance</span>
                    <span className="text-sm font-medium text-gray-900">
                      {Number(formatEther(balance.value)).toFixed(6)} ETH
                    </span>
                  </div>
                )}
                {chainId !== 84532 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-2">
                    <div className="text-xs text-yellow-800">
                      ⚠️ Switch to Base Sepolia for full functionality
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    disconnect()
                    setShowAccountMenu(false)
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (showWallets) {
    return (
      <div className="relative" ref={dropdownRef}>
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 min-w-[250px] z-50">
          <div className="p-3">
            <div className="text-center pb-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-1">Connect Wallet</h3>
              <p className="text-xs text-gray-500">Choose your preferred wallet</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3 mb-3">
                <div className="text-red-600 text-xs font-medium">
                  {getWalletConnectErrorMessage(error)}
                </div>
              </div>
            )}
            
            <div className="space-y-1 mt-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => {
                    connect({ connector })
                    setShowWallets(false)
                  }}
                  disabled={isPending}
                  className="w-full flex items-center gap-3 px-3 py-3 hover:bg-green-50 rounded-lg transition-colors duration-200 text-sm font-medium text-gray-900 disabled:opacity-50"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">
                      {isPending ? 'Connecting...' : connector.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {connector.name === 'WalletConnect' ? 'Scan with wallet' : 'Connect browser extension'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowWallets(false)}
              className="w-full mt-3 px-3 py-2 text-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowWallets(false)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowWallets(true)}
      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      Connect Wallet
    </button>
  )
}
