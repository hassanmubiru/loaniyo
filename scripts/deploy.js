const { ethers } = require('hardhat');

async function main() {
  console.log('Starting deployment...');
  
  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log('Deploying to network:', network.name, 'Chain ID:', network.chainId);
  
  // USDC addresses for different networks
  const USDC_ADDRESSES = {
    8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base mainnet
    84532: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // Base Sepolia
    1337: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Local hardhat (use mainnet address)
  };
  
  const USDC_ADDRESS = USDC_ADDRESSES[network.chainId] || USDC_ADDRESSES[8453];
  console.log('Using USDC address:', USDC_ADDRESS);
  
  // Get deployer account
  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    console.error('❌ No accounts available! Please check your private key in .env.local');
    return;
  }
  
  const deployer = signers[0];
  console.log('Deploying from account:', deployer.address);
  
  // Check deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Deployer balance:', ethers.formatEther(balance), 'ETH');
  
  if (balance === 0n) {
    console.error('❌ Deployer account has no funds!');
    console.log('Please fund the account:', deployer.address);
    return;
  }
  
  console.log('📦 Deploying LoaniyoLending contract...');
  
  try {
    const LoaniyoLending = await ethers.getContractFactory('LoaniyoLending');
    const loaniyoLending = await LoaniyoLending.deploy(USDC_ADDRESS);
    
    console.log('⏳ Waiting for deployment to be mined...');
    await loaniyoLending.waitForDeployment();
    
    const contractAddress = await loaniyoLending.getAddress();
    console.log('✅ LoaniyoLending deployed to:', contractAddress);
    console.log('🪙 USDC address:', USDC_ADDRESS);
    
    // Test the contract
    console.log('🧪 Testing contract functions...');
    try {
      const tokenAddress = await loaniyoLending.token();
      console.log('✅ Contract token address:', tokenAddress);
      
      const globalData = await loaniyoLending.getGlobalData();
      console.log('✅ Global data readable:', globalData.toString());
      
      console.log('🎉 Contract deployment and testing successful!');
      
    } catch (testError) {
      console.error('⚠️ Contract deployed but testing failed:', testError.message);
    }
    
    // Instructions
    console.log('\n📋 Next Steps:');
    console.log('1. Update your .env.local file:');
    console.log(`   NEXT_PUBLIC_LOANIYO_ADDRESS=${contractAddress}`);
    console.log('\n2. Update Vercel environment variables:');
    console.log(`   vercel env add NEXT_PUBLIC_LOANIYO_ADDRESS`);
    console.log(`   Value: ${contractAddress}`);
    
    if (network.chainId === 8453) {
      console.log('\n3. Verify on Basescan:');
      console.log(`   npx hardhat verify --network base ${contractAddress} ${USDC_ADDRESS}`);
      console.log(`   View on Basescan: https://basescan.org/address/${contractAddress}`);
    } else if (network.chainId === 84532) {
      console.log('\n3. Verify on Base Sepolia:');
      console.log(`   npx hardhat verify --network base-sepolia ${contractAddress} ${USDC_ADDRESS}`);
      console.log(`   View on Sepolia Basescan: https://sepolia.basescan.org/address/${contractAddress}`);
    }
    
  } catch (deployError) {
    console.error('❌ Deployment failed:', deployError.message);
    
    if (deployError.message.includes('insufficient funds')) {
      console.log('\n💡 Solution: Add more ETH to your deployer account');
      console.log('   Account:', deployer.address);
    } else if (deployError.message.includes('private key')) {
      console.log('\n💡 Solution: Set your private key in .env.local');
      console.log('   PRIVATE_KEY=your_actual_private_key_here');
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
