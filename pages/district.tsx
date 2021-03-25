import Bar from '../components/chart/NivoBar'
import { Navbar } from './present'
import { useState, useEffect } from 'react'
import { mainData } from '../components/static/aimask_static'
import { readRemoteFile } from 'react-papaparse'

type DistrictType = {
  "เขต": string
  "ใส่หน้ากาก": number
  "ใส่ไม่ถูกต้อง": number
  "ไม่ใส่หน้ากาก": number
  "จำนวนประชากร": number
  "ร้อยละใส่": number
  "error": number
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
  const [ district, setDistrictData ] = useState<DistrictType[]>([])
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
    readRemoteFile('https://koh-assets.s3-ap-southeast-1.amazonaws.com/superai/aimask/AI+MASK+-+export_district.csv', {
      download: true,
      complete: (results: any) => {
        const [ r, ...rows ] = results.data
        console.log(r)
        let objects : DistrictType[] = []
        rows.map((row: any[]) => {
          let response = {
            "เขต": '',
            "ใส่หน้ากาก": 0,
            "ใส่ไม่ถูกต้อง": 0,
            "ไม่ใส่หน้ากาก": 0,
            "จำนวนประชากร": 0,
            "ร้อยละใส่": 0,
            "error": 0
          }
          row.map((property,index) => {
            switch(index){
              case 0:
                response["เขต"] = property
                break;
              case 1:
                response["ใส่หน้ากาก"] = parseInt( property)
                break;
              case 2:
                response["ใส่ไม่ถูกต้อง"] = parseInt( property)
                break;
              case 3:
                response["ไม่ใส่หน้ากาก"] = parseInt( property)
                break;
              case 4:
                response["จำนวนประชากร"] = parseInt( property)
                break;
              case 5:
                response["ร้อยละใส่"] = parseFloat( property)
                break;
              default:
                response['error'] = parseFloat( property)
                break;
            }
          })
          objects.push(response)
        })
        setDistrictData(objects)
        readRemoteFile('https://koh-assets.s3-ap-southeast-1.amazonaws.com/superai/aimask/AI+MASK+-+export_location.csv', {
          download: true,
          complete: (results: any) => {
            const [ r, ...rows ] = results.Data
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
  const barData = district.map(row => {
    return {
      'เขต': row['เขต'],
      'ไม่ใส่': row['error'],
      'color':  row['error'] < 5 ? '#749E42' :
                row['error'] < 10 ? '#F3C042' : '#FF0000',
    }
  })
  const { result,report_period } = data
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
            <p className="ml-4 text-xl"><span className="text-green-600">ใส่หน้ากากอนามัย</span> ของ {result.district} เขต ใน กทม. </p>
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
