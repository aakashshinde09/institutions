import { Skeleton } from '@mantine/core'
import { cn } from '@shared/lib/utils'
import { CaptionItem } from '@shared/ui/caption-item'
import type { ReactElement } from 'react'

interface IInfoCardProperties {
  data: {
    title: string
    value: string
  }[]
  className?: string
  chart?: ReactElement
  showSkeleton?: boolean
}

export const InfoCard = ({
  data,
  className,
  chart,
  showSkeleton,
}: IInfoCardProperties) => {
  return (
    <article
      className={cn(
        'flex rounded-[1.25rem] bg-white px-4 py-8 justify-between gap-4 max-md:p-4',
        className,
      )}
    >
      <div className="flex w-full flex-col justify-end space-y-6">
        {showSkeleton
          ? Array.from({ length: data.length }).map((_, index) => (
              <Skeleton key={index} width={chart ? '100%' : '60%'} height="3.5rem" />
            ))
          : data.map((item, index) => (
              <CaptionItem key={index} title={item.title} value={item.value} />
            ))}
      </div>
      {chart}
    </article>
  )
}
