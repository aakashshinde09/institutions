import { cn } from '@shared/lib/utils'
import Link from 'next/link'

interface IButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary'
  className?: string
  href?: string
  id?: string
}

const defaultStyles =
  'rounded-sl px-12 py-5 text-base transition-colors cursor-pointer font-semibold uppercase no-underline max-md:py-3 max-md:px-6 max-md:text-sm disabled:cursor-not-allowed'

const getStyles = (variant: IButtonProperties['variant']) => {
  switch (variant) {
    // eslint-disable-next-line default-case-last
    default:
    case 'primary': {
      return 'bg-primary text-white border-none hover:bg-primary/90 disabled:bg-primary/70'
    }
    case 'outline': {
      return ' bg-transparent text-primary border border-primary'
    }
    case 'secondary': {
      return 'bg-white text-primary border-none'
    }
  }
}

export const Button = ({
  children,
  variant = 'primary',
  className,
  href,
  id,
  ...props
}: IButtonProperties) => {
  const classes = cn(defaultStyles, getStyles(variant), className)

  if (href) {
    return (
      <Link className={classes} href={href} id={id}>
        {children}
      </Link>
    )
  }

  return (
    <button {...props} id={id} className={classes}>
      {children}
    </button>
  )
}
