import { InfoCard } from '@entities/dashboard'
import { useGetAverageAprQuery, useGetUserDepositsInfoQuery } from '@shared/api'
import { useAuthStore } from '@shared/lib/stores'
import { formatNumber } from '@shared/lib/utils'
import { ReportForm } from './report-form.component'
import { UserControllerGetCurrentUserNgoListData } from '@api/data-contracts'

interface IProps {
  userNgos: UserControllerGetCurrentUserNgoListData | undefined
}

export const DonationsInfo: React.FC<IProps> = ({ userNgos }) => {
  const { isLoggedIn } = useAuthStore()
  const { data: averageApr, isFetching: isAverageAprFetching } = useGetAverageAprQuery()
  const { data: depositsInfo, isFetching: isDepositsInfoFetching } =
    useGetUserDepositsInfoQuery(isLoggedIn)

  return (
    <div className="grow">
      <h2 className="h2">Rewards and donations</h2>
      <div className="mt-8 flex flex-wrap gap-6 max-md:mt-6 max-md:justify-between max-md:gap-5">
        <InfoCard
          data={[
            {
              title: 'stETH balance',
              value:
                isLoggedIn && depositsInfo?.data
                  ? `${depositsInfo.data.balance} stETH`
                  : '-',
            },
            {
              title: 'Percentage of staking rewards donated',
              value: isLoggedIn
                ? `${formatNumber(depositsInfo?.data?.averageDonationPercent)} %`
                : '-',
            },
          ]}
          className="w-[60%] max-md:order-4 max-md:w-full"
          showSkeleton={isDepositsInfoFetching}
        />

        <InfoCard
          data={[
            {
              title: 'Beneficiary impact projects',
              value: isLoggedIn ? `${userNgos?.data.length}` : '-',
            },
            {
              title: 'Total donation amount',
              value: isLoggedIn
                ? `${formatNumber(depositsInfo?.data?.totalDonations)} stETH`
                : '-',
            },
          ]}
          className="w-[calc(40%-1.5rem)] max-md:order-3 max-md:w-[47%]"
          showSkeleton={isDepositsInfoFetching}
        />

        <InfoCard
          data={[
            {
              title: 'Lido APR',
              value: `${formatNumber(averageApr?.data?.SmaArp)}%`,
            },
            {
              title: 'stETH Rewarded',
              value: isLoggedIn
                ? `${formatNumber(depositsInfo?.data?.totalRewarded)} stETH`
                : '-',
            },
          ]}
          className="w-[calc(40%-1.5rem)] max-md:order-2 max-md:w-[47%]"
          showSkeleton={isAverageAprFetching || isDepositsInfoFetching}
        />

        <ReportForm className="w-[60%] max-md:order-1 max-md:w-full" />
      </div>
    </div>
  )
}
