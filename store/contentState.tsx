import { Machine, assign } from 'xstate'

interface Context {
  data: object[]
  error: any
}

// Content Machine
export const useContent = Machine<Context>({
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
      },
      // type: 'final', // use final for 'un-editable' state
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
})
