'use client'

import React, { useState } from 'react'

export function LendingInterface() {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [amount, setAmount] = useState('')
  const [moneyType, setMoneyType] = useState('')
  const [lockPeriod, setLockPeriod] = useState('30 days')

  const openModal = (type: string) => {
    setModalType(type)
    setShowModal(true)
    setAmount('')
    setMoneyType('')
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType('')
    setAmount('')
    setMoneyType('')
  }

  const handleSave = () => {
    // Handle save logic here
    console.log(`${modalType}:`, { amount, moneyType, lockPeriod })
    closeModal()
  }
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Loaniyo
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          Choose an action to get started
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span>Unverified</span>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {/* Save Money */}
        <div 
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
          onClick={() => openModal('Save Money')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Save Money</h3>
            <p className="text-sm text-gray-600">Earn interest on your savings</p>
          </div>
        </div>

        {/* Borrow Money */}
        <div 
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
          onClick={() => openModal('Borrow Money')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Borrow Money</h3>
            <p className="text-sm text-gray-600">Get a loan with collateral</p>
          </div>
        </div>

        {/* Withdraw */}
        <div 
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
          onClick={() => openModal('Withdraw')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Withdraw</h3>
            <p className="text-sm text-gray-600">Take out your savings</p>
          </div>
        </div>

        {/* Pay Back */}
        <div 
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
          onClick={() => openModal('Pay Back')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Pay Back</h3>
            <p className="text-sm text-gray-600">Repay your loans</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Quick Actions</h3>
        <div className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="font-medium">Dashboard</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{modalType}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Money Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Money Type
                </label>
                <select
                  value={moneyType}
                  onChange={(e) => setMoneyType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Select type</option>
                  <option value="USDC">USDC</option>
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Lock For (only for Save Money) */}
              {modalType === 'Save Money' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lock For
                  </label>
                  <select
                    value={lockPeriod}
                    onChange={(e) => setLockPeriod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                    <option value="90 days">90 days</option>
                    <option value="180 days">180 days</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
