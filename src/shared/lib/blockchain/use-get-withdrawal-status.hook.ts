// eslint-disable-next-line import/extensions
import TokenContract from '@shared/lib/blockchain/holesky-token-contract.json'
import { useReadContract } from 'wagmi'

export interface WithdrawStatus {
  amountOfShares: bigint
  amountOfStETH: bigint
  isClaimed: boolean
  isFinalized: boolean
  owner: string
  timestamp: bigint
}


// Only for holesky testnet
export const useGetWithdrawalStatusQuery = (requestIds: string[] | number[]) => {
  return useReadContract<any, "view", any>({
    address: process.env.NEXT_PUBLIC_WITHDRAWAL_CONTRACT_ADDRESS! as `0x${string}`,
    abi: TokenContract.abi,
    functionName: 'getWithdrawalStatus',
    args: [requestIds]
  })
}
