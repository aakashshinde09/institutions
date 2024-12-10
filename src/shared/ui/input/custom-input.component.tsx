import type { TextInputProps } from '@mantine/core'
import { TextInput } from '@mantine/core'
import { cn } from '@shared/lib/utils'
import type { ReactElement } from 'react'

export interface IInputProperties extends TextInputProps {
  ref?: any
  rightLabel?: ReactElement
}

export const CustomInput = ({ rightLabel, ...props }: IInputProperties) => {
  return (
    <div className="relative">
      {rightLabel && (
        <div className="absolute right-0 top-0 z-10 max-md:top-1">{rightLabel}</div>
      )}

      <TextInput
        {...props}
        classNames={{
          ...props.classNames,
          root: cn('relative group'),
          input: cn(
            'bg-white p-4 text-base font-semibold border border-black rounded-xl h-auto font-jakarta placeholder:text-gray max-md:text-sm max-md:p-3',
            props.error && 'border-warning text-black',
            props.label && 'mt-2',
          ),
          label: cn(
            'text-black font-semibold text-base max-md:text-sm',
            props.error && 'text-warning',
          ),
          error: 'text-warning',
          section: 'w-fit pr-4 max-md:pr-3',
        }}
      />
    </div>
  )
}
