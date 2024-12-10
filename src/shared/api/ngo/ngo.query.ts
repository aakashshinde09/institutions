import { useQuery } from '@tanstack/react-query'

import { ngoController } from '../client.config'

export const NGO_QUERY_KEY = 'ngo'

const KEYS = {
  NGO_LIST: () => [NGO_QUERY_KEY, 'list'],
}

export const useGetNgoListQuery = () => {
  return useQuery({
    queryKey: KEYS.NGO_LIST(),
    queryFn: async () => {
      const response = await ngoController.ngoControllerGetAll({
        skip: 0,
        take: 100,
      })
      return response.data
    },
    refetchOnWindowFocus: false,
  })
}
