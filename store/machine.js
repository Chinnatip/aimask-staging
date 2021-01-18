import { Machine, assign } from 'xstate'

// Content Machine
export const useContent = Machine({
  id: 'fetch',
  initial: 'loading',
  context: {
    data: [],
    error: {},
  },
  states: {
    idle: {
      on: { FETCH: 'loading' },
    },
    loading: {
      invoke: {
        src: 'fetchData',
        onDone: {
          target: 'success',
          actions: assign({ data: (_, event) => event.data }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (_, event) => event.data,
          }),
        },
      },
    },
    success: {
      on: {
        RELOAD: 'idle',
        RETRY: 'loading',
      },
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
})
