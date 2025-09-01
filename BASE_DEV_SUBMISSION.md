# base.dev Submission Guide for Loaniyo

This guide provides step-by-step instructions for submitting the Loaniyo DeFi lending miniapp to base.dev.

## 📋 Submission Checklist

### Pre-Submission Requirements
- [ ] Deploy to production (Vercel)
- [ ] Deploy smart contracts to Base
- [ ] Update contract addresses
- [ ] Configure environment variables
- [ ] Test all functionality
- [ ] Prepare screenshots
- [ ] Write app description

## 🚀 Step 1: Deploy to Production

### Deploy Frontend
```bash
# Run automated deployment
npm run deploy:miniapp

# Or manually:
npm run build
vercel --prod
```

### Deploy Smart Contracts
```bash
# Deploy to Base Sepolia testnet
npm run deploy:sepolia

# Deploy to Base mainnet
npm run deploy:base
```

### Update Configuration
After deployment, update these files with your contract addresses:

1. **base.dev.json** - Update contracts section
2. **Environment variables** in Vercel dashboard
3. **src/lib/contracts.ts** - Update contract addresses

## 📱 Step 2: Prepare Screenshots

Take screenshots of the following views:

### Required Screenshots
1. **Main Dashboard** - Show the lending interface with stats
2. **Wallet Connection** - Show the connect wallet screen
3. **Mobile Interface** - Show the miniapp mobile view
4. **Action Modal** - Show a lending action (save/borrow)

### Screenshot Guidelines
- **Resolution**: 1280x720 or higher
- **Format**: PNG or JPG
- **Quality**: High quality, clear images
- **Content**: Show actual functionality, not mockups

### Screenshot Locations
Save screenshots to:
```
public/screenshots/
├── dashboard.png
├── connect.png
├── mobile-interface.png
└── action-modal.png
```

## 📝 Step 3: Write App Description

### App Name
**Loaniyo**

### Short Description
DeFi lending platform on Base - Save, borrow, and earn interest with USDC

### Full Description
```
Loaniyo is a decentralized lending platform built on Base blockchain that enables users to participate in DeFi lending with USDC. 

Key Features:
• Save USDC and earn competitive interest rates
• Borrow USDC against your collateral (150% collateralization ratio)
• Real-time interest calculation and accrual
• Secure smart contracts with transparent operations
• Mobile-optimized interface for seamless DeFi access

The platform provides a user-friendly way to access DeFi lending opportunities on Base, with a focus on security, transparency, and ease of use. Users can deposit USDC to earn interest while maintaining the ability to borrow against their collateral when needed.

Built with modern web technologies and optimized for mobile devices, Loaniyo offers a professional DeFi experience that's accessible to both beginners and experienced users.
```

### Categories
- **Primary**: DeFi
- **Secondary**: Lending, Yield

### Tags
- defi
- lending
- borrowing
- yield
- usdc
- base
- ethereum
- interest
- collateral

## 🌐 Step 4: Submit to base.dev

