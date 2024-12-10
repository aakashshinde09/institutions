import type { WithdrawStatus } from '@shared/lib/blockchain'
import { cn, formatNumber, scannerLink } from '@shared/lib/utils'
import { IconComponent } from '@shared/ui/icon'
import { formatEther } from 'viem'

interface IRequestItemProperties {
  active: boolean
  data: WithdrawStatus & { id: string }
}

export const RequestItem = ({ active, data }: IRequestItemProperties) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer  transition-colors',
        active ? 'bg-primary' : 'bg-[#f5f5f5] hover:bg-primary/20',
      )}
    >
      <p className={cn('text-base font-semibold', active ? 'text-white' : 'text-black')}>
        {formatNumber(formatEther(data?.amountOfStETH))} stETH withdraw
      </p>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            'rounded-2xl px-3 py-2 text-xs font-semibold',
            active ? 'bg-white/20 text-white' : 'bg-primary/20 text-primary',
          )}
        >
          {data?.isClaimed ? 'Claimed' : data?.isFinalized ? 'Ready for claim' : 'Pending'}
        </span>
        <a
          href={scannerLink('token', data?.id)}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-4 w-4 items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <IconComponent
            name="link"
            viewBox="0 0 16 16"
            className={cn(
              'h-full w-full',
              active ? '[&>path]:fill-white' : '[&>path]:fill-primary',
            )}
          />
        </a>
      </div>
    </div>
  )
}
