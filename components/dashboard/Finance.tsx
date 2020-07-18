import { useMachine } from '@xstate/react'
import { useContent } from 'store'
import { tableHeader } from 'static'
import Table, { tableExtractor } from 'stuff/Table'

// Rendering
const Content = () => {
  const [current, send] = useMachine(useContent, {
    services: {
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => send('RELOAD')}
          >
            Reload
          </button>
        </>
      )
    case 'failure':
      return (
        <>
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => send('RETRY')}
          >
            Reload
          </button>
        </>
      )
    default:
      return null
  }
}

const Finance = () => {
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Financial account</h1>
      <Content />
    </main>
  )
}

export default Finance
