# Netlify Deployment Guide for Loaniyo

## Prerequisites
- A Netlify account
- Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18+ installed locally for testing

## Required Environment Variables

Before deploying, you'll need to set these environment variables in Netlify:

### Required:
- `NEXT_PUBLIC_LOANIYO_ADDRESS` - The deployed smart contract address on Base Sepolia

### Optional (for enhanced functionality):
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID (if you want to add WalletConnect support)

## Deployment Steps

### 1. Build and Test Locally
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test the build locally
npm start
```

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify UI (Recommended for first deployment)

1. **Connect your Git repository:**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "New site from Git"
   - Choose your Git provider and select your repository
   - Select the branch you want to deploy (usually `main` or `master`)

2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Set environment variables:**
   - Go to Site settings > Environment variables
   - Add `NEXT_PUBLIC_LOANIYO_ADDRESS` with your deployed contract address
   - Add any other environment variables you need

4. **Deploy:**
   - Click "Deploy site"
   - Wait for the build to complete

#### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize and deploy:**
   ```bash
   # Initialize Netlify (if not already done)
   netlify init
   
   # Deploy
   netlify deploy --prod
   ```

### 3. Configure Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify

## Post-Deployment

### 1. Verify Deployment
- Check that your site loads correctly
- Test wallet connections
- Verify smart contract interactions

### 2. Monitor Performance
- Use Netlify Analytics to monitor site performance
- Check build logs for any issues
- Monitor environment variable usage

### 3. Update Contract Address
If you deploy a new smart contract, update the `NEXT_PUBLIC_LOANIYO_ADDRESS` environment variable in Netlify and redeploy.

## Troubleshooting

### Common Issues:

1. **Build fails with Node version error:**
   - Ensure Node.js 18+ is specified in build environment
   - Check `netlify.toml` configuration

2. **Environment variables not working:**
   - Verify variables are set in Netlify dashboard
   - Ensure variable names start with `NEXT_PUBLIC_` for client-side access
   - Redeploy after adding variables

3. **Static assets not loading:**
   - Check that publish directory is set to `.next`
   - Verify redirects in `netlify.toml`

4. **Wallet connection issues:**
   - Ensure you're on Base Sepolia testnet
   - Check that contract address is correct
   - Verify RPC endpoint is accessible

### Support:
- Check Netlify build logs for detailed error messages
- Review Next.js deployment documentation
- Check Base Sepolia network status

## Security Notes

- Never commit private keys or sensitive environment variables
- Use environment variables for all configuration
- Regularly update dependencies
- Monitor for security vulnerabilities

## Performance Optimization

- Enable Netlify's CDN for global distribution
- Use image optimization features
- Enable compression and caching headers
- Monitor Core Web Vitals
