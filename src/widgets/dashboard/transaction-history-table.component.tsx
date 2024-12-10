import { TransactionMobileRow, TransactionRow } from '@entities/dashboard'
import { Tooltip } from '@mantine/core'
import { useGetTransactionsQuery } from '@shared/api'
import { useHasMounted, useScreenWidth, ViewWidth } from '@shared/lib/hooks'
import { useAuthStore } from '@shared/lib/stores'
import { Pagination } from '@shared/ui/pagination'
import { useMemo, useState } from 'react'

const PER_PAGE = 10

export const TransactionHistoryTable = () => {
  const mounted = useHasMounted()
  const screen = useScreenWidth()
  const { isLoggedIn } = useAuthStore()
  const [page, setPage] = useState(1)
  const { data: txs } = useGetTransactionsQuery(
    { skip: (page - 1) * PER_PAGE, take: 10 },
    isLoggedIn,
  )

  const totalPages = useMemo(() => {
    if (!txs?.data?.totalItems) return 0

    return Math.ceil(txs.data.totalItems / PER_PAGE)
  }, [txs?.data?.totalItems])

  if (!isLoggedIn) {
    return (
      <div className="tableRow flex w-full items-center justify-center">
        Please connect your wallet
      </div>
    )
  }

  return (
    <>
      {mounted && screen === ViewWidth.MOBILE ? (
        <div className="space-y-3">
          {txs?.data?.items?.map((tx) => <TransactionMobileRow key={tx.id} data={tx} />)}
        </div>
      ) : (
        <table className="block w-full">
          <thead className="block w-full">
            <tr className="tableHeader grid grid-cols-[1fr_14%_15%_15%_12%_12%_15%]">
              <th>Date&Time</th>
              <th>Transaction type</th>
              <th>Sender&apos;s wallet</th>
              <th>Recipient&apos;s wallet</th>
              <th>Amount of stETH</th>
              <th>
                <span>Network fee</span>
                <Tooltip
                  label="Gas is the fee required to successfully conduct a transaction or execute a contract on the Ethereum blockchain platform."
                  color="#ffffff"
                  multiline
                  w={220}
                  styles={{ tooltip: { color: 'black', borderRadius: 8 } }}
                >
                  <div className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white cursor-pointer font-medium">
                    i
                  </div>
                </Tooltip>
              </th>
              <th>Transaction hash</th>
            </tr>
          </thead>

          <tbody className="mt-3 block w-full space-y-3">
            {txs?.data?.items?.map((tx) => (
              <TransactionRow
                key={tx.id}
                data={tx}
                className="grid grid-cols-[1fr_14%_15%_15%_12%_12%_15%]"
              />
            ))}
          </tbody>
        </table>
      )}

      {txs?.data?.items?.length === 0 && (
        <div className="tableRow flex w-full items-center justify-center">
          No transactions yet
        </div>
      )}

      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        className="mt-6 md:justify-end"
      />
    </>
  )
}
