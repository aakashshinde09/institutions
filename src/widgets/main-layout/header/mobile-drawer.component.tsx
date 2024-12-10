import { ConnectWalletBody, ConnectWalletLogout } from '@features/connect-wallet'
import { Drawer } from '@mantine/core'
import { useAuthStore, useMobileDrawerStore } from '@shared/lib/stores'
import { shortenWallet } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'
import { IconComponent } from '@shared/ui/icon'
import Link from 'next/link'
import { useAccount, useBalance } from 'wagmi'

interface IMobileDrawerProperties {
  navigation: { name: string; href: string }[]
}

export const MobileDrawer = ({ navigation }: IMobileDrawerProperties) => {
  const { address } = useAccount()
  const { isLoggedIn } = useAuthStore()
  const { isOpen, close, view, setView } = useMobileDrawerStore()
  const { data } = useBalance({ address, })

  const handleClose = () => {
    close()
    setView('nav')
  }

  return (
    <Drawer
      opened={isOpen}
      onClose={handleClose}
      withCloseButton={false}
      position="top"
      classNames={{
        content: 'h-auto bg-primary rounded-b-3xl',
        body: 'text-white p-4',
      }}
    >
      {view === 'wallet' &&
        (address ? (
          <ConnectWalletLogout
            close={() => setView('nav')}
            balance={isLoggedIn && data?.formatted ? Number(data?.formatted) : 0}
          />
        ) : (
          <ConnectWalletBody close={() => setView('nav')} />
        ))}

      {view === 'nav' && (
        <>
          <div className="flex items-center justify-between">
            <IconComponent
              name="logo"
              viewBox="0 0 44 44"
              className="h-11 w-11 text-white"
            />
            <div className="flex items-center gap-1 rounded-sl bg-white/50 p-1">
              <Button variant="secondary" onClick={() => setView('wallet')}>
                {address ? shortenWallet(address) : 'Connect wallet'}
              </Button>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border-none bg-transparent"
                onClick={close}
              >
                <IconComponent
                  name="closeCircle"
                  viewBox="0 0 42 42"
                  className="h-10 w-10"
                />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-end gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-bold text-white no-underline"
                onClick={close}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </Drawer>
  )
}
