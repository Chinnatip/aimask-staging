import { useAppStore } from '../store/index'

// Layout
import Layout from '../components/LayoutAdmin'
import Footer from '../components/stuff/Footer'

// Dashboard page
import Overview from '../components/dashboard/Overview'
import Account from '../components/dashboard/Account'
import NotFound from '../components/dashboard/NotFound'

type Props = {
  current_page: string
}

// Page filtering
const Page = ({ current_page }: Props) => {
  switch (current_page) {
    case 'dashboard':
      return <Overview />
    case 'account':
      return <Account />
    default:
      return <NotFound />
  }
}

// Rendering
const Dashboard = () => {
  const {
    appState: { page },
  } = useAppStore()
  return (
    <Layout title="Dashboard" current="dashboard">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <Page current_page={page} />
        <Footer />
      </div>
    </Layout>
  )
}

export default Dashboard
