import { useMachine } from '@xstate/react'
import { buttonProps } from '../StyleProps'
import { contentMachine } from '../../machine/contentMachine'
import Table, { tableExtractor } from '../stuff/Table'

// Table property
const tableHeader = ['id', 'userId', 'title', 'body']

// Rendering
const Content = () => {
  const [current, send] = useMachine(contentMachine, {
    services: {
      // some/api/${e.query}
      fetchData: () =>
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
