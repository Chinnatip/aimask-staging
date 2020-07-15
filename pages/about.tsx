import Link from 'next/link'
import Layout from '../components/Layout'
import { buttonProps } from '../components/StyleProps'

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <button className={buttonProps}>
          <a>Go home</a>
        </button>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
