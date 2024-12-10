import type { Stakes } from '@api/data-contracts'
import { Tooltip } from '@mantine/core'
import { formatNumber } from '@shared/lib/utils'
import { CaptionItem } from '@shared/ui/caption-item'

interface INgoCarouselCardProperties {
  data?: Stakes
  index: number
  ngo: string
}

export const NgoCarouselCard = ({ data, index }: INgoCarouselCardProperties) => {
  return (
    <div className="rounded-[1.25rem] bg-[#f7f7f7] p-3 max-md:bg-white flex flex-col">
      <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-4 max-md:flex-col max-md:gap-x-4 max-md:gap-y-2">
        <div className="flex flex-col">
          <div className="flex items-center font-bold text-3xl">Stake #{index}</div>
          <div className="flex items-center">Stake Id: {data?.customStakeId}</div>
        </div>
        <Tooltip label={data?.totalDonation.toFixed(18)}>
          <div>
            <CaptionItem
              title="Total donation"
              value={`${formatNumber(data?.totalDonation)} stETH`}
            />
          </div>
        </Tooltip>
        <CaptionItem
          title="Donation percent"
          value={`${formatNumber(data?.percentShare)}%`}
        />
        <Tooltip label={data?.balance.toFixed(18)}>
          <div>
            <CaptionItem
              title="Stake balance"
              value={`${formatNumber(data?.balance)} stETH`}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
