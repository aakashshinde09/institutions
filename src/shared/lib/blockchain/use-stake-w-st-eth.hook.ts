import { useWriteContract } from 'wagmi'

// eslint-disable-next-line import/extensions
import LisContract from './ngo-lis.json'

export const useStakeWStEth = (ngoAddress: string) => {
  const { writeContractAsync, isSuccess, isPending } = useWriteContract()

  const stakeWStEth = (amount: bigint, percent: number) => {
    return writeContractAsync({
      address: ngoAddress as `0x${string}`,
      abi: LisContract.abi,
      functionName: 'stakeWStEth',
      args: [amount, percent],
    })
  }

  return { stakeWStEth, isSuccess, isPending }
}
