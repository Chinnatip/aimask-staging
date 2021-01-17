import Head from 'next/head'
import React, { ReactNode } from 'react'
// import Footer from 'stuff/Footer'
import Navbar from 'stuff/Navbar'
import { Token } from 'interfaces'
import { CameraDetail } from '../../interfaces/marker'
import Footer from 'stuff/Footer'

type Props = {
  children: ReactNode
  token?: Token
  title: string
  ssg?: boolean
  navTransparent?: boolean
  nofooter?: boolean
  current?: string
  markers?: CameraDetail[]
  actionDrawer?: any
}

const Layout = ({
  children,
  title = '',
  current = '/',
  markers,
  nofooter = false,
  actionDrawer
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar markers={markers} current={current} />
      </header>
      <div className="fixed top-0 w-screen h-screen">
        {children}
      </div>
      {!nofooter && <Footer current={current} actionDrawer={actionDrawer} />}
    </>
  )
}
export default Layout
