import initialize from 'utils/initialize'
import Layout from '@/Layout'
import { Token } from 'interfaces'
// import Navbar from '@/stuff/Navbar'
// import { useProfile } from 'store/index'

type Props = {
  token?: Token
}

const AboutPage = ({ token }: Props) => {
  // const {
  //   profile: { login },
  // } = useProfile()
  return (
    <Layout title="About us" token={token}>
      <div className="p-20">
        <h1 className="text-4xl">About</h1>
        <p>This is the about page</p>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const token = initialize(context)
  return {
    props: { token },
  }
}

export default AboutPage
