import { useMemo } from 'react'
import { useAccount, useBalance } from 'wagmi'

import { useHasMounted } from './use-has-mounted.hook'

export const useGetStEthBalance = () => {
  const { address } = useAccount()

  const { data: accountBalance } = useBalance({
    address,
    token: process.env.NEXT_PUBLIC_LIDO_SC_ADDRESS as `0x${string}`,
  })
  const hasMounted = useHasMounted()

  return useMemo(() => {
    if (!accountBalance || !hasMounted) return 0

    return Number(accountBalance.formatted)
  }, [accountBalance, hasMounted])
}
