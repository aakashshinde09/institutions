import CoverBg from '@public/assets/images/stake-cover.png'
import { cn } from '@shared/lib/utils'
import { motion } from 'framer-motion'

interface ISectionCoverProperties {
  id: string
  title: string
  subtitle?: string
  onClick: () => void
  className?: string
}

export const SectionCover = ({
  id,
  title,
  subtitle,
  onClick,
  className,
}: ISectionCoverProperties) => {
  return (
    <motion.div
      id={id}
      className={cn(
        'relative h-full cursor-pointer overflow-hidden rounded-4xl p-6 w-full',
        className,
      )}
      whileHover="animate"
      onClick={onClick}
    >
      <motion.div
        className="relative z-10"
        style={{ color: '#000' }}
        variants={{
          animate: {
            color: '#fff',
            transition: {
              delay: 0.25,
            },
          },
        }}
      >
        <h3 className="h3">{title}</h3>
        <p className="mt-2 text-base font-bold">{subtitle}</p>
      </motion.div>
      <motion.img
        src={CoverBg.src}
        alt="cover"
        className="absolute bottom-0 left-16 z-10 aspect-square w-[31.25rem]"
        variants={{
          initial: {
            opacity: 1,
          },
          animate: {
            opacity: 0.2,
          },
        }}
      />
      <motion.svg
        height="20"
        width="20"
        className="absolute -bottom-5 -right-5 z-0 fill-primary"
        variants={{
          initial: {
            scale: 1,
            opacity: 0,
          },
          animate: {
            scale: 90,
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: 'easeInOut',
            },
          },
        }}
      >
        <circle cx="10" cy="10" r="10" />
      </motion.svg>
    </motion.div>
  )
}
