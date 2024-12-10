import { useEffect, useLayoutEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

export function useIsConnected() {
  const [isConnected, setIsConnected] = useState(false)
  const { isConnected: connected } = useAccount()

  useIsomorphicLayoutEffect(() => {
    setIsConnected(connected)
  }, [connected])

  return isConnected
}
