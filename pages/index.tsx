import Layout from "@/layout/Layout"
import { useState } from "react"
import Chart from "./charts"
import { MaskType } from "../interfaces/marker"
import { fetchDashboard } from "../components/strategy/fetchDDC"
import { useMachine } from "@xstate/react"
import { useContent } from "../store/machine"
import { useRouter } from 'next/router'

let stateParser

const corpLink = [
  {domain: 'https://www.thaigov.go.th/', logo: 'prime_minister_office.png'},
  {domain: 'https://www.thaigov.go.th/', logo: 'CVP-23.png'},
  {domain: 'https://www.moph.go.th/', logo: 'MOPH.png'},
  {domain: 'https://www.nrct.go.th/', logo: 'worchor5G.png' , span: 2},
  {domain: 'https://www.mhesi.go.th/', logo: 'orwo.png', custom: '-mr-5'},
  {domain: 'https://www.tu.ac.th/', logo: 'tu.png'},
  {domain: 'http://www.bangkok.go.th/', logo: 'bma_logo.png'},
  {domain: 'https://www.ntplc.co.th/', logo: 'cat_logo.jpg', height: 6},
  {domain: 'https://www.aiat.or.th/', logo: 'aiat_logo.png', height: 6},
]

const Content = () => {
  const Router = useRouter()
  const DataDate = "30 มกราคม 2564"
  const Map = <img src="Map/Map.png" />
  const [current] = useMachine(useContent, {
    services: {
      fetchData: () => fetchDashboard().then((res) => res),
    },
  })
  switch (current.value) {
    case "idle":
      return <h1>Blank</h1>
    case "loading":
      return <h1>Loading</h1>
    case "success":
      stateParser = current.context.data
      const { today, timeline, maskCounter, maskTodaySummary } = stateParser
      // setMarkType({ ...maskCounter })
      return (
        <>
          <div className="text-3xl mb-4 mt-16">
              รายงานสถานการณ์และสถิติในช่วงโควิด-19
            </div>
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-5 pb-6">
            <div className="shadow-lg bg-pink-300 col-span-2 flex-col rounded-xl flex text-center items-center justify-center py-6 block">
              <span className="text-md font-bold">ผุ้ป่วยยืนยันสะสม</span>
              <h1 className="text-gray-800 text-3xl">{today.Confirmed}</h1>
              <p className="text-xs text-gray-600">เพิ่มขึ้น {today.NewRecovered}</p>
            </div>
            <div className="shadow-lg bg-green-300 flex-col rounded-xl flex text-center items-center justify-center py-6 block">
              <span className="text-md font-bold">หายเเล้ว</span>
              <h1 className="text-gray-800 text-3xl">{today.Recovered}</h1>
              <p className="text-xs text-gray-600">เพิ่มขึ้น {today.NewRecovered}</p>
            </div>
            <div className="shadow-lg bg-yellow-300 flex-col rounded-xl flex text-center items-center justify-center py-6 block">
              <span className="text-md font-bold">รักษาอยู่</span>
              <h1 className="text-gray-800 text-3xl">{today.Hospitalized}</h1>
              <p className="text-xs text-gray-600">เพิ่มขึ้น {today.NewHospitalized}</p>
            </div>
            <div className="shadow-lg bg-gray-300 flex-col rounded-xl flex text-center items-center justify-center py-6 block">
              <span className="text-md font-bold">เสียชีวิต</span>
              <h1 className="text-gray-800 text-3xl">{today.Deaths}</h1>
              <p className="text-xs text-gray-600">เพิ่มขึ้น {today.NewDeaths}</p>
            </div>
          </div>
          <p className="text-sm text-right text-gray-500">ข้อมูลอัปเดตเมื่อ: {DataDate} จากกรมควบคุมโรคhttps://covid19.th-stat.com/</p>
          <div className="h-16"></div>
          <div className="grid lg:grid-cols-2 lg:grid-flow-col grid-rows-4 grid-cols-1 lg:grid-rows-2 px-5 gap-2 -mx-8">

            {/* Map area */}
            <div className="flex-grow-0 p-2 max-w-screen-sm">
              <div className="text-3xl">สถิติการสวมหน้ากากอนามัย</div>
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
                <Link href="/map">
                  <a>{Map}</a>
                </Link>
              </div>
            </div>

            {/* Statistic */}
            <div className="lg:mt-12 -mt-32 w-full flex flex-col lg:flex-row w-full">
              {/* 2x2 Grid */}
              <div className="flex-grow lg:flex-grow-0 p-2 w-full">
                <div className="grid lg:grid-cols-2 lg:grid-rows-2 grid-rows-2 gap-4">
                  <div className="border-2 flex-col rounded-xl py-6 flex text-center items-center justify-center">
                    <span className="text-sm">จำนวนเขตทั้งหมด</span>
                    {/* <h1 className="font-bold text-4xl">{maskTodaySummary.no_correct_wear_mask + maskTodaySummary.no_incorrect_wear_mask +maskTodaySummary.no_not_wear_mask}</h1> */}
                    <h1 className="font-bold text-4xl">{maskCounter.green + maskCounter.yellow + maskCounter.red}</h1>
                  </div>
                  <div className="border-2 flex-col rounded-xl py-6 flex text-center items-center justify-center">
                    <span className="text-sm">ใส่หน้ากาก 95-100%</span>
                    <h1 className="font-bold text-green-700 text-4xl">{maskCounter.green}</h1>
                  </div>
                  <div className="border-2 flex-col rounded-xl py-6 flex text-center items-center justify-center">
                    <span className="text-sm">ใส่หน้ากาก 90-95%</span>
                    <h1 className="font-bold text-yellow-500 text-4xl">{maskCounter.yellow}</h1>
                  </div>
                  <div className="border-2 flex-col rounded-xl py-6 flex text-center items-center justify-center">
                    <span className="text-sm">ใส่หน้ากากน้อยกว่า 90%</span>
                    <h1 className="font-bold text-red-600 text-4xl">{maskCounter.red}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:mt-12 w-full -mb-64">
              {/* 2x2 Grid */}
              <div className="flex-grow lg:flex-grow-0 p-2 w-full">
                <div className="lg:hidden block text-2xl my-3">
                  ข้อมูลจากกล้องสำรวจ
                </div>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                  <div className="border-2 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                    <span className="text-sm">ใส่หน้ากากถูกต้อง</span>
                    <h1 className="-mt-2 text-green-700 font-bold text-3xl">{maskTodaySummary.no_correct_wear_mask}</h1>
                  </div>
                  <div className="border-2 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                    <span className="text-sm">ใส่หน้ากากไม่ถูกต้อง</span>
                    <h1 className="-mt-2 text-yellow-500 font-bold text-3xl">{maskTodaySummary.no_incorrect_wear_mask}</h1>
                  </div>
                  <div className="border-2 flex-col rounded-xl h-24 flex text-center items-center justify-center">
                    <span className="text-sm">ไม่ใส่หน้ากาก</span>
                    <h1 className="-mt-2 text-red-600 font-bold text-3xl">{maskTodaySummary.no_not_wear_mask}</h1>
                  </div>
                </div>
              </div>
              <div className="h-4"></div>
              <div>คลิ๊กเพื่อเปิดแผนที่</div>
              <button onClick={() => Router.push('/map')}>
                <img src="zoom_map.png" className="w-full" alt=""/>
              </button>
            </div>
            <div className="hidden lg:flex flex p-2 max-w-full " style={{ width: "48rem", height: "24rem" }}>
              <Chart timeline={timeline} />
            </div>
          </div>
        </>
      )
    case "failure":
      return <h1>Reload</h1>
    default:
      return null
  }
}

