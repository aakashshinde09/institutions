import { ConnectWalletButton } from '@features/connect-wallet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetUserNgoQuery } from '@shared/api'
import {
  useClaimStEth,
  useClaimWStEth,
  useGetEstimatedRequestWithdrawFee,
  useGetUserBalance,
  useRequestWithdraw,
} from '@shared/lib/blockchain'
import { elementIds } from '@shared/lib/enums'
import { TickerEnum } from '@shared/lib/enums/ticker.enum'
import { useHasMounted, useWatchTxStatusToast } from '@shared/lib/hooks'
import { useGetStEthByWstEth } from '@shared/lib/hooks/use-get-st-eth-by-wst-eth.hook'
import { useAuthStore } from '@shared/lib/stores'
import { Button } from '@shared/ui/button'
import { FormInput, LabelWithAllButton } from '@shared/ui/input'
import { NgoDropdown } from '@shared/ui/ngo-dropdown'
import { StakeDropdown } from '@shared/ui/ngo-dropdown'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { formatUnits, parseEther } from 'viem'
import { z } from 'zod'

interface IWithdrawRequestFormProperties {
  setEstGasPrice: (value: number) => void
  ticker: TickerEnum
}

const requestSchema = z.object({
  stakeId: z.string(),
  socialImpact: z.string(),
  amount: z.coerce.string(),
})

type FormFields = z.infer<typeof requestSchema>

export const WithdrawRequestForm = ({
  ticker,
  setEstGasPrice,
}: IWithdrawRequestFormProperties) => {
  const mounted = useHasMounted()
  const { isLoggedIn } = useAuthStore()
  const { data: ngoList } = useGetUserNgoQuery(isLoggedIn, true)
  const {
    handleSubmit,
    formState,
    control,
    setValue,
    getValues,
    trigger,
    setError,
    watch,
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      stakeId: undefined,
      socialImpact: undefined,
      amount: '' as any,
    },
  })

  const selectedNgo = ngoList?.data.find(
    (item) => Number(item.id) === +getValues('socialImpact'),
  )
  const { data: stakeBalance } = useGetUserBalance(
    selectedNgo?.ngoAddress ?? '',
    parseInt(getValues('stakeId')),
  )

  const { data: stEthBalance } = useGetStEthByWstEth(stakeBalance || BigInt(0))
  
  const { request, isPending: isRequestPending } = useRequestWithdraw(
    selectedNgo?.ngoAddress ?? '',
  )

  const { claimStEth, isPending: isClaimPending } = useClaimStEth(
    selectedNgo?.ngoAddress ?? '',
  )
  const { claimWStEth } = useClaimWStEth(selectedNgo?.ngoAddress ?? '')

  const getBalance = () => {
    if (ticker === TickerEnum.W_ST_ETH)
      return formatUnits((stEthBalance ?? BigInt(0)).valueOf(), 18)
    else return formatUnits((stakeBalance ?? BigInt(0)).valueOf(), 18)
  }

  const { estimatedStakeGasUsd } = useGetEstimatedRequestWithdrawFee(
    selectedNgo?.ngoAddress ?? '',
    {
      amount: parseEther(watch('amount').toString()),
      requestId: parseInt(getValues('stakeId')),
    },
  )

  const sortedStakes = selectedNgo?.stakes
    ?.sort((a, b) => a.customStakeId - b.customStakeId)
    .filter(({ balance }) => balance != 0)

  const { watchTxStatusToast } = useWatchTxStatusToast()

  const onSubmit = async (data: FormFields) => {
    if (selectedNgo && Number(data.amount) > Number(stakeBalance)) {
      setError('amount', { message: 'Not enough funds' })
      return
    }

    try {
      let amount = parseEther(data.amount)
      const { stakeId } = data

      let hash

      if (ticker === TickerEnum.ST_ETH) {
        hash = await claimStEth(amount, stakeId)
      } else if (ticker === TickerEnum.W_ST_ETH) {
        hash = await claimWStEth(amount, stakeId)
      } else {
        hash = await request(amount, stakeId)
      }

      watchTxStatusToast(hash)
      reset()
    } catch (error) {
      console.log(error)
      toast.error('Error while requesting funds')
    }
  }

  const formatRequestAmount = (amount: number | string) => {
    let amountStr = amount as string
    if (typeof amount === 'number') amountStr = amount.toString()
    let [num, multiplier] = amountStr.split('e-')
    if (multiplier) {
      // Remove point
      num = num?.split('.').join('')

      return `0.${'0'.repeat(Number(multiplier) - 1)}${Number(num)}`
    }

    return amountStr
  }

  const isERC20ETH = ticker === TickerEnum.ST_ETH || ticker === TickerEnum.W_ST_ETH

  useEffect(() => {
    if (estimatedStakeGasUsd) {
      setEstGasPrice(estimatedStakeGasUsd)
    }
  }, [estimatedStakeGasUsd, setEstGasPrice])

  if (!mounted) return null

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 max-md:space-y-4">
        <NgoDropdown
          data-stake
          label="Donations and rewards"
          value={getValues('socialImpact')}
          setValue={(value) => {
            setValue('socialImpact', value)
            trigger('socialImpact')
          }}
          data={ngoList?.data ?? []}
          error={formState.errors.socialImpact?.message}
        />

        {getValues('socialImpact') && (
          <StakeDropdown
            label="Stakes"
            value={getValues('stakeId')}
            setValue={(value) => {
              setValue('stakeId', value)
              trigger('stakeId')
            }}
            data={sortedStakes ?? []}
            error={formState.errors.stakeId?.message}
          />
        )}

        <FormInput
          name="amount"
          control={control}
          label={`${ticker} Amount`}
          placeholder="0"
          type="number"
          rightLabel={
            <LabelWithAllButton
              amount={formatRequestAmount(getBalance() ?? 0)}
              onClick={() => {
                setValue('amount', getBalance())
                trigger('amount')
              }}
            />
          }
          error={formState.errors.amount?.message}
        />

        <div className="text-base max-md:text-sm">
          <p className="font-semibold text-gray">Be careful</p>
          <p className="mt-3 max-md:mt-2">
            Withdrawal of funds will change the amounts donated.
          </p>
        </div>

        {isLoggedIn ? (
          <Button
            type="submit"
            className="w-full"
            disabled={isRequestPending || isClaimPending}
            id={elementIds.REQUEST_FUNDS_BTN}
          >
            {isERC20ETH ? 'Claim' : 'Request funds'}
          </Button>
        ) : (
          <ConnectWalletButton className="[&>button]:w-full" />
        )}
      </div>
    </form>
  )
}
