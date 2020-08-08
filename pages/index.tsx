import Layout from '@/layout/Layout'
import initialize from 'utils/initialize'
import { Token } from 'interfaces'
import CourseSet from '@/stuff/CourseSet'
import ActivitySet from '@/stuff/ActivitySet'

import { learnUpskillPlaylists } from '@/static/playlist/LearnUpskill'
import { learnWithFriendPlaylists } from '@/static/playlist/LearnWithFriend'
import { activityLists } from '@/static/activity/ActivityLists'

type Props = {
  token?: Token
}

const IndexPage = ({ token }: Props) => {
  return (
    <Layout
      current="home"
      title="Torch - More than lighting your way"
      token={token}
    >
      <main className="p-20 pt-12 mb-12 max-w-screen-xl m-auto">
        <div className="w-full mb-12">
          <input
            className="lg:w-8/12 shadow appearance-none border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="วันนี้คุณอยากเรียนรู้อะไร ?"
          />
          <button className="lg:w-2/12 ml-4 button-accent text-white font-bold py-3 px-4 rounded-lg">
            ค้นหา
          </button>
        </div>

        <div className="my-4 -mx-4 mb-10">
          <CourseSet data={learnUpskillPlaylists} banner={false} />
        </div>

        <div className="my-4 -mx-4 mb-10 mr-10">
          <ActivitySet data={activityLists} title="ออกไปเจอประสบการณ์จริง" />
        </div>

        <div className="my-4 -mx-4 mb-10">
          <CourseSet data={learnWithFriendPlaylists} banner={false} />
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const token = initialize(context)
  return {
    props: { token },
  }
}

export default IndexPage
