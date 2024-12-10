import dynamic from 'next/dynamic'
import type { FC, SVGAttributes, SVGProps } from 'react'

const logo = dynamic(() =>
  import('@public/assets/icons/givedirectly.svg').then((res) => res.default),
)
const office = dynamic(() =>
  import('@public/assets/icons/office.svg').then((res) => res.default),
)
const wallet = dynamic(() =>
  import('@public/assets/icons/wallet.svg').then((res) => res.default),
)
const web = dynamic(() =>
  import('@public/assets/icons/web.svg').then((res) => res.default),
)
const arrowRight = dynamic(() =>
  import('@public/assets/icons/arrow-right.svg').then((res) => res.default),
)
const menu = dynamic(() =>
  import('@public/assets/icons/menu.svg').then((res) => res.default),
)
const closeCircle = dynamic(() =>
  import('@public/assets/icons/close-circle.svg').then((res) => res.default),
)
const cross = dynamic(() =>
  import('@public/assets/icons/cross.svg').then((res) => res.default),
)
const metamask = dynamic(() =>
  import('@public/assets/icons/metamask.svg').then((res) => res.default),
)
const walletconnect = dynamic(() =>
  import('@public/assets/icons/wallet-connect.svg').then((res) => res.default),
)
const okxwallet = dynamic(() =>
  import('@public/assets/icons/okx.svg').then((res) => res.default),
)
const coinbasewallet = dynamic(() =>
  import('@public/assets/icons/coinbase.svg').then((res) => res.default),
)
const link = dynamic(() =>
  import('@public/assets/icons/link.svg').then((res) => res.default),
)
const edit = dynamic(() =>
  import('@public/assets/icons/edit.svg').then((res) => res.default),
)
const copy = dynamic(() =>
  import('@public/assets/icons/copy.svg').then((res) => res.default),
)
const document = dynamic(() =>
  import('@public/assets/icons/document.svg').then((res) => res.default),
)
const share = dynamic(() =>
  import('@public/assets/icons/share.svg').then((res) => res.default),
)
const x = dynamic(() => import('@public/assets/icons/X.svg').then((res) => res.default))
const linkedIn = dynamic(() =>
  import('@public/assets/icons/linkedin.svg').then((res) => res.default),
)
const warpcast = dynamic(() =>
  import('@public/assets/icons/warpcast.svg').then((res) => res.default),
)
const facebook = dynamic(() =>
  import('@public/assets/icons/facebook.svg').then((res) => res.default),
)
const ICONS_MAP = {
  logo,
  office,
  wallet,
  web,
  arrowRight,
  menu,
  closeCircle,
  cross,
  metamask,
  walletconnect,
  link,
  edit,
  copy,
  document,
  coinbasewallet,
  okxwallet,
  share,
  x,
  linkedIn,
  warpcast,
  facebook,
} as const

export type IconsTypes = keyof typeof ICONS_MAP

export interface IIconComponentProperties extends SVGAttributes<SVGElement> {
  name: IconsTypes
}

export const IconComponent = ({ name, ...props }: IIconComponentProperties) => {
  const Icon = ICONS_MAP[name] as FC<SVGProps<SVGSVGElement>>
  if (!Icon) return null

  return <Icon role="img" {...props} />
}
