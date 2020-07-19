import Head from 'next/head'
import Sidebar from 'stuff/Sidebar'
import Navbar from 'stuff/NavbarAdmin'
import Footer from 'stuff/DashboardFooter'
import { ReactNode } from 'react'
import { Token } from 'interfaces'

type Props = {
  children?: ReactNode
  title?: string
  current?: string
  token?: Token
}

const Layout = ({ children, title = '', token = null }: Props) => {
  return (
    <div className="font-family-karla flex">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Sidebar />
      <div className="relative w-full md:ml-64">
        <div className="w-full flex flex-col h-screen">
          <Navbar title={title} token={token}></Navbar>
          {/* Top content */}
          <div className="relative bg-pink-600 md:pt-32 pb-32 pt-12"></div>
          {/* Normal content */}
          <div className="px-4 md:px-10 mx-auto w-full -m-24 z-10 -mt-48">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
