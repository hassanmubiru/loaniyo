import { useReadContract } from 'wagmi'
import { CONTRACTS } from './contracts'

// Contract validation utility
export function useContractValidation() {
  // Try to call a basic function to test if contract exists
  const { data: tokenAddress, error: tokenError, isLoading } = useReadContract({
    address: CONTRACTS.LOANIYO_LENDING.address,
    abi: CONTRACTS.LOANIYO_LENDING.abi,
    functionName: 'token',
    query: {
      enabled: !!CONTRACTS.LOANIYO_LENDING.address && CONTRACTS.LOANIYO_LENDING.address !== '0x0000000000000000000000000000000000000000',
    }
  })

  const isValidContract = !!tokenAddress && !tokenError
  const contractExists = !tokenError || !tokenError.message.includes('contract')

  return {
    isValidContract,
    contractExists,
    tokenAddress,
    error: tokenError,
    isLoading,
    contractAddress: CONTRACTS.LOANIYO_LENDING.address
  }
}

// Helper to check if we have a valid contract address
export function hasValidContractAddress(): boolean {
  const address = CONTRACTS.LOANIYO_LENDING.address
  return !!(address && address !== '0x0000000000000000000000000000000000000000' && address !== '0x...')
}

export function getContractInfo() {
  return {
    address: CONTRACTS.LOANIYO_LENDING.address,
    usdcAddress: CONTRACTS.USDC.address,
    hasValidAddress: hasValidContractAddress(),
    network: 'Base Mainnet',
    chainId: 8453
  }
}