import Link from "next/link"
const IndexPage = () => {
  const [maskType] = useState<MaskType>({
    red: 0,
    green: 0,
    yellow: 0,
  })
  return (
    // <p>Hi</p>
    <Layout current="home" maskType={maskType} title="DeepCare - Covid Map">
      <>
        <div className="mt-32 w-full h-full justify-items-center items-center flex flex-col">
          <div className="max-w-full md:max-w-screen-lg flex">
            <div className="mx-8 lg:w-full lg:mx-0">
              <div className="border border-gray-400 w-full bg-gray-200 shadow-xl rounded-xl p-8 xs:px-20">
                <h1 className="text-3xl"> <span className="text-orange-600">DeepCare</span> by AI คืออะไร...</h1>
                <div className="flex mt-4 flex-col lg:flex-row">
                  <div className="hidden lg:block px-4 text-lg">DeepCare</div>
                  <div>
                    คือ ระบบปัญญาประดิษฐ์ที่ถูกพัฒนาขึ้นมาเพื่อสนับสนุนการดูแลสุขภาพประชาชนร่วมกัน
                    ในช่วงโควิด-19 DeepCare
                    จะคอยรายงานสถิติการสวมใส่หน้ากากอนามัยของคนไทยโดย
                    ตรวจจับจากระบบปัญญาประดิษฐ์
                  </div>
                </div>
              </div>
              <Content />

              <footer className="lg:flex hidden lg:flex h-16 bg-white w-full">
                <div className="flex-grow"></div>
                <div className="flex items-center">
                  {corpLink.map(({logo, height=10}, index) =>
                    <img key={index} className={`h-${height} mr-6`} src={logo} alt=""/> )}
                </div>
              </footer>
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
