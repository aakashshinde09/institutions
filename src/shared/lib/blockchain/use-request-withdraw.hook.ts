import { useCallback, useEffect, useState } from 'react'
import { createPublicClient, formatEther, formatUnits, http } from 'viem'
import { useAccount, useFeeData, useWriteContract } from 'wagmi'

import { getEthPrice } from '../utils'
// eslint-disable-next-line import/extensions
import NgoContract from './ngo-lis.json'

export const useRequestWithdraw = (ngoAddress: string) => {
  const { writeContractAsync, isPending } = useWriteContract()

  const request = (amount: bigint, stakeId: string) => writeContractAsync({
    address: ngoAddress as `0x${string}`,
    abi: NgoContract.abi,
    functionName: 'requestWithdrawals',
    args: [amount, stakeId]
  })

  return { request, isPending }
}

export const useGetEstimatedRequestWithdrawFee = (
  ngoAddress: string,
  { amount, requestId }: { amount: BigInt; requestId: number },
) => {
  const { data: feeData } = useFeeData()
  const { address, chain } = useAccount()
  const [estimatedStakeGas, setEstimatedStakeGas] = useState(0)
  const [estimatedStakeGasUsd, setEstimatedStakeGasUsd] = useState(0)

  const calculateGas = useCallback(async () => {
    if (!ngoAddress || !amount || !feeData?.gasPrice) return { gasEth: 0, gasUsd: 0 }

    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })

    let estimatedAmount: bigint = BigInt(0)
    try {
      estimatedAmount = await publicClient.estimateContractGas({
        address: ngoAddress as `0x${string}`,
        abi: NgoContract.abi,
        functionName: 'requestWithdrawals',
        account: address as `0x${string}`,
        args: [amount, requestId],
      })
    } catch (error) {
      console.log(error)
    }

    const gasAmount = +formatUnits(estimatedAmount, 0)
    const gasPrice = +formatEther(feeData.gasPrice, 'wei')
    const priorityFee = 0.000_000_001_5 // normal priority = 1.5 gwei

    const gasEth = (gasPrice + priorityFee) * gasAmount
    setEstimatedStakeGas(gasEth)

    const gasUsd = await getEthPrice(gasEth)
    setEstimatedStakeGasUsd(gasUsd)

    return { gasEth, gasUsd }
  }, [ngoAddress, amount, feeData?.gasPrice, chain, address])

  useEffect(() => {
    if (!ngoAddress || !amount) return
    calculateGas()
  }, [amount, calculateGas, ngoAddress])

  return { estimatedStakeGas, estimatedStakeGasUsd, calculateGas }
}
