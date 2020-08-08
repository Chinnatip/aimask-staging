export default function Footer() {
  return (
    <>
      <footer className="relative bg-brown pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: '80px', transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-brown fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4">
              <h4 className="text-3xl text-yellow-600  font-semibold">
                Let's learn together!
              </h4>
              <h5 className="text-lg mt-0 mb-4 text-gray-400">
                ส่งอิเมล์ชวนเพื่อนมาร่วม join ใน comminity ของ Torch
              </h5>
              <div className="w-full">
                <input
                  className="lg:w-8/12 shadow appearance-none border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="email"
                  placeholder="ส่งอิเมล์ชวนเพื่อน"
                />
                <button className="lg:w-2/12 ml-4 button-accent text-white font-bold py-3 px-4 rounded-lg">
                  ส่งคำเชิญ
                </button>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-6/12 px-4">
                  <span className="block uppercase text-yellow-600 text-sm font-semibold mb-2">
                    Web Directory
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-400 hover:text-gray-600 font-semibold block pb-2 text-sm"
                        href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                      >
                        Lifeling learning
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-400 hover:text-gray-600 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/terms"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-400 hover:text-gray-600 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/privacy"
                      >
                        Community & Reward
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-400 hover:text-gray-600 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/contact-us"
                      >
                        Partners
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-yellow-200 font-semibold py-1">
                Copyright © {new Date().getFullYear()} Tailwind Starter Kit by{' '}
                <a
                  href="https://www.creative-tim.com"
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div> */}
        </div>
      </footer>
    </>
  )
}
