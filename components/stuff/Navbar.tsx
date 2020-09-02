import { Token } from 'interfaces'
import Pop from '@/stuff/ActivePop'

type Props = {
  transparent?: boolean
  login?: Token
  ssg?: boolean
  current: string
}

export default function Navbar({ current = 'home' }: Props) {
  return (
    <>
      <nav
        className={
          ' flex flex-wrap items-center justify-between px-8 py-3 navbar-expand-lg '
        }
      >
        <div className=" flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={
                'leading-relaxed inline-block mr-4 pt-2 whitespace-no-wrap'
              }
              href="/"
            >
              <img
                src="icon_logo.png"
                style={{ height: '64px' }}
                alt="torch logo"
              />
              <p className="text-yellow-500 font-bold">KOHLIFE MAP</p>
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
                    'text-yellow-500 px-8 py-4 lg:py-2 flex items-center text-m uppercase font-bold  relative'
                  }
                  href="/"
                >
                  {current == 'home' && <Pop />}
                  Map
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
