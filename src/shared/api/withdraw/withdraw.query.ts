import type {
  WithdrawControllerGetByWalletAddressParams,
  withdrawControllerGetWithdrawStEth,
} from '@api/data-contracts'
// eslint-disable-next-line import/extensions, boundaries/entry-point
import { useQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'

import { withdrawController } from '../client.config'

export const WITHDRAW_QUERY_KEY = 'withdraw'

const KEYS = {
  REQUESTS: (query: WithdrawControllerGetByWalletAddressParams) => [
    WITHDRAW_QUERY_KEY,
    'requests',
    query,
  ],
  FINALIZED_REQUESTS: (ids: string[]) => [WITHDRAW_QUERY_KEY, 'finalizedRequests', ids],
  REQUESTS_ST_ETH: () => [WITHDRAW_QUERY_KEY, 'st_eth'],
}

export const useGetWithdrawRequestsQuery = (
  query: WithdrawControllerGetByWalletAddressParams,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: KEYS.REQUESTS(query),
    queryFn: async () => {
      const response =
        await withdrawController.withdrawControllerGetByWalletAddress(query)
      return response.data
    },

    enabled,
    refetchOnWindowFocus: false,
  })
}

export const useGetWithdrawStEthQuery = (
  query: withdrawControllerGetWithdrawStEth,
  enabled: boolean,
) => {
  
  return useQuery({
    queryKey: KEYS.REQUESTS_ST_ETH(),
    queryFn: async () => {
      const response = await withdrawController.withdrawControllerGetWithdrawStEth(query)
      return response.data
    },

    enabled,
    refetchOnWindowFocus: false,
  })
}

// For mainnet
interface WithdrawalFinalized {
  withdrawalsFinalized: boolean | null
}
export const useGetFinalizedWithdrawRequestQuery = (
  requestIds: string[],
  enabled: boolean,
) => {
  const getStatusByIdQuery = gql`
    query MyQuery($id: String!) {
      withdrawalsFinalized(id: $id) {
        id
      }
    }
  `

  const loadFinalizedRequests = () => {
    if (requestIds.length === 0 || !enabled) {
      return null
    }

    const allRequests = requestIds.map(async (id) => {
      const variables = {
        id: Number(id).toString(16),
      }
      const headers = {}

      try {
        const res = await request<WithdrawalFinalized>(
          process.env.NEXT_PUBLIC_LIDO_GRAPHQL_ENDPOINT ?? '',
          getStatusByIdQuery,
          variables,
          headers,
        )
        return { id, ...res }
      } catch (error) {
        console.log(error)
        return null
      }
    })

    return Promise.all(allRequests)
  }

  return useQuery({
    queryKey: KEYS.FINALIZED_REQUESTS(requestIds),
    queryFn: loadFinalizedRequests,
    enabled,
    refetchOnWindowFocus: false,
  })
}
