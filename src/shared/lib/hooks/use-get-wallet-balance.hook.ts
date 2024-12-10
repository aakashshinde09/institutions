import { useMemo } from 'react'
import { useAccount, useBalance } from 'wagmi'

import { useHasMounted } from './use-has-mounted.hook'

export const useGetWalletBalance = () => {
  const { address } = useAccount()
  const { data: accountBalance } = useBalance({ address })
  const hasMounted = useHasMounted()

  return useMemo(() => {
    if (!accountBalance || !hasMounted) return 0

    return Number(accountBalance.formatted)
  }, [accountBalance, hasMounted])
}
