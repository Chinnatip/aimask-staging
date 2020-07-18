import { faGlobe, faIdCard, faCoins } from '@fortawesome/free-solid-svg-icons'

export const navList = [
  {
    path: '/dashboard',
    text: 'Overview',
    fa_icon: faGlobe,
  },
  {
    path: '/dashboard/finance',
    text: 'Finance',
    fa_icon: faCoins,
  },
  {
    path: '/dashboard/profile',
    text: 'Profile',
    fa_icon: faIdCard,
  },
]

export const hoverList = [
  {
    text: 'Profile',
    path: '/dashboard/profile',
  },
  {
    text: 'Sign out',
    path: '/sign-out',
  },
]
