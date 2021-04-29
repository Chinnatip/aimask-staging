import Bar from '../components/chart/NivoBar'
import { Navbar } from './present'
import { useState, useEffect } from 'react'
import { mainData } from '../components/static/aimask_static'
import {
  DistrictType, MarkerType,
  reportParse,
  parseDistrict,
  parseLocation,
  readCSV
} from '../components/strategy/daily'

const Page = () => {
  const [ district, setDistrictData ] = useState<DistrictType[]>([])
  const [report, setReport] = useState<any>({})
  const [data, setData] = useState({
    daily_report: '',
    previous_period: '',
    result: {
      total: 0,
      correct_percent: 0,
      in_correct_percent: 0,
      no_mask_percent: 0,
      district: 0,
      camera: 0
    },
    sort_district:{
      red:  [''],
      yellow: ['']
    }
  })

  useEffect(() => {
    (async () => {
      // Collect District
      const district: any = await readCSV('export_district')
      const [ r, ...rows ] = district.data
      console.log(r)
      let objects : DistrictType[] = []
      parseDistrict( rows, objects )
      setDistrictData(objects)

      // Collect District
      const location: any = await readCSV('export_location')
      const [ lr, ...lrows ] = location.data
      console.log(lr)
      let locationObjects : MarkerType[] = []
      parseLocation( lrows, locationObjects )
      setData(mainData(locationObjects))

      // Collect report
      const report: any = await readCSV('initial')
      setReport(reportParse(report))
    })()
  }, []);
  const barData = district.map(row => {
    return {
      'เขต': row['เขต'],
      'ไม่ใส่': row['error'],
      'total': row['จำนวนประชากร'],
      'correct': row['ใส่หน้ากาก'],
      'color':  row['error'] < 5 ? '#749E42' :
                row['error'] < 10 ? '#F3C042' : '#FF0000',
    }
  })
  const { result } = data
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden " style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full flex">
      <div className="h-full w-1/2 relative mr-4 border-r-8 flex flex-col relative">
        <div className="h-20 bg-gray-300 w-full flex items-center px-4">
          <div className="w-2/5">
            <p>รายงานประจำวันที่</p>
            <p className="ml-0 font-bold text-3xl -mt-2">{report?.today?.text}</p>
          </div>
          <div className="ml-4 w-3/ border-l-4 border-gray-400 font-bold text-lg">
            <p className="ml-4">ประเมินการ</p>
            <p className="ml-4 text-xl"><span className="text-green-600">ใส่หน้ากากอนามัย</span> ของ {result.district} เขต ใน กทม. </p>
          </div>
        </div>
        <span className="text-3xl m-auto font-semibold underline mt-8 -mb-4">การใส่หน้ากากอนามัยแยกตามเขตพื้นที่</span>
        <img src={`https://drive.google.com/uc?export=view&id=${report?.district_image}`} className="m-auto" style={{width:'85%'}} alt=""/>
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
            * วิเคราะห์จากกล้องวงจรปิดทั้งหมด {result.camera} จุดในกรุงเทพมหานครฯ
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
