'use client'

import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from './ConnectButton'
import { GlobalStats } from './GlobalStats'
import { Dashboard } from './Dashboard'

export function MiniappInterface() {
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [showActionModal, setShowActionModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')
  const [formData, setFormData] = useState({
    amount: '',
    token: 'USDC'
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const openActionModal = (action: string) => {
    setSelectedAction(action)
    setShowActionModal(true)
    setFormData({ amount: '', token: 'USDC' })
  }

  const closeActionModal = () => {
    setShowActionModal(false)
    setSelectedAction('')
  }

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`${selectedAction}:`, formData)
    closeActionModal()
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-64 h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                    Loaniyo
                  </h1>
                  <span className="text-xs text-gray-500">DeFi Lending</span>
                </div>
              </div>
              <ConnectButton />
            </div>
          </div>
        </div>

        {/* Connect Wallet Content */}
        <div className="flex items-center justify-center min-h-[70vh] px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Welcome to Loaniyo
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Connect your wallet to start earning interest on your deposits or borrow funds using USDC on Base
            </p>
            
            {/* Features */}
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">Earn competitive interest rates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">Secure smart contracts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">Fast transactions on Base</span>
              </div>
            </div>
            
            <ConnectButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Loaniyo
                </h1>
                <span className="text-xs text-gray-500">DeFi Lending</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-600 bg-green-50 border border-green-200 rounded-full px-2 py-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Base</span>
              </div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {activeTab === 'home' && (
          <div className="px-4 py-6 space-y-6">
            {/* Quick Stats */}
            <GlobalStats />
            
            {/* Action Cards */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Save */}
                <div 
                  className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 cursor-pointer active:scale-95 transition-transform"
                  onClick={() => openActionModal('Save')}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Save</h3>
                    <p className="text-xs text-gray-600">Earn interest</p>
                  </div>
                </div>

                {/* Borrow */}
                <div 
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 cursor-pointer active:scale-95 transition-transform"
                  onClick={() => openActionModal('Borrow')}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Borrow</h3>
                    <p className="text-xs text-gray-600">Get a loan</p>
                  </div>
                </div>

                {/* Withdraw */}
                <div 
                  className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-4 cursor-pointer active:scale-95 transition-transform"
                  onClick={() => openActionModal('Withdraw')}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Withdraw</h3>
                    <p className="text-xs text-gray-600">Take out savings</p>
                  </div>
                </div>

                {/* Repay */}
                <div 
                  className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4 cursor-pointer active:scale-95 transition-transform"
                  onClick={() => openActionModal('Repay')}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Repay</h3>
                    <p className="text-xs text-gray-600">Pay back loans</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Button */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="w-full flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>View Dashboard</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
              <button 
                onClick={() => setActiveTab('home')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back
              </button>
            </div>
            <Dashboard />
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-green-600 bg-green-50' : 'text-gray-600'
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'text-green-600 bg-green-50' : 'text-gray-600'
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-2xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedAction}</h2>
              <button 
                onClick={closeActionModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleActionSubmit}>
              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token
                </label>
                <select 
                  value={formData.token}
                  onChange={(e) => setFormData({...formData, token: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option>USDC</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input 
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-xl p-3 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={closeActionModal}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium transition-colors"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
