import type { NGOLookup } from '@api/data-contracts'
import { elementIds } from '@shared/lib/enums'
import { formatNumber, scannerLink } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'
import { IconComponent } from '@shared/ui/icon'
import Image from 'next/image'

interface ISocialImpactCardProperties {
  data: NGOLookup
  ind: number
}

export const SocialImpactCard = ({ data, ind }: ISocialImpactCardProperties) => {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-3 md:pb-4">
      <div className="relative h-[18.75rem] w-full overflow-hidden rounded-[1.25rem] max-md:h-[15rem]">
        <Image
          src={
            data.imageLink.includes('http') ? data.imageLink : `https://${data.imageLink}`
          }
          alt="Social impact image"
          sizes="25rem, 18.75rem"
          fill
          className="object-scale-down"
          priority
        />
        <div className="absolute right-3 top-3 flex items-center gap-3">
          <a
            href={scannerLink('address', data.ngoAddress)}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border-none bg-white p-3"
          >
            <IconComponent name="document" viewBox="0 0 24 24" className="text-primary" />
          </a>
          <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border-none bg-white p-3"
          >
            <IconComponent name="web" viewBox="0 0 24 24" />
          </a>
        </div>
      </div>

      <div className="mb-5 mt-6 max-md:mt-4">
        <h3 className="h3">{data.name}</h3>
        <div className="mt-2 flex items-center gap-1 max-md:text-sm">
          <IconComponent name="office" viewBox="0 0 24 24" className="h-6 w-6" />
          <span className="label-2 text-black/80">{data.location}</span>
        </div>
        <div className='max-h-[120px] overflow-auto scroll pr-2 mt-2'><p className="mt-3 text-base text-muted max-md:text-sm">{data.description}</p></div>
      </div>

      <div className="mt-auto flex items-center justify-between rounded-sl bg-primary/20 pr-3 max-md:mt-4">
        <Button
          id={elementIds.STAKE_N_DONATE + ind}
          className="max-md:py-4"
          href={`/staking?ngo=${data.id}`}
        >
          stake&donate
        </Button>
        <div className="ml-1 flex grow items-center justify-center gap-1 text-base max-md:text-sm">
          <span className="text-primary/50">Total staked:</span>
          <span className="font-semibold text-primary">
            {formatNumber(data.totalStacked)} stETH
          </span>
        </div>
      </div>
    </div>
  )
}
