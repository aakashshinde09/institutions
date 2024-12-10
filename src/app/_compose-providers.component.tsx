import { MantineProvider } from '@mantine/core'
import { NetworkChecker } from '@shared/lib/providers'
import { wagmiConfig } from '@shared/lib/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactElement, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { WagmiProvider } from 'wagmi'

interface IComposeProvidersProperties {
  children?: ReactElement
}


export const ComposeProviders = ({ children }: IComposeProvidersProperties) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <MantineProvider>
            <NetworkChecker>{children}</NetworkChecker>
          </MantineProvider>
        </WagmiProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}
