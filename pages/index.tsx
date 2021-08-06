import Layout from "@/layout/Layout"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { mainData } from '../components/static/aimask_static'
import axios from "axios"
import Link from "next/link"
import {
  DistrictType, MarkerType,
  reportParse,
  parseDistrict,
  parseLocation,
  readCSV,
  readDohCSV
} from '../components/strategy/daily'

type DDCData = {
  Confirmed?: number
  Deaths?: number
  DevBy?: string
  Hospitalized?: number
  NewConfirmed?: number
  NewDeaths?: number
  NewHospitalized?: number
  NewRecovered?: number
  Recovered?: number
  SeverBy?: string
  Source?: string
  UpdateDate?: string
}

const digit = (numer : number|undefined ) => {
  return numer != undefined ? numer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0
}

const IndexPage = () => {
  const Router = useRouter()
  const [ddcData, setDDC] = useState<DDCData>({})
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
  // const [ _, setDOHDistrictData ] = useState<DistrictType[]>([])
  const [reportState, setReportStat ] = useState(false)
  const [dohReport, setDOHReport] = useState<any>({})
  const [dohData, setDOHData] = useState({
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
  const { result: {correct_percent, in_correct_percent, no_mask_percent} } = data
  const { result: {
    total: dohTotal,
    correct_percent: dohCorrect,
    in_correct_percent: dohIncorrect,
    no_mask_percent: dohNoMask
  }} = dohData

  useEffect(() => {
    (async () => {
      // CDC report
      axios.get('https://covid19.th-stat.com/json/covid19v2/getTodayCases.json').then(ddc_data => {
        setDDC(ddc_data.data)
        setReportStat(true)
      }).catch(e => {
        console.log(e)
      })

      // Bangkok Report
      // Collect District
      const district: any = await readCSV('export_district')
      const [ r, ...rows ] = district.data
      console.log(r)
      let objects : DistrictType[] = []
      parseDistrict( rows, objects )
      console.log(objects)
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

      // DOH country report
      // Collect District
      // const doh_district: any = await readDohCSV('export_district')
      // const [ dr, ...drows ] = doh_district.data
      // console.log(dr)
      // let doh_objects : DistrictType[] = []
      // parseDistrict( drows, doh_objects )
      // console.log(doh_objects)
      // setDOHDistrictData(doh_objects)

      // Collect District
      const doh_location: any = await readDohCSV('export_location')
      const [ dlr, ...dlrows ] = doh_location.data
      console.log(dlr)
      let dohLocationObjects : MarkerType[] = []
      parseLocation( dlrows, dohLocationObjects )
      setDOHData(mainData(dohLocationObjects))

      // Collect report
      const doh_report: any = await readDohCSV('initial')
      setDOHReport(reportParse(doh_report))
    })()
  }, []);
  return (
    <Layout current="home" title="AiMASK - ระบบปัญญาประดิษฐ์ที่ถูกพัฒนาขึ้นมาเพื่อสนับสนุนการดูแลสุขภาพประชาชน">
      <>
        <div className="mt-32 w-full">
          <div className="max-w-full md:max-w-screen-lg m-auto">
            <div className="mx-8 lg:w-full lg:mx-0">
              <span className="text-sm text-gray-700 mb-1 inline-block">
              สนับสนุนโดย สำนักงานการวิจัยแห่งชาติ (วช.) กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม
              </span>
              <div className="border border-gray-400 w-full bg-gray-200 shadow-xl rounded-xl p-8 xs:px-20">
                <h1 className="text-3xl"> <span className=" font-semibold text-orange-600">AiMASK</span> คืออะไร...</h1>
                <div className="flex mt-4 flex-col lg:flex-row">
                  <div className="hidden lg:block px-4 text-lg">AiMASK</div>
                  <div>
                    คือระบบปัญญาประดิษฐ์ที่ถูกพัฒนาขึ้นมาเพื่อสนับสนุนการดูแลสุขภาพประชาชนร่วมกัน
                    ในช่วงโควิด-19 DeepCare
                    จะคอยรายงานสถิติการสวมใส่หน้ากากอนามัยของคนไทยโดย
                    ตรวจจับจากระบบปัญญาประดิษฐ์
                  </div>
                </div>
              </div>
              <>
                { reportState && <>
                <div className="text-3xl mb-4 mt-16"> รายงานสถานการณ์และสถิติในช่วงโควิด-19 </div>
                <div className="grid lg:grid-cols-5 grid-cols-2 gap-5 pb-6">
                  <div className="shadow-lg bg-pink-300 col-span-2 flex-col rounded-xl flex text-center items-center justify-center py-6 block">
                    <span className="text-md font-bold">ติดเชื้อสะสม</span>
                    <h1 className="text-gray-800 text-3xl">{digit(ddcData?.Confirmed)}</h1>
                    <p className="text-xs text-gray-600">เพิ่มขึ้น {digit(ddcData?.NewConfirmed)}</p>
                  </div>
                  <div className="shadow-lg bg-green-300 flex-col rounded-xl flex text-center items-center justify-center py-6 block">
                    <span className="text-md font-bold">หายเเล้ว</span>
                    <h1 className="text-gray-800 text-3xl">{digit(ddcData?.Recovered)}</h1>
                    <p className="text-xs text-gray-600">เพิ่มขึ้น {digit(ddcData?.NewRecovered)}</p>
                  </div>
                  <div className="shadow-lg bg-yellow-300 flex-col rounded-xl flex text-center items-center justify-center py-6 block">
                    <span className="text-md font-bold">รักษาอยู่</span>
                    <h1 className="text-gray-800 text-3xl">{digit(ddcData?.Hospitalized)}</h1>
                    <p className="text-xs text-gray-600">เพิ่มขึ้น {digit(ddcData?.NewHospitalized)}</p>
                  </div>
                  <div className="shadow-lg bg-gray-300 flex-col rounded-xl flex text-center items-center justify-center py-6 block">
                    <span className="text-md font-bold">เสียชีวิต</span>
                    <h1 className="text-gray-800 text-3xl">{digit(ddcData?.Deaths)}</h1>
                    <p className="text-xs text-gray-600">เพิ่มขึ้น {digit(ddcData?.NewDeaths)}</p>
                  </div>
                </div>
                <p className="text-sm text-right text-gray-500">ข้อมูลอัปเดตเมื่อวันที่: {ddcData?.UpdateDate} จากกรมควบคุมโรค {ddcData?.Source}</p>
                </>}

                <div className="h-16"></div>

                {/* Main Box */}
                <div className="grid lg:grid-cols-2 lg:grid-flow-row grid-rows-1 px-5 gap-2 -mx-8">
                  <div className="flex-grow-0 p-2 max-w-screen-sm">
                    <div className="text-3xl">สถิติการสวมหน้ากากอนามัย </div>
                    <div className="-mt-1 text-orange-600 font-semibold">ประจำวันที่ {report?.today?.text}</div>
                    <div
                      id="bordermap"
                      className="bg-white border-gray-900 p-2 w-full"
                      onMouseOver={() => {
                        let a = document.getElementById("bordermap")
                        if (a == null) return
                        a.style.borderWidth = "thick"
                      }}
                      onMouseLeave={() => {
                        let a = document.getElementById("bordermap")
                        if (a == null) return
                        a.style.borderWidth = ""
                      }}
                    >
                      <Link href="/daily_report">
                        <a><img src={`https://drive.google.com/uc?export=view&id=${report?.district_image}`} /></a>
                      </Link>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex-grow lg:flex-grow-0 p-2 w-full">
                      <div className="lg:hidden block text-2xl my-3">
                        ข้อมูลจากกล้องสำรวจ
                      </div>
                      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                        <div className="border-2 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                          <span className="text-sm">ใส่หน้ากากถูกต้อง</span>
                          <h1 className="-mt-2 text-green-700 font-bold text-2xl">{correct_percent}%</h1>
                        </div>
                        <div className="border-2 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                          <span className="text-sm">ใส่หน้ากากไม่ถูกต้อง</span>
                          <h1 className="-mt-2 text-yellow-500 font-bold text-2xl">{in_correct_percent}%</h1>
                        </div>
                        <div className="border-2 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                          <span className="text-sm">ไม่ใส่หน้ากาก</span>
                          <h1 className="-mt-2 text-red-600 font-bold text-2xl">{no_mask_percent}%</h1>
                        </div>
                      </div>
                    </div>
                    <div className="h-4"></div>
                    <div>คลิ๊กเพื่อดูรายงานประจำวัน</div>
                    <button onClick={() => Router.push('/daily_report')}>
                      <img src="report_image.png" className="w-full mt-2 shadow-xl" alt=""/>
                    </button>
                    <div className="w-full grid-cols-3 grid gap-4 mt-4">
                      <a href="/present_daily" className="bg-gray-600 p-2 inline-block text-center text-white rounded-full" >ภาพรวม</a>
                      <a href="/district_daily" className="bg-gray-600 p-2 inline-block text-center text-white rounded-full" >ข้อมูลเขต</a>
                      <a href="/total_time_correct" className="bg-gray-600 p-2 inline-block text-center text-white rounded-full" >ข้อมูลเเยกเวลา</a>
                    </div>
                  </div>
                </div>

                {/* Statistic */}
                <div className="mt-12 mb-4">
                  <div className="text-3xl">สถิติเเยกรายเขต </div>
                  <div className="-mt-1 text-orange-600 font-semibold">ในเขตพื้นที่กรุงเทพมหานคร</div>
                </div>
                <div className="w-full flex flex-col lg:flex-row w-full">
                  <div className="flex-grow lg:flex-grow-0 p-2 w-full">
                    <div className="grid lg:grid-cols-4 grid-rows-1 gap-4">
                      <div className="border-2 flex-col rounded-xl py-4 flex text-center items-center justify-center bg-blue-600 text-white">
                        <span className="text-md">จำนวนเขตทั้งหมด</span>
                        <h1 className="font-bold text-4xl">{district.length} เขต</h1>
                      </div>
                      <div className="border-2 flex-col rounded-xl py-4 flex text-center items-center justify-center">
                        <span className="text-md">ใส่หน้ากาก 95-100%</span>
                        <h1 className="font-bold text-green-700 text-4xl">{district.filter(item => item['ร้อยละใส่'] > 95).length} เขต</h1>
                      </div>
                      <div className="border-2 flex-col rounded-xl py-4 flex text-center items-center justify-center">
                        <span className="text-md">ใส่หน้ากาก 90-95%</span>
                        <h1 className="font-bold text-yellow-500 text-4xl">{district.filter(item => item['ร้อยละใส่'] >= 90 && item['ร้อยละใส่'] <= 95).length} เขต</h1>
                      </div>
                      <div className="border-2 flex-col rounded-xl py-4 flex text-center items-center justify-center">
                        <span className="text-md">ใส่หน้ากากน้อยกว่า 90%</span>
                        <h1 className="font-bold text-red-600 text-4xl">{district.filter(item => item['ร้อยละใส่'] < 90).length} เขต</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <img src="total_time.png" className="mt-4 shadow-lg"/>
                <div className="text-center italic text-sm mt-5 text-gray-700">สถิติข้อมูลทั้งหมดตั้งเเต่เริ่มเก็บข้อมูล</div>

                <br /><br />

                {/* Main Box */}
                <div className="grid lg:grid-cols-2 lg:grid-flow-row grid-rows-1 px-5 gap-2 -mx-8 py-8 bg-orange-100 border border-orange-300 rounded-xl">
                  <div className="flex-grow-0 p-2 max-w-screen-sm">
                    <div className="text-3xl">
                      สถิติการสวมหน้ากากอนามัย
                    </div>
                    <div className="text-lg -mt-1 mb-2">โดย กรมอนามัย ตามจุดต่างๆทั่วประเภท</div>
                    <div className="-mt-1 text-orange-600 font-semibold">ประจำวันที่ {dohReport?.today?.text}</div>
                    <div className="flex items-end mt-10" style={{maxWidth: '340px' }}>
                      <div className="flex-grow">จำนวนสำรวจ</div>
                      <div className="text-3xl">{dohTotal} ราย</div>
                    </div>

                  </div>

                  <div className="w-full">
                    <div className="flex-grow lg:flex-grow-0 p-2 w-full">
                      <div className="lg:hidden block text-2xl my-3">
                        ข้อมูลจากกล้องสำรวจ
                      </div>
                      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                        <div className="border-2 border-orange-300 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                          <span className="text-sm">ใส่หน้ากากถูกต้อง</span>
                          <h1 className="-mt-2 text-green-700 font-bold text-2xl">{dohCorrect}%</h1>
                        </div>
                        <div className="border-2 border-orange-300 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                          <span className="text-sm">ใส่หน้ากากไม่ถูกต้อง</span>
                          <h1 className="-mt-2 text-yellow-500 font-bold text-2xl">{dohIncorrect}%</h1>
                        </div>
                        <div className="border-2 border-orange-300 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                          <span className="text-sm">ไม่ใส่หน้ากาก</span>
                          <h1 className="-mt-2 text-red-600 font-bold text-2xl">{dohNoMask}%</h1>
                        </div>
                      </div>
                    </div>
                    <div className="h-4"></div>
                    {/* <div>คลิ๊กเพื่อดูรายงานประจำวัน</div> */}
                    <div className="w-full grid-cols-3 grid gap-4 mt-4">
                      <a target="_blank" href="/doh_present_daily" className="bg-orange-500 p-2 inline-block text-center text-white rounded-full" >ภาพรวม</a>
                      <a target="_blank" href="/doh_district_daily" className="bg-orange-500 p-2 inline-block text-center text-white rounded-full" >ข้อมูลจังหวัด</a>
                      <a target="_blank" href="/doh_total_time_correct" className="bg-orange-500 p-2 inline-block text-center text-white rounded-full" >ข้อมูลเเยกเวลา</a>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        <div className="mt-12 py-6 pb-24 bg-gray-400">
          <div className="max-w-full md:max-w-screen-lg m-auto">
            <p className="text-3xl text-gray-600">Open source</p>
            <div className="-mt-1 text-gray-900 font-semibold">ฐานข้อมูลเเละโมเดลที่เปิดให้นักพัฒนานำไปใช้งาน</div>
            <div className="grid lg:grid-cols-4 grid-rows-1 gap-4 mt-5">
              <a href="https://colab.research.google.com/drive/19fZG-72es1qYcLdc9gh_D909nrVGd9kY?usp=sharing">
                <div className="border-2 border-gray-500 h-48 flex-col rounded-xl py-4 flex text-center items-center justify-center">
                  <img src="colab.png" className="h-24 -mt-4 mb-2"/>
                  <div className="font-bold text-xl">Google Colab</div>
                </div>
              </a>
              {/* <a href="https://drive.google.com/file/d/1U45YibRMgLSfjC65AIy8es08dYDsmR6g/view?usp=sharing">
                <div className="border-2 border-gray-500 h-48 flex-col rounded-xl py-4 flex text-center items-center justify-center">
                  <img src="dataset.png" className="h-24 -mt-2 mb-2"/>
                  Facemark Dataset
                  <div className="font-bold -mt-2">จำนวน 12,000 รูป</div>
                </div>
              </a> */}
              <a href="https://github.com/CMU-Perceptual-Computing-Lab/openpose">
                <div className="border-2 border-gray-500 h-48 flex-col rounded-xl py-4 flex text-center items-center justify-center">
                  Object tracking
                  <div className="font-bold text-2xl">OpenPose</div>
                </div>
              </a>
              <a href="https://github.com/lucidrains/vit-pytorch">
                <div className="border-2 border-gray-500 h-48 flex-col rounded-xl py-4 flex text-center items-center justify-center">
                  Image classification
                  <div className="font-bold text-xl">Vision Transformer</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default IndexPage
