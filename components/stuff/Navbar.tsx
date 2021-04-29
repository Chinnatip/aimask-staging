import { useRouter } from 'next/router'
import { MaskType } from '../../interfaces/marker'
import { MarkerIcon, TableIcon, PeopleIcon, HomeIcon} from '../stuff/Icon'
import {GridMask} from './GridMask'

type Props = {
  current: string,
  maskType?: MaskType,
}

const corpLink = [
  {domain: 'https://www.thaigov.go.th/', logo: 'prime_minister_office.png'},
  {domain: 'https://www.thaigov.go.th/', logo: 'CVP-23.png'},
  {domain: 'https://www.moph.go.th/', logo: 'MOPH.png'},
  {domain: 'https://www.nrct.go.th/', logo: 'worchor.png' , span: 2},
  {domain: 'https://www.mhesi.go.th/', logo: 'orwo.png', custom: '-mr-5'},
  {domain: 'https://www.tu.ac.th/', logo: 'tu.png'},
  {domain: 'http://www.bangkok.go.th/', logo: 'bma_logo.png'},
  {domain: 'https://www.ntplc.co.th/', logo: 'cat_logo.png', height: 10},
  // {domain: 'https://www.aiat.or.th/', logo: 'aiat_logo.png', height: 6},
]

export default function Navbar({current, maskType}: Props) {
  const Router = useRouter()
  return (
    <>
      <nav  style={{ fontFamily: 'Sukhumvit Set' }} className={'text-b relative flex flex-wrap items-center justify-between px-8 navbar-expand-lg '}>
        <div className={`shadow-lg fixed top-0 h-20 left-0 z-10 flex flex-wrap py-3 px-4 lg:px-6 lg:pl-8 w-screen`} style={{background: '#EF802D'}}>
          <div className="w-full relative flex items-center" >
            <button onClick={() => Router.push('/')} className="text-left text-black">
              <div className="text-4xl text-orange-900 font-bold -mt-2">AiMASK</div>
              <span className="text-xs text-white font-semibold -mt-2 block">ระบบเเสดงจำนวนผู้สวมใส่หน้ากากอนามัย</span>
            </button>
            { current == 'map' && <div className="w-1/3 pl-12 hidden lg:grid grid-cols-3 px-5 gap-2  ">
              <GridMask text_col="text-white" color="black" amount={maskType ? maskType?.green: 0} criteria="95%-100%" image="m_green"  />
              <GridMask text_col="text-white" color="black" amount={maskType ? maskType?.yellow: 0} criteria="90%-95%" image="m_yellow"  />
              <GridMask text_col="text-white" color="black" amount={maskType ? maskType?.red: 0} criteria="ต่ำกว่า 90%" image="m_red"  />
            </div>}
            { current == 'home' ? <div className="flex-grow flex text-right justify-center items-center">
              {corpLink.map(({logo, height=10}, index) =>
                <img key={index} className={`h-${height} mr-6`} src={logo} alt=""/> )}
            </div> : <div className="flex-grow"></div>}
            <div className="hidden lg:flex ">
              <span className="flex">
                <HomeIcon fill={current == 'home' ? 'black' : 'white'} />
                <button onClick={() => Router.push('/')} className={`mx-2 ${current == 'home' ? 'font-bold text-black' : 'text-gray-100'} `}>Home</button>
              </span>
              <span className="flex">
                <MarkerIcon fill={current == 'daily_report' ? 'black' : 'white'} />
                <button onClick={() => Router.push('/daily_report')} className={`mx-2 ${current == 'daily_report' ? 'font-bold text-black' : 'text-gray-100'} `}>รายงานประจำวัน</button>
              </span>
              <span className="flex ml-4">
                <TableIcon fill={current == 'report' ? 'black' : 'white'} />
                <a target='_blank' href="https://drive.google.com/drive/folders/1g2mROoe0xFdiu1VvQjyGBsErVD7p6Bct" className={`mx-2 ${current == 'brief' ? 'font-bold text-black' : 'text-gray-100'} `}>รายงานย้อนหลัง</a>
              </span>
              {/* <span className="flex ml-4">
                <span className={` text-${current == 'report' ? 'black' : 'white'} `}  ><Icon fill={faChartLine} noMargin></Icon></span>
                <TableIcon fill={current == 'report' ? 'black' : 'white'} />
                <a target='_blank' href="http://deepcare.aiat.or.th:8100/redoc" className={`mx-2 ${current == 'api' ? 'font-bold text-black' : 'text-gray-100'} `}>API</a>
              </span> */}
              <span className="flex ml-4">
                <PeopleIcon fill={current == 'aboutus' ? 'black' : 'white'} />
                <button onClick={() => Router.push('/about-us')} className={`mx-2 ${current == 'aboutus' ? 'font-bold text-black' : 'text-gray-100'} `}>เกี่ยวกับเรา</button>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
