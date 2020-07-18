import { GetStaticProps } from 'next'
import { User } from '../../interfaces'
import { userLists } from '../../components/static/index'
import List from '../../components/List'
import Layout from '../../components/Layout'
import Navbar from '../../components/stuff/Navbar'
import { useProfile } from '../../store/index'

type Props = {
  items: User[]
}

const WithStaticProps = ({ items }: Props) => {
  const {
    profile: { login },
  } = useProfile()
  return (
    <Layout title="User list">
      <header>
        <Navbar login={login} />
      </header>
      <div className="p-20">
        <h1 className="text-4xl">Users List</h1>
        <p>
          Example fetching data from inside <code>getStaticProps()</code>.
        </p>
        <p>You are currently on: /users</p>
        <List items={items} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = userLists
  return { props: { items } }
}

export default WithStaticProps
