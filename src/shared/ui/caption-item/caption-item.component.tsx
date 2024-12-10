import { cn } from '@shared/lib/utils'

import { CopyButton } from '../copy-button'

interface ICaptionItemProperties {
  title: string
  value: string
  withCopy?: boolean
}

export const CaptionItem = ({ title, value, withCopy }: ICaptionItemProperties) => {
  return (
    <div className="truncate">
      <p className="font-semibold max-md:text-sm max-md:font-normal">{title}</p>
      <span
        className={cn(
          'mt-2 text-2xl font-bold max-md:text-base',
          withCopy && 'flex items-center mt-1 gap-1',
        )}
      >
        {value}
        {withCopy && <CopyButton value={value} />}
      </span>
    </div>
  )
}
