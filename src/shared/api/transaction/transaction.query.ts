import type { TransactionControllerGetByWalletAddressParams } from '@api/data-contracts'
import { useQuery } from '@tanstack/react-query'

import { transactionController } from '../client.config'

export const TRANSACTION_QUERY_KEY = 'transaction'

const KEYS = {
  USER_TRANSACTIONS: () => [TRANSACTION_QUERY_KEY, 'user'],
}

export const useGetTransactionsQuery = (
  query: TransactionControllerGetByWalletAddressParams,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: KEYS.USER_TRANSACTIONS(),
    queryFn: async () => {
      const response =
        await transactionController.transactionControllerGetByWalletAddress(query)
      return response.data
    },
    enabled,
    refetchOnWindowFocus: false,
  })
}
