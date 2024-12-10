import { useAccount, useContractRead } from 'wagmi'

import NgoContract from './ngo-lis.json'

export const useGetUserBalance = (ngoAddress: string, stakeId: number) => {
  const { address } = useAccount()
  const { data, isPending } = useContractRead({
    address: ngoAddress as `0x${string}`,
    abi: NgoContract.abi,
    functionName: 'getUserBalance',
    args: [address, stakeId],
  })

  return { data, isPending } as { data: BigInt | undefined; isPending: boolean }
}
