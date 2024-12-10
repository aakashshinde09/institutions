import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { TransactionMobileRow } from './transaction-mobile-row.component'
import { MantineProvider } from '@mantine/core'

const mock = {
  id: 12,
  hash: '0xd92fe71e6167532f61ccc4a6c5b49acbe02d818840b22736dec66ec4d8dd9549',
  transactionType: '1',
  fromAddress: '0xc946cb236481c159f460b212b34ab246dac37fcd',
  toAddress: '0xa72afa79826df92b88831b9ebd1a459a75345231',
  ethAmount: 0.01,
  networkFee: 0.001197551826812835,
  blockNumber: 1470553,
  blockTimestamp: 1714751892,
}

describe('<TransactionMobileRow/>', () => {
  test('Renders correctly', () => {
    const component = render(<TransactionMobileRow data={mock} />, {wrapper: MantineProvider})

    expect(component).toMatchSnapshot()
  })
})
