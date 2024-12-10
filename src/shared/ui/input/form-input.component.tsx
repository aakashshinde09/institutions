import { forwardRef } from 'react'
import { useController } from 'react-hook-form'

import type { IInputProperties } from './custom-input.component'
import { CustomInput } from './custom-input.component'

type FormInputProperties = {
  name: string
  control: any
} & IInputProperties

export const FormInput = forwardRef((props: FormInputProperties, reference) => {
  const { name, control } = props
  const { field } = useController({
    name,
    control,
  })

  return <CustomInput {...props} {...field} ref={reference} />
})

FormInput.displayName = 'FormInput'
