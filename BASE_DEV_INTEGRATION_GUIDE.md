# Base.dev Integration Guide for Loaniyo

## ✅ Prerequisites Verified

1. **✅ Deployed Miniapp**: Your Loaniyo miniapp is deployed at `https://loaniyo.vercel.app` and accessible
2. **✅ Base.dev Account**: You need to sign up at [base.dev](https://base.dev) with your wallet address
3. **✅ Farcaster Manifest**: Created `/.well-known/farcaster.json` with Base Builder object

## 🔧 Required Actions

### Step 1: Update Wallet Address

**IMPORTANT**: You need to replace the placeholder wallet address in the Farcaster manifest with your actual wallet address.

1. Open `public/.well-known/farcaster.json`
2. Replace `"0x0000000000000000000000000000000000000000"` with your actual wallet address
3. Your wallet address should look like: `"0x1234567890abcdef..."`

```json
{
  "baseBuilder": {
    "allowedAddresses": ["YOUR_ACTUAL_WALLET_ADDRESS_HERE"]
  }
}
```

### Step 2: Deploy Updated Files

After updating your wallet address, deploy the changes:

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

### Step 3: Verify Farcaster Manifest

After deployment, verify your Farcaster manifest is accessible:

```bash
curl https://loaniyo.vercel.app/.well-known/farcaster.json
```

You should see the JSON response with your updated wallet address.

## 🚀 Import to Base.dev

### Step 1: Visit Base.dev
1. Go to [https://base.dev](https://base.dev)
2. Connect your wallet (same address as in the manifest)
3. Look for "Import Miniapp" or "Add App" option

### Step 2: Provide Miniapp Details
- **App URL**: `https://loaniyo.vercel.app`
- **App Name**: Loaniyo
- **Description**: DeFi lending platform on Base - Save, borrow, and earn interest with USDC
- **Category**: DeFi

### Step 3: Upload Configuration
- Upload your `base.dev.json` file
- The system will automatically detect your Farcaster manifest

### Step 4: Verify Integration
- Base.dev will verify your Farcaster manifest
- Ensure your wallet address matches the `allowedAddresses` in the manifest
- Confirm the app is accessible and functional

## 📋 Verification Checklist

Before submitting to Base.dev, verify:

- [ ] **Wallet Address Updated**: Your actual wallet address is in `farcaster.json`
- [ ] **Farcaster Manifest Accessible**: `https://loaniyo.vercel.app/.well-known/farcaster.json` returns valid JSON
- [ ] **App Deployed**: Latest version is live on Vercel
- [ ] **Base.dev Account**: You have an account with the same wallet address
- [ ] **App Functional**: All features work correctly

## 🔍 Troubleshooting

### Farcaster Manifest Not Found
If you get a 404 error for the Farcaster manifest:
1. Ensure the file is in `public/.well-known/farcaster.json`
2. Rebuild and redeploy the project
3. Check that Vercel is serving the file correctly

### Wallet Address Mismatch
If Base.dev doesn't recognize your wallet:
1. Ensure the wallet address in `farcaster.json` matches your Base.dev account
2. Check for typos in the wallet address
3. Make sure you're using the same wallet to connect to Base.dev

### Build Errors
If you encounter build errors:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📞 Support

If you encounter issues:

1. **Check Base.dev Documentation**: [https://docs.base.dev](https://docs.base.dev)
2. **Verify Farcaster Integration**: [https://docs.farcaster.xyz](https://docs.farcaster.xyz)
3. **Contact Base.dev Support**: Through their official channels

## 🎉 Success Indicators

Your miniapp is successfully integrated when:

- ✅ Base.dev recognizes your app
- ✅ Farcaster manifest is validated
- ✅ Wallet address is verified
- ✅ App appears in the Base.dev directory
- ✅ Users can discover and access your miniapp

## 📊 Next Steps After Integration

1. **Monitor Usage**: Track how users interact with your miniapp
2. **Gather Feedback**: Collect user feedback and suggestions
3. **Iterate**: Make improvements based on usage data
4. **Promote**: Share your miniapp with the community

---

**Your Loaniyo miniapp is ready for Base.dev integration! 🚀**

Just update your wallet address and deploy to complete the process.
