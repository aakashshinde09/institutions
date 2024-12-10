import type { RewardLookup } from '@api/data-contracts'
import { useGetNgoListQuery } from '@shared/api'
import { formatDate, formatNumber } from '@shared/lib/utils'
import { CaptionItem } from '@shared/ui/caption-item'
import { useMemo } from 'react'

interface IRewardMobileRowProperties {
  data: RewardLookup
  index: number
}

export const RewardMobileRow = ({ data, index }: IRewardMobileRowProperties) => {
  const { data: allNgos } = useGetNgoListQuery()
    
  const currentNgo = useMemo(() => {
    const ngo = allNgos?.data?.items?.find((x) => x.ngoAddress === data.ngoAddress)
    return ngo ?? { name: 'Unknown', imageLink: '' }
  }, [allNgos?.data?.items, data.ngoAddress])

  return (
    <div className="rounded-3xl bg-white p-4">
      <div className="flex items-center justify-between">
        <img
          src={currentNgo.imageLink}
          alt={currentNgo.name}
          className="h-6 w-6 rounded-full"
        />
        <div className="text-sm text-muted">{formatDate(data.createdAt)}</div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <h4 className="font-bold">{currentNgo.name}</h4>
        <div className="font-semibold">#{index}</div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-y-4">
        <CaptionItem
          title="Staked amount"
          value={`${formatNumber(data.balanceWithoutProfit)} stETH`}
        />
        <CaptionItem
          title="Your profit"
          value={`${formatNumber(data.profit, true)} stETH`}
        />
        <CaptionItem title="Donation" value={`${formatNumber(data.donation, true)} stETH`} />
        <CaptionItem
          title="Service fee"
          value={`${formatNumber(data.serviceFee, true)} stETH`}
        />
      </div>
    </div>
  )
}
