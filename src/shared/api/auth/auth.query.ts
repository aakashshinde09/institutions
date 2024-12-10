import type { SignDto } from '@api/data-contracts'
import { setTokens } from '@shared/lib/utils'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'

import { APR_QUERY_KEY } from '../apr'
import { authController } from '../client.config'
import { REWARD_QUERY_KEY } from '../reward'
import { TRANSACTION_QUERY_KEY } from '../transaction'
import { USER_QUERY_KEY } from '../user'

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (data: SignDto) => {
      const response = await authController.authControllerSignUp(data)
      return response.data
    },
  })
}

export const useSignInMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: SignDto) => {
      const response = await authController.authControllerSignIn(data)
      return response.data
    },

    onSuccess: (data) => {
      if (data.data) setTokens(data.data)
      queryClient.invalidateQueries({ queryKey: APR_QUERY_KEY as unknown as QueryKey })
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY as unknown as QueryKey })
      queryClient.invalidateQueries({ queryKey: REWARD_QUERY_KEY as unknown as QueryKey })
      queryClient.invalidateQueries({
        queryKey: TRANSACTION_QUERY_KEY as unknown as QueryKey,
      })
    },
  })
}
