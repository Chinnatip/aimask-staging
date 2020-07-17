// import { useCallback } from 'react'
import { createStore } from 'hooksy'
import { profileData } from '../components/static/index'

interface UserProfile {
  name: string
  picture: string
  feature_video: string
  follower: number
}

export const [useStore] = createStore<UserProfile>(profileData)

export function useProfile() {
  const [profile, setProfile] = useStore()

  return {
    profile,
    setProfile,
  }
}
