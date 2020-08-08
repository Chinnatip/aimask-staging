import initialize from 'utils/initialize'
import Layout from '@/layout/Layout'
import { Token } from 'interfaces'

type Props = {
  token?: Token
}

const AboutPage = ({ token }: Props) => {
  // const {
  //   profile: { login },
  // } = useProfile()
  return (
    <Layout
      current="playlist"
      title="Torch - เลือกรายการเพลย์ลิสต์"
      token={token}
    >
      <div className="p-20">
        <h1 className="text-4xl">Playlist</h1>
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
