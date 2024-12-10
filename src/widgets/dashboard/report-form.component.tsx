import { cn } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'
import { DatePickerInput } from '@mantine/dates'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
}

export const ReportForm: React.FC<Props> = ({ className }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const router = useRouter()

  const onGetReportClick = () => {
    if (!startDate && !endDate) return
    router.push(
      `/report?start-date=${startDate?.toISOString()}&end-date=${endDate?.toISOString()}`,
    )
  }

  const isError = startDate?.getTime()! > endDate?.getTime()!

  return (
    <div
      className={cn(
        className,
        'flex flex-col rounded-[1.25rem] bg-white px-4 py-4 justify-between gap-4 max-md:p-4',
      )}
    >
      <p className="font-semibold max-md:text-sm max-md:font-normal">
        You can generate report for your Rewards & Donations
      </p>
      <div className="grid grid-cols-2 gap-8">
        <DatePickerInput
          label="Start date"
          error={isError ? "Start date can't be more than end date" : ''}
          value={startDate}
          onChange={setStartDate}
        />
        <DatePickerInput label="End date" value={endDate} onChange={setEndDate} />
      </div>

      <Button
        className="w-fit normal-case px-7 py-[0.3rem]"
        disabled={isError || !startDate || !endDate}
        onClick={onGetReportClick}
      >
        Generate report
      </Button>
    </div>
  )
}
