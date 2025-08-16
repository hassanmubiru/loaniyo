'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { getWalletConnectErrorMessage } from '@/lib/walletUtils'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)
  const [showWallets, setShowWallets] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowWallets(false)
      }
    }

    if (showWallets) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showWallets])

  if (!mounted) {
    return (
      <button
        disabled
        className="bg-gray-400 text-white font-medium py-2 px-6 rounded-lg"
      >
        Loading...
      </button>
    )
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xs sm:text-sm text-gray-600 font-medium">
          {address?.slice(0, 4)}...{address?.slice(-3)}
        </span>
        <button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
        >
          Disconnect
        </button>
      </div>
    )
  }

  if (showWallets) {
    return (
      <div className="relative" ref={dropdownRef}>
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-300 min-w-[200px] sm:min-w-48 z-50">
          <div className="p-2">
            {error && (
              <div className="text-red-600 text-xs sm:text-sm mb-2 px-2">
                {getWalletConnectErrorMessage(error)}
              </div>
            )}
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => {
                  connect({ connector })
                  setShowWallets(false)
                }}
                disabled={isPending}
                className="w-full text-left px-3 py-3 hover:bg-green-50 rounded-md transition-colors duration-200 text-xs sm:text-sm font-medium text-gray-900 border-b border-gray-100 last:border-b-0"
              >
                {isPending ? 'Connecting...' : `Connect ${connector.name}`}
              </button>
            ))}
            <button
              onClick={() => setShowWallets(false)}
              className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-md transition-colors duration-200 text-xs sm:text-sm text-gray-600 mt-1"
            >
              Cancel
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowWallets(false)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowWallets(true)}
      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
    >
      Connect Wallet
    </button>
  )
}
