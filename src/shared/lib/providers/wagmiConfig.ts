import { holesky } from 'viem/chains'
import { createConfig, fallback, http } from 'wagmi'

import { metaMask, walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

import { OKX_WALLET, rpcsList } from '@shared/lib/constants'

export const wagmiConfig = createConfig({
  chains: [holesky],
  transports: {
    [holesky.id]: fallback(rpcsList.map((i) => http(i))),
  },
  multiInjectedProviderDiscovery: false,
  ssr: true,

  connectors: [
    metaMask({ extensionOnly: true }),

    injected({
      target: {
        id: 'okxWallet',
        name: OKX_WALLET,
        provider: typeof window !== 'undefined' ? window.okxwallet : undefined,
      },
    }),

    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '',
    }),

    coinbaseWallet(),
  ],
})
