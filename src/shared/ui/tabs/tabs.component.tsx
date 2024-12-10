import { cn } from '@shared/lib/utils'
import { motion } from 'framer-motion'

interface ITabsProperties {
  values: string[]
  activeTab: string
  setActiveTab: (value: string) => void
  layoutId: string
  className?: string
  type?: 'button' | 'reset' | 'submit'
  id?: string[]
}

export const Tabs = ({
  values,
  activeTab,
  setActiveTab,
  className,
  layoutId,
  type,
  id,
}: ITabsProperties) => {
  return (
    <motion.div
      layout
      className={cn(
        'flex w-fit rounded-sl border border-solid border-primary',
        className,
      )}
    >
      {values.map((tab, i) => (
        <button
          id={id ? id[i] : ''}
          key={tab}
          className="relative grow cursor-pointer rounded-sl border-none bg-transparent px-8 py-4 text-sm font-semibold text-primary"
          onClick={() => setActiveTab(tab)}
          type={type}
        >
          <span
            className={cn(
              'text-primary z-10 relative',
              activeTab === tab && 'text-white',
            )}
          >
            {tab}
          </span>

          {activeTab === tab && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 z-0 rounded-sl bg-primary"
              transition={{
                duration: 0.5,
                type: 'spring',
              }}
            />
          )}
        </button>
      ))}
    </motion.div>
  )
}
