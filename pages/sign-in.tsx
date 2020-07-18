import Layout from '@/Layout'
import { setCookie } from 'utils/cookie'
import Router from 'next/router'

const SignIn = () => {
  return (
    <Layout title="User list" ssg nofooter>
      <div className="p-6 lg:p-16 text-center">
        <div className="w-full lg:w-6/12 px-4 m-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
            <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl font-semibold">Sign in</h4>
              <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                please sign in to access dashboard
              </p>
              <div className="relative w-full mb-3 mt-8">
                <label
                  className="block uppercase text-gray-700 text-left text-xs font-bold mb-2"
                  htmlFor="full-name"
                >
                  Email / Username
                </label>
                <input
                  type="email"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="*****@email.com"
                  style={{ transition: 'all .15s ease' }}
                />
              </div>

              <div className="relative w-full mb-3 mt-2">
                <label
                  className="block uppercase text-left text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="*****"
                  style={{ transition: 'all .15s ease' }}
                />
              </div>

              <div className="text-center mt-6">
                <button
                  className="bg-pink-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => {
                    setCookie('token', 'vekrvreorifmefreofreio')
                    Router.push('/')
                  }}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignIn
