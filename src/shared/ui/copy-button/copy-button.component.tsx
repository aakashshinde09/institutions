import { Tooltip, UnstyledButton } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { cn } from '@shared/lib/utils'
import React, { useEffect, useState } from 'react'

import { IconComponent } from '../icon'

const VISIBLE_TIMEOUT = 1500

interface ICopyButtonProperties {
  value?: string | number
  className?: string
}

export const CopyButton = ({ value, className }: ICopyButtonProperties) => {
  const [opened, setOpened] = useState(false)
  const timerReference = React.useRef<ReturnType<typeof setTimeout>>()
  const clipboard = useClipboard()

  const copyToClipboard = () => {
    if (!value) {
      return
    }

    clipboard.copy(value.toString())
    setOpened(true)
    timerReference.current = setTimeout(() => setOpened(false), VISIBLE_TIMEOUT)
  }

  useEffect(() => {
    return () => {
      if (timerReference.current) {
        clearTimeout(timerReference.current)
      }
    }
  }, [])

  return (
    <Tooltip label="Copied!" opened={opened}>
      <UnstyledButton
        className={cn(
          'h-6 w-6 hover:scale-105 active:scale-95 transition shrink-0 text-primary',
          className,
        )}
        onClick={copyToClipboard}
      >
        <IconComponent name="copy" viewBox="0 0 24 24" className="h-full w-full" />
      </UnstyledButton>
    </Tooltip>
  )
}
