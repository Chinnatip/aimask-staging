import { useRouter } from 'next/router'
import { SearchIcon, TableIcon, PeopleIcon} from '../stuff/Icon'
import { toggleDrawer } from '../strategy/toggle'

type Props = {
  current: string
}

const corpLink = [
  {domain: 'https://www.thaigov.go.th/', logo: 'prime_minister_office.png'},
  {domain: 'https://www.thaigov.go.th/', logo: 'CVP-23.png'},
  {domain: 'https://www.moph.go.th/', logo: 'MOPH.png'},
  {domain: 'https://www.nrct.go.th/', logo: 'worchor5G.png' , span: 2},
  {domain: 'https://www.mhesi.go.th/', logo: 'orwo.png', custom: '-mr-5'},
  {domain: 'https://www.tu.ac.th/', logo: 'tu.png'},
  {domain: 'http://www.bangkok.go.th/', logo: 'bma_logo.png'},
  {domain: 'https://www.ntplc.co.th/', logo: 'cat_logo.jpg', height: 6},
  {domain: 'https://www.aiat.or.th/', logo: 'aiat_logo.png', height: 6},
]

export default function Footer({current}: Props) {
  const Router = useRouter()

  const CreateButton = (
    text: string,
    current_stage: string,
    onClick?: () => void,
    onLoad?: () => void) => {
    const getCol = current==current_stage ? '#EF802D' : 'white'
    return (
      <div className="flex-1 w-full h-full">
        <button className={`flex items-center justify-center w-full h-full ${current==current_stage && 'tab-active'} `} onClick={onClick} onLoad={onLoad}>
          <div className="flex align-middle">
            {
            current_stage == 'home' ? <SearchIcon fill={getCol}/> :
            current_stage == 'report' ? <TableIcon fill={getCol}/> :
            <PeopleIcon fill={getCol}/>
            }
          </div>
          <div className={`ml-1 inline-block`} />
          <div className="inline-block text-md" style={{color: getCol}}>
            {text}
          </div>
        </button>
      </div>
    )
  }
  return (
    <>
      <footer className="lg:hidden fixed justify-between bottom-0 left-0 right-0 bg-black h-16">
        <div className="flex flex-wrap text-white text-center w-full h-full px-2">
          {CreateButton("ดูข้อมูลเขต",'home',  function onClick() {
            //
            Router.push('/')
            toggleDrawer()
          })}
          {/* {CreateButton("สรุปข้อมูล",'report',  function onClick(){ Router.push('/report') })} */}
          <a href="http://deepcare.aiat.or.th:8501/" className="flex-1 w-full h-full">
            <button className={`flex items-center justify-center w-full h-full ${current=='report' && 'tab-active'} `}>
              <div className="flex align-middle"> <TableIcon fill={current=='report'?'#EF802D' : 'white'}/> </div>
              <div className={`ml-1 inline-block`} />
              <div className="inline-block text-md">สรุปข้อมูล</div>
            </button>
          </a>
          {CreateButton("About Us",'aboutus',  function onClick(){ Router.push('/about-us') })}
        </div>
      </footer>
      {
        current == 'home' && <footer className="fixed bottom-0 hidden lg:flex h-16 bg-white w-full">
        <div className="flex-grow"></div>
        <div className="flex items-center">
          {corpLink.map(({logo, height=10}, index) =>
            <img key={index} className={`h-${height} mr-6`} src={logo} alt=""/> )}
        </div>
      </footer>
      }
    </>
  )
}
