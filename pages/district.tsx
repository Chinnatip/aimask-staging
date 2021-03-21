import {Navbar} from './present'
import Bar from '../components/chart/NivoBar'

const data ={
  report_period: '7 - 17 มีค. 2564',
  previous_period: '20 กพ. - 4 มีค. 2564',
  sampling: 158050,
  total: {
    district: 29,
    camera: 30
  },
  district:{
    red: ['ยานาวา','บางคอแหลม','สาธร','จอมทอง','คลองสาน'],
    yellow: ['ยานาวา','บางคอแหลม','สาธร','จอมทอง','คลองสาน','ยานาวา','บางคอแหลม','สาธร','จอมทอง','คลองสาน','ยานาวา','บางคอแหลม','สาธร','จอมทอง'],
  }
}

const barData = [
  {
    "เขต": "ยานนาวา",
    "ร้อยละใส่": 76.79,
    "ไม่ใส่": 23.21,
    "color": "#FF0000"
  },
  {
    "เขต": "บางคอแหลม",
    "ร้อยละใส่": 87.61,
    "ไม่ใส่": 12.39,
    "color": "#FF0000"
  },
  {
    "เขต": "คลองสาน",
    "ร้อยละใส่": 87.99,
    "ไม่ใส่": 12.01,
    "color": "#FF0000"
  },
  {
    "เขต": "สาทร",
    "ร้อยละใส่": 88.29,
    "ไม่ใส่": 11.71,
    "color": "#FF0000"
  },
  {
    "เขต": "จอมทอง",
    "ร้อยละใส่": 89.61,
    "ไม่ใส่": 10.39,
    "color": "#FF0000"
  },
  {
    "เขต": "สัมพันธวงศ์",
    "ร้อยละใส่": 90.18,
    "ไม่ใส่": 9.82,
    "color": "#F3C042"
  },
  {
    "เขต": "ดอนเมือง",
    "ร้อยละใส่": 90.18,
    "ไม่ใส่": 9.82,
    "color": "#F3C042"
  },
  {
    "เขต": "ป้อมปราบฯ",
    "ร้อยละใส่": 91.21,
    "ไม่ใส่": 8.79,
    "color": "#F3C042"
  },
  {
    "เขต": "สวนหลวง",
    "ร้อยละใส่": 91.56,
    "ไม่ใส่": 8.44,
    "color": "#F3C042"
  },
  {
    "เขต": "พระนคร",
    "ร้อยละใส่": 91.73,
    "ไม่ใส่": 8.27,
    "color": "#F3C042"
  },
  {
    "เขต": "ลาดกระบัง",
    "ร้อยละใส่": 92,
    "ไม่ใส่": 8,
    "color": "#F3C042"
  },
  {
    "เขต": "บางกอกใหญ่",
    "ร้อยละใส่": 92.11,
    "ไม่ใส่": 7.89,
    "color": "#F3C042"
  },
  {
    "เขต": "บางรัก ",
    "ร้อยละใส่": 92.26,
    "ไม่ใส่": 7.74,
    "color": "#F3C042"
  },
  {
    "เขต": "บางกะปิ",
    "ร้อยละใส่": 92.68,
    "ไม่ใส่": 7.32,
    "color": "#F3C042"
  },
  {
    "เขต": "ดุสิต",
    "ร้อยละใส่": 93.42,
    "ไม่ใส่": 6.58,
    "color": "#F3C042"
  },
  {
    "เขต": "หนองแขม",
    "ร้อยละใส่": 93.6,
    "ไม่ใส่": 6.4,
    "color": "#F3C042"
  },
  {
    "เขต": "ภาษีเจริญ",
    "ร้อยละใส่": 93.98,
    "ไม่ใส่": 6.02,
    "color": "#F3C042"
  },
  {
    "เขต": "บางกอกน้อย",
    "ร้อยละใส่": 94,
    "ไม่ใส่": 6,
    "color": "#F3C042"
  },
  {
    "เขต": "บางพลัด",
    "ร้อยละใส่": 94.2,
    "ไม่ใส่": 5.8,
    "color": "#F3C042"
  },
  {
    "เขต": "ราษฎร์บูรณะ",
    "ร้อยละใส่": 94.64,
    "ไม่ใส่": 5.36,
    "color": "#F3C042"
  },
  {
    "เขต": "ราชเทวี",
    "ร้อยละใส่": 95.25,
    "ไม่ใส่": 4.75,
    "color": "#749E42"
  },
  {
    "เขต": "บางแค",
    "ร้อยละใส่": 95.48,
    "ไม่ใส่": 4.52,
    "color": "#749E42"
  },
  {
    "เขต": "ปทุมวัน",
    "ร้อยละใส่": 95.78,
    "ไม่ใส่": 4.22,
    "color": "#749E42"
  },
  {
    "เขต": "บางเขน",
    "ร้อยละใส่": 95.86,
    "ไม่ใส่": 4.14,
    "color": "#749E42"
  },
  {
    "เขต": "บางขุนเทียน",
    "ร้อยละใส่": 95.99,
    "ไม่ใส่": 4.01,
    "color": "#749E42"
  },
  {
    "เขต": "บางนา",
    "ร้อยละใส่": 96.09,
    "ไม่ใส่": 3.91,
    "color": "#749E42"
  },
  {
    "เขต": "ทุ่งครุ",
    "ร้อยละใส่": 96.32,
    "ไม่ใส่": 3.68,
    "color": "#749E42"
  },
  {
    "เขต": "พญาไท",
    "ร้อยละใส่": 97.74,
    "ไม่ใส่": 2.26,
    "color": "#749E42"
  },
  {
    "เขต": "คลองเตย",
    "ร้อยละใส่": 97.84,
    "ไม่ใส่": 2.16,
    "color": "#749E42"
  }
 ]

