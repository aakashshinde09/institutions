import { useWriteContract } from 'wagmi'

// eslint-disable-next-line import/extensions
import LisContract from './ngo-lis.json'

export const useClaimWStEth = (ngoAddress: string) => {
  const { writeContractAsync, isSuccess, isPending } = useWriteContract()

  const claimWStEth = (amount: bigint, id: string) => {
    return writeContractAsync({
      address: ngoAddress as `0x${string}`,
      abi: LisContract.abi,
      functionName: 'claimWithdrawInWStEth',
      args: [amount, id],
    })
  }

  return { claimWStEth, isSuccess, isPending }
}
