import { expect, test, describe } from 'vitest'
import { scannerLink } from './scanner-link-helper.util'

describe('Scanner link ', () => {
  const baseLink = 'https://holesky.etherscan.io'

  test('Link should leads to etherscan tx info', () => {
    const txHash = '0xd92fe71e6167532f61ccc4a6c5b49acbe02d818840b22736dec66ec4d8dd9549'

    const link = scannerLink('tx', txHash)

    expect(link).equal(`${baseLink}/tx/${txHash}`)
  })

  test('Link should leads to etherscan address info', () => {
    const address = '0x30de5ffc4be9864506336bc908481470611a6d93'

    const link = scannerLink('address', address)

    expect(link).equal(`${baseLink}/address/${address}`)
  })
})
