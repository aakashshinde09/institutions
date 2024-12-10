import Image from 'next/image'

import { IconComponent } from '../icon'
import { elementIds } from '@shared/lib/enums'

interface SelectOptionProperties {
  name: string
  image: string
  link: string
  ind?: number
}

export const SelectOption = ({ name, image, link, ind }: SelectOptionProperties) => {
  return (
    <div className="flex items-center" id={elementIds.NGO + ind?.toString()}>
      <div className="relative h-7 w-14">
        <Image
          src={image.includes('http') ? image : `https://${image}`}
          alt={name}
          fill
          sizes="56px 28px"
          className="w-full object-contain"
        />
      </div>
      <p className="ml-3 truncate text-base font-semibold">{name}</p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className="ml-auto flex h-6 w-6 items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <IconComponent name="web" viewBox="0 0 24 24" />
      </a>
    </div>
  )
}
