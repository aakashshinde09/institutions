import { expect, test, describe } from 'vitest'
import { formatNumber } from './format-number.util'

describe('Format number', () => {

  test('Format number should be correct', () => {
    const num = formatNumber(0.0000000002333)

    expect(num).equal('0.0000000002')
  })

  test('Format number should be correct', () => {
    const num = formatNumber(0.0023000002333)

    expect(num).equal('0.0023')
  })

  test('Format number should be correct', () => {
    const num = formatNumber(2.0023000002333)

    expect(num).equal('2.0023')
  })

  test('Format number should be correct', () => {
    const num = formatNumber(0.0023552333)

    expect(num).equal('0.002355')
  })

  test('Format number should be correct', () => {
    const num = formatNumber(1)

    expect(num).equal('1')
  })

})
