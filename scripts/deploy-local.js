const { ethers } = require('hardhat');

async function main() {
  console.log('Deploying MockLoaniyoLending to local hardhat network...');
  
  // Base USDC address (we'll use this for the token parameter)
  const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log('Deploying from account:', deployer.address);
  
  // Deploy the contract
  const MockLoaniyoLending = await ethers.getContractFactory('MockLoaniyoLending');
  const mockContract = await MockLoaniyoLending.deploy(USDC_ADDRESS);
  
  console.log('⏳ Waiting for deployment...');
  await mockContract.waitForDeployment();
  
  const contractAddress = await mockContract.getAddress();
  console.log('✅ MockLoaniyoLending deployed to:', contractAddress);
  
  // Test the contract functions
  console.log('\n🧪 Testing contract functions...');
  
  try {
    const tokenAddress = await mockContract.token();
    console.log('✅ Token address:', tokenAddress);
    
    const globalData = await mockContract.getGlobalData();
    console.log('✅ Global data:', {
      totalSupply: globalData[0].toString(),
      totalBorrow: globalData[1].toString(),
      supplyAPY: globalData[2].toString(),
      borrowAPY: globalData[3].toString(),
      utilizationRate: globalData[4].toString()
    });
    
    const userData = await mockContract.getUserData(deployer.address);
    console.log('✅ User data:', {
      deposited: userData[0].toString(),
      borrowed: userData[1].toString(),
      collateralValue: userData[2].toString(),
      healthFactor: userData[3].toString()
    });
    
    console.log('\n🎉 All contract functions working correctly!');
    
  } catch (error) {
    console.error('❌ Contract testing failed:', error.message);
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Update Vercel environment variable:');
  console.log(`   NEXT_PUBLIC_LOANIYO_ADDRESS=${contractAddress}`);
  console.log('2. This is a LOCAL deployment for testing - the app will work locally');
  console.log('3. For production, you need to deploy to Base mainnet with proper funding');
  
  return contractAddress;
}

main()
  .then((address) => {
    console.log('\n✅ Local deployment complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Deployment failed:', error);
    process.exit(1);
  });
