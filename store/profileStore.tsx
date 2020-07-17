// import { useCallback } from 'react'
import { createStore } from 'hooksy'
import { profileData } from '../components/static/index'

interface Follower {
  facebook?: number
  instagram?: number
  youtube?: number
}

interface UserProfile {
  name: string
  picture: string
  cover_image: string
  feature_video: string
  description: string
  follower: Follower
  tags: string[]
}

export const [useStore] = createStore<UserProfile>(profileData)

export function useProfile() {
  const [profile, setProfile] = useStore()

  return {
    profile,
    setProfile,
  }
}
