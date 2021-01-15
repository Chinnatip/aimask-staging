import Layout from '@/layout/Layout'


const Page = () => {
  // const [activeRoute] = useState<string[]>([])

  return (
    <Layout current="aboutus" title="DeepCare - Covid Map">
      <div className="mx-32 pt-24">
        <h1>about US</h1>
      </div>

    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}


export default Page
