import {Navbar} from './present'
import { useState, useEffect } from 'react'
import BarCorrect from '../components/chart/NivoTimeBarCorrect'
import Line from '../components/chart/NivoLineChart'
import { readRemoteFile } from 'react-papaparse'
import { mainData } from '../components/static/aimask_static'

const CSV_PATH = 'https://koh-assets.s3.ap-southeast-1.amazonaws.com/superai/aimask/dailyreport'

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

const parseLocation = (rows: any[], objects: MarkerType[]) => {
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
}

const parseDayNight = (rows: any[], objects: DNDatatype[]) => {
  rows.map((row: any[]) => {
    // console.log(row)
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
      // console.log(row)
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
    objects.push(response)
  })
}

const readCSV = async (file_name: string) => {
  let response = await new Promise((resolve, _) => {
    readRemoteFile(`${CSV_PATH}/${file_name}.csv`, {
      download: true,
      complete: (results: any) => {
        resolve(results)
      }}
    )
  })
  return response
}

const reportParse = (report: any) => {
  let reportDetail : any = {}
  report.data.map((row: string[], index: number) => {
    switch (index){
      case 0: break
      case 4:
        reportDetail['district_image'] = row[1]
        break
      default:
        reportDetail[row[0]] = {
          date: parseInt(row[1]),
          unix: parseInt(row[2]),
          text: row[3]
        }
        break
    }
  })
  return reportDetail
}

