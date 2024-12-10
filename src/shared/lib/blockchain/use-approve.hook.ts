import { useWriteContract } from 'wagmi'

// eslint-disable-next-line import/extensions
import LidoContract from './lido.json'

export const useApprove = (lidoAddress: string) => {
  const { writeContractAsync, isSuccess, isPending } = useWriteContract()

  const approve = (address: string, amount: bigint) =>
    writeContractAsync({
      address: lidoAddress as `0x${string}`,
      abi: LidoContract.abi,
      functionName: 'approve',
      args: [address, amount],
    })

  return { approve, isSuccess, isPending }
}
