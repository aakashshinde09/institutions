import { useCallback, useEffect, useState } from 'react'

export enum ViewWidth {
  MOBILE,
  TABLET,
  DESKTOP,
}

enum Breakpoints {
  MOBILE = 768,
  TABLET = 992,
}

const getViewWith = (width: number): ViewWidth => {
  if (width < Breakpoints.MOBILE) {
    return ViewWidth.MOBILE
  }

  if (width < Breakpoints.TABLET) {
    return ViewWidth.TABLET
  }

  return ViewWidth.DESKTOP
}

export const useScreenWidth = () => {
  const [view, setView] = useState<ViewWidth | null>(() => {
    if (typeof window === 'undefined') return null

    return getViewWith(window.innerWidth)
  })

  const checkSize = useCallback(() => {
    const calculated = getViewWith(window.innerWidth)
    setView(calculated)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    checkSize()

    const handleWindowResize = () => {
      checkSize()
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [checkSize])

  return view
}
