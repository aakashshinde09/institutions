import { calculateMonthlyReceive } from './calculate-monthly-receive.util'
import { expect, test, describe } from 'vitest'

describe('Calculate monthly recieve', () => {
  test('Calculate monthly recieve should null', () => {
    const num = calculateMonthlyReceive(0, 10, 8)
    expect(num).equal(0)
  })

  test('Calculate monthly recieve should return correct number', () => {
    const amount = 100
    const apr = 10
    const num = calculateMonthlyReceive(amount, 8, apr)
    expect(num).equal((amount * apr) / (100 * 12))
  })
})
