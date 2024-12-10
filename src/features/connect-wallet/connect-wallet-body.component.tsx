import { Checkbox, UnstyledButton } from '@mantine/core'
import { addHoleskyNetwork } from '@shared/lib/blockchain/addNetwork'
import { METAMASK, OKX_WALLET } from '@shared/lib/constants'
import { AuthStatusEnum } from '@shared/lib/enums'
import { useAuthStore } from '@shared/lib/stores'
import { wallets } from '@shared/lib/types'
import { cn, formatName } from '@shared/lib/utils'
import { IconComponent } from '@shared/ui/icon'
import Link from 'next/link'
import { useState } from 'react'
import { Connector, useChainId, useConnect } from 'wagmi'

interface IConnectWalletBody {
  close: () => void
}

export const ConnectWalletBody = ({ close }: IConnectWalletBody) => {
  const { connectors, connect, isPending } = useConnect()
  const [isAgree, setIsAgree] = useState(false)
  const { authStatus } = useAuthStore()
  const chain = useChainId()
  const onConnectClick = async (connector: Connector) => {
    if (window.okxwallet === undefined && connector.name === OKX_WALLET) {
      window.open('https://www.okx.com/download', '_blank')
    } else {
      if (connector.name === METAMASK && (await connector.getChainId()) !== chain) {
        addHoleskyNetwork()
      }
      connect({ connector }, {})
    }
  }

  const isReady = authStatus === AuthStatusEnum.PENDING || !isAgree || isPending

  const okxCondition = (name: string) =>
    name !== OKX_WALLET || authStatus === AuthStatusEnum.PENDING || !isAgree || isPending

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl uppercase text-white">connect wallet</h3>
        <UnstyledButton
          onClick={close}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-white"
        >
          <IconComponent name="cross" viewBox="0 0 8 8" className="h-2 w-2" />
        </UnstyledButton>
      </div>

      <p className="mt-4 text-base max-md:text-sm">
        Web3 wallet connection. Select your wallet and approve connection in extension
      </p>

      <div className="mt-8">
        <h4 className="text-xl font-bold">Available wallets</h4>

        <div className="mt-6 grid grid-rows-1 gap-4">
          {connectors.map((connector) => (
            <UnstyledButton
              id={connector.name}
              key={connector.id}
              onClick={() => onConnectClick(connector)}
              className={cn(
                'flex items-center space-x-3',
                isReady &&
                  okxCondition(connector.name) &&
                  'opacity-50 cursor-not-allowed',
              )}
              disabled={isReady && okxCondition(connector.name)}
            >
              <IconComponent
                name={formatName(connector.name) as wallets}
                viewBox="0 0 32 32"
                className="h-8 w-8"
              />
              <span className="text-base font-bold text-white">{connector.name}</span>
            </UnstyledButton>
          ))}
        </div>

        <Checkbox
          id="termsAgreement"
          checked={isAgree}
          onChange={(event) => setIsAgree(event.currentTarget.checked)}
          label={
            <>
              I agree to{' '}
              <Link
                href="/terms-of-service"
                target="_blank"
                className="font-semibold text-white no-underline"
              >
                terms of service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="font-semibold text-white no-underline"
              >
                privacy policy
              </Link>
            </>
          }
          classNames={{
            root: 'mt-6',
            label: 'text-sm text-white font-light pl-2',
            input: 'text-white rounded-full bg-transparent border border-white',
            icon: 'h-3 w-3 rounded-full bg-white',
          }}
        />
      </div>
    </>
  )
}
