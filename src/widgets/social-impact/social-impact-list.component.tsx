import { NGOLookup } from '@api/data-contracts'
import { SocialImpactCard } from '@entities/social-impact'
import { Carousel } from '@mantine/carousel'
import { Loader } from '@mantine/core'
import { useGetNgoListQuery } from '@shared/api'
import { useHasMounted, useScreenWidth, ViewWidth } from '@shared/lib/hooks'
import { cn } from '@shared/lib/utils'
import { IconComponent } from '@shared/ui/icon'

export const SocialImpactList = () => {
  const { data, isLoading } = useGetNgoListQuery()
  const view = useScreenWidth()
  const mounted = useHasMounted()

  const shouldBeCentered = !!data?.data?.items && data?.data?.items?.length <= 3

  if (isLoading) {
    return (
      <div className="my-10 flex w-full items-center justify-center">
        <Loader />
      </div>
    )
  }
  const reversedData = [...(data?.data?.items as NGOLookup[])].reverse()
  console.log("🚀 ~ SocialImpactList ~ data?.data?.items:", data?.data?.items)
  console.log("🚀 ~ SocialImpactList ~ reversedData:", reversedData)
  
  return (
    <div>
      {mounted && view === ViewWidth.MOBILE ? (
        <div className="container mt-6 grid grid-cols-1 gap-4">
          {reversedData?.map?.((item, ind) => (
            <SocialImpactCard key={item.id} data={item} ind={ind + 1} />
          ))}
        </div>
      ) : (
        <Carousel
          withControls={!shouldBeCentered}
          slideSize={{ base: '31.25%', xl: '25%' }}
          align={shouldBeCentered ? 'center' : 'start'}
          draggable={!shouldBeCentered}
          initialSlide={shouldBeCentered ? 1 : 0}
          slideGap="lg"
          classNames={{
            root: cn(shouldBeCentered && 'max-w-[120rem] mx-auto'),
            viewport: 'relative pl-16',
            container: cn('mt-6', data?.data?.items?.length === 2 && 'ml-[20%]'),
            controls: 'absolute right-0 -top-8 left-auto pr-16 pl-0 w-auto gap-3',
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
        >
          {reversedData.map((item, ind) => (
            <Carousel.Slide key={item.id}>
              <SocialImpactCard data={item} ind={ind + 1} />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </div>
  )
}
