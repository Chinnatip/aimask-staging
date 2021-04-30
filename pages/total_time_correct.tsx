import Line from '../components/chart/NivoLineChartMonthly'
import {Navbar} from './present'
import { useState, useEffect } from 'react'
import {
  DNDatatype,
  reportParse,
  parseDaynight,
  readCSV
} from '../components/strategy/daily'

const Page = () => {
  const [DNdata, setDNdata] = useState<DNDatatype[]>([])
  const [report, setReport] = useState<any>({})
  useEffect(() => {
    (async () => {
      const dn: any = await readCSV('export_daynight')
      const [ r, ...rows ] = dn.data
      console.log(r)
      let objects : DNDatatype[] = []
      parseDaynight(rows, objects)
      setDNdata(objects)

      // Collect report
      const report: any = await readCSV('initial')
      setReport(reportParse(report))
    })()
  }, []);
  const lineData = (data: DNDatatype[]) => {
    return [
      {
        "id": "daily",
        "data": data.filter(row => row['unix'] > report.today?.unix - 30).map(row => {
          return {
            x: row['วัน'],
            y: row['รวมถูก%']
          }
        })
      }
    ]
  }
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden" style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full flex">
      <div className="flex-grow flex flex-col">
        {/* report title */}
        <div className="p-4 pb-0">
          <p>รายงานประจำวันที่</p>
          <p className="ml-6 font-bold text-4xl -mt-2">{report.previos_month?.text} - {report.today?.text}</p>
        </div>
        {/*  */}
        <div className="h-20 bg-gray-300 w-full flex items-center px-8">
          <div className="border-gray-400  text-lg">
            <p className="ml-3 text-xl font-bold">ร้อยละการใส่หน้ากาก <span className="text-orange-600 underline">ถูกต้อง</span></p>
            {/* <p className="ml-3 text-sm">( วิเคราะห์จากกล้องวงจรปิดทั้งหมด {camera} จุดในกรุงเทพมหานครฯ )</p> */}
          </div>
        </div>
        <div className="flex-grow p-5">
          <div className="w-full h-full">
            <Line data={lineData(DNdata)}></Line>
          </div>
        </div>
        <div className="px-20 flex pb-6 pt-2">
          <div className="flex w-full justify-center items-center">
            <img src="mask_face/mask-green.png" alt="" className="h-20"/>
            <div className="ml-3">
              <p className="text-md mb-2">กลุ่มที่ใส่หน้ากาก</p>
              <p className="leading-7 text-3xl">เเนวโน้มเพิ่มขึ้น <span className="font-bold">ตั้งเเต่ช่วงประกาศคลัสเตอร์บางเเคเป็นต้นมา</span></p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
}

export default Page
