import { useGetWithdrawRequestsQuery, useGetWithdrawStEthQuery } from '@shared/api'
import {
  useClaimRequest,
  useGetEstimatedClaimFee,
  useGetWithdrawalStatusQuery,
} from '@shared/lib/blockchain'
import { useWatchTxStatusToast } from '@shared/lib/hooks'
import { useAuthStore } from '@shared/lib/stores'
import { Button } from '@shared/ui/button'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { RequestItem } from './request-item.component'
import { useAccount } from 'wagmi'
import { StEthItem } from './st-eth-item.component'

interface IClaimFormProperties {
  setEstGasPrice: (value: number) => void
  isStEth: boolean
}

export const ClaimForm = ({ setEstGasPrice, isStEth }: IClaimFormProperties) => {
  const { address } = useAccount()
  const { isLoggedIn } = useAuthStore()
  const [selected, setSelected] = useState<null | number>(null)
  const { data: requests, refetch: refetchRequests } = useGetWithdrawRequestsQuery(
    { skip: 0, take: 10, status: 1 },
    isLoggedIn,
  )

  const requestIds = useMemo(() => {
    return requests?.data?.items?.map((x) => x.customRequestId) ?? []
  }, [requests?.data?.items])

  const { data: requestStatuses, refetch: refetchRequestsStatuses } =
    useGetWithdrawalStatusQuery(requestIds)

  const { data: withdrawStEth } = useGetWithdrawStEthQuery(
    { skip: 0, take: 10, claimerAddress: address || '' },
    isLoggedIn,
  )
  const withdraewdStEth = withdrawStEth?.data?.items || []

  const requestStatusesWithId = useMemo(() => {
    return (
      (requestStatuses as any[])?.map((x, index) => ({ ...x, id: requestIds[index] })) ??
      []
    )
  }, [requestIds, requestStatuses])

  const selectedRequest = useMemo(() => {
    return requests?.data?.items?.find((x) => x.customRequestId === selected)
  }, [requests?.data?.items, selected])

  const { claim, isPending: isClaimLoading } = useClaimRequest(
    selectedRequest?.ngoAddress ?? '',
  )
  const { estimatedStakeGasUsd } = useGetEstimatedClaimFee(
    selectedRequest?.ngoAddress ?? '',
    { requestId: String(selectedRequest?.customRequestId) ?? '' },
  )
  const { watchTxStatusToast } = useWatchTxStatusToast()

  const isSelectedReady =
    requestStatusesWithId?.find((x) => x.id === selected)?.isFinalized ?? false

  const handleClaim = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const hash = await claim(selectedRequest?.customRequestId || 0)
      watchTxStatusToast(hash)
      await refetchRequests()
      await refetchRequestsStatuses()
    } catch (error) {
      console.log(error)
      toast.error('Error while claiming funds')
    }
  }

  useEffect(() => {
    if (estimatedStakeGasUsd) {
      setEstGasPrice(estimatedStakeGasUsd)
    }
  }, [estimatedStakeGasUsd, setEstGasPrice])

  const isEmpty = isStEth
    ? withdraewdStEth?.length === 0
    : requests?.data?.items?.length === 0

  return (
    <form className="flex h-full flex-col max-md:mt-6" onSubmit={handleClaim}>
      <h4 className="text-xl font-bold">{isStEth ? 'History' : 'Active requests'}</h4>
      <div className="mt-6 max-h-80 space-y-4 overflow-y-auto max-md:space-y-3 pr-3 scroll">
        {isStEth
          ? withdraewdStEth?.length > 0 &&
            withdraewdStEth?.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.1 * (index + 1) }}
              >
                <StEthItem data={request} />
              </motion.div>
            ))
          : requestStatusesWithId?.length > 0 &&
            requestStatusesWithId.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.1 * (index + 1) }}
                onClick={() => setSelected(request.id)}
              >
                <RequestItem active={selected === request.id} data={request} />
              </motion.div>
            ))}
      </div>

      {isEmpty && (
        <div className="text-base max-md:mt-6 max-md:text-sm">
          <p className="font-semibold text-gray">No withdrawal requests detected</p>
          <p className="mt-3">You can create a new request to claim your rewards.</p>
        </div>
      )}

      <div className="mt-2 text-base max-md:mt-6 max-md:text-sm">
        <p className="font-semibold text-gray">Be careful</p>
        <p className="mt-3">Withdrawal of funds will change the amounts donated.</p>
      </div>

      {!isStEth && (
        <Button
          type="submit"
          className="mt-8 w-full max-md:mt-6"
          disabled={!isSelectedReady || requestIds.length === 0 || isClaimLoading}
        >
          Claim rewards
        </Button>
      )}
    </form>
  )
}
