import { expect, test, describe } from 'vitest'
import { formatDate } from './format-date.util'

describe('Format date', () => {
  const today = 1714995694751

  test('Format date should be correct (short)', () => {
    const date = formatDate(today)

    expect(date).equal('06/05/2024')
  })

  test('Format date should be correct (long)', () => {
    const date = formatDate(today, false)

    expect(date).equal('06/05/2024 14:41')
  })
})
