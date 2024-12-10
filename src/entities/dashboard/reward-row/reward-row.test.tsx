import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RewardRow } from './reward-row.component'

const mock = {
  balanceWithoutProfit: 0.01,
  createdAt: '2024-05-05T19:28:02.000Z',
  donation: 0.000000049,
  id: 241,
  ngoAddress: '0xa72afa79826df92b88831b9ebd1a459a75345231',
  profit: 0.00000019,
  serviceFee: 1.299552152886571e-9,
  stackedAmount: 0.01,
}

describe('<RewardRow/>', () => {
  test('Renders correctly', () => {
    const component = render(
      <QueryClientProvider client={new QueryClient()}>
        <RewardRow data={mock} index={1} />
      </QueryClientProvider>,
    )

    expect(component).toMatchSnapshot()
  })
})
