# 🚀 LoaniyoLending Contract Deployment Guide

## ❌ Current Issue
Your Loaniyo app shows a "Contract Error" because the LoaniyoLending smart contract needs to be deployed to Base blockchain.

## 📋 Solution Steps

### Step 1: Get Base ETH for Deployment
You need Base ETH to pay for gas fees when deploying the contract.

**Options:**
1. **Bridge ETH to Base** (Recommended)
   - Go to [bridge.base.org](https://bridge.base.org)
   - Bridge ETH from Ethereum mainnet to Base
   - Minimum: ~0.01 ETH ($25-50 depending on gas prices)

2. **Buy directly on Base**
   - Use Coinbase (Base's parent company)
   - Or use a CEX that supports Base withdrawals

3. **Use Base Sepolia testnet** (Free for testing)
   - Get free testnet ETH from [Base Sepolia faucet](https://faucet.quicknode.com/base/sepolia)

### Step 2: Set Up Private Key
⚠️ **Security Warning**: Only use test accounts or create a new wallet for deployment

```bash
# In your .env.local file, replace with your private key:
PRIVATE_KEY=0x1234567890abcdef...your_actual_private_key_here
```

### Step 3: Deploy the Contract

**For Base Sepolia (Recommended for testing):**
```bash
npm run deploy:sepolia
# or
npx hardhat run scripts/deploy-sepolia.js --network base-sepolia
```

**For Base Mainnet (Real deployment - costs real ETH):**
```bash
npm run deploy:base
# or
npx hardhat run scripts/deploy-base.js --network base
```

### Step 4: Update Environment Variables

After successful deployment, you'll get a contract address like:
```
✅ LoaniyoLending deployed to: 0xABC123...
```

Update your environment variables:

**Local (.env.local):**
```bash
NEXT_PUBLIC_LOANIYO_ADDRESS=0xABC123...your_deployed_address
```

**Vercel (Production):**
```bash
vercel env add NEXT_PUBLIC_LOANIYO_ADDRESS
# Enter the deployed contract address when prompted
```

### Step 5: Deploy Updated App
```bash
vercel --prod
```

## 🎯 Expected Results

After successful deployment:
- ✅ Contract Error disappears
- ✅ Global stats show real data (starting with $0)
- ✅ Users can connect wallets and interact
- ✅ Deposits, withdrawals, borrows work
- ✅ Transaction history tracks real transactions

## 🛟 Quick Test Option (Sepolia)

If you want to test immediately for free:

1. **Get Sepolia ETH**: Visit [Base Sepolia faucet](https://faucet.quicknode.com/base/sepolia)
2. **Use test private key** (from your wallet or create new)
3. **Deploy to Sepolia**:
   ```bash
   npx hardhat run scripts/deploy.js --network base-sepolia
   ```
4. **Update environment** with Sepolia contract address
5. **Switch your wallet** to Base Sepolia network to test

## 🔧 Alternative: Temporary Fix

If you can't deploy immediately, I can set up a demo contract temporarily:

```bash
# This sets a placeholder that shows "deployment needed" message
NEXT_PUBLIC_LOANIYO_ADDRESS=0x0000000000000000000000000000000000000000
```

## 📞 Need Help?

Common issues:
- **"Insufficient funds"**: Need more Base ETH
- **"Invalid private key"**: Check .env.local format
- **"Network error"**: Check internet connection
- **"Contract verification failed"**: Normal, contract still works

The deployment script will guide you through the process and show detailed error messages if anything goes wrong.
