import { useAccount, useFeeData, useWriteContract } from 'wagmi'

// eslint-disable-next-line import/extensions
import NgoContract from './ngo-lis.json'
import { useState, useCallback, useEffect } from 'react'
import { createPublicClient, http, formatUnits, formatEther } from 'viem'
import { getEthPrice } from '../utils'

export const useStakeStEth = (ngoAddress: string) => {
  const { writeContractAsync, isPending, isSuccess } = useWriteContract()

  const stakeStEth = (amount: bigint, percent: number) =>
    writeContractAsync({
      address: ngoAddress as `0x${string}`,
      abi: NgoContract.abi,
      functionName: 'stakeStEth',
      args: [amount, percent]
    })

  return { stakeStEth, isSuccess, isPending }
}

export const useGetEstimatedStakeStEthFee = (
  ngoAddress: string,
  { percentage, value }: { percentage: number; value: bigint },
) => {
  const { data: feeData } = useFeeData()
  const { address, chain } = useAccount()
  const [estimatedStakeGas, setEstimatedStakeGas] = useState(0)
  const [estimatedStakeGasUsd, setEstimatedStakeGasUsd] = useState(0)

  const calculateGas = useCallback(async () => {
    if (!ngoAddress || !percentage || !value || !feeData?.gasPrice) return 0

    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })

    let estimatedAmount: bigint = BigInt(0)

    try {
      estimatedAmount = await publicClient.estimateContractGas({
        address: ngoAddress as `0x${string}`,
        abi: NgoContract.abi,
        functionName: 'stakeStEth',
        account: address as `0x${string}`,
        args: [value, percentage],
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
  }, [ngoAddress, percentage, value, feeData?.gasPrice, chain, address])

  useEffect(() => {
    if (!percentage || !value) return

    calculateGas()
  }, [ngoAddress, percentage, value, calculateGas])

  return { estimatedStakeGas, estimatedStakeGasUsd }
}
