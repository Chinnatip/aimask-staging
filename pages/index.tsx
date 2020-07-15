import Link from 'next/link'
import Layout from '../components/Layout'
import { buttonProps } from '../components/StyleProps'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <button className={buttonProps}>
          <a>About</a>
        </button>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
