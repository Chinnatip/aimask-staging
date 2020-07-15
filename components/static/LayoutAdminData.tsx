import {
  faPlus,
  faStickyNote,
  faTable,
  faAlignLeft,
  faTabletAlt,
  faCalendar,
  faPaperclip,
  faSuitcase,
} from '@fortawesome/free-solid-svg-icons'

export const navList = [
  {
    path: 'dashboard',
    text: 'Dashboard',
    link_to: '#main',
    fa_icon: faPlus,
  },
  {
    path: 'blank',
    text: 'Blank page',
    link_to: '#blank',
    fa_icon: faStickyNote,
  },
  {
    path: 'table',
    text: 'Tables',
    link_to: '#table',
    fa_icon: faTable,
  },
  {
    path: 'form',
    text: 'Forms',
    link_to: '#form',
    fa_icon: faAlignLeft,
  },
  {
    path: 'tab',
    text: 'Tabbed Content',
    link_to: '#tab',
    fa_icon: faTabletAlt,
  },
  {
    path: 'calendar',
    text: 'Calendar',
    link_to: '#calendar',
    fa_icon: faCalendar,
  },
  {
    path: 'account',
    text: 'Account',
    link_to: '#account',
    fa_icon: faPaperclip,
  },
  {
    path: 'support',
    text: 'Support',
    link_to: '#support',
    fa_icon: faSuitcase,
  },
]

export const hoverList = [
  {
    text: 'Account',
    path: 'account',
    link_to: '#account',
  },
  {
    text: 'Support',
    path: 'support',
    link_to: '#support',
  },
  {
    text: 'Signout',
    path: '',
    link_to: '/sign-out',
  },
]
