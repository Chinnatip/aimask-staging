import List from 'stuff/List'
import Layout from '@/layout/Layout'
import { GetStaticProps } from 'next'
import { User } from 'interfaces'
import { userLists } from 'static'

type Props = {
  items: User[]
}

const WithStaticProps = ({ items }: Props) => {
  return (
    <Layout title="User list" ssg>
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