const Page = () => {
  const [DNdata, setDNdata] = useState<DNDatatype[]>([])
  const [report, setReport] = useState<any>({})
  const [smallRange, setSmallRange] = useState(242640 - 7)
  const [fullRange, setFullRange] = useState(242640 - 30)

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
      // Collect DayNight
      const daynight: any = await readCSV('export_daynight')
      const [ r, ...rows ] = daynight.data
      console.log(r)
      let objects : DNDatatype[] = []
      parseDayNight(rows, objects)
      setDNdata(objects)

      // Collect District
      const location: any = await readCSV('export_location')
      const [ lr, ...lrows ] = location.data
      console.log(lr)
      let locationObjects : MarkerType[] = []
      parseLocation( lrows, locationObjects )
      setData(mainData(locationObjects))

      // Collect report
      const report: any = await readCSV('initial')
      const reportDetail = reportParse(report)
      setReport(reportDetail)
      setSmallRange(reportDetail.today?.unix - 6)
      setFullRange(reportDetail.today?.unix - 30)
    })()
  }, []);
  const lineData = (data: DNDatatype[]) => {
    return [
      {
        "id": "daily",
        "data": data.filter(row => row['unix'] > fullRange ).map(row => {
          return {
            x: row['วัน'],
            y: row['รวมถูก%']
          }
        })
      }
    ]
  }
  const dayData = (data: DNDatatype[]) => {
    return data.filter(row => row.unix > smallRange ).map(row => {
      return {
        date: row['วัน'],
        value: row['เช้าถูก%'],
        color:  row['weekday'] == 3 ? '#DA4D3A' : "#FF9900"
      }
    })
  }
  const nightData = (data: DNDatatype[]) => {
    return data.filter(row => row.unix > smallRange ).map(row => {
      return {
        date: row['วัน'],
        value: row['เย็นถูก%'],
        color: row['weekday'] == 3 ? '#DA4D3A' : "#FFFFFF"
      }
    })
  }
  const { result: { camera } } = data
  const mornSum = DNdata.filter(row => row.unix > smallRange ).reduce((a,b) =>  a + (b.เช้า - b.เช้าไม่ถูก)  , 0)
  const eveningSum = DNdata.filter(row => row.unix > smallRange ).reduce((a,b) =>  a + (b.เย็น - b.เย็นไม่ถูก)  , 0)
  const mornTotalSum = DNdata.filter(row => row.unix > smallRange ).reduce((a,b) =>  a + b.เช้า  , 0)
  const eveningTotalSum = DNdata.filter(row => row.unix > smallRange ).reduce((a,b) =>  a + b.เย็น  , 0)
  // console.log(mornSum, mornTotalSum)
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden " style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full flex">
      <div className="w-2/5 h-full flex flex-col ">
        <div className="w-full border-r-4 flex items-center pl-6" style={{height: '50%'}}>
          {/* Sunny Data */}
          <div className="" style={{width: '27%'}}>
            <img className="w-24 mr-3 -mt-12" src="technic/time_day.png" alt=""/>
            <p className="text-sm mt-3">ค่าเฉลี่ย</p>
            <p className="font-bold text-xl">ช่วงเช้า</p>
            <p className="font-bold text-2xl -mt-2">7.00 - 8.00</p>
            <span className="rounded-xl border h-10 py-2 inline-flex items-center font-bold text-center border-black justify-center text-3xl px-4 py-6">
             {(mornSum*100/mornTotalSum).toFixed(2)} %
            </span>
          </div>
          {/* Sunny Chart */}
          <div className="-mt-12 flex items-center justify-center" style={{height: '75%', width: '70%'}}>
            <BarCorrect data={dayData(DNdata)} color="#383838"></BarCorrect>
          </div>
        </div>
        <div className="w-full relative flex items-center pl-6" style={{height: '50%', background: '#212E60'}}>
          {/* Hint Box */}
          <div className="-mt-10 h-20 absolute top-0 left-0 w-full flex">
            <div className=" m-auto flex justify-center flex-col bg-white border-4 border-black py-1 px-5 text-lg relative">
              <span className="absolute top-0 left-0 -mt-6 opacity-50 text-sm">ร้อยละการใส่หน้ากาก ไม่ถูกต้อง และ ไม่ใส่หน้ากาก</span>
              <p>ประชาชนมีเเนวโน้ม</p>
              <p className="font-semibold">ใส่หน้ากากถูกน้อยลงในช่วงเย็นยกเว้น วันอาทิตย์</p>
            </div>
          </div>
          {/* Night Data */}
          <div className="" style={{ width: '27%', color: '#FFF5C6' }}>
            <img className="w-24 mr-3 mt-8" src="technic/time_nightly.png" alt=""/>
            <p className="text-sm mt-3">ค่าเฉลี่ย</p>
            <p className="font-bold text-xl">ช่วงเย็น</p>
            <p className="font-bold text-2xl -mt-2">17.00 - 18.00</p>
            <span style={{ borderColor: '#FFF5C6' }} className="rounded-xl border h-10 py-2 inline-flex items-center font-bold text-center border-black justify-center text-3xl px-4 py-6">
              {(eveningSum*100/eveningTotalSum).toFixed(2)} %
            </span>
          </div>
          {/* Nightly Chart */}
          <div className="mt-8 flex items-center justify-center" style={{height: '75%', width: '70%'}}>
            <BarCorrect data={nightData(DNdata)} color="#ffffff"></BarCorrect>
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        {/* report title */}
        <div className="p-4 pb-0">
          <p>รายงานประจำวันที่</p>
          <p className="ml-6 font-bold text-4xl -mt-2">{report?.today?.text}</p>
        </div>
        {/*  */}
        <div className="h-20 bg-gray-300 w-full flex items-center px-8">
          <div className="border-gray-400  text-lg">
            <p className="ml-3 text-xl font-bold">ร้อยละการใส่หน้ากาก <span className="text-orange-600 underline">ถูกต้อง</span></p>
            <p className="ml-3 text-sm">( วิเคราะห์จากกล้องวงจรปิดทั้งหมด {camera} จุดในกรุงเทพมหานครฯ )</p>
          </div>
        </div>
        <div className="flex-grow p-5">
          <div className="w-full h-full">
            <Line data={lineData(DNdata)} ></Line>
          </div>
        </div>
        <div className="px-20 flex pb-6 pt-2">
          <div className="flex w-full justify-center items-center">
            <img src="mask_face/mask-green.png" alt="" className="h-20"/>
            <div className="ml-3">
              <p className="text-lg md-3">กลุ่มที่ใส่หน้ากากถูกต้อง</p>
              <p className="text-2xl leading-7 font-bold">เเนวโน้มเพิ่มขึ้น ตั้งเเต่ต้นเดือนเมษายนที่ผ่านมา</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
}

export default Page
