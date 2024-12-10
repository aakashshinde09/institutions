import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { NgoCarouselCard } from './ngo-carousel-card.component'
import { Stakes } from '@api/data-contracts'

const mock: Stakes = {
  createdAt: '2024-05-03T15:29:00.000Z',
  customStakeId: 6,
  stackedAmount: 0.000099999999999999,
  percentShare: 1,
  startDate: '2024-05-02T00:00:00.000Z',
  balance: 0.000100009752977152,
  totalDonation: 0,
}

describe('<NgoCarouselCard/>', () => {
  test('Renders correctly', () => {
    const component = render(<NgoCarouselCard ngo='Giga' index={1} data={mock} />)

    expect(component).toMatchSnapshot()
  })
})
