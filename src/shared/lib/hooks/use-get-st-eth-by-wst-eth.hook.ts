import { useReadContract } from 'wagmi'
import wstETH from '../blockchain/wstEth.json'

export const useGetStEthByWstEth = (amount: BigInt) => {
  const { data } = useReadContract({
    address: '0x8d09a4502cc8cf1547ad300e066060d043f6982d',
    abi: wstETH.abi,
    functionName: 'getWstETHByStETH',
    args: [amount],
  })

  return { data } as { data: BigInt }
}
