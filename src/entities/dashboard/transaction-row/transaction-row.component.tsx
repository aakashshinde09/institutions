import type { TransactionLookup } from '@api/data-contracts'
import { trxType } from '@shared/lib/constants'
import { cn, formatDate, formatNumber, scannerLink, shortenWallet } from '@shared/lib/utils'
import { CopyButton } from '@shared/ui/copy-button'

interface ITransactionRowProperties {
  data: TransactionLookup
  className?: string
}

export const TransactionRow = ({ data, className }: ITransactionRowProperties) => {  
  return (
    <tr className={cn('tableRow', className)}>
      <td className="text-muted">{formatDate(data.blockTimestamp * 1000, false)}</td>
      <td>{trxType.get(data.transactionType)}</td>
      <td>
        <div className="flex items-center gap-1">
          <span>{shortenWallet(data.fromAddress)}</span>
          <CopyButton value={data.fromAddress} />
        </div>
      </td>
      <td>
        <div className="flex items-center gap-1">
          <span>{shortenWallet(data.toAddress)}</span>
          <CopyButton value={data.toAddress} />
        </div>
      </td>
      <td title={`${data.ethAmount} stETH`}>{formatNumber(data.ethAmount)} stETH</td>
      <td title={`${data.networkFee} stETH`}>{formatNumber(data.networkFee)} stETH</td>
      <td>
        <div className="flex items-center gap-1">
          <a href={scannerLink('tx', data.hash)} target='_blank'>{shortenWallet(data.hash)}</a>
          <CopyButton value={data.hash} />
        </div>
      </td>
    </tr>
  )
}
