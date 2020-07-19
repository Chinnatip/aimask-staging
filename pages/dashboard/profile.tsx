// Layout
import Layout from '@/layout/LayoutAdmin'
import Profile from '@/dashboard/Profile'
import initialize from 'utils/initialize'
import { Token } from 'interfaces'

type Props = {
  token?: Token
}

// Rendering
const Dashboard = ({ token }: Props) => {
  return (
    <Layout title="Influencer Profile" current="dashboard" token={token}>
      <Profile />
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
