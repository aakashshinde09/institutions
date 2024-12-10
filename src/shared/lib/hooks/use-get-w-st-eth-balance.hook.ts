import { useMemo } from 'react'
import { useAccount, useBalance } from 'wagmi'

import { useHasMounted } from './use-has-mounted.hook'

export const useGetWStEthBalance = () => {
  const { address } = useAccount()

  const { data: accountBalance } = useBalance({
    address,
    token: '0x8d09a4502cc8cf1547ad300e066060d043f6982d',
  })
  const hasMounted = useHasMounted()

  return useMemo(() => {
    if (!accountBalance || !hasMounted) return 0

    return Number(accountBalance.formatted)
  }, [accountBalance, hasMounted])
}
