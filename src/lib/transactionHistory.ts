import { formatUnits } from 'viem'

export interface TransactionData {
  hash: string
  type: 'deposit' | 'withdraw' | 'borrow' | 'repay'
  amount: bigint
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
  blockNumber?: number
}

export interface HistoricalData {
  timestamp: number
  totalDeposited: bigint
  totalBorrowed: bigint
  interestEarned: bigint
  netPosition: bigint
  utilizationRate: number
  borrowRate: number
}

class TransactionHistoryManager {
  private storageKey = 'loaniyo_transaction_history'
  private historyKey = 'loaniyo_historical_data'

  // Get user's transaction history from localStorage
  getTransactionHistory(userAddress: string): TransactionData[] {
    try {
      const stored = localStorage.getItem(`${this.storageKey}_${userAddress.toLowerCase()}`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Add new transaction to history
  addTransaction(userAddress: string, transaction: TransactionData): void {
    try {
      const history = this.getTransactionHistory(userAddress)
      history.unshift(transaction) // Add to beginning
      
      // Keep only last 100 transactions
      const trimmedHistory = history.slice(0, 100)
      
      localStorage.setItem(
        `${this.storageKey}_${userAddress.toLowerCase()}`,
        JSON.stringify(trimmedHistory)
      )
    } catch (error) {
      console.error('Failed to save transaction history:', error)
    }
  }

  // Update transaction status (when confirmed or failed)
  updateTransactionStatus(
    userAddress: string, 
    txHash: string, 
    status: 'confirmed' | 'failed',
    blockNumber?: number
  ): void {
    try {
      const history = this.getTransactionHistory(userAddress)
      const txIndex = history.findIndex(tx => tx.hash === txHash)
      
      if (txIndex !== -1) {
        history[txIndex].status = status
        if (blockNumber) {
          history[txIndex].blockNumber = blockNumber
        }
        
        localStorage.setItem(
          `${this.storageKey}_${userAddress.toLowerCase()}`,
          JSON.stringify(history)
        )
      }
    } catch (error) {
      console.error('Failed to update transaction status:', error)
    }
  }

  // Get historical data snapshots
  getHistoricalData(userAddress: string): HistoricalData[] {
    try {
      const stored = localStorage.getItem(`${this.historyKey}_${userAddress.toLowerCase()}`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Add historical data snapshot
  addHistoricalSnapshot(userAddress: string, data: HistoricalData): void {
    try {
      const history = this.getHistoricalData(userAddress)
      
      // Only add if it's been at least 1 hour since last snapshot
      const lastSnapshot = history[0]
      if (!lastSnapshot || data.timestamp - lastSnapshot.timestamp > 3600000) {
        history.unshift(data)
        
        // Keep only last 30 days of data (assuming 4 snapshots per day)
        const trimmedHistory = history.slice(0, 120)
        
        localStorage.setItem(
          `${this.historyKey}_${userAddress.toLowerCase()}`,
          JSON.stringify(trimmedHistory)
        )
      }
    } catch (error) {
      console.error('Failed to save historical data:', error)
    }
  }

  // Clear all data for user
  clearUserData(userAddress: string): void {
    try {
      localStorage.removeItem(`${this.storageKey}_${userAddress.toLowerCase()}`)
      localStorage.removeItem(`${this.historyKey}_${userAddress.toLowerCase()}`)
    } catch (error) {
      console.error('Failed to clear user data:', error)
    }
  }

  // Format transaction for display
  formatTransaction(tx: TransactionData): {
    type: string
    amount: string
    date: string
    status: string
    hash: string
  } {
    const types = {
      deposit: 'Deposit',
      withdraw: 'Withdraw', 
      borrow: 'Borrow',
      repay: 'Repay'
    }

    return {
      type: types[tx.type],
      amount: `$${formatUnits(tx.amount, 6)} USDC`,
      date: new Date(tx.timestamp).toLocaleString(),
      status: tx.status,
      hash: tx.hash
    }
  }
}

export const transactionHistory = new TransactionHistoryManager()
