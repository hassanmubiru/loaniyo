/**
 * Validates if a WalletConnect project ID is properly configured
 */
export function isValidWalletConnectProjectId(projectId: string | undefined): boolean {
  if (!projectId) return false
  if (projectId === 'demo_project_id_placeholder') return false
  if (projectId.length < 10) return false
  return true
}

/**
 * Gets a user-friendly error message for WalletConnect issues
 */
export function getWalletConnectErrorMessage(error: Error): string {
  const message = error.message.toLowerCase()
  
  if (message.includes('connection interrupted')) {
    return 'WalletConnect connection was interrupted. Please try connecting again.'
  }
  
  if (message.includes('project id')) {
    return 'WalletConnect is not properly configured. Please set a valid NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID.'
  }
  
  if (message.includes('user rejected')) {
    return 'Connection was cancelled by user.'
  }
  
  if (message.includes('timeout')) {
    return 'Connection timed out. Please try again.'
  }
  
  return error.message || 'Failed to connect wallet'
}
