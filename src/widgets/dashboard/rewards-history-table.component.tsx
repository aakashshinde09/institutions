import { RewardMobileRow, RewardRow } from '@entities/dashboard'
import { useGetCurrentRewardQuery } from '@shared/api'
import { useHasMounted, useScreenWidth, ViewWidth } from '@shared/lib/hooks'
import { useAuthStore } from '@shared/lib/stores'
import { Pagination } from '@shared/ui/pagination'
import { useMemo, useState } from 'react'

const PER_PAGE = 10

export const RewardsHistoryTable = () => {
  const mounted = useHasMounted()
  const screen = useScreenWidth()
  const { isLoggedIn } = useAuthStore()
  const [page, setPage] = useState(1)
  
  const { data: rewardHistory } = useGetCurrentRewardQuery(
    {
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    },
    isLoggedIn,
  )

  const totalPages = useMemo(() => {
    if (!rewardHistory?.data?.totalItems) return 0

    return Math.ceil(rewardHistory.data.totalItems / PER_PAGE)
  }, [rewardHistory?.data?.totalItems])

  const indexCounter = (index: number) => {
    return (page - 1) * PER_PAGE + (index + 1)
  }

  if (!isLoggedIn) {
    return (
      <div className="tableRow flex w-full items-center justify-center">
        Please connect your wallet
      </div>
    )
  }
  
  return (
    <>
      {mounted && screen === ViewWidth.MOBILE ? (
        <div className="space-y-3">
          {rewardHistory?.data?.items?.map((reward, index) => (
            <RewardMobileRow key={reward.id} data={reward} index={indexCounter(index)} />
          ))}
        </div>
      ) : (
        <table className="block w-full">
          <thead className="block w-full">
            <tr className="tableHeader grid grid-cols-[6%_8%_13%_16%_1fr_15%_16%_11%]">
              <th>Number</th>
              <th>Stake Id</th>
              <th>Staked amount</th>
              <th>Your profit</th>
              <th>Social impact</th>
              <th>Donation</th>
              <th>Service fee</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody className="mt-3 block w-full space-y-3">
            {rewardHistory?.data?.items?.map((reward, index) => (
              <RewardRow
                key={reward.id}
                index={indexCounter(index)}
                data={reward}
                className="grid grid-cols-[6%_8%_13%_16%_1fr_15%_16%_11%]"
              />
            ))}
          </tbody>
        </table>
      )}

      {rewardHistory?.data?.items?.length === 0 && (
        <div className="tableRow flex w-full items-center justify-center">
          No rewards yet
        </div>
      )}

      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        className="mt-6 md:justify-end"
      />
    </>
  )
}
