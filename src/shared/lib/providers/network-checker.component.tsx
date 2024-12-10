import { type ReactElement, useEffect } from 'react'
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi'

import { useIsConnected, useLogout } from '../hooks'

interface INetworkCheckerProperties {
  children?: ReactElement
}

declare global {
  interface Window {
    ethereum?: any
    okxwallet?: any
  }
}

export const NetworkChecker = ({ children }: INetworkCheckerProperties) => {
  const isConnected = useIsConnected()
  const { chain } = useAccount()
  const { chains, switchChain, error } = useSwitchChain()
  const { disconnect } = useDisconnect()
  const doLogout = useLogout()

  const addNewNetwork = async () => {
    const newNetwork = chains[0]!

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${newNetwork.id.toString(16)}`,
            chainName: newNetwork.name,
            rpcUrls: [newNetwork.rpcUrls.default.http],
            nativeCurrency: {
              name: newNetwork.nativeCurrency.name,
              symbol: newNetwork.nativeCurrency.symbol,
              decimals: newNetwork.nativeCurrency.decimals,
            },
          },
        ],
      })
    } catch (error_) {
      console.log(error_)
    }
  }

  // Switch to the first supported chain if the current chain is unsupported
  useEffect(() => {
    if (isConnected) {
      // toast.error(
      //   `Unsupported network detected. Please check that you have ${chains[0]?.name} network in your crypto wallet.`,
      // )
      switchChain({ chainId: chains[0]!.id })
    }
  }, [isConnected, chain, switchChain, chains])

  // Add the new network if the user doesn't have it
  useEffect(() => {
    if (error?.name === 'ChainNotConfiguredError') {
      addNewNetwork()
    }
  }, [error])

  // Disconnect if the user changes their account
  useEffect(() => {
    if (!window.ethereum) {
      return
    }

    const onDisconnect = () => {
      if (isConnected) {
        doLogout()
        disconnect()
        window.location.reload()
      }
    }

    window.ethereum.on('accountsChanged', onDisconnect)

    return () => {
      window.ethereum.removeListener('accountsChanged', onDisconnect)
    }
  }, [disconnect, isConnected])

  return children ?? null
}
