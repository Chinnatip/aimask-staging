// import { useCallback } from 'react'
import { createStore } from 'hooksy'

interface AppState {
  page: string
}

export const [useStore] = createStore<AppState>({
  page: 'dashboard',
})

export function useAppStore() {
  const [appState, setApp] = useStore()

  return {
    appState,
    setAppState: setApp,
  }
}
