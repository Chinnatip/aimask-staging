import Chart from '../element/Chart'
import Table from '../element/Table'
import { tableHead, tableRows } from '../static/MockupTable'

const Dashboard = () => {
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">Dashboard</h1>

      <div className="flex flex-wrap mt-6">
        <Chart title="Monthly Reports" canvas_id="chartOne" icon="plus" />
        <Chart title="Resolved Reports" canvas_id="chartTwo" icon="check" />
      </div>

      <Table row={tableRows} header={tableHead} />
    </main>
  )
}

export default Dashboard
