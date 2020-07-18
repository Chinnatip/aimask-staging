import Head from 'next/head'
import React, { ReactNode } from 'react'
import Footer from 'stuff/Footer'
import Navbar from 'stuff/Navbar'
import { Token } from 'interfaces'

type Props = {
  children: ReactNode
  token?: Token
  title: string
  ssg?: boolean
  navTransparent?: boolean
}

const Layout = ({
  children,
  title = '',
  token = null,
  ssg = false,
  navTransparent = false,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar
          transparent={navTransparent}
          login={token != undefined}
          ssg={ssg}
        />
      </header>

      {children}

      <Footer />
    </>
  )
}
export default Layout
