import type { RewardLookup } from '@api/data-contracts'
import { Tooltip } from '@mantine/core'
import { useGetNgoListQuery } from '@shared/api'
import { cn, formatDate, formatNumber, getFullNumber } from '@shared/lib/utils'
import { useMemo } from 'react'

interface IRewardRowProperties {
  data: RewardLookup
  className?: string
  index: number
}

export const RewardRow = ({ data, className, index }: IRewardRowProperties) => {
  const { data: allNgos } = useGetNgoListQuery()

  const currentNgo = useMemo(() => {
    const ngo = allNgos?.data?.items?.find((x) => x.ngoAddress === data.ngoAddress)
    return ngo ?? { name: 'Unknown', imageLink: '' }
  }, [allNgos?.data?.items, data.ngoAddress])

  return (
    <tr className={cn('tableRow', className)}>
      <td>#{index}</td>
      <td className="truncate text-center">
        {data.stake ? data.stake.customStakeId : 0}
      </td>

      <Tooltip label={formatNumber(data.balanceWithoutProfit)}>
        <td>{formatNumber(data.balanceWithoutProfit)} stETH</td>
      </Tooltip>
      <Tooltip label={getFullNumber(data.profit)}>
        <td className="truncate" title={`${data.profit} stETH`}>
          {formatNumber(data.profit, true)} stETH
        </td>
      </Tooltip>
      <td>
        <div className="flex items-center gap-3" title={currentNgo.name}>
          <img
            src={currentNgo.imageLink}
            alt={currentNgo.name}
            className="h-6 w-6 rounded-full"
          />
          <span className="max-w-[15rem] truncate">{currentNgo.name}</span>
        </div>
      </td>
      <Tooltip label={getFullNumber(data.donation)}>
        <td className="truncate" title={`${data.donation} stETH`}>
          {formatNumber(data.donation, true)} stETH
        </td>
      </Tooltip>

      <Tooltip label={getFullNumber(data.serviceFee)}>
        <td className="truncate" title={`${data.serviceFee} stETH`}>
          {formatNumber(data.serviceFee, true)} stETH
        </td>
      </Tooltip>
      <td className="text-muted">{formatDate(data.createdAt)}</td>
    </tr>
  )
}
