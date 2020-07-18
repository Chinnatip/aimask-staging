import Layout from '../components/Layout'
import Navbar from '../components/stuff/Navbar'
import { useProfile } from '../store/index'

const AboutPage = () => {
  const {
    profile: { login },
  } = useProfile()
  return (
    <Layout title="About us">
      <header>
        <Navbar login={login} />
      </header>
      <div className="p-20">
        <h1 className="text-4xl">About</h1>
        <p>This is the about page</p>
      </div>
    </Layout>
  )
}

export default AboutPage
