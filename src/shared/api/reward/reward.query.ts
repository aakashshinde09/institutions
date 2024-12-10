import type { RewardControllerGetCurrentUserRewardsParams } from '@api/data-contracts'
import { useQuery } from '@tanstack/react-query'

import { rewardController } from '../client.config'

export const REWARD_QUERY_KEY = 'reward'

const KEYS = {
  CURRENT_REWARD: (skip: number, take: number) => [
    REWARD_QUERY_KEY,
    'current',
    skip,
    take,
  ],
}

export const useGetCurrentRewardQuery = (
  _query: RewardControllerGetCurrentUserRewardsParams,
  enabled: boolean,
) => {
  const { skip, take } = _query
  return useQuery({
    queryKey: KEYS.CURRENT_REWARD(skip, take),
    queryFn: async () => {
      const response =
        await rewardController.rewardControllerGetCurrentUserRewards(_query)
      return response.data
    },
    enabled,
    refetchOnWindowFocus: false,
  })
}
