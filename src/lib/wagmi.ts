import { baseSepolia } from 'viem/chains'
import { createConfig, http } from 'wagmi'
import { injected, metaMask } from 'wagmi/connectors'

const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
  ssr: true, // Enable SSR support
})

export { config }
