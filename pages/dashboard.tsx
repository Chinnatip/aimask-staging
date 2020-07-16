import Layout from '../components/LayoutAdmin'
import Footer from '../components/stuff/Footer'

// Dashboard page
import Overview from '../components/dashboard/Overview'

const Page = () => (
  <Layout title="Dashboard" current="dashboard">
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <Overview />
      <Footer />
    </div>
  </Layout>
)

export default Page
