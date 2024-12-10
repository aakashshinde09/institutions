import type { SelectProps } from '@mantine/core'
import { Select } from '@mantine/core'

interface IDropdownProperties extends SelectProps {
  ref?: any
}

export const Dropdown = ({ ...props }: IDropdownProperties) => {
  return (
    <Select
      {...props}
      classNames={{
        ...props.classNames,
        label: 'text-base text-black font-semibold max-md:text-sm',
        input:
          'bg-[#eee] border-none text-base text-black font-semibold rounded-xl h-auto font-jakarta p-4 mt-2 max-md:p-3 max-md:text-sm placeholder:text-black',
        dropdown: 'bg-white rounded-xl',
        option: 'text-base text-black font-semibold py-2 px-4 max-md:text-sm',
        section: 'hidden',
        error: 'text-warning',
      }}
    />
  )
}
