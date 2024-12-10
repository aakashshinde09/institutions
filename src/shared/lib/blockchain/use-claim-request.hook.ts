import { useCallback, useEffect, useState } from 'react'
import { createPublicClient, formatEther, formatUnits, http } from 'viem'
import { useAccount, useFeeData, useWriteContract } from 'wagmi'

import { getEthPrice } from '../utils'
import NgoContract from './ngo-lis.json'

export const useClaimRequest = (ngoAddress: string) => {
  const { writeContractAsync, isPending } = useWriteContract()

  const claim = (id: number) =>
    writeContractAsync({
      address: ngoAddress as `0x${string}`,
      abi: NgoContract.abi,
      functionName: 'claimWithdrawal',
      args: [id],
    })

  return { claim, isPending }
}

export const useGetEstimatedClaimFee = (
  ngoAddress: string,
  { requestId }: { requestId: string },
) => {
  const { data: feeData } = useFeeData()
  const { address } = useAccount()
  const [estimatedStakeGas, setEstimatedStakeGas] = useState(0)
  const [estimatedStakeGasUsd, setEstimatedStakeGasUsd] = useState(0)
  const { chain } = useAccount()

  const calculateGas = useCallback(async () => {
    if (!ngoAddress || !requestId || !feeData?.gasPrice) return { gasEth: 0, gasUsd: 0 }

    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })

    let estimatedAmount: bigint = BigInt(0)
    try {
      estimatedAmount = await publicClient.estimateContractGas({
        address: ngoAddress as `0x${string}`,
        abi: NgoContract.abi,
        functionName: 'claimWithdrawal',
        account: address as `0x${string}`,
        args: [requestId],
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
  }, [ngoAddress, requestId, feeData?.gasPrice, chain, address])

  useEffect(() => {
    if (!ngoAddress || !requestId) return
    calculateGas()
  }, [requestId, calculateGas, ngoAddress])

  return { estimatedStakeGas, estimatedStakeGasUsd, calculateGas }
}
