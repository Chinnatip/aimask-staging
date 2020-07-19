import Icon from 'stuff/Icon'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { navList, docLists } from 'static'
import { faPlus, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const { route } = useRouter()
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <Icon fill={faPlus} />
          </button>

          <a
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            href="/"
          >
            Yellboard
          </a>

          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {navList.map(({ path, text, fa_icon }, index) => (
                <li className="items-center">
                  <a
                    className={`${
                      route == path
                        ? 'text-pink-600 '
                        : 'text-gray-800 hover:text-gray-600'
                    }   text-xs uppercase py-3 font-bold block`}
                    href={path}
                    key={index}
                  >
                    <Icon fill={fa_icon} />
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            <hr className="my-4 md:min-w-full" />
            {/*  */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Documentation
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              {docLists.map(({ path, text }) => (
                <li className="inline-flex">
                  <a
                    className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    href={path}
                  >
                    <i className="fas fa-paint-brush mr-2 text-gray-500 text-base"></i>{' '}
                    {text}
                  </a>
                </li>
              ))}
            </ul>
            {/*  */}
            <a
              href="/"
              className="absolute w-full text-gray-600 hover:text-gray-900 bottom-0 flex items-center justify-center text-xs uppercase py-3 font-bold"
            >
              <Icon fill={faArrowAltCircleUp} />
              Landing page
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
