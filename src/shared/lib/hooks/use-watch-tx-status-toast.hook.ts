import toast from 'react-hot-toast'
import { createPublicClient, http } from 'viem'
import { useAccount } from 'wagmi'

export const useWatchTxStatusToast = () => {
  const { chain } = useAccount()

  const watchTxStatusToast = (txHash: string) => {
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })

    const promise = publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    })
    toast.promise(promise, {
      loading: 'Transaction in progress',
      success: 'Transaction completed',
      error: 'Transaction failed',
    })
  }

  return { watchTxStatusToast }
}
