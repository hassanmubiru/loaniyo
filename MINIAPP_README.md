# Loaniyo Miniapp for base.dev

This document explains how to deploy and integrate the Loaniyo DeFi lending platform as a miniapp on base.dev.

## Overview

Loaniyo is a DeFi lending platform built on Base blockchain that allows users to:
- **Save USDC** and earn interest
- **Borrow USDC** against collateral (150% collateralization ratio)
- **Withdraw** deposited funds
- **Repay** borrowed amounts

The miniapp provides a mobile-optimized interface specifically designed for base.dev integration.

## Features

### Mobile-First Design
- Touch-friendly interface with large buttons
- Bottom navigation for easy access
- Modal-based actions for better UX
- Responsive design that works on all screen sizes

### Miniapp Optimizations
- Automatic detection of miniapp environment
- Standalone mode support
- PWA manifest for app-like experience
- Optimized loading and performance

### DeFi Functionality
- Real-time interest calculation
- Secure smart contract interactions
- Base network integration
- USDC token support

## File Structure

```
├── base.dev.json              # Base.dev miniapp configuration
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icon.svg              # App icon
├── src/
│   ├── components/
│   │   ├── MiniappInterface.tsx  # Mobile-optimized interface
│   │   └── ...                 # Other components
│   └── app/
│       ├── layout.tsx         # Updated with miniapp metadata
│       └── page.tsx           # Miniapp detection logic
```

## Configuration Files

### base.dev.json
The main configuration file for base.dev integration:

```json
{
  "name": "Loaniyo",
  "description": "DeFi lending platform on Base - Save, borrow, and earn interest with USDC",
  "version": "1.0.0",
  "categories": ["defi", "lending", "yield"],
  "networks": ["base", "base-sepolia"],
  "tokens": ["USDC"],
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

### manifest.json
PWA manifest for app-like experience:

```json
{
  "name": "Loaniyo - DeFi Lending",
  "short_name": "Loaniyo",
  "description": "DeFi lending platform on Base",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#10B981",
  "background_color": "#F9FAFB"
}
```

## Deployment

### 1. Deploy to Vercel

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

### 2. Configure Environment Variables

Set up the following environment variables in your Vercel dashboard:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_LOANIYO_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

### 3. Deploy Smart Contracts

```bash
# Deploy to Base mainnet
npm run deploy:base

# Deploy to Base Sepolia testnet
npm run deploy:sepolia
```

### 4. Update Contract Addresses

After deployment, update the contract addresses in:
- `base.dev.json` (contracts section)
- Environment variables
- `src/lib/contracts.ts`

## Integration with base.dev

### 1. Submit to base.dev

1. Visit [base.dev](https://base.dev)
2. Click "Submit App"
3. Fill in the application form with:
   - App name: Loaniyo
   - Description: DeFi lending platform on Base
   - URL: Your deployed Vercel URL
   - Category: DeFi
   - Tags: lending, borrowing, yield, usdc

### 2. Upload Configuration

Upload the `base.dev.json` file during the submission process.

### 3. Provide Screenshots

Include screenshots of:
- Main dashboard
- Wallet connection
- Lending interface
- Mobile view

## Testing

### Local Development

```bash
# Start development server
npm run dev

# Test miniapp mode
# Add ?miniapp=true to URL or use standalone mode
```

### Miniapp Detection

The app automatically detects miniapp environment through:
- Standalone display mode
- User agent detection
- URL parameter (`?miniapp=true`)

### Testing Checklist

- [ ] Wallet connection works
- [ ] Network switching to Base
- [ ] Contract interactions
- [ ] Mobile responsiveness
- [ ] Touch interactions
- [ ] Modal dialogs
- [ ] Bottom navigation
- [ ] PWA installation

## Security Considerations

### Smart Contract Security
- [ ] Audit smart contracts before mainnet deployment
- [ ] Test thoroughly on testnets
- [ ] Implement proper access controls
- [ ] Add circuit breakers for emergencies

### Frontend Security
- [ ] Validate all user inputs
- [ ] Implement proper error handling
- [ ] Use HTTPS in production
- [ ] Regular dependency updates

## Performance Optimization

### Loading Speed
- [ ] Optimize bundle size
- [ ] Use Next.js image optimization
- [ ] Implement lazy loading
- [ ] Cache static assets

### Mobile Performance
- [ ] Minimize JavaScript execution
- [ ] Optimize touch interactions
- [ ] Reduce network requests
- [ ] Use efficient animations

## Troubleshooting

### Common Issues

#### Miniapp Not Detected
- Check if `?miniapp=true` parameter is added
- Verify standalone mode detection
- Test user agent detection

#### Wallet Connection Issues
- Ensure WalletConnect project ID is set
- Check network configuration
- Verify contract addresses

#### Contract Interaction Errors
- Confirm contract is deployed
- Check network connection
- Verify user has sufficient balance

### Debug Mode

Enable debug mode by adding `?debug=true` to the URL:

```javascript
// In MiniappInterface.tsx
const isDebug = new URLSearchParams(window.location.search).get('debug') === 'true'
```

## Support

For issues and questions:
- GitHub Issues: [Repository URL]
- Discord: [Discord Server]
- Email: support@loaniyo.com

## License

This project is licensed under the MIT License.

## Disclaimer

This software is provided "as is" without warranty. Use at your own risk. The authors are not responsible for any financial losses.
