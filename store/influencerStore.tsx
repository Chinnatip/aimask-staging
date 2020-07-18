// import { useCallback } from 'react'
import { createStore } from 'hooksy'
import { influencerData } from 'static'
import { InfluencerProfile } from 'interfaces'

export const [influencerStore] = createStore<InfluencerProfile>(influencerData)

export function useInfluencer() {
  const [profile, setProfile] = influencerStore()

  return {
    profile,
    setProfile,
  }
}
