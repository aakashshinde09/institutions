import { useAuthStore } from '@shared/lib/stores'
import { removeTokens } from '@shared/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useDisconnect } from 'wagmi'

export const useLogout = () => {
  const { storeLogout } = useAuthStore()
  const { disconnect } = useDisconnect()
  const queryClient = useQueryClient()

  return () => {
    storeLogout()
    disconnect()
    removeTokens()
    queryClient.removeQueries()
  }
}
