import {Navbar} from './present'
import { useState, useEffect } from 'react'
import { readRemoteFile } from 'react-papaparse'
import { mainData } from '../components/static/aimask_static'
import Line from '../components/chart/NivoLineChart'

type DNDatatype = {
  "วันที่": string
  "unix": number
  "weekday": number
  "วัน": string
  "เช้า": number
  "เย็น": number
  "เช้า%": number
  "เย็น%": number
  "เช้าถูก%": number
  "เย็นถูก%": number
  "รวม": number
  "รวม%": number
  "รวมถูก%": number
  "เช้าไม่ถูก": number
  "เย็นไม่ถูก": number
}

type MarkerType = {
  "จุดตั้งกล้อง": string
  "เขต": string
  "lattitude": number
  "longitude": number
  "นับกล้องต่อหนึ่งสถานที่": number
  "ใส่หน้ากาก": number
  "ใส่ไม่ถูกต้อง": number
  "ไม่ใส่หน้ากาก": number
  "รวม": number
  "ใส่หน้ากาก%": number
  "ใส่ไม่ถูกต้อง%": number
  "ไม่ใส่หน้ากาก%": number
  "note": string
}

const Page = () => {
  const [DNdata, setDNdata] = useState<DNDatatype[]>([])
  const [data, setData] = useState({
    report_period: '',
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
    readRemoteFile('https://koh-assets.s3-ap-southeast-1.amazonaws.com/superai/aimask/present7/AI+MASK+-+export_daynight.csv', {
      download: true,
      complete: (results: any) => {
        const [ r, ...rows ] = results.data
        console.log(r)
        let objects : DNDatatype[] = []
        rows.map((row: any[]) => {
          console.log(row)
          let response = {
            "วันที่": '',
            "unix": 0,
            "weekday": 0,
            "วัน": '',
            "เช้า": 0,
            "เย็น": 0,
            "รวม": 0,
            "เช้า%": 0,
            "เย็น%": 0,
            "รวม%": 0,
            "เช้าถูก%": 0,
            "เย็นถูก%": 0,
            "รวมถูก%": 0,
            "เช้าไม่ถูก": 0,
            "เย็นไม่ถูก": 0
          }
          row.map((property,index) => {
            console.log(row)
            switch(index){
              case 0:
                response["วันที่"] = property
                break;
              case 1:
                response["unix"] = parseInt( property)
                break;
              case 2:
                response["weekday"] = parseInt( property)
                break;
              case 3:
                response["วัน"] = property
                break;
              case 4:
                response["เช้าถูก%"] = parseFloat( property)
                break;
              case 5:
                response["เช้า%"] = parseFloat( property)
                break;
              case 6:
                response["เย็นถูก%"] = parseFloat( property)
                break;
              case 7:
                response["เย็น%"] = parseFloat( property)
                break;
              case 8:
                response["รวมถูก%"] = parseFloat( property)
                break;
              case 9:
                response["รวม%"] = parseFloat( property)
                break;
              case 10:
                response["เช้าไม่ถูก"] = parseInt( property)
                break;
              case 11:
                response["เย็นไม่ถูก"] = parseInt( property)
                break;
              case 12:
                response["เช้า"] = parseInt( property)
                break;
              case 13:
                response["เย็น"] = parseInt( property)
                break;
              case 14:
                response["รวม"] = parseInt( property)
                break;
              default:
                response['รวม'] = parseInt( property)
                break;
            }
          })
          console.log(response)
          objects.push(response)
        })
        setDNdata(objects)
        readRemoteFile('https://koh-assets.s3-ap-southeast-1.amazonaws.com/superai/aimask/present6/AI+MASK+-+export_location.csv', {
          download: true,
          complete: (results: any) => {
            const [ r, ...rows ] = results.data
            console.log(r)
            let objects : MarkerType[] = []
            rows.map((row: any[]) => {
              let response = {
                "จุดตั้งกล้อง": '',
                "เขต": '',
                "lattitude": 0,
                "longitude": 0,
                "นับกล้องต่อหนึ่งสถานที่": 0,
                "ใส่หน้ากาก": 0,
                "ใส่ไม่ถูกต้อง": 0,
                "ไม่ใส่หน้ากาก": 0,
                "รวม": 0,
                "ใส่หน้ากาก%": 0,
                "ใส่ไม่ถูกต้อง%": 0,
                "ไม่ใส่หน้ากาก%": 0,
                "note": ''
              }
              row.map((property,index) => {
                switch(index){
                  case 0:
                    response["จุดตั้งกล้อง"] = property
                    break;
                  case 1:
                    response["เขต"] = property
                    break;
                  case 2:
                    response["lattitude"] = parseFloat( property)
                    break;
                  case 3:
                    response["longitude"] = parseFloat( property)
                    break;
                  case 4:
                    response["นับกล้องต่อหนึ่งสถานที่"] = parseInt( property)
                    break;
                  case 5:
                    response["ใส่หน้ากาก"] = parseInt( property)
                    break;
                  case 6:
                    response["ใส่ไม่ถูกต้อง"] = parseInt( property)
                    break;
                  case 7:
                    response["ไม่ใส่หน้ากาก"] = parseInt( property)
                    break;
                  case 8:
                    response["รวม"] = parseInt( property)
                    break;
                  case 9:
                    response["ใส่หน้ากาก%"] = parseFloat(property)
                    break;
                  case 10:
                    response["ใส่ไม่ถูกต้อง%"] = parseFloat(property)
                    break;
                  case 11:
                    response["ไม่ใส่หน้ากาก%"] = parseFloat(property)
                    break;
                  default:
                    response['note'] = property
                    break;
                }
              })
              objects.push(response)
            })
            setData(mainData(objects))
          }
        })
      }
    })
  }, []);
  const lineData = (data: DNDatatype[]) => {
    return [
      {
        "id": "daily",
        "data": data.filter(row => row['unix'] > 242543).map(row => {
          return {
            x: row['วัน'],
            y: row['รวมถูก%']
          }
        })
      }
    ]
  }
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden " style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full flex">
      <div className="flex-grow flex flex-col">
        {/* report title */}
        <div className="p-4 pb-0">
          <p>รายงานประจำวันที่</p>
          <p className="ml-6 font-bold text-4xl -mt-2">21 มค. - 22 เมย. 2021</p>
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
