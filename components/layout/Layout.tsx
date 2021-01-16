import Head from 'next/head'
import React, { ReactNode } from 'react'
// import Footer from 'stuff/Footer'
import Navbar from 'stuff/Navbar'
import { Token } from 'interfaces'
import { MarkerProperty } from '../../interfaces/marker'

type Props = {
  children: ReactNode
  token?: Token
  title: string
  ssg?: boolean
  navTransparent?: boolean
  nofooter?: boolean
  current?: string
  markers?: MarkerProperty[]
}

const Layout = ({
  children,
  title = '',
  current='/',
  markers
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
      {children}
      {/* {!nofooter && <Footer />} */}
    </>
  )
}
export default Layout
