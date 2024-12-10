import { TransactionLookup } from '@api/data-contracts'
import { cn, scannerLink } from '@shared/lib/utils'
import { IconComponent } from '@shared/ui/icon'

interface IRequestItemProperties {
  data: TransactionLookup
}

export const StEthItem = ({ data }: IRequestItemProperties) => {
  console.log(data);
  
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer  transition-colors bg-[#f5f5f5] hover:bg-primary/20',
      )}
    >
      <p className={cn('text-base font-semibold text-black')}>
        {(data?.ethAmount)} stETH withdraw
      </p>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            'rounded-2xl px-3 py-2 text-xs font-semibold bg-primary/20 text-primary',
          )}
        >
          Claimed
        </span>
        <a
          href={scannerLink('tx', data?.hash)}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-4 w-4 items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <IconComponent
            name="link"
            viewBox="0 0 16 16"
            className={cn('h-full w-full [&>path]:fill-primary')}
          />
        </a>
      </div>
    </div>
  )
}
