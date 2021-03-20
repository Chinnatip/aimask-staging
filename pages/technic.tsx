import {Navbar} from './overview'

const Page = () => {
  return <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden " style={{ fontFamily: 'Sukhumvit Set' }}>
    <Navbar />
    <div className="flex-grow w-full p-4 flex">
      <div className="h-full w-1/2 relative mr-10">
        <h1 className="text-orange-600 text-5xl font-semibold ml-6 mt-4">AiMASK</h1>
        <p className="px-32 text-2xl text-center mt-2 mb-12">
        ระบบปัญญาประดิษฐ์ที่ถูกพัฒนาขึ้นมา <br/> เพื่อสนับสนุนการดูแลสุขภาพ <br/> ในช่วงโควิด-19 <span className="text-orange-600 font-semibold">AiMASK</span> จะคอยรายงานสถิติ การสวมใส่หน้ากากอนามัยของคนไทย <br/> โดยการวิเคราะห์จากระบบปัญญาประดิษฐ์
        </p>
        <div className="flex">
          <div className="flex-grow px-12">
            <div className="text-center py-3 border-2 text-lg rounded-md">
              พัฒนาด้วย <br/> <span className="font-bold">scaled yolov4</span> <br/> ให้สามารถตรวจจับ <br/> การใส่หน้ากาก <br/>จากกล้องวงจรปิดได้
            </div>
            <div className="text-center py-3 text-lg rounded-md mt-5 bg-gray-200">
              กราฟประสิทธิภาพ <br/> ของโมเดล <br/> <span className="font-bold">scaled yolov4</span>
            </div>
          </div>
          <img src="technic/technic_1.png" alt="" style={{height: '36vh'}}/>
        </div>
      </div>
      <div className="h-full flex-grow flex flex-col mt-6 pr-8">
        <img src="technic/trigger.png" alt="" style={{height: '80vh'}}/>
      </div>

    </div>
  </div>
}

export default Page
