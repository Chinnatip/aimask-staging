import { Machine, assign } from 'xstate'

interface Context {
  page: string
}

// Content Machine
export const appMachine = Machine<Context>({
  id: 'fetch',
  initial: 'init',
  context: {
    page: 'dashboard',
  },
  states: {
    init: {
      on: {
        DASHBOARD: {
          actions: [assign({ page: (_) => 'dashboard' })],
        },
        TABLE: {
          actions: [assign({ page: (_) => 'table' })],
        },
        CALENDAR: {
          actions: [assign({ page: (_) => 'calendar' })],
        },
        ACCOUNT: {
          actions: [assign({ page: (_) => 'account' })],
        },
        SUPPORT: {
          actions: [assign({ page: (_) => 'support' })],
        },
      },
    },
  },
})
