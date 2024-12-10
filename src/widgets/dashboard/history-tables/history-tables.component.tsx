import { Tabs } from '@mantine/core'

import { RewardsHistoryTable } from '../rewards-history-table.component'
import { TransactionHistoryTable } from '../transaction-history-table.component'

export const HistoryTables = () => {
  return (
    <Tabs
      defaultValue="rewards"
      classNames={{
        list: 'before:hidden gap-9 max-md:gap-4 flex-nowrap overflow-x-auto scroll',
        tab: 'text-2xl font-bold p-0 data-[active=true]:text-black text-black/50 border-none bg-transparent transition-colors',
        panel: 'mt-8 max-md:mt-6',
      }}
    >
      <div className="container">
        <Tabs.List>
          <Tabs.Tab value="rewards">Rewards history</Tabs.Tab>
          <Tabs.Tab value="transactions">Transaction history</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="rewards">
          <RewardsHistoryTable />
        </Tabs.Panel>

        <Tabs.Panel value="transactions">
          <TransactionHistoryTable />
        </Tabs.Panel>
      </div>
    </Tabs>
  )
}
