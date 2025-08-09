# LoaniyoLending Contract Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. **Base ETH**: You need ETH on Base network for gas fees
2. **Private Key**: Your wallet's private key with ETH
3. **Environment Variables**: Properly configured `.env.local`

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set up Environment Variables

Update your `.env.local` file with your private key:

```bash
# Replace with your actual private key (the one with ETH on Base)
PRIVATE_KEY=0x1234567890abcdef...

# Already configured
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=21caa6b13140d3fd0a9b188a9e7dbede
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
BASESCAN_API_KEY=7HCZY5BADYRR2MJR4FHM484B6ZRKXFQ69S
```

## Step 3: Deploy to Base Mainnet

```bash
npx hardhat run scripts/deploy.js --network base
```

## Step 4: Update Contract Address

After deployment, update your `.env.local` with the deployed contract address:

```bash
NEXT_PUBLIC_LOANIYO_ADDRESS=0x... # Replace with actual deployed address
```

## Step 5: Verify Contract (Optional)

```bash
npx hardhat verify --network base <CONTRACT_ADDRESS> 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

## Step 6: Restart Development Server

```bash
npm run dev
```

## Expected Output

After successful deployment, you should see:

```
Deploying LoaniyoLending contract...
LoaniyoLending deployed to: 0x1234567890abcdef...
USDC address: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

To verify on Basescan, run:
npx hardhat verify --network base 0x1234567890abcdef... 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

Update your .env.local file with:
NEXT_PUBLIC_LOANIYO_ADDRESS=0x1234567890abcdef...
```

## Troubleshooting

### Common Issues:

1. **"insufficient funds"**: You need more ETH on Base
2. **"invalid private key"**: Check your private key format
3. **"network not found"**: Ensure Hardhat config is correct

### Getting Base ETH:

1. Bridge ETH from Ethereum mainnet using [Base Bridge](https://bridge.base.org/)
2. Or use exchanges that support Base network

## Security Notes

- ⚠️ **Never commit your private key to Git**
- ⚠️ **Keep your `.env.local` file secure**
- ⚠️ **Consider using a testnet first for testing**

## Post-Deployment

After deployment:
1. The demo mode banner will disappear
2. Real blockchain data will load
3. Transactions will interact with the live contract
4. Users can deposit, borrow, withdraw, and repay real USDC
