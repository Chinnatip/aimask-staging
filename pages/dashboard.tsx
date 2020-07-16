import { useAppStore } from '../store/index'

import Layout from '../components/LayoutAdmin'
import Footer from '../components/stuff/Footer'

// Dashboard page
import Overview from '../components/dashboard/Overview'
import Account from '../components/dashboard/Account'
import NotFound from '../components/dashboard/NotFound'

type Props = {
  current_page: string
}

const SelectComponent = ({ current_page }: Props) => {
  switch (current_page) {
    case 'dashboard':
      return <Overview />
    case 'account':
      return <Account />
    default:
      return <NotFound />
  }
}

const Page = () => {
  const {
    appState: { page },
  } = useAppStore()
  return (
    <Layout title="Dashboard" current="dashboard">
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <SelectComponent current_page={page} />
        <Footer />
      </div>
    </Layout>
  )
}

export default Page
