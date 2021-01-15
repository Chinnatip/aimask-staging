import { useRouter } from 'next/router'

type Props = {
  current: string
}

export default function Navbar({current}: Props) {
  const Router = useRouter()
  return (
    <>
      <nav className={ 'relative flex flex-wrap items-center justify-between px-8 navbar-expand-lg '}>
        <div className="fixed top-0 left-0 z-10 flex flex-wrap py-3 px-6 pl-8 w-screen" style={{background: '#FFB986'}}>
          <div className="w-full relative flex items-center" >
            <h1 className="text-3xl text-orange-700">
              DEEPCARE
              <span className="text-sm text-gray-700 ml-3">by AIAT</span>
            </h1>
            <div className="flex-grow"></div>
            <div>
              <button onClick={() => Router.push('/')} className={`mx-4 ${current == 'home' ? 'font-bold text-gray-800' : 'text-gray-100'} `}>หน้าหลัก</button>
              <a href="https://www.kohlife.com" className={`mx-4 ${current == 'brief' ? 'font-bold text-gray-800' : 'text-gray-100'} `}>สรุปข้อมูล</a>
              <button onClick={() => Router.push('/aboutus')} className={`mx-4 ${current == 'aboutus' ? 'font-bold text-gray-800' : 'text-gray-100'} `}>About Us</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
