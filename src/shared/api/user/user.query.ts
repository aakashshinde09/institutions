import { useQuery } from '@tanstack/react-query'

import { userController } from '../client.config'

export const USER_QUERY_KEY = 'user'

export const KEYS = {
  DEPOSITS_INFO: () => [USER_QUERY_KEY, 'deposits-info'],
  NGOS: () => [USER_QUERY_KEY, 'ngos'],
  REPORT: () => [USER_QUERY_KEY, 'report'],
}

export const useGetUserDepositsInfoQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: KEYS.DEPOSITS_INFO(),
    queryFn: async () => {
      const response =
        await userController.userControllerGeCurrentUserDepositsInformation()
      return response.data
    },
    enabled,
    refetchOnWindowFocus: false,
  })
}

export const useGetUserNgoQuery = (enabled: boolean, stakesInclude: boolean = false) => {
  return useQuery({
    queryKey: KEYS.NGOS(),
    queryFn: async () => {
      const response = await userController.userControllerGetCurrentUserNgoList({
        stakesInclude,
      })
      return response.data
    },
    enabled,
    refetchOnWindowFocus: false,
  })
}
