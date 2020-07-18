// Layout
import Layout from '@/LayoutAdmin'
import Footer from '@/stuff/DashboardFooter'

// Dashboard page
import Finance from '@/dashboard/Finance'

// Rendering
const Dashboard = () => {
  return (
    <Layout title="Dashboard" current="dashboard">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <Finance />
        <Footer />
      </div>
    </Layout>
  )
}

export default Dashboard
