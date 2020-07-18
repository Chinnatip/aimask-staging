import Chart from 'stuff/Chart'
import Table from 'stuff/Table'
import { buttonProps } from '@/StyleProps'
import { useContent } from 'store'
import { barChartData, lineChartData, tableHead, tableRows } from 'static'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useMachine } from '@xstate/react'

// init LET as state parser
let stateParser: any

const Content = () => {
  const [current, send] = useMachine(useContent, {
    services: {
      fetchData: () =>
        // chane to real API for production !
        fetch(`https://jsonplaceholder.typicode.com/posts`).then((_) => {
          return {
            line: lineChartData,
            bar: barChartData,
            table: { head: tableHead, rows: tableRows },
          }
        }),
    },
  })
  switch (current.value) {
    case 'idle':
      return <h1>Blank</h1>
    case 'loading':
      return <div>Searching...</div>
    case 'success':
      //
      stateParser = current.context.data
      const {
        table: { head, rows },
        line: lineData,
        bar: barData,
      } = stateParser
      return (
        <>
          <div className="flex flex-wrap mt-6">
            <Chart
              title="Monthly Reports"
              type="line"
              data={lineData}
              icon={faCheck}
            />
            <Chart
              title="Resolved Reports"
              type="bar"
              data={barData}
              icon={faPlus}
            />
          </div>
          <Table row={rows} header={head} />
        </>
      )
    case 'failure':
      return (
        <>
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

const Overview = () => {
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Overview</h1>
      <Content />
    </main>
  )
}

export default Overview
