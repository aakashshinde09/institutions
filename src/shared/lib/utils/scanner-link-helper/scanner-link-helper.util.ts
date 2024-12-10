type LinkType = 'address' | 'token' | 'tx'

export const scannerLink = (type: LinkType, value?: string): string => {
  const baseLink = 'https://holesky.etherscan.io'

  switch (type) {
    case 'address': {
      return `${baseLink}/address/${value}`
    }
    case 'token': {
      return `${baseLink}/token/${process.env.NEXT_PUBLIC_WITHDRAWAL_CONTRACT_ADDRESS}?a=${value}`
    }
    case 'tx': {
      return `${baseLink}/tx/${value}`
    }
    default: {
      return ''
    }
  }
}
