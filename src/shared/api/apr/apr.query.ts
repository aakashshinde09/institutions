import { useQuery } from '@tanstack/react-query'

import { aprController } from '../client.config'

export const APR_QUERY_KEY = 'apr'

const KEYS = {
  APR_AVERAGE: () => [APR_QUERY_KEY, 'average'],
}

export const useGetAverageAprQuery = () => {
  return useQuery({
    queryKey: KEYS.APR_AVERAGE(),
    queryFn: async () => {
      const response = await aprController.aprControllerGetAverageApr()
      return response.data
    },

    refetchOnWindowFocus: false,
  })
}
