const { ethers } = require('hardhat');

async function deployToBaseSepolia() {
  console.log('🚀 Deploying LoaniyoLending to Base Sepolia...');
  
  try {
    // Check network
    const network = await ethers.provider.getNetwork();
    console.log('Network:', network.name, 'Chain ID:', network.chainId.toString());
    
    if (network.chainId.toString() !== '84532') {
      console.error('❌ Please use Base Sepolia network (chain ID: 84532)');
      return;
    }
    
    // Base Sepolia USDC address
    const USDC_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
    console.log('Using USDC address:', USDC_ADDRESS);
    
    // Get deployer
    const [deployer] = await ethers.getSigners();
    console.log('Deploying from:', deployer.address);
    
    // Check balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log('Balance:', ethers.formatEther(balance), 'ETH');
    
    if (balance === 0n) {
      console.log('❌ No funds! Get testnet ETH from: https://faucet.quicknode.com/base/sepolia');
      console.log('Send to address:', deployer.address);
      return;
    }
    
    // Deploy
    console.log('📦 Deploying contract...');
    const LoaniyoLending = await ethers.getContractFactory('LoaniyoLending');
    const contract = await LoaniyoLending.deploy(USDC_ADDRESS);
    
    console.log('⏳ Waiting for deployment...');
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log('✅ Deployed to:', address);
    
    // Test contract
    try {
      const token = await contract.token();
      const globalData = await contract.getGlobalData();
      console.log('✅ Contract working! Token:', token);
      console.log('✅ Global data:', globalData.toString());
    } catch (e) {
      console.log('⚠️ Contract deployed but test failed:', e.message);
    }
    
    console.log('\n🎉 SUCCESS! Update your environment:');
    console.log(`NEXT_PUBLIC_LOANIYO_ADDRESS=${address}`);
    console.log('\nRun: vercel env add NEXT_PUBLIC_LOANIYO_ADDRESS');
    console.log(`Value: ${address}`);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    if (error.message.includes('insufficient funds')) {
      console.log('\n💡 Get testnet ETH: https://faucet.quicknode.com/base/sepolia');
    }
  }
}

deployToBaseSepolia()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
