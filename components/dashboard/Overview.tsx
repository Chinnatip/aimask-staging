import Chart from '../stuff/Chart'
import Table from '../stuff/Table'
import { useMachine } from '@xstate/react'
import { contentState } from '../../store/contentState'
import { tableHead, tableRows } from '../static/MockupTable'
import { buttonProps } from '../StyleProps'
import { barChartData, lineChartData } from '../static/ChartData'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

// init LET as state parser
let stateParser: any

const Content = () => {
  const [current, send] = useMachine(contentState, {
    services: {
      fetchData: () =>
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

const Dashboard = () => {
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Dashboard</h1>
      <Content />
    </main>
  )
}

export default Dashboard
