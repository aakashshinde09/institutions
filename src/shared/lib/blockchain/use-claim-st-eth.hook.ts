import { useWriteContract } from 'wagmi'

// eslint-disable-next-line import/extensions
import LisContract from './ngo-lis.json'

export const useClaimStEth = (ngoAddress: string) => {
  const { writeContractAsync, isSuccess, isPending } = useWriteContract()

  const claimStEth = (amount: bigint, id: string) =>{
    return writeContractAsync({
      address: ngoAddress as `0x${string}`,
      abi: LisContract.abi,
      functionName: 'claimWithdrawInStEth',
      args: [amount, id],
    })}

  return { claimStEth, isSuccess, isPending }
}
