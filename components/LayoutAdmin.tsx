import Head from 'next/head'
import Icon from './stuff/Icon'
import React, { ReactNode, useState } from 'react'
import { faPlus, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { useProfile } from '../store/index'
import { navList, hoverList } from './static/index'
import { useRouter } from 'next/router'

type Props = {
  children?: ReactNode
  title?: string
  current?: string
}

// sub-component
const LinkHomeAside = () => {
  return (
    <a
      href="/"
      className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4"
    >
      <Icon fill={faArrowAltCircleUp} />
      Landing page
    </a>
  )
}

const Layout = ({ children, title = '' }: Props) => {
  const [hover, setHover] = useState(false)
  const { profile } = useProfile()
  const { route } = useRouter()
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* Sidebar */}
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <a
            href="/"
            className="text-white text-2xl font-semibold uppercase hover:text-gray-300"
          >
            Yellboard
          </a>
          <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <Icon fill={faPlus} />
            New Report
          </button>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          {navList.map(({ path, text, fa_icon }, index) => {
            return (
              <a
                href={path}
                key={index}
                className={`flex items-center text-white py-4 pl-6 nav-item ${
                  route == path ? 'active-nav-link' : ''
                }`}
              >
                <Icon fill={fa_icon} />
                {text}
              </a>
            )
          })}
        </nav>
        <LinkHomeAside />
      </aside>

      {/* Navigation bar */}
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <header className="w-full flex items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end">
            <button
              onClick={() => setHover(!hover)}
              className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
            >
              <img src={profile.picture} />
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
              </div>
            )}
          </div>
        </header>

        {/* Content Here */}
        {children}
      </div>
    </div>
  )
}

export default Layout
