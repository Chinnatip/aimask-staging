import {
  faPlus,
  faTable,
  faCalendar,
  faPaperclip,
  faSuitcase,
} from '@fortawesome/free-solid-svg-icons'

export const navList = [
  {
    path: 'dashboard',
    text: 'Dashboard',
    fa_icon: faPlus,
  },
  {
    path: 'table',
    text: 'Tables',
    fa_icon: faTable,
  },
  {
    path: 'calendar',
    text: 'Calendar',
    fa_icon: faCalendar,
  },
  {
    path: 'account',
    text: 'Account',
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
    text: 'Account',
    path: 'account',
  },
  {
    text: 'Support',
    path: 'support',
  },
]
