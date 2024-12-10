export const getEthPrice = async (amount: number) => {
  const response = await fetch(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  )
  const data = await response.json()
  const ethPrice = data.USD
  return amount * ethPrice
}
