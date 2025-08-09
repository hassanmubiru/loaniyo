# WalletConnect Configuration Note

## Issue
WalletConnect has been temporarily removed from the wagmi configuration due to TypeScript compatibility issues with the current versions:

- wagmi: ^2.16.1  
- viem: ^2.17.1

## Error
```
Argument of type 'CreateConnectorFn<EthereumProvider, ...>' is not assignable to parameter of type 'CreateConnectorFn<...>'
```

This is related to storage interface incompatibilities between WalletConnect connector and wagmi's expected types.

## Current Solution
- Using only `injected()` and `metaMask()` connectors
- Both provide good wallet connection options for most users
- MetaMask covers the majority of Web3 users
- Injected connector works with most other wallet browser extensions

## Future Resolution
To re-enable WalletConnect:

1. **Wait for version compatibility**: Monitor wagmi and @wagmi/connectors releases for WalletConnect fixes
2. **Update dependencies**: When compatible versions are available:
   ```bash
   npm update wagmi @wagmi/connectors viem
   ```
3. **Re-add WalletConnect**:
   ```typescript
   import { walletConnect } from 'wagmi/connectors'
   
   // In connectors array:
   walletConnect({ 
     projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID 
   })
   ```

## Alternative Solutions
- Use a different version of wagmi that's compatible with WalletConnect
- Use WalletConnect v1 (deprecated but might be more stable)
- Implement WalletConnect manually outside of wagmi

## Current Functionality
The app still supports:
- ✅ MetaMask (most popular wallet)
- ✅ Injected wallet connectors (Coinbase Wallet, Brave Wallet, etc.)
- ✅ All DeFi functionality works normally
- ❌ WalletConnect mobile wallet connections (temporarily disabled)

This covers the majority of users and all core functionality remains intact.
