import { GooglemapComponent } from './map_secret'
import { useState, useEffect } from 'react'
import { mainData } from '../components/static/aimask_static'
import { readDohCSV } from '../components/strategy/daily'

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

export const Navbar = () => {
  const icons = [
    '../CVP-23.png',
    '../orwo.png',
    '../worchor.png',
    '../tu.png',
    '../bma_logo.png'
  ]
  return <div className="h-20 flex justify-center">
    <div className="bg-orange-500 w-3/5 text-white flex items-center justify-center text-4xl font-bold">
      <span className="text-2xl mr-2">ระบบปัญญาประดิษฐ์ในการประเมินการใส่หน้ากากอนามัย </span>
      | AiMASK
    </div>
    <div className="bg-gray-200 flex-grow flex items-center pl-6">
      {icons.map((icon, index) => {
        return <span key={index} className="flex-grow text-center">
          <img src={icon} className="inline-block h-16" alt=""/>
        </span>
      })}
    </div>
  </div>
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

const Page = () => {
  const [markers, setMarker] = useState<MarkerType[]>([])
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
      //
      const location: any = await readDohCSV('export_location')
      const [ r, ...rows ] = location.data
      console.log(r)
      let objects : MarkerType[] = []
      parseLocation( rows, objects )
      setMarker(objects)
      setData(mainData(objects))
      //
      // Collect report
      const report: any = await readDohCSV('initial')
      setReport(reportParse(report))
    })()
    return () => {};
  }, []);
  const { sort_district, result: {
    total,
    district,
    camera,
    correct_percent,
    in_correct_percent,
    no_mask_percent
  }} = data
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden " style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full p-4 flex">
      <div className="h-full w-3/5 relative mr-4">
        <div className="absolute top-0 left-0 flex w-3/5 bg-gray-300 z-10 text-center text-lg shadow-2xl">
          <span className="w-4/6 p-3 pt-4" >แผนที่เเสดง <span className="font-bold">การใส่หน้ากากอนามัย</span> <br/> โดยกรมอนามัยทั่วประเทศ ทั้งหมด</span>
          <span className="w-1/6 p-2 border-l border-gray-400 font-bold "> <div className="text-3xl -mb-2">{district}</div>จังหวัด</span>
          <span className="w-1/6 p-2 border-l border-gray-400 font-bold "> <div className="text-3xl -mb-2">{camera}</div>จุด</span>
        </div>
        {/* Google Map */}
        <GooglemapComponent markers={markers} zoom={5} useStyle={false}/>
        {/* District Box */}
        <div className="absolute bottom-0 left-0 w-full mb-10 h-16 flex px-4">
          { sort_district.red.length > 0 && <div className="h-full rounded-2xl  w-2/5 bg-red-600 p-4 flex text-white">
            <div className="w-2/3 flex items-center text-xl font-semibold text-center">
              จังหวัด{sort_district.red.map((d,index) => `${index > 0 ?', ':''}${d}`)}
            </div>
            <div className="h-full border-l-4 border-red-800 flex items-center text-3xl pl-2 font-bold">{`<90 %`}</div>
          </div>}
          <div className="" style={{width: '10%'}} />
          {  sort_district.yellow.length > 0 && <div className="w-1/2 h-full rounded-2xl bg-yellow-500 p-4 flex text-gray-800">
            <div className="flex px-2 items-center leading-5 text-md font-semibold text-center" style={{width: '72%'}}>
              จังหวัด{sort_district.yellow.map((d,index) => `${index > 0 ?', ':''}${d}`)}
            </div>
            <div className="h-full border-l-4 border-yellow-600 flex items-center text-3xl pl-2 font-bold">{`<95 %`}</div>
          </div> }
        </div>
        <div className="bg-white absolute bottom-0 right-0 text-black font-bold mr-1 mb-1 px-1">*ประมวลผลภาพจากกล้องวงจรปิด ณ. จุดต่างๆ ตามแผนที่ผ่านระบบ AiMASK</div>
      </div>
      <div className="h-full flex-grow flex flex-col">
        {/* report title */}
        <div>
          <p>รายงานประจำวันที่</p>
          <p className="ml-6 font-bold text-5xl -mt-3">{report?.today?.text}</p>
        </div>
        {/* labelling */}
        <div className="h-12 flex relative">
          <div className="w-4 bg-red-500 h-full" />
          <div className="w-6 bg-yellow-500 h-full" />
          <div className="flex-grow bg-green-500 h-full" />
          <p className="text-xl absolute top-0 right-0 mt-3 mr-3 font-semibold text-white text-shadow-md" style={{textShadow: '0px 3px 2px rgba(0, 0, 0, 0.15)'}}>
            ร้อยละการใส่หน้ากากอนามัยทั่วประเทศ
          </p>
        </div>
        <div className="text-right font-bold mt-1 text-md">กลุ่มตัวอย่าง {total} คน</div>
        <div className="flex-grow">
          <div className="w-full flex items-center border-b-2 px-8" style={{ height: '33.33%' }}>
            <img src="mask_face/mask-green.png" style={{ height: '80%'}}/>
            <div className="flex-grow ml-6 mt-2 text-3xl">
              <p className="font-thin -mb-3"> ใส่หน้ากากถูกต้อง</p>
              <p className="text-6xl text-green-600 font-semibold">{correct_percent}%</p>
            </div>
          </div>
          <div className="w-full flex items-center border-b-2 px-8" style={{ height: '33.33%' }}>
            <img src="mask_face/mask-yellow.png" style={{ height: '80%'}}/>
            <div className="flex-grow ml-6 mt-2 text-3xl">
              <p className="font-thin -mb-3"> ใส่ไม่ถูกต้อง</p>
              <p className="text-6xl text-yellow-600 font-semibold">{in_correct_percent}%</p>
            </div>
          </div>
          <div className="w-full flex items-center px-8" style={{ height: '33.33%' }}>
            <img src="mask_face/mask-red.png" style={{ height: '80%'}}/>
            <div className="flex-grow ml-6 mt-2 text-3xl">
              <p className="font-thin -mb-3"> ไม่ใส่หน้ากาก</p>
              <p className="text-6xl text-red-600 font-semibold">{no_mask_percent}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Page
