import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { SectionCover } from './section-cover.component'

describe('<SectionCover/>', () => {
  test('Renders correctly', () => {
    const component = render(
      <SectionCover id="2" onClick={() => {}} title="Impact staking" />,
    )

    expect(component).toMatchSnapshot()
  })
})
