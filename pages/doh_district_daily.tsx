import DohBar from '../components/chart/DohNivoBar'
import { Navbar } from './present'
import { useState, useEffect } from 'react'
import { dohMainData } from '../components/static/aimask_static'
import {
  DohMarkerType, DohDistrictType,
  reportParse,
  parseDohDistrict,
  parseDohLocation,
  readDohCSV
} from '../components/strategy/daily'

const Page = () => {
  const [ district, setDistrictData ] = useState<DohDistrictType[]>([])
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
      const district: any = await readDohCSV('export_district')
      const [ r, ...rows ] = district.data
      console.log(r)
      let objects : DohDistrictType[] = []
      parseDohDistrict( rows, objects )
      setDistrictData(objects)

      // Collect District
      const location: any = await readDohCSV('export_location')
      const [ lr, ...lrows ] = location.data
      console.log(lr)
      let locationObjects : DohMarkerType[] = []
      parseDohLocation( lrows, locationObjects )
      setData(dohMainData(locationObjects))

      // Collect report
      const report: any = await readDohCSV('initial')
      setReport(reportParse(report))
    })()
  }, []);
  const barData = district.map(row => {
    return {
      'อำเภอ': row['อำเภอ'],
      'จังหวัด': row['จังหวัด'],
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
            <p className="ml-4">ประเมินการใส่หน้ากากอนามัย</p>
            <p className="ml-4 text-xl">โดย <span className="text-green-500">กรมอนามัย </span>ทั้งหมด {result.district}จุด ทั่วประเทศ </p>
          </div>
        </div>
        <img src={`https://drive.google.com/uc?export=view&id=${report?.district_image}`} className="m-auto ml-16 shadow-xl" style={{height:'600px'}} alt=""/>
        <div className="absolute bottom-0 right-0 mr-12 mb-8">
          <div className="text-2xl font-bold mb-64">
            การใส่หน้ากากอนามัย <br />
            แยกตามเขตพื้นที่
          </div>
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
            * วิเคราะห์จากกล้องวงจรปิดทั้งหมด {result.camera} จุดทั่วประเทศ
          </div>
        </span>
        <div className="flex-grow">
          <DohBar data={barData.sort((a,b) => a['ไม่ใส่'] - b['ไม่ใส่'])} ></DohBar>
        </div>
        <div className="h-2"></div>
      </div>
    </div>
  </div>
}

export default Page
