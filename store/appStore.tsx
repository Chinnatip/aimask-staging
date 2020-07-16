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

  // const logout = useCallback(() => {
  //   if (!confirm('Are you sure?')) {
  //     return
  //   }
  //   setUser(null)
  // }, [setUser])

  return {
    appState,
    setAppState: setApp,
    // logout,
  }
}