### 1. Visit base.dev
Go to [https://base.dev](https://base.dev)

### 2. Click "Submit App"
Look for the "Submit App" or "Add App" button

### 3. Fill Application Form

#### Basic Information
- **App Name**: Loaniyo
- **Description**: DeFi lending platform on Base - Save, borrow, and earn interest with USDC
- **Website URL**: [Your Vercel URL]
- **Category**: DeFi
- **Tags**: defi, lending, borrowing, yield, usdc, base

#### Technical Information
- **Blockchain**: Base
- **Networks**: Base Mainnet, Base Sepolia
- **Tokens**: USDC
- **Smart Contracts**: Yes

#### Upload Files
- **App Icon**: Upload `public/icon.svg`
- **Screenshots**: Upload all screenshots from `public/screenshots/`
- **Configuration**: Upload `base.dev.json`

### 4. Additional Information

#### Contract Addresses
Provide the deployed contract addresses:
- **Loaniyo Lending Contract**: [Your deployed address]
- **USDC Token**: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

#### Social Links
- **Twitter**: https://twitter.com/loaniyo
- **Discord**: https://discord.gg/loaniyo
- **Telegram**: https://t.me/loaniyo
- **GitHub**: [Your repository URL]

#### Documentation
- **User Guide**: https://docs.loaniyo.com
- **API Reference**: https://docs.loaniyo.com/api
- **Smart Contracts**: https://docs.loaniyo.com/contracts

## 🔧 Step 5: Configuration Files

### base.dev.json
Make sure your `base.dev.json` is complete and accurate:

```json
{
  "name": "Loaniyo",
  "description": "DeFi lending platform on Base - Save, borrow, and earn interest with USDC",
  "version": "1.0.0",
  "author": "Loaniyo Team",
  "homepage": "https://loaniyo.vercel.app",
  "categories": ["defi", "lending", "yield"],
  "networks": ["base", "base-sepolia"],
  "tokens": ["USDC"],
  "contracts": {
    "mainnet": {
      "LoaniyoLending": "YOUR_DEPLOYED_ADDRESS",
      "USDC": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    }
  },
  "miniapp": {
    "entry": "/",
    "theme": {
      "primary": "#10B981",
      "secondary": "#059669"
    },
    "permissions": [
      "wallet_connect",
      "network_switch",
      "contract_read",
      "contract_write"
    ]
  }
}
```

### Environment Variables
Ensure these are set in your Vercel dashboard:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_LOANIYO_ADDRESS=your_contract_address
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

## ✅ Step 6: Final Testing

Before submission, test everything:

### Functionality Testing
- [ ] Wallet connection works
- [ ] Network switching to Base
- [ ] Contract interactions (deposit, borrow, withdraw, repay)
- [ ] Mobile responsiveness
- [ ] PWA installation
- [ ] Miniapp detection

### URL Testing
- [ ] Production URL loads correctly
- [ ] Miniapp mode works (`?miniapp=true`)
- [ ] All links and navigation work
- [ ] No console errors

### Mobile Testing
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test PWA installation
- [ ] Test touch interactions

## 📞 Step 7: Submit and Follow Up

### Submit Application
1. Review all information
2. Submit the application
3. Save the submission reference number

### Follow Up
- Monitor your email for updates
- Be ready to provide additional information
- Respond promptly to any questions
- Provide demo access if requested

## 🎯 Success Criteria

### Technical Requirements
- ✅ Deployed and accessible
- ✅ Smart contracts functional
- ✅ Mobile-optimized interface
- ✅ Wallet integration working
- ✅ Base network support

### Quality Requirements
- ✅ Professional design
- ✅ Clear functionality
- ✅ Good user experience
- ✅ Proper documentation
- ✅ Security considerations

## 📞 Support

If you need help with the submission:

### Documentation
- `MINIAPP_README.md` - Technical documentation
- `MINIAPP_SUMMARY.md` - Implementation summary
- `BASE_DEV_SUBMISSION.md` - This guide

### Contact
- **Email**: support@loaniyo.com
- **Discord**: https://discord.gg/loaniyo
- **GitHub**: [Your repository issues]

## 🎉 After Approval

Once approved on base.dev:

1. **Monitor usage** - Track user engagement
2. **Gather feedback** - Collect user feedback
3. **Iterate** - Make improvements based on feedback
4. **Promote** - Share your miniapp with the community

## 📊 Tracking Success

### Metrics to Monitor
- User registrations
- Transaction volume
- User retention
- Feedback and ratings
- Technical performance

### Success Indicators
- Positive user feedback
- Growing transaction volume
- High user retention
- Good performance metrics
- Community engagement

---

**Good luck with your base.dev submission! 🚀**

The Loaniyo miniapp is well-positioned for success with its mobile-optimized interface, clear DeFi use case, and professional implementation.
