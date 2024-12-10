import { create } from 'zustand'

import { AuthStatusEnum } from '../enums'

interface IAuthStore {
  isLoggedIn: boolean
  storeLogin: () => void
  storeLogout: () => void
  authStatus: AuthStatusEnum
  setAuthStatus: (authStatus: AuthStatusEnum) => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isLoggedIn: false,
  storeLogin: () => set({ isLoggedIn: true, authStatus: AuthStatusEnum.SUCCESS }),
  storeLogout: () => set({ isLoggedIn: false, authStatus: AuthStatusEnum.IDLE }),
  authStatus: AuthStatusEnum.IDLE,
  setAuthStatus: (authStatus) => set({ authStatus }),
}))
