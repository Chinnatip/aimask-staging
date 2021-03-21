import { GooglemapComponent } from './map_secret'
import {data} from '../components/static/aimask_static'

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
      {icons.map(icon => {
        return <span className="flex-grow text-center">
          <img src={icon} className="inline-block h-16" alt=""/>
        </span>
      })}
    </div>
  </div>
}

const Page = () => {
  const { sort_district,report_period, previous_period, result: {
    total,
    district,
    camera,
    correct_percent,
    in_correct_percent,
    no_mask_percent
  } } = data
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden " style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full p-4 flex">
      <div className="h-full w-3/5 relative mr-4">
        <div className="absolute top-0 left-0 flex w-3/5 bg-gray-300 z-10 text-center text-lg shadow-2xl">
          <span className="w-4/6 p-3 pt-4" >แผนที่เเสดง <span className="font-bold">การใส่หน้ากากอนามัย</span> <br/> ในเขตกรุงเทพมหานคร ทั้งหมด</span>
          <span className="w-1/6 p-2 border-l border-gray-400 font-bold "> <div className="text-3xl -mb-2">{district}</div>เขต</span>
          <span className="w-1/6 p-2 border-l border-gray-400 font-bold "> <div className="text-3xl -mb-2">{camera}</div>จุด</span>
        </div>
        {/* Google Map */}
        <GooglemapComponent/>
        {/* District Box */}
        <div className="absolute bottom-0 left-0 w-full mb-10 h-32 flex px-4">
          <div className="h-full rounded-2xl  w-2/5 bg-red-600 p-4 flex text-white">
            <div className="w-2/3 flex items-center text-xl font-semibold text-center">
              เขต{sort_district.red.map((d,index) => `${index > 0 ?', ':''}${d}`)}
            </div>
            <div className="h-full border-l-4 border-red-800 flex items-center text-3xl pl-2 font-bold">{`<90 %`}</div>
          </div>
          <div className="" style={{width: '10%'}} />
          <div className="w-1/2 h-full rounded-2xl bg-yellow-500 p-4 flex text-gray-800">
            <div className="flex px-2 items-center leading-5 text-md font-semibold text-center" style={{width: '72%'}}>
              เขต{sort_district.yellow.map((d,index) => `${index > 0 ?', ':''}${d}`)}
            </div>
            <div className="h-full border-l-4 border-yellow-600 flex items-center text-3xl pl-2 font-bold">{`<95 %`}</div>
          </div>
        </div>
        <div className="bg-white absolute bottom-0 right-0 text-black font-bold mr-1 mb-1 px-1">*ประมวลผลภาพจากกล้องวงจรปิด ณ. จุดต่างๆ ตามแผนที่ผ่านระบบ AiMASK</div>
      </div>
      <div className="h-full flex-grow flex flex-col">
        {/* report title */}
        <div>
          <p>รายงานประจำวันที่</p>
          <p className="ml-6 font-bold text-5xl -mt-3">{report_period}</p>
        </div>
        {/* labelling */}
        <div className="h-12 flex relative">
          <div className="w-4 bg-red-500 h-full" />
          <div className="w-6 bg-yellow-500 h-full" />
          <div className="flex-grow bg-green-500 h-full" />
          <p className="text-xl absolute top-0 right-0 mt-3 mr-3 font-semibold text-white text-shadow-md" style={{textShadow: '0px 3px 2px rgba(0, 0, 0, 0.15)'}}>
            ร้อยละการใส่หน้ากากอนามัยในกรุงเทพมหานคร
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
        <div className="text-right font-semibold mt-1 text-md">*เปรียบเทียบกับข้อมูลช่วงวันที่ {previous_period}</div>
      </div>
    </div>
  </div>
}

export default Page
