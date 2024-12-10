import { UserControllerGetCurrentUserNgoListData } from '@api/data-contracts'
import { NgoCarouselCard } from '@entities/dashboard'
import { Carousel } from '@mantine/carousel'
import { IconComponent } from '@shared/ui/icon'
import { NgoCarouselDescription } from '@widgets/dashboard'
import React from 'react'

interface IProps {
  userNgos: UserControllerGetCurrentUserNgoListData | undefined
}

export const InvestedNgos: React.FC<IProps> = ({ userNgos }) => {
  return (
    <div className="w-[33.125rem] shrink-0 rounded-3xl bg-white p-4 max-md:-ml-4 max-md:w-[calc(100%+1rem)] max-md:bg-transparent max-md:p-0">
      <h2 className="h2 max-md:hidden">Social impacts</h2>
      <Carousel
        withControls
        align="start"
        slideGap="md"
        draggable={userNgos?.data && userNgos?.data.length > 1}
        classNames={{
          viewport: 'relative max-md:pl-4',
          container: 'mt-8 max-md:mt-0',
          controls: 'absolute right-0 -top-8 left-auto p-0 w-auto gap-3 max-md:hidden',
          control:
            'w-8 h-8 bg-primary rounded-full text-white opacity-100 data-[inactive=true]:opacity-70 data-[inactive=true]:cursor-default',
        }}
        previousControlIcon={<IconComponent name="arrowRight" viewBox="0 0 32 32" />}
        nextControlIcon={
          <IconComponent
            name="arrowRight"
            viewBox="0 0 32 32"
            style={{ rotate: '180deg' }}
          />
        }
        slideSize={{ base: '80%', xs: '100%' }}
      >
        {userNgos?.data?.map((ngo) => {
          const sortedStakes = ngo?.stakes?.sort(
            (a, b) => a.customStakeId - b.customStakeId,
          )
          const maxPercent = sortedStakes?.reduce((max, current) => {
            return current.percentShare > max ? current.percentShare : max
          }, 0)
          return (
            <Carousel.Slide key={ngo.id}>
              <div className="mb-4">
                <NgoCarouselDescription maxPercent={maxPercent} data={ngo} />
              </div>
              <div className="flex flex-col gap-4 max-h-[14rem] overflow-auto pr-3 scroll">
                {sortedStakes?.map((stake, index) => (
                  <>
                    <NgoCarouselCard
                      key={stake.customStakeId}
                      data={stake}
                      index={index + 1}
                      ngo={ngo.name}
                    />
                    {index == 0 && sortedStakes.length > 1 && (
                      <p className="text-sm text-muted -mt-[10px]">
                        Scroll down for more
                      </p>
                    )}
                  </>
                ))}
              </div>
            </Carousel.Slide>
          )
        })}
      </Carousel>

      {userNgos?.data?.length === 0 && (
        <div className="mt-36 flex items-center justify-center">
          <p className="text-center text-sm">You haven&apos;t invested in any NGO yet</p>
        </div>
      )}
    </div>
  )
}
