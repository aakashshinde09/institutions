import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { SocialImpactCard } from './social-impact-card.component'
import { NGOLookup } from '@api/data-contracts'

const mock: NGOLookup = {
  id: 1,
  graphId: '0xf5043d3e6ee432ee3fb8e10b81a05e3e261552aa8c621230ed6457125fe6bb69',
  name: 'UNICEF',
  imageLink: 'https://i.pinimg.com/736x/50/ba/9f/50ba9f98aaf8f8ded4d576a6969668f0.jpg',
  description:
    "UNICEF works in over 190 countries and territories to save children's lives to defend their rights and to help them fulfil their potential from early childhood through adolescence. And we never give up.",
  link: 'https://www.unicef.org/',
  totalStacked: 0.03639999999999999,
  location: 'United Kingdom',
  ngoAddress: '0x30de5ffc4be9864506336bc908481470611a6d93',
  rewardsOwner: '0xdf9c8efb80f2dad58d2e2d7c30f1d190c02197a8',
  totalUserStaked: 4,
  balance: 100,
  totalDonation: 1000
}

describe('<SocialImpactCard/>', () => {
  test('Renders correctly', () => {
    const component = render(<SocialImpactCard data={mock} ind={1} />)

    expect(component).toMatchSnapshot()
  })
})