const Page = () => {
  const { total,report_period } = data
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden " style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full flex">
      <div className="h-full w-1/2 relative mr-4 border-r-8 flex flex-col relative">
        <div className="h-20 bg-gray-300 w-full flex items-center px-8">
          <div className="w-2/5">
            <p>รายงานประจำวันที่</p>
            <p className="ml-4 font-bold text-3xl -mt-2">{report_period}</p>
          </div>
          <div className="w-3/5 border-l-4 border-gray-400 font-bold text-lg">
            <p className="ml-4">ประเมินการ</p>
            <p className="ml-4 text-xl"><span className="text-green-600">ใส่หน้ากากอนามัย</span> ของ {total.district} เขต ใน กทม. </p>
          </div>
        </div>
        <span className="text-3xl m-auto font-semibold underline mt-8 -mb-4">การใส่หน้ากากอนามัยแยกตามเขตพื้นที่</span>
        <img src="technic/bkk_dictrict.png" className="m-auto" style={{width:'85%'}} alt=""/>
        <div className="absolute bottom-0 right-0 mr-12 mb-8">
          <p className="text-xl font-semibold">ร้อยละผู้ใส่หน้ากากอนามัย</p>
          <div>
            <div className="flex items-center my-2">
              <span className="inline-block bg-red-600 w-6 h-6 rounded-full" />
              <span className="text-xl ml-4">น้อยกว่า 90%</span>
            </div>
            <div className="flex items-center my-2">
              <span className="inline-block bg-yellow-500 w-6 h-6 rounded-full" />
              <span className="text-xl ml-4">ระหว่าง 90-95%</span>
            </div>
            <div className="flex items-center my-2">
              <span className="inline-block bg-green-500 w-6 h-6 rounded-full" />
              <span className="text-xl ml-4">มากกว่า 95%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full flex-grow flex flex-col">
        <span className="text-2xl m-auto mt-6 underline font-semibold relative">เขตที่มีการ
          <span className="text-yellow-600"> ใส่หน้ากากผิด</span> +
          <span className="text-red-600"> ไม่ใส่หน้ากาก</span> มากที่สุด
          <div className="absolute right-0 text-sm mt-4" style={{ bottom: '-22px', fontSize: '1rem' }}>
            * วิเคราะห์จากกล้องวงจรปิดทั้งหมด {total.camera} จุดในกรุงเทพมหานครฯ
          </div>
        </span>
        <div className="flex-grow">
          <Bar data={barData.sort((a,b) => a['ไม่ใส่'] - b['ไม่ใส่'])} ></Bar>
        </div>
        <div className="h-2"></div>
      </div>
    </div>
  </div>
}

export default Page
