import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'
import { buttonProps } from '../StyleProps'
import Table, { tableExtractor } from '../stuff/Table'

// Table property
const tableHeader = ['id', 'userId', 'title', 'body']

// Content Machine
const contentMachine = Machine({
  id: 'fetch',
  initial: 'loading',
  context: {
    data: [],
    error: { message: '' },
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
          actions: assign({
            data: (_, event) => event.data,
          }),
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
      // type: 'final',
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
})

// Rendering
const Content = () => {
  const [current, send] = useMachine(contentMachine, {
    services: {
      // some/api/${e.query}
      fetchData: (_, e) =>
        fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) =>
          res.json()
        ),
    },
  })
  switch (current.value) {
    case 'idle':
      return (
        <button
          className={buttonProps}
          onClick={() => send('FETCH', { query: 'something' })}
        >
          Load accountant data
        </button>
      )
    case 'loading':
      return <div>Searching...</div>
    case 'success':
      const tableRows = tableExtractor(current.context.data, tableHeader)
      return (
        <>
          <Table row={tableRows} header={tableHeader} />
          <br />
          <button className={buttonProps} onClick={() => send('RELOAD')}>
            Reload
          </button>
        </>
      )
    case 'failure':
      return (
        <>
          <p>{current.context.error.message}</p>
          <br />
          <button className={buttonProps} onClick={() => send('RETRY')}>
            Reload
          </button>
        </>
      )
    default:
      return null
  }
}

const Dashboard = () => {
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Accountant</h1>

      <Content />
    </main>
  )
}

export default Dashboard
