import { useRouter } from 'next/router'
import { SearchIcon, TableIcon, PeopleIcon} from '../stuff/Icon'


type Props = {
  current: string
  actionDrawer?: any
}



export default function Footer({current, actionDrawer}: Props) {
  const Router = useRouter()

  const CreateButton = (
    text: string,
    current_stage: string,
    onClick?: () => void,
    onLoad?: () => void) => {

    const getCol = current==current_stage ? '#FFB986' : 'white'
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
          <div className="inline-block text-md">
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
            actionDrawer()
          })}
          {CreateButton("สรุปข้อมูล",'report',  function onClick(){ Router.push('/report') })}
          {CreateButton("About Us",'aboutus',  function onClick(){ Router.push('/about-us') })}
        </div>
      </footer>
    </>
  )
}
