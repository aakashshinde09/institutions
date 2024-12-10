import { useIsConnected, useLogin } from '@shared/lib/hooks'
import type { Meta } from '@shared/meta'
import { useEffect } from 'react'
import { useAccount, useConfig } from 'wagmi'

import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'

export interface IMainPageLayoutProperties extends React.ComponentProps<'main'> {
  Meta: React.ReactElement<typeof Meta>
}

export const MainPageLayout = (props: IMainPageLayoutProperties) => {
  const { Meta, ...rest } = props
  const isConnected = useIsConnected()
  const login = useLogin()
  const { chain } = useAccount()
  const { chains } = useConfig()

  useEffect(() => {
    if (isConnected && chain?.id === chains[0]?.id) {
      login()
    }
  }, [chain?.id, chains, isConnected])

  return (
    <>
      {Meta}
      <Header />
      <Main {...rest} />
      <Footer />
    </>
  )
}
