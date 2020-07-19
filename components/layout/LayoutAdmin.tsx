import Head from 'next/head'
import Icon from 'stuff/Icon'
import Footer from '@/stuff/DashboardFooter'
import Router, { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { navList, hoverList } from 'static'
import { removeCookie } from 'utils/cookie'
import { faPlus, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { Token } from 'interfaces'
import Sidebar from 'stuff/Sidebar'

type Props = {
  children?: ReactNode
  title?: string
  current?: string
  token?: Token
}

const Layout = ({ children, title = '', token = null }: Props) => {
  const [hover, setHover] = useState(false)
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Sidebar />
      <div className="relative w-full md:ml-64 bg-gray-200">
        {/* Navigation bar */}
        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <header className="w-full flex items-center bg-white py-2 px-6 hidden sm:flex">
            <div className="w-1/2"></div>
            <div className="relative w-1/2 flex justify-end">
              <p className="realtive h-12 flex items-center mr-4">
                {token?.username}
              </p>
              <button
                onClick={() => setHover(!hover)}
                className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
              >
                <img src={token?.picture} />
              </button>
              {hover && (
                <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                  {hoverList.map(({ text, path }) => {
                    return (
                      <a
                        href={path}
                        className="block px-4 py-2 account-link hover:text-white"
                      >
                        {text}
                      </a>
                    )
                  })}
                  <button
                    className="block px-4 py-2 account-link hover:text-white w-full text-left"
                    onClick={() => {
                      removeCookie('token')
                      Router.push('/')
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Content Here */}
          <div className="w-full overflow-x-hidden border-t flex flex-col">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
