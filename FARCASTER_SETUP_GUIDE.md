# Farcaster Integration Setup Guide

## 🚨 Current Issue
The account `0x36d0b41A89470F57c1e4A7A08e39F383AE156868` doesn't have an associated Farcaster ID (FID). You need to use your actual Farcaster custody account.

## 🔑 What You Need

### 1. **Farcaster Custody Account**
- A wallet that has been registered with Farcaster
- Must have a valid FID (Farcaster ID)
- Should be the account you want to associate with your miniapp

### 2. **How to Get a Farcaster Account**
- **Option A**: Use [Warpcast](https://warpcast.com) (most popular)
- **Option B**: Use [Frame](https://frame.sh) 
- **Option C**: Use [Airstack](https://airstack.xyz)

### 3. **Registration Process**
1. Go to [warpcast.com](https://warpcast.com)
2. Click "Sign Up"
3. Connect your wallet (MetaMask, WalletConnect, etc.)
4. Complete the registration process
5. Note your FID and custody address

## 📝 Steps to Fix

### Step 1: Get Your Farcaster Account Info
1. **Open Warpcast** (or your Farcaster client)
2. **Go to your profile** 
3. **Copy your FID** (e.g., 12345)
4. **Copy your custody address** (the wallet address)

### Step 2: Update Your Configuration
Replace the placeholders in `public/.well-known/farcaster.json`:

```json
{
  "accountAssociation": {
    "header": "your-actual-farcaster-header",
    "payload": "your-actual-farcaster-payload", 
    "signature": "your-actual-farcaster-signature"
  },
  "baseBuilder": {
    "allowedAddresses": ["YOUR_ACTUAL_FARCASTER_CUSTODY_ADDRESS"],
    "miniapp": true,
    "category": "defi"
  }
}
```

### Step 3: Generate Cryptographic Proof
1. **Sign a message** with your Farcaster custody wallet:
   ```
   I am the owner of the domain luminous-tiramisu-07191b.netlify.app
   FID: YOUR_FID_HERE
   Timestamp: CURRENT_TIMESTAMP
   ```

2. **Extract the values**:
   - `header`: From the signed message
   - `payload`: From the signed message  
   - `signature`: From the signed message

### Step 4: Redeploy
```bash
netlify deploy --prod --dir=.next
```

## 🔍 Verification

### Check Your FID
- Visit [farcaster.network](https://farcaster.network)
- Search for your username or address
- Verify you have a valid FID

### Test Your Endpoint
After deployment, test:
```
https://your-site.netlify.app/.well-known/farcaster.json
```

## ❓ Common Issues

### "No FID associated with this account"
- **Solution**: Use your actual Farcaster custody account, not a regular wallet
- **Check**: Ensure the wallet has been registered with Farcaster

### "Invalid signature"
- **Solution**: Make sure you're signing with the correct custody wallet
- **Check**: Verify the wallet address matches your Farcaster account

### "Account not verified"
- **Solution**: Complete the Farcaster verification process
- **Check**: Ensure your account is fully set up

## 🚀 Next Steps

1. **Get your Farcaster account** with a valid FID
2. **Update the configuration** with your actual details
3. **Generate the cryptographic proof**
4. **Redeploy to Netlify**
5. **Test the integration**

## 📞 Need Help?

- **Farcaster Discord**: [discord.gg/farcaster](https://discord.gg/farcaster)
- **Warpcast Support**: [help.warpcast.com](https://help.warpcast.com)
- **Base Documentation**: [docs.base.org](https://docs.base.org)
