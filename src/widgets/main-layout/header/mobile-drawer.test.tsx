import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MobileDrawer } from './mobile-drawer.component'
import { elementIds } from '@shared/lib/enums'
import { holesky } from 'viem/chains'
import { createConfig, http, WagmiConfig } from 'wagmi'
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors'
import { OKX_WALLET } from '@shared/lib/constants'

const { REWARDS_AND_DONATIONS, WITHDRAW, SOCIAL_IMPACT_MARKETPLACE, IMPACT_STAKING } =
  elementIds

const navigation = [
  { name: 'Impact staking', id: IMPACT_STAKING, href: '/staking?view=stake' },
  { name: 'Withdraw', id: WITHDRAW, href: '/staking?view=withdraw' },
  { name: 'Rewards and donations', id: REWARDS_AND_DONATIONS, href: '/dashboard' },
  {
    name: 'Social impact marketplace',
    id: SOCIAL_IMPACT_MARKETPLACE,
    href: '/social-impact',
  },
]

const config = createConfig({
  chains: [holesky],
  transports: {
    [holesky.id]: http('https://endpoints.omniatech.io/v1/eth/holesky/public'),
  },
  ssr: true,
  connectors: [
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '',
    }),
    coinbaseWallet(),
    injected({
      target() {
        return {
          id: 'okxWallet',
          name: OKX_WALLET,
          provider: typeof window !== 'undefined' ? window.okxwallet : undefined,
        }
      },
    }),
  ],
})

describe('<MobileDrawer/>', () => {
  test('Renders correctly', () => {
    const component = render(
      <WagmiConfig config={config}>
        <MantineProvider>
          <QueryClientProvider client={new QueryClient()}>
            <MobileDrawer navigation={navigation} />
          </QueryClientProvider>
        </MantineProvider>
      </WagmiConfig>,
    )

    expect(component).toMatchSnapshot()
  })
})
