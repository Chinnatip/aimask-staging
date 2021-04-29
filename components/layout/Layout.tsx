import Head from 'next/head'
import React, { ReactNode } from 'react'
import Navbar from 'stuff/Navbar'
import Footer from 'stuff/Footer'
import { Token } from 'interfaces'
import { MaskType } from '../../interfaces/marker'

type Props = {
  children: ReactNode
  token?: Token
  title: string
  ssg?: boolean
  navTransparent?: boolean
  nofooter?: boolean
  current?: string
  maskType?: MaskType
}

const Layout = ({
  children,
  title = '',
  current = '/',
  maskType,
  nofooter = false,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar maskType={maskType} current={current} />
      </header>
      <div className={`${current != 'home' ? 'fixed top-0 w-screen h-screen overflow-auto': '' } overflow-x-hidden `} style={{ fontFamily: 'Sukhumvit Set' }}>
        {children}
      </div>
      {!nofooter && <Footer current={current} />}
    </>
  )
}
export default Layout
