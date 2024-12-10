import { formatEther } from 'viem'

const convertScientificToDecimal = (number: number, decPlaces?: number) => {
  const decimalPlaces = -Math.floor(Math.log10(Math.abs(number)))
  if (number === 0) return 0

  if (decPlaces) return number.toFixed(decPlaces)
  else return number.toFixed(decimalPlaces)
}

const getNullsCountAfterPoint = (num: number) => {
  let parts = num.toString().split('e-')

  if (parts.length < 2) {
    parts = num.toString().split('.')
    if (parts.length < 2) return 0
    const numbersRegEx = /[1-9]/

    return parts[1]?.search(numbersRegEx)! + 2
  }

  let exponent = parseInt(parts[1] as string)

  return exponent + 1
}

export const formatNumber = (
  value: number | string | bigint | undefined,
  auto: boolean = false,
) => {
  if (!value) {
    return 0
  }

  let transformed = value

  if (typeof value === 'bigint') {
    transformed = Number(formatEther(value))
  }

  transformed = Number(transformed)
  if (Math.abs(transformed) < 1e-5) {
    if (auto)
      return convertScientificToDecimal(
        transformed,
        getNullsCountAfterPoint(value as number),
      )
    return convertScientificToDecimal(transformed)
  }

  if (transformed < 1) {
    return transformed.toLocaleString('en-US', {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0,
    })
  }

  return transformed.toLocaleString('en-US', {
    maximumFractionDigits: getNullsCountAfterPoint(value as number),
  })
}

export const getFullNumber = (strNum: string) => Number(strNum).toFixed(18)
