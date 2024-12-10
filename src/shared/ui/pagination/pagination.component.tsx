import type { PaginationProps } from '@mantine/core'
import { Pagination } from '@mantine/core'

interface IPaginationProperties extends PaginationProps {}

export const CustomPagination = ({ ...props }: IPaginationProperties) => {
  return (
    <Pagination
      {...props}
      withControls={false}
      size="sm"
      gap={4}
      classNames={{
        root: 'flex',
        control:
          'text-base font-semibold border-none bg-transparent p-0 text-black data-[active=true]:text-primary',
        dots: 'items-end',
      }}
    />
  )
}
