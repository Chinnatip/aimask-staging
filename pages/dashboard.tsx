import Layout from '../components/LayoutAdmin'
import Chart from '../components/Element/Chart'
import Table from '../components/Element/Table'
import Footer from '../components/Element/Footer'
import { tableHead, tableRows } from '../components/static/MockupTable'

const Page = () => (
  <Layout title="Dashboard" current="dashboard">
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black pb-6">Dashboard</h1>

        <div className="flex flex-wrap mt-6">
          <Chart title="Monthly Reports" canvas_id="chartOne" icon="fa-plus" />
          <Chart
            title="Resolved Reports"
            canvas_id="chartTwo"
            icon="fa-check"
          />
        </div>

        <Table row={tableRows} header={tableHead} />
      </main>
      <Footer />
    </div>
  </Layout>
)

export default Page
