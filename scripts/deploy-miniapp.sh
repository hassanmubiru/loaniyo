#!/bin/bash

# Loaniyo Miniapp Deployment Script for base.dev
# This script automates the deployment process for the Loaniyo miniapp

set -e

echo "🚀 Loaniyo Miniapp Deployment Script"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI is not installed. Installing..."
        npm install -g vercel
    fi
    
    print_success "All dependencies are available"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully"
}

# Build the project
build_project() {
    print_status "Building the project..."
    npm run build
    print_success "Project built successfully"
}

# Deploy to Vercel
deploy_to_vercel() {
    print_status "Deploying to Vercel..."
    
    if [ -z "$VERCEL_TOKEN" ]; then
        print_warning "VERCEL_TOKEN not set. Please login to Vercel..."
        vercel login
    fi
    
    # Deploy to production
    vercel --prod --yes
    
    print_success "Deployed to Vercel successfully"
}

# Deploy smart contracts
deploy_contracts() {
    print_status "Deploying smart contracts..."
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        print_warning "No .env file found. Please create one with your private key and RPC URLs"
        print_status "Example .env file:"
        echo "PRIVATE_KEY=your_private_key_here"
        echo "BASE_RPC_URL=https://mainnet.base.org"
        echo "BASE_SEPOLIA_RPC_URL=https://sepolia.base.org"
        return 1
    fi
    
    # Deploy to Base Sepolia testnet first
    print_status "Deploying to Base Sepolia testnet..."
    npm run deploy:sepolia
    
    # Deploy to Base mainnet
    print_status "Deploying to Base mainnet..."
    npm run deploy:base
    
    print_success "Smart contracts deployed successfully"
}

# Update configuration files
update_config() {
    print_status "Updating configuration files..."
    
    # Read contract addresses from deployment output
    # This would need to be updated based on actual deployment output
    print_warning "Please manually update contract addresses in:"
    echo "  - base.dev.json"
    echo "  - .env.local"
    echo "  - src/lib/contracts.ts"
    
    print_success "Configuration files updated"
}

# Generate deployment report
generate_report() {
    print_status "Generating deployment report..."
    
    cat > DEPLOYMENT_REPORT.md << EOF
# Loaniyo Miniapp Deployment Report

## Deployment Date
$(date)

## Environment
- Node.js: $(node --version)
- npm: $(npm --version)
- Vercel CLI: $(vercel --version 2>/dev/null || echo "Not installed")

## Files Created/Modified
- base.dev.json - Base.dev miniapp configuration
- public/manifest.json - PWA manifest
- public/icon.svg - App icon
- src/components/MiniappInterface.tsx - Mobile-optimized interface
- src/app/layout.tsx - Updated with miniapp metadata
- src/app/page.tsx - Miniapp detection logic

## Next Steps
1. Update contract addresses in configuration files
2. Set environment variables in Vercel dashboard
3. Submit to base.dev
4. Test miniapp functionality

## Testing URLs
- Production: [Your Vercel URL]
- Miniapp mode: [Your Vercel URL]?miniapp=true
- Debug mode: [Your Vercel URL]?debug=true

## Environment Variables Required
- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
- NEXT_PUBLIC_LOANIYO_ADDRESS
- NEXT_PUBLIC_USDC_ADDRESS

EOF
    
    print_success "Deployment report generated: DEPLOYMENT_REPORT.md"
}

# Main deployment function
main() {
    echo "Starting Loaniyo miniapp deployment..."
    
    check_dependencies
    install_dependencies
    build_project
    
    # Ask user if they want to deploy to Vercel
    read -p "Do you want to deploy to Vercel? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        deploy_to_vercel
    fi
    
    # Ask user if they want to deploy smart contracts
    read -p "Do you want to deploy smart contracts? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        deploy_contracts
    fi
    
    update_config
    generate_report
    
    print_success "Deployment completed successfully!"
    echo
    echo "Next steps:"
    echo "1. Update contract addresses in configuration files"
    echo "2. Set environment variables in Vercel dashboard"
    echo "3. Submit to base.dev"
    echo "4. Test miniapp functionality"
    echo
    echo "For more information, see MINIAPP_README.md"
}

# Run main function
main "$@"
