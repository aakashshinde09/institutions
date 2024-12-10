import { SectionCover } from '@entities/staking'
import { UnstyledButton } from '@mantine/core'
import { useHasMounted, useScreenWidth, ViewWidth } from '@shared/lib/hooks'
import { cn, formatNumber } from '@shared/lib/utils'
import { DescriptionItem } from '@shared/ui/description-item'
import { Tabs } from '@shared/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { ClaimForm } from './claim-form.component'
import { WithdrawRequestForm } from './withdraw-request-form.component'
import { TickerEnum } from '@shared/lib/enums/ticker.enum'

interface IWithdrawFundsProperties {
  onShow?: () => void
  style?: React.CSSProperties
}

enum TabsEnum {
  REQUEST = 'request',
  CLAIM = 'claim',
}


const TICKER_TABS_ARRAY = [
  { title: TickerEnum.ETH, value: TickerEnum.ETH },
  { title: TickerEnum.ST_ETH, value: TickerEnum.ST_ETH },
  { title: TickerEnum.W_ST_ETH, value: TickerEnum.W_ST_ETH },
]

export const WithdrawFunds = ({ onShow, style }: IWithdrawFundsProperties) => {
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.REQUEST)
  const [activeTickerTab, setActiveTickerTab] = useState<TickerEnum>(
    TickerEnum.ETH,
  )

  const screen = useScreenWidth()
  const mounted = useHasMounted()
  const [estGasPrice, setEstGasPrice] = useState(0)

  const isERC20ETH =
    activeTickerTab === TickerEnum.ST_ETH ||
    activeTickerTab === TickerEnum.W_ST_ETH

  const TABS_ARRAY = [
    { title: isERC20ETH ? 'Claim' : 'Request', value: TabsEnum.REQUEST },
    { title: isERC20ETH ? 'History' : 'Claim', value: TabsEnum.CLAIM },
  ]

  return (
    <motion.div
      id="withdraw-container"
      layout
      transition={{ duration: 0.25 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex rounded-4xl bg-white max-md:mt-8 max-md:block max-md:rounded-3xl"
      style={style}
    >
      <SectionCover
        id="withdraw-cover"
        title="Withdrawals"
        subtitle=""
        onClick={() => {
          onShow?.()
          setActiveTab(TabsEnum.REQUEST)
        }}
        className="block max-md:hidden"
      />
      <div
        id="withdraw-body"
        className="flex h-full w-[26.25rem] flex-col p-6 max-md:w-full max-md:p-4 max-md:pb-8"
        style={
          mounted && screen === ViewWidth.MOBILE ? {} : { opacity: 0, display: 'none' }
        }
      >
        <h3 className="h3 max-md:hidden">Request withdrawals and Claim</h3>
        {mounted && screen === ViewWidth.MOBILE ? (
          <div className="flex items-center gap-6">
            {TABS_ARRAY.map((x) => (
              <UnstyledButton
                key={x.value}
                onClick={() => setActiveTab(x.value)}
                className={cn(
                  'text-2xl font-bold text-black',
                  activeTab === x.value && 'text-primary',
                )}
              >
                {x.title}
              </UnstyledButton>
            ))}
          </div>
        ) : (
          <Tabs
            values={TABS_ARRAY.map((x) => x.title)}
            activeTab={TABS_ARRAY.find((x) => x.value === activeTab)!.title}
            setActiveTab={(tab) =>
              setActiveTab(TABS_ARRAY.find((x) => x.title === tab)!.value)
            }
            className="mb-8 mt-6"
            layoutId="withdraw-tabs"
          />
        )}

        {activeTab === TabsEnum.REQUEST && (
          <WithdrawRequestForm setEstGasPrice={setEstGasPrice} ticker={activeTickerTab} />
        )}
        {activeTab === TabsEnum.CLAIM && (
          <ClaimForm setEstGasPrice={setEstGasPrice} isStEth={isERC20ETH} />
        )}
      </div>

      <div
        id="withdraw-info"
        className="space-y-8 h-full self-center p-6 max-md:flex max-md:gap-9 max-md:space-y-0 max-md:rounded-t-3xl max-md:bg-[#ededed] max-md:p-4 max-md:pb-9"
        style={
          mounted && screen === ViewWidth.MOBILE ? {} : { opacity: 0, display: 'none' }
        }
      >
        <AnimatePresence>
          <Tabs
            values={TICKER_TABS_ARRAY.map((x) => x.title)}
            activeTab={TICKER_TABS_ARRAY.find((x) => x.value === activeTickerTab)!.title}
            setActiveTab={(tab) =>
              setActiveTickerTab(TICKER_TABS_ARRAY.find((x) => x.title === tab)!.value)
            }
            layoutId="withdraw-ticker-tabs"
          />
          {activeTab === TabsEnum.REQUEST && (
            <motion.div
              className=""
              key="waitingTimeItem"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <DescriptionItem
                title="Waiting time"
                value={isERC20ETH ? '1-5 mins' : '1-4 day'}
              />
            </motion.div>
          )}

          <DescriptionItem
            key="gasPriceItem"
            title="Maximum transaction cost"
            value={estGasPrice ? `${formatNumber(estGasPrice)}$` : '-'}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
