import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { InfoCard } from './info-card.component'

const mock = [
  {
    title: 'Amount staked',
    value: `10 stEth`,
  },
  {
    title: 'Percentage of staking rewards donated',
    value: `17 %`,
  },
]

describe('<InfoCard/>', () => {
  test('Renders correctly', () => {
    const component = render(<InfoCard data={mock} showSkeleton={false} />)

    expect(component).toMatchSnapshot()
  })
})
