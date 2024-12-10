import dayjs from 'dayjs'

export const formatDate = (date: Date | string | number, short = true): string => {
  if (short) {
    return dayjs(date).format('DD/MM/YYYY')
  }

  return dayjs(date).format('DD/MM/YYYY HH:mm')
}
