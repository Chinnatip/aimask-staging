// import { Machine, assign } from 'xstate'

// // Content Machine
// export const state = Machine<Context>({
//   id: 'fetch',
//   initial: 'loading',
//   context: {
//     page: 'dashboard',
//   },
//   states: {
//     idle: {
//       on: { FETCH: 'loading' },
//     },
//     loading: {
//       on: {
//         DASHBOARD: {
//           actions: [assign({ page: (_) => 'dashboard' })],
//         },
//         TABLE: {
//           actions: [assign({ page: (_) => 'table' })],
//         },
//         CALENDAR: {
//           actions: [assign({ page: (_) => 'calendar' })],
//         },
//         ACCOUNT: {
//           actions: [assign({ page: (_) => 'account' })],
//         },
//         SUPPORT: {
//           actions: [assign({ page: (_) => 'support' })],
//         },
//       },
//     },
//     success: {
//       on: {
//         RELOAD: 'idle',
//       },
//       type: 'final',
//     },
//     failure: {
//       on: {
//         RETRY: 'loading',
//       },
//     },
//   },
// })
