const { ethers } = require('hardhat');

async function main() {
  console.log('🚀 Base Mainnet Deployment Guide');
  console.log('================================');
  
  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log('Network:', network.name, 'Chain ID:', network.chainId);
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log('Deployer account:', deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Balance:', ethers.formatEther(balance), 'ETH');
  
  if (balance === 0n) {
    console.log('\n❌ ACCOUNT NEEDS FUNDING');
    console.log('========================');
    console.log('The deployer account needs ETH to pay for gas fees.');
    console.log('Account to fund:', deployer.address);
    console.log('Network: Base Mainnet');
    console.log('Minimum required: ~0.005 ETH (for gas fees)');
    console.log('\n📋 Steps to fund account:');
    console.log('1. Send ETH to:', deployer.address);
    console.log('2. Use Base bridge: https://bridge.base.org/');
    console.log('3. Or send ETH directly from Coinbase/other exchanges');
    console.log('4. Re-run this deployment script after funding');
    
    return;
  }
  
  console.log('\n✅ Account has sufficient funds! Proceeding with deployment...');
  
  // Base USDC address
  const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  console.log('Using USDC address:', USDC_ADDRESS);
  
  console.log('\n📦 Deploying LoaniyoLending contract...');
  
  try {
    const LoaniyoLending = await ethers.getContractFactory('LoaniyoLending');
    
    // Deploy with gas estimation
    const deploymentTx = await LoaniyoLending.getDeployTransaction(USDC_ADDRESS);
    const gasEstimate = await ethers.provider.estimateGas(deploymentTx);
    console.log('Estimated gas:', gasEstimate.toString());
    
    const loaniyoLending = await LoaniyoLending.deploy(USDC_ADDRESS, {
      gasLimit: gasEstimate * 120n / 100n, // Add 20% buffer
    });
    
    console.log('⏳ Waiting for deployment to be mined...');
    await loaniyoLending.waitForDeployment();
    
    const contractAddress = await loaniyoLending.getAddress();
    console.log('\n🎉 SUCCESS! Contract deployed to:', contractAddress);
    
    // Test the contract
    console.log('\n🧪 Testing contract functions...');
    const tokenAddress = await loaniyoLending.token();
    console.log('✅ Token address:', tokenAddress);
    
    const globalData = await loaniyoLending.getGlobalData();
    console.log('✅ Global data accessible');
    
    console.log('\n📋 Next Steps:');
    console.log('==============');
    console.log('1. Update your environment variables:');
    console.log(`   NEXT_PUBLIC_LOANIYO_ADDRESS=${contractAddress}`);
    console.log('\n2. Update Vercel environment:');
    console.log(`   vercel env add NEXT_PUBLIC_LOANIYO_ADDRESS`);
    console.log(`   Value: ${contractAddress}`);
    console.log('\n3. Deploy frontend:');
    console.log('   vercel --prod');
    console.log('\n4. Verify contract on Basescan:');
    console.log(`   npx hardhat verify --network base ${contractAddress} ${USDC_ADDRESS}`);
    console.log(`   View on Basescan: https://basescan.org/address/${contractAddress}`);
    
    // Update local .env.local file
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(__dirname, '..', '.env.local');
    
    try {
      let envContent = fs.readFileSync(envPath, 'utf8');
      envContent = envContent.replace(
        /NEXT_PUBLIC_LOANIYO_ADDRESS=.*/,
        `NEXT_PUBLIC_LOANIYO_ADDRESS=${contractAddress}`
      );
      fs.writeFileSync(envPath, envContent);
      console.log('\n✅ Updated .env.local file with new contract address');
    } catch (error) {
      console.log('\n⚠️ Could not update .env.local automatically');
    }
    
  } catch (deployError) {
    console.error('\n❌ Deployment failed:', deployError.message);
    
    if (deployError.message.includes('insufficient funds')) {
      console.log('\n💡 Solution: Add more ETH to your deployer account');
      console.log('   Account:', deployer.address);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
