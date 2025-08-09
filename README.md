# Loaniyo - DeFi Lending Platform

A decentralized lending platform built on Base blockchain that allows users to save, withdraw, borrow, and repay loans using USDC.

## Features

- **Save (Deposit)**: Deposit USDC to earn interest and use as collateral
- **Withdraw**: Remove deposited USDC (subject to collateralization requirements)
- **Borrow**: Borrow USDC against your deposited collateral (150% collateralization ratio)
- **Repay**: Repay borrowed amounts plus accrued interest

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Base (Ethereum L2)
- **Web3**: Wagmi, Viem, ConnectKit
- **Smart Contracts**: Solidity

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, etc.)
- Base network added to your wallet

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd loaniyo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Get from https://cloud.walletconnect.com/
- Update contract addresses after deployment

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract Deployment

### Prerequisites

- Foundry or Hardhat for contract deployment
- Base network RPC endpoint
- Private key with ETH on Base for gas fees

### Contract Features

The `LoaniyoLending.sol` contract includes:

- **Deposits**: Users can deposit USDC as collateral
- **Borrowing**: Borrow up to 66.67% of deposited value (150% collateralization)
- **Interest**: 5% annual interest rate on borrowed amounts
- **Liquidation Protection**: Prevents withdrawals that would undercollateralize positions
- **Real-time Interest**: Interest accrues continuously based on time elapsed

### Deployment Steps

1. Compile the contract:
```bash
forge build
# or
npx hardhat compile
```

2. Deploy to Base:
```bash
forge create --rpc-url https://mainnet.base.org --private-key $PRIVATE_KEY src/LoaniyoLending.sol:LoaniyoLending --constructor-args 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

3. Update the contract address in:
   - `.env.local`
   - `src/lib/contracts.ts`

## Usage

### For Users

1. **Connect Wallet**: Click "Connect Wallet" and select your preferred wallet
2. **Add Base Network**: Ensure your wallet is connected to Base network
3. **Get USDC**: You'll need USDC on Base to interact with the platform
4. **Start Lending**:
   - **Save**: Deposit USDC to earn interest and use as collateral
   - **Borrow**: Borrow USDC against your collateral (max 66.67% of deposit value)
   - **Repay**: Pay back borrowed amounts plus interest
   - **Withdraw**: Remove your deposits (ensuring adequate collateralization)

### Risk Parameters

- **Collateralization Ratio**: 150% (borrow up to 66.67% of deposit value)
- **Interest Rate**: 5% annually on borrowed amounts
- **Liquidation**: Currently no liquidation mechanism (future enhancement)

## Development

### Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ConnectButton.tsx  # Wallet connection
│   ├── GlobalStats.tsx    # Platform statistics
│   ├── LendingInterface.tsx # Main lending UI
│   └── Providers.tsx      # Web3 providers setup
└── lib/                   # Utility libraries
    ├── contracts.ts       # Contract ABIs and addresses
    └── wagmi.ts          # Wagmi configuration
```

### Key Components

- **Providers**: Sets up Wagmi, TanStack Query, and ConnectKit
- **ConnectButton**: Wallet connection interface
- **GlobalStats**: Displays platform-wide statistics
- **LendingInterface**: Main interface for all lending operations

## Security Considerations

⚠️ **Important**: This is a demonstration project. Before using in production:

1. **Audit the smart contract** thoroughly
2. **Add liquidation mechanisms** for undercollateralized positions
3. **Implement proper access controls**
4. **Add circuit breakers** for emergency situations
5. **Test extensively** on testnets
6. **Consider oracle integration** for asset pricing

## Troubleshooting

### Common Issues

#### Hydration Errors
If you see "Hydration failed" errors:
- The app includes hydration protection for wallet connections
- These errors should be resolved automatically
- If persistent, try refreshing the page

#### WalletConnect Connection Issues
If WalletConnect fails to connect:
1. **Check Project ID**: Ensure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set correctly
   ```bash
   # Get your project ID from https://cloud.walletconnect.com/
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id
   ```
2. **Restart Development Server**: After changing environment variables
3. **Use Alternative Wallets**: Try MetaMask or injected wallets if WalletConnect fails

#### Contract Interaction Errors
If contract calls fail:
1. **Check Network**: Ensure you're connected to Base network
2. **Verify Contract Address**: Confirm `NEXT_PUBLIC_LOANIYO_ADDRESS` is correct
3. **Check Balances**: Ensure you have sufficient USDC and ETH for gas
4. **Approve Tokens**: For deposits/repayments, approve USDC spending first

#### Development Server Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart development server
npm run dev
```

### Environment Setup Checklist

- [ ] Node.js 18+ installed
- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] WalletConnect Project ID obtained
- [ ] Base network added to wallet
- [ ] USDC available for testing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is provided "as is", without warranty of any kind. Use at your own risk. The authors are not responsible for any losses incurred through the use of this software.
