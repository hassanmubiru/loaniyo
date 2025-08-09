import { base } from 'viem/chains'
import { createConfig, http } from 'wagmi'
import { injected, metaMask } from 'wagmi/connectors'

const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
  ssr: true, // Enable SSR support
})

export { config }
