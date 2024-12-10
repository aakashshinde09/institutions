import { expect, test, describe } from 'vitest'
import { shortenWallet } from './shorten-wallet.util'

describe('Shorten wallet ', () => {
  test('Should reduce wallet adress correctly', () => {
    const address = '0x30de5ffc4be9864506336bc908481470611a6d93'

    const reducedAddress = shortenWallet(address)

    expect(reducedAddress).equal('0x30d...a6d93')
  })
})
