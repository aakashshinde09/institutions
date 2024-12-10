import { Loader, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useScreenWidth, ViewWidth } from '@shared/lib/hooks'
import { useAuthStore, useMobileDrawerStore } from '@shared/lib/stores'
import { cn, formatNumber, shortenWallet } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'
import { useEffect } from 'react'
import { useAccount, useBalance } from 'wagmi'

import { ConnectWalletBody } from './connect-wallet-body.component'
import { ConnectWalletLogout } from './connect-wallet-logout.component'
import { elementIds } from '@shared/lib/enums'

interface IConnectWalletButtonProperties {
  className?: string
}

export const ConnectWalletButton = ({ className }: IConnectWalletButtonProperties) => {
  const { address } = useAccount()

  const { data, isLoading } = useBalance({ address })

  const { isLoggedIn } = useAuthStore()
  const [opened, { open, close }] = useDisclosure(false)
  const screen = useScreenWidth()
  const {
    open: openMobileDrawer,
    close: closeMobileDrawer,
    setView,
  } = useMobileDrawerStore()

  const handleOpenButton = () => {
    if (screen === ViewWidth.DESKTOP) {
      open()
    } else {
      setView('wallet')
      openMobileDrawer()
    }
  }

  // Close modal when user connects/disconnects wallet
  useEffect(() => {
    if (screen === ViewWidth.DESKTOP) {
      close()
    } else {
      closeMobileDrawer()
    }
  }, [close, closeMobileDrawer, isLoggedIn, screen])

  return (
    <>
      <div className={cn('flex items-center md:rounded-sl md:bg-primary/20', className)}>
        {isLoggedIn && (
          <div className="flex items-center justify-center pl-12 pr-6 text-base font-semibold text-primary max-md:hidden">
            {isLoading ? (
                <Loader size={25} color="#4834ff" />
            ) : (
              `${formatNumber(data?.formatted)} ETH`
            )}
          </div>
        )}
        <Button
          type="button"
          onClick={handleOpenButton}
          id={isLoggedIn && address ? elementIds.ADDRESS_BTN : elementIds.CONNECT_WALLET}
        >
          {isLoggedIn && address ? shortenWallet(address) : 'Connect wallet'}
        </Button>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        classNames={{ content: 'bg-primary rounded-3xl', body: 'p-6 text-white' }}
      >
        {isLoggedIn ? (
          <ConnectWalletLogout close={close} />
        ) : (
          <ConnectWalletBody close={close} />
        )}
      </Modal>
    </>
  )
}
