import { Skeleton } from '@mantine/core'
import { cn } from '@shared/lib/utils'

interface IDescriptionItemProperties {
  title: string
  value: string
  className?: string
  showSkeleton?: boolean
}

export const DescriptionItem = ({
  title,
  value,
  className,
  showSkeleton,
}: IDescriptionItemProperties) => {
  return (
    <div className={cn('flex flex-col gap-2 max-md:gap-0', className)}>
      <span className="text-base font-semibold text-gray max-md:text-base">{title}</span>
      {showSkeleton ? (
        <Skeleton className="h-12 rounded-xl" />
      ) : (
        <span className="text-5xl font-bold max-md:text-3xl">{value}</span>
      )}
    </div>
  )
}
