import initialize from 'utils/initialize'
import Layout from '@/layout/Layout'
import { Token } from 'interfaces'
// import Navbar from '@/stuff/Navbar'
// import { useProfile } from 'store/index'
import CourseSet from '@/stuff/CourseSet'
import ActivitySet from '@/stuff/ActivitySet'
import Title from '@/stuff/Title'
// import { courseLists } from '@/static/CourseLists'
import { learnChinesePlaylists } from '@/static/playlist/LearnChinese'
import { learnCookingPlaylists } from '@/static/playlist/LearnFood'
import { learnProductivePlaylists } from '@/static/playlist/LearnProductive'
import { activityLists } from '@/static/activity/ActivityLists'
import { pastLists } from '@/static/activity/PastLists'

type Props = {
  token?: Token
}

const AboutPage = ({ token }: Props) => {
  // const {
  //   profile: { login },
  // } = useProfile()
  return (
    <Layout current="about" title="Torch - คลังเเสงของคุณ" token={token}>
      <div className="p-20 pt-12 mb-16 max-w-screen-xl m-auto">
        <Title text="Playlist" />

        <div className="-mx-6 my-4">
          <CourseSet data={learnChinesePlaylists} />
          <div className="mt-16"></div>

          <CourseSet data={learnCookingPlaylists} />
          <div className="mt-16"></div>

          <CourseSet data={learnProductivePlaylists} />

          <div className="my-4 mt-16 mb-10 mr-10">
            <ActivitySet data={activityLists} title="กิจกรรมที่กำลังจะมาถึง" />
          </div>

          <div className="my-4  mb-10 mr-10">
            <ActivitySet data={pastLists} title="กิจกรรมที่ผ่านไปแล้ว" />
          </div>
        </div>
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
