export const CONTRACTS = {
  LOANIYO_LENDING: {
    address: process.env.NEXT_PUBLIC_LOANIYO_ADDRESS as `0x${string}` || '0x0000000000000000000000000000000000000000', // Deploy and update this address
    abi: [
      {
        "type": "function",
        "name": "deposit",
        "inputs": [{"name": "amount", "type": "uint256"}],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function", 
        "name": "withdraw",
        "inputs": [{"name": "amount", "type": "uint256"}],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "borrow", 
        "inputs": [{"name": "amount", "type": "uint256"}],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "repay",
        "inputs": [{"name": "amount", "type": "uint256"}], 
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "getUserData",
        "inputs": [{"name": "user", "type": "address"}],
        "outputs": [
          {"name": "deposited", "type": "uint256"},
          {"name": "borrowed", "type": "uint256"}, 
          {"name": "accruedInterest", "type": "uint256"},
          {"name": "totalOwed", "type": "uint256"},
          {"name": "maxBorrow", "type": "uint256"},
          {"name": "maxWithdraw", "type": "uint256"}
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getGlobalData", 
        "inputs": [],
        "outputs": [
          {"name": "totalDeposits", "type": "uint256"},
          {"name": "totalBorrows", "type": "uint256"},
          {"name": "availableLiquidity", "type": "uint256"},
          {"name": "utilizationRate", "type": "uint256"},
          {"name": "interestRate", "type": "uint256"}
        ],
        "stateMutability": "view"
      },
      {
        "type": "event",
        "name": "Deposit",
        "inputs": [
          {"name": "user", "type": "address", "indexed": true},
          {"name": "amount", "type": "uint256", "indexed": false}
        ]
      },
      {
        "type": "event", 
        "name": "Withdraw",
        "inputs": [
          {"name": "user", "type": "address", "indexed": true},
          {"name": "amount", "type": "uint256", "indexed": false}
        ]
      },
      {
        "type": "event",
        "name": "Borrow", 
        "inputs": [
          {"name": "user", "type": "address", "indexed": true},
          {"name": "amount", "type": "uint256", "indexed": false}
        ]
      },
      {
        "type": "event",
        "name": "Repay",
        "inputs": [
          {"name": "user", "type": "address", "indexed": true}, 
          {"name": "amount", "type": "uint256", "indexed": false}
        ]
      }
    ] as const
  },
  // Mock USDC contract for Base
  USDC: {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`, // Base USDC
    abi: [
      {
        "type": "function",
        "name": "balanceOf",
        "inputs": [{"name": "account", "type": "address"}],
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "allowance", 
        "inputs": [
          {"name": "owner", "type": "address"},
          {"name": "spender", "type": "address"}
        ],
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          {"name": "spender", "type": "address"},
          {"name": "amount", "type": "uint256"}
        ],
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "decimals",
        "inputs": [],
        "outputs": [{"name": "", "type": "uint8"}],
        "stateMutability": "view"
      }
    ] as const
  }
} as const
