import Icon from 'stuff/Icon'
import Router from 'next/router'
import { Token } from 'interfaces'
import { useState } from 'react'
import { hoverList } from 'static'
import { removeCookie } from 'utils/cookie'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type Props = {
  title: string
  token?: Token
}

const Navbar = ({ title, token = null }: Props) => {
  const [hover, setHover] = useState(false)
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {title}
          </a>

          <div className="relative w-1/2 flex justify-end">
            {/* Form */}
            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <Icon fill={faSearch}></Icon>
                </span>
                <input
                  type="text"
                  placeholder="Search here..."
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                />
              </div>
            </form>
            <p className=" text-white text-sm  uppercase realtive h-12 flex items-center mr-4">
              {token?.username}
            </p>
            <button
              onClick={() => setHover(!hover)}
              className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-white hover:border-gray-300 focus:border-gray-300 focus:outline-none"
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
        </div>
      </nav>
    </>
  )
}
export default Navbar
