import Icon from './Icon'
import {
  faPaperPlane,
  faDatabase,
  faUser,
  faSignInAlt,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
import { removeCookie } from 'utils/cookie'
import { Token } from 'interfaces'
import Pop from '@/stuff/ActivePop'

type Props = {
  transparent?: boolean
  login?: Token
  ssg?: boolean
  current: string
}

export default function Navbar({
  transparent = false,
  login = undefined,
  current = 'home',
  ssg = false,
}: Props) {
  return (
    <>
      <nav
        className={
          ' flex flex-wrap items-center justify-between px-20 py-3 navbar-expand-lg max-w-screen-xl m-auto'
        }
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={
                'leading-relaxed inline-block mr-4 pt-2 whitespace-no-wrap'
              }
              href="/"
            >
              <img
                src="main_logo.png"
                style={{ height: '64px' }}
                alt="torch logo"
              />
            </a>
          </div>
          <div
            className="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none hidden"
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              {/* About */}
              <li className="flex items-center">
                <a
                  className={
                    (current == 'home'
                      ? 'text-green-900'
                      : 'text-gray-500 hover:text-gray-600') +
                    ' px-8 py-4 lg:py-2 flex items-center text-m uppercase font-bold  relative'
                  }
                  href="/"
                >
                  {current == 'home' && <Pop />}
                  หน้าหลัก
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className={
                    (current == 'playlist'
                      ? 'text-green-900'
                      : 'text-gray-500 hover:text-gray-600') +
                    ' px-8 py-4 lg:py-2 flex items-center text-m uppercase font-bold  relative'
                  }
                  href="/playlist"
                >
                  {current == 'playlist' && <Pop />}
                  เลือกเรื่องจากการ
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className={
                    (current == 'about'
                      ? 'text-green-900'
                      : 'text-gray-500 hover:text-gray-600') +
                    ' px-8 py-4 lg:py-2 flex items-center text-m uppercase font-bold relative'
                  }
                  href="/about"
                >
                  {current == 'about' && <Pop />}
                  คลังเเสงของคุณ
                </a>
              </li>
            </ul>
            {!ssg && (
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="flex items-center">
                  {login == undefined ? (
                    <a
                      href="/sign-in"
                      className={
                        (transparent
                          ? 'bg-white text-gray-800 active:bg-gray-100'
                          : 'bg-pink-500 text-white active:bg-pink-600') +
                        ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3'
                      }
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                    >
                      <Icon fill={faSignInAlt} /> Sign In
                    </a>
                  ) : (
                    <>
                      <button
                        className={
                          'text-gray-700' +
                          ' px-3 py-4 mr-2 lg:py-2 flex items-center text-m uppercase font-bold'
                        }
                        onClick={() => {
                          removeCookie('token')
                          Router.push('/')
                        }}
                      >
                        ออกจากระบบ
                      </button>
                      <div className="relative">
                        <div className="realtive z-10 w-12 h-12 rounded-full overflow-hidden  hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                          <img src={login.picture} alt="your profile image" />
                        </div>
                        <img
                          src="ic_crown.png"
                          className="absolute"
                          style={{
                            top: '-0.5rem',
                            right: '-0.5rem',
                            height: '18px',
                          }}
                          alt="crown icon"
                        />
                      </div>
                    </>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
