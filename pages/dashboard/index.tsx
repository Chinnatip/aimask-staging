// Layout
import Layout from '@/LayoutAdmin'
import Overview from '@/dashboard/Overview'
import initialize from 'utils/initialize'
import { Token } from 'interfaces'

type Props = {
  token?: Token
}

// Rendering
const Dashboard = ({ token }: Props) => {
  return (
    <Layout title="Dashboard" current="dashboard" token={token}>
      <Overview />
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const token = initialize(context)
  return {
    props: { token },
  }
}

export default Dashboard
