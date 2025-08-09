const { ethers } = require('hardhat');

async function main() {
  // Base USDC address
  const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  
  console.log('Deploying LoaniyoLending contract...');
  
  const LoaniyoLending = await ethers.getContractFactory('LoaniyoLending');
  const loaniyoLending = await LoaniyoLending.deploy(USDC_ADDRESS);
  
  await loaniyoLending.deployed();
  
  console.log('LoaniyoLending deployed to:', loaniyoLending.address);
  console.log('USDC address:', USDC_ADDRESS);
  
  // Verify contract on Basescan (optional)
  console.log('\nTo verify on Basescan, run:');
  console.log(`npx hardhat verify --network base ${loaniyoLending.address} ${USDC_ADDRESS}`);
  
  // Update environment variables
  console.log('\nUpdate your .env.local file with:');
  console.log(`NEXT_PUBLIC_LOANIYO_ADDRESS=${loaniyoLending.address}`);
  console.log(`NEXT_PUBLIC_USDC_ADDRESS=${USDC_ADDRESS}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
