import Layout from "@/layout/Layout"
import PresentDaily from './present_daily'
import DistrictDaily from './district_daily'
import TimeDaily from './time_daily'

const Page = () => {
  return <Layout current="daily_report" title="AiMASK - ะบบปัญญาประดิษฐ์ที่ถูกพัฒนาขึ้นมาเพื่อสนับสนุนการดูแลสุขภาพประชาชน">
    <div className="h-20"/>
    <PresentDaily />
    <div className="h-3"/>
    <DistrictDaily />
    <div className="h-3"/>
    <TimeDaily/>
  </Layout>


}

export default Page
