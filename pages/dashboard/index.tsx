// Layout
import Layout from '@/LayoutAdmin'
import Footer from '@/stuff/DashboardFooter'

// Dashboard page
import Overview from '@/dashboard/Overview'

// Rendering
const Dashboard = () => {
  return (
    <Layout title="Dashboard" current="dashboard">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <Overview />
        <Footer />
      </div>
    </Layout>
  )
}

export default Dashboard
