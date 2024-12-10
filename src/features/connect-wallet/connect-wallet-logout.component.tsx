import { UnstyledButton } from '@mantine/core'
import { useLogout } from '@shared/lib/hooks'
import { wallets } from '@shared/lib/types'
import { formatName, formatNumber, scannerLink, shortenWallet } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'
import { CopyButton } from '@shared/ui/copy-button'
import { IconComponent } from '@shared/ui/icon'
import { useAccount } from 'wagmi'

interface IConnectWalletLogoutProperties {
  close: () => void
  balance?: number
}

export const ConnectWalletLogout = ({
  close,
  balance,
}: IConnectWalletLogoutProperties) => {
  const { address, connector, isConnected } = useAccount()
  const doLogout = useLogout()

  const logout = () => {
    doLogout()
    close()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <IconComponent
              name={formatName(connector?.name || '') as wallets}
              viewBox="0 0 32 32"
              className="h-8 w-8"
            />
            <div>
              <h3 className="text-2xl font-bold">{address && shortenWallet(address)}</h3>
              <p className="mt-1 text-base font-semibold md:hidden">
                {formatNumber(balance)} ETH
              </p>
            </div>
            <CopyButton
              value={address}
              className="text-white max-md:mt-1 max-md:self-start"
            />
            <a
              href={scannerLink('address', address)}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center transition hover:scale-105 active:scale-95 max-md:self-start"
            >
              <IconComponent name="wallet" viewBox="0 0 24 24" className="text-white" />
            </a>
          </div>
        ) : (
          <span>Please connect your wallet</span>
        )}

        <UnstyledButton
          onClick={close}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-white"
        >
          <IconComponent name="cross" viewBox="0 0 8 8" className="h-2 w-2" />
        </UnstyledButton>
      </div>

      <p className="text-base max-md:text-sm">
        Don&apos;t worry, even if you disable your wallet, staking will not stop and you
        will continue to support charitable organizations
      </p>

      <Button variant="secondary" onClick={logout}>
        Log out
      </Button>
    </div>
  )
}
