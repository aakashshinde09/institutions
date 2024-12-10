import { userController } from '../client.config'

export const getUserReport = async (
  reportType: 0 | 1,
  startDate: string,
  endDate: string,
) => {
  const response = await userController.userControllerGetUserReport(
    {
      reportType,
      startDate,
      endDate,
    },
    { format: 'blob' },
  )
  return response.data
}
