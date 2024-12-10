import type { TransactionLookup } from '@api/data-contracts'
import { trxType } from '@shared/lib/constants'
import { formatDate, formatNumber, shortenWallet } from '@shared/lib/utils'
import { CaptionItem } from '@shared/ui/caption-item'

interface ITransactionMobileRowProperties {
  data: TransactionLookup
}

export const TransactionMobileRow = ({ data }: ITransactionMobileRowProperties) => {  
  return (
    <div className="rounded-3xl bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {formatDate(data.blockTimestamp * 1000, false)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-y-4">
        <CaptionItem
          title="Transaction type"
          value={trxType.get(data.transactionType)!}
        />
        <CaptionItem title="Transaction hash" value={shortenWallet(data.hash)} withCopy />
        <CaptionItem
          title="Sender's wallet"
          value={shortenWallet(data.fromAddress)}
          withCopy
        />
        <CaptionItem
          title="Recipient's wallet"
          value={shortenWallet(data.toAddress)}
          withCopy
        />
        <CaptionItem
          title="Amount of stETH"
          value={`${formatNumber(data.ethAmount)} stETH`}
        />
        <CaptionItem
          title="Network fee"
          value={`${formatNumber(data.networkFee)} stETH`}
        />
      </div>
    </div>
  )
}
