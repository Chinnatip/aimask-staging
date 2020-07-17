import Chart from '../stuff/Chart'
import Table from '../stuff/Table'
import { tableHead, tableRows } from '../static/MockupTable'
import { lineChartData, barChartData } from '../static/ChartData'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Dashboard</h1>

      <div className="flex flex-wrap mt-6">
        <Chart
          title="Monthly Reports"
          type="line"
          data={lineChartData}
          icon={faCheck}
        />
        <Chart
          title="Resolved Reports"
          type="bar"
          data={barChartData}
          icon={faPlus}
        />
      </div>

      <Table row={tableRows} header={tableHead} />
    </main>
  )
}

export default Dashboard
