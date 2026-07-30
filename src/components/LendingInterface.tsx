'use client'

import React, { useState } from 'react'
import { TrendingUp, ArrowDownToLine, ArrowUpFromLine, RotateCcw, BarChart3, ArrowLeft } from 'lucide-react'
import { Dashboard } from './Dashboard'

const ACTIONS = [
  { id: 'Save Money', icon: TrendingUp, label: 'Save', description: 'Earn interest on deposits', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-600' },
  { id: 'Borrow Money', icon: ArrowDownToLine, label: 'Borrow', description: 'Loan against collateral', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-600' },
  { id: 'Withdraw', icon: ArrowUpFromLine, label: 'Withdraw', description: 'Remove your deposits', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-600' },
  { id: 'Pay Back', icon: RotateCcw, label: 'Repay', description: 'Repay outstanding loans', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-600' },
] as const

export function LendingInterface() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')
  const [showDashboard, setShowDashboard] = useState(false)
  const [formData, setFormData] = useState({
    moneyType: 'USDC',
    amount: '',
    lockPeriod: '30 days'
  })

  const openModal = (action: string) => {
    setSelectedAction(action)
    setIsModalOpen(true)
    setFormData({ moneyType: 'USDC', amount: '', lockPeriod: '30 days' })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAction('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`${selectedAction}:`, formData)
    closeModal()
  }

  if (showDashboard) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowDashboard(false)}
          className="flex items-center gap-2 text-sm text-muted dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <Dashboard />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Action grid — clean bordered cards, no pastel gradients */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              onClick={() => openModal(action.id)}
              className="group relative flex flex-col items-start p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/40 transition-all text-left"
            >
              <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-base font-semibold text-white">
                {action.label}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {action.description}
              </p>
            </button>
          )
        })}
      </div>

      {/* Dashboard link */}
      <button
        onClick={() => setShowDashboard(true)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/40 transition-all group"
      >
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
          <span className="text-sm font-medium text-white">View Dashboard</span>
        </div>
        <svg className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 dark:border-slate-700">
              <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white">{selectedAction}</h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Asset
                </label>
                <select
                  value={formData.moneyType}
                  onChange={(e) => setFormData({...formData, moneyType: e.target.value})}
                  className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option>USDC</option>
                  <option>DAI</option>
                  <option>USDT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>

              {selectedAction === 'Save Money' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Lock Period
                  </label>
                  <select
                    value={formData.lockPeriod}
                    onChange={(e) => setFormData({...formData, lockPeriod: e.target.value})}
                    className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  >
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>180 days</option>
                    <option>365 days</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 px-4 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-primary hover:bg-secondary text-white rounded-xl font-medium text-sm transition-colors"
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
