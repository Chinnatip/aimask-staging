import { useRouter } from 'next/router'
import { CameraDetail } from '../../interfaces/marker'

type Props = {
  current: string,
  markers?: CameraDetail[]
}

export default function Navbar({current, markers}: Props) {
  const Router = useRouter()
  console.log(markers)
  return (
    <>
      <nav className={'text-b relative flex flex-wrap items-center justify-between px-8 navbar-expand-lg '}>
        <div className="shadow-lg fixed top-0 h-16 left-0 z-10 flex flex-wrap py-3 px-6 pl-8 w-screen" style={{background: '#ffab6d'}}>
          <div className="w-full relative flex items-center" >
            <button onClick={() => Router.push('/')} className="text-3xl text-gray-800">
              DEEPCARE
              {/* <span className="text-sm text-gray-700 ml-3">by AIAT</span> */}
            </button>
            <div className="flex-grow flex pl-12 ">
              {/* {JSON.stringify(markers)} */}
              <span className="flex w-24 items-center justify-center ">
                <img src="mask_icon/m_green.png" alt="" className="h-8"/>
                <span className="ml-3 text-gray-800 text-3xl">x {markers?.length}</span>
              </span>
              <span className="flex w-24 ml-8 items-center justify-center ">
                <img src="mask_icon/m_yellow.png" alt="" className="h-8"/>
                <span className="ml-3 text-gray-800 text-3xl">x 0</span>
              </span>
              <span className="flex w-24 ml-8 items-center justify-center ">
                <img src="mask_icon/m_red.png" alt="" className="h-8"/>
                <span className="ml-3 text-gray-800 text-3xl">x 0</span>
              </span>
            </div>
            <div>
              <button onClick={() => Router.push('/')} className={`mx-4 ${current == 'home' ? 'font-bold text-gray-800' : 'text-gray-100'} `}>หน้าหลัก</button>
              <a href="https://deepcare.aiat.or.th/streamlit/" className={`mx-4 ${current == 'brief' ? 'font-bold text-gray-800' : 'text-gray-100'} `}>สรุปข้อมูล</a>
              <button onClick={() => Router.push('/about-us')} className={`mx-4 ${current == 'aboutus' ? 'font-bold text-gray-800' : 'text-gray-100'} `}>About Us</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
