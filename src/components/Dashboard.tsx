'use client'

import React, { useState } from 'react'
import { TrendingUp, ArrowDown, Shield, BarChart3, Clock, Clipboard } from 'lucide-react'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'withdraw' | 'history'>('withdraw')

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <h1 className="font-heading text-xl font-bold text-white">Dashboard</h1>
      </div>

      {/* Financial Summary */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-base font-semibold text-white">Financial Summary</h2>
          <TrendingUp className="w-5 h-5 text-slate-500" />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Savings</p>
            <p className="font-heading text-2xl font-bold text-primary">$0.00</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Loans</p>
            <p className="font-heading text-2xl font-bold text-red-400">$0.00</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'withdraw'
                ? 'bg-primary text-white'
                : 'bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            Withdraw
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Clock className="w-4 h-4" />
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px] rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
          {activeTab === 'withdraw' && (
            <div className="space-y-4">
              <h4 className="font-medium text-white text-sm">Withdraw Funds</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Amount</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full border border-white/[0.1] rounded-lg px-4 py-3 bg-white/[0.03] text-white placeholder-slate-600 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Asset</label>
                  <select className="w-full border border-white/[0.1] rounded-lg px-4 py-3 bg-white/[0.03] text-white text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors">
                    <option>USDC</option>
                    <option>DAI</option>
                    <option>USDT</option>
                  </select>
                </div>
                <button className="w-full bg-primary hover:bg-secondary text-white py-3 px-4 rounded-lg font-medium text-sm transition-colors">
                  Withdraw
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h4 className="font-medium text-white text-sm">Transaction History</h4>
              <div className="text-center py-8">
                <Clipboard className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                <p className="text-slate-400 text-sm">No transactions yet</p>
                <p className="text-slate-600 text-xs mt-1">Your transaction history will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Savings */}
        <DashCard icon={<TrendingUp className="w-4 h-4 text-primary" />} title="Savings">
          <p className="text-slate-500 text-sm">No earnings yet</p>
        </DashCard>

        {/* Loans */}
        <DashCard icon={<ArrowDown className="w-4 h-4 text-red-400" />} title="Loans">
          <p className="text-slate-500 text-sm">No active loans</p>
        </DashCard>

        {/* Collateral */}
        <DashCard icon={<Shield className="w-4 h-4 text-purple-400" />} title="Collateral">
          <p className="text-slate-500 text-sm">No collateral</p>
        </DashCard>

        {/* Rates */}
        <DashCard icon={<BarChart3 className="w-4 h-4 text-blue-400" />} title="Rates">
          <p className="text-slate-500 text-sm">Connect to view live rates</p>
        </DashCard>
      </div>

      {/* TVL */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
        <h3 className="font-heading text-base font-semibold text-white mb-4">Total Value Locked</h3>
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-slate-400">Available Liquidity</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <p className="font-heading text-3xl font-bold text-primary">—</p>
          <p className="text-xs text-slate-500 mt-2">Data loaded from on-chain contract</p>
        </div>
      </div>
    </div>
  )
}

function DashCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function RateRow({ label, value, tag, tagColor = 'text-slate-400 bg-white/[0.05]' }: { label: string; value: string; tag: string; tagColor?: string }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03]">
      <span className="text-sm text-slate-300">{label} <span className="text-slate-500">{value}</span></span>
      <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${tagColor}`}>{tag}</span>
    </div>
  )
}
