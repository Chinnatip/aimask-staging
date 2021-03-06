import {Navbar} from './present'
import { useState, useEffect } from 'react'
import Line from '../components/chart/NivoLineChart'
import { readRemoteFile } from 'react-papaparse'

type DNDatatype = {
  "วันที่": string
  "unix": number
  "weekday": number
  "วัน": string
  "เช้า": number
  "เย็น": number
  "เช้า%": number
  "เย็น%": number
  "รวม": number
  "รวม%": number
  "เช้าไม่ถูก": number
  "เย็นไม่ถูก": number
}

const Page = () => {
  const [DNdata, setDNdata] = useState<DNDatatype[]>([])
  useEffect(() => {
    readRemoteFile('https://koh-assets.s3-ap-southeast-1.amazonaws.com/superai/aimask/present7/AI+MASK+-+export_daynight.csv', {
      download: true,
      complete: (results: any) => {
        const [ r, ...rows ] = results.data
        console.log(r)
        let objects : DNDatatype[] = []
        rows.map((row: any[]) => {
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
            "เช้าไม่ถูก": 0,
            "เย็นไม่ถูก": 0
          }
          row.map((property,index) => {
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
                response["เช้า%"] = parseFloat( property)
                break;
              case 5:
                response["เย็น%"] = parseFloat( property)
                break;
              case 6:
                response["รวม%"] = parseFloat( property)
                break;
              case 7:
                response["เช้าไม่ถูก"] = parseInt( property)
                break;
              case 8:
                response["เย็นไม่ถูก"] = parseInt( property)
                break;
              case 9:
                response["เช้า"] = parseInt( property)
                break;
              case 10:
                response["เย็น"] = parseInt( property)
                break;
              case 11:
                response["รวม"] = parseInt( property)
                break;
              default:
                response['รวม'] = parseInt( property)
                break;
            }
          })
          objects.push(response)
        })
        setDNdata(objects)
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
            y: row['รวม%']
          }
        })
      }
    ]
  }
  // const { result: { camera } ,report_period } = data
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden " style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full flex">
      {/* <div className="w-2/5 h-full flex flex-col ">
        <div className="w-full border-r-4 flex items-center pl-6" style={{height: '50%'}}>

          <div className="" style={{width: '27%'}}>
            <img className="w-24 mr-3 -mt-12" src="technic/time_day.png" alt=""/>
            <p className="text-sm mt-3">ค่าเฉลี่ย</p>
            <p className="font-bold text-xl">ช่วงเช้า</p>
            <p className="font-bold text-2xl -mt-2">7.00 - 8.00</p>
            <span className="rounded-xl border h-10 py-2 inline-flex items-center font-bold text-center border-black justify-center text-3xl px-4 py-6">
             {(mornSum*100/mornTotalSum).toFixed(2)} %
            </span>
          </div>

          <div className="-mt-12 flex items-center justify-center" style={{height: '75%', width: '70%'}}>
            <Bar data={dayData(DNdata)} color="#383838"></Bar>
          </div>
        </div>
        <div className="w-full relative flex items-center pl-6" style={{height: '50%', background: '#212E60'}}>

          <div className="-mt-10 h-20 absolute top-0 left-0 w-full flex">
            <div className=" m-auto flex justify-center flex-col bg-white border-4 border-black py-1 px-5 text-lg relative">
              <span className="absolute top-0 left-0 -mt-6 opacity-50 text-sm">ร้อยละการใส่หน้ากาก ไม่ถูกต้อง และ ไม่ใส่หน้ากาก</span>
              <p>ประชาชนมีเเนวโน้ม</p>
              <p className="font-semibold">ใส่หน้ากากถูกน้อยลงในช่วงเย็นยกเว้น วันอาทิตย์</p>
            </div>
          </div>

          <div className="" style={{ width: '27%', color: '#FFF5C6' }}>
            <img className="w-24 mr-3 mt-8" src="technic/time_nightly.png" alt=""/>
            <p className="text-sm mt-3">ค่าเฉลี่ย</p>
            <p className="font-bold text-xl">ช่วงเย็น</p>
            <p className="font-bold text-2xl -mt-2">17.00 - 18.00</p>
            <span style={{ borderColor: '#FFF5C6' }} className="rounded-xl border h-10 py-2 inline-flex items-center font-bold text-center border-black justify-center text-3xl px-4 py-6">
              {(eveningSum*100/eveningTotalSum).toFixed(2)} %
            </span>
          </div>

          <div className="mt-8 flex items-center justify-center" style={{height: '75%', width: '70%'}}>
            <Bar data={nightData(DNdata)} color="#ffffff"></Bar>
          </div>
        </div>
      </div> */}
      <div className="flex-grow flex flex-col">
        {/* report title */}
        <div className="p-4 pb-0">
          <p>รายงานประจำวันที่</p>
          {/* <p className="ml-6 font-bold text-4xl -mt-2">{report_period}</p> */}
        </div>
        {/*  */}
        <div className="h-20 bg-gray-300 w-full flex items-center px-8">
          <div className="border-gray-400  text-lg">
            <p className="ml-3 text-xl font-bold">ร้อยละการใส่หน้ากาก <span className="text-orange-600 underline">ไม่ถูกต้อง + ไม่ใส่หน้ากาก </span></p>
            {/* <p className="ml-3 text-sm">( วิเคราะห์จากกล้องวงจรปิดทั้งหมด {camera} จุดในกรุงเทพมหานครฯ )</p> */}
          </div>
        </div>
        <div className="flex-grow p-5">
          <div className="w-full h-full">
            <Line data={lineData(DNdata)}></Line>
          </div>
        </div>
        <div className="px-20 flex pb-6 pt-2">
          <div className="flex w-1/2 justify-center items-center">
            <img src="mask_face/mask-yellow.png" alt="" className="h-20"/>
            <div className="ml-3">
              <p className="text-sm">กลุ่มที่ใส่หน้ากากไม่ถูกต้อง</p>
              <p className="text-xl leading-7 font-bold">เเนวโน้มเพิ่มขึ้น <br/>ในวันอาทิตย ์และ วันหยุดเทศกาล</p>
            </div>
          </div>
          <div className="flex w-1/2 justify-center items-center">
            <img src="mask_face/mask-red.png" alt="" className="h-20"/>
            <div className="ml-3">
              <p className="text-sm">กลุ่มที่ไม่ใส่หน้ากาก</p>
              <p className="text-xl leading-7 font-bold">เเนวโน้มเพิ่มขึ้น</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
}

export default Page
