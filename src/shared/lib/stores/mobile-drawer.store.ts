import { create } from 'zustand'

type MobileDrawerView = 'nav' | 'wallet'

interface MobileDrawerStore {
  isOpen: boolean
  open: () => void
  close: () => void
  view: MobileDrawerView
  setView: (view: MobileDrawerView) => void
}

export const useMobileDrawerStore = create<MobileDrawerStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  view: 'nav',
  setView: (view) => set({ view }),
}))
