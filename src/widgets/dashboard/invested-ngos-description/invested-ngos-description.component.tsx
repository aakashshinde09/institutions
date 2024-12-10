import type { NGOLookup } from '@api/data-contracts'
import { Share } from '@entities/dashboard'
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { formatNumber } from '@shared/lib/utils'
import { IconComponent } from '@shared/ui/icon'
import Image from 'next/image'

interface INgoCarouselCardProperties {
  data: NGOLookup
  maxPercent?: number
}

export const NgoCarouselDescription = ({
  data,
  maxPercent,
}: INgoCarouselCardProperties) => {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <div className="rounded-[1.25rem] bg-[#f7f7f7] p-4 max-md:bg-white">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white max-md:h-11 max-md:w-11">
          <Image
            src={data.imageLink}
            alt={data.name}
            fill
            sizes="4rem 4rem"
            className="object-cover"
          />
        </div>
        <div className="grow">
          <div className="flex items-center justify-between">
            <h4 className="text-xl max-md:text-base">{data.name}</h4>
            <div className="text-lg font-semibold">
              Total staked: {formatNumber(data.balance, true)}
            </div>
          </div>
          <div className='max-h-[65px] overflow-auto scroll'>
            <p className="mt-2 text-sm text-muted">{data.description}</p>
          </div>
        </div>
      </div>
      <Button
        type="button"
        onClick={() => {
          open()
        }}
        className="mt-2 flex ml-auto items-center rounded-full py-0 px-4 font-normal normal-case"
      >
        Share <IconComponent className="size-6 pl-2" name="share" />
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        classNames={{ content: 'bg-white rounded-3xl', body: 'p-6 text-primary' }}
      >
        <Share percent={maxPercent || 0} ngo={data.name} />
      </Modal>
    </div>
  )
}
