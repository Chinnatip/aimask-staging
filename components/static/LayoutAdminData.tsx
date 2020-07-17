import {
  faGlobe,
  faIdCard,
  faCoins,
  faHandHoldingHeart,
} from '@fortawesome/free-solid-svg-icons'

export const navList = [
  {
    path: 'dashboard',
    text: 'Overview',
    fa_icon: faGlobe,
  },
  {
    path: 'finance',
    text: 'Finance',
    fa_icon: faCoins,
  },
  {
    path: 'profile',
    text: 'Profile',
    fa_icon: faIdCard,
  },
  {
    path: 'support',
    text: 'Support',
    fa_icon: faHandHoldingHeart,
  },
]

export const hoverList = [
  {
    text: 'Finance',
    path: 'finance',
  },
  {
    text: 'Profile',
    path: 'profile',
  },
  {
    text: 'Support',
    path: 'support',
  },
]
