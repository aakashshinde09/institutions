import type { SelectProps as $SelectProperties } from '@mantine/core'
import { forwardRef } from 'react'
import { useController } from 'react-hook-form'

import { Dropdown } from './dropdown.component'

type SelectProperties = {
  name: string
  control: any
} & Omit<$SelectProperties, 'value' | 'defaultValue'>

export const FormDropdown = forwardRef((props: SelectProperties, reference) => {
  const { name, control } = props
  const { field } = useController({
    name,
    control,
  })

  return <Dropdown {...props} {...field} ref={reference} />
})

FormDropdown.displayName = 'FormDropdown'
