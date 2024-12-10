import { useSearchParams } from 'next/navigation'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { Button } from '@shared/ui/button'
import { useEffect, useState } from 'react'
import { getUserReport } from '@shared/api'
import { saveAs } from 'file-saver'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const Report = () => {
  const searchParams = useSearchParams()

  const startDate = searchParams?.get('start-date')
  const endDate = searchParams?.get('end-date')

  const [file, setFile] = useState<File | null>(null)
  const [pagesCount, setPagesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const dateFormatter = (dateStr: string) => {
    const addNull = (num: number) => {
      return num.toString().length === 1 ? `0${num.toString()}` : num.toString()
    }
    const date = new Date(dateStr)    

    const day = date.getDate()

    const month = date.getMonth() + 1

    const year = date.getFullYear()

    return `${addNull(day)}.${addNull(month)}.${year}`
  }

  useEffect(() => {
    if (file) {
      return
    }

    const getReport = async () => {
      try {
        if (!searchParams) {
          throw new Error('Search params are unavailable')
        }

        const localStartDate = searchParams.get('start-date')
        const localEndDate = searchParams.get('end-date')

        if (!localStartDate || !localEndDate) {
          throw new Error('One of range dates in invalid')
        }

        const res: Blob = await getUserReport(0, localStartDate, localEndDate)
        const blob = new File([res], 'filename', { type: 'application/pdf' })
        setFile(blob)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getReport()
  }, [searchParams])

  const getName = () => {
    if (!searchParams) return
    const localStartDate = searchParams.get('start-date')
    const localEndDate = searchParams.get('end-date')

    return `LIS_report_${dateFormatter(localStartDate || '')}-${dateFormatter(localEndDate || '')}`
  }

  const onPdfClick = async () => {
    const res = await getUserReport(0, startDate || '', endDate || '')
    const blob = new Blob([res], { type: 'application/pdf' })

    saveAs(blob, `${getName()}.pdf`)
  }

  const onCsvClick = async () => {
    const res = await getUserReport(1, startDate || '', endDate || '')
    const blob = new Blob([res], { type: 'text/csv;charset=utf-8' })

    saveAs(blob, `${getName()}.csv`)
  }

  const pages: number[] = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div className="my-8 flex flex-col items-center justify-center">
      <div className="mb-4">
        <Button className="mr-6" onClick={onPdfClick}>
          Download as pdf
        </Button>
        <Button onClick={onCsvClick}>Download as csv</Button>
      </div>
      {isLoading ? (
        <div>Loading report...</div>
      ) : (
        <Document
          className="flex flex-col gap-4"
          file={file}
          onLoadSuccess={({ numPages }) => setPagesCount(numPages)}
        >
          {pages.map((i) => (
            <Page pageNumber={i} key={i} />
          ))}
        </Document>
      )}
    </div>
  )
}

export default Report
