import {
  faPlus,
  faPaperclip,
  faSuitcase,
} from '@fortawesome/free-solid-svg-icons'

export const navList = [
  {
    path: 'dashboard',
    text: 'Overview',
    fa_icon: faPlus,
  },
  {
    path: 'finance',
    text: 'Finance',
    fa_icon: faPaperclip,
  },
  {
    path: 'support',
    text: 'Support',
    fa_icon: faSuitcase,
  },
]

export const hoverList = [
  {
    text: 'Finance',
    path: 'finance',
  },
  {
    text: 'Support',
    path: 'support',
  },
]
