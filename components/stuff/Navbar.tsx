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

type Props = {
  transparent?: boolean
  login?: boolean
  ssg?: boolean
}

export default function Navbar({
  transparent = false,
  login = false,
  ssg = false,
}: Props) {
  return (
    <>
      <nav
        className={
          (transparent
            ? 'top-0 absolute z-50 w-full'
            : 'relative shadow-lg bg-white shadow-lg') +
          ' flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg'
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={
                (transparent ? 'text-white' : 'text-gray-800') +
                ' text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase'
              }
              href="/"
            >
              Yellboard
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
                    (transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                  href="/about"
                >
                  <Icon fill={faPaperPlane} />
                  About
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                  href="/users"
                >
                  <Icon fill={faUser} />
                  User lists
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                  href="/api/users"
                >
                  <Icon fill={faDatabase} />
                  User-API
                </a>
              </li>
            </ul>
            {!ssg && (
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="flex items-center">
                  {!login ? (
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
                          (transparent
                            ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                            : 'text-gray-800 hover:text-gray-600') +
                          ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                        }
                        onClick={() => {
                          removeCookie('token')
                          Router.push('/')
                        }}
                      >
                        Sign out
                      </button>
                      <a
                        href="/dashboard"
                        className={
                          (transparent
                            ? 'bg-white text-gray-800 active:bg-gray-100'
                            : 'bg-pink-500 text-white active:bg-pink-600') +
                          ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3'
                        }
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                      >
                        <Icon fill={faChartPie} /> Dashboard
                      </a>
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
